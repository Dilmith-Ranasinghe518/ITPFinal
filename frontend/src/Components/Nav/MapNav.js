import React from 'react';
import './Nav.css';
import {Link} from "react-router-dom";


function MapNav() {
  return (
    <div>
      <ul className = "home-li">
      
      <li className="home-li">
        <Link to="/usermap" className="active home-a">
    <h1>User</h1>
    </Link>
</li>


<li className="home-li">
        <Link to="/adminmap" className="active home-a">
    <h1>Admin</h1>
    </Link>
</li>


      </ul>





    </div>
  );
}

export default MapNav
