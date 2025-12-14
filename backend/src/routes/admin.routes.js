import express from "express";
import User from "../models/User.model.js";

const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find()
            .select("-password") // Don't send passwords
            .sort({ createdAt: -1 }); // Newest first

        res.json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

// Block/Unblock user
router.patch("/users/:id/block", async (req, res) => {
    try {
        const { id } = req.params;
        const { isBlocked } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
            user
        });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update user status",
            error: error.message
        });
    }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
});

// Get user statistics
router.get("/stats", async (req, res) => {
    try {
        // Dynamic imports to avoid potential circular dependency issues or just for clean scope if not used elsewhere
        const Note = (await import("../models/Note.model.js")).default;
        const Book = (await import("../models/Book.model.js")).default;
        const PYQ = (await import("../models/PYQ.model.js")).default;

        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isBlocked: false });
        // const blockedUsers = await User.countDocuments({ isBlocked: true }); // Unused in dashboard for now
        // const adminUsers = await User.countDocuments({ role: "admin" });
        // const studentUsers = await User.countDocuments({ role: "student" });
        // const teacherUsers = await User.countDocuments({ role: "teacher" });

        const totalNotes = await Note.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalPYQs = await PYQ.countDocuments();

        res.json({
            success: true,
            stats: {
                users: totalUsers,
                activeUsers: activeUsers,
                notes: totalNotes,
                books: totalBooks,
                pyqs: totalPYQs
            }
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch statistics",
            error: error.message
        });
    }
});

// ========== UPLOADER REQUEST MANAGEMENT ==========

// Get all uploader requests
router.get("/uploader-requests", async (req, res) => {
    try {
        const UploaderRequest = (await import("../models/UploaderRequest.model.js")).default;

        const requests = await UploaderRequest.find()
            .populate("userId", "fullName registrationNumber branch semester")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: requests.length,
            requests
        });
    } catch (error) {
        console.error("Error fetching uploader requests:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch requests",
            error: error.message
        });
    }
});

// Approve uploader request
router.patch("/uploader-requests/:id/approve", async (req, res) => {
    try {
        const UploaderRequest = (await import("../models/UploaderRequest.model.js")).default;
        const { id } = req.params;
        const { adminResponse } = req.body;

        const request = await UploaderRequest.findById(id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        // Update user to be an uploader
        await User.findByIdAndUpdate(request.userId, {
            isUploader: true
        });

        // Update request status
        request.status = "approved";
        request.adminResponse = adminResponse || "Your request has been approved!";
        request.reviewedAt = new Date();
        await request.save();

        res.json({
            success: true,
            message: "Request approved successfully",
            request
        });
    } catch (error) {
        console.error("Error approving request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to approve request",
            error: error.message
        });
    }
});

// Reject uploader request
router.patch("/uploader-requests/:id/reject", async (req, res) => {
    try {
        const UploaderRequest = (await import("../models/UploaderRequest.model.js")).default;
        const { id } = req.params;
        const { adminResponse } = req.body;

        const request = await UploaderRequest.findById(id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        // Update request status
        request.status = "rejected";
        request.adminResponse = adminResponse || "Your request has been rejected.";
        request.reviewedAt = new Date();
        await request.save();

        res.json({
            success: true,
            message: "Request rejected successfully",
            request
        });
    } catch (error) {
        console.error("Error rejecting request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to reject request",
            error: error.message
        });
    }
});

export default router;
