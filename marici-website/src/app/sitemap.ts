import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://maricitechnologies.com";

    const staticRoutes = [
        { url: "", priority: 1, changeFrequency: "weekly" as const },
        { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
        { url: "/work", priority: 0.8, changeFrequency: "weekly" as const },
        { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
        { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
        { url: "/careers", priority: 0.6, changeFrequency: "weekly" as const },
        { url: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
        { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    ];
    return staticRoutes.map((route) => ({
        url: `${baseUrl}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
