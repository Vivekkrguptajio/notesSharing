import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, UserX, Trash2, Shield, User, Calendar, BookOpen } from "lucide-react";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterBranch, setFilterBranch] = useState("all");
    const [filterSemester, setFilterSemester] = useState("all");
    const [filterUploader, setFilterUploader] = useState("all");

    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched users from database:", data);

            if (data.success && data.users) {
                setUsers(data.users);
            } else {
                setUsers([]);
                alert("Failed to load users from database");
            }
        } catch (error) {
            console.error("Error fetching users from database:", error);
            alert(`Database connection failed: ${error.message}\n\nPlease make sure:\n1. Backend server is running on port 5000\n2. MongoDB is connected\n3. Admin routes are properly configured`);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Block/Unblock user
    const toggleBlockUser = async (userId, currentStatus) => {
        const action = currentStatus ? "unblock" : "block";
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}/block`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isBlocked: !currentStatus })
            });

            if (response.ok) {
                setUsers(users.map(user =>
                    user._id === userId ? { ...user, isBlocked: !currentStatus } : user
                ));
                alert(`User ${action}ed successfully!`);
            }
        } catch (error) {
            console.error("Error toggling user status:", error);
            alert("Failed to update user status");
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone!")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setUsers(users.filter(user => user._id !== userId));
                alert("User deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Unique Branches and Semesters for Dropdowns (Derived from actual data)
    const uniqueBranches = [...new Set(users.map(u => u.branch).filter(Boolean))].sort();
    const uniqueSemesters = [...new Set(users.map(u => u.semester).filter(Boolean))].sort((a, b) => a - b);

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.registrationNumber && user.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.branch && user.branch.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRole = filterRole === "all" || user.role === filterRole;
        const matchesStatus = filterStatus === "all" || (filterStatus === "blocked" ? user.isBlocked : !user.isBlocked);
        const matchesBranch = filterBranch === "all" || user.branch === filterBranch;
        // Loose comparison for semester to handle string vs number
        const matchesSemester = filterSemester === "all" || user.semester == filterSemester;

        // Handle Uploader logic: explicitly check truthiness
        const matchesUploader = filterUploader === "all" || (filterUploader === "true" ? !!user.isUploader : !user.isUploader);

        return matchesSearch && matchesRole && matchesStatus && matchesBranch && matchesSemester && matchesUploader;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="bg-blue-500 p-2 md:p-3 rounded-lg text-white flex-shrink-0">
                                <User size={16} className="md:hidden" />
                                <User size={20} className="hidden md:block" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-gray-500 text-xs md:text-sm truncate">Total Users</p>
                                <p className="text-xl md:text-2xl font-bold text-gray-800">{users.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="bg-green-500 p-2 md:p-3 rounded-lg text-white flex-shrink-0">
                                <Shield size={16} className="md:hidden" />
                                <Shield size={20} className="hidden md:block" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-gray-500 text-xs md:text-sm truncate">Active Users</p>
                                <p className="text-xl md:text-2xl font-bold text-gray-800">
                                    {users.filter(u => !u.isBlocked).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="bg-red-500 p-2 md:p-3 rounded-lg text-white flex-shrink-0">
                                <UserX size={16} className="md:hidden" />
                                <UserX size={20} className="hidden md:block" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-gray-500 text-xs md:text-sm truncate">Blocked Users</p>
                                <p className="text-xl md:text-2xl font-bold text-gray-800">
                                    {users.filter(u => u.isBlocked).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="bg-purple-500 p-2 md:p-3 rounded-lg text-white flex-shrink-0">
                                <BookOpen size={16} className="md:hidden" />
                                <BookOpen size={20} className="hidden md:block" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-gray-500 text-xs md:text-sm truncate">Admins</p>
                                <p className="text-xl md:text-2xl font-bold text-gray-800">
                                    {users.filter(u => u.role === "admin").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* Search */}
                        <div className="relative md:col-span-2 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, reg no..."
                                className="w-full pl-10 pr-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Students</option>
                            <option value="teacher">Teachers</option>
                            <option value="admin">Admins</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>

                        {/* Branch Filter */}
                        <select
                            className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={filterBranch}
                            onChange={(e) => setFilterBranch(e.target.value)}
                        >
                            <option value="all">All Branches</option>
                            {uniqueBranches.map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>

                        {/* Semester Filter */}
                        <select
                            className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={filterSemester}
                            onChange={(e) => setFilterSemester(e.target.value)}
                        >
                            <option value="all">All Semesters</option>
                            {uniqueSemesters.map(sem => (
                                <option key={sem} value={sem}>Semester {sem}</option>
                            ))}
                        </select>

                        {/* Uploader Filter */}
                        <select
                            className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={filterUploader}
                            onChange={(e) => setFilterUploader(e.target.value)}
                        >
                            <option value="all">Any Account Type</option>
                            <option value="true">Uploaders</option>
                            <option value="false">Regular Users</option>
                        </select>
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading users...</div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No users found</div>
                    ) : (
                        <>
                            {/* Desktop Table View - Hidden on Mobile */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User Details
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Branch & Semester
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Joined Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.fullName}</div>
                                                        <div className="text-sm text-gray-500">{user.registrationNumber}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{user.branch}</div>
                                                    <div className="text-sm text-gray-500">Semester {user.semester}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : user.role === "teacher"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                        }`}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={14} />
                                                        {formatDate(user.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isBlocked
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-green-100 text-green-800"
                                                        }`}>
                                                        {user.isBlocked ? "Blocked" : "Active"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                                                            className={`p-2 rounded-lg transition-colors ${user.isBlocked
                                                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                                                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                                                                }`}
                                                            title={user.isBlocked ? "Unblock User" : "Block User"}
                                                        >
                                                            <UserX size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(user._id)}
                                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View - Shown only on Mobile */}
                            <div className="md:hidden divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <div key={user._id} className="p-4 hover:bg-gray-50">
                                        {/* User Header */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-base">{user.fullName}</h3>
                                                <p className="text-sm text-gray-500 mt-0.5">{user.registrationNumber}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isBlocked
                                                ? "bg-red-100 text-red-800"
                                                : "bg-green-100 text-green-800"
                                                }`}>
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </span>
                                        </div>

                                        {/* User Details */}
                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <BookOpen size={14} className="text-gray-400" />
                                                <span className="text-gray-700">{user.branch}</span>
                                                <span className="text-gray-400">•</span>
                                                <span className="text-gray-600">Sem {user.semester}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar size={14} className="text-gray-400" />
                                                <span className="text-gray-600">{formatDate(user.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Shield size={14} className="text-gray-400" />
                                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${user.role === "admin"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : user.role === "teacher"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-green-100 text-green-800"
                                                    }`}>
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleBlockUser(user._id, user.isBlocked)}
                                                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${user.isBlocked
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                                    }`}
                                            >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="flex-1 py-2.5 px-4 bg-red-100 text-red-700 rounded-lg font-medium text-sm hover:bg-red-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-gray-600 text-center">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </div>
        </div>
    );
}
