import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddAttendanceForm.css";

const AdminAddAttendance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Id: "",
    name: "",
    date: "",
    time: "",
  });

  const [error, setError] = useState("");

  // 🛑 ID input restrict real-time typing: only A/E + 6 digits
  const handleIdChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[AE]?[0-9]{0,6}$/.test(value)) {
      setFormData((prev) => ({ ...prev, Id: value }));
      setError("");
    }
  };

  // Other inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[AE][0-9]{6}$/.test(formData.Id)) {
      setError("ID must start with A or E and have exactly 6 digits.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", formData);
      alert("✅ Attendance manually added!");
      navigate("/AdminAttend");
    } catch (err) {
      console.error("Error submitting attendance:", err);
      setError("Error submitting attendance. Please try again.");
    }
  };

  return (
    <div className="admin-att-form-container">
      <h2 className="admin-att-title">➕ Add Attendance</h2>
      {error && <p className="admin-att-error">{error}</p>}
      <form onSubmit={handleSubmit} className="admin-att-form">

        <label>Employee ID</label>
        <input
          type="text"
          name="Id"
          value={formData.Id}
          onChange={handleIdChange}
          placeholder="Enter ID"
          required
        />

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
           placeholder="Enter Full Nmae"
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Check-In Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <button type="submit" className="admin-att-submit">Submit Attendance</button>
      </form>
    </div>
  );
};

export default AdminAddAttendance;
