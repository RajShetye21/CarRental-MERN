
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. Please login."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        req.user = user;
        next();

    } catch (e) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}

module.exports = protect;
