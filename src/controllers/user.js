const jwt = require("jsonwebtoken");

const userModel = require("../models/user");
const userValidation = require("../validations/user");
const { authToken } = require("../constants/constants");

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const user = req.body;
  userValidation(user, res);

  const userExists = await userModel.findOne({ username: user.username });
  if (userExists) return loginUser(req, res, userExists);

  try {
    const newUser = new userModel(user);
    await newUser.save();
    loginUser(req, res, newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res, user) => {
  const password = await user.checkPassword(req.body.password);

  if (!password)
    return res.status(404).json({ error: "Password does not match" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.status(201).json({ user, token });
};

const getUserById = async (req, res) => {
  try {
    console.log("🚀 ~ file: user.js ~ line 43 ~ loginUser ~ user", user);
    console.log("🚀 ~ file: user.js ~ line 43 ~ loginUser ~ user", user);
    console.log("🚀 ~ file: user.js ~ line 43 ~ loginUser ~ user", user);
    const user = await userModel.findById(req.params.id, (error) => {
      if (error) return res.status(404).json({ error });
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllUser, registerUser, getUserById };
