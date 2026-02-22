import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | Marici Technology Pvt. Ltd.",
    description: "Learn about Marici Technology's mission, our executive council, and our commitment to engineering enterprise-grade software with human-centric design.",
    openGraph: {
        title: "About Marici Technology | Engineering for Ambition",
        description: "We bridge the gap between complex engineering and human-centric design.",
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
