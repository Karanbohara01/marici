import type { Metadata } from "next";
import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "IT Services & Solutions | Marici Technology",
    description: "Enterprise-grade IT services including Web & Mobile Engineering, AI & Machine Learning, Cloud Infrastructure, and Data Engineering by Marici Technology.",
};

export default async function ServicesPage() {
    await connectToDatabase();

    // Fetch from DB
    const services = await Service.find().sort({ order: 1, createdAt: -1 }).lean();

    // Convert to plain objects
    const plainServices = JSON.parse(JSON.stringify(services));

    return <ServicesClient initialServices={plainServices} />;
}
