const express = require("express");
const Router = express.Router();

const bookingController = require("../controller/booking.controller");
const protect = require("../middleware/auth");

Router.get("/check-availability", bookingController.checkAvailability);
Router.post("/create", protect, bookingController.createBookings);
Router.get("/user", protect, bookingController.getUserBookings);
Router.get("/owner", protect, bookingController.getOwnerBookings);
Router.post("/change-status", protect, bookingController.chageBookingStatus);

module.exports = Router;