import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SignUp attempt:", formData);
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
                                Sign up with your college email to get started
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
                            {/* Social Signup Buttons */}
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-gray-700 bg-white"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-sm md:text-base">Continue with Google</span>
                                </button>

                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium text-gray-700 bg-white"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span className="text-sm md:text-base">Continue with GitHub</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-5">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-gray-50 text-gray-500">Or continue with email</span>
                                </div>
                            </div>

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

                            {/* College Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    College Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="student@college.edu"
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
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
                            >
                                Create account
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
