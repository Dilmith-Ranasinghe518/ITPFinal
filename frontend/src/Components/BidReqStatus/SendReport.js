import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import './StatusForUser.css';
import Nav4admin from "../Dashboards/NavRecy";
import Footer from '../Footer/Footer';

function StatusForUser() {
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('/api/bids');
        // Only keep accepted bids
        const acceptedBids = response.data.bids.filter(bid => bid.status === 'Accepted');
        setBids(acceptedBids);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bids:', error);
        setError('Failed to load bids. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBids();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const logoBase64 = 'logo.jpeg'; // Replace this with actual Base64 string if needed.

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();

    // Add logo on left
    doc.addImage(logoBase64, 'JPEG', 10, 10, 30, 20);

    // Company name on top
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34);
    doc.text('CLEAN CYCLE', 50, 22);

    // Date time top-right
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(formattedDateTime, 160, 10);

    const tableColumn = ["Reference No", "Company Name", "User Recommended Price", "Amount", "Total"];
    const tableRows = [];

    bids.forEach((bid, index) => {
        if (bid.status === 'Accepted') {  // only Accepted
          const customId = `B${String(index + 1).padStart(2, '0')}`;
          const total = (bid.userRecommendedPrice * bid.amount).toFixed(2);
      
          const bidData = [
            customId,
            bid.companyName,
            bid.userRecommendedPrice,
            bid.amount,
            total,
          ];
          tableRows.push(bidData);
        }
      });
      

    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      styles: {
        textColor: [0, 100, 0],
        lineColor: [0, 128, 0],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [0, 128, 0],
        textColor: [255, 255, 255],
        halign: 'center',
      },
      bodyStyles: {
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [230, 255, 230],
      },
    });

    doc.save('accepted_bids_report.pdf');
  };

  if (isLoading) {
    return <div className="loading-text">Loading bids...</div>;
  }

  return (
    <div>
        <Nav4admin/>
    <div className="bid-container1">
      <h1 className="bid-header1">Accepted Bid Requests</h1>
      {error && <div className="error-message1">{error}</div>}

      <button onClick={downloadPDF} className="download-button">
        Download Report
      </button>

      <table className="bid-table1">
        <thead>
          <tr>
            <th>Reference No</th>
            <th>Company Name</th>
            <th>User Recommended Price</th>
            <th>Amount</th>
            <th>Total</th> {/* NEW COLUMN */}
          </tr>
        </thead>
        <tbody>
  {bids
    .filter(bid => bid.status === 'Accepted') // Only show Accepted bids
    .map((bid, index) => (
      <tr key={bid._id}>
        <td>{`B${String(index + 1).padStart(2, '0')}`}</td> {/* Custom ID */}
        <td>{bid.companyName}</td>
        <td>{bid.userRecommendedPrice}</td>
        <td>{bid.amount}</td>
        <td>{(bid.userRecommendedPrice * bid.amount).toFixed(2)}</td> {/* Total */}
      </tr>
  ))}
</tbody>

      </table>
    </div>
    <Footer/>
    </div>
  );
}

export default StatusForUser;
