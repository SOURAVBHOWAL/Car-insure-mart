const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    body_style: { type: String, required: true },
    fuel: { type: String, required: true }, // Array of strings for fuel types
    seats: { type: Number, required: true },
    capacity: { type: Number, required: true }, // Capacity in cc
    year_of_manufacture: { type: Number, required: true },
    ex_showroom_price: { type: Number, required: true } // Price in Indian Rupees
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
