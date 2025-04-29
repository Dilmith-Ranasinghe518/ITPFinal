import React from 'react';
import './Nav.css';
import {Link} from "react-router-dom";


function Nav() {
  return (
    <div>
      <ul className = "home-li">
      
      <li className="home-li">
        <Link to="/mainhome" className="active home-a">
    <h1>Home</h1>
    </Link>
</li>

<li className="home-li">
<Link to="/additem" className="active home-a">
    <h1>Add Item</h1>
</Link>
</li>

<li className="home-li">
<Link to="/inventory" className="active home-a">
    <h1>Inventory</h1>
</Link>
</li>


<li className="home-li">
<Link to="/register" className="active home-a">
    <h1>Register</h1>
</Link>
</li>


<li className="home-li">
<Link to="/login" className="active home-a">
    <h1>Login</h1>
</Link>
</li>

<li className="home-li">
<Link to="/recycledash" className="active home-a">
    <h1>Recycler</h1>
</Link>
</li>


<li className="home-li">
<Link to="/bins" className="active home-a">
    <h1>View Bins as Collector</h1>
</Link>
</li>

<li className="home-li">
<Link to="/route" className="active home-a">
    <h1>View Bins as Admin</h1>
</Link>
</li>



      </ul>





    </div>
  );
}

export default Nav
