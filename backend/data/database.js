const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(process.env.mongoURL);
};

module.exports = { connectToDatabase };
