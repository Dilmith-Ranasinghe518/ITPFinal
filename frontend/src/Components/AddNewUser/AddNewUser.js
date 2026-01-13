import React, { useState } from "react";
import axios from "axios";
import "./AddNewU.css";
import { useNavigate } from "react-router-dom";

const AddNewUser = () => {
  const navigate = useNavigate();

  const generateEmployeeId = () => {
    return "E" + Math.floor(100000 + Math.random() * 900000);
  };

  const [formData, setFormData] = useState({
    id: generateEmployeeId(),
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "Staff"
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate input as the user types
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation based on field name
    if (name === "fullName") {
      // Prevent non-alphabetic characters in Full Name
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          fullName: "Full Name must contain only letters and spaces."
        }));
      } else {
        setErrors((prev) => ({ ...prev, fullName: "" }));
      }
    } else if (name === "email") {
      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address."
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === "phoneNumber") {
      // Allow only digits and limit the length to 10 characters for phone number
      if (!/^\d{0,10}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: "Phone number must be 10 digits."
        }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }
    } else if (name === "address") {
      // Handle address (no specific validation needed, but can be added)
      if (value.length < 5) {
        setErrors((prev) => ({
          ...prev,
          address: "Address must be at least 5 characters long."
        }));
      } else {
        setErrors((prev) => ({ ...prev, address: "" }));
      }
    }
  };

  // Prevent typing of invalid characters (block invalid key presses)
  const handleKeyPress = (e) => {
    const name = e.target.name;

    if (name === "fullName") {
      // Block anything that is not a letter or space for fullName
      if (!/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
      }
    }

    if (name === "phoneNumber") {
      // Block anything that is not a number
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }

    if (name === "amount" || name === "price") {
      // Prevent `0` as the first character or any non-numeric input
      if ((e.key === "0" && e.target.value === "") || !/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before sending request
    if (Object.values(errors).some((error) => error !== "")) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5008/employees", formData);
      if (response.data.status === "success") {
        alert("✅ Employee added successfully!");
        navigate("/AdminDashboard"); 
      } else {
        alert("❌ Error adding employee.");
      }
    } catch (error) {
      console.error("❌ Server error:", error);
      alert("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="add-user-container">
      <div className="form-card">
        <h2 className="form-title">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Employee ID</label>
            <input type="text" name="id" value={formData.id} readOnly />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // Prevent special characters/numbers
              required
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onKeyPress={handleKeyPress} // Block non-numeric characters
              required
            />
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          <div className="input-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              required
            ></textarea>
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="btn-group">
            <button className="btn-primary" type="submit">Add Employee</button>
            <button className="btn-secondary" type="reset">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
