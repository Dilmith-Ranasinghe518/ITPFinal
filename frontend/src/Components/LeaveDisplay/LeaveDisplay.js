import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./leaveDisplay.css";

const LeaveDisplay = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("/api/leaves");
      const data = res.data.leaves || [];
      const processedLeaves = data.map((leave) => ({
        ...leave,
        status: leave.status || "Pending",
      }));
      setLeaves(processedLeaves);
    } catch (error) {
      console.error("❌ Error fetching leaves", error);
    }
  };

  const handleSearch = () => {
    const filtered = leaves.filter((leave) =>
      Object.values(leave).some((val) =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setLeaves(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("🗑️ Are you sure you want to delete this leave request?")) {
      try {
        await axios.delete(`/api/leaves/${id}`);
        setSuccessMessage("🗑️ Leave Deleted Successfully!");
        fetchLeaves();
      } catch (error) {
        console.error("❌ Error deleting leave", error);
      }
    }
  };

  const handleStatusUpdate = async (leaveId, newStatus, userId) => {
    try {
      const leave = leaves.find((l) => l._id === leaveId);
      if (!leave) return;

      // Step 1: Update leave status
      await axios.patch(`/api/leaves/${leaveId}`, { status: newStatus });

      // Step 2: Update user's leave status
      await axios.patch(`/api/users/update-leave-status/${userId}`, { leaveStatus: newStatus });

      // Step 3: If Accepted → also update Attendance checkout time
      if (newStatus === "Accepted") {
        const checkOutTime = "14:00"; // Approved 2 PM time

        await axios.patch(`/api/users/attendance/update-checkout-on-leave`, {
          userId: leave.userId,
          date: leave.fromDate,
          checkOut: checkOutTime,
        });
      }

      setSuccessMessage(`✅ Leave ${newStatus} Successfully!`);
      fetchLeaves(); // Refresh table
    } catch (error) {
      console.error("❌ Error updating leave status", error);
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-LK", {
      timeZone: "Asia/Colombo",
      dateStyle: "medium",
    });
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Leave_Report",
    onAfterPrint: () => setSuccessMessage("✅ Leave Report Downloaded!"),
  });

  const handleExportToFinance = () => {
    setSuccessMessage("📤 Leave Data Exported to Finance Department!");
  };

  return (
    <div className="leave-admin-container">
      <div className="leave-back-btn" onClick={() => navigate("/AdminD")}>
        ⬅ Back
      </div>

      <div className="leave-admin-header">
        <h2>Leave Requests Management</h2>

        {successMessage && (
          <div className="leave-success-message">{successMessage}</div>
        )}

        <div className="leave-search-area">
          <input
            type="text"
            placeholder="Search leaves..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="leave-search-input"
          />
          <button className="leave-search-btn" onClick={handleSearch}>🔍</button>
          <button className="leave-download-btn" onClick={handlePrint}>📥 Download</button>
          <button className="leave-export-btn" onClick={handleExportToFinance}>📤 Export</button>
        </div>
      </div>

      <div className="leave-table-scroll" ref={tableRef}>
        <table className="leave-admin-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Half Day</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="8" className="leave-empty">No leave requests found</td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave.userId}</td>
                  <td>{leave.leaveType}</td>
                  <td>{formatDate(leave.fromDate)}</td>
                  <td>{formatDate(leave.toDate)}</td>
                  <td>{leave.halfDay}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {leave.status === "Pending" && (
                      <span className="badge badge-pending blinking">Pending</span>
                    )}
                    {leave.status === "Accepted" && (
                      <span className="badge badge-accepted">Accepted</span>
                    )}
                    {leave.status === "Rejected" && (
                      <span className="badge badge-rejected">Rejected</span>
                    )}
                  </td>
                  <td className="leave-actions">
                    {leave.status === "Pending" && (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleStatusUpdate(leave._id, "Accepted", leave.userId)}
                        >
                          ✅
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatusUpdate(leave._id, "Rejected", leave.userId)}
                        >
                          ❌
                        </button>
                      </>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(leave._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveDisplay;
