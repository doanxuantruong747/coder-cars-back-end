const express = require("express")
const router = express.Router()
const { createCar, getAllCar, updateCarById, deleteCarById }
    = require("../controllers/car.controllers.js")

//Read
/**
 * @route GET api/car
 * @description get list of car
 * @access public
 */
router.get("/", getAllCar)

//Create
/**
 * @route POST api/car
 * @description create a car
 * @access public
 */
router.post("/", createCar)

//Update
/**
 * @route PUT api/car
 * @description update a car
 * @access public
 */
router.put("/:id", updateCarById)


//Delete
/**
 * @route DELETE api/car
 * @description delet a car
 * @access public
 */
router.delete("/:id", deleteCarById)

//export
module.exports = router