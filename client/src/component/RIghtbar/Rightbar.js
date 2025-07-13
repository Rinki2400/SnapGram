import React from 'react';
import './Rightbar.css'; // Link the CSS file

const Rightbar = () => {
  return (
    <div className="rightbar-container">
      {/* Suggested Users */}
      <div className="rightbar-card">
        <h4 className="rightbar-title">Suggested Users</h4>
        <div className="suggested-user">
          <div className="user-info">
            <img src="https://i.pravatar.cc/30" alt="user" className="avatar" />
            <span>@rinki_sharma</span>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="rightbar-card">
        <h4 className="rightbar-title">Trending Hashtags</h4>
        <p className="hashtag">#mernstack</p>
        <p className="hashtag">#javascript</p>
        <p className="hashtag">#socialmedia</p>
      </div>
    </div>
  );
};

export default Rightbar;
