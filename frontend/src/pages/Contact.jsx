import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHandsHelping } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend or email service here
    console.log("Query submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-xl">
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-2 text-4xl font-bold text-green-700">
            <FaHandsHelping className="text-green-600" /> Contact Us
          </h1>
          <p className="mt-2 text-gray-600">
            Have a question, issue or suggestion? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-6 mb-12 text-center text-gray-800 md:grid-cols-3">
          <div>
            <FaEnvelope className="mx-auto mb-1 text-xl text-green-600" />
            <p className="font-medium">support@chargeev.com</p>
          </div>
          <div>
            <FaPhoneAlt className="mx-auto mb-1 text-xl text-green-600" />
            <p className="font-medium">+91 98765 43210</p>
          </div>
          <div>
            <FaMapMarkerAlt className="mx-auto mb-1 text-xl text-green-600" />
            <p className="font-medium">NIT Kurukshetra, Haryana, India</p>
          </div>
        </div>

        {/* Query Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full px-4 py-2 border rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message..."
            required
            className="w-full px-4 py-2 border rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={formData.message}
            onChange={handleChange}
          />

          <div className="flex justify-center md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white transition bg-green-600 rounded hover:bg-green-700"
            >
              Submit Query
            </button>
          </div>
        </form>

        {/* Success message */}
        {submitted && (
          <p className="mt-6 font-medium text-center text-green-600">
           Your query has been submitted! We'll get back to you soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
