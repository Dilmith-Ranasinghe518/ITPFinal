import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaTrash, FaBell, FaTruck, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

function WasteDashboard() {
  const [wasteLevel, setWasteLevel] = useState(0);
  const [bins, setBins] = useState([]);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [fullBins, setFullBins] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: 'Dimmi',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get('/api/getBins');
        setBins(response.data);
        const fullBinCount = response.data.filter(bin => bin.full).length;
        setFullBins(fullBinCount);
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };

    fetchBins();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/waste-level');
        const data = await response.json();
        setWasteLevel(data.wasteLevel);

        if (data.wasteLevel === 100 && selectedBinId) {
          updateBinStatus(selectedBinId, true);
        }

        if (data.wasteLevel >= 100) {
          setAlertMessage('Your bin is full');
        } else if (data.wasteLevel > 80) {
          setAlertMessage('Your bin is almost full');
        } else {
          setAlertMessage('');
        }

      } catch (error) {
        console.error('Error fetching waste level:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5008);
    return () => clearInterval(interval);
  }, [selectedBinId]);

  const updateBinStatus = async (binId, isFull) => {
    try {
      const binToUpdate = bins.find(bin => bin._id === binId);
      if (binToUpdate && binToUpdate.full === isFull) {
        return;
      }

      await axios.put(`/api/updateBin/${binId}`, { full: isFull });
      console.log(`Bin ${binId} status updated to ${isFull ? 'Full' : 'Normal'}`);

      const updatedBins = bins.map(bin =>
        bin._id === binId ? { ...bin, full: isFull } : bin
      );
      setBins(updatedBins);

      const fullBinCount = updatedBins.filter(bin => bin.full).length;
      setFullBins(fullBinCount);

      if (isFull) {
        setAlertMessage('Bin marked as full');
        alert('Bin marked as full');
        setTimeout(() => setAlertMessage(''), 5008);
        setTimeout(() => alert(''), 5008);
      } else {
        setAlertMessage('Bin marked as normal');
        alert('Bin marked as normal');
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setAlertMessage('');
      }, 5008);

    } catch (error) {
      console.error('Error updating bin status:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-xl">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary-500 shadow-lg">
          <img
            src={userProfile.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-8">{userProfile.name}</h3>

        <nav className="w-full px-4 space-y-2">
          <button onClick={() => window.location.href = '/userdash'} className="w-full flex items-center p-3 rounded-lg hover:bg-dark-800 transition-colors duration-200">
            <FaTrash className="mr-3 text-primary-500" /> My Bin
          </button>
          <button onClick={() => window.location.href = '/userdash'} className="w-full flex items-center p-3 rounded-lg hover:bg-dark-800 transition-colors duration-200">
            <FaBell className="mr-3 text-yellow-500" /> Alerts
          </button>
          <button onClick={() => window.location.href = '/userreqdash'} className="w-full flex items-center p-3 rounded-lg hover:bg-dark-800 transition-colors duration-200">
            <FaTruck className="mr-3 text-green-500" /> Pickup Request
          </button>
          <button onClick={() => window.location.href = '/logout'} className="w-full flex items-center p-3 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors duration-200 mt-8">
            <FaSignOutAlt className="mr-3" /> Log out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-dark-900">Dashboard</h2>
            <p className="text-gray-500">Welcome back, {userProfile.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-primary-600 transition-colors">
              <FaBell />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-primary-600 transition-colors">
              <FaUserCircle size={24} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Bins</p>
              <h3 className="text-4xl font-bold text-dark-900">{bins.length}</h3>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              <FaTrash />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Full Bins</p>
              <h3 className="text-4xl font-bold text-red-500">{fullBins}</h3>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <FaTrash />
            </div>
          </div>
        </div>

        {/* Waste Level Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-dark-900 mb-6">Current Waste Level</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${wasteLevel > 80 ? 'text-red-600 bg-red-200' : 'text-primary-600 bg-primary-200'}`}>
                  {wasteLevel > 80 ? 'Critical' : 'Normal'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {wasteLevel}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
              <div style={{ width: `${wasteLevel}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${wasteLevel > 70 ? 'bg-red-500' : wasteLevel > 40 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md animate-pulse">
            <p className="font-bold">Alert</p>
            <p>{alertMessage}</p>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-dark-900 mb-4">Bin Actions</h3>
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Bin</label>
              <select
                onChange={(e) => setSelectedBinId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Choose a bin...</option>
                {bins.map((bin) => (
                  <option key={bin._id} value={bin._id}>{bin.name}</option>
                ))}
              </select>
            </div>
            {selectedBinId && (
              <button
                onClick={() => updateBinStatus(selectedBinId, false)}
                className="w-full md:w-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition-all duration-200"
              >
                Mark as Normal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WasteDashboard;
