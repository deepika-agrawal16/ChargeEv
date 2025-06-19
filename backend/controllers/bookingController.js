// // import mongoose from "mongoose";
// // import Booking from "../models/Booking.js";
// // import Station from "../models/station.js";

// // // Helper to parse pricing like "₹20/10min"
// // const parsePricing = (pricingStr) => {
// //   const match = pricingStr.match(/₹(\d+)\s*\/\s*(\d+)\s*min/i);
// //   if (!match) return { ratePerMin: 0 };
// //   const [_, price, mins] = match;
// //   return { ratePerMin: parseInt(price) / parseInt(mins) };
// // };

// // // ✅ Create a booking
// // export const createBooking = async (req, res) => {
// //   try {
// //     const { stationId, durationMinutes, connectorType } = req.body;

// //     if (!stationId || !durationMinutes || !connectorType) {
// //       return res.status(400).json({ message: "stationId, durationMinutes, and connectorType are required" });
// //     }

// //     if (!mongoose.Types.ObjectId.isValid(stationId)) {
// //       return res.status(400).json({ message: "Invalid station ID format" });
// //     }

// //     if (!req.user || !req.user._id) {
// //       return res.status(401).json({ message: "Unauthorized: User not authenticated" });
// //     }

// //     const station = await Station.findById(stationId);
// //     if (!station) {
// //       return res.status(404).json({ message: "Station not found" });
// //     }

// //     // Prevent overlapping booking
// //     const now = new Date();
// //     const overlapping = await Booking.findOne({
// //       station: station._id,
// //       status: "booked",
// //       endTime: { $gt: now }
// //     });

// //     if (overlapping) {
// //       return res.status(409).json({ message: "Station is already booked at this time." });
// //     }

// //     const { ratePerMin } = parsePricing(station.pricing || "₹0/10min");
// //     const amount = Math.ceil(ratePerMin * durationMinutes);
// //     const endTime = new Date(now.getTime() + durationMinutes * 60000); // ms

// //     const booking = await Booking.create({
// //       user: req.user._id,
// //       station: station._id,
// //       connectorType,
// //       durationMinutes,
// //       endTime,
// //       status: "booked",
// //       amount
// //     });

// //     // Mark station as unavailable
// //     station.availability = false;
// //     await station.save();

// //     res.status(201).json({ message: "Booking successful", booking });
// //   } catch (err) {
// //     console.error("❌ Booking creation failed:", err.message);
// //     res.status(500).json({ message: "Booking creation failed", error: err.message });
// //   }
// // };

// // // ✅ Get logged-in user's booking history
// // export const getUserBookings = async (req, res) => {
// //   try {
// //     if (!req.user || !req.user._id) {
// //       return res.status(401).json({ message: "Unauthorized: User not authenticated" });
// //     }

// //     const bookings = await Booking.find({ user: req.user._id }).populate("station");

// //     res.status(200).json(bookings);
// //   } catch (err) {
// //     console.error("❌ Fetching bookings failed:", err.message);
// //     res.status(500).json({ message: "Error fetching bookings", error: err.message });
// //   }
// // };

// import mongoose from "mongoose";
// import Booking from "../models/Booking.js";
// import Station from "../models/station.js";

// // Helper to parse pricing like "₹20/10min"
// const parsePricing = (pricingStr) => {
//   const match = pricingStr.match(/₹(\d+)\s*\/\s*(\d+)\s*min/i);
//   if (!match) return { ratePerMin: 10 }; // fallback: ₹10 per min
//   const [_, price, mins] = match;
//   return { ratePerMin: parseInt(price) / parseInt(mins) };
// };

// // ✅ Create a booking
// export const createBooking = async (req, res) => {
//   try {
//     const { stationId, durationMinutes, connectorType } = req.body;

//     if (!stationId || !durationMinutes || !connectorType) {
//       return res.status(400).json({ message: "stationId, durationMinutes, and connectorType are required" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(stationId)) {
//       return res.status(400).json({ message: "Invalid station ID format" });
//     }

//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: "Unauthorized: User not authenticated" });
//     }

