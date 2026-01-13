import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatusForUser.css';
import Nav from "../Dashboards/Nav4admin";
import Footer from "../Footer/Footer";

function StatusForUser() {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('/api/bids');
        setBids(response.data.bids);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bids:', error);
        setError('Failed to load bids. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (isLoading) {
    return <div className="loading-text">Loading bids...</div>;
  }

  return (
    <div>
      <Nav />
      <div className="bid-container1">
        <h1 className="bid-header1">Bid Requests Status</h1>
        {error && <div className="error-message1">{error}</div>}
        <table className="bid-table1">
          <thead>
            <tr>
              <th>Reference No</th>
              <th>Company Name</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <td>{`S${(index + 1).toString().padStart(2, '0')}`}</td> {/* Custom ID formatting */}
                <td>{bid.companyName}</td>
                <td>
                  {bid.status === 'Rejected' ? (
                    bid.rejectionReason ? (
                      <span>{bid.rejectionReason}</span>
                    ) : (
                      <span>No reason provided</span>
                    )
                  ) : (
                    <span>N/A</span>
                  )}
                </td>
                <td>{bid.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default StatusForUser;
