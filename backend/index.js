const express = require("express");

require("dotenv").config();

const runRoutes = require("./routes/run.routes");
const { connectToDatabase } = require("./data/database");

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.frontendorigin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(runRoutes);

connectToDatabase().then(() => {
    console.log("Database connection established!");
    app.listen(process.env.PORT || 5050);
}).catch((error) => {
    console.log("Database connection failed!");
});
