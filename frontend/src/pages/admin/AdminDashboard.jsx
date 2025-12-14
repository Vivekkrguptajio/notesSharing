import React from "react";
import { Link } from "react-router-dom";
import { Users, FileText, BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { icon: Users, label: "Total Users", value: "1,234", change: "+12%", color: "bg-blue-100 text-blue-600" },
        { icon: FileText, label: "Total Notes", value: "5,678", change: "+8%", color: "bg-green-100 text-green-600" },
        { icon: BookOpen, label: "Total Books", value: "2,345", change: "+15%", color: "bg-purple-100 text-purple-600" },
        { icon: TrendingUp, label: "Downloads", value: "12.5K", change: "+23%", color: "bg-orange-100 text-orange-600" }
    ];

    const pendingApprovals = [
        { title: "Algorithm Design Notes", user: "John Doe", type: "Notes", time: "2 hours ago" },
        { title: "Database Systems Book", user: "Jane Smith", type: "Book", time: "5 hours ago" },
        { title: "OS Mid-Term PYQ 2023", user: "Mike Johnson", type: "PYQ", time: "1 day ago" }
    ];

    const recentActivity = [
        { action: "New user registered", user: "Sarah Wilson", time: "10 min ago", icon: Users },
        { action: "Content approved", user: "Admin", time: "1 hour ago", icon: CheckCircle },
        { action: "Report flagged", user: "System", time: "2 hours ago", icon: AlertCircle }
    ];

    const quickActions = [
        { icon: CheckCircle, title: "Approve Content", description: "Review pending uploads", to: "/admin/approvals", color: "from-green-600 to-teal-600" },
        { icon: Users, title: "Manage Users", description: "View and manage users", to: "/admin/users", color: "from-blue-600 to-indigo-600" },
        { icon: BarChart3, title: "Analytics", description: "View platform stats", to: "/admin/analytics", color: "from-purple-600 to-pink-600" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                Admin Dashboard 🛡️
                            </h1>
                            <p className="text-sm sm:text-base text-blue-100">
                                Manage and monitor the platform
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 -mt-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.color} mb-3`}>
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="flex items-center justify-between">
                                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                                    <div className="text-xs font-medium text-green-600">{stat.change}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={index}
                                    to={action.to}
                                    className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-6 hover:shadow-lg transition-all group`}
                                >
                                    <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                                    <p className="text-sm text-white/80">{action.description}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Pending Approvals */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pending Approvals</h2>
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                {pendingApprovals.length}
                            </span>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                            <div className="space-y-4">
                                {pendingApprovals.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                                            <p className="text-xs text-gray-500">{item.type} by {item.user} • {item.time}</p>
                                        </div>
                                        <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700">
                                            Review
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => {
                                    const Icon = activity.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900">{activity.action}</h4>
                                                <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
