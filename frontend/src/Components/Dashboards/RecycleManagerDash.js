import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Footer from '../Footer/Footer';
// import Nav4admin from './NavRecy'; // Consider replacing with a modern sidebar if possible, or keeping consistent
// import './RecycleManagerDash.css'; // Removing external CSS

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [groupedRecycleData, setGroupedRecycleData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecycleData();
  }, []);

  const fetchRecycleData = async () => {
    try {
      const response = await axios.get('http://localhost:5008/recycle');
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
    <div className="flex flex-col min-h-screen bg-gray-50 pt-24 font-sans">

      {/* Assuming Nav4admin is the top navbar, we can keep it or replace it. 
          For consistency with other dashboards, a sidebar is better, but this file uses Nav4admin component.
          I will wrap the main content in a container.*/}
      {/* <Nav4admin /> */}
      {/* If Nav4admin is a top nav, it should be here. If it's old style, maybe better to just use a clean header */}

      <header className="bg-white shadow-sm py-6 px-4 md:px-8 mb-8 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">
            Clean Cycle Manager
          </h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-primary-600 font-medium">Home</button>
            <button onClick={() => navigate('/logout')} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
          </div>
        </div>
      </header>


      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 w-full mb-12">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Users</h2>
            <p className="text-4xl font-extrabold text-primary-600">450</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Collections</h2>
            <p className="text-4xl font-extrabold text-secondary-600">
              {groupedRecycleData.reduce((sum, item) => sum + item.quantity, 0)} <span className="text-xl text-gray-400">kg</span>
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-lg font-semibold text-gray-500 mb-2">Total Earnings</h2>
            <p className="text-4xl font-extrabold text-yellow-500">$5,200</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Bar Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-xl font-bold text-dark-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-primary-500 rounded-full mr-3"></span>
              Recycled Waste Statistics
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={groupedRecycleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="category" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ fill: '#f3f4f6' }}
                  />
                  <Bar dataKey="quantity" fill="#22c55e" radius={[10, 10, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-xl font-bold text-dark-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-secondary-500 rounded-full mr-3"></span>
              Waste Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={groupedRecycleData}
                    dataKey="quantity"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {groupedRecycleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
