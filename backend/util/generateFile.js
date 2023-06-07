const fs = require("fs");
const fsPromise = require("fs/promises");
const path = require("path");

const { v4: getID } = require("uuid");

const codeDirPath = path.join(__dirname, "..", "codes");
const inputDirPath = path.join(__dirname, "..", "inputs");

if(!fs.existsSync(codeDirPath)) {
    fs.mkdirSync(codeDirPath, { recursive: true });
}

if(!fs.existsSync(inputDirPath)) {
    fs.mkdirSync(inputDirPath, { recursive: true });
}

const generateCodeFile = async (format, content) => {
    let filename;
    filename = `${getID()}.${format}`; //create file name.
    const filepath = path.join(codeDirPath, filename); //create file path.
    await fsPromise.writeFile(filepath, content); //create file to the path and write the content(means code) inside it.
    return filepath;
};

const generateInputFile = async (inputs, codeFilepath) => {
    const jobID = path.basename(codeFilepath).split(".")[0];
    const inputFilepath = path.join(inputDirPath, `${jobID}.txt`);
    await fsPromise.writeFile(inputFilepath, inputs);
    return inputFilepath;
};

module.exports = {
    generateCodeFile,
    generateInputFile
};
