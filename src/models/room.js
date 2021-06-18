const mongoose = require("mongoose");

const constants = require("../constants/constants");

const Schema = mongoose.Schema;

const roomSchema = Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: constants.user },
  users: [{ type: Schema.Types.ObjectId, ref: constants.user }],
});

module.exports = mongoose.model(constants.room, roomSchema);
