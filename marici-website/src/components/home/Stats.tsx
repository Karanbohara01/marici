import connectToDatabase from "@/lib/mongoose";
import { SiteSettings } from "@/models/SiteSettings";
import StatsClient from "./StatsClient";

// A fallback in case the database is empty or not seeded yet
const defaultStats = [
    { value: "150+", label: "Global Clients" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "50M+", label: "Req / Second" },
    { value: "12+", label: "Years Lead" },
];

export default async function Stats() {
    let stats = defaultStats;

    try {
        await connectToDatabase();
        const settings = await SiteSettings.findOne().lean();
        if (settings && settings.stats && settings.stats.length > 0) {
            stats = JSON.parse(JSON.stringify(settings.stats));
        }
    } catch (error) {
        console.error("Failed to fetch stats from settings for home page", error);
    }

    return <StatsClient stats={stats} />;
}
