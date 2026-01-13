import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaTasks, FaCalendarCheck, FaCalendarDay, FaCommentDots, FaBuilding, FaCog, FaSignOutAlt, FaSearch, FaFileDownload, FaWhatsapp, FaClock, FaCalendarPlus, FaUserClock } from 'react-icons/fa';
// import "./attendd.css"; // CSS Removed

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
      const res = await axios.get("/api/users");
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

  // Sidebar Component (Consistent with EmpDash)
  const Sidebar = () => (
    <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-2xl h-screen sticky top-0">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-primary-500 overflow-hidden mb-4 shadow-lg p-1 bg-white">
          <img
            src="https://via.placeholder.com/100"
            alt="User Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold">Dilmith Ranasinghe</h3>
        <p className="text-xs text-gray-400">Employee Account</p>
      </div>

      <nav className="w-full px-4 space-y-2 flex-grow">
        <button onClick={() => navigate("/empdash")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaTachometerAlt className="mr-3" /> Dashboard
        </button>
        <button onClick={() => navigate("/bins")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
          <FaTasks className="mr-3" /> View Tasks
        </button>
        <button className="w-full flex items-center p-3 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30 transition-all duration-200 cursor-default">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm py-6 px-8 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Attendance & Leaves</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your work hours and leave requests.</p>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => navigate("/leaveapply")} className="flex items-center px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors font-semibold text-sm border border-yellow-200">
              <FaCalendarPlus className="mr-2" /> Apply Leave
            </button>
            <button onClick={() => navigate("/overtimeapply")} className="flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-semibold text-sm border border-purple-200">
              <FaUserClock className="mr-2" /> Apply Overtime
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 w-full md:w-auto">
              <button onClick={handleSearch} className="px-5 py-2.5 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors font-medium text-sm">
                Search
              </button>
              <button onClick={handlePrint} className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm flex items-center">
                <FaFileDownload className="mr-2" /> PDF
              </button>
              <button onClick={handleSendReport} className="px-4 py-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm flex items-center border border-green-200">
                <FaWhatsapp className="mr-2 text-lg" /> Send
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div ref={componentRef} className="overflow-x-auto">
              {noResults ? (
                <div className="p-10 text-center text-gray-500">
                  <p>No records found matching your search.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Check-In</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Check-Out</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Work Time</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Leave</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Overtime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user, index) => {
                      const checkOutTime = getCheckOut(user);
                      const workTime = calculateWorkTime(user.time, checkOutTime);
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm font-medium text-gray-900">{user.Id}</td>
                          <td className="p-4 text-sm text-gray-600 font-medium">{user.name}</td>
                          <td className="p-4 text-sm text-gray-500">{user.date}</td>
                          <td className="p-4 text-sm text-gray-500 font-mono">{user.time || "N/A"}</td>
                          <td className="p-4 text-sm text-gray-500 font-mono">{checkOutTime}</td>
                          <td className="p-4 text-sm text-gray-700 font-bold">{workTime}</td>

                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${user.leaveStatus === 'Accepted' ? 'bg-green-100 text-green-800' :
                                user.leaveStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                              {user.leaveStatus || "None"}
                            </span>
                          </td>

                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${user.overtimeStatus === 'Approved' ? 'bg-blue-100 text-blue-800' :
                                user.overtimeStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                              {user.overtimeStatus || "None"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDetails;
