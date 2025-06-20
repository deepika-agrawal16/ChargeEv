import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Background from '../components/layout/Background.jsx';
import PrimaryButton from '../components/ui/Button.jsx';
import SecondaryButton from '../components/ui/Button.jsx';
import Working from './Working.jsx';
import About from './About.jsx';
import Blog from './Blog.jsx';
import Contact from './Contact.jsx';
import Footer from '../components/layout/Footer.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/charging-stations");
    } else {
      navigate("/login");
    }
  };

  const scrollToInfo = () => {
    const section = document.getElementById("info-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Optional: on mount, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
              <PrimaryButton onClick={handleExplore}>Explore Stations</PrimaryButton>
              <SecondaryButton onClick={scrollToInfo}>How It Works</SecondaryButton>
            </div>
          </div>
        </main>
      </Background>

      {/* Extended Info Sections */}
      <div id="info-section" className="overflow-x-hidden">
        <Working />
        <About />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
