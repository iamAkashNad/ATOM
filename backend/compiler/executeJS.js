const { exec } = require("node:child_process");
const { formatError } = require("../util/formatError");

const executeJS = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(`node \"${filepath}\"`, (error, stdout, stderr) => {
            error && reject({ stderr: formatError(stderr, filepath) });
            stderr && reject({ stderr: formatError(stderr, filepath) });
            resolve({ stdout });
        });
    });
};

module.exports = executeJS;
