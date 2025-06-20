import express from "express";
import protect from "../middlewares/authMiddlewares.js";
import {
  createBooking,
  getUserBookings,
  completeBooking,
  getUserTransactions,
  getExpiringBookings,
  getAllBookings,
  getAllTransactionsForAdmin,
  cancelBooking,
  getUserStats
} from "../controllers/bookingController.js";
import Booking from "../models/Booking.js";
import isAdmin from "../middlewares/isAdmin.js";


const router = express.Router();

//Create a booking
router.post("/", protect, createBooking);

//Get booking history with full station details
router.get("/my-bookings", protect, getUserBookings);

// Clear all bookings of user
router.delete("/clear", protect, async (req, res) => {
  try {
    await Booking.deleteMany({ user: req.user._id });
    res.json({ message: "All bookings cleared" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing history" });
  }
});

//Complete a booking and make station available again
router.post("/complete/:id", protect, completeBooking);

router.get("/transactions", protect, getUserTransactions);


router.get("/expiring", protect, getExpiringBookings);

// Get all bookings (admin only)
router.get("/admin/all", protect, isAdmin, getAllBookings);

// Cancel any booking (admin only)
router.post("/admin/cancel/:id", protect, isAdmin, cancelBooking);

router.get("/admin/all-transactions", protect, isAdmin, getAllTransactionsForAdmin);

router.get("/user-stats", protect, getUserStats);


export default router;
