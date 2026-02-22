import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        company: {
            type: String,
            trim: true,
            maxlength: [100, "Company name cannot exceed 100 characters"],
        },
        phone: {
            type: String,
            trim: true,
            maxlength: [20, "Phone number cannot exceed 20 characters"],
        },
        service: {
            type: String,
            required: [true, "Please select a service of interest"],
            enum: [
                "Web & Mobile Engineering",
                "AI & Machine Learning",
                "Cloud Infrastructure",
                "Data Engineering",
                "Enterprise Architecture",
                "Cybersecurity",
                "Other",
            ],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            minlength: [10, "Message must be at least 10 characters"],
            maxlength: [1000, "Message cannot exceed 1000 characters"],
        },
        status: {
            type: String,
            enum: ["New", "In Progress", "Completed"],
            default: "New",
        },
    },
    { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
