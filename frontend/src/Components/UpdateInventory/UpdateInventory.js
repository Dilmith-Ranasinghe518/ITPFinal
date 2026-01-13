import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Sidebar from "../SideBar/SideBar";

function UpdateInventory() {
    const [inputs, setInputs] = useState({
        name: '',
        category: '',
        unit: 'kg',  // Default unit set to kg
        quantity: '',
        description: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        unit: '',
        quantity: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const { id } = useParams();

    // Fetch Inventory Data on Component Mount
    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5008/inventory/${id}`);
                const item = response.data.inventory || response.data;
                setInputs({
                    name: item.name || '',
                    category: item.category || '',
                    unit: item.unit || 'kg',  // Default to kg if no unit is provided
                    quantity: item.quantity || '',
                    description: item.description || '',
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
                setLoading(false);
            }
        };
        fetchHandler();
    }, [id]);

    // Handle change in input fields with validation
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent user from entering "0" in the quantity field
        if (name === 'quantity' && value === '0') {
            return; // Don't allow "0" to be typed
        }

        // Prevent special characters and numbers in Name
        if (name === 'name' && /[^a-zA-Z\s]/.test(value)) {
            return; // Prevent input of special characters and numbers
        }

        // Prevent numbers or special characters as the first character in Description
        if (name === 'description' && /^[^a-zA-Z]/.test(value)) {
            return; // Prevent special characters or numbers as the first character
        }

        if (name === 'quantity') {
            let quantity = value;

            // Automatically switch unit to 'MT' if quantity > 1000
            if (quantity > 1000 && inputs.unit !== 'MT') {
                setInputs((prevState) => ({
                    ...prevState,
                    unit: 'MT',
                }));
            }

            // Limit quantity to 9999 if unit is 'MT'
            if (inputs.unit === 'MT' && quantity > 9999) {
                quantity = 9999;
            }

            setInputs((prevState) => ({
                ...prevState,
                [name]: quantity,
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

        // Perform validation checks for the input field
        let errorMessage = '';
        switch (name) {
            case 'name':
                if (!isValidName(value)) errorMessage = "Name cannot contain special characters and must be 12 characters or less.";
                break;
            case 'unit':
                if (!isValidUnit(value)) errorMessage = "Unit must be 'kg' or 'MT'.";
                break;
            case 'quantity':
                if (!isValidQuantity(value)) errorMessage = "Quantity must be a valid number greater than 0.";
                break;
            case 'description':
                if (!isValidDescription(value)) errorMessage = "Description cannot exceed 200 characters and cannot start with special characters or numbers.";
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    // Quantity Validation (Only number between 1-999999)
    const isValidQuantity = (value) => {
        if (value === "") return true; // Allow empty value to clear the field
        if (Number(value) <= 0) return false; // Disallow zero or negative quantities
        return /^[1-9][0-9]{0,5}$/.test(value); // Valid number between 1 and 999999
    };

    // Name Validation (Allow only letters and spaces, no special chars, and no 3 consecutive same letter)
    const isValidName = (value) => {
        if (/[^a-zA-Z\s]/.test(value)) return false; // Allow spaces, but no special chars or numbers
        if (/([a-zA-Z])\1{2,}/.test(value)) return false; // No consecutive same letter more than twice
        if (value.length > 12) return false; // Max 12 characters
        return true;
    };

    // Unit Validation (Only 'kg' or 'MT' allowed)
    const isValidUnit = (value) => {
        return value === 'kg' || value === 'MT';
    };

    // Description Validation (Max 200 characters and cannot start with special chars or numbers)
    const isValidDescription = (value) => {
        if (value.length > 200) return false; // Max 200 characters
        if (/^[^a-zA-Z]/.test(value)) return false; // No starting with special char or number
        return true;
    };

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5008/inventory/${id}`, {
                name: String(inputs.name),
                category: String(inputs.category),
                unit: String(inputs.unit),
                quantity: Number(inputs.quantity),
                description: String(inputs.description),
            });
        } catch (error) {
            console.error("Error updating inventory:", error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form data on submit
        let validationErrors = {};

        // Name Validation
        if (!isValidName(inputs.name)) {
            validationErrors.name = "Name cannot contain special characters and must be 12 characters or less.";
        }

        // Category Validation
        if (!inputs.category) {
            validationErrors.category = "Category is required.";
        }

        // Unit Validation
        if (!isValidUnit(inputs.unit)) {
            validationErrors.unit = "Unit must be 'kg' or 'MT'.";
        }

        // Quantity Validation
        if (!isValidQuantity(inputs.quantity)) {
            validationErrors.quantity = "Quantity must be a valid number greater than 0.";
        }

        // Description Validation
        if (!isValidDescription(inputs.description)) {
            validationErrors.description = "Description cannot exceed 200 characters and cannot start with special characters or numbers.";
        }

        if (Object.keys(validationErrors).length === 0) {
            sendRequest().then(() => history('/inventory')); // Redirect after successful update
        } else {
            setErrors(validationErrors);
        }
    };

    // If data is still loading, show a loading message or spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container-form">
    {/* Sidebar Component */}
    <Sidebar />
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ textAlign: "center", color: "#388e3c" }}>Update Inventory</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                />
                {errors.name && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.name}</span>}

                <label>Category</label>
                <select
                    name="category"
                    onChange={handleChange}
                    value={inputs.category}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                >
                    <option value="">Select Category</option>
                    <option value="Organic">Organic</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Polythene">Polythene</option>
                    <option value="Metal">Metal</option>
                </select>
                {errors.category && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.category}</span>}

                <label>Unit</label>
                <select
                    name="unit"
                    onChange={handleChange}
                    value={inputs.unit}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                >
                    <option value="kg">kg</option>
                    <option value="MT">MT</option>
                </select>
                {errors.unit && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.unit}</span>}

                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={inputs.quantity}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                />
                {errors.quantity && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.quantity}</span>}

                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                />
                {errors.description && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.description}</span>}

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#66bb6a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease"
                    }}
                >
                    Update
                </button>
            </form>
        </div>
        </div>
    );
}

export default UpdateInventory;
