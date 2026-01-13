import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditAttendanceForm.css";

const EditAttendanceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Attendance record ID
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    checkOut: "",
    status: "Active",
  });

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setFormData(res.data.user);
    } catch (err) {
      console.error("❌ Failed to fetch data", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${id}`, formData);
      alert("✅ Attendance updated successfully!");
      navigate("/AdminAttend");
    } catch (err) {
      console.error("❌ Error updating attendance:", err);
      alert("Error updating record.");
    }
  };

  return (
    <div className="edit-att-container">
      <h2 className="edit-att-title">✏️ Edit Attendance</h2>
      <form onSubmit={handleSubmit} className="edit-att-form">
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Check-In</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />

        <label>Check-Out</label>
        <input type="time" name="checkOut" value={formData.checkOut} onChange={handleChange} required />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Leave">Leave</option>
        </select>

        <button type="submit" className="edit-att-btn">Update Attendance</button>
      </form>
    </div>
  );
};

export default EditAttendanceForm;
