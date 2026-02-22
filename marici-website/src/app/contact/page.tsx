import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us | Marici Technology Pvt. Ltd.",
    description: "Partner with Marici Technology for your next big digital transformation. Reach out to our engineering hub in Kathmandu for enterprise IT solutions, AI engineering, and cloud architecture.",
    openGraph: {
        title: "Contact Marici Technology | Let's Start Something Big",
        description: "Submit a project inquiry to our technical specialists.",
    }
};

export default function ContactPage() {
    return <ContactClient />;
}


