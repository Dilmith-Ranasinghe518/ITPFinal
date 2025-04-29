import React from 'react';
import { Link } from 'react-router-dom';
import HomeCarousel from '../HomeCarousel/HomeCarousel';
import NavRecy from "./Nav4admin";
import './DashUser.css';

// Simple Navigation Bar
function NavBar() {
  return (
    <nav className="recycler-dash-nav">
      <ul className="recycler-dash-nav-list">
        <li><Link to="/" className="recycler-dash-nav-link">Home</Link></li>
        <li><Link to="/view-bid-user" className="recycler-dash-nav-link">View Bids</Link></li>
        <li><Link to="/view-bids-req-status" className="recycler-dash-nav-link">View Bid Request Status</Link></li>
      </ul>
    </nav>
  );
}

// Main Dashboard Component
export default function RecyclerDash() {
  return (
    <div className="recycler-dash-container">
      <div>  <NavRecy/></div>
      <div className="recycler-dash-main-container">
        <h1 className="recycler-dash-title">Recycler Dashboard</h1>
        <div>
          <HomeCarousel/>
        </div>
        <div className="recycler-dash-grid">
          {/* Total Users Component */}
          <div className="recycler-dash-card">
            <h3 className="recycler-dash-card-title">Total Users</h3>
            <p className="recycler-dash-card-value">450</p>
          </div>
          
          {/* Total Collections Component */}
          <div className="recycler-dash-card">
            <h3 className="recycler-dash-card-title">Total Collections</h3>
            <p className="recycler-dash-card-value">1,250 kg</p>
          </div>
          
          {/* Total Earnings Component */}
          <div className="recycler-dash-card">
            <h3 className="recycler-dash-card-title">Total Earnings</h3>
            <p className="recycler-dash-card-value">$5,200</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="recycler-dash-footer">
        <p>&copy; 2025 Recycling Company</p>
      </footer>
    </div>
  );
}
