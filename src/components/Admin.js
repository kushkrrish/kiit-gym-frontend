import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { persistor } from "../utils/appStore";
import { logout } from "../utils/authSlice";

const Admin = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("ROLE:", role); // Debugging check
    if (role !== "admin") {
      navigate("/login"); // Prevent students from accessing admin page
    }
  }, [role, navigate]);

  const handelLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch(logout());
      persistor.purge();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-green-800 mb-12 text-center tracking-wide drop-shadow-sm">
        Admin Dashboard
      </h1>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Gym Change Requests */}
        <div
          onClick={() => navigate("/admin/GymChangeRequest")}
          className="p-8 bg-white border border-green-200 rounded-2xl shadow-md 
                     cursor-pointer hover:shadow-lg hover:scale-105 
                     transition-transform duration-300"
        >
          <h2 className="text-2xl font-semibold text-green-700">Gym Change Requests</h2>
          <p className="text-gray-500 mt-2">Approve or reject students’ requests.</p>
        </div>

        {/* QR Entry Scan */}
        <div
          onClick={() => navigate("/admin/scan-entry")}
          className="p-8 bg-white border border-green-200 rounded-2xl shadow-md 
                     cursor-pointer hover:shadow-lg hover:scale-105 
                     transition-transform duration-300"
        >
          <h2 className="text-2xl font-semibold text-green-700">QR Entry Scan</h2>
          <p className="text-gray-500 mt-2">Scan and manage student gym entries.</p>
        </div>

        {/* Complaints */}
        <div
          onClick={() => navigate("/admin/Complaints")}
          className="p-8 bg-white border border-green-200 rounded-2xl shadow-md 
                     cursor-pointer hover:shadow-lg hover:scale-105 
                     transition-transform duration-300"
        >
          <h2 className="text-2xl font-semibold text-green-700">Complaints</h2>
          <p className="text-gray-500 mt-2">Track and resolve student issues.</p>
        </div>

        {/* Reports */}
        <div
          onClick={() => navigate("/admin/reports")}
          className="p-8 bg-white border border-green-200 rounded-2xl shadow-md 
                     cursor-pointer hover:shadow-lg hover:scale-105 
                     transition-transform duration-300"
        >
          <h2 className="text-2xl font-semibold text-green-700">Reports</h2>
          <p className="text-gray-500 mt-2">View overall usage and analytics.</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handelLogout}
          className="flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded-full 
                     hover:bg-green-800 transition-colors shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
