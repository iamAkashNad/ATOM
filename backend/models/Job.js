const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
    filepath: {
        type: String,
        required: true,
    },
    inputpath: String,
    language: {
        type: String,
        required: true,
        enum: [ "c", "cpp", "java", "js", "py" ]
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    startedAt: Date,
    completedAt: Date,
    output: String,
    status: {
        type: String,
        default: "Pending",
        enum: [ "Pending", "Success", "Error" ]
    }
});

module.exports = model("jobs", jobSchema);
