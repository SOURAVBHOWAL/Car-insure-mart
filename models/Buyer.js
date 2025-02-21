const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    eId:{type: String, required: true,unique:true},
    Company_Name: { type: String, required: true },
    Policy_Type: { type: String, required: true },
    Policy_Tier:{type:String,required:true},
    Max_Vehicle_Age: { type: String, required: true },
    No_of_Years_Covered: { type: String, required: true },
    Deductible: { type: String, required: true },
    Idv_Factor: { type: String, required: true },
    Premium_Price:{type: String, required: true},
    startingDate: { type: String },
    validTill:{type:String},
    profilePictureURL: { type: String }
},{collection:'buyer'});

module.exports = mongoose.model('Buyer', buyerSchema);
