import mongoose from "mongoose";

const uploaderRequestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        idCardUrl: {
            type: String,
            required: true,
        },

        reason: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        adminResponse: {
            type: String,
            default: "",
        },

        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        reviewedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

export default mongoose.model("UploaderRequest", uploaderRequestSchema);
