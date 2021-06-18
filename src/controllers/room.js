const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { getUserInRoom };
