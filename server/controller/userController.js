const User = require("../model/User");

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

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

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
    const users = await User.find()
      .select("-password")       
      .sort({ _id: -1 })                          
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
