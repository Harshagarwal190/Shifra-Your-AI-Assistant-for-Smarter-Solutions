import React, { createContext, useState } from "react";
import run from "../gemini";
export const datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setprompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
  if (typeof text !== "string" || text.trim() === "") {
    console.error("Invalid text passed to speak function.");
    return;
  }

  // Check if speech synthesis is available
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported in this browser.");
    return;
  }

  let text_speak = new SpeechSynthesisUtterance(text);

  // Optional: Log the speech synthesis properties
  console.log("Speaking text:", text);
  console.log("Speech synthesis available:", window.speechSynthesis);

  text_speak.volume = 1;
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.lang = "hi-IN"; // Changed to "hi-IN" for Hindi (India)

  // Start speech synthesis
  window.speechSynthesis.speak(text_speak);
}


  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText = text
      .replace(/google/g, "Harsh Agarwal")
      .replace(/Google/g, "Harsh Agarwal");

    setprompt(newText); // to set the text in the prompt
    setResponse(true);
    speak(newText); // to speak the text

    setTimeout(() => {
      setSpeaking(false); // to remove the response after 5 seconds
    }, 5000);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition(); // object of speech recognition
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript; // to get the text from the speech
    setprompt(transcript); // to set the text in the prompt
    takeCommand(transcript.toLowerCase()); // to take the command from the text
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      // to start the speech recognition
      window.open("https://www.youtube.com/", "_blank"); // to open the youtube
      speak("opening youtube"); // to speak the text
      setprompt("opening youtube...."); // to set the text in the prompt
      setTimeout(() => {
        setSpeaking(false); // to remove the response after 5 seconds
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      // to start the speech recognition
      window.open("https://www.google.com/", "_blank"); // to open the youtube
      speak("Opening Google"); // to speak the text
      setprompt("Opening google...."); // to set the text in the prompt
      setTimeout(() => {
        setSpeaking(false); // to remove the response after 5 seconds
      }, 5000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setprompt(time); // to set the text in the prompt
      setTimeout(() => {
        setSpeaking(false); // to remove the response after 5 seconds
      }, 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setprompt(date); // to set the text in the prompt
      setTimeout(() => {
        setSpeaking(false); // to remove the response after 5 seconds
      }, 5000);
    } else {
      aiResponse(command); // to get the response from the AI
    }
  }
  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setprompt,
    response,
    setResponse,
  };
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
}

export default UserContext;
