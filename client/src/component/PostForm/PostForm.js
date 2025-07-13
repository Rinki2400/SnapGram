import React, { useState } from "react";
import { FaCamera, FaVideo, FaMusic } from "react-icons/fa";
import "./PostForm.css";

const PostForm = () => {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", { caption, images, video, audio });

    // You can create FormData here and send to backend
    const formData = new FormData();
    formData.append("caption", caption);
    images.forEach((file) => formData.append("images", file));
    if (video) formData.append("video", video);
    if (audio) formData.append("audio", audio);

    // fetch('/api/posts', { method: 'POST', body: formData })...
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      ></textarea>

      <div className="media-buttons">
        {/* Multiple Images */}
        <label className="upload-icon-label">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            hidden
          />
          <span className="photo-icon" title="Add Photos">
            <FaCamera />
          </span>
        </label>

        {/* Video Upload */}
        <label className="upload-icon-label">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            hidden
          />
          <span className="photo-icon" title="Add Video">
            <FaVideo />
          </span>
        </label>

        {/* Audio Upload */}
        <label className="upload-icon-label">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            hidden
          />
          <span className="photo-icon" title="Add Audio">
            <FaMusic />
          </span>
        </label>
      </div>

      {/* Previews (optional) */}
      <div className="previews">
        {images.length > 0 && <p>📷 {images.length} image(s) selected</p>}
        {video && <p>🎥 {video.name}</p>}
        {audio && <p>🎵 {audio.name}</p>}
      </div>

      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
