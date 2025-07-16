const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getProfileById,
  getAllUsers,
  followUser,
  unfollowUser,
  savePost,
  getSavedPosts,
  postdelete
} = require("../controller/userController");

// Update profile by ID
router.put("/:id", updateProfile);

// Get profile by ID
router.get("/all", getAllUsers);
router.get("/:id", getProfileById);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
// Toggle save/unsave post
router.post("/:userId/save/:postId", savePost);

// Get all saved posts for a user
router.get("/:userId/saved", getSavedPosts);
router.delete("/:userId/saved/:postId", postdelete);

module.exports = router;
