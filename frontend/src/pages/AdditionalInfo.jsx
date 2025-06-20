import React, { useEffect, useState } from "react";
import {
  FaStopwatch,
  FaCalendarAlt,
  FaChargingStation,
  FaBolt
} from "react-icons/fa";

export default function AdditionalInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bookings/user-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setInfo({
          totalMinutes: data.totalMinutes || 0,
          avgDuration: data.avgDuration || 0,
          favoriteStation: data.favoriteStation || "-"
        });
      } else {
        console.error("Failed to fetch stats", data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="p-6 mt-4 bg-white border rounded-lg shadow">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-green-700">
        <FaBolt className="text-green-600" /> Additional Info
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : !info ? (
        <p className="text-red-500">No info available</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 p-4 border rounded-lg shadow bg-green-50">
            <FaStopwatch className="text-xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Usage</p>
              <p className="text-lg font-semibold text-green-700">{info.totalMinutes} min</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg shadow bg-green-50">
            <FaCalendarAlt className="text-xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Avg Duration</p>
              <p className="text-lg font-semibold text-green-700">{info.avgDuration} min</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg shadow bg-green-50">
            <FaChargingStation className="text-xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Favorite Station</p>
              <p className="text-lg font-semibold text-green-700">{info.favoriteStation}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg shadow bg-yellow-50">
            <FaBolt className="text-xl text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Why ChargeEV?</p>
              <p className="text-sm text-green-700">
                ChargeEV helps you book EV stations, track your usage, and optimize charging efficiency for your vehicle. 🚗⚡
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
