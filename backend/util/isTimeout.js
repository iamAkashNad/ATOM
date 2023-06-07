const isTimeout = (jobSubmittedTime) => {
    let timeTakenByJob;
    timeTakenByJob = Date.now() - jobSubmittedTime;
    return timeTakenByJob >= 65000;
};

module.exports = { isTimeout };
