import BlogPost from "@/models/BlogPost";
import Career from "@/models/Career";
import connectToDatabase from "./mongoose";

const blogPosts = [
    {
        title: "The Future of Enterprise Digital Architecture",
        slug: "future-of-enterprise-digital-architecture",
        excerpt: "Exploring how next-generation digital architecture is reshaping the enterprise landscape, focusing on scalability and modular design.",
        content: `
# The Future of Enterprise Digital Architecture

In the rapidly evolving landscape of enterprise technology, the architecture we build today determines the success of tomorrow. At Marici, we believe that modularity and scalability are no longer optional—they are the bedrock of innovation.

## The Shift Towards Micro-Services

Traditional monolithic architectures are giving way to micro-services that allow for greater flexibility and independent scaling of components. This shift enables enterprises to respond faster to market changes and localize failure zones.

## Scalability and Performance

Building for the next billion users requires a deep understanding of distributed systems. Our latest architectural audits show that implementing intelligent caching layers and event-driven data flows can improve system throughput by up to 40%.

## Conclusion

As we continue to architect the digital future, the focus remains on building systems that are not only powerful but also resilient and adaptable.
        `,
        author: "Alex Sterling",
        tags: ["Architecture", "Enterprise", "Innovation"],
        isFeatured: true,
        publishedAt: new Date("2024-02-15"),
    },
    {
        title: "Building High-Performance Distributed Systems",
        slug: "building-high-performance-distributed-systems",
        excerpt: "A deep dive into the engineering principles behind Marici's core infrastructure and how we handle massive data loads.",
        content: `
# Building High-Performance Distributed Systems

Marici's core mission is to provide precision-engineered solutions for the most complex technical challenges. One of those challenges is maintaining high performance in a distributed environment.

## The Challenge of Consistency

In a distributed system, achieving CAP consistency while maintaining high availability is a constant balancing act. We utilize advanced consensus algorithms to ensure data integrity across our global nodes.

## Optimizing for Latency

Every millisecond counts. By placing compute resources closer to the edge and optimizing our database query patterns, we've managed to reduce average API response times to sub-50ms ranges.

## Lessons Learned

Our journey in building these systems has taught us that observability is key. You cannot optimize what you cannot measure. Our MT_Arch_System provides real-time telemetry that informs our engineering decisions every day.
        `,
        author: "Priya Patel",
        tags: ["Engineering", "Distributed Systems", "Cloud"],
        publishedAt: new Date("2024-02-10"),
    },
    {
        title: "Design Ethics in the Age of AI",
        slug: "design-ethics-in-the-age-of-ai",
        excerpt: "How human-centric design remains the cornerstone of modern AI integration and the importance of ethical UX.",
        content: `
# Design Ethics in the Age of AI

As AI becomes integrated into every facet of our digital lives, the role of the designer has never been more critical. At Marici, we prioritize "Human-Centric Engineering"—ensuring technology serves humanity, not the other way around.

## Transparency in Interaction

Users should always know when they are interacting with an AI. Our design system emphasizes clear labeling and feedback loops that build trust and clarity.

## Reducing Bias

AI is only as good as the data it's trained on. Designers play a vital role in identifying and mitigating bias in user interfaces, ensuring that digital products are inclusive and fair for everyone.

## The Cornerstone of Excellence

The beautiful thing about enterprise software is its potential for impact. By combining powerful AI with ethical design, we create tools that truly empower people to do their best work.
        `,
        author: "Marcus Johnson",
        tags: ["Design", "AI", "Ethics"],
        publishedAt: new Date("2024-02-05"),
    }
];

const careers = [
    {
        title: "Senior Full Stack Engineer",
        slug: "senior-full-stack-engineer",
        department: "Engineering",
        location: "Remote / Kathmandu",
        type: "Full-time",
        description: "Join our core team to build scalable enterprise solutions using modern frameworks. You will be responsible for architecting frontend systems and optimizing backend APIs.",
        requirements: [
            "5+ years experience in professional software development",
            "Expertise in Next.js, React, and TypeScript",
            "Deep understanding of distributed systems and MongoDB",
            "Strong communication skills and collaborative mindset"
        ],
        status: "Open"
    },
    {
        title: "UI/UX Product Designer",
        slug: "ui-ux-product-designer",
        department: "Design",
        location: "Kathmandu",
        type: "Full-time",
        description: "Help us craft the visual identity and user experience of next-gen digital products. You will work closely with the engineering team to bridge the gap between complex logic and human-centric UI.",
        requirements: [
            "3+ years experience in product design for enterprise software",
            "Expertise in Figma and interactive prototyping",
            "Strong understanding of design systems and typography",
            "Ability to translate complex technical requirements into elegant designs"
        ],
        status: "Open"
    },
    {
        title: "Technical Project Manager",
        slug: "technical-project-manager",
        department: "Operations",
        location: "Remote",
        type: "Full-time",
        description: "Bridge the gap between engineering and client vision for complex technical projects. You will manage timelines, resources, and stakeholder expectations for multi-phase digital transformations.",
        requirements: [
            "Proven experience managing technical projects (Agile/Scrum)",
            "Strong technical background or ability to communicate with engineers",
            "Exceptional organizational and leadership skills",
            "Experience with project management tools like Jira or Linear"
        ],
        status: "Open"
    }
];

export async function seedData() {
    try {
        await connectToDatabase();

        // Seed Blogs
        await BlogPost.deleteMany({});
        await BlogPost.insertMany(blogPosts);
        console.log("Blog posts seeded successfully.");

        // Seed Careers
        await Career.deleteMany({});
        await Career.insertMany(careers);
        console.log("Career roles seeded successfully.");

        return { success: true, message: "Data seeded successfully" };
    } catch (error) {
        console.error("Error seeding data:", error);
        return { success: false, error: (error as Error).message };
    }
}
