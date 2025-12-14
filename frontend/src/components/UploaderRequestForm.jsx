import React, { useState } from "react";
import { X, Upload, Mail, Phone, IdCard, AlertCircle } from "lucide-react";

export default function UploaderRequestForm({ onClose, userId, userFullName }) {
    const [formData, setFormData] = useState({
        fullName: userFullName || "",
        email: "",
        phoneNumber: "",
        idCardUrl: "",
        reason: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        console.log("📝 Submitting uploader request...");
        console.log("User ID:", userId);
        console.log("Form data:", formData);

        try {
            const requestBody = {
                userId,
                ...formData
            };

            console.log("📤 Request body:", requestBody);

            const response = await fetch("http://localhost:5000/api/uploader/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            console.log("📡 Response status:", response.status);
            const data = await response.json();
            console.log("📦 Response data:", data);

            if (data.success) {
                alert("✅ Request submitted successfully! Admin will review it soon.");
                onClose();
            } else {
                setError(data.message || "Failed to submit request");
            }
        } catch (error) {
            console.error("❌ Error submitting request:", error);
            setError("Failed to submit request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Become an Uploader</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Info Alert */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Why become an uploader?</p>
                            <p className="text-blue-700">
                                As an uploader, you can share notes, books, and PYQs with the community.
                                Admin will verify your details before approval.
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                            {error}
                        </div>
                    )}

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail size={16} className="inline mr-1" />
                            Email Address *
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Phone size={16} className="inline mr-1" />
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>

                    {/* ID Card URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <IdCard size={16} className="inline mr-1" />
                            College ID Card URL *
                        </label>
                        <input
                            type="url"
                            required
                            value={formData.idCardUrl}
                            onChange={(e) => setFormData({ ...formData, idCardUrl: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/id-card.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload your ID card to a service like Imgur or Google Drive and paste the link here
                        </p>
                    </div>

                    {/* Reason (Optional) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Why do you want to become an uploader? (Optional)
                        </label>
                        <textarea
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="3"
                            placeholder="Tell us why you want to contribute..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Upload size={18} />
                                    Submit Request
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
