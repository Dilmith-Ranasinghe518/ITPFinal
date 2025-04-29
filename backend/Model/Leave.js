const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  leaveType: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  halfDay: { type: String, required: true },
  reason: { type: String },
  userId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Leave", LeaveSchema);
