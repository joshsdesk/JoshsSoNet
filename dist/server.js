import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load env vars
dotenv.config();
// App setup
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Test route
app.get('/', (_req, res) => {
    res.send('API is running...');
});
// Start server when DB is connected
mongoose.connection.once('open', () => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
