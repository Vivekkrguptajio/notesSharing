import Notification from "../models/Notification.model.js";

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

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        console.error("Delete Notification Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message, type } = req.body;

        const notification = await Notification.findByIdAndUpdate(
            id,
            { title, message, type },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification updated successfully",
            data: notification,
        });
    } catch (error) {
        console.error("Update Notification Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export { createNotification, getNotifications, deleteNotification, updateNotification };
