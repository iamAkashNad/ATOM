const path = require("path");

const { generateCodeFile, generateInputFile } = require("../util/generateFile");
const { addJobToQueue } = require("../util/jobQueue");
const getExecutionTimeOfCode = require("../util/getExecutionTime");

const Job = require("../models/Job");

const { isTimeout } = require("../util/isTimeout");
const deleteFile = require("../util/deleteFile");

const getJobDetails = async (req, res) => {
    const jobId = req.query.id;
    if(!jobId) return res.status(400).json({ success: false, error: "No job Id is provided!" });

    let job;
    try{
        job = await Job.findById(jobId);
    } catch(error) {
        return res.status(500).json({ success: false, error: "Something went wrong internally!" });
    }

    if(!job) return res.status(404).json({ success: false, error: "Job not found with that job id!" });

    if(job.status !== "Pending") {
        job._doc.executionTime = getExecutionTimeOfCode(job.startedAt, job.completedAt);
    }

    //Checks wheather the code or job takes too long for execution like 45sec, So simply sends a TIMEOUT response to the client.
    //And after sending response delete the job from the db and delete the files related to that job.
    if(job.status === "Pending" && isTimeout(job.submittedAt)) {
        res.json({ success: false, job: { status: "Timeout", error: "TIMEOUT! Your program takes very much time to execute. Please check your code or given inputs carefully before submitting again." }});
        deleteFile(job.filepath);
        try {
            await Job.deleteOne({ _id: job._id });  
        } catch(error) {}
        return;
    }

    job._doc.filename = path.basename(job.filepath);
    job._doc.submittedAt = job.submittedAt.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    delete job._doc.filepath;
    delete job._doc.inputpath;
    res.json({ success: true, job });
    if(job.status !== "Pending") {
        try {
            await Job.deleteOne({ _id: jobId });
        } catch(error) {
            console.log("Deleting the job after it's successful execution isn't done!");
        }
    }
};

const runCode = async (req, res) => {
    const { language, code, input } = req.body;
    if(!language) {
        return res.status(400).json({ success: false, error: "Language not specified!" });
    }
    if(!code) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }

    const lang = language === "Java" ? "java" 
    : language === "JavaScript" ? "js"
    : language === "Python" ? "py"
    : language === "C++" ? "cpp" : "c";

    if(lang === "c" && language !== "C") 
        return res.status(400).json({ success: false, error: "This spacific language can't be compiled by the compiler!" });

    try {
        const codeFilepath = await generateCodeFile(lang, code); //Here we generate the file according to the language type or format and get the path to it.
        let inputFilepath;
        if(input)
            inputFilepath = await generateInputFile(input, codeFilepath);
        const job = await new Job({ 
            filepath: codeFilepath, 
            inputpath: inputFilepath, 
            status: "Pending", 
            language: lang 
        }).save(); //Create the job and store it in db.

        addJobToQueue(job._id); //Save the job(or the code execution work) to queue.

        res.status(201).json({ success: true, jobId: job._id });
    } catch(error) {
        res.status(500).json({ success: false, error: "Something went wrong internally!" });
    }
};

module.exports = { getJobDetails, runCode };
