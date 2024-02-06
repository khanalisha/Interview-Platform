import axios from "axios";
import React, { useState, useEffect } from "react";
import { Speak } from "./Speak";
import { useDispatch } from "react-redux";
import { Latest_Message } from "../redux/actionType";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export const TextToSpeech = ({ conversation, setConversation, interview }) => {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  const [isListening, setIsListening] = useState(false);
  const [render, setRender] = useState(false);
  // const [latest, setLatest] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    handleListen();
  }, [isListening, render]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
    } else {
      mic.stop();
    }

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      // console.log(transcript);
      setText(transcript);
    };
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/gpt/${interview._id}`,
        {
          conversation: [
            ...conversation,
            { role: "user", content: text.trim() },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConversation([
        ...conversation,
        { role: "user", content: text.trim() },
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);

      // Read out the assistant's response
      dispatch({ type: Latest_Message, payload: response.data.answer });

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button
            onClick={() => setIsListening(true)}
            disabled={isListening}
            className="btn-outline"
          >
            Start
          </button>{" "}
          <span></span>
          <button
            onClick={(e) => setIsListening(false)}
            disabled={!isListening}
            className="btn-outline"
          >
            Stop
          </button>
        </div>

        <button onClick={handleSubmit} className="btn">
          Send
        </button>
      </div>
      <br />
      <div>
        <textarea
          className="border border-1 border-gray-500 p-4"
          rows="4"
          cols="50"
          placeholder="Type your response or speak..."
          value={text}
          onChange={handleChange}
        />
        <Speak />
      </div>
    </>
  );
};
