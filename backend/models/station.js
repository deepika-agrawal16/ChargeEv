import { Schema, model } from 'mongoose';

const stationSchema = new Schema(
  {
    stationid: { type: String },                   // optional if _id is enough
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },                     // Keep as string to preserve leading zeros
    latitude: { type: String },                    // Can change to Number if needed
    longitude: { type: String },
    availability: { type: Boolean, default: true }, // Better as Boolean (true = available)
    isValidated: { type: Boolean, default: false }, // Use Boolean instead of String "yes"/"no"
    issue: { type: Number, default: 0 },
    pricing: { type: String },                      // Could also be Number + unit field
    type: { type: String },                         // AC/DC etc.
    contact: { type: String },
    phones: { type: String },
    notes: { type: String },
    connectors: [{ type: String }],
  },
  { timestamps: true }
);

export default model('Station', stationSchema);
