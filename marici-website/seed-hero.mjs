import mongoose from 'mongoose';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const MONGODB_URI = envContent.match(/MONGODB_URI=(.*)/)[1].trim();

const HeroSlideSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    imageUrl: String,
    ctaText: String,
    ctaLink: String,
    order: Number,
    isActive: Boolean,
}, { timestamps: true });

const HeroSlide = mongoose.models.HeroSlide || mongoose.model("HeroSlide", HeroSlideSchema);

const slides = [
    {
        title: "Architecting Digital Infrastructure",
        subtitle: "We engineer high-performance software systems and cloud architectures that drive the world's most innovative enterprises forward.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
        ctaText: "Start Scaling",
        ctaLink: "/contact",
        order: 1,
        isActive: true
    },
    {
        title: "Precision AI & Intelligence",
        subtitle: "Unlocking business potential with advanced machine learning models and data-driven insights tailored for your enterprise.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        ctaText: "View Solutions",
        ctaLink: "/services/ai",
        order: 2,
        isActive: true
    },
    {
        title: "Cloud-Native Scalability",
        subtitle: "Modernize your legacy systems with world-class DevOps practices and resilient cloud-native architectures.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop",
        ctaText: "Explore More",
        ctaLink: "/services/cloud-devops",
        order: 3,
        isActive: true
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected.");

        await HeroSlide.deleteMany({});
        await HeroSlide.insertMany(slides);
        console.log("Successfully seeded 3 Hero slides.");

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

seed();
