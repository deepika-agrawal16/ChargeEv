// controllers/stationController.js

import Station from "../models/station.js";

export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find({});
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stations", error: err.message });
  }
};

