const userModel = require("../models/user");

const addUser = async (req, res) => {
  const user = req.body;

  const newUser = new userModel(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).end();
    return res.status(200).json(user);
  } catch (error) {}
};

module.exports = { addUser, getUser };
