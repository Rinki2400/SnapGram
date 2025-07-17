import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaCommentDots,
  FaBookmark,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../Api/authService";

const Sidebar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user from API using ID
  const fetchUser = async (id) => {
    try {
      const freshUser = await getUserById(id);
      setUser(freshUser);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  // Initial + event-based update
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?._id) {
      fetchUser(storedUser._id);

      const handleUpdate = () => fetchUser(storedUser._id);
      window.addEventListener("userUpdated", handleUpdate);

      return () => window.removeEventListener("userUpdated", handleUpdate);
    }
  }, []);

  const handleLogoutClick = () => setShowConfirm(true);
  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };
  const cancelLogout = () => setShowConfirm(false);
  const handleProfileClick = () => {
    if (user?._id) navigate(`/profile/${user._id}`);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sidebar-menu">
      {/* Profile Section */}
      {user && (
        <div className="profile-section">
          <img
            src={user.avatar || "https://i.pravatar.cc/40"}
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

      {/* Navigation Links */}
      <div onClick={() => navigate("/")} className="sidebar-link">
        <FaHome className="icon" /> Home
      </div>
      <div className="sidebar-link" onClick={() => navigate("/message")}>
        <FaCommentDots className="icon" /> Messages
      </div>
      <div className="sidebar-link" onClick={() => navigate("/bookmarks")}>
        <FaBookmark className="icon" /> Bookmarks
      </div>
      <div className="sidebar-link" onClick={handleProfileClick}>
        <FaUser className="icon" /> Profile
      </div>

      {/* Theme Toggle */}
      <div className="sidebar-link" onClick={toggleTheme}>
        {theme === "dark" ? (
          <>
            <FaSun className="icon" /> Light Mode
          </>
        ) : (
          <>
            <FaMoon className="icon" /> Dark Mode
          </>
        )}
      </div>

      {/* Logout */}
      <div
        className="sidebar-link"
        onClick={handleLogoutClick}
        style={{ cursor: "pointer" }}
      >
        <FaSignOutAlt className="icon" /> Logout
      </div>

      {/* Confirm Logout Modal */}
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
