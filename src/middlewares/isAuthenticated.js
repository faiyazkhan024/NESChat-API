const jwt = require("jsonwebtoken");

const { authToken } = require("../constants/constants");

const isAuthenticated = (req, res, next) => {
  const token = req.header(authToken);
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ ...error, tokenMatched: false });
  }
};

module.exports = isAuthenticated;
