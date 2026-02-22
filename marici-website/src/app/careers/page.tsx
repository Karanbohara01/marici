import connectToDatabase from "@/lib/mongoose";
import Career from "@/models/Career";
import CareersClient from "./CareersClient";

export const metadata = {
    title: "Careers | Marici Technology Pvt. Ltd.",
    description: "Join Marici Technology's engineering hub. Explore open positions in software development, AI engineering, and technical leadership. Build your future with us.",
    openGraph: {
        title: "Careers at Marici Technology | Engineering the Future",
        description: "Explore opportunities to work on world-class technical challenges.",
    }
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
