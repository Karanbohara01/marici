import connectToDatabase from "@/lib/mongoose";
import Career from "@/models/Career";
import CareersClient from "./CareersClient";

export const metadata = {
    title: "Careers | Marici Technology",
    description: "Join our team and help us build the future of technology.",
};

async function getCareers() {
    await connectToDatabase();
    const careers = await Career.find({ status: "Open" }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(careers));
}

export default async function CareersPage() {
    const careers = await getCareers();
    return <CareersClient careers={careers} />;
}
