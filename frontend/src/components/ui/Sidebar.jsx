import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine, faChargingStation, faUsers, faCreditCard, faCircleInfo, faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");

  const handleNavigate = (path, label) => {
    setActivePage(label);
    navigate(path);
    toggleSidebar();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 flex flex-col min-h-screen gap-4 p-4 text-black shadow-md w-72 bg-gradient-to-b from-green-100 to-green-200">
      <nav className="flex flex-col gap-6">
        <SidebarSection title="MANAGEMENT">
          <SidebarItem icon={faChartLine} label="Booking History" onClick={() => handleNavigate("/booking-history", "Booking History")} active={activePage === "Booking History"} />
          <SidebarItem icon={faChargingStation} label="Charging Station" onClick={() => handleNavigate("/charging-station", "Charging Station")} active={activePage === "Charging Station"} />
          <SidebarItem icon={faUsers} label="User Management" onClick={() => handleNavigate("/user-management", "User Management")} active={activePage === "User Management"} />
        </SidebarSection>

        <SidebarSection title="PAGES">
          <SidebarItem icon={faCreditCard} label="Payment Info"  onClick={() => handleNavigate("/payment-history", "Payment History")} active={activePage === "Payment History"} />
          <SidebarItem icon={faCircleInfo} label="Additional Info" />
        </SidebarSection>

        <SidebarSection title="COMPONENTS">
          <SidebarItem icon={faChartPie} label="Charts" />
        </SidebarSection>
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
