const express = require("express");

const router = express.Router();

const {
  getAllUser,
  registerUser,
  getUserById,
} = require("../controllers/user");

router.get("/all", getAllUser);
router.post("/register", registerUser);
router.post("/login", registerUser);
router.get("/:id", getUserById);

module.exports = router;
