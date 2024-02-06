import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Speak = () => {
  const latest = useSelector((store) => store.authReducer.latest);
  const { speak, voices } = useSpeechSynthesis();

  const [voiceType, setVoiceType] = useState("female");
  const [voiceSpeed, setVoiceSpeed] = useState(1.5);

  useEffect(() => {
    let selectedVoice;
    if (voiceType == "male") {
      selectedVoice = voices && voices[1];
    } else {
      selectedVoice = voices && voices[2];
    }

    speak({
      text: latest,
      limit: voiceSpeed,
      voice: selectedVoice,
      rate: voiceSpeed,
    });
  }, [latest]);

  return (
    <div>
      <select value={voiceType} onChange={(e) => setVoiceType(e.target.value)}>
        <option value="" disabled>
          {" "}
          Voice Type{" "}
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select
        value={voiceSpeed}
        onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
      >
        <option value="" disabled>
          {" "}
          Speed{" "}
        </option>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
      </select>
      <button
        onClick={speak}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-16"
      >
        Speech
      </button>
    </div>
  );
};
