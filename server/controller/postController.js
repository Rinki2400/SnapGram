const Post = require("../model/Post");

// Create post
exports.createPost = async (req, res) => {
  try {
    const { user, username, caption } = req.body;
    const images = req.files?.images?.map((file) => file.filename) || [];

    const newPost = new Post({
      user,
      username,
      caption,
      images,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// route: POST /api/posts/:postId/like
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.body.userId;

    // Toggle like
    if (post.likes.includes(userId)) {
      post.likes.pull(userId); 
    } else {
      post.likes.push(userId); 
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update like" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully", postId: post._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
