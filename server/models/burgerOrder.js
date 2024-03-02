const mongoose = require("mongoose")
const { Schema } = require('mongoose')


const burgerOrder = new Schema({
    customer_modile_number: { type: Number, required: [true, "Please enter your mobile number"]},
    order_number: { type: String, required: [true, "Please provide the order number"]},
    order_quantity: { type: Number, default: 1 },
    slices: {type: Object,default: null}
},{
    timestamps: true
})

module.exports = mongoose.model("Orders", burgerOrder)