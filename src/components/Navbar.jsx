import { useState } from "react";
import { Link } from "react-router-dom";
// 1. Updated Heroicons v2 import and icon names
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// 2. Links defined in one place
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Admin', path: '/admin' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-yellow-600">RP</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-yellow-600 transition">
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="px-3 py-1 rounded-lg border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition">
            Login
          </Link>
          <Link to="/signup" className="px-3 py-1 rounded-lg bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-600 transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger with Accessibility Attributes */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-yellow-600 transition" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="px-3 py-1 rounded-lg border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50 transition" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="px-3 py-1 rounded-lg bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-600 transition" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}