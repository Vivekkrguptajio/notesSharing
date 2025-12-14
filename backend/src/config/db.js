import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("👉 Using Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
