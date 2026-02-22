import type { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
    title: "Our Work | Marici Technology Pvt. Ltd.",
    description: "Explore our portfolio of engineering excellence. From FinTech platforms and AI healthcare assistants to cloud migrations, see how Marici Technology solves complex technical challenges.",
    openGraph: {
        title: "Marici Technology Portfolio | Engineering Excellence",
        description: "Real-world case studies of digital transformation and technical innovation.",
    }
};

export default function WorkPage() {
    return <WorkClient />;
}
