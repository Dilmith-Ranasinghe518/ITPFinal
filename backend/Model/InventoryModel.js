const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventoryTableSchema = new Schema ({

name:{
    type:String, //data Type
    required:true, //validate
},

category:{
    type:String, //data Type
    required:true, //validate
},

unit:{
        type:String, //data Type
        required:true, //validate
},

quantity:{
    type:Number, //data Type
    required:true, //validate
},

description:{
    type:String, //data Type
    

}


});

module.exports = mongoose.model(
 
    "InventoryModel", //file name
    InventoryTableSchema //function name

)