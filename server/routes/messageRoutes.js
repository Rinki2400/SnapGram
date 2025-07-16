const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getConversation,
} = require("../controller/messageRoutes")

// Send a message
router.post("/", sendMessage);

// Get conversation between two users
router.get("/:user1/:user2", getConversation);

module.exports = router;