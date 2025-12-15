import React, { useState, useEffect } from "react";
import { ExternalLink, Clock, Search } from "lucide-react";

export default function MyDownloadsSection({ userId, onCountsUpdate }) {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterSubject, setFilterSubject] = useState("all");
    const [filterFileType, setFilterFileType] = useState("all");
    const [filterDateRange, setFilterDateRange] = useState("all");

    useEffect(() => {
        if (userId) {
            fetchDownloads();
        }
    }, [userId]);

    const fetchDownloads = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/download/history/${userId}`);
            const data = await response.json();

            if (data.success) {
                setDownloads(data.downloads);
                if (onCountsUpdate) {
                    onCountsUpdate({ total: data.downloads.length });
                }
            }
        } catch (error) {
            console.error("Error fetching downloads:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get unique subjects from downloads
    const uniqueSubjects = [...new Set(downloads.map(item => item.itemSubject))].sort();

    // Comprehensive filter function
    const filteredDownloads = downloads.filter(item => {
        // Search filter
        const query = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery.trim() ||
            item.itemTitle?.toLowerCase().includes(query) ||
            item.itemSubject?.toLowerCase().includes(query);

        // Type filter
        const matchesType = filterType === "all" || item.itemType === filterType;

        // Subject filter
        const matchesSubject = filterSubject === "all" || item.itemSubject === filterSubject;

        // File type filter
        const matchesFileType = filterFileType === "all" || item.fileType === filterFileType;

        // Date range filter
        let matchesDate = true;
        if (filterDateRange !== "all") {
            const itemDate = new Date(item.downloadedAt);
            const daysAgo = parseInt(filterDateRange);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
            matchesDate = itemDate >= cutoffDate;
        }

        return matchesSearch && matchesType && matchesSubject && matchesFileType && matchesDate;
    });

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-center text-gray-500">Loading download history...</p>
            </div>
        );
    }

    if (downloads.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center text-gray-500">
                No downloads yet. Explore content to start downloading!
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Download History</h3>

            {/* Filter Bar */}
            <div className="mb-4 space-y-3">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title or subject..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {/* Resource Type */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="Note">Notes</option>
                        <option value="Book">Books</option>
                        <option value="PYQ">PYQs</option>
                    </select>

                    {/* Subject */}
                    <select
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="all">All Subjects</option>
                        {uniqueSubjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>

                    {/* File Type */}
                    <select
                        value={filterFileType}
                        onChange={(e) => setFilterFileType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="all">All Files</option>
                        <option value="PDF">PDF</option>
                        <option value="DOC">DOC</option>
                        <option value="DOCX">DOCX</option>
                        <option value="PPT">PPT</option>
                        <option value="PPTX">PPTX</option>
                    </select>

                    {/* Date Range */}
                    <select
                        value={filterDateRange}
                        onChange={(e) => setFilterDateRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="all">All Time</option>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                    </select>
                </div>
            </div>

            {/* Downloads List */}
            {filteredDownloads.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No results found matching your filters</p>
            ) : (
                <div className="space-y-4">
                    {filteredDownloads.map((item) => (
                        <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center justify-between">
                            <div className="flex-1 min-w-0 mr-4">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h4 className="font-medium text-gray-900">{item.itemTitle}</h4>
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        {item.itemType}
                                    </span>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                        {item.fileType}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                    <span>{item.itemSubject}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <Clock size={12} />
                                        {new Date(item.downloadedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <a
                                href={item.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Open File"
                            >
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
