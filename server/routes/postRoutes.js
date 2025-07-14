// routes/postRoutes.js
const express = require("express");
const { createPost, getAllPosts, getUserPosts } = require("../controller/postController");

const router = express.Router();

// Create a new post
router.post("/", createPost);

// Get all posts
router.get("/", getAllPosts);

// Get posts by user ID
router.get("/user/:id", getUserPosts);

module.exports = router;
