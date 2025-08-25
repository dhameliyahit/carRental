const express = require("express");
const {
    CreateCarController,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
} = require("../controller/CarController");
const CarModel = require("../model/CarModel");  // ✅ ADD THIS
const router = express.Router();
const formidable = require("express-formidable");


//create car
router.post("/create/car", formidable(), CreateCarController)

//get all cars
router.get("/cars", getAllCars)

//get car by id
router.get("/car/:id", getCarById)

//update car
router.patch("/update/car/:id", updateCar);

//delete Car
router.delete("/delete/car/:id", deleteCar)




module.exports = router