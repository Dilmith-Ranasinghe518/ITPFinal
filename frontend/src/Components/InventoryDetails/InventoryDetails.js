import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from "recharts";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import './InventoryDetails.css';

const URL = "http://localhost:5000/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function InventoryDetails() {
  const [inventory, setInventoryDetails] = useState([]);
  const [totals, setTotals] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [wastePredictionData, setWastePredictionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recycleQuantity, setRecycleQuantity] = useState("");
  const [recycleData, setRecycleData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  // Recycling Estimation Input States
const [userName, setUserName] = useState("");
const [materialCategory, setMaterialCategory] = useState("");
const [materialAmount, setMaterialAmount] = useState("");
const [recycleResult, setRecycleResult] = useState(null);


  useEffect(() => {
    loadInventoryData();

    const timer = setInterval(() => {
      const now = new Date().toLocaleString("en-LK", {
        timeZone: "Asia/Colombo",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDataUpdated) {
      loadInventoryData();
      setIsDataUpdated(false);
    }
  }, [isDataUpdated]);

  const fetchRecycleData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/recycle");
      setRecycleData(res.data);
    } catch (err) {
      console.error("Error fetching recycled data:", err);
    }
  };

  const loadInventoryData = () => {
    fetchHandler().then((data) => {
      let updatedInventory = [];
  
      data.inventory.forEach(item => {
        const existingItemIndex = updatedInventory.findIndex(
          (i) => i.name === item.name && i.category === item.category
        );
  
        if (existingItemIndex !== -1) {
          updatedInventory[existingItemIndex].quantity += item.quantity;
        } else {
          updatedInventory.push(item);
        }
      });
  
      // Update unit to 'MT' if quantity > 1000kg and convert quantity to metric tons
      updatedInventory = updatedInventory.map(item => {
        if (item.unit === "kg" && item.quantity > 1000) {
          item.unit = "MT";
          item.quantity = (item.quantity / 1000).toFixed(2); // Convert to metric tons with 2 decimal places
        }
        return item;
      });
  
      setInventoryDetails(updatedInventory);
  
      // Calculate totals for the categories (keep track of units here as well)
      const categoryTotals = updatedInventory.reduce((acc, item) => {
        if (acc[item.category]) {
          acc[item.category].quantity += item.quantity;
        } else {
          acc[item.category] = {
            category: item.category,
            quantity: item.quantity,
            unit: item.unit, // Capture the unit for each category
          };
        }
        return acc;
      }, {});
  
      const chartData = Object.keys(categoryTotals).map((category) => ({
        category,
        quantity: categoryTotals[category].quantity,
        unit: categoryTotals[category].unit, // Add the unit to the chart data
      }));
  
      setTotals(chartData);
  
      // Check for low stock items
      const lowStock = chartData.filter(item => item.quantity <= 500);
      setLowStockAlerts(lowStock);
  
      // Waste prediction (e.g. 10% of quantity)
      const predictedWaste = chartData.map((item) => ({
        category: item.category,
        predictedWaste: item.quantity * 0.1
      }));
  
      setWastePredictionData(predictedWaste);
    });
  
    fetchRecycleData();
  };
  

  const getStatus = (quantity) => {
    if (quantity <= 500) return { message: "Low Stock! Urgent Restock Needed", color: "bg-red-500" };
    if (quantity > 500 && quantity <= 800) return { message: "Stock Level Moderate", color: "bg-yellow-500" };
    if (quantity > 800 || (quantity >= 1 && quantity <= 10)) return { message: "Stock is Well Maintained", color: "bg-blue-500" };
    return { message: "Stock Level Normal", color: "bg-green-500" };
  };




  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      setInventoryDetails((prevInventory) => prevInventory.filter(item => item._id !== id));
      setIsDataUpdated(true);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  const handleRecycleEstimation = () => {
    if (!userName || !materialCategory || !materialAmount) {
      alert("Please fill all fields: Name, Category, and Amount.");
      return;
    }
  
    const amount = parseFloat(materialAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }
  
    let recycledAmount = 0;
    let description = "";
  
    switch (materialCategory) {
      case "Plastic":
        recycledAmount = amount * 0.92; // about 92% efficient
        description = "Plastic can typically be recycled with a 90-95% efficiency, depending on cleanliness.";
        break;
      case "Polythene":
        recycledAmount = amount * 0.9; // about 90% efficiency
        description = "Polythene recycling depends on cleanliness and type; clean polythene can recover up to 90%.";
        break;
      case "Organic":
        recycledAmount = amount * 0.35; // compost weight after water loss
        description = "Organic waste reduces in weight significantly during composting, resulting in around 30-40% compost.";
        break;
      case "Metal":
        recycledAmount = amount * 0.99; // nearly full recovery
        description = "Metals like aluminum and steel have almost 100% recycling efficiency, saving significant energy.";
        break;
      default:
        alert("Invalid material category.");
        return;
    }
  
    setRecycleResult({
      userName,
      category: materialCategory,
      inputAmount: amount.toFixed(2),
      recycledAmount: recycledAmount.toFixed(2),
      description
    });
  
    // Clear input fields
    setUserName("");
    setMaterialCategory("");
    setMaterialAmount("");
  };
  

  const getBase64ImageFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  

  const downloadReport = async () => {
    const doc = new jsPDF();
  
    // Convert public/logo.png to Base64 and add to PDF
    const logoImg = await getBase64ImageFromURL("/logo.jpeg");
    doc.addImage(logoImg, 'JPEG', 150, 10, 40, 20); // Adjust size and position as needed
  
    const currentDate = new Date().toLocaleString("en-LK", {
      timeZone: "Asia/Colombo",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  
    const userName = "Inventory Manager - D.Ranasinghe";
  
    doc.setFontSize(16);
    doc.text("Clean Cycle", 14, 20);
    doc.setFontSize(12);
    doc.text("Address: 1234 Galle Municipal Council, Galle Road, Galle, Sri Lanka", 14, 28);
    doc.text("Email: contact@cleancycle.lk", 14, 34);
    doc.text("Telephone: +94 912 248 008", 14, 40);
    doc.text(`Report Generated by: ${userName}`, 14, 46);
    doc.text(`Date and Time of Report: ${currentDate}`, 14, 52);
  
    doc.setFontSize(18);
    doc.text("Inventory Report", 14, 70);
  
    doc.setFontSize(12);
    doc.text("Total Quantity by Category:", 14, 80);
    let yOffset = 90;
    totals.forEach(item => {
      doc.text(`${item.category}: ${item.quantity} ${item.unit}`, 14, yOffset);
      yOffset += 10;
    });
  
    yOffset += 15;
    if (lowStockAlerts.length > 0) {
      doc.text(`Low Stock Alerts:`, 14, yOffset);
      yOffset += 10;
      lowStockAlerts.forEach(item => {
        doc.text(`${item.category}: ${item.quantity} ${item.unit}`, 14, yOffset);
        yOffset += 10;
      });
    }
  
    yOffset += 15;
    doc.text("Inventory Items Table:", 14, yOffset);
    yOffset += 10;
    doc.autoTable({
      startY: yOffset,
      head: [["ID", "Name", "Category", "Unit", "Quantity", "Description"]],
      body: inventory.map(item => [
        item._id, item.name, item.category, item.unit, item.quantity, item.description
      ])
    });
  
    doc.save("inventory_report_clean_cycle.pdf");
  };
  
  const downloadRecycleReport = () => {
    const doc = new jsPDF();
    
    const currentDate = new Date().toLocaleString("en-LK", {
      timeZone: "Asia/Colombo",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    const userName = "Inventory Manager - D.Ranasinghe "; 
  
    // Setting the font size and title
    doc.setFontSize(16);
    doc.text("Clean Cycle", 14, 20);
    
    doc.setFontSize(12);
    doc.text("Address: 1234 Galle Municipal Council, Galle Road, Galle, Sri Lanka", 14, 28);
    doc.text("Email: contact@cleancycle.lk", 14, 34);
    doc.text("Telephone: +94 912 248 008", 14, 40);
    doc.text(`Report Generated by: ${userName}`, 14, 46);
    doc.text(`Date and Time of Report: ${currentDate}`, 14, 52);
  
    // Add some extra space before the "Recycle Report" section
    let yOffset = 60;
    doc.setFontSize(18);
    doc.text("Recycle Report", 14, yOffset);
    
    // Add some more space before listing recycled items
    yOffset += 10; // Increase space between the title and body content
    doc.setFontSize(12);
    doc.text("Recycled Items by Category:", 14, yOffset);
  
    // Add space between the section title and table
    yOffset += 20; // Additional space for the table
  
    doc.autoTable({
      startY: yOffset,
      head: [["Category", "Quantity (kg)", "Transferred At"]],
      body: recycleData.map(item => [
        item.category,
        item.quantity,
        new Date(item.transferredAt).toLocaleString()
      ])
    });
  
    // Add more space after the table before the footer (optional)
    yOffset = doc.autoTable.previous.finalY + 20; // Move down after the table
  
    // Optional footer or additional sections (if needed)
   
  
    doc.save("recycle_report.pdf");
  };
  

  const handleSelectiveRecycle = async () => {
    if (!selectedCategory || !recycleQuantity) {
      alert("Please select a category and enter a quantity.");
      return;
    }

    const matchingCategory = totals.find(item => item.category === selectedCategory);
    if (!matchingCategory || recycleQuantity > matchingCategory.quantity) {
      alert("Invalid quantity. Cannot recycle more than available.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/recycle", {
        recycledData: [{ category: selectedCategory, quantity: parseFloat(recycleQuantity) }]
      });

      alert("♻️ Successfully transferred selected quantity to recycle table.");
      setSelectedCategory("");
      setRecycleQuantity("");
      loadInventoryData();
      setIsDataUpdated(true);
    } catch (error) {
      console.error("Error transferring selective recycle:", error);
      alert("Error transferring data to recycle table.");
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container inventory-details">
      <div className="inventory-details-sidebar">
        <div className="inventory-details-sidebar-time">
          <p className="inventory-details-sidebar-time-title">📅 Sri Lanka Date & Time</p>
          <p className="inventory-details-sidebar-time-value">{currentTime}</p>
        </div>
        <h2 className="inventory-details-logo">Inventory Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", display: "flex",  flexDirection: "column", gap: "1rem" }}>
          <li><a href="/mainhome" className="inventory-details-sidebar-link">🏠 Main Home</a></li>
          <li><a href="/additem" className="inventory-details-sidebar-link">➕ Add Inventory</a></li>
          <li><a href="/recycledash" className="inventory-details-sidebar-link">♻️ Recycler</a></li>
          <li><a href="/route" className="inventory-details-sidebar-link">🛣️ Route Dashboard</a></li>
          <li><a href="/logout" className="inventory-details-sidebar-link">⏻  Log out</a></li>
        </ul>
      </div>

      <div className="inventory-details-content-area">
        <h1>Inventory Details Page</h1>

        {lowStockAlerts.length > 0 && (
          <div className="inventory-details-alert-box">
            ⚠ Warning! Low stock in: {lowStockAlerts.map(item => item.category).join(", ")}
          </div>
        )}

        <div className="inventory-details-charts-container">
          <div className="inventory-details-chart-item">
            <h2 className="inventory-details-chart-title">📊 Inventory Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={totals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#34D399" barSize={50} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="inventory-details-chart-item">
            <h2 className="inventory-details-chart-title">🔮 Waste Prediction</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={wastePredictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="predictedWaste" stroke="#FF6347" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="inventory-details-chart-item">
  <h2 className="inventory-details-chart-title">📊 Inventory Distribution by Category</h2>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={totals}
        dataKey="quantity"
        nameKey="category"
        outerRadius={100}
        label
      >
        {totals.map((entry, index) => {
          // Get the stock status based on the quantity
          const status = getStatus(entry.quantity, entry.unit); 

          // Assign colors based on stock status
          let color = "#34D399"; // Default green (normal stock)
          if (status.color === "bg-red-500") color = "#FF6347"; // Red for low stock
          if (status.color === "bg-yellow-500") color = "#FFD700"; // Yellow for moderate stock
          if (status.color === "bg-blue-500") color = "#1E90FF"; // Blue for well maintained stock

          return <Cell key={`cell-${index}`} fill={color} />;
        })}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
</div>

        <div className="inventory-details-status-cards">
          {totals.map((item, index) => {
            const status = getStatus(item.quantity);
            return (
              <div key={index} className={`inventory-details-status-card inventory-details-${status.color}`}>
                <h3 className="inventory-details-status-category">{item.category}</h3>
                <p className="inventory-details-status-message">{status.message}</p>
                <p className="inventory-details-status-quantity">{item.quantity} {item.unit}</p>
              </div>
            );
          })}
        </div>

        <div className="inventory-details-search-container">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="inventory-details-search-input"
          />
        </div>

        <div className="inventory-details-table-container">
          <h2 className="inventory-details-table-title">📋 Inventory Items</h2>
          <table className="inventory-details-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className="inventory-details-actions">
                      <Link to={`/inventory/${item._id}`} className="inventory-details-update-button">Update</Link>
                      <button onClick={() => deleteHandler(item._id)} className="inventory-details-delete-button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="inventory-details-recycle-form">
          <h2 style={{ textAlign: "center" }}>♻️ Recycle Inventory by Category</h2>
          
          <div className="inventory-details-recycle-form">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="inventory-details-recycle-select"
            >
              <option value="">Select Category</option>
              {totals.map((item, index) => (
                <option key={index} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Enter quantity to recycle"
              value={recycleQuantity}
              onChange={(e) => setRecycleQuantity(e.target.value)}
              className="inventory-details-recycle-input"
            />

            <button onClick={handleSelectiveRecycle} className="inventory-details-recycle-button">
              Transfer to Recycle
            </button>
          </div>
        </div>

        <div className="inventory-details-table-container">
          <h2 className="inventory-details-table-title">♻️ Recycled Items</h2>
          <table className="inventory-details-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Quantity</th>
                <th>Transferred At</th>
              </tr>
            </thead>
            <tbody>
              {recycleData.length === 0 ? (
                <tr>
                  <td colSpan="3">No recycled items yet.</td>
                </tr>
              ) : (
                recycleData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.quantity} kg</td>
                    <td>{new Date(item.transferredAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="inventory-details-selective-recycle-box">
        <h2>♻️ Recycle Estimation Calculator</h2>
<div className="inventory-details-recycle-form">
  <input
    type="text"
    placeholder="Enter waste type"
    value={userName}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only letters and spaces
      if (/^[A-Za-z\s]*$/.test(value)) {
        setUserName(value);
      }
    }}
    className="inventory-details-recycle-input"
  />
  
  <select
    value={materialCategory}
    onChange={(e) => setMaterialCategory(e.target.value)}
    className="inventory-details-recycle-select"
  >
    <option value="">Select Material Category</option>
    <option value="Plastic">Plastic</option>
    <option value="Polythene">Polythene</option>
    <option value="Organic">Organic</option>
    <option value="Metal">Metal</option>
  </select>

  <input
    type="number"
    placeholder="Enter amount (kg)"
    value={materialAmount}
    onChange={(e) => {
      const value = e.target.value;
      // Prevent first digit 0 and allow only numbers between 1-99999
      if (/^[1-9][0-9]{0,4}$/.test(value) || value === "") {
        setMaterialAmount(value);
      }
    }}
    className="inventory-details-recycle-input"
  />

  <button onClick={handleRecycleEstimation} className="inventory-details-recycle-button">
    Estimate Recyclable Amount
  </button>
</div>

{recycleResult && (
  <div className="inventory-details-recycle-result">
    <h3>🔍 Result for {recycleResult.userName}</h3>
    <p><strong>Category:</strong> {recycleResult.category}</p>
    <p><strong>Input Amount:</strong> {recycleResult.inputAmount} kg</p>
    <p><strong>Estimated Recycled Amount:</strong> {recycleResult.recycledAmount} kg</p>
    <p><strong>Description:</strong> {recycleResult.description}</p>
  </div>
)}
</div>




        <div className="inventory-details-download-button">
          <button onClick={downloadReport}>Download Inventory Report</button>
          <button onClick={downloadRecycleReport}>Download Recycle Report</button>
        </div>
      </div>
    </div>
  );
}

export default InventoryDetails;
