import express from "express";
import UploaderRequest from "../models/UploaderRequest.model.js";
import User from "../models/User.model.js";

const router = express.Router();

// Submit uploader request
router.post("/request", async (req, res) => {
    try {
        const { userId, fullName, email, phoneNumber, idCardUrl, reason } = req.body;

        // Check if user already has a pending request
        const existingRequest = await UploaderRequest.findOne({
            userId,
            status: "pending"
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "You already have a pending request"
            });
        }

        // Check if user is already an uploader
        const user = await User.findById(userId);
        if (user && user.isUploader) {
            return res.status(400).json({
                success: false,
                message: "You are already an uploader"
            });
        }

        const request = await UploaderRequest.create({
            userId,
            fullName,
            email,
            phoneNumber,
            idCardUrl,
            reason
        });

        res.status(201).json({
            success: true,
            message: "Request submitted successfully! Admin will review it soon.",
            request
        });
    } catch (error) {
        console.error("Error submitting uploader request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit request",
            error: error.message
        });
    }
});

// Get user's request status
router.get("/request/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const request = await UploaderRequest.findOne({ userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            request
        });
    } catch (error) {
        console.error("Error fetching request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch request",
            error: error.message
        });
    }
});

export default router;
