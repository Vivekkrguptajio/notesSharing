import React, { useEffect, useState } from "react";
import { MessageSquare, CheckCircle, Clock, Trash2, User, AlertCircle, Lightbulb, Check } from "lucide-react";

export default function AdminFeedbackSection() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await fetch(`${API_URL}/api/feedback/all`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.success) {
                setFeedbacks(data.feedbacks);
            }
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await fetch(`${API_URL}/api/feedback/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                // Optimistic update
                setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, status: newStatus } : f));
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const deleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            const token = localStorage.getItem("token");
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await fetch(`${API_URL}/api/feedback/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.success) {
                setFeedbacks(feedbacks.filter(f => f._id !== id));
            }
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Resolved": return "bg-green-100 text-green-700 border-green-200";
            case "Reviewed": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
        }
    };

    const getTypeIcon = (type) => {
        if (type === "Issue") return <AlertCircle className="w-4 h-4 text-red-500" />;
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
    };

    if (loading) return <div className="text-center py-8">Loading feedback...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-600" /> User Feedback & Requests
                </h3>
                <span className="text-sm text-gray-500">{feedbacks.length} total</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm">
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Type</th>
                            <th className="p-4 font-semibold">Message</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {feedbacks.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    No feedback received yet.
                                </td>
                            </tr>
                        ) : (
                            feedbacks.map((fb) => (
                                <tr key={fb._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                {fb.userName?.charAt(0) || "U"}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{fb.userName}</p>
                                                {/* <p className="text-xs text-gray-500">ID: ...{fb.userId.slice(-4)}</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            {getTypeIcon(fb.type)}
                                            <span className="font-medium text-gray-700">{fb.type}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 group relative max-w-xs">
                                        <p className="font-medium text-gray-900 text-sm truncate">{fb.subject}</p>
                                        <p className="text-xs text-gray-500 truncate">{fb.message}</p>
                                        {/* Tooltip for full message on hover could be added here */}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(fb.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(fb.status)}`}>
                                            {fb.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {fb.status !== "Resolved" && (
                                                <button
                                                    onClick={() => updateStatus(fb._id, "Resolved")}
                                                    title="Mark as Resolved"
                                                    className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {fb.status === "Pending" && (
                                                <button
                                                    onClick={() => updateStatus(fb._id, "Reviewed")}
                                                    title="Mark as Reviewed"
                                                    className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteFeedback(fb._id)}
                                                title="Delete"
                                                className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
