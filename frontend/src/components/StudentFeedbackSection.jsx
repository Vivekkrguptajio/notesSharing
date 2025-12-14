import React, { useState } from "react";
import { Send, AlertCircle, Lightbulb, CheckCircle, Clock } from "lucide-react";
import { getCurrentUser } from "../api/auth.api";

export default function StudentFeedbackSection() {
    const [type, setType] = useState("Issue"); // Issue or Feature
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const token = localStorage.getItem("token");
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await fetch(`${API_URL}/api/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ type, subject, message })
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMsg("Feedback submitted successfully! Admin will review it soon.");
                setSubject("");
                setMessage("");
                // Optional: Reset Type default
            } else {
                setErrorMsg(data.message || "Failed to submit feedback.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setErrorMsg("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Send className="w-5 h-5" /> Help & Feedback
                </h3>
                <p className="text-blue-100 text-sm mt-1">Report bugs or request new features.</p>
            </div>

            <div className="p-6">
                {successMsg && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> {successMsg}
                    </div>
                )}

                {errorMsg && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Feedback Type Toggle */}
                    <div className="flex gap-4 mb-2">
                        <label className={`flex-1 cursor-pointer border rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${type === "Issue" ? "bg-red-50 border-red-200 text-red-700 ring-2 ring-red-200" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"}`}>
                            <input
                                type="radio"
                                name="feedbackType"
                                value="Issue"
                                checked={type === "Issue"}
                                onChange={(e) => setType(e.target.value)}
                                className="hidden"
                            />
                            <AlertCircle className={`w-6 h-6 ${type === "Issue" ? "text-red-500" : "text-gray-400"}`} />
                            <span className="font-medium text-sm">Report an Issue</span>
                        </label>

                        <label className={`flex-1 cursor-pointer border rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${type === "Feature" ? "bg-amber-50 border-amber-200 text-amber-700 ring-2 ring-amber-200" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"}`}>
                            <input
                                type="radio"
                                name="feedbackType"
                                value="Feature"
                                checked={type === "Feature"}
                                onChange={(e) => setType(e.target.value)}
                                className="hidden"
                            />
                            <Lightbulb className={`w-6 h-6 ${type === "Feature" ? "text-amber-500" : "text-gray-400"}`} />
                            <span className="font-medium text-sm">Request Feature</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder={type === "Issue" ? "e.g., Upload failed..." : "e.g., Dark mode..."}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            required
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Describe your issue or idea in detail..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Clock className="w-5 h-5 animate-spin" /> Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" /> Submit Feedback
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
