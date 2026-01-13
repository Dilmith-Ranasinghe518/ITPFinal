import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
// import "../MapComponent/MapComponent.css"; // CSS Removed

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 6.0326,
  lng: 80.2168,
};

const Location = () => {
  const [normalBins, setNormalBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    fetchNormalBins();
  }, []);

  const onGoogleMapsLoad = () => {
    setGoogleMapsLoaded(true);
  };

  const getMarkerSize = () => {
    return googleMapsLoaded ? new window.google.maps.Size(20, 20) : undefined;
  };

  const fetchNormalBins = async () => {
    try {
      const response = await axios.get("/api/getBins");
      const normal = response.data.filter((bin) => !bin.full);
      setNormalBins(normal);
    } catch (error) {
      console.error("Error fetching normal bins:", error);
      alert("Failed to load bins.");
    }
  };

  return (
    <div className="map-page">
      <h2 style={{ textAlign: "center" }}>Locations</h2>


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
          {/* Normal bins only */}
          {normalBins.map((bin) => (
            <Marker
              key={bin._id}
              position={{ lat: bin.lat, lng: bin.lng }}
              icon={{
                url: "/normal-bin.png",
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
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Location;
