import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";

const GymChangeForm = () => {
  const gyms = ["Gym A", "Gym B", "Gym C", "Gym D"]; // dummy gym list
  const [oldGym, setOldGym] = useState("");
  const [newGym, setNewGym] = useState("");
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState("");
  const email = useSelector(store => store.auth.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldGym || !newGym) return alert("Please select both gyms");

    // const newRequest = {
    //   id: requests.length + 1,
    //   oldGym,
    //   newGym,
    //   status: "Pending",
    // };

    // setRequests([...requests, newRequest]);
    const gymChangeReq = await api.post('/gymChangeRequest/create',
      {
        userId: userId,
        oldGymId: oldGym,
        newGymId: newGym,
        status: "pending"
      }
    );
    // console.log(gymChangeReq);
    setOldGym("");
    setNewGym("");
    fetchDetails();
  };
  useEffect(() => {
    fetchDetails();
  }, [email]);
  const fetchDetails = async () => {
    try {
      const user = await api.get(`/user/${email}`)
      console.log(user);
      setUserId(user.data.data.rollNo);
      const request = await api.get(`/gymChangeRequest/${user.data.data.rollNo}`);
      // console.log(requests);
      console.log(request);
     const reqData = request.data.data;
      setRequests(Array.isArray(reqData) ? reqData : reqData ? [reqData] : []);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Request Gym Change
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Gym */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Old Gym
            </label>
            <select
              value={oldGym}
              onChange={(e) => setOldGym(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Old Gym</option>
              {gyms.map((gym, i) => (
                <option key={i} value={i}>
                  {gym}
                </option>
              ))}
            </select>
          </div>

          {/* New Gym */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              New Gym
            </label>
            <select
              value={newGym}
              onChange={(e) => setNewGym(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select New Gym</option>
              {gyms.map((gym, i) => (
                <option key={i} value={i}>
                  {gym}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Requests List */}
      {requests && requests?.length > 0 && (
        <div className="mt-8 w-full max-w-md bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Your Requests
          </h3>
          <ul className="space-y-3">
            {requests.map((req, idx) => (
              <li
                key={req?._id || idx}   // fallback if _id is missing
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <span>
                  {req?.oldGymId} → {req?.newGymId}
                </span>
                <span className="text-sm font-semibold text-yellow-600">
                  {req?.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default GymChangeForm;
