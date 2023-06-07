const getExecutionTimeOfCode = (startTime, endTime) => {
    const executionTime = endTime - startTime;
    if(executionTime >= 1000) {
       return (executionTime / 1000) + "sec";
    } else {
        return executionTime + "ms";
    }
};

module.exports = getExecutionTimeOfCode;
