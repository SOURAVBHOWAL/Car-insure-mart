const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    eId:{type: String, required: true,unique:true},
    Company_Name: { type: String, required: true },
    Policy_Type: { type: String, required: true },
    Policy_Tier:{type:String,required:true},
    damagePic: { type: String,required:true },
    damageLocation:{type:String},
    damageSeverity:{type:String},
    invoicePic:{type: String},
    billAmount:{type:String,require:true},
    amountPaid:{type: String},
    statusCode:{type: String, required: true}
},{collection:'claim'});

module.exports = mongoose.model('Claim', claimSchema);