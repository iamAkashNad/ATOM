const { exec } = require("child_process");
const { formatError } = require("../util/formatError");

const executePy = (filepath, inputpath) => {
    return new Promise((resolve, reject) => {
        let commend = `python \"${filepath}\" ${ inputpath ? "< \"" + inputpath + "\"" : "" }`;
        exec(commend, (error, stdout, stderr) => {
            error && reject({ stderr: formatError(stderr, filepath) });
            stderr && reject({ stderr: formatError(stderr, filepath) });
            resolve({ stdout });
        });
    });
};

module.exports = executePy;
