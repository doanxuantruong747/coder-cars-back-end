const mongoose = require("mongoose");
//Create schema
const carSchema = mongoose.Schema(

    {
        name: { type: String, required: true },
        model: { type: String, required: true },
        style: { type: String, required: true },
        size: { type: String, required: true },
        transmissionType: { type: String, required: true },
        price: { type: Number, required: true },
        year: { type: Number, required: true },

    },

);

//Create and export model
const Car = mongoose.model("Car", carSchema);
module.exports = Car;