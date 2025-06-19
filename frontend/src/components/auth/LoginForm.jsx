import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";
import InputField from "../ui/InputField.jsx";
import PasswordField from "../ui/PasswordField.jsx";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        // alert("Login successful!");
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch {
      setError("Server error.");
    }
    setLoading(false);
  };

return (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-100 to-green-200">
     
    <div className="mb-8">
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
        Charge<span className="italic">EV⚡</span>
      </div>
      <div className="mt-1 text-xs tracking-wide text-gray-600 justify-content-center">
        POWERING YOUR JOURNEY         
      </div>
    </div>

    <div className="max-w-full overflow-hidden bg-white shadow-xl rounded-2xl">
      <div className="flex justify-center px-6 py-1 bg-blue-900">
        <h2 className="text-xl font-bold text-center text-white">WELCOME BACK</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
        <PasswordField label="Password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
        {error && <div className="text-sm font-medium text-red-600">{error}</div>}

        <Button type="submit" variant="primary" fullWidth className="rounded-2xl" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="px-6 pb-6 text-sm text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-900 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
    <div className="mt-8 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-900">
      ChargeEV • Drive the Future
    </div>
  </div>
);
};

export default LoginForm;
