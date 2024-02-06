const express = require("express");
const InterviewerQuestion = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controller/interview.controller");

InterviewerQuestion.use(auth);
InterviewerQuestion.post("/gpt/:id", controller.AiResponse);
InterviewerQuestion.post("/interview/start", controller.startInterview);
InterviewerQuestion.post("/interview/end/:id", controller.EndInterview);
// InterviewerQuestion.patch("/interview/update", controller.UpdateInterview);

module.exports = {
  InterviewerQuestion,
};
