import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';

function WasteDashboard() {
  const [wasteLevel, setWasteLevel] = useState(0);
  const [bins, setBins] = useState([]);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [fullBins, setFullBins] = useState(0); // Full bins count fetched from the backend
  const [userProfile, setUserProfile] = useState({
    name: 'Dimmi',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg', // Example image URL
  });

  const [alertMessage, setAlertMessage] = useState('');
 
  const timeoutRef = useRef(null); // To store the timeout ID


  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getBins');
        setBins(response.data);

        // Count full bins
        const fullBinCount = response.data.filter(bin => bin.full).length;
        setFullBins(fullBinCount);  // Set full bins count after fetching data
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };

    fetchBins();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/waste-level');
        const data = await response.json();
        setWasteLevel(data.wasteLevel);

        if (data.wasteLevel === 100 && selectedBinId) {
          updateBinStatus(selectedBinId, true);
        }

        // Set alert based on waste level
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
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [selectedBinId]);

  const updateBinStatus = async (binId, isFull) => {
    try {
      const binToUpdate = bins.find(bin => bin._id === binId);
      if (binToUpdate && binToUpdate.full === isFull) {
        return; // If bin already in the desired state, do nothing
      }

      // Update the bin status in the backend
      await axios.put(`http://localhost:5000/api/updateBin/${binId}`, { full: isFull });
      console.log(`Bin ${binId} status updated to ${isFull ? 'Full' : 'Normal'}`);

      // Update full bin count in state after marking the bin
      const updatedBins = bins.map(bin => 
        bin._id === binId ? { ...bin, full: isFull } : bin
      );
      setBins(updatedBins);

      // Recalculate full bins count
      const fullBinCount = updatedBins.filter(bin => bin.full).length;
      setFullBins(fullBinCount);

      // Set the alert message based on the bin status update
      if (isFull) {
        setAlertMessage('Bin marked as full');
        alert('Bin marked as full');
        setTimeout(() => setAlertMessage(''), 5000);
        setTimeout(() => alert(''), 5000);
      } else {
        setAlertMessage('Bin marked as normal');
        alert('Bin marked as normal');
      }

      // Optionally clear the alert message after a few seconds
        // Clear the previous timeout (if any) before setting a new one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
  
        // Set a new timeout to clear the alert message after 5 seconds
        timeoutRef.current = setTimeout(() => {
          setAlertMessage('');
        }, 5000);

    } catch (error) {
      console.error('Error updating bin status:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: '#333',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        {/* Profile Image */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <img 
            src={userProfile.profileImage} 
            alt="Profile" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }} 
          />
        </div>

        <h3 style={{ color: '#fff', marginBottom: '20px' }}>{userProfile.name}</h3>

        <div style={{ width: '100%' }}>
          <button 
            style={buttonStyle} 
            onClick={() => window.location.href = '/userdash'}>
            My Bin
          </button>
          <button 
            style={buttonStyle} 
            onClick={() => window.location.href = '/userdash'}>
            Alerts
          </button>
          <button 
            style={buttonStyle} 
            onClick={() => window.location.href = '/userreqdash'}>
            Pickup Request
          </button>
          <button 
            style={buttonStyle} 
            onClick={() => window.location.href = '/logout'}>
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <h2>Bin Status</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <h3>{bins.length}</h3>
            <p>Total Bins</p>
          </div>
          <div style={{ background: '#ff6666', padding: '10px', borderRadius: '5px' }}>
            <h3>{fullBins}</h3>
            <p>Full Bins</p>
          </div>
        </div>
        <p>Current Waste Level: {wasteLevel}%</p>
        <div style={{ height: '30px', width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${wasteLevel}%`,
              backgroundColor: wasteLevel > 70 ? 'red' : wasteLevel > 40 ? 'orange' : 'green',
              transition: 'width 0.5s ease-in-out'
            }}
          ></div>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e74c3c',
            color: '#000',
            borderRadius: '5px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {alertMessage}
          </div>
        )}

        <select onChange={(e) => setSelectedBinId(e.target.value)} style={{ marginTop: '20px', padding: '10px', fontSize: '1rem' }}>
          <option value="">Select Bin</option>
          {bins.map((bin) => (
            <option key={bin._id} value={bin._id}>{bin.name}</option>
          ))}
        </select>

        {/* Button to mark selected bin as normal */}
        {selectedBinId && (
          <button 
            style={buttonStyle} 
            onClick={() => updateBinStatus(selectedBinId, false)}>
            Mark as Normal
          </button>
        )}

      </div>
    </div>
  );
}

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  marginBottom: '15px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default WasteDashboard;
