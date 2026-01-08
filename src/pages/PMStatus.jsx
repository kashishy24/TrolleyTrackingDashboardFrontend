import React, { useState } from "react";
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

// ------------------ Dummy Data ------------------
const statusCards = [
  { label: "Normal Trolleys", value: 42, color: "bg-green-500" },
  { label: "PM Warning", value: 12, color: "bg-yellow-500" },
  { label: "PM Alert", value: 6, color: "bg-orange-500" },
  { label: "PM Alarm", value: 3, color: "bg-red-600" },
];

const planCards = [
  { label: "Day", value: 42, color: "bg-green-500" },
  { label: "Week", value: 12, color: "bg-yellow-500" },
  { label: "Month", value: 6, color: "bg-orange-500" },
  { label: "Year", value: 3, color: "bg-red-600" },
];

const StatuschartData = [
  { name: "Normal", value: 42 },
  { name: "Warning", value: 12 },
  { name: "Alert", value: 6 },
  { name: "Alarm", value: 3 },
];

const planchartData = [
  { name: "Day", value: 42 },
  { name: "Week", value: 12 },
  { name: "Month", value: 6 },
  { name: "Year", value: 3 },
];

const tableData = [
  {
    trolleyId: "TR-101",
    lastPM: "2026-01-10",
    nextPM: "2026-02-10",
    planDate: "Monthly",
    status: "Normal",
  },
  {
    trolleyId: "TR-102",
    lastPM: "2026-01-01",
    nextPM: "2026-02-01",
    planDate: "Monthly",
    status: "Warning",
  },
  {
    trolleyId: "TR-103",
    lastPM: "2025-12-20",
    nextPM: "2026-01-20",
    planDate: "Monthly",
    status: "Alert",
  },
  {
    trolleyId: "TR-104",
    lastPM: "2025-12-15",
    nextPM: "2026-01-15",
    planDate: "Monthly",
    status: "Alarm",
  },
];


// ------------------ Component ------------------
const PMStatus = () => {
  const [filter, setFilter] = useState("Day");
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const filteredTableData = tableData.filter((row) => {
  if (!startDate || !endDate) return true;

  const nextPMDate = new Date(row.nextPM);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return nextPMDate >= start && nextPMDate <= end;
});


  return (
    <DashboardLayout>
      <div className="text-black px-6 py-4 space-y-6">

        {/* ---------- Title ---------- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
         className="text-lg font-semibold rounded-full bg-white text-black-800 outline mb-4 p-4 justify-center text-center"
        >
          Preventive Maintenance Status
        </motion.h1>

        {/* ---------- Status Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statusCards.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <div className={`w-4 h-10 rounded ${item.color}`} />
            </motion.div>
          ))}
        </div>
{/* ---------- Title ---------- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold rounded-full bg-white text-black-800 outline mb-4 p-4 justify-center text-center"
        >
          Preventive Maintenance plan
        </motion.h1>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {planCards.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <div className={`w-4 h-10 rounded ${item.color}`} />
            </motion.div>
          ))}
        </div>

        {/* ---------- Chart + Date ---------- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <h3 className="font-bold mb-3">PM Status Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={StatuschartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: "#000" }} />
                  <YAxis tick={{ fill: "#000" }} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <h3 className="font-bold mb-3">PM Status Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planchartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: "#000" }} />
                  <YAxis tick={{ fill: "#000" }} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1200}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        {/* ---------- Date Filter ---------- */}
<div className="flex ">

  {/* Date Filters */}
  <div className="flex items-center gap-4  bg-white p-2 rounded-xl shadow-md border w-full justify-end">

    <h2 className="font-bold text-black p-4 flex-grow"> Preventive Maintenance Details Table  </h2>

    {/* Start Date */}
    <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
      <label className="text-sm font-semibold whitespace-nowrap">
        Start Date
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="outline-none text-sm bg-transparent"
      />
    </div>

    {/* End Date */}
    <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
      <label className="text-sm font-semibold whitespace-nowrap">
        End Date
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="outline-none text-sm bg-transparent"
      />
    </div>
</div>
</div>


        {/* ---------- Table ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-4"
        >

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2 text-left">Trolley ID</th>
                  <th className="p-2">Last PM</th>
                  <th className="p-2">Next PM Due</th>
                  <th className="p-2">PM Plan</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-2 font-semibold">{row.trolleyId}</td>
                    <td className="p-2 text-center">{row.lastPM}</td>
                    <td className="p-2 text-center">{row.nextPM}</td>
                    <td className="p-2 text-center">{row.planDate}</td>
                    <td className="p-2 text-center font-bold">
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
};

export default PMStatus;
