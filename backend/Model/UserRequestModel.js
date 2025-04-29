const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        enum: ['Business & Organizations', 'Home'],
        required: true,
    }
});

module.exports = mongoose.model(
    "UserRequestModel", // filename
    userRequestSchema // function name
);
