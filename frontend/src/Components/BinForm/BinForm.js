import React, { useState } from "react";

const BinForm = ({ onAddBin }) => {
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    full: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.lat || !formData.lng) {
      alert("Please enter all fields!");
      return;
    }

    onAddBin({
      id: Date.now(),
      name: formData.name,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      full: formData.full,
    });

    setFormData({ name: "", lat: "", lng: "", full: false }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        name="name"
        placeholder="Bin Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="any"
        name="lat"
        placeholder="Latitude"
        value={formData.lat}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="any"
        name="lng"
        placeholder="Longitude"
        value={formData.lng}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="full"
          checked={formData.full}
          onChange={handleChange}
        />
        Full Bin
      </label>
      <button type="submit">Add Waste Bin</button>
    </form>
  );
};

export default BinForm;
