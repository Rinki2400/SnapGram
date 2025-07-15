import React, { useState, useEffect } from "react";
import {
  FaEllipsisH,
  FaRegComment,
  FaRegBookmark,
  FaEdit,
  FaTrashAlt,
  FaFlag,
} from "react-icons/fa";
import "./Feed.css";
import { getAllPosts } from "../../Api/authService";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      fetchPosts();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const toggleDropdown = (postId) => {
    setOpenDropdown(openDropdown === postId ? null : postId);
  };

  const handleAction = (action, postId) => {
    console.log(`Action: ${action} on post ${postId}`);
    setOpenDropdown(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="feed-container">
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
          🔐 Please login to view posts.
        </h2>
      </div>
    );
  }

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          {/* Header */}
          <div className="post-header">
            <div className="user-info">
              <strong className="username">@{post.username}</strong>
            </div>

            <div className="menu-wrapper">
              <FaEllipsisH
                className="menu-icon"
                onClick={() => toggleDropdown(post._id)}
              />
              {openDropdown === post._id && (
                <div className="dropdown-menu">
                  <button onClick={() => handleAction("edit", post._id)}>
                    <FaEdit style={{ marginRight: "8px" }} /> Edit
                  </button>
                  <button onClick={() => handleAction("delete", post._id)}>
                    <FaTrashAlt style={{ marginRight: "8px" }} /> Delete
                  </button>
                  <button onClick={() => handleAction("report", post._id)}>
                    <FaFlag style={{ marginRight: "8px" }} /> Report
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="post-images">
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:2000/uploads/${img}`}
                  alt={`post-${i}`}
                  className="post-image"
                />
              ))}
            </div>
          )}

          <div className="post-body">
            <p className="likes">
              ❤️ <strong>{post.likes.length} likes</strong>
            </p>
            <p className="caption">
              <strong>@{post.user?.username}</strong> {post.caption}
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
