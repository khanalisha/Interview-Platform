const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userImage: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPastInterview: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
  ],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
