// import React from "react";
// import {
//   FaMapMarkerAlt, FaCity, FaMapPin, FaChargingStation,
//   FaRupeeSign, FaPhone, FaCheckCircle, FaStar, FaBolt
// } from "react-icons/fa";
// import car1 from "../../assets/images/car1.jpg";
// import car2 from "../../assets/images/car2.jpg";
// import car3 from "../../assets/images/car3.jpg";
// import car4 from "../../assets/images/car4.jpg";
// import car5 from "../../assets/images/car5.jpg";
// import car6 from "../../assets/images/car6.jpg";
// import car7 from "../../assets/images/car7.webp";
// import car8 from "../../assets/images/car8.jpg";

// export default function StationCard({ station }) {
//   const carImages = [car1, car2, car3, car4, car5, car6, car7, car8];
//   const image = carImages[Math.floor(Math.random() * carImages.length)];

//   const handleBooking = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch("/api/bookings", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ stationId: station._id }), // ✅ fixed here
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("✅ Booking Successful!\n\nYou will receive a confirmation email/SMS if details were provided.");
//     } else {
//       alert(data.message || "⚠️ Booking Failed");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("❌ Booking Failed");
//   }
// };


//   return (
//     <div className={`flex flex-col p-4 mb-5 border rounded-lg shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform ${station.availability ? 'bg-white' : 'bg-gray-100 opacity-70'}`}>
//       <img src={image} alt="charging-station" className="object-cover w-full h-40 mb-3 rounded-lg" />

//       <h2 className="mb-2 text-lg font-bold text-center text-green-800">{station.name}</h2>

//       <div className="flex items-center justify-center mb-2 text-yellow-500">
//         {[...Array(5)].map((_, i) => (
//           <FaStar key={i} className="mr-1" />
//         ))}
//         <span className="ml-2 text-sm text-gray-600">(5.0)</span>
//       </div>

//       {/* Info Grid */}
//       <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
//         {station.address && (
//           <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> {station.address}</p>
//         )}
//         {station.city && (
//           <p className="flex items-center gap-2"><FaCity className="text-blue-500" /> {station.city}</p>
//         )}
//         {station.pincode && (
//           <p className="flex items-center gap-2"><FaMapPin className="text-purple-500" /> {station.pincode}</p>
//         )}
//         {station.pricing && (
//           <p className="flex items-center gap-2"><FaChargingStation className="text-green-500" /> {station.pricing}</p>
//         )}
//         <p className="flex items-center gap-2">
//           <FaRupeeSign className="text-yellow-600" />
//           {station.availability ? "Available" : "Unavailable"}
//         </p>
//         {station.contact && (
//           <p className="flex items-center gap-2"><FaPhone className="text-indigo-500" /> {station.contact}</p>
//         )}
//         {station.state && (
//           <p className="flex items-center gap-2"><FaCheckCircle className="text-pink-500" /> {station.state}</p>
//         )}
//         {station.type && station.type !== "0" && (
//           <p className="flex items-center gap-2"><FaBolt className="text-orange-500" /> Type: {station.type}</p>
//         )}
//         {station.connectors?.length > 0 && (
//           <p className="flex items-center gap-2">🔌 Connectors: {station.connectors.join(", ")}</p>
//         )}
//       </div>

//       {/* Book Now */}
//       <div className="flex justify-center gap-2 mt-4">
//         <button
//           onClick={handleBooking}
//           className="flex-1 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
//         >
//           Book Now
//         </button>
//       </div>

