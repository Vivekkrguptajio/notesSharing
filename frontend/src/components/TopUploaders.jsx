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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {uploaders.map((user, index) => {
                    const styles = getRankStyles(index);
                    return (
                        <div
                            key={user.id}
                            className={`${styles.bg} rounded-2xl p-3 sm:p-4 border-2 ${styles.border} shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
                        >
                            {/* Rank Badge - Redesigned */}
                            <div className={`absolute -top-1 -right-1 ${styles.badge} text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md z-20`}>
                                {index + 1}
                            </div>

                            {/* Decorative Element */}
                            <div className={`absolute -bottom-4 -right-4 w-20 h-20 ${styles.icon} rounded-full opacity-10 group-hover:scale-110 transition-transform`}></div>

                            {/* Content */}
                            <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
                                {/* Avatar */}
                                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${styles.icon} flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm flex-shrink-0`}>
                                    {user.fullName.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-bold ${styles.text} text-sm sm:text-base truncate`}>
                                        {user.fullName}
                                    </h4>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <TrendingUp className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                            {user.totalUploads} uploads
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trophy Icon for #1 */}
                            {index === 0 && (
                                <div className="absolute top-2 left-2 opacity-20">
                                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
