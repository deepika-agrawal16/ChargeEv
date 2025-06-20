import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChargingStation,
  faUsers,
  faCreditCard,
  faCircleInfo,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.role === "admin") setIsAdmin(true);
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };
    fetchRole();
  }, []);

  const handleNavigate = (path, label) => {
    setActivePage(label);
    navigate(path);
    toggleSidebar();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 flex flex-col min-h-screen gap-4 p-4 text-black shadow-md w-72 bg-gradient-to-b from-green-100 to-green-200">
      <nav className="flex flex-col gap-6">
        {isAdmin ? (
          <>
            <SidebarSection title="ADMIN PANEL">
              <SidebarItem icon={faUsers} label="User Management" onClick={() => handleNavigate("/user-management", "User Management")} active={activePage === "User Management"} />
              <SidebarItem icon={faChargingStation} label="Manage Stations" onClick={() => handleNavigate("/manage-station", "Manage Stations")} active={activePage === "Manage Stations"} />
              <SidebarItem icon={faChartLine} label="All Bookings" onClick={() => handleNavigate("/admin/bookings", "All Bookings")} active={activePage === "All Bookings"} />
              <SidebarItem icon={faCreditCard} label="Transaction History" onClick={() => handleNavigate("/admin/transactions", "Transaction History")} active={activePage === "Transaction History"} />
            </SidebarSection>
          </>
        ) : (
          <>
            <SidebarSection title="MANAGEMENT">
              <SidebarItem icon={faUsers} label="User Management" onClick={() => handleNavigate("/user-management", "User Management")} active={activePage === "User Management"} />
              <SidebarItem icon={faChartLine} label="Booking History" onClick={() => handleNavigate("/booking-history", "Booking History")} active={activePage === "Booking History"} />
              <SidebarItem icon={faChargingStation} label="Charging Station" onClick={() => handleNavigate("/charging-station", "Charging Station")} active={activePage === "Charging Station"} />
            </SidebarSection>

            <SidebarSection title="PAGES">
              <SidebarItem icon={faCreditCard} label="Payment Info" onClick={() => handleNavigate("/payment-history", "Payment History")} active={activePage === "Payment History"} />
              <SidebarItem icon={faCircleInfo} label="Additional Info" 
                 onClick={() => handleNavigate("/additional-info", "Additional Info")} active={activePage === "Additional Info"}
              />
            </SidebarSection>

            <SidebarSection title="COMPONENTS">
              <SidebarItem icon={faChartPie} label="Charts"
              onClick={() => handleNavigate("/charts", "Charts")} active={activePage === "Charts"} />
            </SidebarSection>
          </>
        )}
      </nav>
    </div>
  );
};

function SidebarSection({ title, children }) {
  return (
    <div>
      <h4 className="px-3 py-2 mb-3 text-xs font-bold text-gray-400 uppercase">{title}</h4>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, active = false }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-3 py-2 text-sm rounded ${active ? "bg-white text-green-700 font-medium shadow-sm" : "hover:bg-white hover:text-green-700 text-gray-800"}`}>
      <FontAwesomeIcon icon={icon} className={`w-4 h-4 ${active ? "text-green-600" : "text-gray-500"}`} />
      <span>{label}</span>
    </button>
  );
}

export default Sidebar;
