import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function UserManagement() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setTempImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/user/profile/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: tempImage }),
      });

      if (res.ok) {
        alert("Profile image updated");
        window.location.reload();
      } else {
        alert("Failed to update image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>;
  }

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-col flex-1">
        <Navbar showSearch={false} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex items-center justify-center flex-1 px-4 py-8">
          <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-xl">

            {/* Profile Image Upload */}
            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden border-4 border-green-500 rounded-full">
              <img
                src={tempImage || user.profileImage || "https://via.placeholder.com/100"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>

            {tempImage && (
              <button
                className="px-4 py-2 mb-4 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={handleImageSave}
              >
                Save Image
              </button>
            )}

            <h2 className="mb-2 text-xl font-bold text-green-700">Your Personal Information:</h2>

            <div className="space-y-2 text-left text-gray-700">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <p>
                <strong>Role:</strong>{" "}
                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full 
                  ${user.role === "admin" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {user.role}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
