const { log } = require("console");
const imageKit = require("../db/imagekit");
const Car = require("../models/Car");
const User = require("../models/User");
const fs = require("fs");
const Booking = require("../models/Booking");

// change role 
async function changeRoleToOwner(req, res) {
    try {
        const { _id } = req.user;
        const user = await User.findByIdAndUpdate(_id, { role: "owner" });

        res.json({ success: true, message: "Now you can list a car" });

    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}

// to add the car 
async function addCar(req, res) {
    try {
        const { _id } = req.user;

        // Check received file
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a car image"
            });
        }

        const car = JSON.parse(req.body.carData);

        const imageFile = req.file;

        // Upload image to ImageKit
        const response = await imageKit.files.upload({
            file: fs.createReadStream(imageFile.path),
            fileName: imageFile.originalname,
            folder: "/cars"
        });

        // Optimize image URL
        const optimizedImageUrl = imageKit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: response.filePath,
            transformation: [
                {
                    width: 1280,
                    quality: "auto",
                    format: "webp"
                }
            ]
        });

        await Car.create({
            ...car,
            owner: _id,
            image: optimizedImageUrl
        });

        res.json({
            success: true,
            message: "Car Added"
        });

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
}

// API to fetch owner cars list 
async function ownerCars(req, res) {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })

        res.json({
            success: true,
            cars
        });


    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
}

// API to toggle the car availability 
async function toggleCarAvailability(req, res) {
    try {
        const { _id } = req.user;
        const { carID } = req.body;

        const car = await Car.findById(carID);

        if (car.owner.toString() !== _id.toString()) {
            res.json({ success: false, message: "Unauthorized !" });
        }

        car.isAvailable = !car.isAvailable

        await car.save();

        res.json({
            success: true,
            message: "Availability Toggled !"
        });

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
}

// API to del the car 
async function DelCar(req, res) {
    try {
        const { _id } = req.user;
        const { carID } = req.body;

        const car = await Car.findById(carID);

        if (car.owner.toString() !== _id.toString()) {
            res.json({ success: false, mesage: "Unauthorized !" })
        }

        car.owner = null;
        car.isAvailable = false;

        await car.save();

        res.json({
            success: true,
            message: "Car Deleted !"
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }

}

// API to get dashboardData 
async function getDashData(req, res) {
    try {
        const { _id, role } = req.user;

        if (role !== "owner") {
            res.json({ success: false, message: "Unauthorized !" });
        }

        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
        const completeBookings = await Booking.find({ owner: _id, status: "confirmed" });

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0);

        const dashBoardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.lenth,
            completedBookings: completeBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }

        res.json({
            success: true,
            dashBoardData
        });

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
}

async function updateUserImage(req, res) {
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        // Upload image to ImageKit
        const response = await imageKit.files.upload({
            file: fs.createReadStream(imageFile.path),
            fileName: imageFile.originalname,
            folder: "/users"
        });

        // Optimize image URL
        const optimizedImageUrl = imageKit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: response.filePath,
            transformation: [
                {
                    width: 1280,
                    quality: "auto",
                    format: "webp"
                }
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, { image });
        res.json({
            success: true,
            message: "Image Updated !"
        });

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
}

module.exports = { changeRoleToOwner, addCar, ownerCars, toggleCarAvailability, DelCar, getDashData, updateUserImage };