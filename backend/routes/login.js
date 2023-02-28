const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/login");

router.post("/", LoginController.check);

module.exports = router;
