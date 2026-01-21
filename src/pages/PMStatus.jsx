import React, { useEffect, useState } from "react";
import DashboardLayout from "../partials/DashboardLayout";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const PMStatus = () => {
  const [pmStatus, setPmStatus] = useState({
    normal: 0,
    warning: 0,
    alert: 0,
    alarm: 0,
  });

  const [pmPlan, setPmPlan] = useState({
    day: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* ------------------ API CALLS ------------------ */
  useEffect(() => {
    fetchPMStatus();
    fetchPMPlan();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchPMDetails(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetchPMStatus = async () => {
    const res = await axios.get(`${BASE_URL}/trolleypmstatus/TrolleypmStatus`);
    setPmStatus(res.data.data);
  };

  const fetchPMPlan = async () => {
    const res = await axios.get(
      `${BASE_URL}/trolleypmstatus/TrolleyPMScheduleSummary`
    );
    setPmPlan(res.data.data);
  };

  const fetchPMDetails = async (start, end) => {
    const res = await axios.get(
      `${BASE_URL}/trolleypmstatus/TrolleyPMDetails`,
      {
        params: { startDate: start, endDate: end },
      }
    );
    setTableData(res.data.data);
  };

  /* ------------------ CARD DATA ------------------ */
  const statusCards = [
    { label: "Normal Trolleys", value: pmStatus.normal, color: "bg-green-500" },
    { label: "PM Warning", value: pmStatus.warning, color: "bg-yellow-500" },
    { label: "PM Alert", value: pmStatus.alert, color: "bg-orange-500" },
    { label: "PM Alarm", value: pmStatus.alarm, color: "bg-red-600" },
  ];

  const planCards = [
    { label: "Day", value: pmPlan.day, color: "bg-green-500" },
    { label: "Week", value: pmPlan.week, color: "bg-yellow-500" },
    { label: "Month", value: pmPlan.month, color: "bg-orange-500" },
    { label: "Year", value: pmPlan.year, color: "bg-red-600" },
  ];

  const StatuschartData = [
    { name: "Normal", value: pmStatus.normal },
    { name: "Warning", value: pmStatus.warning },
    { name: "Alert", value: pmStatus.alert },
    { name: "Alarm", value: pmStatus.alarm },
  ];

  const planchartData = [
    { name: "Day", value: pmPlan.day },
    { name: "Week", value: pmPlan.week },
    { name: "Month", value: pmPlan.month },
    { name: "Year", value: pmPlan.year },
  ];

  return (
    <DashboardLayout>
      <div className="text-black px-6 py-4 space-y-6">

        {/* ---------- Title ---------- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold rounded-full bg-white outline mb-4 p-4 text-center"
        >
          Preventive Maintenance Status
        </motion.h1>

        {/* ---------- Status Cards ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statusCards.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
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

        {/* ---------- PM Plan ---------- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold rounded-full bg-white outline mb-4 p-4 text-center"
        >
          Preventive Maintenance Scheduled Plan
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {planCards.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
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

        {/* ---------- Charts ---------- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[StatuschartData, planchartData].map((data, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Date Filters ---------- */}
        {/* <div className="bg-white p-4 rounded-xl shadow-md flex justify-end gap-4">
          
          <input type="date" onChange={e => setStartDate(e.target.value)} />
          <input type="date" onChange={e => setEndDate(e.target.value)} />
        </div> */}
{/* ---------- Date Filters ---------- */}
<div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
  
  {/* Left Header */}
  <h2 className="text-lg font-semibold text-gray-700">
    Preventive Maintenance Plan Details
  </h2>

  {/* Right Filters */}
  <div className="flex gap-4">
    <input
      type="date"
      onChange={e => setStartDate(e.target.value)}
      className="border rounded-md px-2 py-1"
    />
    <input
      type="date"
      onChange={e => setEndDate(e.target.value)}
      className="border rounded-md px-2 py-1"
    />
  </div>
</div>
        {/* ---------- Table ---------- */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Trolley ID</th>
                <th className="p-2">Last PM</th>
                <th className="p-2">Next PM Due</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2 text-center">TR-{row.TrolleyID}</td>
                  <td className="p-2 text-center">{row.LastPM?.slice(0,10)}</td>
                  <td className="p-2 text-center">{row.NextPMDue?.slice(0,10)}</td>
                  <td className="p-2 text-center font-bold">{row.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default PMStatus;
