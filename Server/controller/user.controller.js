const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Car = require("../models/Car");

// register User 
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // if (!name || !email || !password || !password.length <= 8) {
        //     return res.status(400).json({
        //         message: "Fill all the fields !"
        //     });
        // }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please log in."
            });
        }

        const Hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: Hash
        });

        const Token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRETE);


        res.status(201).json({
            success: true,
            message: "User registered Successfully!",
            token: Token
        })

    } catch (err) {
        console.log(err.message);
        if (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }
}

// Login User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please register first."
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Token 
        const Token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRETE);

        res.status(201).json({
            success: true,
            message: "Login successfull !",
            token: Token
        })

    } catch (err) {
        console.log(err.message);
        if (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    }
}

async function getUserData(req, res) {
    try {
        const { user } = req;
        res.json({ success: true, user });
    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}

// get all cars from frontend 
async function getCars(req, res) {
    try {
        const cars = await Car.find({ isAvailable: true });

        res.json({ success: true, cars });
    } catch (e) {
        console.log(e.message);
        res.json({ success: false, message: e.message });
    }
}


module.exports = { registerUser, loginUser, getUserData, getCars };