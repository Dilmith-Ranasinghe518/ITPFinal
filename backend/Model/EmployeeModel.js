const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Staff"], default: "Staff", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);