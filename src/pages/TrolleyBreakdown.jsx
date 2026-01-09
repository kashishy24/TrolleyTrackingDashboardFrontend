// src/pages/BreakDownHistory.jsx
import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "../../src/partials/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TrolleyBreakdown = () => {
  // ---------------- STATE ----------------
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [bdCards, setBdCards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

const BASE = (import.meta.env.VITE_BACKEND_BASE_URL || "").replace(/\/+$/, "");

  // ---------------- API CALL ----------------
 // ---------------- API CALL ----------------
const applyFilter = async () => {
  if (!rangeStart || !rangeEnd) {
    alert("Please select both start & end date");
    return;
  }

  try {
    setLoading(true);

    // 🔥 CALL ALL THREE APIs IN PARALLEL
    const [chartRes, cardRes, detailsRes] = await Promise.all([
      axios.post(`${BASE}/Breakdown/breakdownduration`, {
        StartDate: rangeStart,
        EndDate: rangeEnd,
      }),
      axios.post(`${BASE}/Breakdown/dashboard/bd-cards`, {
        StartDate: rangeStart,
        EndDate: rangeEnd,
      }),
      axios.post(`${BASE}/Breakdown/breakdown/details`, {
        StartDate: rangeStart,
        EndDate: rangeEnd,
      }),
    ]);

    // --------- CHART DATA ---------
    if (chartRes.data.success) {
      const formatted = chartRes.data.data.map((item) => ({
        label: item.Label,
        Duration:
          item.BreakdownMinutes !== undefined
            ? Number(item.BreakdownMinutes)
            : Number(item.BreakdownHours * 60),
        Occurrence: Number(item.OccurrenceCount),
      }));
      setChartData(formatted);
    }

    // --------- SUMMARY CARDS ---------
    if (cardRes.data.success) {
      setBdCards(cardRes.data.data);
    }

    // --------- BREAKDOWN DETAILS TABLE ---------
    if (detailsRes.data.success) {
      setTableData(detailsRes.data.data); // dynamic table data
    }

  } catch (error) {
    console.error("Dashboard API Error:", error);
    alert("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
};


  return (
    <DashboardLayout>
      <div className="p-6 w-full">

        {/* ---------------- FILTER BAR ---------------- */}
        <div className="flex bg-white p-2 rounded-xl shadow mb-4 justify-end w-full">
          <h2 className="font-bold text-black p-4 flex-grow">
            Trolley Breakdown History
          </h2>

          <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
            <div>
              <label className="text-sm font-semibold text-black">
                Start Date
              </label>
              <input
                type="date"
                className="border px-3 py-2 rounded-lg w-40 text-black"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-black">
                End Date
              </label>
              <input
                type="date"
                className="border px-3 py-2 rounded-lg w-40 text-black"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
              />
            </div>

            <button
              className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 text-sm font-semibold"
              onClick={applyFilter}
            >
              {loading ? "Loading..." : "Apply"}
            </button>
          </div>
        </div>

        {/* ---------------- SUMMARY CARDS ---------------- */}
        {bdCards && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h3 className="font-semibold text-black">
                Total Breakdown Duration
              </h3>
              <p className="mt-2 text-black">{bdCards.TotalBD} hrs</p>
            </div>

            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h3 className="font-semibold text-black">
                Total Breakdown Count
              </h3>
              <p className="mt-2 text-black">{bdCards.NumberOfBD}</p>
            </div>

            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h3 className="font-semibold text-black">
                Longest Breakdown
              </h3>
              <p className="mt-2 text-black">
                {bdCards.MaxBD_TrolleyID}
              </p>
              <p className="text-blue-700">
                {bdCards.MaxBD_Duration} hrs
              </p>
            </div>

            <div className="bg-white shadow rounded-xl p-4 text-center">
              <h3 className="font-semibold text-black">
                Minimum Breakdown
              </h3>
              <p className="mt-2 text-black">
                {bdCards.MinBD_TrolleyID}
              </p>
              <p className="text-green-700">
                {bdCards.MinBD_Duration} hrs
              </p>
            </div>
          </div>
        )}

        {/* ---------------- CHARTS ---------------- */}
        <div className="grid grid-cols-1 gap-8">
          <div className="h-90 bg-white rounded-xl shadow-md p-10">
            <h3 className="font-semibold text-black text-center mb-4">
              Breakdown Duration
            </h3>
           <ResponsiveContainer width="100%" height="100%">
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="label" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="Duration" fill="#2563eb" />
  </BarChart>
</ResponsiveContainer>
          </div>

          <div className="h-90 bg-white rounded-xl shadow-md p-10">
            <h3 className="font-semibold text-black text-center mb-4">
              Breakdown Occurrence
            </h3>
            <ResponsiveContainer width="100%" height="100%">
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="label" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="Occurrence" fill="#f97316" />
  </BarChart>
</ResponsiveContainer>
          </div>
        </div>
        {/* ---------------- TABLE ---------------- */}
<div className="bg-white p-4 rounded-xl shadow-md mt-10">
  <h3 className="text-black font-bold mb-4 text-center">
    Breakdown Details Table
  </h3>

  <div style={{ maxHeight: 420, overflow: "auto" }}>
    <table className="w-full border-collapse">
      <thead className="bg-blue-700 text-white text-sm sticky top-0 text-black">
        <tr>
          <th className="p-2 border">TrolleyID</th>
          <th className="p-2 border">ActionTaken</th>
          <th className="p-2 border">ActionRemark</th>
          <th className="p-2 border">Reason</th>
          <th className="p-2 border">Remark</th>
          <th className="p-2 border">StartTime</th>
          <th className="p-2 border">EndTime</th>
          <th className="p-2 border">Duration</th>
          <th className="p-2 border">UserID</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((r, i) => (
          <tr
            key={i}
            className="border-b hover:bg-blue-50 text-sm transition-all duration-200 text-black"
          >
            <td className="p-2 border text-center">{r.TrolleyID}</td>
            <td className="p-2 border text-center">{r.ActionTaken}</td>
            <td className="p-2 border text-center">{r.ActionRemark}</td>
            <td className="p-2 border text-center">{r.BDReason}</td>
            <td className="p-2 border text-center">{r.BDRemark}</td>
            <td className="p-2 border text-center">{r.StartTime}</td>
            <td className="p-2 border text-center">{r.EndTime}</td>
            <td className="p-2 border text-center">{r.Duration}</td>
            <td className="p-2 border text-center">{r.UserID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </DashboardLayout>
  );
};

export default TrolleyBreakdown;
