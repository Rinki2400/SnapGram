import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.svg';
import { FaHome, FaSearch, FaBell, FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

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

      {/* Right: React Icons */}
      <div className="nav-right">
        <a href="#home" className="nav-icon"><FaHome /></a>
        <a href="#explore" className="nav-icon"><FaSearch /></a>
        <a href="#notifications" className="nav-icon"><FaBell /></a>
        <a href="#chat" className="nav-icon"><FaCommentDots /></a>
        
        <div className="nav-avatar" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
          <img
            src={user?.avatar || "https://i.pravatar.cc/30"}
            alt="avatar"
            className="avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
