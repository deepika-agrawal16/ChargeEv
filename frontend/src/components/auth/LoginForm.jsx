import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import InputField from "../ui/InputField.jsx";
import PasswordField from "../ui/PasswordField.jsx";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6">
      {/* Logo */}
      <div className="mb-8 text-cente">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Charge<span className="italic">EV⚡</span>
        </div>
        <div className="text-xs text-gray-600 mt-1 tracking-wide">
          POWERING YOUR JOURNEY
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="bg-blue-900 py-1 px-6 flex justify-center">
          <h2 className="text-xl font-bold text-white text-center">WELCOME BACK</h2>
        </div>

       
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

            <div className="space-y-1">
              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                icon="🔒"
                required
              />

              <div className="text-right text-sm">
                <Link to="/forgot-password" className="text-blue-900 hover:underline">
            Forgot Password?
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="medium"
                fullWidth
                className="rounded-2xl"
              >
                Login
              </Button>
            </div>
          </form>

          {/* Footer Links */}
        <div className="px-6 pb-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-900 font-medium hover:underline"
            >
              Sign up 
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

export default LoginForm;
