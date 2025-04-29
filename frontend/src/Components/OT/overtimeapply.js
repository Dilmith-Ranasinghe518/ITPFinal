import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./overtime.css";

const OvertimeApply = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [overtimeType, setOvertimeType] = useState("");
  const [approver, setApprover] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.data.users.length > 0) {
        setUserId(res.data.users[0]._id);
        setEmployeeName(res.data.users[0].name);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/overtimeapply", {
        userId,
        employeeName,
        fromDate,
        toDate,
        overtimeType,
        approver,
        status: "Pending",
      });

      await axios.patch(`http://localhost:5000/users/update-overtime-status/${userId}`, {
        overtimeStatus: "Pending",
      });

      setSuccessMessage("✅ Overtime Request Sent!");
      setTimeout(() => {
        navigate("/userdetails");
      }, 1200);
    } catch (error) {
      console.error("Error submitting overtime:", error);
      setSuccessMessage("❌ Error sending overtime request");
    }
  };

  return (
    <div className="overtime-container">
      <div className="overtime-card">
        <h2>Apply for Overtime</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" value={userId} disabled placeholder="Employee ID" required />
          <input type="text" value={employeeName} disabled placeholder="Employee Name" required />
          <input type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
          <input type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
          <select value={overtimeType} onChange={(e) => setOvertimeType(e.target.value)} required>
            <option value="">Select Overtime Type</option>
            <option value="regular">Regular Overtime</option>
            <option value="weekend">Weekend/Holiday Overtime</option>
            <option value="emergency">Emergency Overtime</option>
          </select>
          <input type="text" value={approver} onChange={(e) => setApprover(e.target.value)} placeholder="Supervisor Name" required />
          <button type="submit" className="btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default OvertimeApply;
