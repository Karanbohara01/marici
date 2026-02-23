import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // 5 second timeout
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
            return mongoose;
        }).catch(err => {
            console.error("MongoDB connection error:", err.message);
            cached.promise = null;
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        // If we are in the build phase, logging the error and returning null might be safer
        // than a total crash, though pages using it will still likely fail.
        console.error("Failed to connect to database in connectToDatabase");
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
