import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEllipsisH,
  FaRegComment,
  FaRegBookmark,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Feed.css";
import PostForm from "../PostForm/PostForm";
import {
  getAllPosts,
  likePost,
  deletePostById,
  editPostById,
  toggleSavePost,
  getSavedPosts,
} from "../../Api/authService";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedCaption, setEditedCaption] = useState("");
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      fetchPosts();
      fetchSavedPosts(user._id);
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

  const fetchSavedPosts = async (userId) => {
    try {
      const saved = await getSavedPosts(userId);
      setSavedPosts(saved.map((p) => p._id)); // store saved post IDs
    } catch (err) {
      console.error("Error fetching saved posts:", err);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      const res = await toggleSavePost(currentUser._id, postId);
      toast.success(res.message || "Post saved");
      fetchSavedPosts(currentUser._id); // Refresh saved post list
    } catch (err) {
      toast.error("Failed to save post ❌");
      console.error(err);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleDropdown = (postId) => {
    setOpenDropdown(openDropdown === postId ? null : postId);
  };

  const handleAction = async (action, postId) => {
    setOpenDropdown(null);

    if (action === "delete") {
      try {
        await deletePostById(postId);
        setPosts((prev) => prev.filter((p) => p._id !== postId));
        toast.success("Post deleted successfully 🗑️");
      } catch (err) {
        toast.error("Failed to delete post ❌");
        console.error(err);
      }
    } else if (action === "edit") {
      const post = posts.find((p) => p._id === postId);
      setEditedCaption(post.caption);
      setEditingPostId(postId);
    }
  };

  const handleSaveEdit = async (postId) => {
    try {
      const updatedPost = await editPostById(postId, editedCaption);
      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
      toast.success("Post updated ✏️");
      setEditingPostId(null);
      setEditedCaption("");
    } catch (err) {
      toast.error("Failed to update post ❌");
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const updatedPost = await likePost(postId, currentUser._id);
      const isNowLiked = updatedPost.likes.includes(currentUser._id);

      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );

      toast.success(isNowLiked ? "Liked the post ❤️" : "Unliked the post 💔");
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
      toast.error("Action failed. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="feed-container">
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
          Please login to view posts.
        </h2>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <PostForm onPostCreated={handleNewPost} />
      {posts.map((post) => {
        const isLiked = post.likes.includes(currentUser?._id);
        const isSaved = savedPosts.includes(post._id);
        return (
          <div className="post-card" key={post._id}>
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
                  </div>
                )}
              </div>
            </div>
            {post.images && post.images.length > 0 && (
              <div className="post-images">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  useKeyboardArrows
                  infiniteLoop
                  dynamicHeight={false}
                >
                  {post.images.map((img, i) => (
                    <div key={i}>
                      <img
                        src={`http://localhost:2000/uploads/${img}`}
                        alt={`post-${i}`}
                        className="post-image"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
            <div className="post-body">
              <button
                className={`icon-btn ${isLiked ? "liked" : ""}`}
                onClick={() => handleLike(post._id)}
              >
                {isLiked ? "💔 Unlike" : "🤍 Like"}
              </button>
              {editingPostId === post._id ? (
                <div className="edit-caption-form">
                  <textarea
                    value={editedCaption}
                    onChange={(e) => setEditedCaption(e.target.value)}
                    className="edit-textarea"
                  />
                  <button
                    onClick={() => handleSaveEdit(post._id)}
                    className="save-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPostId(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="caption">
                  <strong>@{post.user?.username}</strong> {post.caption}
                </p>
              )}
              <div className="post-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleLike(post._id)}
                >
                  {isLiked ? "💔 Unlike" : "❤️ Like"}
                </button>
                <button className="icon-btn">
                  <FaRegComment /> Comment
                </button>
                <button
                  className="icon-btn"
                  onClick={() => handleSavePost(post._id)}
                >
                  <FaRegBookmark /> {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
