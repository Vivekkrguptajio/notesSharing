import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../api/auth.api";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    updateUser(); // Initial load

    // Listen for custom event to update state without reload
    window.addEventListener("auth-change", updateUser);
    return () => window.removeEventListener("auth-change", updateUser);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload(); // Ensure state update on logout
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "teacher") return "/teacher/dashboard";
    return "/student/dashboard";
  };

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
                onClick={() => setShowProfileMenu(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <NotificationBell />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User size={18} />
                  </div>
                  <span>{user.fullName || "User"}</span>
                  <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 origin-top-right transform transition-all">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User size={16} />
                      Edit Profile
                    </Link>

                    <Link
                      to={getDashboardLink()}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <NotificationBell />
            {!user && (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold shadow-sm hover:shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all"
              >
                Login
              </Link>
            )}
            <button
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-3">
            <div className="bg-gray-50 rounded-2xl p-3 space-y-1.5 shadow-inner">

              {/* User Info Mobile */}
              {user && (
                <div className="px-4 py-3 border-b border-gray-200 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}

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

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium hover:bg-white hover:text-indigo-600 rounded-xl transition"
                  >
                    <User size={20} />
                    <span className="text-sm">Edit Profile</span>
                  </Link>
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 font-medium hover:bg-white hover:text-indigo-600 rounded-xl transition"
                  >
                    <LayoutDashboard size={20} />
                    <span className="text-sm">Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition text-left"
                  >
                    <LogOut size={20} />
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Get Started</span>
                  <span>→</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
