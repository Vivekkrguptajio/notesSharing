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

// Get Public Stats (For Hero Section)
router.get("/public-stats", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isBlocked: false }); // Or just use totalUsers as "Trusted by"

        const totalNotes = await Note.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalPYQs = await PYQ.countDocuments();

        // Calculate unique subjects (simplified approach using Sets)
        const noteSubjects = await Note.distinct("subject");
        const bookSubjects = await Book.distinct("subject");
        const pyqSubjects = await PYQ.distinct("subject");

        // Normalize subjects to title case or lowercase to avoid duplicates like "Math" vs "math" if needed
        // For now, assuming direct distinct is fine
        const uniqueSubjects = new Set([
            ...noteSubjects,
            ...bookSubjects,
            ...pyqSubjects
        ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                activeUsers,
                totalNotes: totalNotes + totalBooks + totalPYQs, // Aggregate for "Notes Shared" or keep separate? 
                // Hero says "Notes Shared", let's use Total Resources? 
                // Or just Notes. Let's return individual too.
                notesCount: totalNotes,
                resourcesCount: totalNotes + totalBooks + totalPYQs,
                subjectsCount: uniqueSubjects.size
            }
        });
    } catch (error) {
        console.error("Error fetching public stats:", error);
        res.status(500).json({ success: false, message: "Failed to fetch stats" });
    }
});

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

// Increment View Count
router.patch("/view/:type/:id", async (req, res) => {
    try {
        const { type, id } = req.params;
        let Model;

        if (type === "note") Model = Note;
        else if (type === "book") Model = Book;
        else if (type === "pyq") Model = PYQ;
        else return res.status(400).json({ success: false, message: "Invalid type" });

        const item = await Model.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, views: item.views });
    } catch (error) {
        console.error("Error incrementing view:", error);
        res.status(500).json({ success: false, message: "Failed to increment view" });
    }
});

// Convert Resource Type
router.post("/convert", async (req, res) => {
    try {
        const { id, oldType, newType, data } = req.body;

        if (!id || !oldType || !newType || !data) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // 1. Identify Models
        const getModel = (t) => {
            if (t === "note") return Note;
            if (t === "book") return Book;
            if (t === "pyq") return PYQ;
            return null;
        };

        const OldModel = getModel(oldType);
        const NewModel = getModel(newType);

        if (!OldModel || !NewModel) {
            return res.status(400).json({ success: false, message: "Invalid type" });
        }

        // 2. Find and Verify Old Document
        const oldDoc = await OldModel.findById(id);
        if (!oldDoc) {
            return res.status(404).json({ success: false, message: "Original item not found" });
        }

        // 3. Create New Document
        // We merge oldDoc details (like uploader info, stats) with new data
        const newDocData = {
            ...data, // New user inputs (title, subject, branch, etc.)
            uploadedBy: oldDoc.uploadedBy,
            uploaderName: oldDoc.uploaderName,
            downloads: oldDoc.downloads,
            views: oldDoc.views || 0,
            // Ensure PYQ specific fields are present if target is PYQ
            ...(newType === "pyq" ? {
                examType: data.examType || "Mid-1",
                year: data.year || new Date().getFullYear()
            } : {}),
            // Ensure Book specific fields
            ...(newType === "book" ? {
                author: data.author || "Unknown"
            } : {})
        };

        // Remove immutable fields to avoid conflicts/errors
        delete newDocData._id;
        delete newDocData.__v;
        delete newDocData.createdAt;
        delete newDocData.updatedAt;
        delete newDocData.typeSelected; // Helper field from frontend

        const newDoc = await NewModel.create(newDocData);

        // 4. Delete Old Document
        await OldModel.findByIdAndDelete(id);

        res.status(201).json({
            success: true,
            message: "Resource converted successfully",
            newItem: newDoc
        });

    } catch (error) {
        console.error("Error converting resource:", error);
        res.status(500).json({ success: false, message: "Failed to convert resource", error: error.message });
    }
});

export default router;
