const express = require('express')
const router = express.Router();
const ServiceController = require("../controllers/service");


router.get("/", ServiceController.findAll);
router.get("/:id", ServiceController.findOne);
router.post("/", ServiceController.create);
router.put("/:id", ServiceController.updatestatus);
router.delete("/:id", ServiceController.deleteOne);

module.exports = router;