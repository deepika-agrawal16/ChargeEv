import React, { useState } from "react";
import { FaBolt, FaMapMarkerAlt, FaCarBattery } from "react-icons/fa";

const blogPosts = [
  {
    title: "5 Reasons to Switch to Electric Vehicles",
    icon: <FaBolt className="text-xl text-green-600" />,
    summary: "From cost savings to eco-friendliness, EVs are redefining travel.",
    content:
      "Electric vehicles (EVs) offer benefits like lower running costs, fewer emissions, and a quieter ride. As governments incentivize green transport and infrastructure grows, it's a great time to make the switch to an EV and contribute to a sustainable future.",
  },
  {
    title: "How to Find EV Charging Stations Easily",
    icon: <FaMapMarkerAlt className="text-xl text-green-600" />,
    summary: "Discover how apps like ChargeEV simplify your charging experience.",
    content:
      "Apps like ChargeEV let you locate nearby charging stations, check availability in real time, and even reserve a slot. With route planning and usage history features, it makes EV ownership smoother and more convenient.",
  },
  {
    title: "Battery Care Tips for Your EV",
    icon: <FaCarBattery className="text-xl text-green-600" />,
    summary: "Keep your EV battery healthy with these simple habits.",
    content:
      "Avoid frequent deep discharges, charge to around 80% for daily use, and keep your EV parked in the shade during hot days. These tips extend battery life and improve overall performance of your electric vehicle.",
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-5xl mx-auto text-center text-gray-800">
        <h1 className="mb-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Charge<span className="italic">EV⚡ Insights & Tips</span>
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="p-5 text-left transition bg-white border shadow rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                {post.icon}
                <h2 className="text-lg font-semibold text-green-700">{post.title}</h2>
              </div>
              <p className="text-sm text-gray-600">{post.summary}</p>
              <button
                className="px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                onClick={() => setSelectedPost(post)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Modal for "Read More" */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-2 text-xl font-bold text-green-700">{selectedPost.title}</h2>
              <p className="mb-4 text-gray-700">{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
