import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './src/app.js';

// Load environment variables
dotenv.config();

/* =======================
   MongoDB Connection
======================= */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📦 Database Name: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

connectDB();

/* =======================
   Start Server
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
});

/* =======================
   Unhandled Promise Rejection
======================= */
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});
