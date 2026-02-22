import mongoose, { Schema, Document, models } from "mongoose";

export interface ITeamMember extends Document {
    name: string;
    role: string;
    imageUrl: string;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
    order: number;
}

const TeamMemberSchema = new Schema<ITeamMember>(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        imageUrl: { type: String, required: true },
        socialLinks: {
            linkedin: String,
            twitter: String,
            github: String,
        },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const TeamMember = models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
