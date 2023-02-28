const express = require('express')
const router = express.Router();
const paymentController = require("../controllers/payment");

router.post("/", paymentController.payment_bill);
router.put("/:id", paymentController.upload);

module.exports = router;