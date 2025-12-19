import React, { useEffect, useState } from "react";
import { User, Award, TrendingUp, Loader, Upload } from "lucide-react";

export default function TopUploaders() {
    const [uploaders, setUploaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopUploaders();
    }, []);

    const fetchTopUploaders = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const response = await fetch(`${API_URL}/api/upload/top-uploaders`);
            const data = await response.json();
            if (data.success) {
                setUploaders(data.topUploaders);
            }
        } catch (error) {
            console.error("Error fetching top uploaders:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center p-4">
            <Loader className="w-6 h-6 animate-spin text-indigo-500" />
        </div>
    );

    if (uploaders.length === 0) return null;

    const getRankIcon = (index) => {
        if (index === 0) return <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><Award size={20} /></div>; // Gold
        if (index === 1) return <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"><Award size={20} /></div>;   // Silver
        if (index === 2) return <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><Award size={20} /></div>; // Bronze
        return <span className="text-gray-500 font-bold w-8 text-center">{index + 1}</span>;
    };

    return (
        <div className="mb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                    <span>Top Contributors</span>
                </h3>
                <div className="text-sm text-gray-500">This Month</div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Rank</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Uploads</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {uploaders.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`
                                        transition-colors hover:bg-gray-50
                                        ${index === 0 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent' : ''}
                                        ${index === 1 ? 'bg-gradient-to-r from-gray-50/50 to-transparent' : ''}
                                        ${index === 2 ? 'bg-gradient-to-r from-orange-50/50 to-transparent' : ''}
                                    `}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getRankIcon(index)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                                {user.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{user.fullName}</div>
                                                <div className="text-xs text-gray-500">{user.role || "Student"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                                            <Upload className="w-3 h-3 mr-1.5" />
                                            {user.totalUploads}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {uploaders.map((user, index) => (
                    <div
                        key={user.id}
                        className={`
                            relative bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-4
                            ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-white ring-1 ring-yellow-200' : ''}
                            ${index === 1 ? 'bg-gradient-to-r from-gray-50 to-white ring-1 ring-gray-200' : ''}
                            ${index === 2 ? 'bg-gradient-to-r from-orange-50 to-white ring-1 ring-orange-200' : ''}
                        `}
                    >
                        {/* Rank Badge */}
                        <div className="flex-shrink-0">
                            {getRankIcon(index)}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{user.fullName}</h4>
                            <p className="text-xs text-gray-500">{user.role || "Student"}</p>
                        </div>

                        {/* Upload Count */}
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-sm font-bold text-indigo-600">
                                <Upload size={14} />
                                {user.totalUploads}
                            </div>
                            <span className="text-[10px] text-gray-400 uppercase font-medium">Uploads</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
