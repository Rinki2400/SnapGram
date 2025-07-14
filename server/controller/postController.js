// controllers/postController.js
const Post = require("../model/Post");

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { userId, username, caption, song, video } = req.body;

    if (!userId || !username || !video) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newPost = await Post.create({
      user: userId,
      username,
      caption,
      song,
      video,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts (latest first)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get posts by user ID
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
