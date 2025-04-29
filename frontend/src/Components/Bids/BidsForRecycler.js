import React from 'react';
import { Link } from 'react-router-dom';
import './BidsForRecycler.css';

function Bids(props) {
  const { _id, wtype, amount, price } = props.admins;  // Destructuring props

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

  // Get the waste image based on the type
  const wasteImage = getWasteImage(wtype);

  return (
    <div className="item-container">
      
      {/* Show image only if available */}
      {wasteImage && (
        <img 
          src={wasteImage} 
          alt={wtype} 
          className="waste-image" 
        />
      )}

      <table className="item-table">
        <tbody>
          <tr>
            <th>Waste Type</th>
            <td>{wtype}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{amount}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{price}</td>
          </tr>
        </tbody>
      </table>

      <div className="button-container">
        <button className="book-bids-11">
          <Link to="/reqBid">Book bids</Link>
        </button>
      </div>
    </div>
  );
}

export default Bids;
