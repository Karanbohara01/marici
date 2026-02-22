import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { motion } from "framer-motion";
import ServiceDetailsClient from "@/app/services/[slug]/ServiceDetailsClient";

export default async function ServicePage(context: any) {
    const { params } = context;
    const { slug } = await params;
    await connectToDatabase();

    // Try to find by slug
    let service = await Service.findOne({ slug }).lean();

    // If not found by slug, and it looks like a Mongo ID, try finding by ID
    if (!service && /^[0-9a-fA-F]{24}$/.test(slug)) {
        service = await Service.findById(slug).lean();
    }

    if (!service) {
        notFound();
    }
    // Convert MongoDB document to plain object for client component
    const plainService = JSON.parse(JSON.stringify(service));

    return <ServiceDetailsClient service={plainService} />;
}
