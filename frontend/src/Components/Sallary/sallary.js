import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import "./sal.css";

function Salary() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [basicSalary, setBasicSalary] = useState(50080);
  const [ot, setOt] = useState(0);
  const [leave, setLeave] = useState(0);
  const [holidays, setHolidays] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deduction, setDeduction] = useState(0);

  const totalSalary = basicSalary + ot - leave - holidays - discount - deduction;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5008/employees");
      setEmployees(res.data.employees || []);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payroll Report", 10, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 10, 30);
    doc.text(`Employee ID: ${selectedEmployeeId}`, 10, 40);
    doc.text(`Basic Salary: ₹${basicSalary.toFixed(2)}`, 10, 50);
    doc.text(`Overtime (OT): ₹${ot.toFixed(2)}`, 10, 60);
    doc.text(`Leave Deduction: ₹${leave.toFixed(2)}`, 10, 70);
    doc.text(`Holidays: ₹${holidays.toFixed(2)}`, 10, 80);
    doc.text(`Discount: ₹${discount.toFixed(2)}`, 10, 90);
    doc.text(`Deduction: ₹${deduction.toFixed(2)}`, 10, 100);
    doc.text(`Total Salary: ₹${totalSalary.toFixed(2)}`, 10, 110);
    doc.save("payroll_report.pdf");
  };

  return (
    <div className="salary-page">
      <div className="salary-header-section">
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

        <div className="salary-top-actions">
          <input
            type="text"
            placeholder="Search employee..."
            className="salary-search-input"
          />
          <button className="salary-search-btn">🔍</button>

          <button className="download-btn" onClick={handleDownloadReport}>
            📥 Download Report
          </button>
          <button className="export-btn">
            📤 Export to Finance
          </button>
        </div>
      </div>

      <div className="salary-details-container">
        <h2>Salary Details</h2>

        {/* Select Employee */}
        <div className="salary-item">
          <label>Select Employee</label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
          >
            <option value="">-- Select Employee ID --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp.id}>
                {emp.id} - {emp.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="salary-form">
          <div className="salary-item">
            <label>Basic Salary (₹)</label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value))}
            />
          </div>

          <div className="salary-item">
            <label>Overtime (OT) (₹)</label>
            <input
              type="number"
              value={ot}
              onChange={(e) => setOt(Number(e.target.value))}
            />
          </div>

          <div className="salary-item">
            <label>Leave Deduction (₹)</label>
            <input
              type="number"
              value={leave}
              onChange={(e) => setLeave(Number(e.target.value))}
            />
          </div>

          <div className="salary-item">
            <label>Holidays (₹)</label>
            <input
              type="number"
              value={holidays}
              onChange={(e) => setHolidays(Number(e.target.value))}
            />
          </div>

          <div className="salary-item">
            <label>Discount (₹)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>

          <div className="salary-item">
            <label>Deduction (₹)</label>
            <input
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Total Salary */}
        <div className="salary-total">
          <h2>Total Salary: ₹{totalSalary.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Salary;
