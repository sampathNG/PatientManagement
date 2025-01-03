const { createReport, getReports } = require("../controllers/reportController");
const router = require("express").Router();
router.get("/", getReports);
router.post("/", createReport);
module.exports = router;
