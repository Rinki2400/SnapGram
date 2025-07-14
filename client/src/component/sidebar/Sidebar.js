import React, { useState } from "react";
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
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirm(true); // Show popup/modal
  };

 const confirmLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/auth");
};


  const cancelLogout = () => {
    setShowConfirm(false);
  };
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

      <div onClick={() => navigate("/")} className="sidebar-link">
        <FaHome className="icon" /> Home
      </div>
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
      <div
        className="logout"
        onClick={handleLogoutClick}
        style={{ cursor: "pointer" }}
      >
        <FaSignOutAlt className="icon" /> Logout
      </div>
      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Are you sure you want to log out?</p>
            <button className="confirm" onClick={confirmLogout}>
              Yes
            </button>
            <button className="cancel" onClick={cancelLogout}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
