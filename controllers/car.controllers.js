const { sendResponse, AppError } = require("../helpers/utils.js")

const Car = require("../models/Car.js")

const carController = {}
//Create a Car
carController.createCar = async (req, res, next) => {

    try {
        const { name, model, style, size, transmissionType, price, year } = req.body;
        const info = {
            name, model, style, size, transmissionType, price, year
        }
        //always remember to control your inputs
        if (!info) throw new AppError(402, "Bad Request", "Create Car Error")

        //mongoose query
        const created = await Car.create(info)

        sendResponse(res, 200, true, { data: created }, null, "Create Car Success")
    } catch (err) {
        next(err)
    }
}

//Get all Car
carController.getAllCar = async (req, res, next) => {
    const allowedFilter = [
        "id", "name", "model", "style",
        "size", "transmissionType",
        "price", "year",
    ];

    try {
        let { page, limit, ...filterQuery } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const filterKeys = Object.keys(filterQuery);
        filterKeys.forEach((key) => {
            if (!allowedFilter.includes(key)) {
                const exception = new Error(`Query ${key} is not allowed`);
                exception.statusCode = 401;
                throw exception;
            }
            if (!filterQuery[key]) delete filterQuery[key];
        });

        let result = {}
        //mongoose query
        let listOfFound = await Car.find(result).sort({ _id: -1 })

        let offset = limit * (page - 1);

        if (filterKeys.length) {
            filterKeys.forEach((condition) => {
                result = result.length
                    ? result.filter((car) => car[condition] === filterQuery[condition])
                    : listOfFound.filter((car) => car[condition] === filterQuery[condition]);
            });
        } else {
            result = listOfFound;
        }

        //then select number of result by offset
        let total = Math.ceil(listOfFound.length / limit)
        listOfFound.unshift()
        listOfFound = listOfFound.slice(offset, offset + limit);

        sendResponse(res, 200, true,
            { data: listOfFound, page, total },
            null, "list of car success")
    } catch (err) {
        next(err)
    }
}

//Update a Car
carController.updateCarById = async (req, res, next) => {

    const { id } = req.params
    const updateInfo = req.body

    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true }
    try {
        //mongoose query
        const updated = await Car.findByIdAndUpdate(id, updateInfo, options)

        sendResponse(res, 200, true, { data: updated }, null, "Update Car success")
    } catch (err) {
        next(err)
    }
}


//Delete Car
carController.deleteCarById = async (req, res, next) => {

    const { id } = req.params
    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true }
    try {
        //mongoose query
        const updated = await Car.findByIdAndDelete(id, options)

        sendResponse(res, 200, true, { data: updated }, null, "Delete Car success")
    } catch (err) {
        next(err)
    }
}


//export
module.exports = carController