const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conected to DB");
    } catch (e) {
        console.log("Database connection error - ", e.message);
    }
}

module.exports = connectDB;
