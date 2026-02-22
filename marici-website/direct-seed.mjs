import mongoose from 'mongoose';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const MONGODB_URI = envContent.match(/MONGODB_URI=(.*)/)[1].trim();

const TestimonialSchema = new mongoose.Schema({
    name: String,
    role: String,
    content: String,
    avatarUrl: String,
    order: Number,
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const testimonials = [
    {
        name: "Sandeep Subedi",
        role: "CTO, FinTech Nepal",
        content: "The digital transformation Marici provided was seamless. Their engineering standards are world-class, bringing precision to our core banking platforms.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        order: 1
    },
    {
        name: "Anjali Gurung",
        role: "CEO, Himalayan Apps",
        content: "Marici's approach to UX design and scalable architecture helped us launch our platform to 1M+ users without a hitch. Truly a top-tier engineering partner.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        order: 2
    },
    {
        name: "Bijay Shrestha",
        role: "Director, Global Dynamics",
        content: "Precision and performance are what we needed for our logistics network, and Marici delivered beyond our expectations. Their architectural audits are priceless.",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        order: 3
    },
    {
        name: "Sunita Sharma",
        role: "Founder, EcoPath Labs",
        content: "Working with Marici was a paradigm shift for our engineering team. Their insights into distributed systems and sustainable tech are invaluable.",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
        order: 4
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB (using IPv4 preference)...");
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log("Connected.");

        await Testimonial.deleteMany({});
        await Testimonial.insertMany(testimonials);
        console.log("Successfully seeded 4 Nepali testimonials.");

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

seed();
