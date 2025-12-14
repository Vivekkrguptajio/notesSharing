import express from "express";
import Download from "../models/Download.model.js";
import Note from "../models/Note.model.js";
import Book from "../models/Book.model.js";
import PYQ from "../models/PYQ.model.js";

const router = express.Router();

// Record a new download
router.post("/record", async (req, res) => {
    try {
        const { userId, itemId, itemType, itemTitle, itemSubject, fileType, fileUrl } = req.body;

        if (!userId || !itemId || !itemType) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Create download record
        const download = await Download.create({
            userId,
            itemId,
            itemType,
            itemTitle,
            itemSubject,
            fileType,
            fileUrl
        });

        // Increment download count in the original item
        if (itemType === "Note") {
            await Note.findByIdAndUpdate(itemId, { $inc: { downloads: 1 } });
        } else if (itemType === "Book") {
            await Book.findByIdAndUpdate(itemId, { $inc: { downloads: 1 } });
        } else if (itemType === "PYQ") {
            await PYQ.findByIdAndUpdate(itemId, { $inc: { downloads: 1 } });
        }

        res.status(201).json({
            success: true,
            message: "Download recorded successfully",
            download
        });
    } catch (error) {
        console.error("Error recording download:", error);
        res.status(500).json({
            success: false,
            message: "Failed to record download",
            error: error.message
        });
    }
});

// Get user's download history
router.get("/history/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const downloads = await Download.find({ userId }).sort({ downloadedAt: -1 });

        res.json({
            success: true,
            downloads
        });
    } catch (error) {
        console.error("Error fetching download history:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch download history",
            error: error.message
        });
    }
});

export default router;
