const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decodedMsg = jwt.verify(token, "DEv@Tinder$790");
    const { _id } = decodedMsg;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User doesn't exist");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("Error: " + error.message);
  }
};

module.exports = { userAuth };
