import React, { useEffect, useState } from "react";
import { FaChargingStation, FaMapMarkerAlt, FaCalendarCheck, FaRupeeSign } from "react-icons/fa";

export default function PaymentInfo() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/bookings/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setTransactions(data);
        else console.error("Failed to fetch transactions");
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="mb-5 text-3xl font-bold text-blue-800">My Transaction History</h1>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-600">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map((tx) => (
            <div key={tx._id} className="p-4 bg-white rounded-lg shadow">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                <FaChargingStation className="text-blue-500" />
                {tx.station?.name || "Charging Station"}
              </h2>
              <p className="flex items-center gap-2 mt-1 text-sm text-gray-700">
                <FaMapMarkerAlt className="text-red-500" />
                {tx.station?.address || "No address"}
              </p>
              <p className="flex items-center gap-2 mt-1 text-sm text-gray-700">
                <FaCalendarCheck className="text-green-600" />
                Paid On: {tx.paymentTime ? new Date(tx.paymentTime).toLocaleString() : "-"}
              </p>
              <p className="flex items-center gap-2 mt-1 text-sm text-gray-700">
                <FaRupeeSign className="text-yellow-600" />
                Amount: ₹{tx.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
