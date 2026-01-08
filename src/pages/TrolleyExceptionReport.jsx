import React, { useState, useMemo } from "react";
import DashboardLayout from "../partials/DashboardLayout";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* ------------------ DUMMY DATA ------------------ */
const exceptionHistory = [
  {
    trolleyId: "TR-101",
    source: "Production",
    destination: "Empty",
    type: "Duplicate",
    count: 2,
    date: "2026-01-10",
  },
  {
    trolleyId: "TR-102",
    source: "FG Store",
    destination: "Production",
    type: "Wrong",
    count: 5,
    date: "2026-01-11",
  },
  {
    trolleyId: "TR-103",
    source: "Customer",
    destination: "FG Store",
    type: "Duplicate",
    count: 3,
    date: "2026-01-12",
  },
];

const rawData = [
  {
    trolleyId: "TR-101",
    source: "Production",
    destination: "FG Store",
    type: "Duplicate",
      count: 3,
    moveType: "Auto",
    date: "2025-01-05",
  },
  {
    trolleyId: "TR-102",
    source: "FG Store",
    destination: "Production",
    type: "Wrong",
    count: 5,
    moveType: "Manual",
    date: "2025-01-07",
  },
  {
    trolleyId: "TR-103",
    source: "Warehouse",
    destination: "Production",
    type: "Duplicate",
    count: 2,
    moveType: "Manual",
    date: "2025-01-10",
  },
];

/* ------------------ COMPONENT ------------------ */
const TrolleyExceptionReport = () => {
  const [statusFilter, setStatusFilter] = useState("");
const [moveTypeFilter, setMoveTypeFilter] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [sortOrder, setSortOrder] = useState("desc");

  /* -------- FILTER DATA BASED ON DATE -------- */
 const filteredData = useMemo(() => {
  let data = [...rawData];

  if (statusFilter) {
    data = data.filter(row => row.type === statusFilter);
  }

  if (moveTypeFilter) {
    data = data.filter(row => row.moveType === moveTypeFilter);
  }

  if (startDate) {
    data = data.filter(row => row.date >= startDate);
  }

  if (endDate) {
    data = data.filter(row => row.date <= endDate);
  }

  data.sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

  return data;
}, [statusFilter, moveTypeFilter, startDate, endDate, sortOrder]);


  /* -------- SUMMARY -------- */
  const duplicateCount = filteredData
    .filter((d) => d.type === "Duplicate")
    .reduce((a, b) => a + b.count, 0);

  const wrongCount = filteredData
    .filter((d) => d.type === "Wrong")
    .reduce((a, b) => a + b.count, 0);

  /* -------- LOCATION WISE CHART DATA -------- */
  const duplicateLocationChart = [
    { name: "Empty", value: 2 },
    { name: "Production", value: 4 },
    { name: "FG Store", value: 2 },
    { name: "Customer", value: 3 },
  ];

  const wrongLocationChart = [
    { name: "Empty", value: 2 },
    { name: "Production", value: 4 },
    { name: "FG Store", value: 2 },
    { name: "Customer", value: 3 },
  ];

  return (
    <DashboardLayout>
      <div className="px-6 py-4 space-y-8 text-black">

        {/* ---------- HEADER ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center border"
        >
          <h1 className="text-lg font-semibold">
             Error Movement  Summary
          </h1>

          {/* Date Filter */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
              <label className="text-sm font-semibold">Start Date </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
              <label className="text-sm font-semibold">End Date </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="outline-none text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* ---------- SUMMARY ---------- */}
        <div className="flex justify-center gap-10">
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 px-4 py-1 rounded font-medium">
              Total Duplicate Movement
            </span>
            <span className="bg-blue-700 text-white px-6 py-1 rounded font-bold">
              {duplicateCount}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-100 px-4 py-1 rounded font-medium">
              Total Wrong Movement
            </span>
            <span className="bg-blue-700 text-white px-6 py-1 rounded font-bold">
              {wrongCount}
            </span>
          </div>
        </div>

        {/* ---------- SOURCE → DESTINATION TABLE ---------- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-3 bg-blue-100 font-bold p-3">
            <span>Source</span>
            <span>Destination</span>
            <span>Movement Count</span>
          </div>

          {filteredData.map((row, index) => (
            <motion.div
              key={index}
              whileHover={{ backgroundColor: "#f1f5f9" }}
              className="grid grid-cols-3 p-3 border-b"
            >
              <span className="font-semibold">{row.source}</span>
              <span className="font-semibold">{row.destination}</span>
              <div className="w-full bg-gray-200 rounded h-5">
                <div
                  className="h-5 bg-blue-600 rounded text-xs text-white text-right pr-2"
                  style={{ width: `${row.count * 15}%` }}
                >
                  {row.count}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---------- LOCATION WISE BAR CHART ---------- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChartCard
            title="Duplicate Movement – Location Wise"
            data={duplicateLocationChart}
          />
          <ChartCard
            title="Wrong Movement – Location Wise"
            data={wrongLocationChart}
          />
        </div>
<div className="bg-white rounded-xl shadow-md p-4 mb-6 ">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-end  align-items-right">

    {/* Status Filter */}
    <select
      className="border rounded-lg px-3 py-2 justify-end bg-blue-100"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="">All Status</option>
      <option value="Duplicate">Duplicate</option>
      <option value="Wrong">Wrong</option>
    </select>

    {/* Move Type Filter */}
    <select
      className="border rounded-lg px-3 py-2 justify-end bg-blue-100"
      value={moveTypeFilter}
      onChange={(e) => setMoveTypeFilter(e.target.value)}
    >
      <option value="">All Move Types</option>
      <option value="Auto">Auto</option>
      <option value="Manual">Manual</option>
    </select>


    {/* Sort */}
    <select
      className="border rounded-lg px-3 py-2 justify-end bg-blue-100"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="desc">Latest First</option>
      <option value="asc">Oldest First</option>
    </select>

  </div>
</div>

        {/* ---------- HISTORY TABLE ---------- */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="font-bold mb-3 text-center">Error Movement History</h3>

          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Trolley ID</th>
                <th className="p-2">Source</th>
                <th className="p-2">Destination</th>
                <th className="p-2">Movement Type</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-100">
                  <td className="p-2 text-center">{row.trolleyId}</td>
                  <td className="p-2 text-center">{row.source}</td>
                  <td className="p-2 text-center">{row.destination}</td>
                  <td className="p-2 text-center">{row.type}</td>
                  <td className="p-2 text-center">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};

/* ------------------ CHART CARD ------------------ */
const ChartCard = ({ title, data }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-md p-4 text-black"
  >
    <h3 className="font-semibold mb-3 text-center">{title}</h3>
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#000", fontWeight: 300 }} />
          <YAxis tick={{ fill: "#000", fontWeight: 300 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export default TrolleyExceptionReport;
