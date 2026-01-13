import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHome,
  FaUserClock,
  FaCalendarAlt,
  FaClock,
  FaMoneyCheckAlt, // 🆕 Import Salary Icon
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaUsers,
  FaUserShield,
  FaUserFriends
} from "react-icons/fa";

import "./AdminD.css";
import adminLogo from "../../assets/admin-photo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      emp.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5008/employees");
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5008/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (employee) => {
    localStorage.setItem("editEmployee", JSON.stringify(employee));
    navigate("/EditUser");
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  const totalEmployees = employees.length;
  const adminCount = employees.filter((emp) => emp.role === "Admin").length;
  const staffCount = employees.filter((emp) => emp.role === "Staff").length;

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        {/* Admin Info */}
        <div className="admin-user">
          <img src={adminLogo} alt="Admin" className="admin-logo" />
          <h3>Nirod Gimhan</h3>
          <p>Super Admin</p>
        </div>

        {/* Sidebar Menu */}
        <div className="admin-menu">
          <button onClick={() => navigate("/AdminD")}><FaHome /> Dashboard</button>
          <button onClick={() => navigate("/AdminAttend")}><FaUserClock /> Attendance</button>
          <button onClick={() => navigate("/leave")}><FaCalendarAlt /> Leaves</button>
          <button onClick={() => navigate("/overtimedisplay")}><FaClock /> Overtime</button>
          
          {/* 🆕 Added Salary button here */}
          <button onClick={() => navigate("/salary")}><FaMoneyCheckAlt /> Salary</button>

          <button onClick={() => navigate("/settings")}><FaCog /> Settings</button>
        </div>

        {/* Logout */}
        <div className="admin-logout">
          <button onClick={() => navigate("/logout")}><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      {/* Main Body */}
      <div className="admin-main">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <div className="admin-darkmode-toggle">
            <label className="switch">
              <input type="checkbox" id="darkModeToggle" onChange={toggleDarkMode} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Cards */}
        <div className="admin-stats">
          <div className="admin-card">
            <div className="admin-card-icon"><FaUsers /></div>
            <div className="admin-card-content">
              <h4>Total Employees</h4>
              <p>{totalEmployees}</p>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-icon"><FaUserShield /></div>
            <div className="admin-card-content">
              <h4>Admin Accounts</h4>
              <p>{adminCount}</p>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-icon"><FaUserFriends /></div>
            <div className="admin-card-content">
              <h4>Staff Members</h4>
              <p>{staffCount}</p>
            </div>
          </div>
        </div>

        {/* Search and Add */}
        <div className="admin-search-add">
          <input
            type="text"
            placeholder="Search Employees"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <button className="add-btn" onClick={() => navigate("/AddNewUser")}>+ Add Employee</button>
        </div>

        {/* Employee Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.id}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.role}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phoneNumber}</td>
                    <td>{emp.address}</td>
                    <td className="action-icons">
                      <button className="edit-btn" onClick={() => handleEdit(emp)}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(emp._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