//     // ✅ Prevent multiple unpaid bookings by same user
//     const userHasActiveBooking = await Booking.findOne({
//       user: req.user._id,
//       status: "booked",
//       isPaid: false
//     });

//     if (userHasActiveBooking) {
//       return res.status(403).json({
//         message: "You already have an active booking. Complete it before booking another station."
//       });
//     }

//     const station = await Station.findById(stationId);
//     if (!station) {
//       return res.status(404).json({ message: "Station not found" });
//     }

//     // ✅ Prevent double booking of same station
//     const now = new Date();
//     const overlapping = await Booking.findOne({
//       station: station._id,
//       status: "booked",
//       endTime: { $gt: now }
//     });

//     if (overlapping) {
//       return res.status(409).json({ message: "Station is already booked at this time." });
//     }

//     const { ratePerMin } = parsePricing(station.pricing || "₹20/10min");
//     const amount = Math.ceil(ratePerMin * durationMinutes);
//     const endTime = new Date(now.getTime() + durationMinutes * 60000);

//     const booking = await Booking.create({
//       user: req.user._id,
//       station: station._id,
//       connectorType,
//       durationMinutes,
//       endTime,
//       status: "booked",
//       amount,
//       isPaid: false
//     });

//     station.availability = false;
//     await station.save();

//     res.status(201).json({ message: "Booking successful", booking });
//   } catch (err) {
//     console.error("❌ Booking creation failed:", err.message);
//     res.status(500).json({ message: "Booking creation failed", error: err.message });
//   }
// };

// // ✅ Complete booking manually and release station
// export const completeBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       user: req.user._id
//     }).populate("station");

//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     if (booking.status === "completed") return res.status(400).json({ message: "Booking already completed" });

//     booking.status = "completed";
//     booking.isPaid = true;
//     booking.paymentTime = new Date();
//     await booking.save();

//     if (booking.station) {
//       booking.station.availability = true;
//       await booking.station.save();
//     }

//     res.json({ message: "Booking completed and station released", booking });
//   } catch (err) {
//     console.error("❌ Completion failed:", err.message);
//     res.status(500).json({ message: "Completion failed", error: err.message });
//   }
// };

// // ✅ Get logged-in user's booking history
// export const getUserBookings = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: "Unauthorized: User not authenticated" });
//     }

//     const bookings = await Booking.find({ user: req.user._id }).populate("station");
//     res.status(200).json(bookings);
//   } catch (err) {
//     console.error("❌ Fetching bookings failed:", err.message);
//     res.status(500).json({ message: "Error fetching bookings", error: err.message });
//   }
// };
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Station from "../models/station.js";

// Helper to parse pricing like "₹20/10min"
const parsePricing = (pricingStr) => {
  const match = pricingStr.match(/₹(\d+)\s*\/\s*(\d+)\s*min/i);
  if (!match) return { ratePerMin: 10 }; // fallback: ₹10 per min
  const [_, price, mins] = match;
  return { ratePerMin: parseInt(price) / parseInt(mins) };
};

// ✅ Create a booking
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

    // ✅ Prevent multiple unpaid bookings by same user
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

    // ✅ Prevent double booking of same station
    const now = new Date();
    const overlapping = await Booking.findOne({
      station: station._id,
      status: "booked",
      endTime: { $gt: now }
    });

    if (overlapping) {
      return res.status(409).json({ message: "Station is already booked at this time." });
    }

    const { ratePerMin } = parsePricing(station.pricing || "₹20/10min");
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
    console.error("❌ Booking creation failed:", err.message);
    res.status(500).json({ message: "Booking creation failed", error: err.message });
  }
};

// ✅ Complete booking manually and release station
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
    console.error("❌ Completion failed:", err.message);
    res.status(500).json({ message: "Completion failed", error: err.message });
  }
};

// ✅ Get logged-in user's booking history
export const getUserBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const bookings = await Booking.find({ user: req.user._id }).populate("station");
    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Fetching bookings failed:", err.message);
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Booking.find({
      user: req.user._id,
      isPaid: true
    }).populate("station");

    res.json(transactions);
  } catch (err) {
    console.error("❌ Failed to fetch transactions:", err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

