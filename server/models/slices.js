const mongoose = require("mongoose")
const { Schema } = require('mongoose')


const burgerSlice = new Schema({
    slice: { type: String },
    slice_price: { type: Number }
},{
    timestamps: true
})

module.exports = mongoose.model("Slices", burgerSlice)