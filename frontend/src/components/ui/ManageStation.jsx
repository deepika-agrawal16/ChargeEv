import React, { useEffect, useState } from "react";
import StationCard from "./StationCard.jsx";
import MapComponent from "./MapComponent.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function ManageStation() {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userState, setUserState] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch("/api/stations");
        const data = await res.json();
        const fetched = data.stations || data;

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
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("/api/bookings/expiring", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setNotifications(data);
      } catch (err) {
        console.error("Notification fetch failed", err);
      }
    };

    fetchStations();
    fetchNotifications();

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await res.json();
        if (data.principalSubdivision) {
          setUserState(data.principalSubdivision);
        }
      } catch (err) {
        console.error("Failed to reverse geocode:", err);
      }
    });
  }, []);

  const filteredStations = stations.filter((s) => {
    if (filter === "available" && !(s.availability === 1 || s.availability === true)) return false;
    if (filter === "unavailable" && !(s.availability === 0 || s.availability === false)) return false;
    if (userState && !s.state?.toLowerCase().includes(userState.toLowerCase())) return false;
    if (
      search.trim() &&
      !(
        s.city?.toLowerCase().includes(search.toLowerCase()) ||
        s.state?.toLowerCase().includes(search.toLowerCase()) ||
        s.pincode?.toString().includes(search) ||
        s.name?.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-col flex-1 h-screen">
        <Navbar
          showSearch={true}
          search={search}
          handleSearch={(e) => setSearch(e.target.value)}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
        />

        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700">
          {userState && (
            <p>
              Showing EV stations in <strong>{userState}</strong>
            </p>
          )}
          <button
            className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => (window.location.href = "/admin/add-station")}
          >
            ➕ Add Station
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col w-full md:w-1/2 lg:w-2/5 bg-green-50">
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

            <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
              {filteredStations.length === 0 ? (
                <p className="mt-6 text-center text-gray-600">No stations found.</p>
              ) : (
                filteredStations.map((station) => (
                  <StationCard
                    key={station.stationid || station._id}
                    station={station}
                    mode="admin"
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex-1 hidden h-full md:block">
            <MapComponent stations={filteredStations} />
          </div>
        </div>
      </div>
    </div>
  );
}
