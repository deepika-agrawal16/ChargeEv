// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaChargingStation, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// export default function BookingHistory() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("User not authenticated");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setBookings(res.data);
//       } catch (err) {
//         console.error("Error fetching bookings", err);
//         setError("Failed to fetch bookings. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-lg text-green-700">
//         Fetching your bookings...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-green-50">
//       <h1 className="mb-5 text-3xl font-bold text-center text-green-700">
//         My Booking History
//       </h1>

//       {error && (
//         <p className="mb-4 text-center text-red-600">{error}</p>
//       )}

//       {bookings.length === 0 ? (
//         <p className="text-center text-gray-600">No bookings yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {bookings.map((booking) => (
//             <div key={booking._id} className="p-4 transition bg-white rounded-lg shadow hover:shadow-lg">
//               <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold text-green-800">
//                 <FaChargingStation className="text-green-600" />
//                 {booking?.station?.name}
//               </h2>

//               <p className="flex items-center gap-2 mb-1 text-gray-700">
//                 <FaMapMarkerAlt className="text-red-600" /> {booking?.station?.address}
//               </p>

//               <p className="flex items-center gap-2 mb-1 text-gray-700">
//                 <FaCalendarAlt className="text-blue-600" />
//                 Booked On: {new Date(booking.bookingTime).toLocaleString()}
//               </p>

//               <p className="mt-2 text-sm font-medium text-green-600">
//                 Status: {booking.status}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChargingStation, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="mb-5 text-3xl font-bold text-center text-green-700">My Booking History</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-4 transition bg-white rounded-lg shadow hover:shadow-lg">
              <h2 className="flex items-center gap-2 mb-2 text-xl font-semibold text-green-800">
                <FaChargingStation className="text-green-600" /> {booking.station.name}
              </h2>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaMapMarkerAlt className="text-red-600" /> {booking.station.address}
              </p>

              <p className="flex items-center gap-2 mb-1 text-gray-700">
                <FaCalendarAlt className="text-blue-600" /> Booked On: {new Date(booking.bookingTime).toLocaleString()}
              </p>

              <p className="mt-2 text-sm font-medium text-green-600">
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
