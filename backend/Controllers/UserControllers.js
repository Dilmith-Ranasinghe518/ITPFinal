const User = require("../Model/UserModel");
const Attendance = require("../Model/AttendanceModel"); // ✅ Import Attendance Model

// ✅ Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Add Attendance
const addUsers = async (req, res) => {
  const { Id, name, date, time } = req.body;
  try {
    const existing = await User.findOne({ Id, name, date });
    if (existing) {
      return res.status(409).json({ message: "Attendance already submitted for this date." });
    }
    const newUser = new User({ Id, name, date, time });
    await newUser.save();
    return res.status(201).json({ success: true, message: "Attendance submitted successfully.", user: newUser });
  } catch (err) {
    console.error("❌ Error saving attendance:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ✅ Get User By ID
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Id, name, date, time } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { Id, name, date, time }, { new: true });
    if (!user) return res.status(404).json({ message: "Unable to update user." });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Unable to delete user." });
    return res.status(200).json({ message: "User deleted successfully.", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Apply Leave
const applyLeave = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { leaveStatus: "Pending" }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ message: "Leave request sent successfully.", user });
  } catch (err) {
    console.error("Error applying leave:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Apply Overtime
const applyOvertime = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { overtimeStatus: "Pending" }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ message: "Overtime request sent successfully.", user });
  } catch (err) {
    console.error("Error applying overtime:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Update Leave Status
const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { leaveStatus } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { leaveStatus }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ message: "Leave status updated successfully.", user });
  } catch (err) {
    console.error("Error updating leave status:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ✅ Update Overtime Status
const updateOvertimeStatus = async (req, res) => {
  const { id } = req.params;
  const { overtimeStatus } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { overtimeStatus }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ message: "Overtime status updated successfully.", user });
  } catch (err) {
    console.error("Error updating overtime status:", err);
    return res.status(500).json({ message: "Server error." });
  }
};



const updateCheckoutOnLeave = async (req, res) => {
  const { userId, date, checkOut } = req.body;
  try {
    const attendance = await User.findOne({ Id: userId, date: date });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found." });
    }
    attendance.checkOut = checkOut;
    attendance.status = "Leave";
    await attendance.save();
    return res.status(200).json({ message: "Checkout updated successfully.", attendance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

 //delete user deatails



// ✅ Export all Controllers
module.exports = {
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
  applyLeave,
  applyOvertime,
  updateLeaveStatus,
  updateOvertimeStatus,
  updateCheckoutOnLeave, // ✅ Added here
};


