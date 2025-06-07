import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from '../ui/AuthButtons.jsx';
import logo from '../../assets/images/landinglogo.jpg'; // Your logo image

const Header = () => {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
      {/* Left - Logo */}
      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="EV Logo" 
          className="w-12 h-12 rounded-full shadow-lg" 
        />
      </Link>

      {/* Center - Navigation Links */}
      <nav className="hidden md:flex gap-8 text-lg font-medium text-white">
        <Link to="/" className="transition hover:text-yellow-300">Home</Link>
        <Link to="/about" className="transition hover:text-yellow-300">About</Link>
        <Link to="/blog" className="transition hover:text-yellow-300">Blog</Link>
        <Link to="/contact" className="transition hover:text-yellow-300">Contact</Link>
      </nav>

      {/* Right - Auth Buttons */}
      <AuthButtons />
    </header>
  );
};

export default Header;