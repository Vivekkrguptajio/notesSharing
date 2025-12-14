import React from "react";
import { Link } from "react-router-dom";
import { Upload, BookOpen, FileText, Download, Star, TrendingUp, Award, Users } from "lucide-react";

export default function StudentDashboard() {
    const stats = [
        { icon: Download, label: "Downloads", value: "24", color: "bg-blue-100 text-blue-600" },
        { icon: Upload, label: "Uploads", value: "8", color: "bg-green-100 text-green-600" },
        { icon: Star, label: "Points", value: "156", color: "bg-yellow-100 text-yellow-600" },
        { icon: Award, label: "Rank", value: "#42", color: "bg-purple-100 text-purple-600" }
    ];

    const recentDownloads = [
        { title: "Data Structures Notes", subject: "CS", date: "2 hours ago" },
        { title: "DBMS Complete Guide", subject: "CS", date: "1 day ago" },
        { title: "OS Concepts Book", subject: "CS", date: "2 days ago" }
    ];

    const quickActions = [
        { icon: Upload, title: "Upload Notes", description: "Share your study materials", to: "/student/upload", color: "from-indigo-600 to-purple-600" },
        { icon: BookOpen, title: "Browse Notes", description: "Find study materials", to: "/notes", color: "from-blue-600 to-indigo-600" },
        { icon: FileText, title: "My Uploads", description: "Manage your content", to: "/student/uploads", color: "from-green-600 to-teal-600" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                Welcome back, Student! 👋
                            </h1>
                            <p className="text-sm sm:text-base text-indigo-100">
                                Here's what's happening with your account today
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
                                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
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

                    {/* Recent Downloads */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Downloads</h2>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                            <div className="space-y-4">
                                {recentDownloads.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                                            <p className="text-xs text-gray-500">{item.subject} • {item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your Activity</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span>You're in the top 15% of contributors this month!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
