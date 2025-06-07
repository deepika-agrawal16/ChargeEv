import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="flex gap-4">
      <Link 
        to="/login"
        className="px-4 py-2 text-sm font-semibold text-white transition bg-transparent border border-white rounded-full hover:bg-white hover:text-black md:px-6 md:text-base"
      >
        Login
      </Link>
      <Link 
        to="/signup"
        className="px-4 py-2 text-sm font-semibold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-300 md:px-6 md:text-base"
      >
        Signup
      </Link>
    </div>
  );
};

export default AuthButtons;