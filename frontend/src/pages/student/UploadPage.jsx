import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, FileText, BookOpen, HelpCircle, CheckCircle } from "lucide-react";
import { getCurrentUser } from "../../api/auth.api";

export default function UploadPage() {
    const [activeTab, setActiveTab] = useState("notes");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const user = getCurrentUser();

    // Notes Form State
    const [noteForm, setNoteForm] = useState({
        title: "",
        subject: "",
        branch: "",
        semester: "",
        fileUrl: "",
        fileType: "PDF",
        description: ""
    });

    // Books Form State
    const [bookForm, setBookForm] = useState({
        title: "",
        author: "",
        subject: "",
        branch: "",
        semester: "",
        fileUrl: "",
        fileType: "PDF",
        description: ""
    });

    // PYQs Form State
    const [pyqForm, setPyqForm] = useState({
        title: "",
        subject: "",
        branch: "",
        semester: "",
        examType: "Mid-1",
        year: new Date().getFullYear(),
        fileUrl: "",
        fileType: "PDF"
    });

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/upload/note", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, ...noteForm })
            });

            const data = await response.json();
            if (data.success) {
                setSuccess("✅ Note uploaded successfully!");
                setNoteForm({
                    title: "",
                    subject: "",
                    branch: "",
                    semester: "",
                    fileUrl: "",
                    fileType: "PDF",
                    description: ""
                });
                setTimeout(() => setSuccess(""), 3000);
            } else {
                alert(data.message || "Failed to upload note");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to upload note");
        } finally {
            setLoading(false);
        }
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/upload/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, ...bookForm })
            });

            const data = await response.json();
            if (data.success) {
                setSuccess("✅ Book uploaded successfully!");
                setBookForm({
                    title: "",
                    author: "",
                    subject: "",
                    branch: "",
                    semester: "",
                    fileUrl: "",
                    fileType: "PDF",
                    description: ""
                });
                setTimeout(() => setSuccess(""), 3000);
            } else {
                alert(data.message || "Failed to upload book");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to upload book");
        } finally {
            setLoading(false);
        }
    };

    const handlePyqSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5000/api/upload/pyq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, ...pyqForm })
            });

            const data = await response.json();
            if (data.success) {
                setSuccess("✅ PYQ uploaded successfully!");
                setPyqForm({
                    title: "",
                    subject: "",
                    branch: "",
                    semester: "",
                    examType: "Mid-1",
                    year: new Date().getFullYear(),
                    fileUrl: "",
                    fileType: "PDF"
                });
                setTimeout(() => setSuccess(""), 3000);
            } else {
                alert(data.message || "Failed to upload PYQ");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to upload PYQ");
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "notes", label: "Notes", icon: FileText },
        { id: "books", label: "Books", icon: BookOpen },
        { id: "pyqs", label: "PYQs", icon: HelpCircle }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/student/dashboard" className="text-gray-600 hover:text-gray-800">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Upload Content</h1>
                            <p className="text-sm text-gray-500">Share your study materials with the community</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <div className="max-w-4xl mx-auto px-4 pt-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-green-800 font-medium">{success}</span>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <div className="flex gap-2 border-b border-gray-200">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === tab.id
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Notes Form */}
                {activeTab === "notes" && (
                    <form onSubmit={handleNoteSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Notes</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={noteForm.title}
                                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Data Structures Chapter 1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    required
                                    value={noteForm.subject}
                                    onChange={(e) => setNoteForm({ ...noteForm, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Data Structures"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                                <select
                                    required
                                    value={noteForm.branch}
                                    onChange={(e) => setNoteForm({ ...noteForm, branch: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ME">ME</option>
                                    <option value="CE">CE</option>
                                    <option value="EE">EE</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                                <select
                                    required
                                    value={noteForm.semester}
                                    onChange={(e) => setNoteForm({ ...noteForm, semester: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <option key={sem} value={sem}>{sem}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">File Type *</label>
                                <select
                                    required
                                    value={noteForm.fileType}
                                    onChange={(e) => setNoteForm({ ...noteForm, fileType: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="PDF">PDF</option>
                                    <option value="DOC">DOC</option>
                                    <option value="PPT">PPT</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">File URL *</label>
                            <input
                                type="url"
                                required
                                value={noteForm.fileUrl}
                                onChange={(e) => setNoteForm({ ...noteForm, fileUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://drive.google.com/..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload file to Google Drive/Imgur and paste link here</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                            <textarea
                                value={noteForm.description}
                                onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows="3"
                                placeholder="Brief description of the notes..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Upload Note
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Books Form */}
                {activeTab === "books" && (
                    <form onSubmit={handleBookSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Book</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Book Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={bookForm.title}
                                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Introduction to Algorithms"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                                <input
                                    type="text"
                                    required
                                    value={bookForm.author}
                                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Thomas H. Cormen"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    required
                                    value={bookForm.subject}
                                    onChange={(e) => setBookForm({ ...bookForm, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Algorithms"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                                <select
                                    required
                                    value={bookForm.branch}
                                    onChange={(e) => setBookForm({ ...bookForm, branch: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ME">ME</option>
                                    <option value="CE">CE</option>
                                    <option value="EE">EE</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                                <select
                                    required
                                    value={bookForm.semester}
                                    onChange={(e) => setBookForm({ ...bookForm, semester: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <option key={sem} value={sem}>{sem}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">File Type *</label>
                                <select
                                    required
                                    value={bookForm.fileType}
                                    onChange={(e) => setBookForm({ ...bookForm, fileType: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="PDF">PDF</option>
                                    <option value="DOC">DOC</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">File URL *</label>
                            <input
                                type="url"
                                required
                                value={bookForm.fileUrl}
                                onChange={(e) => setBookForm({ ...bookForm, fileUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://drive.google.com/..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload file to Google Drive and paste link here</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                            <textarea
                                value={bookForm.description}
                                onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows="3"
                                placeholder="Brief description of the book..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Upload Book
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* PYQs Form */}
                {activeTab === "pyqs" && (
                    <form onSubmit={handlePyqSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload PYQ</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={pyqForm.title}
                                    onChange={(e) => setPyqForm({ ...pyqForm, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., DSA Mid-1 2023"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    required
                                    value={pyqForm.subject}
                                    onChange={(e) => setPyqForm({ ...pyqForm, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Data Structures"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                                <select
                                    required
                                    value={pyqForm.branch}
                                    onChange={(e) => setPyqForm({ ...pyqForm, branch: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ME">ME</option>
                                    <option value="CE">CE</option>
                                    <option value="EE">EE</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                                <select
                                    required
                                    value={pyqForm.semester}
                                    onChange={(e) => setPyqForm({ ...pyqForm, semester: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <option key={sem} value={sem}>{sem}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                                <select
                                    required
                                    value={pyqForm.examType}
                                    onChange={(e) => setPyqForm({ ...pyqForm, examType: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Mid-1">Mid-1</option>
                                    <option value="Mid-2">Mid-2</option>
                                    <option value="End Sem">End Sem</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                                <input
                                    type="number"
                                    required
                                    min="2000"
                                    max={new Date().getFullYear()}
                                    value={pyqForm.year}
                                    onChange={(e) => setPyqForm({ ...pyqForm, year: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="2023"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">File Type *</label>
                                <select
                                    required
                                    value={pyqForm.fileType}
                                    onChange={(e) => setPyqForm({ ...pyqForm, fileType: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="PDF">PDF</option>
                                    <option value="DOC">DOC</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">File URL *</label>
                            <input
                                type="url"
                                required
                                value={pyqForm.fileUrl}
                                onChange={(e) => setPyqForm({ ...pyqForm, fileUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://drive.google.com/..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload file to Google Drive and paste link here</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Upload PYQ
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
