import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import stationRoutes from "./routes/stationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

config();
const app = express();

app.use(cors({
   origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));
app.use(express.json(
{
  limit: '10mb' // Increase limit for large JSON payloads
}
));
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
