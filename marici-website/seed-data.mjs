import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
}

// Schemas
const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const CareerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Remote"], default: "Full-time" },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
const Career = mongoose.models.Career || mongoose.model("Career", CareerSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const blogs = [
    {
        title: "The Future of Cloud Native Architecture",
        slug: "future-of-cloud-native",
        excerpt: "Exploring how serverless and microservices are shaping the next decade of enterprise software.",
        content: "Cloud native architecture has evolved rapidly...",
        author: "Karan Bohara",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        tags: ["Cloud", "Architecture", "Future"],
        isFeatured: true
    },
    {
        title: "Scaling AI in Healthcare",
        slug: "scaling-ai-healthcare",
        excerpt: "How machine learning is revolutionizing diagnostics and patient care management.",
        content: "Healthcare data is complex, but with AI...",
        author: "Sarah Jenkins",
        coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200",
        tags: ["AI", "Healthcare", "Innovation"],
        isFeatured: false
    },
    {
        title: "Securing the Modern Enterprise",
        slug: "securing-modern-enterprise",
        excerpt: "Why zero-trust security is no longer optional for today's distributed organizations.",
        content: "Security must be baked in, not bolted on...",
        author: "Alex Rivera",
        coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
        tags: ["Security", "Enterprise", "DevSecOps"],
        isFeatured: false
    },
    {
        title: "The Rise of Distributed Databases",
        slug: "rise-of-distributed-databases",
        excerpt: "Achieving global scale and high availability with modern distributed data stores.",
        content: "Data consistency is the challenge of our time...",
        author: "Maya Patel",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1200",
        tags: ["Data", "Infrastructure", "Scale"],
        isFeatured: false
    },
    {
        title: "Human-Centric UI/UX for SaaS",
        slug: "human-centric-ui-ux",
        excerpt: "How design-led engineering creates products that people actually love to use.",
        content: "Aesthetics meet functionality in the browser...",
        author: "Oliver Bennett",
        coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1200",
        tags: ["Design", "Frontend", "User Experience"],
        isFeatured: false
    },
    {
        title: "Edge Computing: The New Frontier",
        slug: "edge-computing-new-frontier",
        excerpt: "Moving computation closer to the data source to enable real-time intelligence.",
        content: "Latency is the enemy of innovation...",
        author: "Sophia Wong",
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
        tags: ["Edge", "IoT", "Innovation"],
        isFeatured: false
    }
];

const careers = [
    {
        title: "Senior Full Stack Engineer",
        slug: "sr-full-stack-engineer",
        department: "Engineering",
        location: "Kathmandu, Nepal (Hybrid)",
        type: "Full-time",
        description: "We are looking for a Senior Full Stack Engineer to lead our core product team.",
        requirements: ["5+ years of experience with Node.js and React", "Experience with AWS", "Strong problem-solving skills"],
        status: "Open"
    },
    {
        title: "Cloud Solutions Architect",
        slug: "cloud-solutions-architect",
        department: "Solutions",
        location: "Remote",
        type: "Full-time",
        description: "Help our clients design and implement robust cloud architectures.",
        requirements: ["Proficiency in Azure or AWS", "Excellent communication skills", "Background in system design"],
        status: "Open"
    },
    {
        title: "Technical Product Manager",
        slug: "tech-product-manager",
        department: "Product",
        location: "Kathmandu, Nepal (On-site)",
        type: "Full-time",
        description: "Bridge the gap between technology and business goals as a TPM.",
        requirements: ["Experience in agile methodologies", "Strong technical background", "Product lifecycle management"],
        status: "Open"
    },
    {
        title: "DevOps Specialist",
        slug: "devops-specialist",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "Build and maintain CI/CD pipelines and infrastructure as code.",
        requirements: ["Expertise in Docker and Kubernetes", "CI/CD experience", "Cloud platform certifications"],
        status: "Open"
    },
    {
        title: "UI/UX Designer",
        slug: "ui-ux-designer",
        department: "Design",
        location: "Hybrid (Kathmandu)",
        type: "Full-time",
        description: "Create stunning and intuitive user interfaces for our enterprise clients.",
        requirements: ["Portfolio of web/mobile designs", "Proficiency in Figma", "Experience in user research"],
        status: "Open"
    },
    {
        title: "Big Data Architect",
        slug: "big-data-architect",
        department: "Engineering",
        location: "Kathmandu, Nepal",
        type: "Full-time",
        description: "Design and implement scalable data pipelines and warehousing solutions.",
        requirements: ["Experience with Spark/Hadoop", "Data modeling expertise", "SQL/NoSQL mastery"],
        status: "Open"
    }
];

const testimonials = [
    {
        name: "David Chen",
        role: "Head of Infrastructure, TechCorp",
        content: "Marici Technology provided us with a seamless migration path to the cloud. Their expertise in Kubernetes is unmatched.",
        avatarUrl: "https://i.pravatar.cc/150?u=david",
        order: 1
    },
    {
        name: "Elena Rodriguez",
        role: "Product Manager, HealthSync",
        content: "The AI assistant Marici built for us has reduced our diagnostic turnaround time by 30%. Simply incredible.",
        avatarUrl: "https://i.pravatar.cc/150?u=elena",
        order: 2
    },
    {
        name: "Marcus Thorne",
        role: "CTO, Nexus Dynamics",
        content: "High-performance architecture is in their DNA. The scalability improvements they delivered are game-changing.",
        avatarUrl: "https://i.pravatar.cc/150?u=marcus",
        order: 3
    },
    {
        name: "Sophia Lin",
        role: "Founder, GreenGrid",
        content: "Their approach to cloud optimization saved us 40% in monthly operational costs. Highly recommend their engineering team.",
        avatarUrl: "https://i.pravatar.cc/150?u=sophia",
        order: 4
    },
    {
        name: "Arthur Pendragon",
        role: "Lead Developer, Camelot Tech",
        content: "Marici's solutions are robust and maintainable. They really understand the needs of developers at scale.",
        avatarUrl: "https://i.pravatar.cc/150?u=arthur",
        order: 5
    },
    {
        name: "Isabella Rossi",
        role: "Director of Innovation, Vista Solutions",
        content: "The level of technical depth Marici brings to the table is refreshing. They solved problems other firms couldn't touch.",
        avatarUrl: "https://i.pravatar.cc/150?u=isabella",
        order: 6
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        console.log("Clearing existing data...");
        await BlogPost.deleteMany({});
        await Career.deleteMany({});
        await Testimonial.deleteMany({});

        console.log("Seeding Blogs...");
        await BlogPost.insertMany(blogs);
        console.log("Seeding Careers...");
        await Career.insertMany(careers);
        console.log("Seeding Testimonials...");
        await Testimonial.insertMany(testimonials);

        console.log("Successfully seeded all data.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seed();
