import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = ({ showSearch = false, search = "", handleSearch = () => {}, toggleSidebar }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://chargeev-backend-g7ik.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProfileImage(data.profileImage || "https://via.placeholder.com/100");
        setUserRole(data.role || "user");
      }
    } catch {
      setProfileImage("https://via.placeholder.com/100");
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://chargeev-backend-g7ik.onrender.com/api/bookings/expiring", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data.filter(n => !n.isPaid));
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

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
        {userRole === "user" && (
          <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <FontAwesomeIcon icon={faBell} className="text-lg text-green-800" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                {notifications.length}
              </span>
            )}

            {showDropdown && notifications.length > 0 && (
              <div className="absolute right-0 z-50 p-3 mt-2 bg-white border border-gray-300 rounded shadow-xl w-72 top-full">
                <div className="absolute top-0 w-3 h-3 -mt-2 transform rotate-45 bg-white border-t border-l border-gray-300 right-3"></div>
                <p className="mb-2 text-sm font-semibold text-gray-700">⏰ Bookings Expiring Soon:</p>
                <ul className="pr-1 space-y-1 overflow-y-auto text-sm max-h-48">
                  {notifications.map((b) => (
                    <li key={b._id} className="flex items-center justify-between text-gray-600">
                      <div>
                        <span className="font-medium">{b.station?.name || "Station"}</span><br />
                        Ends at: {new Date(b.endTime).toLocaleTimeString()}
                      </div>
                      <button
                        onClick={() => markAsRead(b._id)}
                        className="ml-2 px-2 py-0.5 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Mark as Read
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
