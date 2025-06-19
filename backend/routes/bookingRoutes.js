import express from "express";
import protect from "../middlewares/authMiddlewares.js";
import {
  createBooking,
  getUserBookings,
  completeBooking
} from "../controllers/bookingController.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Create a booking
router.post("/", protect, createBooking);

// ✅ Get booking history with full station details
router.get("/my-bookings", protect, getUserBookings);

// ✅ Clear all bookings of user
router.delete("/clear", protect, async (req, res) => {
  try {
    await Booking.deleteMany({ user: req.user._id });
    res.json({ message: "All bookings cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing history" });
  }
});

// ✅ Complete a booking and make station available again
router.post("/complete/:id", protect, completeBooking);

router.get("/transactions", protect, getUserTransactions);


export default router;
