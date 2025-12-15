import express from "express";
import NoteRequest from "../models/NoteRequest.model.js";
import User from "../models/User.model.js";

const router = express.Router();

// Create a new note request (Student)
router.post("/", async (req, res) => {
    try {
        const { requestedBy, requesterName, subject, topic, description, branch, semester } = req.body;

        // Validate required fields
        if (!requestedBy || !requesterName || !subject || !topic || !branch || !semester) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const noteRequest = new NoteRequest({
            requestedBy,
            requesterName,
            subject,
            topic,
            description,
            branch,
            semester
        });

        await noteRequest.save();

        res.status(201).json({
            success: true,
            message: "Note request created successfully",
            request: noteRequest
        });
    } catch (error) {
        console.error("Error creating note request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create note request",
            error: error.message
        });
    }
});

// Get student's requests
router.get("/student/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const requests = await NoteRequest.find({ requestedBy: userId })
            .sort({ createdAt: -1 })
            .populate("fulfilledBy", "fullName");

        res.json({
            success: true,
            requests
        });
    } catch (error) {
        console.error("Error fetching student requests:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch requests",
            error: error.message
        });
    }
});

// Get all pending requests for uploaders
router.get("/uploader", async (req, res) => {
    try {
        const requests = await NoteRequest.find({ status: "pending" })
            .sort({ createdAt: -1 })
            .populate("requestedBy", "fullName registrationNumber");

        res.json({
            success: true,
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

// Mark request as fulfilled
router.patch("/:id/fulfill", async (req, res) => {
    try {
        const { id } = req.params;
        const { fulfilledBy, fulfilledWith, fulfilledWithType } = req.body;

        const request = await NoteRequest.findByIdAndUpdate(
            id,
            {
                status: "fulfilled",
                fulfilledBy,
                fulfilledWith,
                fulfilledWithType
            },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        res.json({
            success: true,
            message: "Request marked as fulfilled",
            request
        });
    } catch (error) {
        console.error("Error fulfilling request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fulfill request",
            error: error.message
        });
    }
});

// Delete/dismiss request
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const request = await NoteRequest.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        res.json({
            success: true,
            message: "Request dismissed successfully"
        });
    } catch (error) {
        console.error("Error dismissing request:", error);
        res.status(500).json({
            success: false,
            message: "Failed to dismiss request",
            error: error.message
        });
    }
});

// Get count of pending requests (for badge)
router.get("/count/pending", async (req, res) => {
    try {
        const count = await NoteRequest.countDocuments({ status: "pending" });

        res.json({
            success: true,
            count
        });
    } catch (error) {
        console.error("Error counting requests:", error);
        res.status(500).json({
            success: false,
            message: "Failed to count requests",
            error: error.message
        });
    }
});

export default router;
