import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock, Mail, Phone, IdCard, User, Calendar } from "lucide-react";

export default function ManageUploaderRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            console.log("🔍 Fetching uploader requests from API...");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/uploader-requests`);
            console.log("📡 Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("📦 Received data:", data);
            console.log("📊 Number of requests:", data.requests?.length || 0);

            setRequests(data.requests || []);
        } catch (error) {
            console.error("❌ Error fetching requests:", error);
            alert(`Failed to fetch requests: ${error.message}\n\nPlease check:\n1. Backend is running\n2. Database is connected`);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        const adminResponse = prompt("Enter approval message (optional):");
        if (adminResponse === null) return; // User cancelled

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/uploader-requests/${requestId}/approve`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminResponse })
            });

            if (response.ok) {
                alert("✅ Request approved successfully!");
                fetchRequests();
            }
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request");
        }
    };

    const handleReject = async (requestId) => {
        const adminResponse = prompt("Enter rejection reason:");
        if (!adminResponse) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/uploader-requests/${requestId}/reject`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminResponse })
            });

            if (response.ok) {
                alert("Request rejected");
                fetchRequests();
            }
        } catch (error) {
            console.error("Error rejecting request:", error);
            alert("Failed to reject request");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredRequests = requests.filter(req => {
        if (filter === "all") return true;
        return req.status === filter;
    });

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === "pending").length,
        approved: requests.filter(r => r.status === "approved").length,
        rejected: requests.filter(r => r.status === "rejected").length
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Uploader Requests</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-500 text-sm">Total Requests</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-500 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-500 text-sm">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-500 text-sm">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Requests</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                            Loading requests...
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                            No requests found
                        </div>
                    ) : (
                        filteredRequests.map((request) => (
                            <div key={request._id} className="bg-white rounded-lg shadow p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{request.fullName}</h3>
                                        <p className="text-sm text-gray-500">
                                            {request.userId?.registrationNumber} • {request.userId?.branch}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${request.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : request.status === "approved"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail size={16} className="text-gray-400" />
                                        <span className="text-gray-700">{request.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone size={16} className="text-gray-400" />
                                        <span className="text-gray-700">{request.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span className="text-gray-700">Applied: {formatDate(request.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <IdCard size={16} className="text-gray-400" />
                                        <a
                                            href={request.idCardUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View ID Card
                                        </a>
                                    </div>
                                </div>

                                {/* Reason */}
                                {request.reason && (
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-gray-600">
                                            <strong>Reason:</strong> {request.reason}
                                        </p>
                                    </div>
                                )}

                                {/* Admin Response */}
                                {request.adminResponse && (
                                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-gray-700">
                                            <strong>Admin Response:</strong> {request.adminResponse}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                {request.status === "pending" && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleApprove(request._id)}
                                            className="flex-1 md:flex-none px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle size={18} />
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(request._id)}
                                            className="flex-1 md:flex-none px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={18} />
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-gray-600 text-center">
                    Showing {filteredRequests.length} of {requests.length} requests
                </div>
            </div>
        </div>
    );
}
