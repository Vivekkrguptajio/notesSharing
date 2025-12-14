import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/student/dashboard" className="text-gray-600 hover:text-gray-800">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Upload Content</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Upload Feature Coming Soon!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You're an approved uploader. The upload functionality will be available soon.
                    </p>
                    <Link
                        to="/student/dashboard"
                        className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
