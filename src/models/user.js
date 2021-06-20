const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const constants = require("../constants/constants");

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    select: false,
    min: 8,
    max: 1024,
  },
});

userSchema.pre(constants.save, function (next) {
  if (this.isModified(constants.password)) {
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  }
});

userSchema.methods.checkPassword = async function (password) {
  if (!password) throw new Error("Passwords is missing");

  const user = await users.findById(this._id).select(constants.password);

  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    throw new Error({ ...error, message: "Error comparing password" });
  }
};

const users = mongoose.model(constants.user, userSchema);

module.exports = users;
