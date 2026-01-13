import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { FaHome, FaPlus, FaRecycle, FaRoute, FaSignOutAlt, FaChartPie, FaChartLine, FaClipboardList, FaDownload } from 'react-icons/fa';
// import './InventoryDetails.css'; // Removed external CSS

const URL = "/api/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// Sidebar Component
const Sidebar = ({ navigate }) => (
  <div className="w-64 bg-dark-900 text-white flex flex-col items-center py-8 shadow-2xl h-screen sticky top-0 group transition-all duration-300">
    <div className="flex flex-col items-center mb-10 text-center">
      <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/50">
        <FaRecycle className="text-2xl text-white" />
      </div>
      <h1 className="text-xl font-bold tracking-wider uppercase">Clean Cycle</h1>
      <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
    </div>

    <nav className="w-full px-4 space-y-2 flex-grow">
      <button onClick={() => navigate('/mainhome')} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
        <FaHome className="mr-3 text-lg" /> Main Home
      </button>
      <button onClick={() => navigate('/additem')} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
        <FaPlus className="mr-3 text-lg" /> Add Inventory
      </button>
      <button onClick={() => navigate('/recycledash')} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
        <FaRecycle className="mr-3 text-lg" /> Recycler
      </button>
      <button onClick={() => navigate('/route')} className="w-full flex items-center p-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-all duration-200">
        <FaRoute className="mr-3 text-lg" /> Route Dashboard
      </button>

      <div className="py-4 mt-4 border-t border-dark-800">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2">Reports</p>
        <button className="w-full flex items-center p-3 rounded-xl bg-primary-600/10 text-primary-400 hover:bg-primary-600 hover:text-white transition-all duration-200 cursor-default">
          <FaClipboardList className="mr-3 text-lg" /> Inventory Overview
        </button>
      </div>
    </nav>

    <div className="w-full px-4 mt-auto">
      <button onClick={() => navigate('/logout')} className="w-full flex items-center justify-center p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  </div>
);

