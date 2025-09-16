// layouts/MainLayout.js
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <Outlet />
  </div>
);

export default MainLayout;
