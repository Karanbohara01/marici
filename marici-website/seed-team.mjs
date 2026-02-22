import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Manual env loading
if (!process.env.MONGODB_URI) {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        for (const line of lines) {
            const stripped = line.trim();
            if (stripped.startsWith('MONGODB_URI=')) {
                const index = stripped.indexOf('=');
                let val = stripped.substring(index + 1).trim();
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                process.env.MONGODB_URI = val;
                break;
            }
        }
    }
}

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("MONGODB_URI not found in process.env or .env.local");
    process.exit(1);
}

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bio: { type: String },
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String,
    },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);

const team = [
    {
        name: "Karan Bohara",
        role: "Chief Technology Officer",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
        bio: "Visionary technologist with expertise in distributed systems and AI architecture. Leading Marici's technical strategy and innovation roadmap.",
        socialLinks: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        },
        order: 1
    },
    {
        name: "Sarah Jenkins",
        role: "Head of Engineering",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
        bio: "Specializing in high-performance cloud architectures and DevOps excellence. Sarah ensures our engineering processes meet global enterprise standards.",
        socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com"
        },
        order: 2
    },
    {
        name: "Alex Rivera",
        role: "Product Strategy Lead",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800",
        bio: "Bridging the gap between business objectives and technical execution. Alex leads our product discovery and strategic consulting efforts.",
        socialLinks: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        },
        order: 3
    },
    {
        name: "Maya Patel",
        role: "Creative Director",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
        bio: "Defining the visual language of Marici. Maya ensures every digital experience we build is as intuitive as it is aesthetically stunning.",
        socialLinks: {
            linkedin: "https://linkedin.com"
        },
        order: 4
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        console.log("Clearing existing team members...");
        await TeamMember.deleteMany({});

        console.log("Seeding Team Members...");
        await TeamMember.insertMany(team);

        console.log("Successfully seeded team data.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding team data:", error);
        process.exit(1);
    }
}

seed();
