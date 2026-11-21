const Booking = require("../models/Booking.js");
const Car = require("../models/Car.js");

// API to chek availability of car for given date
async function checkAvailability(car, pickupDate, returnDate) {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
    });

    return bookings.length === 0;
}

// API to check availablity of cars for given Date and Location 
async function checkAvailabilityOfCars(req, res) {
    try {
        const { location, pickupDate, returnDate } = req.body;

        // fetch all available cars for given location 
        const cars = await Car.find({ location, isAvailable: true });

        // check availability for the given date range using promise 
        const availableCarPromise = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return { ...car_doc, isAvailable: isAvailable }
        });

        let availableCars = await Promise.all(availableCarPromise);
        availableCars = availableCars.filter(car => car.isAvailable === true);

        res.json({
            success: true,
            availableCars
        });

    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}


async function createBookings(req, res) {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        if (isNaN(picked) || isNaN(returned) || returned <= picked) {
            return res.json({
                success: false,
                message: "Invalid pickup or return date!"
            });
        }

        const carData = await Car.findById(car);

        if (!carData) {
            return res.json({
                success: false,
                message: "Car not found!"
            });
        }

        const isAvailable = await checkAvailability(
            car,
            pickupDate,
            returnDate
        );

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Car is not available!"
            });
        }

        const noOfDays = Math.ceil(
            (returned - picked) / (1000 * 60 * 60 * 24)
        );

        const price = carData.pricePerDay * noOfDays;

        const booking = await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price,
            status: "pending"
        });

        return res.json({
            success: true,
            message: "Booking Created!",
            booking
        });

    } catch (e) {
        console.log(e.message);

        return res.json({
            success: false,
            message: e.message
        });
    }
}


// API to list user bookings  
async function getUserBookings(req, res) {
    try {
        const { _id } = req.user;

        const bookings = await Booking.find({
            user: _id
        }).populate("car").sort({ createdAt: -1 });

        res.json({ success: true, bookings });

    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}

// API to get owner bookings
async function getOwnerBookings(req, res) {
    try {
        if (req.user.role !== "owner") {
            return res.json({ success: false, message: "UnAuthorized !" })
        }

        const bookings = await Booking.find({
            owner: req.user._id,
            status: "pending"
        }).populate("car user").select("-user.password").sort({ createdAt: -1 });

        res.json({ success: true, bookings });

    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}

// API to change booking status by owner 
async function chageBookingStatus(req, res) {
    try {
        const { _id } = req.user;
        const { bookingID, status } = req.body;

        const booking = await Booking.findById(bookingID);

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Status Updated !" });

    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}

module.exports = { checkAvailability, checkAvailabilityOfCars, createBookings, getUserBookings, getOwnerBookings, chageBookingStatus };