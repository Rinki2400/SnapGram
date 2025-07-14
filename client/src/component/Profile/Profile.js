import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const ProfilePage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const navigate = useNavigate();

  if (!user) return <p>No user data found. Please log in.</p>;

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      avatar,
      email,
      bio,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated locally!");
  };

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>{user.username}'s Profile</h2>
      <img
        src={user.avatar || "https://i.pravatar.cc/150"}
        alt="avatar"
        className="profile-avatar"
      />

      <div className="profile-stats">
        <p>
          <strong>Followers:</strong> {user.followers?.length || 0}
        </p>
        <p>
          <strong>Following:</strong> {user.following?.length || 0}
        </p>
      </div>

      <form className="edit-form" onSubmit={handleSave}>
        <label>Upload Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setAvatar(imageUrl);
            }
          }}
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell something about yourself"
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
