// layouts/DashboardLayout.js
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="min-h-screen bg-gray-100">
    <DashboardNavbar />
    <Outlet />
  </div>
);

export default DashboardLayout;
