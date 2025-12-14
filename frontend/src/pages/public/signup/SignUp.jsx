import React, { useState } from "react";
import { Eye, EyeOff, Hash, Lock, User, ChevronDown, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../api/auth.api";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        registrationNumber: "",
        branch: "",
        semester: "",
        password: "",
    });

    const branches = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"];
    const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

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
        setSuccess("");
        setLoading(true);

        try {
            const response = await signup(formData);

            if (response.success) {
                setSuccess("Account created successfully! Redirecting to login...");

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (err) {
            setError(err.message || "Signup failed. Please try again.");
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
                        Join the Community
                    </h1>
                    <p className="text-lg text-indigo-100">
                        Start sharing and discovering study notes with thousands of students.
                    </p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Mobile Header with Gradient */}
                <div className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-8">
                    <h1 className="text-2xl font-bold mb-2">Join the Community</h1>
                    <p className="text-indigo-100 text-sm">Start sharing and discovering study notes</p>
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
                                Create account
                            </h2>
                            <p className="text-sm text-gray-600">
                                Sign up with your registration number to get started
                            </p>
                        </div>

                        {/* Mobile Header Text */}
                        <div className="md:hidden mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                Create account
                            </h2>
                            <p className="text-sm text-gray-600">
                                Sign up to get started
                            </p>
                        </div>


                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <p className="text-sm text-green-700">{success}</p>
                                </div>
                            )}

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                                        required
                                    />
                                </div>
                            </div>

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

                            {/* Branch and Semester Row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Branch
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            className="w-full appearance-none px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                                            required
                                        >
                                            <option value="">Select</option>
                                            {branches.map((branch) => (
                                                <option key={branch} value={branch}>{branch}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Semester
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleChange}
                                            className="w-full appearance-none px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                                            required
                                        >
                                            <option value="">Select</option>
                                            {semesters.map((sem) => (
                                                <option key={sem} value={sem}>{sem}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
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
                                {loading ? "Creating account..." : "Create account"}
                            </button>

                            {/* Sign In Link */}
                            <p className="text-center text-sm text-gray-600 pt-2">
                                Already have an account?{" "}
                                <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
