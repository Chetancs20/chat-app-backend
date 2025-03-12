const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

require("dotenv").config(); // Load environment variables

// ✅ Register Route
router.post("/register", async (req, res) => {
    try {
        console.log("Received register request:", req.body);
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.username === username
                    ? "Username already taken"
                    : "Email already registered"
            });
        }

        // ✅ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        console.log("✅ User registered successfully:", newUser);

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, message: "User registered successfully!" });
    } catch (error) {
        console.error("⚠️ Server Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        console.log("Received login request:", req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // ✅ Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, message: "Login successful!" });
    } catch (error) {
        console.error("⚠️ Server Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Export Router
module.exports = router;
