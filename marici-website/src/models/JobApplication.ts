import mongoose, { Schema, model, models } from "mongoose";

const JobApplicationSchema = new Schema(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "Career", required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        resumeUrl: { type: String, required: true },
        coverLetter: { type: String },
        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"],
            default: "Pending"
        },
    },
    { timestamps: true }
);

const JobApplication = models.JobApplication || model("JobApplication", JobApplicationSchema);
export default JobApplication;
