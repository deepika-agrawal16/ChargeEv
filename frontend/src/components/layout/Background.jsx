import React from 'react';
import backgroundImage from '../../assets/images/image2.jpg'; // Your background image

const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      {children}
    </div>
  );
};

export default Background;