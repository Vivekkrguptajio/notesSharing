import React, { useState, useEffect } from "react";
import { BookOpen, FileText, HelpCircle, Loader, Download, ExternalLink } from "lucide-react";

export default function SemesterResources({ branch, semester }) {
    const [resources, setResources] = useState({ notes: [], books: [], pyqs: [] });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("notes");

    useEffect(() => {
        if (branch && semester) {
            fetchResources();
        }
    }, [branch, semester]);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/student-resources?branch=${branch}&semester=${semester}`);
            const data = await response.json();

            if (data.success) {
                setResources(data.resources);
            }
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "notes", label: "Notes", icon: FileText, count: resources.notes.length, color: "blue" },
        { id: "books", label: "Books", icon: BookOpen, count: resources.books.length, color: "green" },
        { id: "pyqs", label: "PYQs", icon: HelpCircle, count: resources.pyqs.length, color: "purple" }
    ];

    const currentResources = resources[activeTab] || [];
    const CurrentTabInfo = tabs.find(t => t.id === activeTab);

    if (!branch || !semester) {
        return (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold mb-2">Setup Your Profile</h3>
                        <p className="text-blue-100 text-sm mb-4">
                            Please update your branch and semester to see personalized notes, books, and PYQs.
                        </p>
                        <a
                            href="/student/profile"
                            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors inline-block"
                        >
                            Update Profile
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex justify-center items-center">
                <Loader className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        Top Picks for You
                    </h3>
                    <p className="text-sm text-gray-500">
                        {branch} • Semester {semester} Resources
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                ? `text-${tab.color}-600 bg-${tab.color}-50`
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? `bg-${tab.color}-100 text-${tab.color}-700` : "bg-gray-100 text-gray-600"}`}>
                                {tab.count}
                            </span>
                            {activeTab === tab.id && (
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${tab.color}-600`} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content List */}
            <div className="p-0">
                {currentResources.length === 0 ? (
                    <div className="text-center py-12 px-4">
                        <div className={`w-16 h-16 mx-auto bg-${CurrentTabInfo.color}-50 rounded-full flex items-center justify-center mb-4`}>
                            <CurrentTabInfo.icon className={`text-${CurrentTabInfo.color}-400`} size={32} />
                        </div>
                        <h4 className="text-gray-900 font-medium mb-1">No Uploads</h4>
                        <p className="text-gray-500 text-sm">
                            No {activeTab.slice(0, -1)}s uploaded for {branch} Semester {semester} yet.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {currentResources.map((item) => (
                            <div key={item._id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 group">
                                <div className={`w-10 h-10 rounded-lg bg-${CurrentTabInfo.color}-100 text-${CurrentTabInfo.color}-600 flex items-center justify-center flex-shrink-0 mt-1`}>
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h4>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                        {activeTab === 'books' && `by ${item.author} • `}
                                        {item.subject}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                        {item.views !== undefined && (
                                            <span>{item.views} views</span>
                                        )}
                                        <span>•</span>
                                        <span className="capitalize">{item.uploaderName}</span>
                                    </div>
                                </div>
                                <a
                                    href={item.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                    title="View/Download"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Link */}
            {currentResources.length > 0 && (
                <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                    <a href={`/${activeTab}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                        View All {CurrentTabInfo.label} →
                    </a>
                </div>
            )}
        </div>
    );
}
