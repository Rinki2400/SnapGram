import React from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaSearch,
  FaCommentDots,
  FaBookmark,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
 
  return (
    <div className="sidebar-menu">
      {/* User Profile Section */}
      <div className="profile-section">
        <img
          src="https://i.pravatar.cc/60"
          alt="Profile"
          className="profile-avatar"
        />
        <h3 className="profile-name">@rinki_sharma</h3>
        <div className="profile-stats">
          <div>
            <strong>120</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>180</strong>
            <span>Following</span>
          </div>
        </div>
      </div>

      <a href="#home">
        <FaHome className="icon" /> Home
      </a>
      <a href="#explore">
        <FaSearch className="icon" /> Explore
      </a>
      <a href="#messages">
        <FaCommentDots className="icon" /> Messages
      </a>
      <a href="#bookmarks">
        <FaBookmark className="icon" /> Bookmarks
      </a>
      <a href="#profile">
        <FaUser className="icon" /> Profile
      </a>
      <a href="#settings">
        <FaCog className="icon" /> Settings
      </a>
      <a href="#logout" className="logout">
        <FaSignOutAlt className="icon" /> Logout
      </a>
    </div>
  );
};

export default Sidebar;
