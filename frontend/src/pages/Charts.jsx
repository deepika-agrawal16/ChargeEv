import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaChartBar, FaStopwatch, FaCalendarAlt, FaChargingStation } from "react-icons/fa";

export default function Charts() {
  const [bookingStats, setBookingStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({ totalMinutes: 0, avgDuration: 0, favoriteStation: "-" });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bookings/user-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBookingStats(data.chart || []);
        setInfo({
          totalMinutes: data.totalMinutes || 0,
          avgDuration: data.avgDuration || 0,
          favoriteStation: data.favoriteStation || "-"
        });
      } else {
        console.error("Failed to fetch user stats", data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-white border rounded-lg shadow">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-green-700">
        <FaChartBar className="text-green-600" /> Your Weekly Booking Usage
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : bookingStats.length === 0 ? (
        <p className="text-gray-600">No booking data available.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingStats} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="durationMinutes" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
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
          </div>
        </>
      )}
    </div>
  );
}
