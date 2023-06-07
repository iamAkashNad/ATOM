const { exec } = require("child_process");
const { formatError } = require("../util/formatError");

const executeJava = (filepath, inputpath) => {
    return new Promise((resolve, reject) => {
        exec(`java \"${filepath}\" ${ inputpath ? "< \"" + inputpath + "\"" : "" }`, (error, stdout, stderr) => {
            error && reject({ stderr: formatError(stderr, filepath) });
            stderr && reject({ stderr: formatError(stderr, filepath) });
            resolve({ stdout });
        });
    });
};

module.exports = executeJava
