import Booking from "../models/Booking.js";
import Station from "../models/station.js";

const autoCompleteExpiredBookings = async () => {
  try {
    const now = new Date();

    // Only complete if expired AND paid
    const expired = await Booking.find({
      endTime: { $lt: now },
      status: "booked",
      isPaid: true
    });

    for (const booking of expired) {
      booking.status = "completed";
      await booking.save();

      if (booking.station) {
        const station = await Station.findById(booking.station);
        if (station) {
          station.availability = true;
          await station.save();
        }
      }
    }

    if (expired.length > 0) {
      console.log(`Auto-completed ${expired.length} paid and expired bookings`);
    }
  } catch (err) {
    console.error("Auto-completion failed:", err.message);
  }
};

export default autoCompleteExpiredBookings;
