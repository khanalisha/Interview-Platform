const express = require("express");
const uuid = require("uuid");
require("dotenv").config();
const { OpenAI } = require("openai");
const Interview = require("../model/interview");
const { UserModel } = require("../model/user");
const apiKey = process.env.APIKEY;

const openai = new OpenAI({ apiKey: apiKey });
const startingPrompt = {
  MERN: `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

  Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise.Stop the interview when the I say "stop the interview" and give a detailed feedback in form of an object, following this schema(except the interview key) :const feedbackSchema = new mongoose.Schema({
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
    strengths: [{ type: String }], // Array of strengths observed during the interview
    improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
    overallScore: { type: Number }, // Overall score of the interview
  });
  
  Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
  
  JD: MERN, MongoDB, Express, React and Node (Junior)
  
  Skills: Express, React, Node.
  
  Just ask one question at a time and wait for me to give the answer then ask new question do not give response to user for answer just move next question. Do not give all the questions at once.  Ask the questions one by one.Greet the user first before going on to the first question`,

  JAVA: `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

  Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise.Stop the interview when the I say "stop the interview" and give a detailed feedback in form of an object, following this schema(except the interview key) :const feedbackSchema = new mongoose.Schema({
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
    strengths: [{ type: String }], // Array of strengths observed during the interview
    improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
    overallScore: { type: Number }, // Overall score of the interview
  });
  
  Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
  
  JD: Java, SpringBoot
  
  Skills: Java, Spring Boot, Hybernate
  Just ask one question at a time and wait for me to give the answer then ask new question do not give response to user for answer just move next question. Do not give all the questions at once.  Ask the questions one by one.Greet the user first before going on to the first question`,
};

const endInterviewPrompt = `Stop the interview. Give me detailed feedback according to feedbackSchema = new mongoose.Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
  strengths: [{ type: String }], // Array of strengths observed during the interview
  improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
  overallScore: { type: Number }, // Overall score of the interview
});`;

const startInterview = async (req, res, next) => {
  const { type } = req.body;

  try {
    const conversation = [{ role: "user", content: startingPrompt[type] }];
    console.log(conversation);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    // console.log(type);
    const question = response.choices[0].message.content;
    const newinterview = new Interview({
      userId: req.userId,
      // sessionToken,
      type: type,
      conversation: [...conversation, { role: "assistant", content: question }],

      feedback: null,
    });

    await newinterview.save();

    res
      .status(200)
      .json({ msg: "Interview Is Started Now", question, newinterview });
    console.log(newinterview);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const EndInterview = async (req, res, next) => {
  const { conversation } = req.body;
  const userId = req.userId;

  console.log(conversation, userId, "aa");
  const { id } = req.params; //interview id

  console.log(id, "bb");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        ...conversation,
        { role: "user", content: endInterviewPrompt },
      ],
    });
    const endObj = response.choices[0].message.content;
    console.log(endObj);
    const newInterview = await Interview.findByIdAndUpdate(
      id,
      { conversation, feedback: endObj },
      { new: true }
    );
    console.log(newInterview, "newEnd");
    // Find the logged-in user and update their pastInterviews
    console.log(userId, "userId");
    const loginUser = await UserModel.findById(newInterview.userId);
    console.log(loginUser, "loginId");
    const pastInterview = await UserModel.findByIdAndUpdate(
      userId,
      {
        userPastInterview: [...loginUser.userPastInterview, id],
      },
      { new: true }
    );

    res.status(200).json({
      msg: "Interview is stopped now",
      endObj,
      endInterviewPrompt,
      pastInterview,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: error });
  }
};

const AiResponse = async (req, res, next) => {
  try {
    const { conversation } = req.body;
    const { id } = req.params;
    // console.log(conversation);
    let response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    let nextQuestion = response.choices[0].message.content;

    //update interview;
    let nextInterview = await Interview.findByIdAndUpdate(id, { conversation });

    // console.log(response);
    res.json({ answer: nextQuestion });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  endInterviewPrompt,
  startingPrompt,
  EndInterview,
  startInterview,

  AiResponse,
};
