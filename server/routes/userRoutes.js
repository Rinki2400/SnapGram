const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getProfileById,
  getAllUsers,
  followUser,
  unfollowUser,
} = require("../controller/userController");

// Update profile by ID
router.put("/:id", updateProfile);

// Get profile by ID
router.get("/all", getAllUsers);
router.get("/:id", getProfileById);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

module.exports = router;
