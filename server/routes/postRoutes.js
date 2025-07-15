const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createPost, getAllPosts, getUserPosts } = require("../controller/postController");

const router = express.Router();

// Ensure uploads/ folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post("/", upload.fields([{ name: "images", maxCount: 5 }]), createPost);
router.get("/", getAllPosts);
router.get("/user/:id", getUserPosts);

module.exports = router;
