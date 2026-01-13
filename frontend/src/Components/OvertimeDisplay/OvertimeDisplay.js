import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./overtimeDisplay.css";

const OvertimeDisplay = () => {
  const [overtime, setOvertime] = useState([]);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    fetchOvertime();
  }, []);

  const fetchOvertime = async () => {
    try {
      const res = await axios.get("/api/overtime");
      const data = res.data.overtime || [];
      setOvertime(data);
    } catch (err) {
      console.error("❌ Error fetching overtime", err);
    }
  };

  const handleSearch = () => {
    const filtered = overtime.filter((entry) =>
      Object.values(entry).some((val) =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setOvertime(filtered);
  };

  // ✅ Approve + Update User overtimeStatus
  const handleApprove = async (otId, userId) => {
    try {
      await axios.put(`/api/overtime/${otId}`, { status: "Approved" });
      await axios.patch(`/api/users/update-overtime-status/${userId}`, { overtimeStatus: "Approved" });
      setSuccessMessage("✅ Overtime Approved Successfully!");
      fetchOvertime();
    } catch (err) {
      console.error("❌ Approve error", err);
    }
  };

  // ✅ Reject + Update User overtimeStatus
  const handleReject = async (otId, userId) => {
    try {
      await axios.put(`/api/overtime/${otId}`, { status: "Rejected" });
      await axios.patch(`/api/users/update-overtime-status/${userId}`, { overtimeStatus: "Rejected" });
      setSuccessMessage("❌ Overtime Rejected Successfully!");
      fetchOvertime();
    } catch (err) {
      console.error("❌ Reject error", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this overtime record?")) {
      try {
        await axios.delete(`/api/overtime/${id}`);
        setSuccessMessage("🗑️ Deleted Successfully!");
        fetchOvertime();
      } catch (err) {
        console.error("❌ Error deleting overtime:", err);
      }
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-LK", {
      timeZone: "Asia/Colombo",
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Overtime_Report",
    onAfterPrint: () => setSuccessMessage("✅ Overtime Report Printed!"),
  });

  const handleExportToFinance = () => {
    setSuccessMessage("📤 Report Exported to Finance Department!");
  };

  return (
    <div className="ot-container">
      <div className="ot-header">
        <button className="ot-back-btn" onClick={() => navigate("/AdminD")}>← Back</button>
        <h2>Overtime Requests</h2>

        {successMessage && <div className="ot-success-message">{successMessage}</div>}

        <div className="ot-search-row">
          <input
            type="text"
            value={search}
            placeholder="Search Overtime"
            onChange={(e) => setSearch(e.target.value)}
            className="ot-search-input"
          />
          <button className="ot-search-btn" onClick={handleSearch}>🔍</button>
          <button className="ot-download-btn" onClick={handlePrint}>📥 Download</button>
          <button className="ot-export-btn" onClick={handleExportToFinance}>📤 Export</button>
        </div>
      </div>

      <div className="ot-table-scroll" ref={tableRef}>
        <table className="ot-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Approver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {overtime.length === 0 ? (
              <tr>
                <td colSpan="8" className="ot-empty">No Overtime Records</td>
              </tr>
            ) : (
              overtime.map((ot) => (
                <tr key={ot._id}>
                  <td>{ot.userId}</td>
                  <td>{ot.employeeName}</td>
                  <td>{ot.overtimeType}</td>
                  <td>{formatDate(ot.fromDate)}</td>
                  <td>{formatDate(ot.toDate)}</td>
                  <td>{ot.approver}</td>
                  <td>
                    {ot.status === "Pending" && (
                      <span className="badge badge-pending blinking">Pending</span>
                    )}
                    {ot.status === "Approved" && (
                      <span className="badge badge-approved">Approved</span>
                    )}
                    {ot.status === "Rejected" && (
                      <span className="badge badge-rejected">Rejected</span>
                    )}
                  </td>
                  <td className="ot-actions">
                    {ot.status === "Pending" && (
                      <>
                        <button className="approve-btn" onClick={() => handleApprove(ot._id, ot.userId)}>✅</button>
                        <button className="reject-btn" onClick={() => handleReject(ot._id, ot.userId)}>❌</button>
                      </>
                    )}
                    <button className="delete-btn" onClick={() => handleDelete(ot._id)}>🗑️</button>
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

export default OvertimeDisplay;
