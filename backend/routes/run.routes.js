const router = require("express").Router();

const { runCode, getJobDetails } = require("../controllers/run.controller");

router.get("/status", getJobDetails);

router.post("/run", runCode);

module.exports = router;
