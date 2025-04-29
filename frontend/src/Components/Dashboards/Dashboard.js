import React from 'react';
import { useParams } from 'react-router-dom';

// Import dashboard components for each role

//import InventoryDash from "../Dashboards/InventoryDash";
import Home from "../Home/Home";
import UserDash from "../Dashboards/UserDash";
import RecyclerDash from "../Dashboards/RecyclerDash";
import WasteCollectorDash from "../Dashboards/WasteCollectorDash";
import RecycleManagerDash from "../Dashboards/RecycleManagerDash";
import HRDash from "../Dashboards/HRDash";
import EmpDash from '../EmployeeDashboard/EmpDash';
import FinanceDash from './FinanceDash';
import InventoryDetails from '../InventoryDetails/InventoryDetails';


const Dashboard = () => {
  const { role } = useParams();

  // Function to render the appropriate dashboard based on the user's role
  const renderDashboard = () => {
    switch (role) {      //'admin', 'user', 'recycler', 'collector','finance','hr','recyclemgr'
      case 'admin':
        return <InventoryDetails />;
      case 'user':
        return <UserDash />;
      case 'recycler':
        return <RecyclerDash />;
      case 'collector':
        return <EmpDash />;

      case 'finance':
        return <FinanceDash />;
        
      case 'hr':
        return <HRDash />;

      case 'recyclemgr':
        return <RecycleManagerDash />;


  


      default:
        return <h1>Dashboard</h1>;
    }
  };


  return (
    <div>
      {renderDashboard()}
      
    </div>
  );
};

export default Dashboard;
