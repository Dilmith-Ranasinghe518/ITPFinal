import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserRequest from "../UserRequest/UserRequest"; // Updated import
import { useReactToPrint } from "react-to-print";
import "./UserRequests.css"; // Update the CSS file name as well

const URL = "http://localhost:5008/userRequest";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function UserRequests() {
  const [userRequests, setUserRequests] = useState([]); // Renamed state
  const [originalUserRequests, setOriginalUserRequests] = useState([]); // Renamed state
  const [activeTab, setActiveTab] = useState("request"); // Tracks sidebar selection
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setUserRequests(data.userRequests); // Updated state variable
      setOriginalUserRequests(data.userRequests); // Updated state variable
    });
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "User Requests Report",
    onAfterPrint: () => alert("User Requests Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setUserRequests(originalUserRequests);
      setNoResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredUserRequests = originalUserRequests.filter((userRequest) => {
      return (
        (userRequest.name && userRequest.name.toLowerCase().includes(query)) ||
        (userRequest.lastName && userRequest.lastName.toLowerCase().includes(query)) ||
        (userRequest.email && userRequest.email.toLowerCase().includes(query)) ||
        (userRequest.phone && userRequest.phone.toLowerCase().includes(query)) ||
        (userRequest.address && userRequest.address.toLowerCase().includes(query)) ||
        (userRequest.serviceType && userRequest.serviceType.toLowerCase().includes(query))
      );
    });

    setUserRequests(filteredUserRequests);
    setNoResults(filteredUserRequests.length === 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>User Requests Section</h2>
        
        <ul>
          <li
            className={activeTab === "request" ? "active" : ""}
            onClick={() => setActiveTab("request")}
          >
            Request
          </li>
          <li
            className={activeTab === "view-bin" ? "active" : ""}
            onClick={() => setActiveTab("view-bin")}
          >
            View Bin
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "request" && (
          <>
            <div className="users-header">
              <h1>User Request Details</h1> {/* Updated title */}
              <div className="search-container">
                <input
                  className="search-input"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="text"
                  placeholder="Search user requests..."
                  value={searchQuery}
                />
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>

            {noResults ? (
              <div className="no-results">
                <p>No user requests found matching your search criteria</p>
              </div>
            ) : (
              <div className="user-requests-list" ref={ComponentsRef}>
                <div className="user-requests-table-header">
                  <div className="user-row header">
                    <div className="user-cell">Name</div>
                    <div className="user-cell">Last Name</div>
                    <div className="user-cell">Email</div>
                    <div className="user-cell">Phone</div>
                    <div className="user-cell">Address</div>
                    <div className="user-cell">Service Type</div>
                    <div className="user-cell actions">Actions</div>
                  </div>
                </div>

                {userRequests && userRequests.length > 0 ? (
                  userRequests.map((userRequest, i) => (
                    <div key={i} className="user-request-item">
                      <UserRequest userRequest={userRequest} /> {/* Updated component */}
                    </div>
                  ))
                ) : (
                  <div className="loading">Loading user requests...</div>
                )}
              </div>
            )}

            <div className="action-buttons">
              <button className="print-button" onClick={handlePrint}>
                Download Report
              </button>
            </div>
          </>
        )}

        {activeTab === "view-bin" && (
          <div className="view-bin">
            <h2>View Bin</h2>
            <p>Deleted user requests will appear here (to be implemented).</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserRequests;
