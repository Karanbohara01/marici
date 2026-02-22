import mongoose, { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        coverImage: { type: String },
        tags: [{ type: String }],
        isFeatured: { type: Boolean, default: false },
        publishedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);
export default BlogPost;
