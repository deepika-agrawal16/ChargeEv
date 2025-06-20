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

export const createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json({ message: "Station created successfully", station });
  } catch (err) {
    console.error("Error creating station:", err);
    res.status(500).json({ message: "Server error while creating station." });
  }
};

// Delete a station
export const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Station.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.status(200).json({ message: "Station deleted successfully" });
  } catch (err) {
    console.error("Error deleting station:", err);
    res.status(500).json({ message: "Server error while deleting station." });
  }
};
