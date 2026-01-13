import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./dash.css"; // Removed external CSS
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaTasks, FaCalendarCheck, FaCalendarDay, FaCommentDots, FaBuilding, FaCog, FaSignOutAlt, FaUserEdit, FaLeaf } from 'react-icons/fa';

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
      const response = await axios.get("http://localhost:5008/employee"); // Replace with dynamic user ID
      setEmployee(response.data);
    } catch (error) {
      console.error("❌ Error fetching employee details:", error);
    }
  };

  // Sidebar Component (Consistent with other dashboards)
  const Sidebar = () => (
    <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-2xl h-screen sticky top-0 group transition-all duration-300">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-primary-500 overflow-hidden mb-4 shadow-lg p-1 bg-white">
          <img
            src="https://via.placeholder.com/100" // Replace with user image URL
            alt="User Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold">Dilmith Ranasinghe</h3>
        <p className="text-xs text-gray-400">Waste Management Employee</p>
      </div>

      <nav className="w-full px-4 space-y-2 flex-grow">
        <button className="w-full flex items-center p-3 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30 transition-all duration-200 cursor-default">
          <FaTachometerAlt className="mr-3" /> Dashboard
        </button>
        <button onClick={() => navigate("/bins")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaTasks className="mr-3" /> View Tasks
        </button>
        <button onClick={() => navigate("/UserDetails")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaCalendarCheck className="mr-3" /> Attendance
        </button>
        <button onClick={() => navigate("/calendar")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaCalendarDay className="mr-3" /> Calendar
        </button>
        <button className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaCommentDots className="mr-3" /> Feedback
        </button>
        <button className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaBuilding className="mr-3" /> Company
        </button>
        <button className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaCog className="mr-3" /> Settings
        </button>
      </nav>

      <div className="w-full px-4 mt-auto">
        <button
          onClick={() => navigate("/logout")}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      {/* Main Body */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-6 px-8 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Employee Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, Dilmith!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <FaLeaf size={20} />
            </div>
            <span className="text-sm font-medium text-gray-600">Status: Active</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Employee Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                <div className="bg-dark-800 p-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Your Details</h2>
                  <button className="text-primary-400 hover:text-white transition-colors flex items-center text-sm font-medium bg-dark-700 px-3 py-1 rounded-lg">
                    <FaUserEdit className="mr-2" /> Edit
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Employee ID</span>
                    <span className="text-dark-900 font-semibold">{employee.id || "EMP001"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Name</span>
                    <span className="text-dark-900 font-semibold">{employee.name || "Dilmith Ranasinghe"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Email</span>
                    <span className="text-dark-900 font-semibold">{employee.email || "dilmith@example.com"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-medium">Phone</span>
                    <span className="text-dark-900 font-semibold">{employee.phoneNumber || "+94 77 123 4567"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Address</span>
                    <span className="text-dark-900 font-semibold text-right max-w-[200px]">{employee.address || "Galle, Sri Lanka"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Stats Grid */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
                <h2 className="text-xl font-bold text-dark-900 mb-6">Overview & Tasks</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: "Total Leaves", value: "10", color: "bg-blue-50 text-blue-600" },
                    { title: "Pending Tasks", value: "5", color: "bg-yellow-50 text-yellow-600" },
                    { title: "Upcoming Meetings", value: "2", color: "bg-purple-50 text-purple-600" },
                    { title: "Completed Projects", value: "8", color: "bg-green-50 text-green-600" }
                  ].map((stat, index) => (
                    <div key={index} className={`p-6 rounded-2xl ${stat.color} flex flex-col justify-center items-center text-center transition-transform hover:scale-105 duration-300`}>
                      <h3 className="text-sm font-bold uppercase tracking-wide opacity-80 mb-2">{stat.title}</h3>
                      <p className="text-4xl font-extrabold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Additional Content could go here, e.g., a recent activity list */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-sm font-bold text-gray-700 mb-2">Latest Notice</h3>
                  <p className="text-sm text-gray-500">Please ensure all daily route reports are submitted by 5:00 PM. The monthly team meeting is scheduled for next Friday.</p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default EmpDash;
