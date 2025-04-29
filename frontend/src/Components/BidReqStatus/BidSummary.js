import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'; // <-- this is the correct way!
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
        const response = await axios.get('http://localhost:5000/bids');
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

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Base64 logo (should be Base64 string, but assuming it's a path here for now)
    const logoBase64 = 'logo.jpeg'; // You might need to actually use Base64 data
  
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString(); // eg: "4/26/2025, 5:40:00 PM"
  
    // Add Logo to Left Corner
    doc.addImage(logoBase64, 'JPEG', 10, 10, 30, 20); // moved to (10,10) and smaller size
  
    // Add Company Name Next to Logo (same line)
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34); // Dark Green color
    doc.text('CLEAN CYCLE', 50, 22); // y=22 to match logo height a bit
  
    // Add Date and Time to top right
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(formattedDateTime, 160, 10); // position it top-right
  
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
  
    const tableColumn = ["Reference No", "Company Name", "Reason", "Status", "User Recommended Price", "Amount"];
    const tableRows = [];
  
    bids.forEach((bid, index) => {
      const customId = `B${String(index + 1).padStart(2, '0')}`;
      const bidData = [
        customId,
        bid.companyName,
        bid.status === 'Rejected' ? (bid.rejectionReason || 'No reason provided') : 'N/A',
        bid.status,
        bid.userRecommendedPrice,
        bid.amount
      ];
      tableRows.push(bidData);
    });
  
    autoTable(doc, {
      startY: 40, // Adjusted lower since top part is now occupied
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
  
    doc.save('bid_status_report.pdf');
  };
  
  
  

  if (isLoading) {
    return <div className="loading-text">Loading bids...</div>;
  }

  return (
      <div>
            <Nav4admin/>
    <div className="bid-container1">
      <h1 className="bid-header1">Bid Requests Status</h1>
      {error && <div className="error-message1">{error}</div>}
      <button className="download-button" onClick={downloadPDF}>
        Download PDF
      </button>
      <table className="bid-table1">
      <thead>
  <tr>
    <th>Reference No</th>
    <th>Company Name</th>
    
    <th>User Recommended Price</th> {/* NEW */}
    <th>Amount</th> {/* NEW */}
    <th>Reason</th>
    <th>Status</th>
  </tr>
</thead>

<tbody>
  {bids.map((bid, index) => (
    <tr key={bid._id}>
      <td>{`B${String(index + 1).padStart(2, '0')}`}</td> {/* Custom ID */}
      <td>{bid.companyName}</td>
      
      <td>{bid.userRecommendedPrice}</td> {/* NEW */}
      <td>{bid.amount}</td> {/* NEW */}
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
    <Footer/>
    </div>
  );
}

export default StatusForUser;
