import React, { useState, useEffect } from "react";
import { Trash2, Upload as UploadIcon, Loader, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploaderNoteRequests() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterSubject, setFilterSubject] = useState("all");
    const [filterBranch, setFilterBranch] = useState("all");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/note-requests/uploader`);
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

    const handleDismiss = async (id) => {
        if (!confirm("Are you sure you want to dismiss this request?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/note-requests/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (data.success) {
                setRequests(requests.filter(req => req._id !== id));
                alert("✅ Request dismissed");
            } else {
                alert(data.message || "Failed to dismiss request");
            }
        } catch (error) {
            console.error("Error dismissing request:", error);
            alert("Failed to dismiss request");
        }
    };

    const handleUpload = (request) => {
        // Navigate to upload page with pre-filled data
        navigate("/student/upload", {
            state: {
                prefill: {
                    subject: request.subject,
                    topic: request.topic,
                    branch: request.branch,
                    semester: request.semester,
                    requestId: request._id
                }
            }
        });
    };

    // Get unique subjects and branches for filters
    const uniqueSubjects = [...new Set(requests.map(r => r.subject))].sort();
    const uniqueBranches = [...new Set(requests.map(r => r.branch))].sort();

    // Filter requests
    const filteredRequests = requests.filter(request => {
        const matchesSubject = filterSubject === "all" || request.subject === filterSubject;
        const matchesBranch = filterBranch === "all" || request.branch === filterBranch;
        return matchesSubject && matchesBranch;
    });

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex justify-center items-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-indigo-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Note Requests</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {filteredRequests.length} pending request{filteredRequests.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Filters */}
            {requests.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
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

                    <select
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="all">All Branches</option>
                        {uniqueBranches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Requests List */}
            {filteredRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {requests.length === 0
                        ? "No pending requests at the moment"
                        : "No requests matching your filters"}
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredRequests.map((request) => (
                        <div
                            key={request._id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {request.subject} - {request.topic}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        Requested by <span className="font-medium">{request.requesterName}</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {request.branch} • Semester {request.semester}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {request.description && (
                                <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">
                                    {request.description}
                                </p>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleUpload(request)}
                                    className="flex-1 py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <UploadIcon size={16} />
                                    Upload
                                </button>
                                <button
                                    onClick={() => handleDismiss(request._id)}
                                    className="py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
