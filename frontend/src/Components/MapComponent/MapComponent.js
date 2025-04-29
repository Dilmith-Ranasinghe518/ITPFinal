import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import "./MapComponent.css";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Center of the map (Galle, Sri Lanka)
const center = {
  lat: 6.0326,
  lng: 80.2168,
};

const validArea = {
  latMin: 6.000,   // Southernmost boundary (land area only)
  latMax: 6.100,   // Northernmost boundary (land area only)
  lngMin: 80.200,  // Move further east to avoid the coastline
  lngMax: 80.250,  // Keep this range to ensure it's inland
};


const MapComponent = () => {
  const [wasteBins, setWasteBins] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [binName, setBinName] = useState("");
  const [selectedBin, setSelectedBin] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const mapRef = useRef(null);

  // ✅ Load all bins when component mounts
  useEffect(() => {
    fetchBins();
  }, []);

  const onGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true);
  };

  const getMarkerSize = () => {
    return googleMapsLoaded ? new window.google.maps.Size(20, 20) : undefined;
  };

  const isValidLocation = (lat, lng) => {
    return (
      lat >= validArea.latMin &&
      lat <= validArea.latMax &&
      lng >= validArea.lngMin &&
      lng <= validArea.lngMax
    );
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    if (isValidLocation(lat, lng)) {
      setSelectedLocation({ lat, lng });
    } else {
      alert("Invalid location! Please select within Galle.");
    }
  };

  const handleAddBin = async () => {
    if (!binName || !selectedLocation) {
      alert("Please enter a bin name and select a location.");
      return;
    }

    const newBin = {
      name: binName,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      full: false,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/addBin", newBin);
      const createdBin = { ...newBin, _id: response.data._id };
      setWasteBins((prev) => [...prev, createdBin]);
      setBinName("");
      setSelectedLocation(null);
    } catch (error) {
      console.error("Error adding bin:", error);
      alert("Failed to add bin.");
    }
  };

  const fetchBins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getBins");
      setWasteBins(response.data);
    } catch (error) {
      console.error("Error fetching bins:", error);
      alert("Failed to load bins.");
    }
  };

  // ✅ Function to update bin (make full → normal)
  const updateBinStatus = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updateBin/${id}`, { full: false });
      const updatedBin = response.data.bin;

      setWasteBins((prev) =>
        prev.map((bin) => (bin._id === id ? { ...bin, full: updatedBin.full } : bin))
      );

      alert("Bin marked as normal.");
    } catch (error) {
      console.error("Error updating bin:", error);
      alert("Failed to update bin.");
    }
  };

  // ✅ Function to delete bin
  const deleteBin = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteBin/${id}`);
      setWasteBins((prev) => prev.filter((bin) => bin._id !== id));
      alert("Bin deleted successfully.");
    } catch (error) {
      console.error("Error deleting bin:", error);
      alert("Failed to delete bin.");
    }
  };

  const handleClearLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="map-page">
      <h2>Add Waste Bin</h2>

      <input
        type="text"
        placeholder="Enter bin name"
        value={binName}
        onChange={(e) => setBinName(e.target.value)}
      />

      {selectedLocation && (
        <p>
          📍 Selected Location: {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
        </p>
      )}

      <button onClick={handleAddBin} disabled={!selectedLocation || !binName}>
        ➕ Add Bin
      </button>

      <button onClick={handleClearLocation} disabled={!selectedLocation}>
        ❌ Clear Selection
      </button>

      <h3>🟥 Full Waste Bins</h3>
      {wasteBins.filter((bin) => bin.full).length === 0 ? (
        <p>No full bins</p>
      ) : (
        <ul>
          {wasteBins
            .filter((bin) => bin.full)
            .map((bin) => (
              <li key={bin._id}>
                {bin.name}
                <button onClick={() => updateBinStatus(bin._id)}>✔️</button>
                <button onClick={() => deleteBin(bin._id)}>❌</button>
              </li>
            ))}
        </ul>
      )}

      <LoadScript
        googleMapsApiKey="AIzaSyDyH_WBDQnt9VlMYmnJ0itANXXmjaObbQI"
        onLoad={onGoogleMapsLoad}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
          ref={mapRef}
        >
          {/* Temporary marker for newly selected location */}
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              icon={{
                url: "/normal-bin.png",
                scaledSize: getMarkerSize(),
              }}
            />
          )}

          {/* All bins from DB */}
          {wasteBins.map((bin) => (
            <Marker
              key={bin._id}
              position={{ lat: bin.lat, lng: bin.lng }}
              icon={{
                url: bin.full ? "/red-bin.png" : "/normal-bin.png",
                scaledSize: getMarkerSize(),
              }}
              onClick={() => setSelectedBin(bin)}
            />
          ))}

          {/* InfoWindow when a bin is clicked */}
          {selectedBin && (
            <InfoWindow
              position={{ lat: selectedBin.lat, lng: selectedBin.lng }}
              onCloseClick={() => setSelectedBin(null)}
            >
              <div>
                <h4>{selectedBin.name}</h4>
                <button onClick={() => updateBinStatus(selectedBin._id)}>✔️ Mark Normal</button>
                <button onClick={() => deleteBin(selectedBin._id)}>❌ Delete</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
