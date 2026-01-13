import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddBid.css';
import Nav from "../Dashboards/NavRecy"
import Footer from "../Footer/Footer"

function AddBid() {
    const history = useNavigate();
    
    const [inputs, setInputs] = useState({
        wtype: "",
        amount: "",
        price: "",
    });

    const [errors, setErrors] = useState({}); // Error messages state

    // Function to validate the form
    const validateForm = () => {
        let newErrors = {};

        if (!inputs.wtype.trim()) {
            newErrors.wtype = "Waste type is required.";
        }

        // Amount Validation
        const amountValue = Number(inputs.amount);
        if (!inputs.amount) {
            newErrors.amount = "Amount is required.";
        } else if (isNaN(amountValue) || amountValue <= 0) {
            newErrors.amount = "Amount must be a positive number.";
        } else if (amountValue > 99999) {
            newErrors.amount = "Amount must be less than 100,000.";
        }

        // Price Validation
        const priceValue = Number(inputs.price);
        if (!inputs.price) {
            newErrors.price = "Price is required.";
        } else if (isNaN(priceValue) || priceValue <= 0) {
            newErrors.price = "Price must be a positive number.";
        } else if (priceValue > 99999) {
            newErrors.price = "Price must be less than 100,000.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };








    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict input length dynamically
        if ((name === "amount" || name === "price") && value.length > 5) return;

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error when user starts typing
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            sendRequest().then(() => history('/biddetails'));//after thr submit ->path
        }
    };

    const sendRequest = async () => {
        await axios.post("/api/admin", {
            wtype: String(inputs.wtype),
            amount: Number(inputs.amount),
            price: Number(inputs.price),
        }).then(res => res.data);
    };


     
        
            return (
              <div>
                {/* Call Nav4admin before the form container */}
                <Nav />  
          
                <div className="form-container">
                  <h1>Add Bid</h1>
                  <form onSubmit={handleSubmit}>
                    <label>Waste Type</label>
                    <br />
                    <input 
                      type="text" 
                      name="wtype" 
                      onChange={handleChange} 
                      value={inputs.wtype} 
                      placeholder="Enter waste type" 
                    />
                    {errors.wtype && <p className="error">{errors.wtype}</p>}
                    <br /><br />
          
                    <label>Amount (kg)</label>
                    <br />
                    <input 
                      type="number" 
                      name="amount" 
                      onChange={handleChange} 
                      value={inputs.amount} 
                      min="1" 
                      max="99999"
                    />
                    {errors.amount && <p className="error">{errors.amount}</p>}
                    <br /><br />
          
                    <label>Price</label>
                    <br />
                    <input 
                      type="number" 
                      name="price" 
                      onChange={handleChange} 
                      value={inputs.price} 
                      min="1" 
                      max="99999"
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                    <br /><br />
          
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <Footer/>
              </div>
            );
    
}

export default AddBid;
