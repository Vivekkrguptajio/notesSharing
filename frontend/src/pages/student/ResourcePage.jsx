import React, { useState, useEffect } from "react";
import { Search, Filter, BookOpen, Download, ExternalLink, User, Star, CheckCircle, Eye, FileText } from "lucide-react";
import { getCurrentUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function ResourcePage({ type, title }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        fetchItems();
    }, [type]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const endpoint = `${import.meta.env.VITE_API_URL}/api/upload/${type}s`;
            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.success) {
                setItems(data[type + "s"] || []);
            }
        } catch (error) {
            console.error(`Error fetching ${type}s:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (fileUrl) => {
        window.open(fileUrl, "_blank");
    };

    const handleDownload = async (item) => {
        if (!user) {
            if (confirm("You need to login to download files. Go to login page?")) {
                navigate("/login");
            }
            return;
        }

        // Open file immediately (acting as download)
        window.open(item.fileUrl, "_blank");

        // Record download in background
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/download/record`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    itemId: item._id,
                    itemType: type.charAt(0).toUpperCase() + type.slice(1),
                    itemTitle: item.title,
                    itemSubject: item.subject,
                    fileType: item.fileType,
                    fileUrl: item.fileUrl
                })
            });
        } catch (error) {
            console.error("Error recording download:", error);
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    <p className="text-gray-600">Browse and download {title.toLowerCase()} shared by students.</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search ${title.toLowerCase()}...`}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading resources...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No items found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(item => {
                            const getFileTypeColor = (type) => {
                                const t = type?.toUpperCase();
                                if (t === 'PDF') return "bg-red-50 text-red-600 border-red-100";
                                if (t === 'DOC' || t === 'DOCX') return "bg-blue-50 text-blue-600 border-blue-100";
                                if (t === 'PPT' || t === 'PPTX') return "bg-orange-50 text-orange-600 border-orange-100";
                                return "bg-gray-50 text-gray-600 border-gray-100";
                            };

                            const getIcon = () => {
                                if (type === 'book') return <BookOpen className="w-6 h-6 text-indigo-600" />;
                                if (type === 'pyq') return <FileText className="w-6 h-6 text-purple-600" />;
                                return <FileText className="w-6 h-6 text-blue-600" />; // Note
                            };

                            const iconBg = type === 'book' ? 'bg-indigo-50' : type === 'pyq' ? 'bg-purple-50' : 'bg-blue-50';

                            return (
                                <div key={item._id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 hover:border-indigo-200 group">
                                    {/* Header with Icon and Title */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`flex-shrink-0 w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            {getIcon()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-1">{item.subject}</p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 text-xs font-medium border border-gray-100">
                                            {item.branch}
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 text-xs font-medium border border-gray-100">
                                            Sem {item.semester}
                                        </span>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getFileTypeColor(item.fileType)} uppercase`}>
                                            {item.fileType}
                                        </span>
                                        {/* Mock Verified Badge for now */}
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                                            <CheckCircle className="w-3 h-3" />
                                            Verified
                                        </span>
                                    </div>

                                    {/* Stats (Mocked where data missing) */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-5 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User className="w-3.5 h-3.5 text-gray-500" />
                                            </div>
                                            <span className="truncate max-w-[100px] text-xs font-medium">{item.uploaderName || "Admin"}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="font-semibold text-gray-700">4.8</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Download className="w-3.5 h-3.5" />
                                                <span className="font-semibold text-gray-700">{item.downloads || 24}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleView(item.fileUrl)}
                                            className="flex items-center justify-center gap-2 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 py-2.5 rounded-lg font-semibold text-sm transition-all"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDownload(item)}
                                            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
