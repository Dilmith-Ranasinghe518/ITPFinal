import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav"; // Assuming you have a Nav component
import "./UpdateUserRequest.css"; // Update the CSS file name as well

function UpdateUserRequest() {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "Home",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userRequest/${id}`);
        setInputs(response.data.userRequest);
      } catch (error) {
        console.error("Error fetching user request data:", error);
        alert("Failed to load user request data. Please try again.");
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/userRequest/${id}`, {
        name: String(inputs.name),
        lastName: String(inputs.lastName),
        email: String(inputs.email),
        phone: String(inputs.phone),
        address: String(inputs.address),
        serviceType: String(inputs.serviceType),
      });
      return true;
    } catch (error) {
      console.error("Error updating user request:", error);
      alert("Failed to update user request. Please try again.");
      return false;
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await sendRequest();
    if (success) {
      navigate("/userRequestDetails");
    }
  };

  const handleCancel = () => {
    navigate("/userRequestDetails");
  };

  return (
    <div className="update-container">
      <Nav />
      <div className="update-form-container">
        <h1>Update User Request Information</h1>
        <p>Edit the information below and submit to update the user request record.</p>

        <form onSubmit={handleSubmit}>
          <div className="service-type-selector">
            <button
              type="button"
              className={`service-type-button ${
                inputs.serviceType === "Business & Organizations" ? "active" : ""
              }`}
              onClick={() => handleServiceTypeChange("Business & Organizations")}
            >
              <span className="icon">🏢</span>
              For Business & Organizations
            </button>
            <button
              type="button"
              className={`service-type-button ${inputs.serviceType === "Home" ? "active" : ""}`}
              onClick={() => handleServiceTypeChange("Home")}
            >
              <span className="icon">🏠</span>
              For Your Home
            </button>
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="e.g. 123 Main Street, NW, New York"
              onChange={handleChange}
              value={inputs.address || ""}
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
                value={inputs.name || ""}
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
                value={inputs.lastName || ""}
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
                value={inputs.email || ""}
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
                value={inputs.phone || ""}
                required
              />
            </div>
          </div>

          <div className="action-buttons">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserRequest;
