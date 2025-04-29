import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from 'axios';
import './WasteCollectorDash.css';
import { ToastContainer, toast } from 'react-toastify'; // Toasts for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import {useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Center of the map (Galle, Sri Lanka)
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

  // Fetch bins from the backend
  const fetchBins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getBins');
      setWasteBins(response.data); // Update the state with the fetched bins
    } catch (error) {
      console.error('Error fetching bins:', error);
      toast.error('Failed to fetch bins');
    }
  };

  // Handle changing bin status to normal (unfull)
  const changeBinStatus = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updateBin/${id}`, { full: false });
      toast.success('Bin marked as normal!');

      // Update the local state to reflect the change on the map
      setWasteBins((prevBins) => {
        // Create a new array with the updated bin status
        return prevBins.map((bin) =>
          bin._id === id ? { ...bin, full: false } : bin
        );
      });
    } catch (error) {
      console.error('Error updating bin status:', error);
      toast.error('Failed to update bin status');
    }
  };

  // Ensure Google Maps API is loaded before rendering map elements
  const onGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true);
  };

  // Set marker size based on map load
  const getMarkerSize = () => {
    return googleMapsLoaded ? new window.google.maps.Size(30, 30) : undefined;
  };

  useEffect(() => {
    fetchBins(); // Fetch bins on component mount
  }, []);

  return (
    <div className="dashboard-container">
    
       {/* Sidebar */}
       <div className="sidebar">
        {/* User Logo */}
        <div className="user-logo">
          <img
            src="https://via.placeholder.com/100" // Replace with user image URL
            alt="User Logo"
            className="logo"
          />
          <h3>Dilmith Ranasinghe</h3>
        </div>
        <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
        {/* Navigation Buttons */}
        <div className="sidebar-buttons">
          <button className="sidebar-btn "onClick={() => navigate("/empdash")}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button className="sidebar-btn active"onClick={() => navigate("/bins")}>
            <i className="fas fa-money-check-alt"></i> View Tasks
          </button>
          <button className="sidebar-btn"  onClick={() => navigate("/UserDetails")}>
            <i className="fas fa-calendar-check"></i> Attendance
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-calendar-day"></i> Calendar
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-comment-dots"></i> Feedback
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-building"></i> Company
          </button>
          <button className="sidebar-btn">
            <i className="fas fa-cog"></i> Settings
          </button>
        </div>
        <div className="sidebar-footer" onClick={() => navigate("/logout")}>
          <button className="sidebar-btn logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      <div className="waste-collector-dash">
      <h2 className="waste-collector-dash__title">Waste Collector Dashboard</h2>
      <div className="waste-collector-dash__container">
        <div className="waste-collector-dash__bin-list">
          <h3 className="waste-collector-dash__section-title">Red Waste Bins (Full)</h3>
          <ul className="waste-collector-dash__bin-list-items">
            {wasteBins
              .filter((bin) => bin.full === true) // Filter full bins
              .map((bin) => (
                <li key={bin._id} className="waste-collector-dash__bin-card">
                  <div className="waste-collector-dash__bin-info">
                    <strong>{bin.name}</strong> - {bin.lat}, {bin.lng}
                  </div>
                  <button
                    className="waste-collector-dash__btn-normalize"
                    onClick={() => changeBinStatus(bin._id)} // Use bin._id here
                  >
                    ✔️ Mark as Normal
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="waste-collector-dash__map-container">
          <h3 className="waste-collector-dash__section-title">Map View</h3>
          <LoadScript
            googleMapsApiKey="AIzaSyDyH_WBDQnt9VlMYmnJ0itANXXmjaObbQI" // Add your Google Maps API key
            onLoad={onGoogleMapsLoad}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              ref={mapRef}
            >
              {wasteBins .filter((bin) => bin.full === true) // Only show red bins (full bins) on the map
                  .map((bin) => (
                <Marker
                  key={bin._id}
                  position={{ lat: bin.lat, lng: bin.lng }}
                  title={bin.name}
                  onClick={() => setSelectedBin(bin)}
                  icon={{
                    url: bin.full ? "/red-bin.png" : "/normal-bin.png", // Update icon based on bin status
                    scaledSize: getMarkerSize(),
                  }}
                >
                  {selectedBin && selectedBin._id === bin._id && (
                    <InfoWindow position={{ lat: bin.lat, lng: bin.lng }}>
                      <div className="info-window">
                        <h4>{bin.name}</h4>
                        <button
                          className="btn-normalize"
                          onClick={() => changeBinStatus(bin._id)} // Use bin._id here
                        >
                          ✔️ Mark as Normal
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
      <ToastContainer />
    </div>
    </div>
  );
};

export default WasteCollectorDash;
