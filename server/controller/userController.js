const User = require("../model/User");

const Post = require("../model/Post");
// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, bio, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, bio, avatar },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controller/userController.js
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ _id: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// controllers/userController.js
exports.followUser = async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  try {
    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser.following.includes(targetUserId)) {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);

      await currentUser.save();
      await targetUser.save();

      return res.json({ message: "User followed" });
    } else {
      return res.status(400).json({ message: "Already following" });
    }
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// controller/userController.js
exports.unfollowUser = async (req, res) => {
  const { currentUserId, targetUserId } = req.body;
  try {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove each other's reference
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to unfollow" });
  }
};

// POST /api/users/:userId/save/:postId
exports.savePost = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    console.log("User ID:", userId);
    console.log("Post ID:", postId);

    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedPosts.includes(postId);
    console.log("Is Post already saved:", isSaved);

    if (isSaved) {
      user.savedPosts.pull(postId);
    } else {
      user.savedPosts.push(postId);
    }

    await user.save();
    res.status(200).json({
      message: isSaved ? "Post unsaved" : "Post saved",
      savedPosts: user.savedPosts,
    });
  } catch (err) {
    console.error("🔥 Error in savePost:", err); // add full error log
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/users/:userId/saved
exports.getSavedPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("savedPosts");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.savedPosts);
  } catch (error) {
    console.error("❌ Error in getSavedPosts:", error);
    res.status(500).json({ error: "Failed to fetch saved posts" });
  }
};
exports.postdelete = async (req, res) => {
  const { userId, postId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const initialLength = user.savedPosts.length;
    user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);

    if (user.savedPosts.length === initialLength) {
      return res.status(404).json({ error: "Post not found in saved list." });
    }

    await user.save();
    res.status(200).json({ message: "Post removed from bookmarks." });
  } catch (err) {
    console.error("❌ Error in postdelete:", err);
    res.status(500).json({ error: "Failed to remove post." });
  }
};

exports.getAllUsersExceptCurrent = async (req, res) => {
  try {
    const currentUserId = req.query.exclude;
    const users = await User.find({ _id: { $ne: currentUserId } }).select("_id username");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};