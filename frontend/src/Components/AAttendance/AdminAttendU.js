import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "./AdminUser.css";

const AdminAttendU = () => {
  const navigate = useNavigate();
  const printRef = useRef();
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5008/users");
      setAttendanceData(res.data.users || []);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const handleSearch = () => {
    const filtered = attendanceData.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setAttendanceData(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5008/users/${id}`);
        fetchAttendance();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleExportToExcel = () => {
    if (attendanceData.length === 0) {
      alert("No data to export.");
      return;
    }

    const exportData = attendanceData.map((att) => ({
      "Emp ID": att.Id,
      "Name": att.name,
      "Date": new Date(att.date).toLocaleDateString("en-LK"),
      "Check-In": att.time || "N/A",
      "Check-Out": getCheckOut(att),
      "Work Time": calculateWorkTime(att),
      "Overtime": calculateOvertime(att),
      "Status": att.status || "Active",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Attendance_Report.xlsx");
  };

  const handleExportToPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("l", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    const now = new Date().toLocaleString("en-LK", { timeZone: "Asia/Colombo" });

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Clean Cycle", width / 2, 30, { align: "center" });

    pdf.setFontSize(14);
    pdf.text("Attendance Management Report", width / 2, 50, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Admin: Nirod Gimhan", 40, 70);
    pdf.text("Email: Nirodgimhan356@gmail.com", 40, 85);
    pdf.text(`Generated on: ${now}`, 40, 100);

    pdf.addImage(imgData, "PNG", 10, 120, width - 20, height);
    pdf.save("Attendance_Report.pdf");
  };

  // 💬 Corrected for leave / no checkout
  const getCheckOut = (att) => {
    if (att.status === "Leave") return "14:00"; // Automatically fill 2.00 PM
    if (att.checkOut) return att.checkOut;
    return "N/A";
  };

  const calculateWorkTime = (att) => {
    if (att.status === "Leave") return "0h 0m";

    const checkIn = att.time;
    const checkOut = getCheckOut(att);

    if (!checkIn || !checkOut || checkOut === "N/A") return "N/A";

    const [inH, inM] = checkIn.split(":").map(Number);
    const [outH, outM] = checkOut.split(":").map(Number);

    const totalMinutes = (outH * 60 + outM) - (inH * 60 + inM);
    if (totalMinutes <= 0) return "N/A";

    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };

  const calculateOvertime = (att) => {
    if (att.status === "Leave") return "0h";

    const checkOut = getCheckOut(att);
    if (!checkOut || checkOut === "N/A") return "N/A";

    const [outH, outM] = checkOut.split(":").map(Number);
    const checkoutMinutes = outH * 60 + outM;
    const standardExitMinutes = 18 * 60; // 6:00 PM

    const overtimeMinutes = checkoutMinutes - standardExitMinutes;
    if (overtimeMinutes <= 0) return "0h";

    const h = Math.floor(overtimeMinutes / 60);
    const m = overtimeMinutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="att-container">
      <div className="att-header-row">
        <button className="att-back-btn" onClick={() => navigate("/AdminD")}>← Back</button>
        <h2 className="att-title">Attendance Management</h2>
      </div>

      <div className="att-header-controls">
        <div className="att-controls-left">
          <button className="att-add-btn" onClick={() => navigate("/Adminadd")}>
            ➕ Add Attendance
          </button>
        </div>

        <div className="att-controls-right">
          <input
            type="text"
            placeholder="Search Attendance"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="att-search"
          />
          <button className="att-btn-search" onClick={handleSearch}>🔍</button>

          <div className="att-download-dropdown">
            <button
              className="att-btn-download"
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            >
              ⬇️ Download
            </button>
            {showDownloadOptions && (
              <div className="att-dropdown-options">
                <button onClick={handleExportToPDF}>📄 PDF</button>
                <button onClick={handleExportToExcel}>📊 Excel</button>
              </div>
            )}
          </div>

          <button className="att-btn-export">💼 Export to Finance</button>
        </div>
      </div>

      <div className="att-table-section" ref={printRef}>
        <table className="att-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Work Time</th>
              <th>Overtime</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length === 0 ? (
              <tr><td colSpan="9">No records found.</td></tr>
            ) : (
              attendanceData.map((att, idx) => (
                <tr key={idx}>
                  <td>{att.Id}</td>
                  <td>{att.name}</td>
                  <td>{new Date(att.date).toLocaleDateString("en-LK")}</td>
                  <td>{att.time || "N/A"}</td>
                  <td>{getCheckOut(att)}</td>
                  <td>{calculateWorkTime(att)}</td>
                  <td>{calculateOvertime(att)}</td>
                  <td className={att.status === "Leave" ? "status-leave" : "status-active"}>
                    {att.status || "Active"}
                  </td>
                  <td className="att-actions">
                    <button className="att-edit-btn" onClick={() => navigate(`/Edit${att._id}`)}>✏️</button>
                    <button className="att-delete-btn" onClick={() => handleDelete(att._id)}>🗑️</button>
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

export default AdminAttendU;
