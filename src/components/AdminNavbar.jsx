import { useState } from "react"; // 👈 1. Import useState
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; // 👈 2. Import icons

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 👈 3. Add state for the menu
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // Add relative positioning for the dropdown menu
    <nav className="bg-white border-b border-slate-200 shadow-sm relative">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/admin" className="text-xl font-bold text-yellow-600">
          RP - Admin
        </Link>

        {/* Desktop Nav Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/admin" end className={({ isActive }) => `...`}>Dashboard</NavLink>
          <NavLink to="/admin/bookings" className={({ isActive }) => `...`}>Bookings</NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `...`}>Users</NavLink>
          <NavLink to="/admin/auditoriums" className={({ isActive }) => `...`}>Auditoriums</NavLink>
        </div>

        {/* Desktop Logout Button (hidden on mobile) */}
<button
  onClick={() => setShowLogoutModal(true)}  // 👈 open modal instead of logging out
  className="px-4 py-2 rounded-lg bg-yellow-500 text-slate-900 font-medium shadow hover:bg-yellow-600 transition"
>
  Logout
</button>


        {/* 👇 4. Updated Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" /> // Show close icon when open
            ) : (
              <Bars3Icon className="h-6 w-6" /> // Show hamburger icon when closed
            )}
          </button>
        </div>
      </div>

      {/* 👇 5. Conditionally Rendered Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
          <div className="px-5 py-4 flex flex-col gap-4">
            <NavLink to="/admin" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `...`}>Dashboard</NavLink>
            <NavLink to="/admin/bookings" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `...`}>Bookings</NavLink>
            <NavLink to="/admin/users" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `...`}>Users</NavLink>
            <NavLink to="/admin/auditoriums" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `...`}>Auditoriums</NavLink>
            <hr className="border-slate-200"/>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg bg-yellow-50 text-yellow-700 font-medium hover:bg-yellow-100 transition">
              Logout
            </button>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}