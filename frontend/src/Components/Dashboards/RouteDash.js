import React from "react";
import MapComponent from "../MapComponent/MapComponent";  // Import your existing MapComponent
import styles from "./RouteDash.module.css"; // Import custom styling using CSS Modules
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const RouteDashboard = () => {
  return (
    <div className={styles.routeDashboardContainer}>
      {/* Sidebar */}
      <div className={styles.routeSidebar}>
        <div className={styles.routeSidebarHeader}>
          <h2 className={styles.routeSidebarTitle}>Waste Bin Dashboard</h2>
        </div>
        <div className={styles.routeBinControls}>
         
          <p>Manage and monitor waste bins easily.</p>
          
         
          {/* View Bins Button */}
      <Link to="/bins">
        <button className={styles.routeActionButton}>View Bins</button>
      </Link>

      {/* Add Bin Button */}
      <Link to="/route">
        <button className={styles.routeActionButton}>Add Bin</button>
      </Link>

      <Link to="/userRequestDetails">
        <button className={styles.routeActionButton}>View Requests</button>
      </Link>

      <Link to="/inventory">
        <button className={styles.routeActionButton}>Back to Inventory</button>
      </Link>
      {/* Log Out Button */}
      <Link to="/logout">
        <button className={styles.routeActionButton}>Log out</button>
      </Link>

      
          
          

        </div>
      </div>

      {/* Main Content */}
      <div className={styles.routeMainContent}>
        <div className={styles.routeContentHeader}>
          <h3 className={styles.routeMapViewTitle}></h3>
        </div>
        <div className={styles.routeMapContainer}>
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default RouteDashboard;
