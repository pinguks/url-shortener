const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];

    const decoded = jwt.decode(token, "secrett");

    const user = await User.findById(decoded.id);

    req.user = user;
  }

  next();
};
