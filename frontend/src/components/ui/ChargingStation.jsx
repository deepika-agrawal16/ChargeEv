import React, { useEffect, useState } from "react";
import StationCard from "./StationCard.jsx";
import MapComponent from "./MapComponent.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function ChargingStation() {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch("/api/stations");
        const data = await res.json();
        const fetched = data.stations || data;

        // Sanitize on fetch (ensure lat/lng and connectors exist)
        const cleaned = fetched.filter(
          (station) =>
            station.latitude &&
            station.longitude &&
            station.latitude !== "NA" &&
            station.longitude !== "NA" &&
            !isNaN(parseFloat(station.latitude)) &&
            !isNaN(parseFloat(station.longitude))
        );

        setStations(cleaned);
        setFilteredStations(cleaned);
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    let filtered = stations;

    if (filter === "available") {
      filtered = stations.filter((s) => s.availability === 1 || s.availability === true);
    } else if (filter === "unavailable") {
      filtered = stations.filter((s) => s.availability === 0 || s.availability === false);
    }

    if (search.trim()) {
      filtered = filtered.filter(
        (s) =>
          s.city?.toLowerCase().includes(search.toLowerCase()) ||
          s.state?.toLowerCase().includes(search.toLowerCase()) ||
          s.pincode?.toString().includes(search) ||
          s.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredStations(filtered);
  }, [search, filter, stations]);

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-col flex-1 h-screen">
        <Navbar
          showSearch={true}
          search={search}
          handleSearch={(e) => setSearch(e.target.value)}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Left: Scrollable Station Panel */}
          <div className="flex flex-col w-full md:w-1/2 lg:w-2/5 bg-green-50">
            {/* Filter Buttons */}
            <div className="z-10 flex justify-center gap-3 p-4 shadow-sm bg-green-50">
              {["all", "available", "unavailable"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                    filter === type
                      ? "bg-green-600 text-white"
                      : "bg-white text-green-600 border border-green-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Scrollable Station List */}
            <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
              {filteredStations.length === 0 ? (
                <p className="mt-6 text-center text-gray-600">No stations found.</p>
              ) : (
                filteredStations.map((station) => (
                  <StationCard key={station.stationid || station._id} station={station} />
                ))
              )}
            </div>
          </div>

          {/* Right: Map Panel */}
          <div className="flex-1 hidden h-full md:block">
            <MapComponent stations={filteredStations} />
          </div>
        </div>
      </div>
    </div>
  );
}
