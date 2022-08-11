const express = require('express');
const router = express.Router();

const { sendResponse, AppError } = require("../helpers/utils.js")
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('back-end-coderCar');
});



const carRouter = require("./car.api.js")
router.use("/car", carRouter)

module.exports = router;
