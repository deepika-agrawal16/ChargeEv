// import React, { useEffect, useState } from "react";
// import {
//   FaChargingStation,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaTrashAlt,
//   FaRupeeSign,
//   FaClock,
// } from "react-icons/fa";

// export default function BookingHistory() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5000/api/bookings/my-bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setBookings(data);
//       } else {
//         console.error("Failed fetching bookings:", data);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const clearHistory = async () => {
//     const token = localStorage.getItem("token");
//     const confirmed = window.confirm("Are you sure you want to delete all bookings?");
//     if (!confirmed) return;

//     try {
//       const res = await fetch("http://localhost:5000/api/bookings/clear", {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         alert("✅ Booking history cleared.");
//         setBookings([]);
//       } else {
//         alert("❌ Failed to clear history");
//       }
//     } catch (err) {
//       console.error("Error clearing history:", err);
//     }
//   };

//   const completeBooking = async (id) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:5000/api/bookings/complete/${id}`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Booking completed and station released.");
//         fetchBookings();
//       } else {
//         alert(data.message || "❌ Failed to complete booking");
//       }
//     } catch (err) {
//       console.error("Error completing booking:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-green-50">
//       <div className="flex items-center justify-between mb-5">
//         <h1 className="text-3xl font-bold text-green-700">My Booking History</h1>
//         {bookings.length > 0 && (
//           <button
//             onClick={clearHistory}
//             className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
//           >
//             <FaTrashAlt /> Clear All
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : bookings.length === 0 ? (
//         <p className="text-center text-gray-600">No bookings yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="p-4 transition bg-white border rounded-lg shadow hover:shadow-lg"
//             >
//               <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold text-green-800">
//                 <FaChargingStation className="text-green-600" />
//                 {booking?.station?.name || "Unnamed Station"}
//               </h2>

//               <p className="flex items-center gap-2 mb-1 text-gray-700">
//                 <FaMapMarkerAlt className="text-red-600" />
//                 {booking?.station?.address || "No address available"}
//               </p>

//               <p className="flex items-center gap-2 mb-1 text-gray-700">
//                 <FaCalendarAlt className="text-blue-600" />
//                 Booked On: {booking.bookingTime ? new Date(booking.bookingTime).toLocaleString() : "Unknown time"}
//               </p>

//               <p className="flex items-center gap-2 mb-1 text-gray-700">
//                 <FaClock className="text-indigo-500" /> Duration: {booking.durationMinutes} min
//               </p>

//               <p className="flex items-center gap-2 mb-1 text-gray-700">
//                 <FaRupeeSign className="text-yellow-600" /> Amount: ₹{booking.amount}
//               </p>

//               <p className="mt-2 text-sm font-medium text-green-600">
//                 Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//               </p>

//               {booking.status === "booked" && !booking.isPaid && (
//                 <button
//                   onClick={() => completeBooking(booking._id)}
//                   className="px-4 py-2 mt-3 text-sm text-white bg-green-600 rounded hover:bg-green-700"
//                 >
//                   Complete & Pay
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  FaChargingStation,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";
import PaymentModal from "./PaymentModal";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setBookings(data);
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
    fetchBookings();
  }, []);

  const clearHistory = async () => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm("Are you sure you want to delete all bookings?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:5000/api/bookings/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("✅ Booking history cleared.");
        setBookings([]);
      } else {
        alert("❌ Failed to clear history");
      }
    } catch (err) {
      console.error("Error clearing history:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-green-700">My Booking History</h1>
        {bookings.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            <FaTrashAlt /> Clear All
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings yet.</p>
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

              <p className="mt-2 text-sm font-medium text-green-600">
                Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </p>

              {booking.status === "booked" && !booking.isPaid && (
                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="px-4 py-2 mt-3 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Complete & Pay
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onSuccess={fetchBookings}
        />
      )}
    </div>
  );
}
