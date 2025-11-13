import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Event from '../models/Event.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();

    const hashedPassword = await bcrypt.hash('Password123!', 10);

    const admin = new User({ name: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: 'admin' });
    await admin.save();

    const organizer = new User({ name: 'Organizer User', email: 'organizer@example.com', password: hashedPassword, role: 'organizer' });
    await organizer.save();


    const event1 = new Event({
      title: 'Tech Conference 2024',
      description: 'An exciting conference about the latest in technology.',
      category: 'Technology',
      location: 'New York, NY',
      startDate: new Date('2024-12-01T09:00:00Z'),
      endDate: new Date('2024-12-02T17:00:00Z'),
      capacity: 100,
      price: 50,
      createdBy: organizer._id,
      tags: ['tech', 'conference'],
      images: ['https://via.placeholder.com/300x200?text=Tech+Conference'],
      status: 'approved'
    });
    await event1.save();

    const event2 = new Event({
      title: 'Music Festival',
      description: 'A weekend of amazing music performances.',
      category: 'Music',
      location: 'Los Angeles, CA',
      startDate: new Date('2024-11-15T18:00:00Z'),
      endDate: new Date('2024-11-17T23:00:00Z'),
      capacity: 500,
      price: 75,
      createdBy: organizer._id,
      tags: ['music', 'festival'],
      images: ['https://via.placeholder.com/300x200?text=Music+Festival'],
      status: 'approved'
    });
    await event2.save();

    console.log('Database seeded successfully');
    console.log('Admin: admin@example.com / Password123!');
    console.log('Organizer: organizer@example.com / Password123!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seed();