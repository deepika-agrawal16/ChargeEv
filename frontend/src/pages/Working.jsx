import React from "react";
import {
  FaMapMarkedAlt,
  FaClock,
  FaPlug,
  FaRupeeSign,
  FaBolt
} from "react-icons/fa";

const steps = [
  {
    icon: <FaMapMarkedAlt className="text-3xl text-green-600" />,
    title: "Find Nearby Station",
    desc: "Locate EV charging stations near you with real-time availability and connector types."
  },
  {
    icon: <FaClock className="text-3xl text-green-600" />,
    title: "Select Time Slot",
    desc: "Choose your desired time and duration — reserve your charging slot in advance."
  },
  {
    icon: <FaPlug className="text-3xl text-green-600" />,
    title: "Plug & Charge",
    desc: "Arrive at the station, plug in your EV, and let the smart charging begin."
  },
  {
    icon: <FaRupeeSign className="text-3xl text-green-600" />,
    title: "Pay & Go",
    desc: "Pay securely through the app based on the charging time. Simple and seamless!"
  }
];

export default function Working() {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="flex items-center justify-center gap-2 mb-2 text-4xl font-bold text-green-800">
            <FaBolt className="text-yellow-500" />
            How ChargeEV⚡ Works
          </h1>
          <p className="text-lg text-gray-600">
            Simple. Smart. Sustainable. Here's how you charge your vehicle using ChargeEV.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 text-center transition duration-300 bg-white shadow rounded-xl hover:shadow-md"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-green-700">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="p-10 mt-16 text-center text-white bg-green-700 shadow-lg rounded-2xl">
          <h2 className="mb-3 text-2xl font-bold">Start Your EV Journey Today</h2>
          <p className="mb-6 text-sm md:text-base">
            Whether you're commuting or road-tripping, ChargeEV ensures a stress-free charging experience.
          </p>
          <a
            href="/stations"
            className="inline-block px-6 py-3 font-semibold text-green-900 transition bg-yellow-400 rounded-full shadow hover:bg-yellow-300"
          >
            Find Charging Stations
          </a>
        </div>
      </div>
    </div>
  );
}
