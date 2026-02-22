import mongoose, { Schema, Document, models } from "mongoose";

export interface IHeroSlide extends Document {
    title: string;
    subtitle: string;
    imageUrl?: string;
    ctaText: string;
    ctaLink: string;
    order: number;
    isActive: boolean;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        imageUrl: { type: String },
        ctaText: { type: String, default: "Learn More" },
        ctaLink: { type: String, default: "#" },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const HeroSlide = models.HeroSlide || mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);
