// how to decode token

 // Get logged in user rollNo from token
  const token = localStorage.getItem("token");
  let rollNo = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      rollNo = decoded.rollNo; // make sure you included rollNo in token payload
    } catch (err) {
      console.error("Invalid token", err);
    }
  }


  //how to send req with token

  const res = await axios.post(
        "http://localhost:5000/api/v1/gym-change/create",
        {
          rollNo,
          oldGymId,
          newGymId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );




->sample of gym change code


import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GymChange = () => {
  const [gyms, setGyms] = useState([]);
  const [oldGym, setOldGym] = useState("");
  const [newGym, setNewGym] = useState("");
  const [message, setMessage] = useState("");

  // Get logged in user rollNo from JWT
  const token = localStorage.getItem("token");
  let rollNo = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      rollNo = decoded.rollNo; // make sure rollNo is in token payload
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  // Fetch gyms from backend
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/gyms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGyms(res.data);
      } catch (err) {
        console.error("Error fetching gyms:", err);
      }
    };
    fetchGyms();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (oldGym === newGym) {
      setMessage("❌ Old and New gym cannot be the same");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/v1/gym-change/create",
        {
          rollNo,
          oldGymId: oldGym,
          newGymId: newGym,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Gym change request submitted successfully");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit request");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Request Gym Change
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Old Gym Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Current Gym</label>
          <select
            value={oldGym}
            onChange={(e) => setOldGym(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">-- Select Current Gym --</option>
            {gyms.map((gym) => (
              <option key={gym._id} value={gym._id}>
                {gym.name} ({gym.location})
              </option>
            ))}
          </select>
        </div>

        {/* New Gym Dropdown */}
        <div>
          <label className="block font-semibold mb-1">New Gym</label>
          <select
            value={newGym}
            onChange={(e) => setNewGym(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">-- Select New Gym --</option>
            {gyms.map((gym) => (
              <option key={gym._id} value={gym._id}>
                {gym.name} ({gym.location})
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Submit Request
        </button>
      </form>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default GymChange;
