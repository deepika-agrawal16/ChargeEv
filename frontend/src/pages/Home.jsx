// import React from 'react';
// import backgroundImage from '../assets/images/image2.jpg'; // Your background image
// import logo from '../assets/images/landinglogo.jpg'; // Your logo image

// const LandingPage = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Blurred Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src={backgroundImage}
//           alt="Background"
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
//       </div>

//       {/* Navigation Bar */}
//       <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
//         {/* Left - Logo */}
//         <div className="flex items-center">
//           <img src={logo} alt="EV Logo" className="w-12 h-12 rounded-full shadow-lg" />
//         </div>

//         {/* Center - Navigation Links */}
//         <nav className="hidden md:flex gap-8 text-lg font-medium text-white">
//           <a href="#home" className="transition hover:text-yellow-300">Home</a>
//           <a href="#about" className="transition hover:text-yellow-300">About</a>
//           <a href="#blog" className="transition hover:text-yellow-300">Blog</a>
//           <a href="#contact" className="transition hover:text-yellow-300">Contact</a>
//         </nav>

//         {/* Right - Auth Buttons */}
//         <div className="flex gap-4">
//           <button className="px-4 py-2 text-sm font-semibold text-white transition bg-transparent border border-white rounded-full hover:bg-white hover:text-black md:px-6 md:text-base">
//             Login
//           </button>
//           <button className="px-4 py-2 text-sm font-semibold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-300 md:px-6 md:text-base">
//             Signup
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-6">
//         <div className="max-w-3xl">
//           <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
//             Find Your Nearest <span className="text-yellow-300">EV Station</span>
//           </h1>
//           <p className="mb-8 text-xl text-gray-200 md:text-2xl">
//             Discover the best charging spots with real-time availability and top-rated stations
//           </p>
//           <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
//             <button className="px-8 py-4 text-lg font-semibold text-black transition transform bg-yellow-400 rounded-full hover:bg-yellow-300 hover:scale-105">
//               Explore Stations
//             </button>
//             <button className="px-8 py-4 text-lg font-semibold text-white transition transform bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black hover:scale-105">
//               How It Works
//             </button>
//           </div>
//         </div>

        
//       </main>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import Header from '../components/layout/Header.jsx';
import Background from '../components/layout/Background.jsx';
import PrimaryButton from '../components/ui/Button.jsx';
import SecondaryButton from '../components/ui/Button.jsx';

const HomePage = () => {
  return (
    <Background>
      <Header />
      <main className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-6">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Find Your Nearest <span className="text-yellow-300">EV Station</span>
          </h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            Discover the best charging spots with real-time availability
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <PrimaryButton>Explore Stations</PrimaryButton>
            <SecondaryButton>How It Works</SecondaryButton>
          </div>
        </div>
      </main>
    </Background>
  );
};

export default HomePage;