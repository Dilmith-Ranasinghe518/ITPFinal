import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./UpdateBidDetails.css"; // Import the CSS file
import Nav4admin from "../Dashboards/NavRecy";
import Footer from "../Footer/Footer";

function UpdateBidDetails() {
  const [inputs, setInputs] = useState({
    wtype: "",
    amount: "",
    price: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBidData = async () => {
      try {
        const response = await axios.get(`http://localhost:5008/admin/${id}`);
        console.log("API Response:", response.data); // Debugging

        if (response.data && response.data.admin) {
          setInputs(response.data.admin); // Corrected key
        } else {
          console.error("Error: 'admin' object is missing in response");
        }
      } catch (error) {
        console.error("Error fetching Bid data:", error);
      }
    };

    fetchBidData();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5008/admin/${id}`, {
        wtype: inputs.wtype,
        amount: inputs.amount,
        price: inputs.price,
      });

      if (response.status === 200) {
        // Success pop-up using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Bid Updated Successfully",
          text: "The bid details have been updated.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/biddetails"); // Redirect after successful update
        });
      } else {
        throw new Error("Failed to update Bid Data");
      }
    } catch (error) {
      // Error pop-up using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating the bid data.",
        confirmButtonText: "Try Again",
      });
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <Nav4admin/>
    <div className="update-bid-container">
      <h1 className="update-bid-title">Update Bid Details</h1>

      <form onSubmit={handleSubmit} className="update-bid-form">
        <label htmlFor="wtype" className="form-label">Waste Type</label>
        <select
          id="wtype"
          name="wtype"
          onChange={handleChange}
          value={inputs.wtype || ""}
          required
          className="form-select"
        >
          <option value="">Select Category</option>
          <option value="Organic">Organic</option>
          <option value="Plastic">Plastic</option>
          <option value="Polythene">Polythene</option>
          <option value="Metal">Metal</option>
        </select>

        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={inputs.amount || ""}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={inputs.price || ""}
          onChange={handleChange}
          required
          className="form-input"
        />

        <button type="submit" className="form-submit-btn-update">Update</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default UpdateBidDetails;

