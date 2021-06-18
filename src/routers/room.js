const express = require("express");

const router = express.Router();

const { getUserInRoom } = require("./controllers/room");

router.get("/users:roomName", getUserInRoom);

module.exports = router;
