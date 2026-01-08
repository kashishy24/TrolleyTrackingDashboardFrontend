// src/pages/BreakDownHistory.jsx
import React, { useState } from "react";
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

// ---------------- MAIN COMPONENT ----------------
const TrolleyBreakdown = () => {
  // ---------------- STATE ----------------
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  // ---------------- DUMMY DATA ----------------

  // Chart data
  const chartData = [
    { date: "01-Jan", Duration: 120, Occurence: 3 },
    { date: "02-Jan", Duration: 90, Occurence: 2 },
    { date: "03-Jan", Duration: 150, Occurence: 4 },
    { date: "04-Jan", Duration: 60, Occurence: 1 },
    { date: "05-Jan", Duration: 200, Occurence: 5 },
  ];

  // Summary cards
  const stats = [
    { label: "Total Breakdown By Duration", value: "620 min" },
    { label: "Total Breakdown By Count", value: "15" },
    { label: "Longest Duration", mould: "Trolley-05", duration: "200 min" },
    { label: "Trolley Min BreakDown", mould: "Trolley-02", duration: "60 min" },
  ];

  // Table data
  const tableData = [
    {
      BreakDownID: 1,
      Reason: "Brake Issue",
      Remark: "Brake not holding",
      MouldName: "Trolley-01",
      StartTime: "05-01-2026 10:00",
      EndTime: "05-01-2026 10:45",
      Duration: "45 min",
    },
    {
      BreakDownID: 2,
      Reason: "Motor Overheating",
      Remark: "High temperature",
      MouldName: "Trolley-03",
      StartTime: "05-01-2026 11:00",
      EndTime: "05-01-2026 12:00",
      Duration: "60 min",
    },
    {
      BreakDownID: 3,
      Reason: "Sensor Failure",
      Remark: "No signal",
      MouldName: "Trolley-05",
      StartTime: "05-01-2026 13:30",
      EndTime: "05-01-2026 15:30",
      Duration: "120 min",
    },
  ];

  // ---------------- FILTER ----------------
  const applyFilter = () => {
    if (!rangeStart || !rangeEnd) {
      alert("Please select both start & end date.");
      return;
    }

    // Dummy mode → no API call
    alert("Filter applied (dummy data)");
  };

  return (
    <DashboardLayout>
      <div className="p-6 w-full">

        {/* ---------------- FILTER BAR ---------------- */}
        <div className="flex">
        
        <div className="flex bg-white p-2 rounded-xl shadow mb-4 justify-end w-full">
            <h2 className="font-bold text-black p-4 flex-grow"> Trolley Breakdown History </h2>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1 ">
            <div>
              <label className="text-sm font-semibold whitespace-nowrap text-black "> Start Date </label>
              <input
                type="date"
                className="border px-3 py-2 rounded-lg w-40 text-black"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold whitespace-nowrap text-black"> End Date </label>
              <input
                type="date"
                className="border px-3 py-2 rounded-lg w-40"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
              />
            </div>

            <button
              className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 text-sm font-semibold whitespace-nowrap text-black"
              onClick={applyFilter}
            >
              Apply
            </button>
          </div>
        </div>
</div>
        {/* ---------------- SUMMARY CARDS ---------------- */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-xl p-4 text-center">
              <h3 className="text-m font-semibold text-black">
                {item.label}
              </h3>

              {item.mould ? (
                <>
                  <p className="font-sm mt-2 text-black">{item.mould}</p>
                  <p className=" font-sm text-blue-700">
                    {item.duration}
                  </p>
                </>
              ) : (
                <p className="text-black font-sm mt-2">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* ---------------- CHARTS ---------------- */}
        <div className="grid grid-cols-1 gap-8">
          {/* Duration Chart */}
          <div className="h-90 bg-white rounded-xl shadow-md p-10">
            <h3 className="font-semibold text-black text-center mb-4">
              Breakdown Duration
            </h3>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "#000", fontWeight: 300 }} />
                <YAxis  tick={{ fill: "#000", fontWeight: 300 }}/>
                <Tooltip />
                <Bar dataKey="Duration" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Occurrence Chart */}
          <div className="h-90 bg-white rounded-xl shadow-md p-10">
            <h3 className="font-semibold text-black text-center mb-4">
              Breakdown Occurrence
            </h3>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "#000", fontWeight: 300 }}/>
                <YAxis tick={{ fill: "#000", fontWeight: 300 }} />
                <Tooltip />
                <Bar dataKey="Occurence" fill="#f97316" />
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
                  <th className="p-2 border ">ID</th>
                  <th className="p-2 border">Reason</th>
                  <th className="p-2 border">Remark</th>
                  <th className="p-2 border">Trolley</th>
                  <th className="p-2 border">Start Time</th>
                  <th className="p-2 border">End Time</th>
                  <th className="p-2 border">Duration</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-blue-50 text-sm transition-all duration-200 text-black">
                    <td className="p-2 border text-center">{r.BreakDownID}</td>
                    <td className="p-2 border text-center">{r.Reason}</td>
                    <td className="p-2 border text-center">{r.Remark}</td>
                    <td className="p-2 border text-center">{r.MouldName}</td>
                    <td className="p-2 border text-center">{r.StartTime}</td>
                    <td className="p-2 border text-center">{r.EndTime}</td>
                    <td className="p-2 border text-center">{r.Duration}</td>
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
