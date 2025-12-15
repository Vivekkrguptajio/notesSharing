import mongoose from "mongoose";

const noteRequestSchema = new mongoose.Schema(
    {
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        requesterName: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        branch: {
            type: String,
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "fulfilled", "dismissed"],
            default: "pending",
        },
        fulfilledBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        fulfilledWith: {
            type: mongoose.Schema.Types.ObjectId,
        },
        fulfilledWithType: {
            type: String,
            enum: ["Note", "Book", "PYQ"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("NoteRequest", noteRequestSchema);
