const express = require("express");
const router = express.Router();
const { updateProfile, getProfileById } = require("../controller/userController");

// Update profile by ID
router.put("/:id", updateProfile);

// Get profile by ID
router.get("/:id", getProfileById);

module.exports = router;
