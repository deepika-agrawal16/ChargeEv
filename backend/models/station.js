// models/Station.js

import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  pincode: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  pricing: { type: String, default: "Free" },
  availability: { type: Boolean, default: true },
});

const Station = mongoose.model("Station", stationSchema);
export default Station;
