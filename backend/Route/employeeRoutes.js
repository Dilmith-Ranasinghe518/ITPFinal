const express = require("express");
const router = express.Router();
const Employee = require("../Model/EmployeeModel"); // Use Employee model instead of User

// ✅ Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// ✅ Add New Employee
router.post("/", async (req, res) => {
  const { id, fullName, email, phoneNumber, address, role } = req.body;

  try {
    const newEmployee = new Employee({ id, fullName, email, phoneNumber, address, role });
    await newEmployee.save();
    res.status(201).json({ status: "success", message: "Employee added successfully!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error adding employee" });
  }
});

// ✅ Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "Employee deleted successfully!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error deleting employee" });
  }
});

// ✅ Update Employee
router.put("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", message: "Employee updated successfully!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error updating employee" });
  }
});

// ✅ Verify employee by ID and Full Name
router.post("/verify", async (req, res) => {
  const { id, fullName } = req.body;
  try {
    const employee = await Employee.findOne({ id, fullName });
    if (employee) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Invalid ID or name" });
    }
  } catch (err) {
    console.error("Verification Error:", err);
    res.status(500).json({ success: false, message: "Server error while verifying employee" });
  }
});

module.exports = router;