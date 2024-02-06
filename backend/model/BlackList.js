const mongoose = require("mongoose");

const BlackListSchema = new mongoose.Schema({
  token: String,
});

const BlackListModel = mongoose.model("BlackList", BlackListSchema);

module.exports = { BlackListModel };
