const express = require("express");
const controllers = require("../controller/authUser.controller");
const controller = require("../controller/user.controller");
const auth = require("../middleware/auth");

const userRouters = express.Router();

userRouters.post("/register", controllers.RegisterdUser);
userRouters.post("/login", controllers.loginUser);
userRouters.get("/logout", controllers.logOut);

// Individual User Interview
userRouters.use(auth);
userRouters.get("/user/interviews", controller.UserInterviewData);
module.exports = {
  userRouters,
};
