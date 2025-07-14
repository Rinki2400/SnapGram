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
