import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    connectorType: {
      type: String,
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 5,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    bookingTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);