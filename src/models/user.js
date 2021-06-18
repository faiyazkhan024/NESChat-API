const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const constants = require("../constants/constants");

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
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

userSchema.methods.comparePasswords = async function (password) {
  if (!password) throw new Error("Passwords is missing");
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 43 ~ error", error);
  }
};

module.exports = mongoose.model(constants.user, userSchema);
