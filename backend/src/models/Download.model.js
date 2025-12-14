import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        itemType: {
            type: String,
            enum: ["Note", "Book", "PYQ"],
            required: true,
        },
        itemTitle: {
            type: String,
            required: true,
        },
        itemSubject: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
        downloadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Download", downloadSchema);
