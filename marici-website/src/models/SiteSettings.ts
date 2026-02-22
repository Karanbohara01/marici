import mongoose, { Schema, Document, models } from "mongoose";

export interface IStat {
    value: string;
    label: string;
}

export interface ISiteSettings extends Document {
    email: string;
    phone: string;
    address: string;
    facebookUrl?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    stats?: IStat[];
    privacyPolicy?: string;
    termsOfService?: string;
    whatsappNumber?: string;
}

const defaultStats = [
    { value: "150+", label: "Global Customers" },
    { value: "99.99%", label: "Platform Uptime" },
    { value: "50M+", label: "Queries Per Second" },
    { value: "10+", label: "Years Innovating" },
];

const SiteSettingsSchema = new Schema<ISiteSettings>(
    {
        email: { type: String, default: "contact@maricitech.com" },
        phone: { type: String, default: "+91 98765 43210" },
        address: { type: String, default: "123 Tech Park, Innovation City" },
        facebookUrl: String,
        twitterUrl: String,
        linkedinUrl: String,
        instagramUrl: String,
        stats: {
            type: [{ value: String, label: String }],
            default: defaultStats
        },
        privacyPolicy: String,
        termsOfService: String,
        whatsappNumber: { type: String, default: "919876543210" },
    },
    { timestamps: true }
);

if (models.SiteSettings) {
    delete (models as any).SiteSettings;
}
export const SiteSettings = mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
