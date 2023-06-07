const path = require("path");
const fsExtra = require("fs-extra");

const deleteFile = (filepath) => {
    fsExtra.remove(filepath).then(() => {
        console.log("File deleted!");
    }).catch((error) => {
        console.log("File not deleted!");
    });

    const [ filename ] = path.basename(filepath).split(".");
    const outputFilePath = path.join(__dirname, "..", "outputs", `${filename}.out`);

    fsExtra.remove(outputFilePath).then(() => {
        console.log("File deleted!");
    }).catch((error) => {
        console.log("File not deleted!");
    });

    const inputFilepath = path.join(__dirname, "..", "inputs", `${filename}.txt`);
    fsExtra.remove(inputFilepath).then(() => {}).catch((error) => {});
};

module.exports = deleteFile;
