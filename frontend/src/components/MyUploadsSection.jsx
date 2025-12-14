import React, { useState } from "react";
import { Edit2, Trash2, ExternalLink, X, Save, Search, Download } from "lucide-react";

export default function MyUploadsSection({ userId, onCountsUpdate }) {
    const [uploads, setUploads] = useState({ notes: [], books: [], pyqs: [] });
    const [counts, setCounts] = useState({ notes: 0, books: 0, pyqs: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    React.useEffect(() => {
        fetchUploads();
    }, [userId]);

    const fetchUploads = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/upload/my-uploads/${userId}`);
            const data = await response.json();

            if (data.success) {
                setUploads(data.uploads);
                setCounts(data.counts);
                if (onCountsUpdate) onCountsUpdate(data.counts);
            }
        } catch (error) {
            console.error("Error fetching uploads:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item, type) => {
        setEditingItem({ ...item, type });
        setEditForm(item);
    };

    const handleUpdate = async () => {
        try {
            const { type, _id } = editingItem;
            const endpoint = `http://localhost:5000/api/upload/${type}/${_id}`;

            const response = await fetch(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            const data = await response.json();
            if (data.success) {
                alert("✅ Updated successfully!");
                setEditingItem(null);
                fetchUploads();
            } else {
                alert(data.message || "Failed to update");
            }
        } catch (error) {
            console.error("Error updating:", error);
            alert("Failed to update");
        }
    };

    const handleDelete = async (id, type) => {
        if (!confirm("Are you sure you want to delete this?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/upload/${type}/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();
            if (data.success) {
                alert("✅ Deleted successfully!");
                fetchUploads();
            } else {
                alert(data.message || "Failed to delete");
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to delete");
        }
    };

    const renderUploadCard = (item, type) => (
        <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.subject}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {item.fileType}
                </span>
            </div>

            <div className="text-xs text-gray-500 space-y-1 mb-3">
                <div>{item.branch} • Sem {item.semester}</div>
                {type === "book" && <div>Author: {item.author}</div>}
                {type === "pyq" && <div>{item.examType} • {item.year}</div>}
                <div>Downloads: {item.downloads || 0}</div>
            </div>

            <div className="flex gap-2">
                <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                    <ExternalLink size={14} />
                    View
                </a>
                <button
                    onClick={() => handleEdit(item, type)}
                    className="py-2 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                    <Edit2 size={14} />
                </button>
                <button
                    onClick={() => handleDelete(item._id, type)}
                    className="py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-center text-gray-500">Loading your uploads...</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Uploads</h3>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800">{counts.total}</div>
                        <div className="text-xs text-gray-600">Total</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{counts.notes}</div>
                        <div className="text-xs text-gray-600">Notes</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{counts.books}</div>
                        <div className="text-xs text-gray-600">Books</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{counts.pyqs}</div>
                        <div className="text-xs text-gray-600">PYQs</div>
                    </div>
                </div>

                {/* Search Box */}
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, subject, or author..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Uploads List */}
                {counts.total === 0 ? (
                    <p className="text-center text-gray-500 py-8">No uploads yet. Start sharing your materials!</p>
                ) : (() => {
                    // Filter uploads based on search query
                    const filterItems = (items) => {
                        if (!searchQuery.trim()) return items;
                        const query = searchQuery.toLowerCase();
                        return items.filter(item =>
                            item.title?.toLowerCase().includes(query) ||
                            item.subject?.toLowerCase().includes(query) ||
                            item.author?.toLowerCase().includes(query)
                        );
                    };

                    const filteredNotes = filterItems(uploads.notes);
                    const filteredBooks = filterItems(uploads.books);
                    const filteredPyqs = filterItems(uploads.pyqs);
                    const hasResults = filteredNotes.length > 0 || filteredBooks.length > 0 || filteredPyqs.length > 0;

                    if (!hasResults) {
                        return <p className="text-center text-gray-500 py-8">No results found for "{searchQuery}"</p>;
                    }

                    return (
                        <div className="space-y-4">
                            {filteredNotes.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes ({filteredNotes.length})</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {filteredNotes.map(note => renderUploadCard(note, "note"))}
                                    </div>
                                </div>
                            )}

                            {filteredBooks.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Books ({filteredBooks.length})</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {filteredBooks.map(book => renderUploadCard(book, "book"))}
                                    </div>
                                </div>
                            )}

                            {filteredPyqs.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">PYQs ({filteredPyqs.length})</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {filteredPyqs.map(pyq => renderUploadCard(pyq, "pyq"))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Edit {editingItem.type}</h3>
                            <button onClick={() => setEditingItem(null)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editForm.title || ""}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {editingItem.type === "book" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                                    <input
                                        type="text"
                                        value={editForm.author || ""}
                                        onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={editForm.subject || ""}
                                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
                                <input
                                    type="url"
                                    value={editForm.fileUrl || ""}
                                    onChange={(e) => setEditForm({ ...editForm, fileUrl: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {editingItem.type !== "pyq" && editForm.description !== undefined && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={editForm.description || ""}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        rows="3"
                                    />
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setEditingItem(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
