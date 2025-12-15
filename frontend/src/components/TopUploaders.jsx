import React, { useEffect, useState } from "react";
import { User, Award, TrendingUp, Loader } from "lucide-react";

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

    const getRankStyles = (index) => {
        const styles = [
            { bg: "bg-gradient-to-br from-amber-50 to-yellow-50", border: "border-amber-200", badge: "bg-amber-500", text: "text-amber-700", icon: "bg-amber-100 text-amber-600" },
            { bg: "bg-gradient-to-br from-gray-50 to-slate-50", border: "border-gray-300", badge: "bg-gray-400", text: "text-gray-700", icon: "bg-gray-100 text-gray-600" },
            { bg: "bg-gradient-to-br from-orange-50 to-amber-50", border: "border-orange-200", badge: "bg-orange-500", text: "text-orange-700", icon: "bg-orange-100 text-orange-600" }
        ];
        return styles[index] || styles[2];
    };

    return (
        <div className="mb-8 px-4 sm:px-0">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                    <span>Top Contributors</span>
                </h3>
                <div className="text-xs text-gray-500 hidden sm:block">This Month</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {uploaders.map((user, index) => {
                    const styles = getRankStyles(index);
                    return (
                        <div
                            key={user.id}
                            className={`${styles.bg} rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 ${styles.border} shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer`}
                        >
                            {/* Rank Badge - Redesigned */}
                            <div className={`absolute -top-1 -right-1 ${styles.badge} text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-lg shadow-lg z-20`}>
                                {index + 1}
                            </div>

                            {/* Decorative Element */}
                            <div className={`absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 ${styles.icon} rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500`}></div>

                            {/* Content */}
                            <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                {/* Avatar */}
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${styles.icon} flex items-center justify-center font-bold text-xl md:text-2xl shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}>
                                    {user.fullName.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-bold ${styles.text} text-base md:text-lg truncate`}>
                                        {user.fullName}
                                    </h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm md:text-base text-gray-600 font-medium">
                                            {user.totalUploads} uploads
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trophy Icon for #1 */}
                            {index === 0 && (
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 opacity-15">
                                    <Award className="w-8 h-8 md:w-12 md:h-12 text-amber-500" />
                                </div>
                            )}

                            {/* Shine Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
