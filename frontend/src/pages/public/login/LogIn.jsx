import React, { useState } from "react";
import { Eye, EyeOff, Hash, Lock, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/auth.api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    registrationNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);

      if (response.success) {
        // Redirect to dashboard based on user role
        const userRole = response.user?.role || "student";

        if (userRole === "student") {
          navigate("/student/dashboard");
        } else if (userRole === "teacher") {
          navigate("/teacher/dashboard");
        } else if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Gradient Background (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Welcome Back!
          </h1>
          <p className="text-lg text-indigo-100">
            Access thousands of study materials shared by students like you.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Mobile Header with Gradient */}
        <div className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-8">
          <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-indigo-100 text-sm">Sign in to access your account</p>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            {/* Logo & Header (Desktop Only) */}
            <div className="hidden md:block mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white text-xl">
                  📘
                </div>
                <span className="text-lg font-semibold text-gray-900">CampusNotes</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign in
              </h2>
              <p className="text-sm text-gray-600">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* Mobile Header Text */}
            <div className="md:hidden mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Sign in
              </h2>
              <p className="text-sm text-gray-600">
                Enter your details to continue
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Registration Number
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g., 2021001"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 pt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Sign up for free
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}