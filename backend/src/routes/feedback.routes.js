import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Feedback from "../models/Feedback.model.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token." });
    }
};

// Create Feedback (Student)
router.post("/", verifyToken, async (req, res) => {
    try {
        const { type, subject, message } = req.body;

        // Fetch user to get name accurately
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const feedback = new Feedback({
            userId: user._id,
            userName: user.fullName,
            type,
            subject,
            message
        });

        await feedback.save();
        res.status(201).json({ success: true, message: "Feedback submitted successfully", feedback });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All Feedback (Admin only)
router.get("/all", verifyToken, async (req, res) => {
    try {
        // Check for admin (Handle hardcoded admin with ID "admin")
        if (req.user.id === "admin") {
            if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admin only." });
        } else {
            const user = await User.findById(req.user.id);
            if (!user || user.role !== "admin") {
                return res.status(403).json({ message: "Access denied. Admin only." });
            }
        }

        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json({ success: true, feedbacks });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Feedback Status (Admin only)
router.patch("/:id/status", verifyToken, async (req, res) => {
    try {
        // Check for admin (Handle hardcoded admin with ID "admin")
        if (req.user.id === "admin") {
            if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admin only." });
        } else {
            const user = await User.findById(req.user.id);
            if (!user || user.role !== "admin") {
                return res.status(403).json({ message: "Access denied. Admin only." });
            }
        }

        const { status } = req.body;
        if (!["Pending", "Reviewed", "Resolved"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!feedback) return res.status(404).json({ message: "Feedback not found" });

        res.json({ success: true, message: "Status updated", feedback });
    } catch (error) {
        console.error("Error updating feedback:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete Feedback (Admin only)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        // Check for admin (Handle hardcoded admin with ID "admin")
        if (req.user.id === "admin") {
            if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admin only." });
        } else {
            const user = await User.findById(req.user.id);
            if (!user || user.role !== "admin") {
                return res.status(403).json({ message: "Access denied. Admin only." });
            }
        }

        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Feedback deleted" });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
