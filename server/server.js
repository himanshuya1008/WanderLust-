import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

import listingsRouter from './routes/listingsRoutes.js';
import bookingsRouter from './routes/bookingsRoutes.js';

const app = express();
await connectCloudinary();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is Live! WanderLust API is ready.");
});

// Public Listings and Bookings routes
app.use('/api/listings', listingsRouter);
app.use('/api/bookings', bookingsRouter);

const isClerkConfigured = process.env.CLERK_PUBLISHABLE_KEY || process.env.CLERK_SECRET_KEY;

if (isClerkConfigured) {
    app.use(clerkMiddleware());
    app.use(requireAuth());
} else {
    console.warn("⚠️ Clerk keys (CLERK_PUBLISHABLE_KEY / CLERK_SECRET_KEY) not set in server/.env");
    app.use((req, res, next) => {
        // Fallback for protected routes when clerk keys are not yet configured
        req.auth = () => ({ userId: 'demo_user', has: async () => true });
        req.plan = 'premium';
        req.free_usage = 0;
        next();
    });
}

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});