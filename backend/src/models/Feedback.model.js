import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Issue", "Feature"],
            required: true,
        },
        subject: {
            type: String,
            required: true,
            maxLength: 100,
        },
        message: {
            type: String,
            required: true,
            maxLength: 1000,
        },
        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Resolved"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
