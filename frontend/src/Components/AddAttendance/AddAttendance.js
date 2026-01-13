import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./attendenceform.css";

function AddAttendance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Id: "",
    name: "",
    date: new Date().toISOString().split("T")[0], // Auto-set current date
    time: new Date().toTimeString().substring(0, 5), // Auto-set current time
  });

  const [errors, setErrors] = useState({
    Id: "",
    name: "",
    date: "",
    time: "",
  });

  const handleIdChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[AE]?[0-9]{0,6}$/.test(value)) {
      setFormData((prev) => ({ ...prev, Id: value }));
      setErrors((prevErrors) => ({ ...prevErrors, Id: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { Id: "", name: "", date: "", time: "" };

    if (!/^[AE][0-9]{6}$/.test(formData.Id)) {
      newErrors.Id = "ID must start with A or E and have exactly 6 digits (e.g., A123456)";
      isValid = false;
    }
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5008/users", formData);
      alert("Attendance recorded successfully!");
      localStorage.setItem("empId", formData.Id);
      localStorage.setItem("empName", formData.name);
      navigate("/userdetails");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(" Attendance already submitted for this date.");
      } else {
        console.error("Error submitting attendance:", error);
        alert(" Failed to submit attendance. Please try again.");
      }
    }
  };

  return (
    <div className="attendance-form-container">
      <h1 className="attendance-title">Add Attendance</h1>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="attendance-group">
          <label htmlFor="Id" className="attendance-label">Employee ID:</label>
          <input
            type="text"
            id="Id"
            name="Id"
            onChange={handleIdChange}
            value={formData.Id}
            placeholder="Enter ID"
            className="attendance-input"
            required
          />
          {errors.Id && <span className="attendance-error">{errors.Id}</span>}
        </div>

        <div className="attendance-group">
          <label htmlFor="name" className="attendance-label">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Enter Full Name"
            className="attendance-input"
            required
          />
          {errors.name && <span className="attendance-error">{errors.name}</span>}
        </div>

        <div className="attendance-group">
          <label htmlFor="date" className="attendance-label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            className="attendance-input"
            readOnly 
          />
        </div>

        <div className="attendance-group">
          <label htmlFor="time" className="attendance-label">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            className="attendance-input"
            readOnly 
          />
        </div>

        <button type="submit" className="attendance-submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default AddAttendance;
