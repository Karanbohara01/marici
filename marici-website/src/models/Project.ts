import mongoose, { Schema, Document, models } from "mongoose";

export interface IProject extends Document {
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    link: string;
    order: number;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        imageUrl: { type: String, required: true },
        link: { type: String, required: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Help Mongoose handle model re-compilation in Next.js development
if (process.env.NODE_ENV === "development") {
    delete (mongoose as any).models.Project;
}

export const Project = models.Project || mongoose.model<IProject>("Project", ProjectSchema);
