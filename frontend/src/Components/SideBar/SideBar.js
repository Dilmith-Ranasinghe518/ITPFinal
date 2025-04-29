// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().toLocaleString('en-LK', {
        timeZone: 'Asia/Colombo',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inventory-details-sidebar">
      <div className="inventory-details-sidebar-time">
        <p className="inventory-details-sidebar-time-title">📅 Sri Lanka Date & Time</p>
        <p className="inventory-details-sidebar-time-value">{currentTime}</p>
      </div>
      <h2 className="inventory-details-logo">Inventory Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <li><Link to="/mainhome" className="inventory-details-sidebar-link">🏠 Main Home</Link></li>
        <li><Link to="/additem" className="inventory-details-sidebar-link">➕ Add Inventory</Link></li>
        <li><Link to="/recycledash" className="inventory-details-sidebar-link">♻️ Recycler</Link></li>
        <li><Link to="/route" className="inventory-details-sidebar-link">🛣️ Route Dashboard</Link></li>
        <li><Link to="/logout" className="inventory-details-sidebar-link">⏻  Log out</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
