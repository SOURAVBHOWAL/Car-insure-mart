// models/Policy.js
const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyType: { type: String, required: true },
    policyTier:{type:String,required:true},
    companyName: { type: String, required: true },
    max_coverage_amount: { type: Number, required: true },
    max_vehicle_age: { type: Number, required: true },
    idv_factor: { type: Number, required: true },
    own_damage_factor: { type: Number, required: true },
    no_of_years_covered: { type: Number, required: true },
    deductible: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Policy', policySchema);
