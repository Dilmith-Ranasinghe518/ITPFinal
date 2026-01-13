import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserRequest.css"; // Update the CSS file name as well

const UserRequest = (props) => {
  const navigate = useNavigate();
  const { _id, name, lastName, email, phone, address, serviceType } = props.userRequest; // Updated variable

  const deleteHandler = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user request?");
    if (confirmed) {
      await axios
        .delete(`http://localhost:5008/userRequest/${_id}`)
        .then((res) => res.data)
        .then(() => navigate("/"))
        .then(() => navigate("/userRequestDetails"));
    }
  };

  return (
    <div className="user-row">
      <div className="user-cell">{name}</div>
      <div className="user-cell">{lastName}</div>
      <div className="user-cell">{email}</div>
      <div className="user-cell">{phone}</div>
      <div className="user-cell address">{address}</div>
      <div className="user-cell">{serviceType}</div>
      <div className="user-cell actions">
        <Link to={`/updateuserrequest/${_id}`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button className="delete-button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserRequest;
