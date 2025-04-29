import React from "react";
import './Navv.css';

import { NavLink } from "react-router-dom";

function Navv() {
  return (
    <div>
      <ul className="home-ul">
      
                
        
        <li className="home-li">
        <NavLink to = "/adduser" className="active home-a">
          <h1>Add Attendance</h1>
          </NavLink>
        </li>
       
       
        
        
      
        
        <li className="home-li">
        <NavLink to = "/AdminD" className="active home-a">
          <h1>Employee Dashboard</h1>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navv;
