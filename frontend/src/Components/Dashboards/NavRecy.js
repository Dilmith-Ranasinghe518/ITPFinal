import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import './NavRecyCustom.css'; // 👈 Import the custom CSS separately

function NavRecy() {
  return (
    <nav className="navrecy-navbar navbar navbar-expand-lg navbar-dark">
      <div className="navrecy-container container-fluid">
        <Link className="navrecy-brand navbar-brand" to="/to-r-dash">
          Home
        </Link>
        <button
          className="navrecy-toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navrecy-links navbar-nav ms-auto">
          <li className="nav-item">
          <Link className="nav-link hover:text-green-300 transition duration-300 ease-in-out" to="/add-bids">
            Add Bid
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link hover:text-green-300 transition duration-300 ease-in-out" to="/view-bid-details">
            View Bid Details
          </Link>
        </li>
            <li className="nav-item">
              <Link className="navrecy-link nav-link" to="/view-bids-req-status">
                View Bid Request Status
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navrecy-link nav-link" to="/view-reports">
                View Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navrecy-link nav-link" to="/email">
                Send Report
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navrecy-link nav-link" to="/logout">
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavRecy;
