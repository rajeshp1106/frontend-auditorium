// layouts/DashboardLayout.js
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-100">
    <AdminNavbar />
    <Outlet />
  </div>
);

export default AdminLayout;
