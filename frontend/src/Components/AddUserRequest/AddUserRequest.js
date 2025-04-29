import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./AddUserRequest.css"; // Update the CSS file name as well

function AddUserRequest() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "Home", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name & Last Name: Only letters and spaces allowed
    if (name === "name" || name === "lastName") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    // Phone: Only numbers allowed & max length 10
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleServiceTypeChange = (type) => {
    setInputs((prevState) => ({
      ...prevState,
      serviceType: type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/userdash"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/userRequest", {
        name: String(inputs.name),
        lastName: String(inputs.lastName),
        email: String(inputs.email),
        phone: String(inputs.phone),
        address: String(inputs.address),
        serviceType: String(inputs.serviceType),
      })
      .then((res) => res.data);
  };

  return (
    <div className="adduserrequest-container">
      {/* Sidebar */}
      <div className="sidebar-container">
        <div className="sidebar-profile">
          <div className="sidebar-profile-image">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
            />
          </div>
          <h3>Dimmi</h3>
        </div>

        <div className="sidebar-buttons">
          <button onClick={() => window.location.href = '/userdash'}>My Bin</button>
          <button onClick={() => window.location.href = '/userdash'}>Alerts</button>
          <button onClick={() => window.location.href = '/userreqdash'}>Pickup Request</button>
          <button onClick={() => window.location.href = '/logout'}>Log out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="form-container">
        <div className="form-header">
          <h1>Choose Your Waste Solution</h1>
          <p>Enter your information to start service or get a quote.</p>
        </div>

        <div className="service-type-selector">
          <button
            className={`service-type-button ${
              inputs.serviceType === "Business & Organizations" ? "active" : ""
            }`}
            onClick={() => handleServiceTypeChange("Business & Organizations")}
          >
            <span className="icon">🏢</span>
            For Business & Organizations
          </button>
          <button
            className={`service-type-button ${inputs.serviceType === "Home" ? "active" : ""}`}
            onClick={() => handleServiceTypeChange("Home")}
          >
            <span className="icon">🏠</span>
            For Your Home
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="e.g. 123 Main Street, NW, New York"
              onChange={handleChange}
              value={inputs.address}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Joshua"
                onChange={handleChange}
                value={inputs.name}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="e.g. Smith"
                onChange={handleChange}
                value={inputs.lastName}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. smith@myemail.com"
                onChange={handleChange}
                value={inputs.email}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="e.g. 205-555-0168"
                onChange={handleChange}
                value={inputs.phone}
                required
              />
            </div>
          </div>

          <div className="form-group submit-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserRequest;
