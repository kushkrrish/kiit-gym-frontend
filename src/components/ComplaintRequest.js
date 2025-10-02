
"use client";

import { useEffect, useState } from "react";
import api from "../api/axios";
import { Loader2 } from "lucide-react";

const ComplaintRequests = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState("");
  const [searchUserId, setSearchUserId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();
  }, [token]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await api.get("/complaint", {
        headers: { "x-access-token": token },
      });

      const data = res.data?.data || [];
      setComplaints(Array.isArray(data) ? data : [data]);
      setFilteredComplaints(Array.isArray(data) ? data : [data]); // default
    } catch (err) {
      console.error(err);
      setMessage("❌ Error fetching complaints.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Live filter
  useEffect(() => {
    if (!searchUserId.trim()) {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(
        complaints.filter((c) =>
          c.userId.toLowerCase().includes(searchUserId.toLowerCase())
        )
      );
    }
  }, [searchUserId, complaints]);

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    setMessage("");
    try {
      await api.patch(
        "/complaint/update",
        { complaintId: id, status: action },
        { headers: { "x-access-token": token } }
      );

      // remove complaint after resolve/reject ✅
      setComplaints((prev) => prev.filter((c) => c._id !== id));

      setMessage(`✅ Complaint ${action.toLowerCase()} successfully!`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Try again.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Complaints</h2>

        {/* 🔹 Live Search Bar */}
        <input
          type="text"
          placeholder="Search by User ID..."
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full mb-4 focus:ring-2 focus:ring-green-500"
        />

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
          </div>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-gray-500">No complaints found.</p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-4 py-2">{c.userId}</td>
                  <td className="px-4 py-2">{c.description}</td>
                  <td className="px-4 py-2">
                    {new Date(c.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        c.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : c.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    {c.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(c._id, "Resolved")}
                          disabled={actionLoading === c._id + "Resolved"}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoading === c._id + "Resolved" ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            "Resolve"
                          )}
                        </button>
                        <button
                          onClick={() => handleAction(c._id, "Rejected")}
                          disabled={actionLoading === c._id + "Rejected"}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoading === c._id + "Rejected" ? (
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

export default ComplaintRequests;

