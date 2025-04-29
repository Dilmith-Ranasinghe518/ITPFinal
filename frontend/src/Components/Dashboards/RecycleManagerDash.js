import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Nav4admin from './NavRecy';
import Footer from '../Footer/Footer';
import './RecycleManagerDash.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [groupedRecycleData, setGroupedRecycleData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecycleData();
  }, []);

  const fetchRecycleData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recycle');
      console.log('Fetched Recycle Data:', response.data);

      const rawData = response.data;

      // ➡️ Group by category and sum quantity
      const categoryTotals = rawData.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = 0;
        }
        acc[item.category] += item.quantity;
        return acc;
      }, {});

      const formattedData = Object.keys(categoryTotals).map(category => ({
        category,
        quantity: categoryTotals[category]
      }));

      setGroupedRecycleData(formattedData);

    } catch (error) {
      console.error('Error fetching recycle data:', error);
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: "url('/j2.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Nav4admin />

      <h1 className="text-3xl font-bold text-green-700 mb-6">CLEAN CYCLE</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">450</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold">Total Collections</h2>
          <p className="text-2xl font-bold">
            {groupedRecycleData.reduce((sum, item) => sum + item.quantity, 0)} kg
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-2xl font-bold">$5,200</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recycled Waste Statistics (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupedRecycleData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Recycled Waste Distribution (Pie Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={groupedRecycleData}
              dataKey="quantity"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {groupedRecycleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
}
