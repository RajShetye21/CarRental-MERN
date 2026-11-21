require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db.js");
const userRouter = require("./Router/user.router.js");
const ownerRoute = require("./Router/owner.router.js");
const bookingRoute = require("./Router/booking.router.js");


// middleware 
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRoute);
app.use("/api/bookings", bookingRoute);


app.listen(3000, () => {
    console.log("Server is working...!");
});