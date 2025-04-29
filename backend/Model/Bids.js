const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bidSchema = new Schema({
    
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    bidDate: {
        type: Date,
        required: true
    },
    wtype: {
        type: String,
        required: true
    },
    userRecommendedPrice: {
        type: Number,
        required: true
    },
    additionalNote: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'  // Default status as 'Pending'
    },
    rejectionReason: {
        type: String,
        default: ''  // Empty by default, required only when rejected
    }
}, { timestamps: true });
module.exports = mongoose.model("BidModel", bidSchema);

