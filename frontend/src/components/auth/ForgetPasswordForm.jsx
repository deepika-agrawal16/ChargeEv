import React, { useState } from "react";
import Button from "../ui/Button.jsx";
import { Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(data.message);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-100 to-green-200">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-yellow-600">📧 Forgot Password</h2>
        <p className="mb-4 text-sm text-center text-gray-600">Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button fullWidth type="submit">
            Send Reset Link
          </Button>
          {msg && <p className="text-center text-green-600">{msg}</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
