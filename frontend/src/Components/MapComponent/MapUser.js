import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 6.0326,
  lng: 80.2168,
};

const MapUser = () => {
  const [redBins, setRedBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);

  // ✅ Load only full bins on mount
  useEffect(() => {
    fetchRedBins();
  }, []);

  const fetchRedBins = async () => {
    try {
      const response = await axios.get("/api/getBins");
      const fullBins = response.data.filter((bin) => bin.full === true);
      setRedBins(fullBins);
    } catch (error) {
      console.error("Error fetching bins:", error);
    }
  };

  // ✅ Mark bin as normal and remove from redBins
  const updateBinStatus = async (id) => {
    try {
      const response = await axios.put(`/api/updateBin/${id}`, {
        full: false,
      });

      const updated = response.data.bin;
      if (updated && !updated.full) {
        setRedBins((prev) => prev.filter((bin) => bin._id !== id));
        setSelectedBin(null);
        alert("Bin marked as normal.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update bin.");
    }
  };

  return (
    <div>
      <h2>🗺️ Full Waste Bins</h2>

      <LoadScript googleMapsApiKey="AIzaSyCQlsYyEJIRVQHAPUpvE54dtdOQNnKY3gM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{ clickableIcons: false, disableDefaultUI: true }}
        >
          {redBins.map((bin) => (
            <Marker
              key={bin._id}
              position={{ lat: bin.lat, lng: bin.lng }}
              icon={{
                url: "/red-bin.png",
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              onClick={() => setSelectedBin(bin)}
            />
          ))}

          {selectedBin && (
            <InfoWindow
              position={{ lat: selectedBin.lat, lng: selectedBin.lng }}
              onCloseClick={() => setSelectedBin(null)}
            >
              <div>
                <h4>{selectedBin.name}</h4>
                <button onClick={() => updateBinStatus(selectedBin._id)}>
                  ✔️ Mark as Normal
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapUser;
