import React, { useState } from "react";
import TinderCard from "./Components/TinderCard";
import Chatbot from "./Components/Chatbot";
import "./App.css";

const App = () => {
  return(
    <div>
      <TinderCard/>
      <Chatbot/>
    </div>
  )
}

export default App