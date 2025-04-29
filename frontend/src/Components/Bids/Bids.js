import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Bids.css";
import Swal from 'sweetalert2/dist/sweetalert2.js';

function Bids(props) {
  const { _id, wtype, amount, price } = props.admins; // _id will be the custom ID
  const navigate = useNavigate();

  const deleteHandler = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/admin/${_id}`);
          if (props.onDelete) {
            props.onDelete(_id);
          }
          setTimeout(() => navigate(0), 100);
          Swal.fire("Deleted!", "The bid has been deleted.", "success");
        } catch (error) {
          console.error('Error deleting Bid:', error);
          Swal.fire("Error!", "Failed to delete the bid. Please try again.", "error");
        }
      }
    });
  };

  // Function to get correct image based on waste type
  const getWasteImage = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "plastic") {
      return "./plastic1.jpg";
    } else if (lowerType === "polythene") {
      return "./polythene1.jpg";
    } else if (lowerType === "metal") {
      return "./metal1.jpg";
    } else if (lowerType === "organic") {
      return "./organic1.jpg";
    } else {
      return null; // No image for other types
    }
  };

  const wasteImage = getWasteImage(wtype);

  return (
    <div className="bid-item" id={`bid-item-${_id}`}>

      {/* Show image only if available */}
      {wasteImage && (
        <img 
          src={wasteImage} 
          alt={wtype} 
          className="waste-image" 
          id={`waste-image-${_id}`} // Adding custom ID for the image
        />
      )}

      <table className="bid-table">
        <tbody>
          <tr className="bid-table-row" id={`row-id-${_id}`}>
            <th className="bid-table-header">ID</th>
            <td className="bid-table-data">{_id}</td> {/* Displaying custom ID */}
          </tr>
          <tr className="bid-table-row" id={`row-wtype-${_id}`}>
            <th className="bid-table-header">Waste Type</th>
            <td className="bid-table-data">{wtype}</td>
          </tr>
          <tr className="bid-table-row" id={`row-amount-${_id}`}>
            <th className="bid-table-header">Amount</th>
            <td className="bid-table-data">{amount}</td>
          </tr>
          <tr className="bid-table-row" id={`row-price-${_id}`}>
            <th className="bid-table-header">Price</th>
            <td className="bid-table-data">{price}</td>
          </tr>
        </tbody>
      </table>

      <div className="bid-button-group">
        <Link to={`/biddetails/${_id}`} className="bid-update-btn" id={`update-btn-${_id}`}>Update</Link>
        <button className="bid-delete-btn" onClick={deleteHandler} id={`delete-btn-${_id}`}>Delete</button>
      </div>
    </div>
  );
}

export default Bids;
