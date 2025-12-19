import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, ExternalLink, Loader, Trash2 } from "lucide-react";

export default function MyNoteRequests({ userId }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchRequests();
        }
    }, [userId]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/note-requests/student/${userId}`);
            const data = await response.json();

            if (data.success) {
                setRequests(data.requests);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (requestId) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/note-requests/${requestId}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (data.success) {
                setRequests(prev => prev.filter(req => req._id !== requestId));
            } else {
                alert("Failed to delete request");
            }
        } catch (error) {
            console.error("Error deleting request:", error);
            alert("Error deleting request");
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
            fulfilled: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
            dismissed: { bg: "bg-gray-100", text: "text-gray-700", icon: Clock }
        };

        const style = styles[status] || styles.pending;
        const Icon = style.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 ${style.bg} ${style.text} text-xs font-medium rounded-full`}>
                <Icon size={12} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-center items-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-indigo-500" />
                </div>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center text-gray-500">
                No note requests yet. Click "Request Notes" to get started!
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Note Requests</h3>

            <div className="space-y-3">
                {requests.map((request) => (
                    <div
                        key={request._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative group"
                    >
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                                    {request.subject} - {request.topic}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                    {request.branch} • Semester {request.semester}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {getStatusBadge(request.status)}
                                {(request.status === "pending" || request.status === "dismissed") && (
                                    <button
                                        onClick={() => handleDelete(request._id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Delete Request"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {request.description && (
                            <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                            <span>
                                Requested {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                            {request.status === "fulfilled" && request.fulfilledBy && (
                                <span className="text-green-600 font-medium">
                                    Fulfilled by {request.fulfilledBy.fullName}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
