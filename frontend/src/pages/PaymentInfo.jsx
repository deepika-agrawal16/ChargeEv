import React, { useEffect, useState } from "react";
import { FaChargingStation, FaMapMarkerAlt, FaCalendarCheck, FaRupeeSign } from "react-icons/fa";

export default function PaymentInfo() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://chargeev-backend-g7ik.onrender.com/api/bookings/transactions", {
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
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="mb-6 text-3xl font-extrabold text-center text-green-800">Transaction History</h1>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-600">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map((tx) => (
            <div key={tx._id} className="p-5 transition bg-white border border-green-200 shadow rounded-xl hover:shadow-md">
              <h2 className="flex items-center gap-2 mb-1 text-lg font-bold text-green-700">
                <FaChargingStation className="text-green-600" />
                {tx.station?.name || "Charging Station"}
              </h2>
              <p className="flex items-center gap-2 text-sm text-gray-700">
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
