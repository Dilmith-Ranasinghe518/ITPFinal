import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUserRequest.css";

function UpdateUserRequest() {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "Home",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/userRequest/${id}`);
        setInputs(data.userRequest);
      } catch {
        alert("Failed to load user request. Please try again.");
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "name" || name === "lastName") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setInputs((p) => ({ ...p, [name]: value }));
  };

  const handleServiceTypeChange = (type) =>
    setInputs((p) => ({ ...p, serviceType: type }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/userRequest/${id}`, inputs);
      navigate("/userRequestDetails");
    } catch {
      alert("Update failed. Please try again.");
    }
  };

  const handleCancel = () => navigate("/userRequestDetails");

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
          <h3>Dimmi</h3>
        </div>
        <nav className="nav-buttons">
          <button onClick={() => navigate("/userdash")}>My Bin</button>
          <button onClick={() => navigate("/userdash")}>Alerts</button>
          <button onClick={() => navigate("/userreqdash")}>Pickup Request</button>
          <button onClick={() => navigate("/logout")}>Log out</button>
        </nav>
      </aside>

      <main className="form-wrapper">
        <h1>Update Your Waste Request</h1>
        <p>Edit your information and submit to update your request.</p>

        <div className="service-toggle">
          <button
            className={inputs.serviceType === "Business & Organizations" ? "active" : ""}
            onClick={() => handleServiceTypeChange("Business & Organizations")}
          >
            🏢 For Business & Organizations
          </button>
          <button
            className={inputs.serviceType === "Home" ? "active" : ""}
            onClick={() => handleServiceTypeChange("Home")}
          >
            🏠 For Your Home
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="e.g. 123 Main Street, NW, New York"
            value={inputs.address}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Joshua"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Smith"
                value={inputs.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. smith@myemail.com"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 205-555-0168"
                value={inputs.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="update-btn">
              Update
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default UpdateUserRequest;
