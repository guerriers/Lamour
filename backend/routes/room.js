const express = require('express')
const router = express.Router();
const RoomController = require("../controllers/room");


router.get("/", RoomController.findAll);
router.get("/:id", RoomController.findOne);
router.post("/", RoomController.create);
router.put("/:id", RoomController.update);
router.delete("/:id", RoomController.deleteOne);

module.exports = router;