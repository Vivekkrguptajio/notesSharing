import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ======================
// ENV CONFIG
// ======================
dotenv.config();

// ======================
// APP INIT
// ======================
const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // production me frontend URL dena
    credentials: true,
  })
);

// ======================
// MONGODB CONNECTION
// ======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
    console.log("📦 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ======================
// ROUTES (TEMP)
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Notes Sharing Backend Running",
    environment: process.env.NODE_ENV,
  });
});

// ======================
// API ROUTES (future use)
// ======================
// app.use("/api/auth", authRoutes);
// app.use("/api/notes", notesRoutes);
// app.use("/api/admin", adminRoutes);

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

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
