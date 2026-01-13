import React, { useState, useEffect } from "react";
import axios from "axios";
import Bids from '../Bids/BidsForRecycler';
import "./BidDetailsForUser.css";


const URL = "/api/admin";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
  }
};

function BidDetails() {
  const [bids, setBids] = useState([]);
  const [filteredBids, setFilteredBids] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched Data:", data); // Debugging
      setBids(data.admin);
      setFilteredBids(data.admin);  // Initialize filteredBids with all data
    });
  }, []);

  const handleSearch = () => {
    const filteredResults = bids.filter((bid) =>
      Object.values(bid).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setFilteredBids(filteredResults);
    setNoResults(filteredResults.length === 0);
  };

  return (
    <div>

      <h1>Bid Details Page</h1>
      <div>

      </div>
      <input className="bla-bla"
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search bid details"
      />

      <button className="bid-det-4-user-serach" onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Results Found</p>
        </div>
      ) : (
        <div className="user-view-bid">
          {filteredBids && filteredBids.map((bid, i) => (
            <div key={i}>
              <Bids admins={bid} />
            </div>
          ))}
        </div>
      )}


    </div>
  );
}

export default BidDetails;