//       {/* Booking Info */}
//       <div className="mt-3 text-xs text-gray-600">
//         <b>How to Book:</b> Click "Book Now" &mdash; you'll receive confirmation by email/SMS if you provide contact info. Show your booking at the station.
//       </div>
//     </div>
//   );
// }
// 📁 frontend/src/components/StationCard.jsx
import React, { useState } from "react";
import {
  FaMapMarkerAlt, FaCity, FaMapPin, FaChargingStation,
  FaRupeeSign, FaPhone, FaCheckCircle, FaStar, FaBolt
} from "react-icons/fa";
import car1 from "../../assets/images/car1.jpg";
import car2 from "../../assets/images/car2.jpg";
import car3 from "../../assets/images/car3.jpg";
import car4 from "../../assets/images/car4.jpg";
import car5 from "../../assets/images/car5.jpg";
import car6 from "../../assets/images/car6.jpg";
import car7 from "../../assets/images/car7.webp";
import car8 from "../../assets/images/car8.jpg";

export default function StationCard({ station }) {
  const carImages = [car1, car2, car3, car4, car5, car6, car7, car8];
  const image = carImages[Math.floor(Math.random() * carImages.length)];

  const [duration, setDuration] = useState(15); // default 15 minutes
  const [connectorType, setConnectorType] = useState(station.connectors?.[0] || "Type2");

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first.");

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stationId: station._id,
          durationMinutes: duration,
          connectorType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`\u2705 Booking Successful!\n\nDuration: ${duration} min\nConnector: ${connectorType}\nTotal: ₹${data.booking.amount}`);
      } else {
        alert(data.message || "\u26A0\uFE0F Booking Failed");
      }
    } catch (err) {
      console.error(err);
      alert("\u274C Booking Failed");
    }
  };

  return (
    <div className={`flex flex-col p-4 mb-5 border rounded-lg shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform ${station.availability ? 'bg-white' : 'bg-gray-100 opacity-70'}`}>
      <img src={image} alt="charging-station" className="object-cover w-full h-40 mb-3 rounded-lg" />

      <h2 className="mb-2 text-lg font-bold text-center text-green-800">{station.name}</h2>

      <div className="flex items-center justify-center mb-2 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="mr-1" />
        ))}
        <span className="ml-2 text-sm text-gray-600">(5.0)</span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        {station.address && (
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> {station.address}</p>
        )}
        {station.city && (
          <p className="flex items-center gap-2"><FaCity className="text-blue-500" /> {station.city}</p>
        )}
        {station.pincode && (
          <p className="flex items-center gap-2"><FaMapPin className="text-purple-500" /> {station.pincode}</p>
        )}
        {station.pricing && (
          <p className="flex items-center gap-2"><FaChargingStation className="text-green-500" /> {station.pricing}</p>
        )}
        <p className="flex items-center gap-2">
          <FaRupeeSign className="text-yellow-600" />
          {station.availability ? "Available" : "Unavailable"}
        </p>
        {station.contact && (
          <p className="flex items-center gap-2"><FaPhone className="text-indigo-500" /> {station.contact}</p>
        )}
        {station.state && (
          <p className="flex items-center gap-2"><FaCheckCircle className="text-pink-500" /> {station.state}</p>
        )}
        {station.type && station.type !== "0" && (
          <p className="flex items-center gap-2"><FaBolt className="text-orange-500" /> Type: {station.type}</p>
        )}
        {station.connectors?.length > 0 && (
          <p className="flex items-center gap-2">🔌 Connectors: {station.connectors.join(", ")}</p>
        )}
      </div>

      {/* Connector Type + Duration Inputs */}
      <div className="flex flex-col gap-2 mt-3">
        <label className="text-sm">Connector Type:</label>
        <select value={connectorType} onChange={e => setConnectorType(e.target.value)} className="p-1 border rounded">
          {station.connectors?.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>

        <label className="mt-2 text-sm">Booking Duration (minutes):</label>
        <input type="number" min={5} value={duration} onChange={e => setDuration(+e.target.value)} className="p-1 border rounded" />
      </div>

      {/* Book Now */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handleBooking}
          disabled={!station.availability}
          className="flex-1 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Book Now
        </button>
      </div>

      {/* Booking Info */}
      <div className="mt-3 text-xs text-gray-600">
        <b>How to Book:</b> Select connector type and duration, then click "Book Now". Confirmation will be sent.
      </div>
    </div>
  );
}
