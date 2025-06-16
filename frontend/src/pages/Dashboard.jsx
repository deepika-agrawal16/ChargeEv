import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import UserManagement from "../components/ui/UserManagement"; // Adjust path if needed

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-green-100 via-green-50 to-green-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top navbar */}
        <Navbar />

        {/* Main area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <UserManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
