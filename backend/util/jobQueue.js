const Queue = require("bull");

const Job = require("../models/Job");

const { executeC, executeCpp } = require("../compiler/executeCAndCpp");
const executeJS = require("../compiler/executeJS");
const executeJava = require("../compiler/executeJava");
const executePy = require("../compiler/executePy");

const deleteFile = require("../util/deleteFile");

const jobQueue = new Queue("job-queue");
const NUM_OF_WORKERS = 5;

//Here we perform a job(means execute code file) by a process in the background.
//And we can have 5 process running simultaneously.
jobQueue.process(NUM_OF_WORKERS, async ({ data }) => {
    const { id: jobId } = data;
    const job = await Job.findById(jobId);

    if(!job) {
        throw new Error("invalid job id");
    }
    
    let output;
    try {
        job.startedAt = new Date();
        if(job.language === "c") {
            //Here we executes the C file and gives user an output or an error that probably occurs in the code.
            //And after the execute the C file we delete the file from server no metter the execution is successful or not.
            output = await executeC(job.filepath, job.inputpath);
        } else if(job.language === "cpp") {
            //Here we executes the CPP file and gives user an output or an error that probably occurs in the code.
            //And after the execute the CPP file we delete the file from server no metter the execution is successful or not.
            output = await executeCpp(job.filepath, job.inputpath);
        } else if(job.language === 'js') {
            //Here we executes the JS file and gives user an output or an error that probably occurs in the code.
            //And after the execute the JS file we delete the file from server no metter the execution is successful or not.
            output = await executeJS(job.filepath);
        } else if(job.language === "java") {
            //Here we executes the Java file and gives user an output or an error that probably occurs in the code.
            //And after the execute the Java file we delete the file from server no metter the execution is successful or not.
            output = await executeJava(job.filepath, job.inputpath);
        } else if(job.language === "py") {
            //Here we executes the Python file and gives user an output or an error that probably occurs in the code.
            //And after the execute the Python file we delete the file from server no metter the execution is successful or not.
            output = await executePy(job.filepath, job.inputpath);
        }
        job.completedAt = new Date();
        job.status = "Success";
        job.output = output.stdout;
    } catch(error) {
        job.completedAt = new Date();
        job.status = "Error";
        job.output = error.stderr;
    }
    try {
        await job.save();
    } catch(error) {}
    deleteFile(job.filepath);
});

jobQueue.on("failed", (error) => {}); //Here we handles error which we get if the above process fails.


const addJobToQueue = async (jobId) => {
    await jobQueue.add({ id: jobId });
};

module.exports = { addJobToQueue };
