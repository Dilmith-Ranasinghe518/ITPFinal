const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Id: {
        type: String,
        required: true,  
    },
    name: {
        type: String,
        required: true, 
    },
    date: {
        type: Date,  
        required: true,  
    },
    time: {
        type: String,  
        required: true,  
    },
});

module.exports = mongoose.model("UserModel", userSchema);
