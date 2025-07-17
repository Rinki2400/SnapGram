import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./Messages.css";

const socket = io("http://localhost:2000");

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const messageEndRef = useRef(null);
 const navigate = useNavigate();
  // Scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:2000/api/users");
        setUsers(res.data.filter((u) => u._id !== user._id)); // exclude self
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2000/api/messages/${user._id}/${receiverId}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = {
      sender: user._id,
      receiver: receiverId,
      content: input,
      timestamp: new Date(),
    };

    try {
      await axios.post("http://localhost:2000/api/messages", messageData);
      socket.emit("sendMessage", messageData);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (receiverId) fetchMessages();

    socket.on("receiveMessage", (msg) => {
      if (
        (msg.sender === user._id && msg.receiver === receiverId) ||
        (msg.sender === receiverId && msg.receiver === user._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [receiverId]);

  return (
    <div className="chat-layout">
        <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
   
      <div className="user-list">
        <h3>Users</h3>
        {users.map((u) => (
          <div
            key={u._id}
            className={`user-item ${u._id === receiverId ? "active" : ""}`}
            onClick={() => setReceiverId(u._id)}
          >
            {u.username}
          </div>
        ))}
      </div>

      {/* Right - Chat Window */}
      <div className="chat-container">
        <h2>💬 Chat Room</h2>

        {receiverId ? (
          <>
            <div className="message-box">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    msg.sender === user._id ? "sent" : "received"
                  }`}
                >
                  <p>{msg.content}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <form className="message-form" onSubmit={sendMessage}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit" disabled={!input.trim()}>
                Send
              </button>
            </form>
          </>
        ) : (
          <p className="select-user-note">Select a user to start chatting</p>
        )}
      </div>
      
    </div>
  );
};

export default MessagePage;
