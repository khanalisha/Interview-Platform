import React from "react";
import axios from "axios";
import { useState } from "react";

export const Logic = (handleSubmit) => {
  const [text, setText] = useState("");


  const startingPrompt = {
    // "Hi, let's start the interview for MERN .First ask the one question wait for user response if user response then give the feedback .Ask then another question .",

    MERN: `Hi, let's start the interview for MERN .First ask the one  question in new line "\n" to the user .And wait for user response if the user response are wrong or partially correct then give the correct answer and give the feedback of that a user answer.Then ask another question in new line to continue interview.`,

    JAVA: "Hi, let's start the interview for JAVA",
  };
  const UpdateInterviewPrompt = `give me question  accoording to startingPrompt.Give 1 question at a time if user response then go to the next question  `;

  // const handleStop = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/interview/end/${interview._id}`,
  //       {
  //         conversation: [...conversation],
  //       }
  //     );

  //     setConversation([
  //       ...conversation,
  //       { role: "assistant", content: response.data.endObj },
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // `${process.env.REACT_APP_API_URL}/update`,
  // const handleNext = async () => {
  //   // setInterviewStarted(false);
  //   try {
  //     let prompt = startingPrompt && UpdateInterviewPrompt;

  //     const response = await axios.patch(
  //       `http://localhost:3000/interview/update`,
  //       {
  //         sessionToken: conversation[0]?.sessionToken,
  //         id: id,
  //         type: type,
  //         conversation: [
  //           ...conversation,
  //           {
  //             role: "assisment",
  //             content: prompt,
  //           },
  //         ],
  //       }
  //     );

  //     setConversation([
  //       ...conversation,
  //       { role: "assistant", content: response.data.nextQuestion },
  //     ]);

  //     console.log(conversation);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!text.trim()) return;
  //   // if (!text.trim() || !interviewStarted) return;

  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/gpt/${interview._id}`,
  //       {
  //         conversation: [
  //           ...conversation,
  //           { role: "user", content: text.trim() },
  //         ],
  //       }
  //     );

  //     // Update the conversation with the OpenAI response
  //     setConversation([
  //       ...conversation,
  //       { role: "user", content: text.trim() },
  //       { role: "assistant", content: response.data.answer },
  //     ]);
  //     setText(""); // Clear the input field
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {/* <div>
        {conversation.map((iteam, index) => (
          <div key={index} className={iteam.role}>
            {" "}
            <strong>
              {" "}
              {iteam.role.charAt(0).toUpperCase() + iteam.role.slice(1)}:
            </strong>
            {iteam.content}
          </div>
        ))}
      </div> */}

      <textarea
        className="border border-1 border-gray-500 p-4"
        rows="4"
        cols="50"
        placeholder="Type your response..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* <button
        onClick={startInterview}
        className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Start Interview
      </button> */}
      <button
        onClick={handleSubmit}
        className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Submit
      </button>
      {/* <button
        onClick={handleNext}
        className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Next Question
      </button>
      <button
        onClick={handleStop}
        className="btn-stop-share bg-red-500 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Stop
      </button> */}
    </>
  );
};
