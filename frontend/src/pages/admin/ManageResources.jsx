import React, { useState, useEffect } from "react";
import { Search, Trash2, ExternalLink, Filter, ArrowLeft, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ManageResources({ resourceType, title }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Helper to pluralize resource type for API endpoints (e.g., 'note' -> 'notes')
    const endpointSuffix = resourceType + "s";

    useEffect(() => {
        fetchItems();
    }, [resourceType]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            // Public fetch routes are sufficient for this as they return all items
            const response = await fetch(`http://localhost:5000/api/upload/${endpointSuffix}`);
            const data = await response.json();

            if (data.success) {
                setItems(data[endpointSuffix] || []);
            }
        } catch (error) {
            console.error(`Error fetching ${endpointSuffix}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resource? This action cannot be undone.")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/upload/${resourceType}/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();

            if (data.success) {
                alert("✅ Deleted successfully!");
                fetchItems(); // Refresh list
            } else {
                alert(data.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item");
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.uploaderName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="text-gray-500 text-sm">Manage and moderate uploaded content</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, subject, or uploader..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Content List */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader className="animate-spin text-blue-500" size={32} />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">No resources found.</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile View: Cards */}
                        <div className="md:hidden space-y-4">
                            {filteredItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{item.subject}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md uppercase shrink-0 ml-2">
                                            {item.fileType}
                                        </span>
                                    </div>

                                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                                        <div className="flex justify-between">
                                            <span>Uploader:</span>
                                            <span className="font-medium text-gray-700">{item.uploaderName || "Unknown"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date:</span>
                                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 border-t border-gray-100 pt-3">
                                        <a
                                            href={item.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                            View
                                        </a>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View: Table */}
                        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Title</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Subject</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Uploader</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Type</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredItems.map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900 line-clamp-1">{item.title}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{item.subject}</td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    <div className="font-medium text-sm">{item.uploaderName || "Unknown"}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md uppercase">
                                                        {item.fileType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-sm">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <a
                                                            href={item.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="View File"
                                                        >
                                                            <ExternalLink size={18} />
                                                        </a>
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Resource"
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
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
