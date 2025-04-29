const mongoose = require("mongoose");

// Define the Bin schema
const binSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  full: Boolean,
});

// Create the Bin model
const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;
