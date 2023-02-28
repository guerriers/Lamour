const express = require('express')
const router = express.Router();
const ReportController = require("../controllers/report");


router.get("/resident", ReportController.residentFind);
router.get("/month", ReportController.monthFind);
router.get("/year", ReportController.yearFind);

module.exports = router;