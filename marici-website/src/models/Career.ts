import mongoose, { Schema, model, models } from "mongoose";

const CareerSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        department: { type: String, required: true },
        location: { type: String, required: true },
        type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Remote"], default: "Full-time" },
        description: { type: String, required: true },
        requirements: [{ type: String }],
        status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    },
    { timestamps: true }
);

const Career = models.Career || model("Career", CareerSchema);
export default Career;
