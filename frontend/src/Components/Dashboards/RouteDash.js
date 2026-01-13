import React from "react";
import MapComponent from "../MapComponent/MapComponent";
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaClipboardList, FaArrowLeft, FaSignOutAlt, FaMapMarkedAlt } from 'react-icons/fa';

const RouteDashboard = () => {
  const navigate = useNavigate();

  // Sidebar Component
  const Sidebar = () => (
    <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-2xl h-screen sticky top-0">
      <div className="flex flex-col items-center mb-10 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center mb-4 shadow-lg text-white">
          <FaMapMarkedAlt size={32} />
        </div>
        <h2 className="text-xl font-bold">Route Dashboard</h2>
        <p className="text-xs text-gray-400 mt-1">Manage & Monitor Routes</p>
      </div>

      <nav className="w-full px-4 space-y-3 flex-grow">
        <button onClick={() => navigate("/bins")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-300 hover:text-primary-400 transition-all duration-200">
          <FaTrash className="mr-3 text-lg" /> View Bins
        </button>
        <button onClick={() => navigate("/route")} className="w-full flex items-center p-3 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-500/30 transition-all duration-200 cursor-default">
          <FaPlus className="mr-3 text-lg" /> Add Bin
        </button>
        <button onClick={() => navigate("/userRequestDetails")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-300 hover:text-primary-400 transition-all duration-200">
          <FaClipboardList className="mr-3 text-lg" /> View Requests
        </button>
        <button onClick={() => navigate("/inventory")} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-300 hover:text-primary-400 transition-all duration-200">
          <FaArrowLeft className="mr-3 text-lg" /> Back to Inventory
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
            <h1 className="text-3xl font-bold text-dark-900">Map Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Visualize and manage waste bin locations.</p>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden relative">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <MapComponent />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RouteDashboard;
