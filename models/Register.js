const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dob: {type: String, required: true},
    pan: {type: String, required: true, unique: true},
    mobile: {type: String, required: true},
    emailId:{type: String, required: true, unique: true},
    otp:{type:String},
    selfDriver: {type: String, required: true},
    License: {type: String, required: true},             //new
    // gender:{type:String,required:true},         //new
    // age:{type:Number,required:true},           //new
    // region:{type:String,required:true},           //new
    // location:{type:String,required:true},       //new
    // education:{type:String,required:true},           //new           
    // income:{type:Number,required:true},           //new
    // vehicleAge:{type:String,required:true},           //new
    // damage:{type:String,required:true},           //new
    // type:{type:String,required:true},           //new
    // previous:{type:Number,required:true},           //new
    vehicleType: {type: String, required: true},
    planType: {type: String, required: true},
    purchaseDate: {type: String, required: true},
    registrationNumber: {type: String,required: true,unique:true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    variant: {type: String, required: true},
    fuel:{type: String, required: true},
    bodyType:{type: String, required: true},
    manufactureYear: {type: String, required: true, min:1900,max:2024},
    engine:{type: String, required: true},
    chassis:{type: String, required: true},
    seat: {type: String, required: true},
    calcIdv:{type:String, required:true},
    myrange:{type: String},
    expected:{type:String},
    usageType: {type: String, required: true},
    duration:{type: String, required: true},
    ncb: {type: String, required: true},
    zerodep:{type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    carPic:{type:String},
    damageSeverity:{type:String}
});

module.exports = mongoose.model('Register ', registerSchema);