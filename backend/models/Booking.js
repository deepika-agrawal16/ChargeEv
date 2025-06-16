import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  station: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  bookingTime: { type: Date, default: Date.now },
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
