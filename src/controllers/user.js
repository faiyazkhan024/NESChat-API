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
  const newUser = new userModel(user);
  if (userExists) return loginUser(newUser, res);

  try {
    await newUser.save();
    loginUser(newUser, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = (user, res) => {
  const password = user.comparePasswords(user.password);
  if (password) {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header(authToken, token).status(201).json(user);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id, (error) => {
      if (error) return res.status(404).json({ error });
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllUser, registerUser, getUserById };
