require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        // ✅ Extract the token from the Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1]; // Safer way to extract the token

        // ✅ Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user to request

        next(); // Proceed to next middleware or route handler
    } catch (error) {
        console.error("⚠️ Token Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};
