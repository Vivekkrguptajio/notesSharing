import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // ✅ UNCOMMENT + IMPORT
import adminRoutes from "./routes/admin.routes.js"; // Admin routes
import uploaderRoutes from "./routes/uploader.routes.js"; // Uploader routes
import uploadRoutes from "./routes/upload.routes.js"; // Upload routes
import downloadRoutes from "./routes/download.routes.js"; // Download routes
import feedbackRoutes from "./routes/feedback.routes.js"; // Feedback routes
import noteRequestRoutes from "./routes/noteRequest.routes.js"; // Note Request routes
import notificationRoutes from "./routes/notification.routes.js"; // Notification routes

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.FRONTEND_URL,
        "https://notes-sharing-frontend.onrender.com",
        "https://notessharing-frontend.onrender.com",
        "https://notessharing-1.onrender.com" // Added specific blocked origin
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// ======================
// ROUTES
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Notes Sharing Backend Running",
  });
});

// 🔥 AUTH ROUTES (VERY IMPORTANT)
app.use("/api/auth", authRoutes);

// 🔥 ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// 🔥 UPLOADER ROUTES
app.use("/api/uploader", uploaderRoutes);

// 🔥 UPLOAD ROUTES
app.use("/api/upload", uploadRoutes);

// 🔥 DOWNLOAD ROUTES
app.use("/api/download", downloadRoutes);

// 🔥 FEEDBACK ROUTES
app.use("/api/feedback", feedbackRoutes);

// 🔥 NOTE REQUEST ROUTES
app.use("/api/note-requests", noteRequestRoutes);

// 🔥 NOTIFICATION ROUTES
app.use("/api/notifications", notificationRoutes);

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
