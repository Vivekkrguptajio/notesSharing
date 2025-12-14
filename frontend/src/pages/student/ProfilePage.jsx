import React, { useState, useEffect } from "react";
import { User, Lock, Mail, BookOpen, Hash, Building, Save } from "lucide-react";
import { getCurrentUser, updateProfile } from "../../api/auth.api";

export default function ProfilePage() {
    const [user, setUser] = useState({
        fullName: "",
        registrationNumber: "",
        branch: "",
        semester: ""
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser({
                fullName: currentUser.fullName || "",
                registrationNumber: currentUser.registrationNumber || "",
                branch: currentUser.branch || "",
                semester: currentUser.semester || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });
        setLoading(true);

        // Validation
        if (passwordData.newPassword && passwordData.newPassword.length < 6) {
            setMessage({ type: "error", text: "New password must be at least 6 characters" });
            setLoading(false);
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            setLoading(false);
            return;
        }

        try {
            const updateData = {
                fullName: user.fullName,
                branch: user.branch,
                semester: user.semester,
                ...(passwordData.newPassword && { password: passwordData.newPassword })
            };

            await updateProfile(updateData);
            setMessage({ type: "success", text: "Profile updated successfully!" });
            setPasswordData({ newPassword: "", confirmPassword: "" });
        } catch (error) {
            setMessage({ type: "error", text: error.message || "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <User className="w-6 h-6" />
                            Edit Profile
                        </h1>
                        <p className="text-indigo-100 mt-2">Update your personal information and password</p>
                    </div>

                    <div className="p-8">
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Info Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <User size={18} className="text-indigo-600" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={user.fullName}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="John Doe"
                                            />
                                            <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={user.registrationNumber}
                                                disabled
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                                            />
                                            <Hash size={16} className="absolute left-3 top-3 text-gray-400" />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                                        <div className="relative">
                                            <select
                                                name="branch"
                                                value={user.branch}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                            >
                                                <option value="">Select Branch</option>
                                                {["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"].map((branch) => (
                                                    <option key={branch} value={branch}>{branch}</option>
                                                ))}
                                            </select>
                                            <Building size={16} className="absolute left-3 top-3 text-gray-400" />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                                        <div className="relative">
                                            <select
                                                name="semester"
                                                value={user.semester}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                            >
                                                <option value="">Select Semester</option>
                                                {["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"].map((sem) => (
                                                    <option key={sem} value={sem}>{sem}</option>
                                                ))}
                                            </select>
                                            <BookOpen size={16} className="absolute left-3 top-3 text-gray-400" />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            {/* Password Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Lock size={18} className="text-indigo-600" />
                                    Change Password
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Leave blank to keep current"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    {loading ? (
                                        "Saving Changes..."
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
