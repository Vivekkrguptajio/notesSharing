import React, { useState, useEffect, useRef } from "react";
import { Bell, Info, AlertCircle, CheckCircle, X } from "lucide-react";

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(false); // Can be enhanced with local storage or backend tracking
    const menuRef = useRef(null);

    const toggleMenu = () => {
        if (!isOpen) {
            fetchNotifications();
        }
        setIsOpen(!isOpen);
    };

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`);
            const data = await response.json();
            if (data.success) {
                setNotifications(data.data);
                // Simple unread logic: If latest notification is newer than stored timestamp
                const lastRead = localStorage.getItem("lastReadNotificationTime");
                if (data.data.length > 0) {
                    const latestTime = new Date(data.data[0].createdAt).getTime();
                    if (!lastRead || latestTime > parseInt(lastRead)) {
                        // For now, we just clear the indicator when opened
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Check for updates on mount (optional, to show red dot)
    useEffect(() => {
        // Could fetch just count or check metadata here.
        // For simplicity, let's just fetch once on mount to see if there are any recent ones? 
        // Or just leave it as click-to-view.
        // Let's implement a simple "New" indicator based on local storage.
        const checkNew = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`);
                const data = await response.json();
                if (data.success && data.data.length > 0) {
                    const lastRead = localStorage.getItem("lastReadNotificationTime");
                    const latestTime = new Date(data.data[0].createdAt).getTime();
                    if (!lastRead || latestTime > parseInt(lastRead)) {
                        setHasUnread(true);
                    }
                }
            } catch (e) { }
        }
        checkNew();
    }, []);

    const handleOpen = () => {
        toggleMenu();
        if (hasUnread) {
            setHasUnread(false);
            localStorage.setItem("lastReadNotificationTime", Date.now().toString());
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case "alert":
                return <AlertCircle className="text-red-500 min-w-[16px]" size={16} />;
            case "success":
                return <CheckCircle className="text-green-500 min-w-[16px]" size={16} />;
            case "warning":
                return <AlertCircle className="text-yellow-500 min-w-[16px]" size={16} />;
            default:
                return <Info className="text-blue-500 min-w-[16px]" size={16} />;
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={handleOpen}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative"
                aria-label="Notifications"
            >
                <Bell size={20} />
                {hasUnread && (
                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 origin-top-right transform transition-all max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 backdrop-blur-sm">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={16} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">No notifications yet</div>
                    ) : (
                        <div>
                            {notifications.map((notif) => (
                                <div
                                    key={notif._id}
                                    className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors flex gap-3 items-start"
                                >
                                    <div className="mt-1">{getTypeIcon(notif.type)}</div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{notif.title}</h4>
                                        <p className="text-sm text-gray-600 mt-0.5 line-clamp-3">{notif.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
