import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "../../Api/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

const ProfilePage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      getUserById(user._id)
        .then((data) => {
          setUser(data);
          setUsername(data.username);
          setAvatar(data.avatar);
          setEmail(data.email);
          setBio(data.bio || "");
        })
        .catch(console.error);
    }
  }, [user?._id]);

  if (!user) return <p>No user data found. Please log in.</p>;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      username,
      avatar,
      email,
      bio,
    };

    try {
      const updatedUser = await updateUserById(user._id, updatedData);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000); // ⏳ Delay to let toast show
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>{username}'s Profile</h2>
      <img
        src={avatar || "https://i.pravatar.cc/150"}
        alt="avatar"
        className="profile-avatar"
      />

      <div className="profile-stats">
        <p><strong>Followers:</strong> {user.followers?.length || 0}</p>
        <p><strong>Following:</strong> {user.following?.length || 0}</p>
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
              // 🔁 You can upload to server/cloud here instead
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

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* ✅ Toast container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProfilePage;
