const express = require("express");
const Router = express.Router();

const userController = require("../controller/user.controller");
const protect = require("../middleware/auth");


Router.post('/register', userController.registerUser);

Router.post('/login', userController.loginUser);

Router.get("/data", protect, userController.getUserData);

Router.get("/cars", userController.getCars);



module.exports = Router;

