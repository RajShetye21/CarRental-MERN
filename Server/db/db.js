const mongoose = require("mongoose");

let connectionPromise = null;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing");
    }

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGODB_URI)
            .then((connection) => {
                console.log("Connected to MongoDB");
                return connection;
            })
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    return connectionPromise;
}

module.exports = connectDB;
