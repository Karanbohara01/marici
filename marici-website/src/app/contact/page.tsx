import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us | Marici Technology Pvt. Ltd.",
    description: "Partner with Marici Technology for your next big digital transformation. Reach out to our engineering hub in Kathmandu for enterprise IT solutions, AI engineering, and cloud architecture.",
    openGraph: {
        title: "Contact Marici Technology | Let's Start Something Big",
        description: "Submit a project inquiry to our technical specialists.",
    }
};

import connectToDatabase from "@/lib/mongoose";
import { SiteSettings } from "@/models/SiteSettings";

export const dynamic = "force-dynamic";

async function getSettings() {
    try {
        await connectToDatabase();
        const settings = await SiteSettings.findOne().lean();
        return JSON.parse(JSON.stringify(settings));
    } catch (error) {
        console.error("Failed to fetch settings during build:", error);
        return null;
    }
}

export default async function ContactPage() {
    const settings = await getSettings();
    return <ContactClient settings={settings} />;
}
