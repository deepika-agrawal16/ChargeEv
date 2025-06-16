import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faChartLine,
  faMobileScreen,
  faChargingStation,
  faUsers,
  faCreditCard,
  faCircleInfo,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("");

  const handleLogout = () => {
    // implement logout logic
  };

  const user = {
    username: "User", // replace with actual user state/props
  };

  return (
    <div className="flex">
      {/* Toggle Button */}
      <div className="p-4 shadow-md bg-gradient-to-b from-green-100 to-green-200">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-2xl text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <div className="flex flex-col min-h-screen gap-4 p-4 text-black shadow-md w-72 bg-gradient-to-b from-green-100 to-green-200">

          {/* Navigation Sections */}
          <nav className="flex flex-col gap-6">
            <SidebarSection title="MANAGEMENT">
              <SidebarItem 
                icon={faChartLine}
                label="Booking History" 
                onClick={() =>{ setActivePage("Booking History");
                navigate("/booking-history");} }
                active={activePage === "Booking History"} 
              />
              <SidebarItem 
                icon={faMobileScreen}
                label="Devices" 
                onClick={() => setActivePage("Devices")} 
                active={activePage === "Devices"} 
              />
              <SidebarItem 
                icon={faChargingStation}
                label="Charging Station" 
                onClick={() => {
                  setActivePage("Charging Station");
                  navigate("/charging-station");
                }} 
                active={activePage === "Charging Station"} 
              />
              <SidebarItem 
                icon={faUsers}
                label="User Management" 
                onClick={() => navigate("/user-management")} 
                active={activePage === "User Management"} 
              />
            </SidebarSection>

            <SidebarSection title="PAGES">
              <SidebarItem 
                icon={faCreditCard}
                label="Payment Info" 
                onClick={() => setActivePage("Payment Info")} 
                active={activePage === "Payment Info"} 
              />
              <SidebarItem 
                icon={faCircleInfo}
                label="Additional Info" 
                onClick={() => setActivePage("Additional Info")} 
                active={activePage === "Additional Info"} 
              />
            </SidebarSection>

            <SidebarSection title="COMPONENTS">
              <SidebarItem 
                icon={faChartPie}
                label="Charts" 
                onClick={() => setActivePage("Charts")} 
                active={activePage === "Charts"} 
              />
            </SidebarSection>
          </nav>
        </div>
      )}
    </div>
  );
};

function SidebarSection({ title, children }) {
  return (
    <div>
      <h4 className="px-3 py-2 pl-1 mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase rounded-md">
        {title}
      </h4>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, active = false, isParent = false, isOpen = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded transition-all w-full text-left ${
        active 
          ? "bg-white text-green-700 font-medium shadow-sm" 
          : "hover:bg-white hover:text-green-700 text-gray-800"
      }`}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={`w-4 h-4 ${active ? "text-green-600" : "text-gray-500"}`} 
      />
      <span>{label}</span>
      {isParent && (
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className="ml-auto text-xs text-gray-400" 
        />
      )}
    </button>
  );
}

export default Sidebar;