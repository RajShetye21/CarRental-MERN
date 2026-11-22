require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");

const userRouter = require("./Router/user.router.js");
const ownerRoute = require("./Router/owner.router.js");
const bookingRoute = require("./Router/booking.router.js");

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://car-rental-lemon-nu.vercel.app"
    ],
    credentials: true
}));

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Car Rental Backend is running!"
    });
});

// Database connection
connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRoute);
app.use("/api/bookings", bookingRoute);

module.exports = app;
