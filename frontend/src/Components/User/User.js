import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User(props) {
  const { _id,Id,name,date, time } = props.user;

  // Call useNavigate to get the navigate function
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${_id}`);
      // After deleting, navigate to the desired pages
      navigate('/'); // Navigate to the homepage (or another route if needed)
      navigate('/userdetails'); // Navigate to the user details page
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User ID: {_id}</h2>
      <h2>ID: {Id}</h2>
      <h2>Name: {name}</h2>
      <h2>Date: {date}</h2>
      <h2>Time: { time}</h2>
      <Link to={`/userdetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default User;
