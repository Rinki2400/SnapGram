// Messages.jsx
import React from "react";
import "./Messages.css";

const Messages = () => {
  return (
    <div className="messages-container">
      <h2>💬 Messages</h2>
      <div className="chat-placeholder">
        <p>Start chatting with your friends!</p>
        {/* Later: Show recent chats or message threads here */}
      </div>
    </div>
  );
};

export default Messages;
