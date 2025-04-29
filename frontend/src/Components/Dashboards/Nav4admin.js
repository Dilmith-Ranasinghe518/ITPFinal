import React from 'react';
import { Link } from 'react-router-dom';
import './Nav4admin.css'; // Import the fixed CSS

function Nav4admin() {
  return (
    
    <nav className="nav4admin-navbar navbar navbar-expand-lg navbar-dark">
       <div className="home-nav-logo">
        <span className="home-nav-logo-icon">♻</span>
        <span className="home-nav-logo-text">Clean Cycle</span>
      </div>
      <div className="nav4admin-container container-fluid">
        <Link className="nav4admin-brand navbar-brand" to="/4-dash-user">
          Home
        </Link>
        <button
          className="nav4admin-toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav4adminNavbar"
          aria-controls="nav4adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse nav4admin-links" id="nav4adminNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav4admin-link nav-link" to="/view-bid-user">
                View Bids
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav4admin-link nav-link" to="/view-bids-req-status-1">
                View Bid Request Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav4admin-link nav-link" to="/logout">
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav4admin;
