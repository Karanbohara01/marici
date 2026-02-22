import mongoose from 'mongoose';

const uri = 'mongodb+srv://karanbohara2002_db_user:quWUZGWbkFCLj6wc@cluster0.8p3wbcq.mongodb.net/marici?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    console.log('Testing connection to Atlas (Standalone)...');

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Successfully connected to MongoDB Atlas!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:');
        console.error(error);
        process.exit(1);
    }
}

testConnection();
