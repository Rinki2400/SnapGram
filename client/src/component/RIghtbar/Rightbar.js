import React, { useEffect, useState } from "react";
import "./Rightbar.css";
import { getAllUsers, followUser, unfollowUser, getUserById } from "../../Api/authService";


const Rightbar = () => {
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const filtered = allUsers.filter(
          (user) => user._id !== currentUser?._id
        );
        setUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    const fetchFollowing = async () => {
      try {
        const userData = await getUserById(currentUser._id);
        const followedIds = userData.following.map((u) => u._id || u); // adjust depending on backend format
        setFollowingIds(followedIds);
      } catch (err) {
        console.error("Failed to fetch current user", err);
      }
    };

    fetchUsers();
    fetchFollowing();
  }, [currentUser?._id]);

// Rightbar.js

const handleFollow = async (targetId) => {
  try {
    const isAlreadyFollowing = followingIds.includes(targetId);

    if (isAlreadyFollowing) {
      await unfollowUser({
        currentUserId: currentUser._id,
        targetUserId: targetId,
      });
      setFollowingIds((prev) => prev.filter((id) => id !== targetId));

      const updatedUser = {
        ...currentUser,
        following: (currentUser.following || []).filter((id) => id !== targetId),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated")); // 👈 fire event

    } else {
      await followUser({
        currentUserId: currentUser._id,
        targetUserId: targetId,
      });
      setFollowingIds((prev) => [...prev, targetId]);

      const updatedUser = {
        ...currentUser,
        following: [...(currentUser.following || []), targetId],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("userUpdated")); // 👈 fire event
    }
  } catch (err) {
    console.error("Follow/Unfollow error:", err);
  }
};


  return (
    <div className="rightbar-container">
      <div className="rightbar-card">
        <h4 className="rightbar-title">Suggested Users</h4>
        {users.length > 0 ? (
          users.map((user) => {
            const isFollowing = followingIds.includes(user._id);
            return (
              <div className="suggested-user" key={user._id}>
                <div className="user-info">
                  <span>@{user.username}</span>
                </div>
                <button
                  className={`follow-btn ${isFollowing ? "following" : ""}`}
                  onClick={() => handleFollow(user._id)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="empty-msg">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
