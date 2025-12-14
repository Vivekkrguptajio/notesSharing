import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
        },

        branch: {
            type: String,
            required: true,
        },

        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 8,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        fileType: {
            type: String,
            enum: ["PDF", "DOC", "PPT"],
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        uploaderName: {
            type: String,
            required: true,
        },

        downloads: {
            type: Number,
            default: 0,
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
