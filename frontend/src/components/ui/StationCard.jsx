// import React from "react";
// import axios from "axios";
// import {
//   FaMapMarkerAlt, FaCity, FaMapPin, FaChargingStation,
//   FaRupeeSign, FaPhone, FaCheckCircle
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
//     try {
//       const token = localStorage.getItem("token");
//       console.log(token);
//       const response = await axios.post(
//         "http://localhost:5000/api/bookings",
//         { stationId: station._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Booking Successful!");
//     } catch (err) {
//       console.error(err);
//       alert("Booking Failed");
//     }
//   };

//   return (
//     <div className="flex flex-col p-4 mb-5 transition-transform duration-300 bg-white border rounded-lg shadow-md hover:shadow-xl hover:scale-[1.03]">
//       <img src={image} alt="charging-station" className="object-cover w-full h-40 mb-3 rounded-lg" />
//       <h2 className="mb-3 text-lg font-bold text-center text-green-800">{station.name}</h2>

//       <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
//         <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> {station.address}</p>
//         <p className="flex items-center gap-2"><FaCity className="text-blue-500" /> {station.city}</p>
//         <p className="flex items-center gap-2"><FaMapPin className="text-purple-500" /> {station.pincode}</p>
//         <p className="flex items-center gap-2"><FaChargingStation className="text-green-500" /> {station.pricing}</p>
//         <p className="flex items-center gap-2"><FaRupeeSign className="text-yellow-600" /> {station.availability ? "Available" : "Unavailable"}</p>
//         <p className="flex items-center gap-2"><FaPhone className="text-indigo-500" /> {station.contact || "N/A"}</p>
//         <p className="flex items-center gap-2"><FaCheckCircle className="text-pink-500" /> {station.state}</p>
//       </div>

//       <button
//         className="py-2 mt-4 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
//         onClick={handleBooking}
//       >
//         Book Now
//       </button>
//     </div>
//   );
// }

import React from "react";
import axios from "axios";
import {
  FaMapMarkerAlt, FaCity, FaMapPin, FaChargingStation,
  FaRupeeSign, FaPhone, FaCheckCircle
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

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        { stationId: station._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking Successful!");
    } catch (err) {
      console.error(err);
      alert("Booking Failed");
    }
  };

  return (
    <div className="flex flex-col p-4 mb-5 bg-white border rounded-lg shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform">
      <img src={image} alt="charging-station" className="object-cover w-full h-40 mb-3 rounded-lg" />
      <h2 className="mb-3 text-lg font-bold text-center text-green-800">{station.name}</h2>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> {station.address}</p>
        <p className="flex items-center gap-2"><FaCity className="text-blue-500" /> {station.city}</p>
        <p className="flex items-center gap-2"><FaMapPin className="text-purple-500" /> {station.pincode}</p>
        <p className="flex items-center gap-2"><FaChargingStation className="text-green-500" /> {station.pricing}</p>
        <p className="flex items-center gap-2"><FaRupeeSign className="text-yellow-600" /> {station.availability ? "Available" : "Unavailable"}</p>
        <p className="flex items-center gap-2"><FaPhone className="text-indigo-500" /> {station.contact || "N/A"}</p>
        <p className="flex items-center gap-2"><FaCheckCircle className="text-pink-500" /> {station.state}</p>
      </div>

      <button onClick={handleBooking} className="py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700">
        Book Now
      </button>
    </div>
  );
}
