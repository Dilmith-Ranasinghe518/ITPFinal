import React, { useState, useEffect } from "react";
import axios from "axios";
import Bids from '../Bids/Bids';
import './BidDetails.css';
const URL = "http://localhost:5000/admin";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
  }
};

//function component
function BidDetails4admin() {
  const [bids, setBids] = useState([]);
  const [filteredBids, setFilteredBids] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  //fetching data
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched Data:", data); // Debugging
      setBids(data.admin);
      setFilteredBids(data.admin);  // Initialize filteredBids with all data
    });
  }, []);

  //search functionlity

  const handleSearch = () => {
    const filteredResults = bids.filter((bid) =>
      Object.values(bid).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setFilteredBids(filteredResults);
    setNoResults(filteredResults.length === 0);
  };


  //whatsapp report sending
  const handleSendReport = () => {
    const selectedBids = filteredBids.map(bid =>
      `Bid ID: ${bid.id}, Amount: ${bid.amount}, Price: ${bid.price}`
    );

    const message = `Bid Report:\n\n${selectedBids.join('\n')}`;

    const phoneNumber = "94765294806"; // WhatsApp Number
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div className="bid-details-container">
      <h1>Bid Details Page</h1>

      <input 
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search bid details"
        className="search-input"
      />

      <button onClick={handleSearch} className="bid-det-4-user-serach">Search</button>

      {noResults ? (
        <div className="no-results">
          <p>No Results Found</p>
        </div>
      ) : (
        <div className="bid-list">
          {filteredBids && filteredBids.map((bid, i) => (
            <div key={i} className="bid-item">
              <Bids admins={bid} />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSendReport} className="send-report-btn">Send WhatsApp Message</button>
    </div>
  );
}

export default BidDetails4admin;
