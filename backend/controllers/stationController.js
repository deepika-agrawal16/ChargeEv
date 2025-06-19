import Station from "../models/station.js";

// Get all stations
export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find({});
    res.status(200).json({ stations });
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ message: "Server error while fetching stations." });
  }
};
