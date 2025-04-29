import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./leave.css";

const LeaveApply = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [halfDay, setHalfDay] = useState("");
  const [reason, setReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5000/users");
        const currentUser = res.data.users[0];
        if (currentUser) {
          setUserId(currentUser._id); // IMPORTANT: _id for PATCH!
          setPhoneNumber(currentUser.phone || "");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First Apply Leave in Leave Collection
      await axios.post("http://localhost:5000/api/leaveapply", {
        userId,
        phoneNumber,
        leaveType,
        fromDate,
        toDate,
        halfDay,
        reason,
        status: "Pending",
      });

      // Then Update User's Leave Status in Users Collection
      await axios.patch(`http://localhost:5000/users/update-leave-status/${userId}`, {
        leaveStatus: "Pending",
      });

      setSuccessMessage("✅ Leave Request Sent Successfully!");
      setTimeout(() => {
        navigate("/userdetails");
      }, 1200);
    } catch (error) {
      console.error("Error submitting leave:", error);
      setSuccessMessage("❌ Error sending leave request");
    }
  };

  return (
    <div className="leave-container">
      <div className="leave-card">
        <h2 className="leave-title">Apply for Leave</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Employee ID */}
          <div className="input-group">
            <label>Employee ID</label>
            <input type="text" value={userId} disabled className="input-disabled" />
          </div>

          {/* Phone */}
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              maxLength={10}
              required
            />
          </div>

          {/* Leave Type */}
          <div className="input-group">
            <label>Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Annual">Annual Leave</option>
            </select>
          </div>

          {/* Dates */}
          <div className="date-group">
            <div className="input-group">
              <label>From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Half Day */}
          <div className="input-group">
            <label>Half Day</label>
            <select
              value={halfDay}
              onChange={(e) => setHalfDay(e.target.value)}
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Reason */}
          <div className="input-group">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Optional reason"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button type="submit" className="btn-primary">Submit</button>
            <button type="reset" className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApply;
