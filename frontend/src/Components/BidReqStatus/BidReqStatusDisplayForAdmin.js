import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BidReqStatus.css';

import { FaBell } from 'react-icons/fa';
import Nav4admin from "../Dashboards/NavRecy";
import Footer from "../Footer/Footer";

function BidReqStatusDisplayForAdmin() {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});
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

  const updateStatus = async (id, status, rejectionReason = '') => {
    setIsLoading(true);
    setError(null);
    try {
      let url;
      if (status === 'Accepted') {
        url = `/api/bids/${id}/accept`;
      } else if (status === 'Rejected') {
        url = `/api/bids/${id}/reject`;
      } else {
        url = `/api/bids/${id}/status`;
      }

      const response = await axios.patch(url, { status, rejectionReason });

      const updatedBid = response.data.bid;
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid._id === updatedBid._id
            ? { ...bid, status: updatedBid.status, rejectionReason: updatedBid.rejectionReason }
            : bid
        )
      );
    } catch (error) {
      setError('Failed to update status. Please try again later.');
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading-text">Loading bids...</div>;
  }

  return (
    <div>
      <Nav4admin />
      <div className="bid-container2">
        <h1 className="bid-header2">Bid Requests</h1>
        {error && <div className="error-message">{error}</div>}
        <table className="bid-table">
          <thead>
            <tr>
              <th>Request ID</th> {/* 👈 NEW header for custom ID */}
              <th>Company Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                {/* NEW: Custom ID Display */}
                <td>{`REQ${(index + 1).toString().padStart(2, '0')}`}</td>

                <td>{bid.companyName}</td>
                <td>{bid.email}</td>
                <td>
                  <select
                    className="status-dropdown"
                    value={selectedStatuses[bid._id] || bid.status}
                    onChange={(e) =>
                      setSelectedStatuses({ ...selectedStatuses, [bid._id]: e.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {/* Bell icon if Pending */}
                  {(selectedStatuses[bid._id] || bid.status) === 'Pending' && (
                    <FaBell style={{ color: 'orange', marginLeft: '8px' }} />
                  )}
                </td>
                <td>
                  {selectedStatuses[bid._id] === 'Rejected' ? (
                    <input
                      type="text"
                      className="reason-input"
                      value={rejectionReasons[bid._id] || ''}
                      onChange={(e) =>
                        setRejectionReasons({ ...rejectionReasons, [bid._id]: e.target.value })
                      }
                      placeholder="Enter reason"
                    />
                  ) : (
                    <span className="no-reason-text">No reason</span>
                  )}
                </td>
                <td>
                  <button
                    className="update-button-1"
                    onClick={() =>
                      updateStatus(
                        bid._id,
                        selectedStatuses[bid._id] || bid.status,
                        rejectionReasons[bid._id] || ''
                      )
                    }
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default BidReqStatusDisplayForAdmin;
