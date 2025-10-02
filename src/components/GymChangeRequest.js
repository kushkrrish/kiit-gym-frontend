
"use client";

import { useEffect, useState } from "react";
import api from "../api/axios";
import { Loader2 } from "lucide-react";

const GymChangeRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState("");

const token = localStorage.getItem("token");
console.log("Token being sent:", token);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await api.get("/gymChangeRequest");
        setRequests(res.data?.data || []); // ✅ safer extraction
      } catch (err) {
        setMessage("❌ Error fetching requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Updated to also send userId
  const handleAction = async (id, action, userId) => {
    setActionLoading(id + action);
    setMessage("");
    try {
      await api.patch(
        "/gymChangeRequest/update",
        { _id: id, userId: userId, status: action }, // ✅ include userId
        {
          headers: { "x-access-token": token },
        }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: action } : req
        )
      );
      setMessage(`✅ Request ${action.toLowerCase()} successfully!`);
    } catch (err) {
        console.log(err);
      setMessage("❌ Server error. Try again.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Gym Change Requests</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Old Gym</th>
                <th className="px-4 py-2 text-left">New Gym</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t">
                  <td className="px-4 py-2">{req.userId}</td>
                  <td className="px-4 py-2">{req.oldGymId}</td>
                  <td className="px-4 py-2">{req.newGymId}</td>
                  <td className="px-4 py-2">{req.description}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleAction(req._id, "Approved", req.userId)
                          }
                          disabled={actionLoading === req._id + "Approved"}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoading === req._id + "Approved" ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleAction(req._id, "Rejected", req.userId)
                          }
                          disabled={actionLoading === req._id + "Rejected"}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoading === req._id + "Rejected" ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            "Reject"
                          )}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {message && (
          <p className="text-center text-sm font-medium mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default GymChangeRequest;

