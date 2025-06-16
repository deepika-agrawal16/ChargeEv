// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import Button from "../ui/Button.jsx";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [profileImage, setProfileImage] = useState("assets/images/ai_logo.webp");

//   const loadProfileImage = () => {
//     const userData = localStorage.getItem("user");
//     const localImage = localStorage.getItem("profileImage");

//     if (userData) {
//       const user = JSON.parse(userData);

//       if (localImage) {
//         setProfileImage(localImage);
//       } else if (user.profileImage) {
//         setProfileImage(user.profileImage);
//       } else {
//         setProfileImage("assets/images/ai_logo.webp");
//       }
//     }
//   };

//   useEffect(() => {
//     loadProfileImage();

//     // Add event listener for localStorage change
//     const handleStorageChange = () => {
//       loadProfileImage();
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <div className="flex items-center justify-between px-6 py-3 shadow-md bg-gradient-to-r from-green-100 to-green-200">
      
//       {/* Left: Logo */}
//       <div className="flex items-center gap-3">
//         <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
//           Charge<span className="italic">EV⚡</span>
//         </div>
//       </div>

//       {/* Right: Profile + Actions */}
//       <div className="flex items-center gap-4">
//         {/* Notification Icon */}
//         <FontAwesomeIcon icon={faBell} className="text-lg text-green-800 cursor-pointer hover:text-blue-700" />

//         {/* Dynamic Profile Picture */}
//         <img
//           src={profileImage}
//           alt="Profile"
//           className="object-cover w-12 h-12 transition-transform border-2 border-green-500 rounded-full shadow-lg hover:scale-105"
//         />

//         {/* Logout Button */}
//         <Button
//           onClick={() => {
//             localStorage.removeItem("user");
//             localStorage.removeItem("profileImage");
//             navigate('/');
//           }}
//           variant="primary"
//           size="medium"
//           className="flex items-center gap-2 rounded-2xl"
//         >
//           <FontAwesomeIcon icon={faRightFromBracket} />
//           <span className="text-sm">Logout</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";

const Navbar = ({ showSearch = false, search = "", handleSearch = () => {} }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("assets/images/ai_logo.webp");

  const loadProfileImage = () => {
    const userData = localStorage.getItem("user");
    const localImage = localStorage.getItem("profileImage");

    if (userData) {
      const user = JSON.parse(userData);
      if (localImage) {
        setProfileImage(localImage);
      } else if (user.profileImage) {
        setProfileImage(user.profileImage);
      } else {
        setProfileImage("assets/images/ai_logo.webp");
      }
    }
  };

  useEffect(() => {
    loadProfileImage();
    const handleStorageChange = () => loadProfileImage();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md bg-gradient-to-r from-green-100 to-green-200">

      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Charge<span className="italic">EV⚡</span>
        </div>
      </div>

      {/* Center: Search Bar (only in ChargingStation) */}
      {showSearch && (
        <div className="flex items-center justify-center flex-1 mx-10">
          <input
            type="text"
            placeholder="Search charging stations..."
            value={search}
            onChange={handleSearch}
            className="w-full max-w-xl px-4 py-2 border border-green-400 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      )}

      {/* Right: Profile + Actions */}
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faBell} className="text-lg text-green-800 cursor-pointer hover:text-blue-700" />

        <img
          src={profileImage}
          alt="Profile"
          className="object-cover w-12 h-12 transition-transform border-2 border-green-500 rounded-full shadow-lg hover:scale-105"
        />

        <Button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("profileImage");
            navigate("/");
          }}
          variant="primary"
          size="medium"
          className="flex items-center gap-2 rounded-2xl"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
