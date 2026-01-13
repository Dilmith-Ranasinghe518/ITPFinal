import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Item(props) {
  const { _id, name, category, unit, quantity, description } = props.inventorys;
  const navigate = useNavigate();
  
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5008/inventory/${_id}`);
      if (props.onDelete) {
        props.onDelete(_id);
      }
      setTimeout(() => navigate(0), 100);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="item-container">
      <table className="item-table">
        <tbody>
          <tr><th>ID</th><td>{_id}</td></tr>
          <tr><th>Name</th><td>{name}</td></tr>
          <tr><th>Category</th><td>{category}</td></tr>
          <tr><th>Unit</th><td>{unit}</td></tr>
          <tr><th>Quantity</th><td>{quantity}</td></tr>
          <tr><th>Description</th><td>{description}</td></tr>
        </tbody>
      </table>
     
      <div className="button-container">
        <Link to={`/inventory/${_id}`} className="update-btn">Update</Link>
        <button className="delete-btn" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default Item;
