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
                // Handle potential quotes and whitespace
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

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    features: [{ type: String }],
    capabilities: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],
    order: { type: Number, default: 0 },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const services = [
    {
        title: "Cloud Engineering",
        slug: "cloud-engineering",
        description: "Architecting resilient, scalable cloud infrastructures that empower modern enterprise agility and global performance.",
        icon: "Cloud",
        features: ["Multi-Cloud Strategy", "Serverless Architecture", "High Availability"],
        capabilities: [
            {
                title: "Cloud Native Migration",
                description: "Seamlessly transition legacy systems to modern cloud environments with zero downtime and optimized resource allocation."
            },
            {
                title: "Infrastructure as Code",
                description: "Automate your infrastructure management using Terraform and CloudFormation for consistency and rapid deployment."
            },
            {
                title: "DevSecOps Integration",
                description: "Embed security into your CI/CD pipelines, ensuring every deployment meets rigorous enterprise compliance standards."
            },
            {
                title: "Cost Optimization",
                description: "Continuous monitoring and architectural refinements to ensure you only pay for the performance your business requires."
            }
        ],
        order: 1
    },
    {
        title: "Enterprise AI",
        slug: "enterprise-ai",
        description: "Harnessing the power of machine learning and large language models to automate complex workflows and surface strategic insights.",
        icon: "Brain",
        features: ["Generative AI", "Predictive Analytics", "Natural Language Processing"],
        capabilities: [
            {
                title: "Custom LLM Fine-tuning",
                description: "Tailor existing large language models to your specific business domain for superior accuracy and brand-aligned interactions."
            },
            {
                title: "Intelligent Data Extraction",
                description: "Automate the processing of unstructured documents into structured, actionable data for faster decision making."
            },
            {
                title: "Predictive Maintenance",
                description: "Deploy AI models to foresee technical failures before they occur, drastically reducing system downtime and maintenance costs."
            },
            {
                title: "Cognitive Automation",
                description: "Build intelligent agents that can handle complex multi-step tasks, freeing your team for higher-value creative work."
            }
        ],
        order: 2
    },
    {
        title: "Cybersecurity & Trust",
        slug: "cybersecurity-trust",
        description: "Bulletproofing your digital perimeter with Zero Trust architecture and comprehensive threat intelligence monitoring.",
        icon: "ShieldCheck",
        features: ["Zero Trust Design", "Identity Management", "Threat Detection"],
        capabilities: [
            {
                title: "Security Posture Audit",
                description: "Comprehensive technical analysis of your entire digital footprint to identify and remediate critical vulnerabilities."
            },
            {
                title: "IAM Governance",
                description: "Implement robust identity and access management protocols to ensure precisely controlled resource authorization."
            },
            {
                title: "Real-time Monitoring",
                description: "Deploy 24/7 endpoint detection and response systems to neutralize threats before they can impact your operations."
            },
            {
                title: "Compliance Engineering",
                description: "Align your technical infrastructure with GDPR, HIPAA, or SOC2 standards through verified architectural controls."
            }
        ],
        order: 3
    },
    {
        title: "Data Architecture",
        slug: "data-architecture",
        description: "Transforming raw data into a strategic asset through high-performance pipelining and unified warehouse solutions.",
        icon: "Database",
        features: ["Unified Data Lakes", "Real-time Pipelining", "Governance Frameworks"],
        capabilities: [
            {
                title: "Distributed Databases",
                description: "Architect global-scale data stores that maintain consistency and high availability across multiple regions."
            },
            {
                title: "ETL Pipeline Automation",
                description: "Build resilient data pipelines that process millions of events per second with validated integrity and low latency."
            },
            {
                title: "Data Lake Management",
                description: "Organize vast amounts of unstructured data into a searchable, secure foundation for advanced analytics."
            },
            {
                title: "Unified API Design",
                description: "Create a single source of truth for your data through high-performance GraphQL or RESTful API layers."
            }
        ],
        order: 4
    },
    {
        title: "Product Strategy",
        slug: "product-strategy",
        description: "Bridging the gap between technical possibility and business impact through design-led engineering and rapid prototyping.",
        icon: "Zap",
        features: ["Rapid Prototyping", "UX Engineering", "Go-to-market Tech"],
        capabilities: [
            {
                title: "Technical Roadmap",
                description: "Define a multi-year technology vision that aligns your software development with long-term business objectives."
            },
            {
                title: "Architecture Prototyping",
                description: "Validate complex technical assumptions through high-fidelity, functional proofs of concept before full-scale investment."
            },
            {
                title: "User-Centric Refactoring",
                description: "Re-engineer existing systems to drastically improve user experience and operational efficiency."
            },
            {
                title: "SaaS Multi-tenancy",
                description: "Design robust multi-tenant architectures that allow your product to scale to thousands of organizations securely."
            }
        ],
        order: 5
    },
    {
        title: "Digital Transformation",
        slug: "digital-transformation",
        description: "Modernizing legacy stack to unlock agility, scalability, and technical leadership in competitive global markets.",
        icon: "MonitorSmartphone",
        features: ["Legacy Modernization", "API First Design", "Strategic Outsourcing"],
        capabilities: [
            {
                title: "Microservices Transition",
                description: "Break down monolithic legacy systems into nimble, independently deployable services for faster innovation."
            },
            {
                title: "Headless Commerce",
                description: "Implement modern storefront architectures that separate frontend experience from backend commercial logic."
            },
            {
                title: "Enterprise Mobility",
                description: "Engineered mobile experiences that provide seamless access to critical enterprise data and workflows from anywhere."
            },
            {
                title: "Agile DevOps Culture",
                description: "Consultancy and tooling to transition your engineering team to a high-velocity, performance-driven culture."
            }
        ],
        order: 6
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        console.log("Clearing existing services...");
        await Service.deleteMany({});

        console.log("Seeding Services...");
        await Service.insertMany(services);

        console.log("Successfully seeded all services.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding services:", error);
        process.exit(1);
    }
}

seed();
