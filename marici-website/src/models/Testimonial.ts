import mongoose, { Schema, Document, models } from "mongoose";

export interface ITestimonial extends Document {
    name: string;
    role: string;
    content: string;
    avatarUrl: string;
    order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        content: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Testimonial = models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
