import React, { useContext, useState } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";
function App() {
  let { recognition, speaking, setSpeaking, prompt, response, setprompt, setResponse } =
    useContext(datacontext);
  return (
    <div className="main">
      <img src={va} alt="" id="Shifra" />

      <span> I'm Shifra , Your Virtual Assistance </span>
      {!speaking ? (
        <button
          onClick={() => {
            setprompt("listening...");
            setSpeaking(true);
            setResponse(false)
            recognition.start();
          }}
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speakimg} alt="" id="speak" />
          ) : (
            //this is else
            <img src={aigif} alt="" id="aigif" />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
