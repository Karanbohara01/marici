import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | Marici Technology Pvt. Ltd.",
    description: "Learn about Marici Technology's mission, our executive council, and our commitment to engineering enterprise-grade software with human-centric design.",
    openGraph: {
        title: "About Marici Technology | Engineering for Ambition",
        description: "We bridge the gap between complex engineering and human-centric design.",
    }
};

import connectToDatabase from "@/lib/mongoose";
import { TeamMember } from "@/models/TeamMember";

export const dynamic = "force-dynamic";

async function getTeam() {
    try {
        await connectToDatabase();
        const team = await TeamMember.find().sort({ order: 1, name: 1 }).lean();
        return JSON.parse(JSON.stringify(team));
    } catch (error) {
        console.error("Failed to fetch team during build:", error);
        return [];
    }
}

export default async function AboutPage() {
    const team = await getTeam();
    return <AboutClient team={team} />;
}
