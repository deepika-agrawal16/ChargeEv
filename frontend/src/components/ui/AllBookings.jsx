import React, { useEffect, useState } from "react";
import {
  FaChargingStation,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaRupeeSign,
  FaClock,
  FaPlug,
  FaUser
} from "react-icons/fa";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://chargeev-backend-g7ik.onrender.com/api/bookings/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setBookings(data.bookings); 
      } else {
        console.error("Failed fetching bookings:", data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const cancelBooking = async (id) => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    try {
      const res = await fetch(`https://chargeev-backend-g7ik.onrender.com/api/bookings/admin/cancel/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Booking cancelled successfully.");
        fetchAllBookings();
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-green-100 to-green-200">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-green-700">All Bookings (Admin View)</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 transition bg-white border rounded-lg shadow hover:shadow-lg"
            >
              <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold text-green-800">
                <FaChargingStation className="text-green-600" />
                {booking?.station?.name || "Unnamed Station"}
              </h2>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaUser className="text-green-500" /> User: {booking?.user?.name || booking?.user?.email || "Unknown"}
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaMapMarkerAlt className="text-red-600" />
                {booking?.station?.address || "No address available"}
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaCalendarAlt className="text-blue-600" />
                Booked On: {booking.bookingTime ? new Date(booking.bookingTime).toLocaleString() : "Unknown time"}
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaClock className="text-indigo-500" /> Duration: {booking.durationMinutes} min
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaRupeeSign className="text-yellow-600" /> Amount: ₹{booking.amount}
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaPlug className="text-purple-500" /> Connector: {booking.connectorType}
              </p>

              <p className="mt-2 text-sm font-medium text-green-600">
                Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </p>

              {booking.status === "booked" && (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="flex items-center justify-center w-full px-4 py-2 mt-3 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  <FaTrashAlt className="mr-2" /> Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
