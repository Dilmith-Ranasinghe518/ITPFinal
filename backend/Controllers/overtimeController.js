const Overtime = require("../Model/OvertimeModel");

// ✅ 1. Employee applies for overtime (Default: Pending)
const requestOvertime = async (req, res) => {
    const { userId, employeeName, fromDate, toDate, overtimeType, approver } = req.body;
    
    try {
        const overtimeRequest = new Overtime({
            userId,
            employeeName,
            fromDate,
            toDate,
            overtimeType,
            approver,
            status: "Pending"  // Default state
        });

        await overtimeRequest.save();
        res.status(201).json({ success: true, message: "Overtime request submitted", overtime: overtimeRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error processing request", error });
    }
};

// ✅ 2. Fetch all overtime requests (Admin Page)
const getOvertimeRequests = async (req, res) => {
    try {
        const overtimeRequests = await Overtime.find();
        res.status(200).json({ success: true, overtime: overtimeRequests });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching requests", error });
    }
};

// ✅ 3. Admin Approves/Rejects Overtime
const updateOvertimeStatus = async (req, res) => {
    const { status } = req.body;  // Accepts "Approved" or "Rejected"
    const { id } = req.params; // Overtime Request ID

    try {
        const overtime = await Overtime.findByIdAndUpdate(id, { status }, { new: true });

        if (!overtime) {
            return res.status(404).json({ success: false, message: "Overtime request not found" });
        }

        res.status(200).json({ success: true, message: `Overtime ${status}`, overtime });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating status", error });
    }
};




// ✅ DELETE OVERTIME BY ID
exports.deleteOvertime = async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Overtime.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ status: "error", message: "Overtime record not found" });
      }
  
      return res.status(200).json({ status: "success", message: "Overtime deleted successfully!" });
    } catch (err) {
      console.error("Error deleting overtime:", err);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  };


// ✅ Export functions
module.exports = { requestOvertime, getOvertimeRequests, updateOvertimeStatus };
