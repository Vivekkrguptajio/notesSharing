import express from "express";
import Note from "../models/Note.model.js";
import Book from "../models/Book.model.js";
import PYQ from "../models/PYQ.model.js";
import User from "../models/User.model.js";

const router = express.Router();

// Upload Note
router.post("/note", async (req, res) => {
    try {
        const { userId, title, subject, branch, semester, fileUrl, fileType, description } = req.body;

        // Validate required fields
        if (!userId || !title || !subject || !branch || !semester || !fileUrl || !fileType) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Check if user is an uploader
        const user = await User.findById(userId);
        if (!user || !user.isUploader) {
            return res.status(403).json({
                success: false,
                message: "Only approved uploaders can upload content"
            });
        }

        // Create note
        const note = await Note.create({
            title,
            subject,
            branch,
            semester,
            fileUrl,
            fileType,
            description: description || "",
            uploadedBy: userId,
            uploaderName: user.fullName
        });

        res.status(201).json({
            success: true,
            message: "Note uploaded successfully!",
            note
        });
    } catch (error) {
        console.error("Error uploading note:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload note",
            error: error.message
        });
    }
});

// Upload Book
router.post("/book", async (req, res) => {
    try {
        const { userId, title, author, subject, branch, semester, fileUrl, fileType, description } = req.body;

        // Validate required fields
        if (!userId || !title || !author || !subject || !branch || !semester || !fileUrl || !fileType) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Check if user is an uploader
        const user = await User.findById(userId);
        if (!user || !user.isUploader) {
            return res.status(403).json({
                success: false,
                message: "Only approved uploaders can upload content"
            });
        }

        // Create book
        const book = await Book.create({
            title,
            author,
            subject,
            branch,
            semester,
            fileUrl,
            fileType,
            description: description || "",
            uploadedBy: userId,
            uploaderName: user.fullName
        });

        res.status(201).json({
            success: true,
            message: "Book uploaded successfully!",
            book
        });
    } catch (error) {
        console.error("Error uploading book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload book",
            error: error.message
        });
    }
});

// Upload PYQ
router.post("/pyq", async (req, res) => {
    try {
        const { userId, title, subject, branch, semester, examType, year, fileUrl, fileType } = req.body;

        // Validate required fields
        if (!userId || !title || !subject || !branch || !semester || !examType || !year || !fileUrl || !fileType) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        // Check if user is an uploader
        const user = await User.findById(userId);
        if (!user || !user.isUploader) {
            return res.status(403).json({
                success: false,
                message: "Only approved uploaders can upload content"
            });
        }

        // Create PYQ
        const pyq = await PYQ.create({
            title,
            subject,
            branch,
            semester,
            examType,
            year,
            fileUrl,
            fileType,
            uploadedBy: userId,
            uploaderName: user.fullName
        });

        res.status(201).json({
            success: true,
            message: "PYQ uploaded successfully!",
            pyq
        });
    } catch (error) {
        console.error("Error uploading PYQ:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload PYQ",
            error: error.message
        });
    }
});

// ========== PUBLIC FETCH ROUTES ==========

// Get all Notes
router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json({ success: true, notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ success: false, message: "Failed to fetch notes" });
    }
});

// Get all Books
router.get("/books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json({ success: true, books });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ success: false, message: "Failed to fetch books" });
    }
});

// Get all PYQs
router.get("/pyqs", async (req, res) => {
    try {
        const pyqs = await PYQ.find().sort({ createdAt: -1 });
        res.json({ success: true, pyqs });
    } catch (error) {
        console.error("Error fetching pyqs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch pyqs" });
    }
});

// ========== MY UPLOADS MANAGEMENT ==========

// Get user's uploads
router.get("/my-uploads/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const notes = await Note.find({ uploadedBy: userId }).sort({ createdAt: -1 });
        const books = await Book.find({ uploadedBy: userId }).sort({ createdAt: -1 });
        const pyqs = await PYQ.find({ uploadedBy: userId }).sort({ createdAt: -1 });

        res.json({
            success: true,
            uploads: {
                notes,
                books,
                pyqs
            },
            counts: {
                notes: notes.length,
                books: books.length,
                pyqs: pyqs.length,
                total: notes.length + books.length + pyqs.length
            }
        });
    } catch (error) {
        console.error("Error fetching uploads:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch uploads",
            error: error.message
        });
    }
});

// Update Note
router.put("/note/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subject, branch, semester, fileUrl, fileType, description } = req.body;

        const note = await Note.findByIdAndUpdate(
            id,
            { title, subject, branch, semester, fileUrl, fileType, description },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            error: error.message
        });
    }
});

// Update Book
router.put("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, subject, branch, semester, fileUrl, fileType, description } = req.body;

        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, subject, branch, semester, fileUrl, fileType, description },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.json({
            success: true,
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error: error.message
        });
    }
});

// Update PYQ
router.put("/pyq/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subject, branch, semester, examType, year, fileUrl, fileType } = req.body;

        const pyq = await PYQ.findByIdAndUpdate(
            id,
            { title, subject, branch, semester, examType, year, fileUrl, fileType },
            { new: true }
        );

        if (!pyq) {
            return res.status(404).json({
                success: false,
                message: "PYQ not found"
            });
        }

        res.json({
            success: true,
            message: "PYQ updated successfully",
            pyq
        });
    } catch (error) {
        console.error("Error updating PYQ:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update PYQ",
            error: error.message
        });
    }
});

// Delete Note
router.delete("/note/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
            error: error.message
        });
    }
});

// Delete Book
router.delete("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: error.message
        });
    }
});

// Delete PYQ
router.delete("/pyq/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pyq = await PYQ.findByIdAndDelete(id);

        if (!pyq) {
            return res.status(404).json({
                success: false,
                message: "PYQ not found"
            });
        }

        res.json({
            success: true,
            message: "PYQ deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting PYQ:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete PYQ",
            error: error.message
        });
    }
});

export default router;
