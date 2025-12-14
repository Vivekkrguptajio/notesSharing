import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Notes", icon: "📚", to: "/notes" },
    { name: "Browse Books", icon: "📖", to: "/books" },
    { name: "Browse PYQs", icon: "📝", to: "/pyqs" },
    { name: "About", icon: "ℹ️", to: "/about" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Row */}
        <div className="flex h-14 sm:h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-indigo-600 text-white text-lg sm:text-xl">
              📘
            </div>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              CampusNotes
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-indigo-600 px-4 lg:px-5 py-2 lg:py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-3">
            <div className="bg-gray-50 rounded-2xl p-3 space-y-1.5 shadow-inner">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium hover:bg-white hover:text-indigo-600 rounded-xl transition"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm">{link.name}</span>
                </Link>
              ))}

              <div className="border-t border-gray-300 my-2"></div>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-center text-sm text-gray-700 font-medium hover:bg-white rounded-xl"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 shadow"
              >
                <span>Get Started</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
