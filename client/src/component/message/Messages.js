import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Messages.css";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiverId, setReceiverId] = useState(""); // you can set default
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/api/messages/${user._id}/${receiverId}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2000/api/messages", {
        sender: user._id,
        receiver: receiverId,
        content: input,
        timestamp: new Date(),
      });
      setInput("");
      fetchMessages(); // Refresh after sending
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (receiverId) fetchMessages();
  }, [receiverId]);

  return (
    <div className="chat-container">
      <h2>💬 Chat Room</h2>

      <input
        className="receiver-input"
        placeholder="Enter Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />

      <div className="message-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === user._id ? "sent" : "received"}`}
          >
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <form className="message-form" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessagePage;
