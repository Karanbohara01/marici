import connectToDatabase from "@/lib/mongoose";
import { SiteSettings } from "@/models/SiteSettings";

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
        const settings = await SiteSettings.findOne();
        if (settings && settings.stats && settings.stats.length > 0) {
            stats = settings.stats;
        }
    } catch (error) {
        console.error("Failed to fetch stats from settings for home page", error);
    }

    return (
        <section className="py-24 bg-slate-950 border-y border-slate-900">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center lg:items-start text-center lg:text-left px-8 ${index !== stats.length - 1 ? "lg:border-r border-slate-900" : ""
                                }`}
                        >
                            <div className="text-[11px] font-jet-mono font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                                {stat.label}
                            </div>
                            <div className="text-4xl md:text-6xl font-outfit font-black text-white tracking-tighter uppercase leading-none">
                                {stat.value}
                            </div>
                            <div className="mt-4 w-8 h-[2px] bg-blue-500/20 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
