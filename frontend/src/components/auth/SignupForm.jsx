import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import InputField from "../ui/InputField.jsx";
import PasswordField from "../ui/PasswordField.jsx";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { username, email, phoneNumber, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phoneNumber,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful!");
        setFormData({
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while signing up. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-100 to-green-200">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Charge<span className="italic">EV⚡</span>
        </div>
        <div className="mt-1 text-xs tracking-wide text-gray-600">
          POWERING YOUR JOURNEY
        </div>
      </div>

      {/* Signup Card */}
      <div className="max-w-full overflow-hidden bg-white shadow-xl rounded-2xl">
        {/* Card Header */}
        <div className="px-6 py-1 bg-blue-900">
          <h2 className="text-xl font-bold text-white">CREATE YOUR ACCOUNT</h2>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            icon="👤"
            required
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@chargeev.com"
            icon="✉️"
            required
          />

          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="1234567890"
            icon="📱"
            pattern="[0-9]{10}"
            required
          />

          <PasswordField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Create password"
            icon="🔒"
            required
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Re-enter password"
            icon="🔒"
            required
          />

          {error && (
            <div className="text-sm font-medium text-red-600">{error}</div>
          )}
          {success && (
            <div className="text-sm font-medium text-green-600">{success}</div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              fullWidth
              className="rounded-2xl"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="px-6 pb-6 text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-900 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom Logo */}
      <div className="mt-8 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-900">
        ChargeEV • Drive the Future
      </div>
    </div>
  );
};

export default SignupForm;
