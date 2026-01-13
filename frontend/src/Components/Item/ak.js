import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Add from '../Add/Add';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  LineChart, Line, Legend, ReferenceLine, Label
} from 'recharts';

const URL = "/api/invetroies";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// Function to calculate average inventory for each category
const calculateAverages = (trendData, categories) => {
  const averages = {};
  categories.forEach((category) => {
    const total = trendData.reduce((sum, entry) => sum + (entry[category] || 0), 0);
    averages[category] = total / trendData.length;
  });
  return averages;
};

function Display() {
  const [users, setUsers] = useState([]);
  const [totals, setTotals] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [averages, setAverages] = useState({});

  useEffect(() => {
    fetchHandler().then((data) => {
      setUsers(data.invetroies);

      // Calculate total quantity per category
      const categoryTotals = data.invetroies.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
        return acc;
      }, {});

      // Convert totals object into an array for Recharts
      const chartData = Object.keys(categoryTotals).map((category) => ({
        category,
        quantity: categoryTotals[category]
      }));

      setTotals(chartData);

      // Update low stock alerts
      const lowStock = chartData.filter(item => item.quantity <= 500);
      setLowStockAlerts(lowStock);

      // Prepare data for LineChart (tracking quantity over time)
      const trendMap = {};
      data.invetroies.forEach((item) => {
        const date = item.expiredate || "Unknown"; // Using expiredate as a sample time field
        if (!trendMap[date]) {
          trendMap[date] = { date };
        }
        trendMap[date][item.category] = (trendMap[date][item.category] || 0) + item.quantity;
      });

      // Convert trendMap to an array and ensure all categories are present for each date
      const categories = Object.keys(categoryTotals);
      const trendDataArray = Object.values(trendMap).map((entry) => {
        const newEntry = { ...entry };
        categories.forEach((category) => {
          if (!newEntry[category]) {
            newEntry[category] = 0; // Fill missing data with 0 to ensure continuous lines
          }
        });
        return newEntry;
      });

      setTrendData(trendDataArray);

      // Calculate average inventory for each category
      const categoryAverages = calculateAverages(trendDataArray, categories);
      setAverages(categoryAverages);
    });
  }, []);

  // Function to determine the status message and alert color
  const getStatus = (quantity) => {
    if (quantity <= 500) return { message: "Low Stock! Urgent Restock Needed", color: "bg-red-500" };
    if (quantity > 1000 && quantity <= 2000) return { message: "Stock Level Moderate", color: "bg-yellow-500" };
    if (quantity > 2000) return { message: "Stock is Well Maintained", color: "bg-blue-500" };
    return { message: "Stock Level Normal", color: "bg-green-500" };
  };

  // Custom Tooltip for Line Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} units
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white"> 
      <Nav />

      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-center mt-6 text-green-700">
        📦 Inventories Management System 
      </h1>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <div className="max-w-3xl mx-auto p-4 bg-red-600 text-white text-center font-bold rounded-lg shadow-lg mt-4">
          ⚠ Warning! Low stock in: {lowStockAlerts.map(item => item.category).join(", ")}
        </div>
      )}

      {/* Inventory Bar Chart */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">📊 Inventory Overview</h2>
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

      {/* Advanced Inventory Trend Analysis */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">📈 Advanced Inventory Trend Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {totals.map((item, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={item.category}
                stroke={#${Math.floor(Math.random()*16777215).toString(16)}} 
                strokeWidth={2} // Make lines thicker for better visibility
                dot={false} // Remove dots for a cleaner look
              />
            ))}
            {/* Add a reference line for low stock threshold */}
            <ReferenceLine y={500} stroke="red" strokeDasharray="3 3" label="Low Stock Threshold" />
            {/* Add average lines for each category */}
            {totals.map((item, index) => (
              <ReferenceLine
                key={index}
                y={averages[item.category]}
                stroke={#${Math.floor(Math.random()*16777215).toString(16)}}
                strokeDasharray="3 3"
                label={{ value: Avg ${item.category}, position: 'insideBottomRight', fill: 'gray' }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Inventory Status Cards */}
      <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {totals.map((item, index) => {
          const status = getStatus(item.quantity);
          return (
            <div
              key={index}
              className={p-4 text-white text-center font-bold rounded-lg shadow-md ${status.color} hover:scale-105 transition-transform duration-300}
            >
              <p>{item.category}: {status.message} ({item.quantity} units)</p>
            </div>
          );
        })}
      </div>

      {/* Display Individual Items */}
      <div className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {users && users.map((user, i) => (
          <div key={i} className="bg-white p-4 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <Add user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;