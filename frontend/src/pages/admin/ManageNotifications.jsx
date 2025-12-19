import React, { useState, useEffect } from "react";
import { Bell, Send, AlertCircle, Info, CheckCircle, Trash2 } from "lucide-react";
import { getAuthHeaders } from "../../api/auth.api";
import Footer from "../../components/common/Footer";

export default function ManageNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "info",
    });
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState(null);
    const [editingId, setEditingId] = useState(null);



    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/notifications`,
                {
                    headers: getAuthHeaders(),
                }
            );
            const data = await response.json();
            if (data.success) {
                setNotifications(data.data);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        setMessage(null);

        const url = editingId
            ? `${import.meta.env.VITE_API_URL}/api/notifications/${editingId}`
            : `${import.meta.env.VITE_API_URL}/api/notifications`;

        const method = editingId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            if (data.success) {
                setMessage({
                    type: "success",
                    text: editingId ? "Notification updated!" : "Notification posted successfully!"
                });
                setForm({ title: "", message: "", type: "info" });
                setEditingId(null);
                fetchNotifications();
            } else {
                setMessage({ type: "error", text: data.message || "Operation failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notification?")) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/notifications/${id}`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );
            const data = await response.json();

            if (data.success) {
                setNotifications(notifications.filter(n => n._id !== id));
                setMessage({ type: "success", text: "Notification deleted" });
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const handleEdit = (notif) => {
        setForm({
            title: notif.title,
            message: notif.message,
            type: notif.type
        });
        setEditingId(notif._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setForm({ title: "", message: "", type: "info" });
        setEditingId(null);
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "alert":
                return <AlertCircle className="text-red-500" size={20} />;
            case "success":
                return <CheckCircle className="text-green-500" size={20} />;
            case "warning":
                return <AlertCircle className="text-yellow-500" size={20} />;
            default:
                return <Info className="text-blue-500" size={20} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-600 p-3 rounded-lg text-white">
                        <Bell size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Notifications</h1>
                </div>

                {/* Create/Edit Notification Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Send size={20} className="text-indigo-600" />
                        {editingId ? "Edit Notification" : "Post New Notification"}
                    </h2>

                    {message && (
                        <div
                            className={`p-4 rounded-lg mb-4 text-sm ${message.type === "success"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="e.g., New Feature Added"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type
                                </label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                >
                                    <option value="info">Info (Blue)</option>
                                    <option value="success">Success (Green)</option>
                                    <option value="alert">Alert (Red)</option>
                                    <option value="warning">Warning (Yellow)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                required
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="Enter notification content..."
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={creating}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                            >
                                {creating ? "Saving..." : (editingId ? "Update Notification" : "Post Notification")}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Recent Notifications List */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Notifications</h2>
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-200">
                        No notifications found.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notif) => (
                            <div
                                key={notif._id}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 transition-all hover:shadow-md group"
                            >
                                <div className="mt-1">{getTypeIcon(notif.type)}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                                {new Date(notif.createdAt).toLocaleDateString()}
                                            </span>
                                            <div className="flex gap-1 ml-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(notif)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    title="Edit"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(notif._id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-1 text-sm">{notif.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
