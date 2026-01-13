import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaTasks, FaCalendarCheck, FaCalendarDay, FaCommentDots, FaBuilding, FaCog, FaSignOutAlt, FaTruck } from 'react-icons/fa';

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
};

const center = {
  lat: 6.0326,
  lng: 80.2168,
};

const WasteCollectorDash = () => {
  const navigate = useNavigate();
  const [wasteBins, setWasteBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const mapRef = useRef(null);

  const fetchBins = async () => {
    try {
      const response = await axios.get('/api/getBins');
      setWasteBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
      toast.error('Failed to fetch bins');
    }
  };

  const changeBinStatus = async (id) => {
    try {
      await axios.put(`/api/updateBin/${id}`, { full: false });
      toast.success('Bin marked as normal!');

      setWasteBins((prevBins) => {
        return prevBins.map((bin) =>
          bin._id === id ? { ...bin, full: false } : bin
        );
      });
    } catch (error) {
      console.error('Error updating bin status:', error);
      toast.error('Failed to update bin status');
    }
  };

  const onGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true);
  };

  const getMarkerSize = () => {
    return googleMapsLoaded ? new window.google.maps.Size(30, 30) : undefined;
  };

  useEffect(() => {
    fetchBins();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">

      {/* Sidebar */}
      <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-2xl h-screen sticky top-0">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-24 h-24 rounded-full border-4 border-primary-500 overflow-hidden mb-4 shadow-lg p-1 bg-white">
            <img
              src="https://via.placeholder.com/100" // Replace with user image URL
              alt="User Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h3 className="text-lg font-bold">Dilmith Ranasinghe</h3>
          <p className="text-xs text-gray-400">Waste Collector</p>
        </div>

        <nav className="w-full px-4 space-y-2 flex-grow">
          {[
            { name: 'Dashboard', path: '/empdash', icon: FaTachometerAlt },
            { name: 'View Tasks', path: '/bins', icon: FaTasks, active: true },
            { name: 'Attendance', path: '/UserDetails', icon: FaCalendarCheck },
            { name: 'Calendar', path: '/calendar', icon: FaCalendarDay },
            { name: 'Feedback', path: '#', icon: FaCommentDots },
            { name: 'Company', path: '#', icon: FaBuilding },
            { name: 'Settings', path: '#', icon: FaCog },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${item.active ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-gray-400 hover:bg-dark-800 hover:text-white'}`}
            >
              <item.icon className={`mr-3 ${item.active ? 'text-white' : 'text-gray-500 group-hover:text-primary-500'}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="w-full px-4 mt-auto">
          <button
            onClick={() => navigate("/logout")}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-dark-900">Waste Collector Dashboard</h2>
            <p className="text-gray-500">Manage collection routes and tasks efficiently.</p>
          </div>
          <div className="bg-white p-3 rounded-full shadow-sm text-primary-600">
            <FaTruck size={24} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Bin List */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-dark-800 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Urgent Pickups (Full)
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {wasteBins.filter((bin) => bin.full).length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-500">
                  <p>No full bins at the moment. Great job!</p>
                </div>
              ) : (
                wasteBins
                  .filter((bin) => bin.full)
                  .map((bin) => (
                    <div key={bin._id} className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-dark-900">{bin.name}</h4>
                          <p className="text-xs text-gray-500">Lat: {bin.lat}, Lng: {bin.lng}</p>
                        </div>
                        <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wide">Full</span>
                      </div>
                      <button
                        className="w-full mt-2 py-2 px-4 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 font-semibold rounded-lg border border-gray-200 hover:border-green-200 transition-colors duration-200 flex items-center justify-center"
                        onClick={() => changeBinStatus(bin._id)}
                      >
                        Mark as Normal
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Map View */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
              <h3 className="text-xl font-bold text-dark-800 mb-6">Live Map View</h3>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                <LoadScript
                  googleMapsApiKey="AIzaSyCQlsYyEJIRVQHAPUpvE54dtdOQNnKY3gM"
                  onLoad={onGoogleMapsLoad}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    ref={mapRef}
                  >
                    {wasteBins.filter((bin) => bin.full).map((bin) => (
                      <Marker
                        key={bin._id}
                        position={{ lat: bin.lat, lng: bin.lng }}
                        title={bin.name}
                        onClick={() => setSelectedBin(bin)}
                        icon={{
                          url: bin.full ? "/red-bin.png" : "/normal-bin.png",
                          scaledSize: getMarkerSize(),
                        }}
                      >
                        {selectedBin && selectedBin._id === bin._id && (
                          <InfoWindow position={{ lat: bin.lat, lng: bin.lng }}>
                            <div className="p-2">
                              <h4 className="font-bold mb-2">{bin.name}</h4>
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm transition-colors"
                                onClick={() => changeBinStatus(bin._id)}
                              >
                                Mark as Normal
                              </button>
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default WasteCollectorDash;
