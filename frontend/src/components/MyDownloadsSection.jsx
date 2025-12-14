import React, { useState, useEffect } from "react";
import { ExternalLink, Clock } from "lucide-react";

export default function MyDownloadsSection({ userId, onCountsUpdate }) {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchDownloads();
        }
    }, [userId]);

    const fetchDownloads = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/download/history/${userId}`);
            const data = await response.json();

            if (data.success) {
                setDownloads(data.downloads);
                if (onCountsUpdate) {
                    onCountsUpdate({ total: data.downloads.length });
                }
            }
        } catch (error) {
            console.error("Error fetching downloads:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-center text-gray-500">Loading download history...</p>
            </div>
        );
    }

    if (downloads.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center text-gray-500">
                No downloads yet. Explore content to start downloading!
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Download History</h3>

            <div className="space-y-4">
                {downloads.map((item) => (
                    <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center justify-between">
                        <div className="flex-1 min-w-0 mr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900">{item.itemTitle}</h4>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    {item.itemType}
                                </span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {item.fileType}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                                <span>{item.itemSubject}</span>
                                <span className="text-gray-300">•</span>
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock size={12} />
                                    {new Date(item.downloadedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="Open File"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
