import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Station from "../models/station.js";

//  Updated Helper: parse pricing like "10/min"
const parsePricing = (pricingStr) => {
  const match = pricingStr.match(/(\d+)\s*\/\s*min/i);
  if (!match) return { ratePerMin: 10 }; // fallback: ₹10/min
  const [_, price] = match;
  return { ratePerMin: parseInt(price) };
};

//  Create a booking
export const createBooking = async (req, res) => {
  try {
    const { stationId, durationMinutes, connectorType } = req.body;

    if (!stationId || !durationMinutes || !connectorType) {
      return res.status(400).json({ message: "stationId, durationMinutes, and connectorType are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(stationId)) {
      return res.status(400).json({ message: "Invalid station ID format" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const userHasActiveBooking = await Booking.findOne({
      user: req.user._id,
      status: "booked",
      isPaid: false
    });

    if (userHasActiveBooking) {
      return res.status(403).json({
        message: "You already have an active booking. Complete it before booking another station."
      });
    }

    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    const now = new Date();
    const overlapping = await Booking.findOne({
      station: station._id,
      status: "booked",
      endTime: { $gt: now }
    });

    if (overlapping) {
      return res.status(409).json({ message: "Station is already booked at this time." });
    }

    const { ratePerMin } = parsePricing(station.pricing || "10/min");
    const amount = Math.ceil(ratePerMin * durationMinutes);
    const endTime = new Date(now.getTime() + durationMinutes * 60000);

    const booking = await Booking.create({
      user: req.user._id,
      station: station._id,
      connectorType,
      durationMinutes,
      endTime,
      status: "booked",
      amount,
      isPaid: false
    });

    station.availability = false;
    await station.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(" Booking creation failed:", err.message);
    res.status(500).json({ message: "Booking creation failed", error: err.message });
  }
};

//  Complete booking and mark paid
export const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("station");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status === "completed") return res.status(400).json({ message: "Booking already completed" });

    booking.status = "completed";
    booking.isPaid = true;
    booking.paymentTime = new Date();
    await booking.save();

    if (booking.station) {
      booking.station.availability = true;
      await booking.station.save();
    }

    res.json({ message: "Booking completed and station released", booking });
  } catch (err) {
    console.error(" Completion failed:", err.message);
    res.status(500).json({ message: "Completion failed", error: err.message });
  }
};

//  Get user booking history
export const getUserBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const bookings = await Booking.find({ user: req.user._id }).populate("station");
    res.status(200).json(bookings);
  } catch (err) {
    console.error(" Fetching bookings failed:", err.message);
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

//  Get user transaction history
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Booking.find({
      user: req.user._id,
      isPaid: true
    }).populate("station");

    res.json(transactions);
  } catch (err) {
    console.error(" Failed to fetch transactions:", err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};


//  Notifications: Bookings expiring within 5 minutes
export const getExpiringBookings = async (req, res) => {
  try {
    const now = new Date();
    const next5min = new Date(now.getTime() + 5 * 60 * 1000);

    const bookings = await Booking.find({
      user: req.user._id,
      status: "booked",
      isPaid: false,
      endTime: { $gte: now, $lte: next5min },
    }).populate("station");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email") // Include user info
      .populate("station");           // Include station info

    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching all bookings:", err.message);
    res.status(500).json({ message: "Failed to fetch all bookings" });
  }
};

//  Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id).populate("station");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    booking.isPaid = false;
    await booking.save();

    if (booking.station) {
      booking.station.availability = true;
      await booking.station.save();
    }

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    console.error("Cancel error:", err.message);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};


export const getAllTransactionsForAdmin = async (req, res) => {
  try {
    const transactions = await Booking.find({ isPaid: true })
      .populate("station")
      .populate("user");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let totalIncome = 0;
    let todayUsageMinutes = 0;

    for (let txn of transactions) {
      totalIncome += txn.amount;
      if (txn.paymentTime && new Date(txn.paymentTime) >= today) {
  todayUsageMinutes += txn.durationMinutes;
}
    }

    res.status(200).json({
      transactions,
      totalIncome,
      todayUsageMinutes,
    });
  } catch (err) {
    console.error("Admin transaction fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch admin transactions" });
  }
};


export const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId, isPaid: true });

    const statsMap = {};

    bookings.forEach((b) => {
      const date = new Date(b.paymentTime).toISOString().split("T")[0];
      if (!statsMap[date]) statsMap[date] = 0;
      statsMap[date] += b.durationMinutes;
    });

    const result = Object.keys(statsMap).map((date) => ({
      date,
      durationMinutes: statsMap[date],
    }));

    // Sort by date
    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(result);
  } catch (err) {
    console.error("Failed to get user stats:", err);
    res.status(500).json({ message: "Failed to get stats" });
  }
};


