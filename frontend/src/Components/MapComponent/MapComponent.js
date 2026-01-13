import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { FaTrash, FaCheck, FaTimes, FaMapMarkerAlt, FaExclamationTriangle, FaPlus } from 'react-icons/fa';
// CSS Removed

const containerStyle = {
  width: "100%",
  height: "100%",
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
    return googleMapsLoaded ? new window.google.maps.Size(30, 30) : undefined;
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
      const response = await axios.post("/api/addBin", newBin);
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
      const response = await axios.get("/api/getBins");
      setWasteBins(response.data);
    } catch (error) {
      console.error("Error fetching bins:", error);
      alert("Failed to load bins.");
    }
  };

  // ✅ Function to update bin (make full → normal)
  const updateBinStatus = async (id) => {
    try {
      const response = await axios.put(`/api/updateBin/${id}`, { full: false });
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
      await axios.delete(`/api/deleteBin/${id}`);
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
    <div className="flex flex-col lg:flex-row h-full w-full bg-white rounded-xl overflow-hidden">

      {/* Left Panel: Controls & List */}
      <div className="w-full lg:w-96 bg-gray-50 border-r border-gray-100 flex flex-col h-full overflow-hidden">

        {/* Add Bin Section */}
        <div className="p-6 border-b border-gray-100 bg-white shadow-sm z-10">
          <h2 className="text-lg font-bold text-dark-900 mb-4 flex items-center">
            <div className="bg-primary-100 p-2 rounded-lg mr-3 text-primary-600">
              <FaPlus size={16} />
            </div>
            Add Waste Bin
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bin Name</label>
              <input
                type="text"
                placeholder="E.g. Main Street Bin"
                value={binName}
                onChange={(e) => setBinName(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-sm"
              />
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-blue-700 block mb-1">Location Selection</span>
                  {selectedLocation ? (
                    <span className="text-xs text-blue-600 font-mono">
                      {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
                    </span>
                  ) : (
                    <span className="text-xs text-blue-400 italic">Click on map to select</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleAddBin}
                disabled={!selectedLocation || !binName}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all shadow-md flex items-center justify-center ${(!selectedLocation || !binName) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg'}`}
              >
                <FaPlus className="mr-2" /> Add
              </button>
              {selectedLocation && (
                <button
                  onClick={handleClearLocation}
                  className="py-2 px-4 rounded-lg font-semibold text-sm bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Full Bins List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Alerts - Full Bins</h3>

          {wasteBins.filter((bin) => bin.full).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <FaCheck className="text-3xl text-green-300 mb-2" />
              <p className="text-sm">All bins are normal</p>
            </div>
          ) : (
            <div className="space-y-3">
              {wasteBins
                .filter((bin) => bin.full)
                .map((bin) => (
                  <div key={bin._id} className="bg-white p-4 rounded-xl shadow-sm border border-red-100 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div className="flex justify-between items-start">
                      <div className="pr-2">
                        <h4 className="font-bold text-dark-900 text-sm mb-1">{bin.name}</h4>
                        <p className="text-xs text-red-500 font-medium flex items-center">
                          <FaExclamationTriangle className="mr-1" /> Full Capacity
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <button onClick={() => updateBinStatus(bin._id)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Mark Normal">
                          <FaCheck size={12} />
                        </button>
                        <button onClick={() => deleteBin(bin._id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Delete">
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Map */}
      <div className="flex-1 bg-gray-200 relative h-full">
        <LoadScript
          googleMapsApiKey="AIzaSyCQlsYyEJIRVQHAPUpvE54dtdOQNnKY3gM"
          onLoad={onGoogleMapsLoad}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
            ref={mapRef}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
            }}
          >
            {/* Temporary marker for newly selected location */}
            {selectedLocation && (
              <Marker
                position={selectedLocation}
                icon={{
                  url: "/normal-bin.png",
                  scaledSize: getMarkerSize(),
                }}
                animation={window.google && window.google.maps.Animation.BOUNCE}
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
                <div className="p-2 min-w-[150px]">
                  <h4 className="font-bold text-dark-900 mb-3 border-b pb-2">{selectedBin.name}</h4>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => updateBinStatus(selectedBin._id)}
                      className="w-full py-1.5 px-3 rounded bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <FaCheck className="mr-1.5" /> Mark Normal
                    </button>
                    <button
                      onClick={() => deleteBin(selectedBin._id)}
                      className="w-full py-1.5 px-3 rounded bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                      <FaTrash className="mr-1.5" /> Delete
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapComponent;
