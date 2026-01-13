import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClipboardList, FaFileInvoiceDollar, FaHome } from 'react-icons/fa';
import HomeCarousel from '../HomeCarousel/HomeCarousel'; // Suggest verifying this component's look later, or keep as is.
// import NavRecy from "./Nav4admin"; // Using internal sidebar for better consistency
// import './DashUser.css'; // Removed external CSS

// Modern Navigation Bar / Sidebar
function Sidebar() {
  return (
    <div className="w-64 bg-dark-900 text-white min-h-screen p-6 flex flex-col shadow-2xl">
      <div className="flex items-center space-x-3 mb-10 pl-2">
        {/* Simple Logo Placeholder */}
        <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">Recycler Portal</span>
      </div>

      <nav className="flex-1 space-y-2">
        {[
          { name: 'Home', path: '/', icon: FaHome },
          { name: 'View Bids', path: '/view-bid-user', icon: FaClipboardList },
          { name: 'Request Status', path: '/view-bids-req-status', icon: FaFileInvoiceDollar },
          { name: 'Profile', path: '/profile', icon: FaUser },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-dark-800 text-gray-300 hover:text-white transition-all duration-200 group"
          >
            <item.icon className="text-gray-500 group-hover:text-primary-500 transition-colors" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-dark-800">
        <p className="text-xs text-gray-500 text-center">&copy; 2026 Clean Cycle</p>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function RecyclerDash() {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-10">
          <h1 className="text-2xl font-bold text-dark-900">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border-2 border-white shadow-md">
              U
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Total Users', value: '450', color: 'bg-blue-500', icon: FaUser },
              { title: 'Total Collections', value: '1,250 kg', color: 'bg-green-500', icon: FaClipboardList },
              { title: 'Total Earnings', value: '$5,200', color: 'bg-yellow-500', icon: FaFileInvoiceDollar },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex items-center">
                <div className={`p-4 rounded-xl ${stat.color} text-white shadow-lg shadow-opacity-30 mr-4`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-dark-900">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-dark-900 mb-4">Activity Overview</h2>
            <div className="bg-gray-100 rounded-xl overflow-hidden h-64 md:h-96 flex items-center justify-center relative">
              {/* Integrating the carousel here properly */}
              <div className="w-full h-full">
                <HomeCarousel />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
