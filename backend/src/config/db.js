import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection error:', error);
    console.log('Continuing without DB connection for development');
    // process.exit(1); // Commented out to allow server to start without DB
  }
};