import React from "react";
import { Link } from "react-router-dom";
import { Upload, FileText, Users, TrendingUp, Award, BookOpen, Star, MessageSquare } from "lucide-react";

export default function TeacherDashboard() {
    const stats = [
        { icon: FileText, label: "My Uploads", value: "32", color: "bg-indigo-100 text-indigo-600" },
        { icon: Users, label: "Students Helped", value: "456", color: "bg-green-100 text-green-600" },
        { icon: TrendingUp, label: "Total Downloads", value: "1.2K", color: "bg-blue-100 text-blue-600" },
        { icon: Star, label: "Avg Rating", value: "4.8", color: "bg-yellow-100 text-yellow-600" }
    ];

    const myUploads = [
        { title: "Data Structures Complete Notes", downloads: 234, rating: 4.9, subject: "CS" },
        { title: "DBMS Lecture Series", downloads: 189, rating: 4.7, subject: "CS" },
        { title: "Operating Systems Guide", downloads: 156, rating: 4.8, subject: "CS" }
    ];

    const recentFeedback = [
        { student: "John Doe", comment: "Excellent notes! Very helpful", rating: 5, time: "2 hours ago" },
        { student: "Jane Smith", comment: "Clear and concise explanations", rating: 5, time: "1 day ago" },
        { student: "Mike Johnson", comment: "Great resource for exam prep", rating: 4, time: "2 days ago" }
    ];

    const quickActions = [
        { icon: Upload, title: "Upload Content", description: "Share study materials", to: "/teacher/upload", color: "from-indigo-600 to-purple-600" },
        { icon: FileText, title: "My Content", description: "Manage your uploads", to: "/teacher/content", color: "from-blue-600 to-indigo-600" },
        { icon: MessageSquare, title: "Feedback", description: "View student reviews", to: "/teacher/feedback", color: "from-green-600 to-teal-600" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                Teacher Dashboard 👨‍🏫
                            </h1>
                            <p className="text-sm sm:text-base text-purple-100">
                                Track your contributions and impact
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
                    {/* My Top Uploads */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Top Performing Content</h2>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                            <div className="space-y-4">
                                {myUploads.map((upload, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-900 truncate">{upload.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-500">{upload.downloads} downloads</span>
                                                <span className="flex items-center gap-1 text-xs text-yellow-600">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    {upload.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Feedback */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recent Feedback</h2>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                            <div className="space-y-4">
                                {recentFeedback.map((feedback, index) => (
                                    <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900">{feedback.student}</h4>
                                            <div className="flex items-center gap-1">
                                                {[...Array(feedback.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">{feedback.comment}</p>
                                        <p className="text-xs text-gray-400">{feedback.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Section */}
                <div className="mt-8 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1">Your Impact</h3>
                            <p className="text-sm text-purple-100">
                                Your materials have helped 456 students this semester. Keep up the great work!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
