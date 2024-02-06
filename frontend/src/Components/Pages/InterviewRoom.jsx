import React from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Logic } from "./Logic";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextToSpeech } from "./TextToSpeech";
import { Latest_Message } from "../redux/actionType";

export const InterviewRoom = () => {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [conversation, setConversation] = useState([]);
  console.log(conversation);
  const [interview, setInterview] = useState(null); //currently going on interviewy
  const navigate = useNavigate();
  const type = useSelector((store) => store.authReducer.type);
  console.log(type, "Interview Room");

  const startInterview = async () => {
    if (type) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/interview/start`,
          {
            type: type, // Replace with the actual interview type you want to start
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the conversation with the start message from the server
        setConversation([
          ...conversation,
          { role: "assistant", content: response.data.msg },
          { role: "assistant", content: response.data.question },
        ]);
        // console.log(response.data.newinterview);
        dispatch({ type: Latest_Message, payload: response.data.question });
        setInterview(response.data.newinterview);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleStop = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/interview/end/${interview._id}`,
        {
          conversation: [...conversation],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: Latest_Message,
        payload:
          "Thankyou for attempting this interview, You can click on the end interview Button, and see the feedback on your dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ExistInterviewRoom = () => {
    navigate("/userdashboard");
  };

  return (
    <div className="border min-h-screen overflow-hidden flex justify-between mt-10">
      <div className="relative flex-grow bg-slate-200">
        <div className="py-20 px-4 relative">
          <div className="flex gap-4">
            <div className="relative border-2 w-1/2 h-96 rounded-lg border-gray-50 border-blue-500 ">
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src="https://herobot.app/wp-content/uploads/2022/11/AI-bot-1.jpg"
                alt=""
              />
            </div>
            <div className="relative border-2 w-1/2 h-96 rounded-lg border-gray-50 overflow-hidden">
              {/* <video ref={videoRef} controls autoPlay muted /> */}
              <Webcam />
            </div>
          </div>

          <button
            onClick={startInterview}
            className="btn-stop-share bg-black text-white py-2 px-4 rounded-md border border-black-500 mt-16"
          >
            Start Interview
          </button>
          {/* <button
            onClick={startInterview}
            className="BrandButton bg-primary text-background py-2 px-4 rounded-full text-lg transition-all duration-200 ease-in mt-16"
          >
            Start Interview
          </button> */}

          <button
            onClick={handleStop}
            className="btn-stop-share bg-red-500 text-white py-2 px-4 rounded-md border border-black-500"
          >
            Stop
          </button>

          <button
            onClick={ExistInterviewRoom}
            className="btn-stop-share bg-black text-white py-2 px-4 rounded-md border border-black-500 mt-16"
          >
            End Interview
          </button>
        </div>
      </div>
      <div className="p-4 w-1/3 flex-col gap-8 border-l">
        <div className="p-4 flex-grow mb-12 bg-white w-full h-3/5 rounded-md border scroll-m-0 overflow-y-scroll overflow-x-hidden">
          {conversation.map((iteam, index) => (
            <div
              className="shadow-md rounded-md p-4 my-2 flex flex-col gap-2 justify-between"
              // className={iteam.role}
              key={index}
            >
              <div className="flex gap-4 items-center">
                {iteam.role == "user" ? (
                  <img
                    className="w-11 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={
                      "https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png"
                    }
                    alt="Bordered avatar"
                  />
                ) : (
                  <img
                    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={
                      "https://herobot.app/wp-content/uploads/2022/11/AI-bot-1.jpg"
                    }
                    alt="Bordered avatar"
                  />
                )}

                <div className="inline-block  min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                <h3>{iteam.content}</h3>
              </div>
            </div>
          ))}
        </div>

        <TextToSpeech
          conversation={conversation}
          setConversation={setConversation}
          interview={interview}
        />
      </div>
    </div>
  );
};
