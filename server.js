
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Store comments in memory
let comments = [];

// Send existing comments to newly connected users
io.on("connection", (socket) => {
    console.log("User connected");

    socket.emit("comments", comments);

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Save a new comment
app.post("/api/comments", (req, res) => {
    const { text } = req.body;

    // Check comment
    if (!text || !text.trim()) {
        return res.status(400).json({
            message: "Comment cannot be empty"
        });
    }

    // Create comment
    const newComment = {
        id: crypto.randomUUID(),
        text: text.trim(),
        createdAt: new Date().toISOString()
    };

    // Save comment
    comments.unshift(newComment);

    // Send event to all connected clients
    io.emit("new_comment", newComment);

    res.status(201).json({
        message: "Comment saved successfully",
        comment: newComment
    });
});

// Start server
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
