"use client";

import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ✅ Simple Card components (instead of shadcn-ui)
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white shadow ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Reports = () => {
  const [stats, setStats] = useState({
    users: 0,
    complaints: 0,
    requests: 0,
    requestStatus: { Pending: 0, Approved: 0, Rejected: 0 },
    complaintsPerUser: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await api.get("/user");
        const complaints = await api.get("/complaint");
        const requests = await api.get("/gymChangeRequest");

        // count request statuses
        const statusCount = { Pending: 0, Approved: 0, Rejected: 0 };
        requests.data.data.forEach((r) => {
          statusCount[r.status] = (statusCount[r.status] || 0) + 1;
        });

        // complaints grouped by user
        const complaintCount = {};
        complaints.data.data.forEach((c) => {
          complaintCount[c.userId] = (complaintCount[c.userId] || 0) + 1;
        });
        const complaintsPerUser = Object.keys(complaintCount).map((u) => ({
          userId: u,
          complaints: complaintCount[u],
        }));

        setStats({
          users: users.data.data.length,
          complaints: complaints.data.data.length,
          requests: requests.data.data.length,
          requestStatus: statusCount,
          complaintsPerUser,
        });
      } catch (err) {
        console.error("Error fetching report data:", err);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#facc15", "#22c55e", "#ef4444"]; // yellow, green, red

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Admin Reports</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent>
            <h3 className="text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold">{stats.users}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="text-gray-600">Total Complaints</h3>
            <p className="text-2xl font-bold">{stats.complaints}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="text-gray-600">Gym Change Requests</h3>
            <p className="text-2xl font-bold">{stats.requests}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart - Request Status */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Request Status Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={Object.keys(stats.requestStatus).map((k) => ({
                name: k,
                value: stats.requestStatus[k],
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {Object.keys(stats.requestStatus).map((k, i) => (
                <Cell key={k} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart - Complaints per User */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Complaints per User</h3>
          <BarChart width={400} height={300} data={stats.complaintsPerUser}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="userId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="complaints" fill="#3b82f6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Reports;
