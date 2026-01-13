import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './Components/Dashboards/UserContext'; // Ensure UserContext is properly imported

// Import Components for Inventory Section
import Home from "./Components/Home/Home";
import CCHome from "./Components/Home/CCHome";
import InventoryDetails from "./Components/InventoryDetails/InventoryDetails";
import AddItem from "./Components/AddItem/AddItem";
import UpdateInventory from "./Components/UpdateInventory/UpdateInventory";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import RecycleManagerDash from "./Components/Dashboards/RecycleManagerDash";

import Locationpge from "./Components/Home/Locationpge";

// Import Components for Waste Collection Section
import MapUser from "./Components/MapComponent/MapUser";
import RouteDash from "./Components/Dashboards/RouteDash";
import WasteCollectorDash from "./Components/Dashboards/WasteCollectorDash";

// Import Components for User Dashboard
import Dashboard from './Components/Dashboards/Dashboard';
import MapComponent from "./Components/MapComponent/MapComponent";

//Import Components for Recycle Section
import AddBid from "./Components/AddBid/AddBid";
import BidDetailsForUser from "./Components/BidDetails/BidDetailsForUser"
import UpdateBidDetails from "./Components/UpdateBidDetails/UpdateBidDetails";
import ViewBidReq from "./Components/BidReqStatus/BidReqStatusDisplayForAdmin"
import BidsForAdmin from "./Components/BidDetails/BidDetails";
import ReqBid from "./Components/ReqBidForm/ReqBidForm";
import RecyclerDash from "./Components/Dashboards/RecyclerDash";
import Summary from "./Components/BidReqStatus/BidSummary";
import SendSummary from "./Components/BidReqStatus/SendReport"


import BidStatusforUser from "./Components/BidReqStatus/StatusForUser";
import AddAttendance from "./Components/AddAttendance/AddAttendance";
import EAttendence from "./Components/User details/Userdeatils";
import UpdateUsers from "./Components/UpdateUser/UpdateUser";
import EmpDash from "./Components/EmployeeDashboard/EmpDash";
import Sallary from "./Components/Sallary/sallary";
import Leave from "./Components/Leave/leaveapply";
import OT from "./Components/OT/overtimeapply";




//import Navv from "./Components/Navv/Navv";
import AddNewUser from "./Components/AddNewUser/AddNewUser";
import AAttendance from "./Components/AAttendance/AdminAttendU";
import OvertimeDisplay from "./Components/OvertimeDisplay/OvertimeDisplay";
//import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import LeaveDisplay from "./Components/LeaveDisplay/LeaveDisplay";
import EditUser from "./Components/EditUser/EditUser";
import AdminAddAttendance from "./Components/AdminaddAttendence/AddAttendanceForm";
import EditAttendanceForm from "./Components/EditAttendenceform/EditAttendanceForm";
import HRDash from "./Components/Dashboards/HRDash";


import TransactionForm from "./Components/Finance/TransactionForm";
import TransactionList from "./Components/Finance/TransactionList";
import UpdateTransactionForm from "./Components/Finance/UpdateTransactionForm"; // Import the update form
import IncomeSummary from "./Components/FinancePages/IncomeSummary";
import ExpenseSummary from "./Components/FinancePages/ExpenseSummary";

//import Dash from './Components/dashboard/Dash'

import AddUserRequest from "./Components/AddUserRequest/AddUserRequest"; // Updated import
import UserRequests from "./Components/UserRequests/UserRequests"; // Updated import
import UpdateUserRequest from "./Components/UpdateUserRequest/UpdateUserRequest"; // Updated import
import UserReqDash from "./Components/Dashboards/UserReqDash";
import AboutUs from "./Components/Home/AboutUs";
import ContactUs from "./Components/Home/ContactUs";
import Calendar from "./Components/Calendar/Calendar";
import UserDash from "./Components/Dashboards/UserDash";

