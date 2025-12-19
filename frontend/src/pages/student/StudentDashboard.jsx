import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, FileText, HelpCircle, Upload, LogOut, Star, CheckCircle, Clock, XCircle } from "lucide-react";
import { getCurrentUser, logout } from "../../api/auth.api";
import UploaderRequestForm from "../../components/UploaderRequestForm";
import MyUploadsSection from "../../components/MyUploadsSection";
import MyDownloadsSection from "../../components/MyDownloadsSection";
import StudentFeedbackSection from "../../components/StudentFeedbackSection";
import Footer from "../../components/common/Footer";
import NoteRequestForm from "../../components/NoteRequestForm";
import MyNoteRequests from "../../components/MyNoteRequests";
import UploaderNoteRequests from "../../components/UploaderNoteRequests";
import SemesterResources from "../../components/SemesterResources";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [uploaderRequest, setUploaderRequest] = useState(null);
    const [loadingRequest, setLoadingRequest] = useState(true);
    const [uploadCounts, setUploadCounts] = useState({ total: 0 });
    const [downloadCounts, setDownloadCounts] = useState({ total: 0 });
    const [showNoteRequestForm, setShowNoteRequestForm] = useState(false);

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            navigate("/login");
        } else {
            setUser(currentUser);
            // Use 'id' instead of '_id' as that's what's stored in localStorage
            fetchUploaderRequest(currentUser.id);
        }
    }, [navigate]);

    const fetchUploaderRequest = async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/uploader/request/${userId}`);
            const data = await response.json();
            if (data.success && data.request) {
                setUploaderRequest(data.request);
            }
        } catch (error) {
            console.error("Error fetching uploader request:", error);
        } finally {
            setLoadingRequest(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const allQuickActions = [
        {
            icon: BookOpen,
            title: "Notes",
            description: "Browse study notes",
            to: "/notes",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: BookOpen,
            title: "Books",
            description: "Find reference books",
            to: "/books",
            iconBg: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            icon: HelpCircle,
            title: "PYQs",
            description: "Previous year papers",
            to: "/pyqs",
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            icon: Upload,
            title: "Upload",
            description: "Share your materials",
            to: "/student/upload",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
            requiresUploader: true  // Only show if user is uploader
        }
    ];

    // Filter actions based on uploader status
    const quickActions = allQuickActions.filter(action => {
        if (action.requiresUploader) {
            return user?.isUploader === true;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Removed - Global Navbar used */}

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
                {/* Greeting */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Hi, {user?.fullName?.split(' ')[0] || "Student"}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {user?.registrationNumber}
                    </p>
                </div>

                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 sm:p-8 text-white mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                        Welcome to Your Dashboard
                    </h2>
                    <p className="text-sm sm:text-base text-indigo-100">
                        Access notes, books, and previous year questions all in one place
                    </p>
                </div>

                {/* Uploader Request Banner */}
                {!loadingRequest && !user?.isUploader && (
                    <div className="mb-6">
                        {!uploaderRequest || uploaderRequest.status === "rejected" ? (
                            // Show "Become Uploader" banner
                            <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl p-6 text-white">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="w-5 h-5" />
                                            <h3 className="text-lg font-bold">Want to Become an Uploader?</h3>
                                        </div>
                                        <p className="text-sm text-orange-50 mb-4">
                                            Share your notes, books, and PYQs with the community. Get verified by admin!
                                        </p>
                                        <button
                                            onClick={() => setShowRequestForm(true)}
                                            className="bg-white text-orange-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                                        >
                                            Apply Now →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : uploaderRequest.status === "pending" ? (
                            // Show pending status
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <Clock className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            Request Pending
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Your uploader request is under review. Admin will notify you soon!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : uploaderRequest.status === "approved" ? (
                            // Show approved status
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            🎉 You're an Uploader!
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {uploaderRequest.adminResponse || "Your request has been approved!"}
                                        </p>
                                        <Link
                                            to="/student/upload"
                                            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Start Uploading
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}

                {/* Quick Access Grid */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={index}
                                    to={action.to}
                                    className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
                                >
                                    <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${action.iconBg} mb-3 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${action.iconColor}`} />
                                    </div>
                                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                                        {action.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {action.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Semester Resources (Top Picks) */}
                <div className="mb-8">
                    <SemesterResources branch={user?.branch} semester={user?.semester} />
                </div>

                {/* Uploader Guidelines Card - Only for Uploaders */}
                {user?.isUploader && (
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-5 sm:p-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                                        ⚠️ Important Guidelines for Uploaders
                                    </h3>
                                    <p className="text-sm sm:text-base text-red-800 leading-relaxed">
                                        If you upload anything that is <strong>not related to PYQs, books, or notes</strong>, a complaint will be submitted to the college administration. So please be respectful and follow the guidelines.
                                    </p>
                                    <div className="mt-3 text-xs sm:text-sm text-red-700 bg-red-100 rounded-lg p-3">
                                        <strong>Remember:</strong> Only upload academic materials (Notes, Books, PYQs). Inappropriate content will result in immediate action.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Profile Info */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Your Profile</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium text-gray-900">{user?.fullName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Reg. No:</span>
                                <span className="font-medium text-gray-900">{user?.registrationNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Role:</span>
                                <span className="font-medium text-gray-900 capitalize">{user?.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                                    {downloadCounts.total || 0}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">My Downloads</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    {uploadCounts.total || 0}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">My Uploads</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Request Notes Button - For all students */}
                <div className="mt-6">
                    <button
                        onClick={() => setShowNoteRequestForm(true)}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <FileText size={20} />
                        Request Notes
                    </button>
                </div>

                {/* My Note Requests - For all students */}
                <div className="mt-6">
                    <MyNoteRequests userId={user?.id} />
                </div>

                {/* Uploader Note Requests - Only for Uploaders */}
                {user?.isUploader && (
                    <div className="mt-6">
                        <UploaderNoteRequests />
                    </div>
                )}

                {/* My Uploads Section - Only for Uploaders */}
                {user?.isUploader && (
                    <div className="mt-6">
                        <MyUploadsSection
                            userId={user?.id}
                            onCountsUpdate={setUploadCounts}
                        />
                    </div>
                )}

                {/* My Downloads Section */}
                <div className="mt-6 mb-8">
                    <MyDownloadsSection
                        userId={user?.id}
                        onCountsUpdate={setDownloadCounts}
                    />
                </div>

                {/* Feedback Section */}
                <div className="mt-6 mb-8">
                    <StudentFeedbackSection />
                </div>
            </div>

            {/* Uploader Request Form Modal */}
            {showRequestForm && (
                <UploaderRequestForm
                    onClose={() => {
                        setShowRequestForm(false);
                        if (user?.id) {
                            fetchUploaderRequest(user.id);
                        }
                    }}
                    userId={user?.id}
                    userFullName={user?.fullName}
                />
            )}

            {/* Note Request Form Modal */}
            {showNoteRequestForm && (
                <NoteRequestForm
                    onClose={() => setShowNoteRequestForm(false)}
                    onSuccess={() => {
                        // Optionally refresh the requests list
                        setShowNoteRequestForm(false);
                    }}
                />
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}
