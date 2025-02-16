import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import { MessageCircle } from "lucide-react"; // Icon for chatbot button

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I help?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const API_KEY = "AIzaSyCtYSlfWVrJXHzLXlLMGO1bD7ErdpwXyhQ"; // Replace with your actual API key
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: input }] }]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response Data:", response.data); // Debugging log

        const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "Sorry, I didn't understand that.";
        
        setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
        console.error("Error fetching response:", error.response?.data || error.message);
        setMessages((prev) => [...prev, { text: "Error fetching response. Try again later!", sender: "bot" }]);
    }

    setInput("");
};

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">Gemini AI Chat</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;