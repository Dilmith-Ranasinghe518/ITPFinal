import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import "./attendd.css";

function UserDetails() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      const allUsers = res.data.users || [];
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("✅ Report Downloaded!"),
  });

  const handleSearch = () => {
    const filtered = users.filter((user) =>
      Object.values(user).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleSendReport = () => {
    const phoneNumber = "+94717170333"; 
    const message = "Selected User Reports";
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleApplyLeave = () => {
    navigate("/leaveapply");
  };

  const handleApplyOvertime = () => {
    navigate("/overtimeapply");
  };

  const getCheckOut = (user) => {
    if (user.checkOut) return user.checkOut;
    if (user.leaveStatus === "Accepted") return "14:00"; // Auto-fill for approved leave
    return "N/A";
  };

  const calculateWorkTime = (checkIn, checkOut) => {
    if (!checkIn || !checkOut || checkOut === "N/A") return "N/A";
    const [inH, inM] = checkIn.split(":").map(Number);
    const [outH, outM] = checkOut.split(":").map(Number);
    const totalMinutes = (outH * 60 + outM) - (inH * 60 + inM);
    if (totalMinutes < 0) return "N/A";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hrs ${minutes} mins`;
  };

  return (
    <div className="attendance-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-logo">
          <img src="https://via.placeholder.com/100" alt="User Logo" className="logo" />
          <h3>John Doe</h3>
        </div>

        <div className="sidebar-buttons">
          <button className="sidebar-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="sidebar-btn active" onClick={() => navigate("/attendance")}>Attendance</button>
          <button className="sidebar-btn" onClick={() => navigate("/salary")}>Salary</button>
          <button className="sidebar-btn" onClick={() => navigate("/settings")}>Settings</button>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-btn logout-btn" onClick={() => navigate("/logout")}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="attendance-main-content">
        <h1>Time & Attendance</h1>

        <div className="attendance-controls">
          <input
            type="text"
            placeholder="Search Users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="attendance-btn" onClick={handleSearch}>Search</button>
          <button className="attendance-btn" onClick={handlePrint}>Download Report</button>
          <button className="attendance-btn" onClick={handleSendReport}>Send Report</button>

          <div className="action-buttons">
            <button className="action-btn leave-btn" onClick={handleApplyLeave}>Apply Leave</button>
            <button className="action-btn overtime-btn" onClick={handleApplyOvertime}>Apply Overtime</button>
          </div>
        </div>

        <div ref={componentRef} className="table-container">
          {noResults ? (
            <p>No users found</p>
          ) : (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Work Time</th>
                  <th>Leave Status</th>
                  <th>Overtime Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => {
                  const checkOutTime = getCheckOut(user);
                  const workTime = calculateWorkTime(user.time, checkOutTime);

                  return (
                    <tr key={index}>
                      <td>{user.Id}</td>
                      <td>{user.name}</td>
                      <td>{user.date}</td>
                      <td>{user.time || "N/A"}</td>
                      <td>{checkOutTime}</td>
                      <td>{workTime}</td>

                      {/* Leave Status with Blinking if Pending */}
                      <td className={user.leaveStatus === "Pending" ? "status-pending blinking" 
                            : user.leaveStatus === "Accepted" ? "status-approved" 
                            : "status-rejected"}>
                        {user.leaveStatus || "No"}
                      </td>

                      {/* Overtime Status with Blinking if Pending */}
                      <td className={user.overtimeStatus === "Pending" ? "status-pending blinking" 
                            : user.overtimeStatus === "Approved" ? "status-approved" 
                            : "status-rejected"}>
                        {user.overtimeStatus || "No"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
