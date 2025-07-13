import React from 'react';
import './Navbar.css';
import logo  from '../assets/logo.svg'
import { FaHome, FaSearch, FaBell, FaCommentDots } from 'react-icons/fa'; // React Icons

const Navbar = () => {
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
        <a href="#profile" className="nav-avatar">
          <img
            src="https://i.pravatar.cc/30"
            alt="avatar"
            className="avatar"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
