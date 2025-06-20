import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaChargingStation,
  FaRupeeSign,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [todayMinutesUsed, setTodayMinutesUsed] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/bookings/admin/all-transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setTransactions(data.transactions || []);
          setTotalIncome(data.totalIncome || 0);
          setTodayMinutesUsed(data.todayUsageMinutes || 0);
        } else {
          console.error("Failed to fetch admin transactions:", data);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 to-green-200">
      <h1 className="mb-6 text-3xl font-bold text-green-800">Admin Transactions</h1>

      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <div className="p-4 bg-white border rounded-lg shadow">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Total Income</h2>
          <p className="text-2xl font-bold text-green-700">
            <FaRupeeSign className="inline-block mr-1" /> {totalIncome}
          </p>
        </div>

        <div className="p-4 bg-white border rounded-lg shadow">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">Today's Energy Usage</h2>
          <p className="text-2xl font-bold text-green-700">
            <FaClock className="inline-block mr-1" /> {todayMinutesUsed} min
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-600">No transactions yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map((tx) => (
            <div key={tx._id} className="p-4 bg-white border rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold text-green-700">
                <FaUser className="inline-block mr-2 text-green-500" />
                {tx.user?.name || tx.user?.email || `User ID: ${tx.user?._id?.slice(-6)}`}
              </h2>

              <p className="flex items-center gap-2 text-gray-700">
                <FaChargingStation className="text-green-600" />
                {tx.station?.name || "Unknown Station"}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaMapMarkerAlt className="text-red-500" />
                {tx.station?.city || "N/A"},{" "}
                {tx.station?.state || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaClock className="text-indigo-500" /> Duration: {tx.durationMinutes} min
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaRupeeSign className="text-yellow-600" /> Amount: ₹{tx.amount}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt className="text-blue-600" />
                Paid On:{" "}
                {tx.paymentTime
                  ? new Date(tx.paymentTime).toLocaleString()
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
