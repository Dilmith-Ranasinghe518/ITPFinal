const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bidSchema = new Schema({
   wtype:{
        type:String,
        required:true,//validate 
    },

    amount:{
        type:Number,
        required:true,//validate 
    },

    price:{
        type:Number,
        required:true,//validate 
    }

    

});

module.exports=mongoose.model(
    "AdminModel",//filename
    bidSchema //function name
)