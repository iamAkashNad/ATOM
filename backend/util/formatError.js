const path = require("path");

const formatError = (error, filepath) => {
    const [ jobId, format ] = path.basename(filepath).split(".");
    while(error.includes(filepath)) {
        error = error.replace(filepath, `Atom.${format}`);
    }
    while(error.includes(jobId)) {
        error = error.replace(jobId, "Atom");
    }
    return error;
};

module.exports = { formatError };