function App() {
  return (

    // UserProvider is outside of Router so it doesn't wrap another Router
    <UserProvider>

      <Routes>
        {/* Routes for Inventory Section */}
        <Route path="/" element={<CCHome />} />
        <Route path="/mainhome" element={<CCHome />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/inventory" element={<InventoryDetails />} />
        <Route path="/inventory/:id" element={<UpdateInventory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recycledash" element={<RecyclerDash />} />

        {/* Routes for Waste Collection Section */}
        <Route path="/bins" element={<WasteCollectorDash />} />
        <Route path="/usermap" element={<MapUser />} />
        <Route path="/route" element={<RouteDash />} />

        {/* Routes for Recycle Section */}




        <Route path="/add-bids" element={<AddBid />} />
        <Route path="/biddetails" element={<BidsForAdmin />} />
        <Route path="/biddetails/:id" element={<UpdateBidDetails />} />
        <Route path="/view-bid-details" element={<BidsForAdmin />} />
        <Route path="/view-bid-appointments" element={<ViewBidReq />} />
        <Route path="/to-r-dash" element={<RecycleManagerDash />} />
        <Route path="/4-dash-user" element={<RecyclerDash />} />
        <Route path="/view-bid-user" element={<BidDetailsForUser />} />
        <Route path="/reqBid" element={<ReqBid />} />
        <Route path="/ViewReq" element={<ViewBidReq />} />
        <Route path="/view-bids-req-status" element={<ViewBidReq />} />
        <Route path="/view-bids-req-status-1" element={<BidStatusforUser />} />
        <Route path="/view-reports" element={<Summary />} />
        <Route path="/email" element={<SendSummary />} />


        {/* Routes for HR Section */}
        <Route path="/adduser" element={<AddAttendance />} />
        <Route path="/overtimedisplay" element={<OvertimeDisplay />} />
        <Route path="/userdetails" element={<EAttendence />} />
        <Route path="/leave" element={<LeaveDisplay />} />
        <Route path="/leaveapply" element={<Leave />} />
        <Route path="/AdminAttend" element={<AAttendance />} />
        <Route path="/overtimeapply" element={<OT />} />
        <Route path="/salary" element={<Sallary />} />
        <Route path="/EditUser" element={<EditUser />} />
        <Route path="/Adminadd" element={<AdminAddAttendance />} />
        <Route path="/Edit" element={<EditAttendanceForm />} />
        <Route path="/userdetails/:id" element={< UpdateUsers />} />
        <Route path="/AddNewUser" element={<AddNewUser />} />
        <Route path="/AdminD" element={<HRDash />} />
        <Route path="/AdminDashboard" element={<HRDash />} />
        <Route path="/logout" element={<CCHome />} />
        <Route path="/empdash" element={<EmpDash />} />



        {/* Routes for Finance Section */}

        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route path="/update/:id" element={<UpdateTransactionForm />} /> {/* Update route */}
        <Route path="/income-summary" element={<IncomeSummary />} />
        <Route path="/expense-summary" element={<ExpenseSummary />} />

        {/* Routes for User Request Section */}


        <Route path="/adduserrequest" element={<AddUserRequest />} /> {/* Updated route */}
        <Route path="/userrequests" element={<UserRequests />} /> {/* Updated route */}
        <Route path="/userRequestDetails" element={<UserRequests />} /> {/* Updated route */}
        <Route path="/userrequests/:id" element={<UpdateUserRequest />} /> {/* Updated route */}
        <Route path="/updateuserrequest/:id" element={<UpdateUserRequest />} /> {/* Updated route */}
        <Route path="/userreqdash" element={<UserReqDash />} /> {/* Updated route */}
        <Route path="/userdash" element={<UserDash />} /> {/* Updated route */}


        {/* Routes for User Dashboard */}
        <Route path="/dashboard/:role" element={<Dashboard />} />

        {/* Routes for Home Page */}
        <Route path="/aboutus" element={<AboutUs />} /> {/* Updated route */}
        <Route path="/location" element={<Locationpge />} /> {/* Updated route */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/calendar" element={<Calendar />} />




      </Routes>

    </UserProvider>


  )
}

export default App;
