const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Set your frontend origin in production
    methods: ["GET", "POST"],
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Listen for messages
  socket.on("sendMessage", (data) => {
    // You can also save to MongoDB here if needed
    io.emit("receiveMessage", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving (avatars, post images, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes")); // with multer
app.use("/api/messages", require("./routes/messageRoutes")); // optional for chat history

// Start server with Socket.IO
server.listen(PORT, () =>
  console.log(`🚀 Server with Socket.IO running on port ${PORT}`)
);
