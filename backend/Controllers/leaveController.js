const Leave = require("../Model/Leave");

// Apply Leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, halfDay, reason, userId, phoneNumber } = req.body;
    if (!leaveType || !fromDate || !toDate || !halfDay || !userId || !phoneNumber) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    const newLeave = new Leave({
      leaveType,
      fromDate,
      toDate,
      halfDay,
      reason,
      userId,
      phoneNumber,
      status: "Pending",
    });

    await newLeave.save();
    return res.status(201).json({ status: "success", message: "Leave applied successfully", leave: newLeave });
  } catch (error) {
    console.error("Error applying leave:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Get All Leaves
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: "success", leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Update Leave Status
exports.updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ status: "error", message: "Status required" });

    const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedLeave) return res.status(404).json({ status: "error", message: "Leave not found" });

    return res.status(200).json({ status: "success", leave: updatedLeave });
  } catch (error) {
    console.error("Error updating leave:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Delete Leave
exports.deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeave = await Leave.findByIdAndDelete(id);
    if (!deletedLeave) return res.status(404).json({ status: "error", message: "Leave not found" });

    return res.status(200).json({ status: "success", message: "Leave deleted" });
  } catch (error) {
    console.error("Error deleting leave:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};