function InventoryDetails() {
  const navigate = useNavigate();
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
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
      });
      setCurrentTime(now);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDataUpdated) {
      loadInventoryData();
      setIsDataUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataUpdated]);

  const fetchRecycleData = async () => {
    try {
      const res = await axios.get("/api/recycle");
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

      updatedInventory = updatedInventory.map(item => {
        if (item.unit === "kg" && item.quantity > 1000) {
          item.unit = "MT";
          item.quantity = (item.quantity / 1000).toFixed(2);
        }
        return item;
      });
      setInventoryDetails(updatedInventory);

      const categoryTotals = updatedInventory.reduce((acc, item) => {
        if (acc[item.category]) {
          acc[item.category].quantity += item.quantity;
        } else {
          acc[item.category] = {
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
          };
        }
        return acc;
      }, {});

      const chartData = Object.keys(categoryTotals).map((category) => ({
        category,
        quantity: categoryTotals[category].quantity,
        unit: categoryTotals[category].unit,
      }));
      setTotals(chartData);

      const lowStock = chartData.filter(item => item.quantity <= 500);
      setLowStockAlerts(lowStock);

      const predictedWaste = chartData.map((item) => ({
        category: item.category,
        predictedWaste: item.quantity * 0.1
      }));
      setWastePredictionData(predictedWaste);
    });
    fetchRecycleData();
  };

  const getStatus = (quantity) => {
    if (quantity <= 500) return { message: "Low Stock! Urgent Restock Needed", color: "text-red-600 bg-red-100 border-red-200" };
    if (quantity > 500 && quantity <= 800) return { message: "Stock Level Moderate", color: "text-yellow-600 bg-yellow-100 border-yellow-200" };
    if (quantity > 800 || (quantity >= 1 && quantity <= 10)) return { message: "Stock is Well Maintained", color: "text-blue-600 bg-blue-100 border-blue-200" };
    return { message: "Stock Level Normal", color: "text-green-600 bg-green-100 border-green-200" };
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/inventory/${id}`);
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
      case "Plastic": recycledAmount = amount * 0.92; description = "Plastic can typically be recycled with a 90-95% efficiency."; break;
      case "Polythene": recycledAmount = amount * 0.9; description = "Clean polythene can recover up to 90%."; break;
      case "Organic": recycledAmount = amount * 0.35; description = "Organic waste reduces significantly during composting."; break;
      case "Metal": recycledAmount = amount * 0.99; description = "Metals have almost 100% recycling efficiency."; break;
      default: alert("Invalid material category."); return;
    }
    setRecycleResult({
      userName, category: materialCategory, inputAmount: amount.toFixed(2), recycledAmount: recycledAmount.toFixed(2), description
    });
    setUserName(""); setMaterialCategory(""); setMaterialAmount("");
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
    const logoImg = await getBase64ImageFromURL("/logo.jpeg"); // Ensure this path is correct
    doc.addImage(logoImg, 'JPEG', 150, 10, 40, 20);
    const currentDate = new Date().toLocaleString("en-LK", { timeZone: "Asia/Colombo", dateStyle: 'full', timeStyle: 'medium' });
    const userName = "Inventory Manager - D.Ranasinghe";

    doc.setFontSize(16); doc.text("Clean Cycle", 14, 20);
    doc.setFontSize(12); doc.text("Address: Galle Municipal Council, Galle, Sri Lanka", 14, 28);
    doc.text("Email: contact@cleancycle.lk", 14, 34); doc.text("Telephone: +94 912 248 008", 14, 40);
    doc.text(`Report Generated by: ${userName}`, 14, 46); doc.text(`Date: ${currentDate}`, 14, 52);

    doc.setFontSize(18); doc.text("Inventory Report", 14, 70);
    doc.setFontSize(12); doc.text("Total Quantity by Category:", 14, 80);
    let yOffset = 90;
    totals.forEach(item => {
      doc.text(`${item.category}: ${item.quantity} ${item.unit}`, 14, yOffset);
      yOffset += 10;
    });

    if (lowStockAlerts.length > 0) {
      yOffset += 10;
      doc.setTextColor(255, 0, 0);
      doc.text(`Low Stock Alerts:`, 14, yOffset);
      doc.setTextColor(0, 0, 0);
      yOffset += 10;
      lowStockAlerts.forEach(item => {
        doc.text(`${item.category}: ${item.quantity} ${item.unit}`, 14, yOffset);
        yOffset += 10;
      });
    }

    yOffset += 10;
    doc.autoTable({
      startY: yOffset,
      head: [["Name", "Category", "Unit", "Quantity", "Description"]],
      body: inventory.map(item => [item.name, item.category, item.unit, item.quantity, item.description])
    });
    doc.save("inventory_report_clean_cycle.pdf");
  };

  const downloadRecycleReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString("en-LK", { timeZone: "Asia/Colombo", dateStyle: 'full', timeStyle: 'medium' });
    const userName = "Inventory Manager - D.Ranasinghe ";

    doc.setFontSize(16); doc.text("Clean Cycle", 14, 20);
    doc.setFontSize(18); doc.text("Recycle Report", 14, 40);
    doc.setFontSize(12); doc.text(`Generated by: ${userName}`, 14, 50); doc.text(`Date: ${currentDate}`, 14, 56);

    doc.autoTable({
      startY: 70,
      head: [["Category", "Quantity (kg)", "Transferred At"]],
      body: recycleData.map(item => [item.category, item.quantity, new Date(item.transferredAt).toLocaleString()])
    });
    doc.save("recycle_report.pdf");
  };

  const handleSelectiveRecycle = async () => {
    if (!selectedCategory || !recycleQuantity) { alert("Please select a category and enter a quantity."); return; }
    const matchingCategory = totals.find(item => item.category === selectedCategory);
    if (!matchingCategory || recycleQuantity > matchingCategory.quantity) { alert("Invalid quantity."); return; }

    try {
      await axios.post("/api/recycle", { recycledData: [{ category: selectedCategory, quantity: parseFloat(recycleQuantity) }] });
      alert("♻️ Successfully transferred to recycle.");
      setSelectedCategory(""); setRecycleQuantity("");
      loadInventoryData(); setIsDataUpdated(true);
    } catch (error) {
      console.error("Error transferring recycle:", error);
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar navigate={navigate} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold text-dark-900">Inventory Dashboard</h2>
            <p className="text-sm text-gray-500">{currentTime}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">DR</div>
            <span className="font-medium text-dark-700">Dilmith Ranasinghe</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 space-y-8">
          {/* Alerts */}
          {lowStockAlerts.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm flex items-start animate-pulse">
              <div className="flex-shrink-0">
                <FaClipboardList className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Low Stock Alert</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Following categories are running low: <strong>{lowStockAlerts.map(item => item.category).join(", ")}</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {totals.map((item, index) => {
              const status = getStatus(item.quantity);
              return (
                <div key={index} className={`bg-white rounded-2xl shadow-sm p-6 border transition-all duration-300 hover:shadow-md ${status.color.replace('bg-', 'border-').split(' ')[2]}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-dark-700 text-lg">{item.category}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${status.color.split(' ')[1]} ${status.color.split(' ')[0]}`}>
                      {item.unit}
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-dark-900 mb-2">{item.quantity}</p>
                  <p className={`text-xs font-medium ${status.color.split(' ')[0]}`}>{status.message}</p>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-dark-800 flex items-center"><FaChartPie className="mr-2 text-primary-500" /> Distribution</h3>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={totals}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="quantity" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-dark-800 flex items-center"><FaChartLine className="mr-2 text-red-500" /> Waste Prediction</h3>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={wastePredictionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="predictedWaste" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-xl font-bold text-dark-900">Inventory Items</h3>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FaClipboardList className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                    <th className="p-4 border-b border-gray-100">Name</th>
                    <th className="p-4 border-b border-gray-100">Category</th>
                    <th className="p-4 border-b border-gray-100">Unit</th>
                    <th className="p-4 border-b border-gray-100">Quantity</th>
                    <th className="p-4 border-b border-gray-100">Description</th>
                    <th className="p-4 border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-dark-900">{item.name}</td>
                        <td className="p-4 text-gray-600">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{item.category}</span>
                        </td>
                        <td className="p-4 text-gray-600">{item.unit}</td>
                        <td className="p-4 font-bold text-primary-600">{item.quantity}</td>
                        <td className="p-4 text-gray-500 text-sm max-w-xs truncate">{item.description}</td>
                        <td className="p-4 text-right space-x-2">
                          <Link to={`/inventory/${item._id}`} className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors">Edit</Link>
                          <button onClick={() => deleteHandler(item._id)} className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No items found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recycling Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transfer to Recycle */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center"><FaRecycle className="mr-2 text-green-500" /> Transfer to Recycle</h3>
              <div className="space-y-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-gray-50"
                >
                  <option value="">Select Category</option>
                  {totals.map((item, i) => <option key={i} value={item.category}>{item.category}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  value={recycleQuantity}
                  onChange={(e) => setRecycleQuantity(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-gray-50"
                />
                <button
                  onClick={handleSelectiveRecycle}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Transfer Items
                </button>
              </div>
            </div>

            {/* Estimation Calculator */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center">🧮 Recycle Estimator</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Waste Type"
                    value={userName}
                    onChange={(e) => /^[A-Za-z\s]*$/.test(e.target.value) && setUserName(e.target.value)}
                    className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-gray-50"
                  />
                  <input
                    type="number"
                    placeholder="Amount (kg)"
                    value={materialAmount}
                    onChange={(e) => (/^[1-9][0-9]{0,4}$/.test(e.target.value) || e.target.value === "") && setMaterialAmount(e.target.value)}
                    className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-gray-50"
                  />
                </div>
                <select
                  value={materialCategory}
                  onChange={(e) => setMaterialCategory(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 bg-gray-50"
                >
                  <option value="">Select Material Category</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Polythene">Polythene</option>
                  <option value="Organic">Organic</option>
                  <option value="Metal">Metal</option>
                </select>
                <button
                  onClick={handleRecycleEstimation}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Calculate Estimate
                </button>
              </div>
              {recycleResult && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100 animate-fadeIn">
                  <p><strong>Result for:</strong> {recycleResult.userName}</p>
                  <p><strong>Estimated Recovery:</strong> {recycleResult.recycledAmount} kg</p>
                  <p className="text-xs mt-1 italic">{recycleResult.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Recycled Items Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-dark-900">♻️ Recycled History</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                  <th className="p-4 border-b border-gray-100">Category</th>
                  <th className="p-4 border-b border-gray-100">Quantity (kg)</th>
                  <th className="p-4 border-b border-gray-100">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recycleData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 font-medium text-green-600">{item.quantity}</td>
                    <td className="p-4 text-gray-500">{new Date(item.transferredAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 pb-12">
            <button onClick={downloadReport} className="flex items-center px-6 py-3 bg-dark-800 hover:bg-dark-900 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5">
              <FaDownload className="mr-2" /> Download Inventory Report
            </button>
            <button onClick={downloadRecycleReport} className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5">
              <FaDownload className="mr-2" /> Download Recycle Report
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InventoryDetails;
