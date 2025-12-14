import React from "react";
import { Link } from "react-router-dom";
import { Users, FileText, BookOpen, FileQuestion, Settings, LogOut, UserCheck } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { icon: Users, label: "Total Users", value: "1,234", color: "bg-blue-500" },
        { icon: FileText, label: "Total Notes", value: "5,678", color: "bg-green-500" },
        { icon: BookOpen, label: "Total Books", value: "2,345", color: "bg-purple-500" },
        { icon: FileQuestion, label: "Total PYQs", value: "1,567", color: "bg-orange-500" },
    ];

    const menuItems = [
        { icon: Users, label: "Manage Users", to: "/admin/users" },
        { icon: FileText, label: "Manage Notes", to: "/admin/notes" },
        { icon: BookOpen, label: "Manage Books", to: "/admin/books" },
        { icon: FileQuestion, label: "Manage PYQs", to: "/admin/pyqs" },
        { icon: UserCheck, label: "Uploader Requests", to: "/admin/uploader-requests" },
        { icon: Settings, label: "Settings", to: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Simple Header */}
            <div className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center gap-4">
                                    <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Menu Grid */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
                                >
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <Icon size={24} className="text-gray-700" />
                                    </div>
                                    <span className="font-medium text-gray-700">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
