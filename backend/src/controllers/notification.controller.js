import { Notification } from "../models/Notification.model.js";

const createNotification = async (req, res) => {
    try {
        const { title, message, type } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                success: false,
                message: "Title and message are required",
            });
        }

        const notification = await Notification.create({
            title,
            message,
            type: type || "info",
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification,
        });
    } catch (error) {
        console.error("Create Notification Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getNotifications = async (req, res) => {
    try {
        // Get latest 20 notifications
        const notifications = await Notification.find()
            .sort({ createdAt: -1 })
            .limit(20);

        return res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            data: notifications,
        });
    } catch (error) {
        console.error("Get Notifications Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export { createNotification, getNotifications };
