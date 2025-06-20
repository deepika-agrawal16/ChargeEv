import React from "react";
import aboutImage from "../assets/images/about.jpg"; 

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="container flex flex-col items-center justify-center gap-12 md:flex-row md:gap-20">
        {/* Left - Image */}
        <div className="w-full max-w-md">
          <img
            src={aboutImage}
            alt="EV Charging Illustration"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right - Text */}
        <div className="w-full max-w-xl text-center text-gray-800 md:text-left">
           <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Charge<span className="italic">EV⚡</span>
        </div>
          <p className="mb-4 text-lg">
            ChargeEV is your modern companion for electric vehicle charging. Our
            mission is to simplify the way you find, book, and manage EV charging
            stations. Whether you're on a daily commute or a weekend trip,
            ChargeEV helps ensure you're always powered up.
          </p>
          <p className="mb-4">
            This app was proudly built with passion and purpose, to create a real-world
            solution for a cleaner, greener future. 🌱
          </p>
          <p className="text-sm text-gray-600">
            Together, let’s drive towards a smarter and more sustainable tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
