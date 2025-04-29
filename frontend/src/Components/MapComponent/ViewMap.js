import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from 'axios';

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Center of the map (Galle, Sri Lanka)
const center = {
  lat: 6.0326,
  lng: 80.2168,
};

const MapComponent = () => {
  const [wasteBins, setWasteBins] = useState([]); // List of bins
  const [selectedBin, setSelectedBin] = useState(null); // Track selected bin for updating status
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const mapRef = useRef(null);

  // Fetch bins from the backend
  const fetchBins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getBins');
      setWasteBins(response.data);  // Update the state with the bins from the backend
    } catch (error) {
      console.error('Error fetching bins:', error);
      alert('Failed to fetch bins');
    }
  };

  // Function to handle bin status update to normal (unfull)
  const changeBinStatus = async (id) => {
    try {
      // Sending PUT request to update bin status
      const response = await axios.put(`http://localhost:5000/api/updateBin/${id}`, { full: false });
      console.log(response.data.message);

      // Update the bin status in the state to "normal"
      setWasteBins(
        wasteBins.map((bin) => (bin.id === id ? { ...bin, full: false } : bin))
      );
    } catch (error) {
      console.error('Error updating bin status:', error);
      alert('Failed to update bin status');
    }
  };

  // Ensure Google Maps API is loaded before rendering map elements
  const onGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true);
  };

  // Ensure marker size is correct after Google Maps is loaded
  const getMarkerSize = () => {
    return googleMapsLoaded
      ? new window.google.maps.Size(20, 20)
      : undefined;
  };

  useEffect(() => {
    fetchBins(); // Fetch bins on component mount
  }, []);

  return (
    <div>
      <h2>Red Waste Bins</h2>
      <p>Select a red bin to mark it as normal.</p>

      {/* Google Map */}
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
          {/* Show all red bins (full bins) */}
          {wasteBins
            .filter((bin) => bin.full) // Filter only full bins (red bins)
            .map((bin) => (
              <Marker
                key={bin.id}
                position={{ lat: bin.lat, lng: bin.lng }}
                title={bin.name}
                onClick={() => setSelectedBin(bin)} // Handle bin click
                icon={{
                  url: "/red-bin.png", // Red bin image
                  scaledSize: getMarkerSize(),
                }}
              >
                {/* Show InfoWindow on bin click with tick button */}
                {selectedBin && selectedBin.id === bin.id && (
                  <InfoWindow position={{ lat: bin.lat, lng: bin.lng }}>
                    <div>
                      <h4>{bin.name}</h4>
                      <button onClick={() => changeBinStatus(bin.id)}>✔️</button> {/* Change to normal bin */}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
