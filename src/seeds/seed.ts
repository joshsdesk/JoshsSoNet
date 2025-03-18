import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

dotenv.config();

const users = [
  {
    username: 'testuser1',
    email: 'test1@example.com',
  },
  {
    username: 'testuser2',
    email: 'test2@example.com',
  },
];

const thoughts = [
  {
    thoughtText: 'This is the first seeded thought!',
    username: 'testuser1',
  },
  {
    thoughtText: 'Second seeded thought, love this API!',
    username: 'testuser2',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to DB for seeding');

    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('✅ Cleared old data');

    await User.insertMany(users);
    console.log('✅ Users seeded');

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('✅ Thoughts seeded');

    // Optional: Link thoughts to users
    for (const thought of createdThoughts) {
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      console.log(`✅ Linked thought to user ${user?.username}`);
    }

    console.log('🌱 Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
