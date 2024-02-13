const jwt = require("jsonwebtoken");

const { BlackListModel } = require("../model/BlackList");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token, "auth");
  if (token) {
    const blacklistedToken = await BlackListModel.findOne({ token: token });
    if (blacklistedToken) {
      return res.status(440).json({ message: " Login Again" });
    }

    jwt.verify(token, process.env.secretkey, function (err, decoded) {
      if (decoded) {
        req.userId = decoded.userId;
        next();
      } else {
        return res.status(400).json({ message: "Unauthorized" });
      }
    });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
};
module.exports = auth;
