import { seedData } from './src/lib/seed-data.js';
import mongoose from 'mongoose';

async function runSeed() {
    try {
        console.log("Starting seed process...");
        const result = await seedData();
        console.log("Seed result:", result);
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

runSeed();
