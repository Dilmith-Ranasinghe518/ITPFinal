import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Edit.css";

const EditUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("editEmployee");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employees/${user._id}`, user);
      alert("Employee updated successfully!");
      localStorage.removeItem("editEmployee");
      navigate("/AdminD");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  };

  return (
    <div className="admin-main-content">
      <div className="admin-header">
        <h2>Edit Employee</h2>
      </div>
      <div className="edit-user-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>ID</label>
            <input type="text" name="id" value={user.id} onChange={handleChange} disabled />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={user.fullName} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Address</label>
            <input type="text" name="address" value={user.address} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select name="role" value={user.role} onChange={handleChange} required>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="btn-group">
            <button className="btn-primary" type="submit">Update</button>
            <button className="btn-secondary" type="button" onClick={() => navigate("/AdminD")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
