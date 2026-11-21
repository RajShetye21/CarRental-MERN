const express = require("express");
const Router = express.Router();

const protect = require("../middleware/auth");
const ownerController = require("../controller/owner.controller");
const upload = require("../middleware/multer");


Router.post("/changeRole", protect, ownerController.changeRoleToOwner);
Router.post("/add-car", protect, upload.single("image"), ownerController.addCar);
Router.get("/cars", protect, ownerController.ownerCars);
Router.post("/toggle-car", protect, ownerController.toggleCarAvailability);
Router.post("/delete-car", protect, ownerController.DelCar);

Router.get("/dashboard", protect, ownerController.getDashData);
Router.post("/update-image", protect, upload.single('image'), ownerController.updateUserImage);

module.exports = Router;

