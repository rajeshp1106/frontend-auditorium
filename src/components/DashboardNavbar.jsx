import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center font-bold text-yellow-600 text-xl">
            AB
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-500"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-500"
                }`
              }
            >
              My Bookings
            </NavLink>
            {/* <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-500"
                }`
              }
            >
              Profile
            </NavLink> */}
          </div>

          {/* Logout Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-yellow-500"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block text-sm font-medium ${
                isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `block text-sm font-medium ${
                isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            My Bookings
          </NavLink>
          {/* <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block text-sm font-medium ${
                isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink> */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-600 transition"
          >
            Logout
          </button>
        </div>
      )}
            {/* Logout Confirmation Modal */}
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
