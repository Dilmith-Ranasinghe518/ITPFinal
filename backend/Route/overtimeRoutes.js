const express = require("express");
const router = express.Router();
const Overtime = require("../Model/OvertimeModel");
const User = require("../Model/UserModel");




const { requestOvertime, getOvertimeRequests, updateOvertimeStatus } = require("../Controllers/overtimeController");



// Employee applies for overtime
router.post("/apply", requestOvertime);

// Admin fetches all overtime requests
router.get("/manage", getOvertimeRequests);

// Admin approves/rejects request
router.put("/:id/status", updateOvertimeStatus);












// ✅ Apply for Overtime Request
router.post("/overtimeapply", async (req, res) => {
  try {
    const { userId, employeeName, fromDate, toDate, overtimeType, approver } = req.body;

    if (!userId || !employeeName || !fromDate || !toDate || !overtimeType || !approver) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    const newOvertime = new Overtime({
      userId,
      employeeName,
      fromDate,
      toDate,
      overtimeType,
      approver,
      status: "Pending"
    });

    await newOvertime.save();
    return res.json({ status: "success", message: "Overtime request successfully submitted!" });

  } catch (err) {
    console.error("❌ Server Error:", err);
    return res.status(500).json({ status: "error", message: "Server error. Try again later." });
  }
});

// ✅ Admin Approval or Rejection
router.put("/overtime/:id", async (req, res) => {
  try {
    const { status } = req.body; // Expected: "Approved" or "Rejected"
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const overtime = await Overtime.findById(req.params.id);
    if (!overtime) {
      return res.status(404).json({ message: "Overtime request not found" });
    }

    overtime.status = status;
    await overtime.save();

    // ✅ If approved, update user details page overtime field
    if (status === "Approved") {
      const user = await User.findOne({ userId: overtime.userId });
      if (user) {
        user.overtimeHours += 2; // Example: adding 2 hours of overtime
        await user.save();
      }
    }

    return res.json({ status: "success", message: `Overtime request ${status.toLowerCase()}` });

  } catch (err) {
    console.error("❌ Error updating overtime status:", err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});


// Get all overtime requests
router.get("/overtime", async (req, res) => {
  try {
      const overtimeRequests = await Overtime.find();
      return res.status(200).json({ overtime: overtimeRequests });
  } catch (error) {
      console.error("Error fetching overtime requests:", error);
      return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/overtime/:id", async (req, res) => {
  try {
    await Overtime.findByIdAndDelete(req.params.id);
    return res.json({ status: "success", message: "Overtime record deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ status: "error", message: "Failed to delete" });
  }
});


module.exports = router;
