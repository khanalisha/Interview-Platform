const express = require("express");
const uuid = require("uuid");
require("dotenv").config();
const { OpenAI } = require("openai");
const Interview = require("../model/interview");
const { UserModel } = require("../model/user");
const apiKey = process.env.APIKEY;

const openai = new OpenAI({ apiKey: apiKey });
const startingPrompt = {
  MERN: `Hi, let's start the interview for MERN .First ask the one  question in new line "\n" to the user .And wait for user response if the user response are wrong or partially correct then give the correct answer and give the feedback of that a user answer.Then ask another question in new line to continue interview.`,
  JAVA: `Hi, let's start the interview for JAVA .First ask the one  question in new line "\n" to the user .And wait for user response if the user response are wrong or partially correct then give the correct answer and give the feedback of that a user answer.Then ask another question in new line to continue interview.`,
};

const UpdateInterviewPrompt = `Give me a question according to MERN. Provide one question at a time. If the user responds, go to the next question.`;
const endInterviewPrompt = `Stop the interview. Give me detailed feedback of the my performance in the inteview, you can mention things like overAll performance, what would you rate me out of 10 and other things you would like to mention to the me to help me improve my weaker topics.`;

//Token

// const generateSessionToken = () => {
//   return uuid.v4();
// };
//Token

const startInterview = async (req, res, next) => {
  const { type } = req.body;

  // const sessionToken = generateSessionToken();
  // console.log(sessionToken);

  // console.log(type);
  try {
    const conversation = [{ role: "user", content: startingPrompt[type] }];
    // console.log(conversation);
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
    // console.log(newinterview);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// const UpdateInterview = async (req, res, next) => {
//   const { sessionToken, conversation } = req.body;
//   const { id } = req.params;
//   // console.log(id);

//   console.log(sessionToken, conversation, id);
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         ...conversation,
//         { role: "assistant", content: UpdateInterviewPrompt },
//       ],
//     });
//     // console.log(response.choices, "bb");
//     const nextQuestion = response.choices[0].message.content;
//     // console.log(nextQuestion, "cc");
//     const newConversation = [
//       ...conversation,
//       { role: "assisment", content: nextQuestion },
//     ];
//     const updatedInterview = await Interview.findByIdAndUpdate(
//       { sessionToken },
//       id,
//       { conversation: newConversation },
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Next question retrieved",
//       nextQuestion,
//       updatedInterview,
//     });
//   } catch (error) {
//     // console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

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
  // UpdateInterview,
  AiResponse,
};
