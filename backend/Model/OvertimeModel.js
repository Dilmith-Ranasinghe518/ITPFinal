const mongoose = require("mongoose");

const OvertimeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  employeeName: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  overtimeType: { type: String, required: true },
  approver: { type: String, required: true },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Overtime", OvertimeSchema);
