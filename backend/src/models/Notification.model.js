import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["info", "alert", "success", "warning"],
            default: "info",
        },
        createdBy: {
            type: String, // Changed from ObjectId to allow "admin" string ID
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
