const { UserModel } = require("../model/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/BlackList");

const RegisterdUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const registerUserName = await UserModel.findOne({ username });
    if (registerUserName) {
      res
        .status(400)
        .send({ msg: "Username aleady exist ! try with other UserName" });
    }
    const registerUserEmail = await UserModel.findOne({ email });
    if (registerUserEmail) {
      res
        .status(409)
        .send({ msg: "Email aleady exist ! try with other Email" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }

  bcrypt.hash(password, 5, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.status(404).json({ err: err });
    } else {
      const registerUser = new UserModel({ ...req.body, password: hash });
      await registerUser.save();
      res
        .status(200)
        .json({ msg: "New User is registered now!", registerUser });
    }
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const existinguser = await UserModel.findOne({ email });
    bcrypt.compare(password, existinguser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: existinguser._id },
          process.env.secretkey
        );
        console.log(existinguser, token);
        res
          .status(200)
          .json({ mag: "Login Sucess!", token: token, existinguser });
      } else {
        res.status(401).json({ error: "something wrong" });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

const GetSingleUserDATA = (req, res, next) => {};

const logOut = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const data = new BlackListModel({ token: token });
    await data.save();
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    return res.status(400).json({ message: "Logout failed" });
  }
};

module.exports = {
  RegisterdUser,
  loginUser,
  logOut,
};
