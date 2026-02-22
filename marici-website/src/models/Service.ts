import mongoose, { Schema, Document, models } from "mongoose";

export interface IService extends Document {
    title: string;
    slug: string;
    description: string;
    icon: string;
    features: string[];
    capabilities: {
        title: string;
        description: string;
    }[];
    order: number;
}

const ServiceSchema = new Schema<IService>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        features: [{ type: String }],
        capabilities: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Help Mongoose handle model re-compilation in Next.js development
if (process.env.NODE_ENV === "development") {
    delete (mongoose as any).models.Service;
}

export const Service = models.Service || mongoose.model<IService>("Service", ServiceSchema);
