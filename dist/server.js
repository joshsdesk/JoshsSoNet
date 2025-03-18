import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';
// Load env vars
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// DB check
if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env');
}
// Database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});
// Mount the user routes BEFORE the test route
app.use('/api/users', userRoutes);
// Mount the thought routes
app.use('/api/thoughts', thoughtRoutes);
// Test route
app.get('/', (_req, res) => {
    res.send('API is running...');
});
// Start server when DB is connected
mongoose.connection.once('open', () => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
