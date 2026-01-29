import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import autoCompleteExpiredBookings from './utils/autoComplete.js';

config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// CORS config — no credentials needed since you're fully token based
app.use(cors({
     origin: [
      "http://localhost:5173",
      "https://chargeev.vercel.app"
    ]
}));

// JSON body parsing with large payload allowed for image base64 strings
app.use(express.json({ limit: '10mb' }));

// Attach routes:
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes);

// Automatically complete expired bookings every 1 minute
setInterval(autoCompleteExpiredBookings, 60 * 1000);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 ChargeEV API running successfully');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
