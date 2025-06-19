import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, phoneNumber, password, confirmPassword } = formData;

    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setError("Phone number must be 10 digits.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
       
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch {
      setError("Server error.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-100 to-green-200">
      {/* Logo */}
      
      <div className="mb-8 text-cente">
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
        Charge<span className="italic">EV⚡</span>
      </div>
      <div className="mt-1 text-xs tracking-wide text-gray-600 justify-content-center">
        POWERING YOUR JOURNEY         
      </div>
    </div>

      {/* Signup Card */}
      <div className="max-w-full overflow-hidden bg-white shadow-xl rounded-2xl">
        <div className="px-6 py-1 bg-blue-900">
          <h2 className="text-xl font-bold text-white">CREATE YOUR ACCOUNT</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputField label="Username" name="username" type="text" value={formData.username} onChange={handleChange} required  placeholder="Enter your username"/>
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder= "example@chargeev.com" />
          <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required placeholder="1234567890" />
          <PasswordField label="Password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create password" />
          <PasswordField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required  placeholder= "Re-enter password"/>

          {error && <div className="text-sm font-medium text-red-600">{error}</div>}

          <div className="pt-4">
            <Button type="submit" variant="primary" fullWidth className="rounded-2xl" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className="px-6 pb-6 text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-900 hover:underline">Login</Link>
          </p>
        </div>
      </div>
        <div className="mt-8 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-900">
      ChargeEV • Drive the Future
    </div>
    </div>
  );
};

export default SignupForm;
