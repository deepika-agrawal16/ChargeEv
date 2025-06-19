import Booking from "../models/Booking.js";
import Station from "../models/station.js";

const autoCompleteExpiredBookings = async () => {
  const now = new Date();

  const expiredBookings = await Booking.find({
    status: "booked",
    endTime: { $lt: now }
  });

  for (const booking of expiredBookings) {
    booking.status = "completed";
    booking.isPaid = false; // user missed paying
    booking.paymentTime = null;
    await booking.save();

    const station = await Station.findById(booking.station);
    if (station) {
      station.availability = true;
      await station.save();
    }
  }

  console.log(`✅ Auto-completed ${expiredBookings.length} expired bookings`);
};

export default autoCompleteExpiredBookings;
