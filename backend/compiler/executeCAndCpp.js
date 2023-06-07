const { exec } = require("node:child_process");
const path = require("path");
const fs = require("fs");
const { formatError } = require("../util/formatError");

const outputFolderPath = path.join(__dirname, "..", "outputs");

if(!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, {recursive: true});
}

const executeC = (filepath, inputpath) => {
    const jobID = path.basename(filepath).split(".")[0];
    const outputFilePath = path.join(outputFolderPath, `${jobID}.out`);
    let commend = `gcc \"${filepath}\" -o \"${outputFilePath}\" && cd ${outputFolderPath} && ${jobID}.out ${ inputpath ? "< \"" + inputpath + "\"" : "" }`;
    return new Promise((resolve, reject) => {
        exec(commend, (error, stdout, stderr) => {
            error && reject({ stderr: formatError(stderr, filepath) });
            stderr && reject({ stderr: formatError(stderr, filepath) });
            resolve({ stdout });
        });
    });
};

const executeCpp = (filepath, inputpath) => {
    const jobID = path.basename(filepath).split(".")[0];
    const outputFilePath = path.join(outputFolderPath, `${jobID}.out`);
    let commend = `g++ \"${filepath}\" -o \"${outputFilePath}\" && cd ${outputFolderPath} && ${jobID}.out ${ inputpath ? "< \"" + inputpath + "\"" : "" }`;
    return new Promise((resolve, reject) => {
        exec(commend, (error, stdout, stderr) => {
            error && reject({ error, stderr: formatError(stderr, filepath) });
            stderr && reject({ stderr: formatError(stderr, filepath) });
            resolve({ stdout });
        });
    });
};

module.exports = { executeC, executeCpp };
