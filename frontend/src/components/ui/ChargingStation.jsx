import React, { useEffect, useState } from "react";
import StationCard from "./StationCard.jsx";
import MapComponent from "./MapComponent.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";  // ✅ Correct import here
import axios from "axios";

export default function ChargingStation() {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stations");
        setStations(response.data);
        setFilteredStations(response.data);
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    fetchStations();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = stations.filter(
      (station) =>
        station.state.toLowerCase().includes(value.toLowerCase()) ||
        station.city.toLowerCase().includes(value.toLowerCase()) ||
        station.pincode.toString().includes(value)
    );
    setFilteredStations(filtered);
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar (with toggle button inside) */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar showSearch={true} search={search} handleSearch={handleSearch} />

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Station List */}
          <div className="w-full p-6 overflow-y-auto shadow-md bg-green-50 md:w-1/2 lg:w-2/5">
            <h2 className="mb-5 text-3xl font-extrabold text-green-800">Charging Stations</h2>

            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-4 py-2 text-white transition bg-green-600 rounded-full hover:bg-green-700">All</button>
              <button className="px-4 py-2 text-white transition bg-blue-500 rounded-full hover:bg-blue-600">Available</button>
              <button className="px-4 py-2 text-white transition bg-indigo-500 rounded-full hover:bg-indigo-600">Rapid Chargers</button>
            </div>

            {filteredStations.map((station) => (
              <StationCard key={station._id} station={station} />
            ))}
          </div>

          {/* Map */}
          <div className="flex-1 hidden h-full md:block">
            <MapComponent stations={filteredStations} />
          </div>
        </div>
      </div>
    </div>
  );
}
