import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';
import { FaHome, FaSearch, FaBell, FaCommentDots } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ triggers re-render when route changes

  // Load user on mount and route change
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  const handleProfileClick = () => {
    if (user?._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  return (
    <nav className="nav">
      {/* Left: Logo or Brand Name */}
      <div className="nav-left">
        <img src={logo} alt="SnapGram" className="logo-img" />
        <h1 className="nav-logo">SnapGram</h1>
      </div>

      {/* Right: Icons */}
      <div className="nav-right">
        <a href="#home" className="nav-icon"><FaHome /></a>
        <a href="#explore" className="nav-icon"><FaSearch /></a>
        <a href="#notifications" className="nav-icon"><FaBell /></a>
        <a href="#chat" className="nav-icon"><FaCommentDots /></a>

        <div className="nav-avatar" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
          <img
            src={user?.avatar}
            alt="avatar"
            className="avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://i.pravatar.cc/30";
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
