const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  conversation: [],
  // sessionToken: { type: String },
  type: {
    type: String,
    required: true,
    // Add validation for specific types like MERN, Node, Java, etc.
  },

  feedback: {
    type: String,
    default: "",
  },
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
