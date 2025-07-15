import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  const handleProfileClick = () => {
    if (user?._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  return (
    <div className="sidebar-menu">
      {/* User Profile Section */}
      {user && (
        <div className="profile-section">
          <img
            src={user?.avatar }
            alt="Profile"
            className="profile-avatar"
            
          />

          <h3 className="profile-name">@{user.username}</h3>
          <div className="profile-stats">
            <div>
              <strong>{user.followers?.length || 0}</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>{user.following?.length || 0}</strong>
              <span>Following</span>
            </div>
          </div>
        </div>
      )}

      <div onClick={() => navigate("/")} className="sidebar-link">
        <FaHome className="icon" /> Home
      </div>
      <div  className="sidebar-link">
        <FaSearch className="icon" /> Explore
      </div>
      <div  className="sidebar-link">
        <FaCommentDots className="icon" /> Messages
      </div>
      <div  className="sidebar-link">
        <FaBookmark className="icon" /> Bookmarks
      </div>
      <div className="sidebar-link" onClick={handleProfileClick}>
        <FaUser className="icon" /> Profile
      </div>
      <div className="sidebar-link">
        <FaCog className="icon" /> Settings
      </div>
      <div
        className="sidebar-link"
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
