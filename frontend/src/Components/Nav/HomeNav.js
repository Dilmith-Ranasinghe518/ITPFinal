import React from "react";
import "./HomeNav.css";
import { FaSearch, FaUser } from "react-icons/fa";

const HomeNav = () => {
  return (
    <nav className="home-nav">
      <div className="home-nav-logo">
        <span className="home-nav-logo-icon">♻</span>
        <span className="home-nav-logo-text">Clean Cycle</span>
      </div>
      <ul className="home-nav-links">
        <li><a href="/mainhome" className="home-nav-link">Home</a></li>
        <li><a href="/aboutus" className="home-nav-link">About</a></li>
        <li><a href="/login" className="home-nav-link">Recycler</a></li>
        <li><a href="/login" className="home-nav-link">Schedule</a></li>
        <li><a href="/location" className="home-nav-link">Locations</a></li>
      </ul>
      <div className="home-nav-icons">
        <div className="home-nav-search-box">
          <FaSearch className="home-nav-search-icon" />
          <input type="text" className="home-nav-search-input" placeholder="Search" />
        </div>
        <a href="/register" className="home-nav-user-icon">
          <FaUser />
        </a>
      </div>
    </nav>
  );
};

export default HomeNav;
