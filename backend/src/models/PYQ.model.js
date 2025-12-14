import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema(
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

        examType: {
            type: String,
            enum: ["Mid-1", "Mid-2", "End Sem"],
            required: true,
        },

        year: {
            type: Number,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        fileType: {
            type: String,
            enum: ["PDF", "DOC"],
            required: true,
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
    },
    { timestamps: true }
);

export default mongoose.model("PYQ", pyqSchema);
