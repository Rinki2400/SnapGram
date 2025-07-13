import React, { useState } from "react";
import {
  FaEllipsisH,
  FaRegComment,
  FaRegBookmark,
  FaEdit,
  FaTrashAlt,
  FaFlag,
} from "react-icons/fa";

import "./Feed.css";

const Feed = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (postId) => {
    setOpenDropdown(openDropdown === postId ? null : postId);
  };

  const handleAction = (action, postId) => {
    console.log(`Action: ${action} on post ${postId}`);
    setOpenDropdown(null); 
  };

  return (
    <div className="feed-container">
      {[1, 2, 3].map((post) => (
        <div className="post-card" key={post}>
          {/* Header */}
          <div className="post-header">
            <div className="user-info">
              <img
                src={`https://i.pravatar.cc/40?u=${post}`}
                alt="avatar"
                className="avatar"
              />
              <strong className="username">@user{post}</strong>
            </div>

            <div className="menu-wrapper">
              <FaEllipsisH
                className="menu-icon"
                onClick={() => toggleDropdown(post)}
              />
              {openDropdown === post && (
                <div className="dropdown-menu">
                  <button onClick={() => handleAction("edit", post)}>
                    <FaEdit style={{ marginRight: "8px" }} /> Edit
                  </button>
                  <button onClick={() => handleAction("delete", post)}>
                    <FaTrashAlt style={{ marginRight: "8px" }} /> Delete
                  </button>
                  <button onClick={() => handleAction("report", post)}>
                    <FaFlag style={{ marginRight: "8px" }} /> Report
                  </button>
                </div>
              )}
            </div>
          </div>
          <img
            src={`https://picsum.photos/seed/${post}/600/400`}
            alt="post"
            className="post-image"
          />
          <div className="post-body">
            <p className="likes">
              ❤️ <strong>10 likes</strong>
            </p>
            <p className="caption">
              <strong>@user{post}</strong> Sample caption for post {post}.
            </p>

            <div className="post-actions">
              <button className="icon-btn">
                <FaRegComment /> Comment
              </button>
              <button className="icon-btn">
                <FaRegBookmark /> Save
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
