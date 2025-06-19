import UserManagement from "../components/ui/UserManagement"; // Adjust path if needed

const Dashboard = () => {
  return (
    <>
      {/* Main area */}
      <div className="flex-1 overflow-y-auto">
        <UserManagement />
      </div>
    </>
  );
};

export default Dashboard;
