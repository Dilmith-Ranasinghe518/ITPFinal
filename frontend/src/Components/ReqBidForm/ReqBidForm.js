import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 Import
import './ReqBidForm.css'; 
import Nav from "../Dashboards/Nav4admin"
import Footer from "../Footer/Footer"

function ReqBidForm() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    wtype: "",
    amount: "",
    price: "",
    companyName: "",
    email: "",
    phone: "",
    additionalNote: ""
  });

  const [errors, setErrors] = useState({
    companyName: "",
    email: "",
    phone: "",
    wtype: "",
    amount: "",
    price: "",
    additionalNote: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For amount and price fields, allow only 6 numeric characters
    if ((name === "amount" || name === "price") && value.length > 6) return;

    // For amount and price fields, ensure only numbers are entered
    if ((name === "amount" || name === "price") && !/^\d*$/.test(value)) return;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInputs = (name, value) => {
    let errorMsg = "";

    switch (name) {
        case "companyName":
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMsg = "Company name must contain only letters and spaces, no numbers or special characters.";
            }
            break;

        case "email":
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                errorMsg = "Invalid email format.";
            }
            break;

        case "phone":
            if (!/^\d{10}$/.test(value)) {
                errorMsg = "Phone number must be exactly 10 digits.";
            }
            break;

        case "wtype":
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMsg = "Work type must contain only letters and spaces, no numbers or special characters.";
            }
            break;

        case "amount":
        case "price":
            if (!/^\d+(\.\d{1,2})?$/.test(value) || parseFloat(value) <= 0) {
                errorMsg = "Value must be a positive number.";
            } else if (parseFloat(value) >= 100000) {
                errorMsg = "Value must be less than 100,000.";
            }
            break;

        case "additionalNote":
            if (value.length > 200) {
                errorMsg = "Maximum 200 characters allowed.";
            }
            break;

        default:
            errorMsg = "";
    }

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMsg,
    }));

    return errorMsg; // Return the error message to be checked
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;

    // Restrict phone number to 10 digits only
    if (name === "phone" && value.length > 10) return;

    setInputs((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

  const handleKeyPress = (e) => {
    // Block special characters and letters
    const isNumericInput = /^[0-9]$/;
    const isAmountOrPriceField = e.target.name === "amount" || e.target.name === "price";

    if (isAmountOrPriceField && !isNumericInput.test(e.key)) {
        e.preventDefault(); // Prevent non-numeric key press for amount and price fields
    }

    // Block non-alphabetical characters for text fields (company name, work type)
    if ((e.target.name === "companyName" || e.target.name === "wtype") && /[^a-zA-Z\s]/.test(e.key)) {
      e.preventDefault(); // Block non-alphabetical key press
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Loop through all inputs and validate them
    let isValid = true;
    for (const field in inputs) {
      const errorMsg = validateInputs(field, inputs[field]);
      if (errorMsg) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      // Show SweetAlert2 for errors
      Swal.fire('Error!', 'Please fix the highlighted errors before submitting.', 'error');
      return;
    }

    setLoading(true);

    sendRequest()
      .then(() => {
        Swal.fire('Success!', 'Bid request submitted successfully.', 'success')
          .then(() => history('/view-bid-user'));//navigation path
      })
      .catch((err) => {
        Swal.fire('Error!', 'Failed to submit the bid request. Please try again.', 'error');
        console.error("Error in sending request:", err);
      })
      .finally(() => setLoading(false));
  };

  const sendRequest = async () => {
    await axios.post("/api/bids", {
      companyName: inputs.companyName,
      email: inputs.email,
      phone: inputs.phone,
      amount: parseInt(inputs.amount, 10),
      bidDate: new Date().toISOString(),
      wtype: inputs.wtype,
      userRecommendedPrice: parseInt(inputs.price, 10),
      additionalNote: inputs.additionalNote
    });
  };

  return (
    <div>
      <Nav/>
    <div className="add-bid-form">
      <h2>Create a New Bid Request</h2>
      <form onSubmit={handleSubmit} className="bid-form">
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={inputs.companyName}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Prevent special characters/numbers
          required
        />
        {errors.companyName && <span className="error-text">{errors.companyName}</span>}

        <div>
          <label>Email</label>
          <input type="email" name="email" value={inputs.email} onChange={handleChange} required />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="number"
            name="phone"
            value={inputs.phone}
            onChange={handleChange1}
            maxLength="10"  // Ensures input is limited to 10 characters
            required
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <label>Waste Type</label>
        <input
          type="text"
          name="wtype"
          value={inputs.wtype}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // Prevent special characters/numbers
          required
        />
        {errors.wtype && <span className="error-text">{errors.wtype}</span>}

        <div>
          <label>Amount(kg)</label>
          <input
            type="number"
            name="amount"
             maxLength="6"
            value={inputs.amount}
            onChange={handleChange}
            required
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            maxLength="6"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        <div>
          <label>Additional Notes</label>
          <textarea
            name="additionalNote"
            value={inputs.additionalNote}
            onChange={handleChange}
          ></textarea>
          {errors.additionalNote && <span className="error-text">{errors.additionalNote}</span>}
        </div>

        <button className="btn-1-req"type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Bid Request"}
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
}

export default ReqBidForm;
