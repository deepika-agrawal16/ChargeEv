import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ booking, onClose, onSuccess }) => {
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateUpi = (upi) => {
    return /^[\w.-]+@[\w.-]+$/.test(upi);
  };

  const handlePay = async () => {
    if (!validateUpi(upiId)) {
      setError("Invalid UPI ID. Format should be something like name@ybl");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://chargeev-backend-g7ik.onrender.com/api/bookings/complete/${booking._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Payment successful and booking completed");
        onSuccess();
        onClose();
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment processing failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-green-700">Pay for Booking</h2>

        <p className="mb-2">Station: <strong>{booking?.station?.name}</strong></p>
        <p className="mb-4">Amount to pay: <strong><FaRupeeSign className="inline text-yellow-600" />{booking.amount}</strong></p>

        <label className="block mb-2 text-sm font-medium text-gray-700">Enter UPI ID:</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="e.g. name@ybl"
          className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
