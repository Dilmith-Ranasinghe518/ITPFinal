const express = require("express");
const router = express.Router();

// ✅ Import Controller
const UserControllers = require("../Controllers/UserControllers");

// ========================
// ✅ User Management Routes
// ========================

// Get all users
router.get("/", UserControllers.getAllUsers);

// Add attendance
router.post("/", UserControllers.addUsers);

// Get user by ID
router.get("/:id", UserControllers.getById);

// Update user details
router.put("/:id", UserControllers.updateUser);

// Delete user
router.delete("/:id", UserControllers.deleteUser);

// ================================
// ✅ Leave and Overtime Routes
// ================================

// Apply for Leave
router.patch("/apply-leave/:id", UserControllers.applyLeave);

// Apply for Overtime
router.patch("/apply-overtime/:id", UserControllers.applyOvertime);

// Admin Update Leave Status (Accept / Reject)
router.patch("/update-leave-status/:id", UserControllers.updateLeaveStatus);

// Admin Update Overtime Status (Accept / Reject)
router.patch("/update-overtime-status/:id", UserControllers.updateOvertimeStatus);

// ================================
// ✅ Attendance Checkout Update on Leave Approval
// ================================

// Correct way using controller
router.patch("/attendance/update-checkout-on-leave", UserControllers.updateCheckoutOnLeave);

// ========================
// ✅ Export the router
// ========================
module.exports = router;
