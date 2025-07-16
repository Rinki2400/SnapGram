import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedPosts, removeSavedPost } from "../../Api/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Savedposts.css";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const saved = await getSavedPosts(user._id);
        setSavedPosts(saved || []);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchSaved();
    }
  }, [user]);

  const handleRemove = async (postId) => {
    try {
      await removeSavedPost(user._id, postId);
      setSavedPosts((prev) => prev.filter((p) => p._id !== postId));
      toast.success("Post removed from bookmarks.");
    } catch (error) {
      console.error("Failed to remove saved post:", error);
      toast.error("Failed to remove post.");
    }
  };

  return (
    <div className="saved-posts-container">
      <h2>🔖 Bookmarked Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : savedPosts.length === 0 ? (
        <p>No saved posts yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="saved-posts-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Caption</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedPosts.map((post) => (
                <tr key={post._id}>
                  <td>@{post.username}</td>
                  <td>{post.caption}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(post._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back to Home Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="back-btn" onClick={() => navigate("/")}>
          ⬅ Back
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default SavedPosts;
