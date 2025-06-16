import Booking from "../models/Booking.js";
import Station from "../models/station.js";

// Create Booking
export const createBooking = async (req, res) => {
  const { stationId } = req.body;

  try {
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    const booking = new Booking({
      user: req.user._id,
      station: station._id,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// Get user booking history
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("station");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};
