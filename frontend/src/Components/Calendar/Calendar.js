import React, { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaTachometerAlt, FaTasks, FaCalendarCheck, FaCalendarDay, FaCommentDots, FaBuilding, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [liveTime, setLiveTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setLiveTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Sri Lankan Holidays for 2026 (Sample Data)
    const holidays = [
        { date: "2026-01-14", name: "Tamil Thai Pongal Day", type: "Public, Bank, Mercantile" },
        { date: "2026-02-04", name: "Independence Day", type: "Public, Bank, Mercantile" },
        { date: "2026-04-13", name: "Sinhala & Tamil New Year Day", type: "Public, Bank, Mercantile" },
        { date: "2026-04-14", name: "Sinhala & Tamil New Year Day", type: "Public, Bank, Mercantile" },
        { date: "2026-05-01", name: "May Day", type: "Public, Bank, Mercantile" },
        { date: "2026-05-23", name: "Vesak Full Moon Poya Day", type: "Public, Bank, Mercantile" }, // Estimated
        { date: "2026-12-25", name: "Christmas Day", type: "Public, Bank, Mercantile" },
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const getHoliday = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return holidays.find((h) => h.date === dateStr);
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const blanks = Array(firstDay).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return [...blanks, ...days].map((day, index) => {
            if (!day) return <div key={`blank-${index}`} className="p-4 bg-gray-50/50"></div>;

            const holiday = getHoliday(day);
            const today = isToday(day);

            return (
                <div
                    key={day}
                    className={`min-h-[100px] p-2 border border-gray-100 relative transition-all duration-200 group hover:shadow-md 
            ${today ? "bg-primary-50 border-primary-200" : "bg-white"}
            ${holiday ? "bg-red-50 border-red-100" : ""}
          `}
                >
                    <span
                        className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-2
              ${today ? "bg-primary-600 text-white shadow-md" : "text-gray-700"}
              ${holiday ? "text-red-600" : ""}
            `}
                    >
                        {day}
                    </span>

                    {holiday && (
                        <div className="text-xs text-red-600 font-medium bg-red-100/50 p-1 rounded leading-tight">
                            {holiday.name}
                        </div>
                    )}
                </div>
            );
        });
    };

    // Sidebar Component
    const Sidebar = () => (
        <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-2xl h-screen sticky top-0">
            <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-24 h-24 rounded-full border-4 border-primary-500 overflow-hidden mb-4 shadow-lg p-1 bg-white">
                    <img src="https://via.placeholder.com/100" alt="User Logo" className="w-full h-full rounded-full object-cover" />
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
                <button onClick={() => navigate("/userdetails")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
                    <FaCalendarCheck className="mr-3" /> Attendance
                </button>
                <button className="w-full flex items-center p-3 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30 transition-all duration-200 cursor-default">
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
                <button onClick={() => navigate("/logout")} className="w-full flex items-center justify-center p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200">
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex bg-gray-50 min-h-screen font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header with Live Time */}
                <header className="bg-white shadow-sm py-6 px-8 flex justify-between items-center z-10 sticky top-0">
                    <div>
                        <h1 className="text-3xl font-bold text-dark-900">Sri Lankan Calendar</h1>
                        <p className="text-sm text-gray-500 mt-1">Holidays & Events</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-2xl font-bold text-dark-900 tabular-nums">
                                {liveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-500 tabular-nums">
                                {liveTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <div className="bg-primary-50 p-3 rounded-xl text-primary-600 shadow-inner">
                            <FaClock size={24} />
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Calendar Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-dark-800 flex items-center">
                                <FaCalendarAlt className="mr-3 text-primary-500" />
                                {currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })}
                            </h2>
                            <div className="flex space-x-2">
                                <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                                    <FaChevronLeft />
                                </button>
                                <button onClick={() => changeMonth(1)} className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Dates Grid */}
                        <div className="grid grid-cols-7 ">
                            {renderCalendarDays()}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-2">Public Holidays</h3>
                            <p className="text-sm text-blue-600">Standard holidays for general public sector.</p>
                        </div>
                        <div className="md:col-span-1 bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                            <h3 className="font-bold text-yellow-800 mb-2">Mercantile Holidays</h3>
                            <p className="text-sm text-yellow-600">Holidays applicable for the private sector.</p>
                        </div>
                        <div className="md:col-span-1 bg-red-50 p-6 rounded-2xl border border-red-100">
                            <h3 className="font-bold text-red-800 mb-2">Bank Holidays</h3>
                            <p className="text-sm text-red-600">Days where banks are closed for transactions.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Calendar;
