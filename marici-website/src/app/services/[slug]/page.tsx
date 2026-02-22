import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { motion } from "framer-motion";
import ServiceDetailsClient from "@/app/services/[slug]/ServiceDetailsClient";

export default async function ServicePage(context: any) {
    const { params } = context;
    const { slug } = await params;

    await connectToDatabase();
    const service = await Service.findOne({ slug }).lean();

    if (!service) {
        notFound();
    }

    // Convert MongoDB document to plain object for client component
    const plainService = JSON.parse(JSON.stringify(service));

    return <ServiceDetailsClient service={plainService} />;
}
