import React, { useState, useRef } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import "./PostForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "../../Api/authService";

const PostForm = ({ onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.error("Please login to post.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("user", storedUser._id);
    formData.append("username", storedUser.username);
    formData.append("caption", caption);
    images.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      const data = await createPost(formData);
      toast.success("Post created successfully!");
      setCaption("");
      setImages([]);
      fileInputRef.current.value = "";

      // ✅ Update parent feed
      if (onPostCreated) {
        onPostCreated(data.post || data);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to create post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <ToastContainer position="top-right" autoClose={3000} />

      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      ></textarea>

      <div className="media-buttons">
        <label className="upload-icon-label">
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />
          <span className="photo-icon" title="Add Photos">
            <FaCamera />
          </span>
        </label>
      </div>

      {images.length > 0 && (
        <div className="image-preview-container">
          <p>📷 {images.length} image(s) selected:</p>
          <div className="preview-grid">
            {images.map((file, i) => (
              <div key={i} className="preview-item">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${i}`}
                  className="preview-img"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeImage(i)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
