import connectToDatabase from "@/lib/mongoose";
import { SiteSettings } from "@/models/SiteSettings";

// A fallback in case the database is empty or not seeded yet
const defaultStats = [
    { value: "150+", label: "Global Customers" },
    { value: "99.99%", label: "Platform Uptime" },
    { value: "50M+", label: "Queries Per Second" },
    { value: "10+", label: "Years Innovating" },
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
        <section className="py-12 bg-white border-t border-gray-50">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`p-12 flex flex-col items-center text-center group transition-colors hover:bg-gray-50 ${index !== stats.length - 1 ? "lg:border-r border-gray-100" : ""
                                } ${index % 2 === 0 ? "border-r md:border-r-0" : ""}`}
                        >
                            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#254796] mb-6 font-bold">
                                {stat.label}
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-[#254796] tracking-tighter mb-4 uppercase">
                                {stat.value}
                            </div>

                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
