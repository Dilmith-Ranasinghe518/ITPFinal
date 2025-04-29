import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dash.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function EmpDash() {
  const navigate = useNavigate();
  // State to store employee details
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee"); // Replace with dynamic user ID
      setEmployee(response.data);
    } catch (error) {
      console.error("❌ Error fetching employee details:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* User Logo */}
        <div className="user-logo">
          <img
            src="https://via.placeholder.com/100" // Replace with user image URL
            alt="User Logo"
            className="logo"
          />
          <h3>Dilmith Ranasinghe</h3>
        </div>
        <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
        {/* Navigation Buttons */}
        <div className="sidebar-buttons">
          <button className="sidebar-btn active">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button className="sidebar-btn"onClick={() => navigate("/bins")}>
            <i className="fas fa-money-check-alt"></i> View Tasks
          </button>
          <button className="sidebar-btn"  onClick={() => navigate("/UserDetails")}>
            <i className="fas fa-calendar-check"></i> Attendance
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-calendar-day"></i> Calendar
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-comment-dots"></i> Feedback
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-building"></i> Company
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-cog"></i> Settings
          </button>
        </div>
        <div className="sidebar-footer" onClick={() => navigate("/logout")}>
          <button className="sidebar-btn logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="main-content">
        <h1>Employee Dashboard</h1>
        <div className="dashboard-details">
          {/* ✅ Updated Your Details Section */}
          <div className="hr-management">
            <div className="hr-header">
              <h2>Your Details</h2>
              <div className="hr-header-right">
                
                <button className="edit-btn">
                  <i className="fas fa-edit"></i> Edit
                </button>
              </div>
            </div>
            <div className="hr-details">
              <p><strong>ID:</strong> {employee.id}</p>
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phoneNumber}</p>
              <p><strong>Address:</strong> {employee.address}</p>
            </div>
          </div>

          {/* User Dashboard Details */}
          <div className="user-details">
            <h2>Your Tasks</h2>
            <div className="details-grid">
              <div className="detail-item">
                <h3>Total Leaves</h3>
                <p>10</p>
              </div>
              <div className="detail-item">
                <h3>Pending Tasks</h3>
                <p>5</p>
              </div>
              <div className="detail-item">
                <h3>Upcoming Meetings</h3>
                <p>2</p>
              </div>
              <div className="detail-item">
                <h3>Completed Projects</h3>
                <p>8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpDash;
