import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // ✅ UNCOMMENT + IMPORT
import adminRoutes from "./routes/admin.routes.js"; // Admin routes
import uploaderRoutes from "./routes/uploader.routes.js"; // Uploader routes
import uploadRoutes from "./routes/upload.routes.js"; // Upload routes
import downloadRoutes from "./routes/download.routes.js"; // Download routes
import feedbackRoutes from "./routes/feedback.routes.js"; // Feedback routes

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

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
