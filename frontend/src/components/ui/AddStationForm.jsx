import { useState } from "react";

export default function AddStationForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    contact: "",
    availability: true,
    pricing: "",
    type: "AC",
    connectors: ["Type2"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login as admin.");

    try {
      const res = await fetch("https://chargeev-backend-g7ik.onrender.com/api/stations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          availability: form.availability === "true" || form.availability === true,
          connectors: form.connectors,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Station added successfully!");
        setForm({
          name: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          latitude: "",
          longitude: "",
          contact: "",
          availability: true,
          pricing: "",
          type: "AC",
          connectors: ["Type2"],
        });
      } else {
        alert(data.message || "Failed to add station.");
      }
    } catch (err) {
      console.error("Error adding station:", err);
      alert("Error adding station.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          ➕ Add New Charging Station
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["name", "Station Name"],
            ["address", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["pincode", "Pincode"],
            ["latitude", "Latitude"],
            ["longitude", "Longitude"],
            ["contact", "Contact Number"],
            ["pricing", "Pricing (e.g. ₹20/10min)"],
          ].map(([key, label]) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={label}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
          ))}

          <div className="flex gap-4">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
            >
              <option value="AC">AC</option>
              <option value="DC">DC</option>
            </select>

            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          <input
            name="connectors"
            value={form.connectors.join(",")}
            onChange={(e) =>
              setForm({ ...form, connectors: e.target.value.split(",") })
            }
            placeholder="Connector Types (e.g. Type2,CCS,CHAdeMO)"
            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full py-2 mt-4 text-lg font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            ✅ Submit Station
          </button>
        </form>
      </div>
    </div>
  );
}
