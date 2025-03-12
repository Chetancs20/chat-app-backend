const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ Save a new message
router.post("/messages", async (req, res) => {
    try {
        const { sender, message } = req.body;

        const newMessage = new Message({ sender, message });
        await newMessage.save();

        res.status(201).json({ message: "Message saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Fetch all messages
router.get("/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
