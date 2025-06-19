// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
// import Button from "../ui/Button.jsx";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ showSearch = false, search = "", handleSearch = () => {}, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5000/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setProfileImage(data.profileImage || "https://via.placeholder.com/100");
//       }
//     } catch {
//       setProfileImage("https://via.placeholder.com/100");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div className="flex items-center justify-between px-6 py-3 shadow-md bg-gradient-to-r from-green-100 to-green-200">

//       <div className="flex items-center gap-3">
//         <button onClick={toggleSidebar}>
//           <FontAwesomeIcon icon={faBars} className="text-2xl text-green-700" />
//         </button>
//         <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
//           Charge<span className="italic">EV⚡</span>
//         </div>
//       </div>

//       {showSearch && (
//         <div className="flex items-center justify-center flex-1 mx-10">
//           <input
//             type="text"
//             placeholder="Search charging stations..."
//             value={search}
//             onChange={handleSearch}
//             className="w-full max-w-xl px-4 py-2 border border-green-400 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>
//       )}

//       <div className="flex items-center gap-4">
//         <FontAwesomeIcon icon={faBell} className="text-lg text-green-800" />
//         <img src={profileImage} alt="Profile" className="w-12 h-12 border-2 border-green-500 rounded-full" />
//         <Button
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/");
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
import { faBars, faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = ({ showSearch = false, search = "", handleSearch = () => {}, toggleSidebar }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [bookings, setBookings] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProfileImage(data.profileImage || "https://via.placeholder.com/100");
      }
    } catch {
      setProfileImage("https://via.placeholder.com/100");
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const expiringSoon = bookings.filter((b) => {
    const now = new Date();
    const end = new Date(b.endTime);
    return (
      b.status === "booked" &&
      !b.isPaid &&
      end - now <= 5 * 60 * 1000 &&
      end - now > 0
    );
  });

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md bg-gradient-to-r from-green-100 to-green-200">

      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-2xl text-green-700" />
        </button>
        <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Charge<span className="italic">EV⚡</span>
        </div>
      </div>

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

      <div className="relative flex items-center gap-4">
        <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
          <FontAwesomeIcon icon={faBell} className="text-lg text-green-800" />
          {expiringSoon.length > 0 && (
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
              {expiringSoon.length}
            </span>
          )}
        </div>

        {showDropdown && expiringSoon.length > 0 && (
          <div className="absolute z-50 w-64 p-3 bg-white border border-gray-300 rounded shadow-lg right-14 top-10">
            <p className="mb-2 text-sm font-semibold text-gray-700">⏰ Bookings Expiring Soon:</p>
            <ul className="space-y-1 text-sm">
              {expiringSoon.map((b) => (
                <li key={b._id} className="text-gray-600">
                  <span className="font-medium">{b.station?.name || "Station"}</span> - ends at {new Date(b.endTime).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        )}

        <img src={profileImage} alt="Profile" className="w-12 h-12 border-2 border-green-500 rounded-full" />
        <Button
          onClick={() => {
            localStorage.removeItem("token");
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
