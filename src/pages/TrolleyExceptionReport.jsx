import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
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

/* ------------------ COMPONENT ------------------ */
const TrolleyExceptionReport = () => {
  const [statusFilter, setStatusFilter] = useState("");
const [moveTypeFilter, setMoveTypeFilter] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [sortOrder, setSortOrder] = useState("desc");

const BASE = (import.meta.env.VITE_BACKEND_BASE_URL || "").replace(/\/+$/, "");

 /* -------- Table api -------- */
const [apiData, setApiData] = useState([]);
const [loading, setLoading] = useState(false);
/* -------- SUMMARY COUNTS -------- */
const [summary, setSummary] = useState({
  duplicate: 0,
  wrong: 0,
});

/* -------- SOURCE → DEST TABLE -------- */
const [sourceDestData, setSourceDestData] = useState([]);

/* -------- LOCATION WISE CHARTS -------- */
const [duplicateLocationChart, setDuplicateLocationChart] = useState([]);
const [wrongLocationChart, setWrongLocationChart] = useState([]);
 // Dynamic filter options
  const [statusOptions, setStatusOptions] = useState([]);
  const [moveTypeOptions, setMoveTypeOptions] = useState([]);

const filteredData = useMemo(() => {
    let data = [...apiData];

    if (statusFilter) {
      data = data.filter((row) => row.MovementStatus === statusFilter);
    }

    if (moveTypeFilter) {
      data = data.filter((row) => row.MovementType === moveTypeFilter);
    }

    data.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    return data;
  }, [apiData, statusFilter, moveTypeFilter, sortOrder]);



 useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchExceptionHistory = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          `${BASE}/TrolleyExpectionReport/error-movement-history`,
          { StartDate: startDate, EndDate: endDate }
        );

        const apiResult = response?.data?.data || [];

        const mappedData = apiResult.map((item) => ({
          trolleyId: item.TrolleyID,
          source: item.SourceLocation,
          destination: item.DestinationLocation,
          MovementType: item.MovementType,
          MovementStatus: item.MovementStatus,
          date: new Date(item.MovementDate).toISOString().split("T")[0],
        }));

        setApiData(mappedData);

        // Set filter options dynamically
        setStatusOptions([...new Set(mappedData.map((d) => d.MovementStatus))]);
        setMoveTypeOptions([...new Set(mappedData.map((d) => d.MovementType))]);
      } catch (error) {
        console.error("API Error:", error);
        setApiData([]);
        setStatusOptions([]);
        setMoveTypeOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExceptionHistory();
  }, [startDate, endDate]);

useEffect(() => {
  if (!startDate || !endDate) return;

  const params = {
    startDate,
    endDate,
  };

  /* ---------- 1. TOTAL DUPLICATE / WRONG ---------- */
  axios
    .get(`${BASE}/TrolleyExpectionReport/TrolleyTotalDuplicateWrongMovement`, {
      params,
    })
    .then((res) => {
      const d = res?.data?.data || {};
      setSummary({
        duplicate: d.duplicateMovement || 0,
        wrong: d.wrongMovement || 0,
      });
    })
    .catch(() => {
      setSummary({ duplicate: 0, wrong: 0 });
    });

  /* ---------- 2. SOURCE → DESTINATION ---------- */
  axios
    .get(`${BASE}/TrolleyExpectionReport/wrong-duplicate-movement`, {
      params,
    })
    .then((res) => {
      setSourceDestData(res?.data?.data || []);
    })
    .catch(() => {
      setSourceDestData([]);
    });

  /* ---------- 3. LOCATION WISE ---------- */
  axios
    .get(`${BASE}/TrolleyExpectionReport/TrolleyDuplicateWrongMovement`, {
      params,
    })
    .then((res) => {
      const data = res?.data?.data || {};

      setDuplicateLocationChart(
        (data.duplicateMovement || []).map((d) => ({
          name: d.LocationName,
          value: d.DuplicateCount,
        }))
      );

      setWrongLocationChart(
        (data.wrongMovement || []).map((d) => ({
          name: d.LocationName,
          value: d.WrongCount,
        }))
      );
    })
    .catch(() => {
      setDuplicateLocationChart([]);
      setWrongLocationChart([]);
    });
}, [startDate, endDate]);


  return (
    <DashboardLayout>
      <div className="px-8 py-4 space-y-6  text-black">

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
  {summary.duplicate}
</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-blue-100 px-4 py-1 rounded font-medium">
              Total Wrong Movement
            </span>
            <span className="bg-blue-700 text-white px-6 py-1 rounded font-bold">
  {summary.wrong}
</span>
          </div>
        </div>

        {/* ---------- SOURCE → DESTINATION TABLE ---------- */}
        <div className="max-h-[350px] bg-white rounded-xl shadow-md overflow-y-auto ">
          <div className="grid grid-cols-3 bg-blue-100 font-bold p-3 sticky top-0 z-10">
            <span>Source</span>
            <span>Destination</span>
            <span>Movement Count</span>
          </div>

          {sourceDestData.map((row, index) => (
  <motion.div
    key={index}
    whileHover={{ backgroundColor: "#f1f5f9" }}
    className="grid grid-cols-3 p-3 border-b"
  >
    <span className="font-semibold">{row.Source}</span>
    <span className="font-semibold">{row.Destination}</span>

    <div className="w-full bg-gray-200 rounded h-5">
      <div
        className="h-5 bg-blue-600 rounded text-xs text-white text-right pr-2"
        style={{ width: `${row.MovementCount * 15}%` }}
      >
        {row.MovementCount}
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
<div className="flex justify-end w-full">
  <div className="flex items-center gap-4  bg-white p-2 rounded-xl shadow-md w-full justify-end border  ml-auto ">
 <h2 className="font-bold text-black p-4 flex-grow">Error Movement History Table  </h2>

 
    {/* Status Filter */}
    <select
              className="border rounded-lg px-8 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

    {/* Move Type Filter */}
    <select
              className="border rounded-lg px-8 py-2"
              value={moveTypeFilter}
              onChange={(e) => setMoveTypeFilter(e.target.value)}
            >
              <option value="">All Move Types</option>
              {moveTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>


    {/* Sort */}
     <select
              className="border rounded-lg px-8 py-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Latest First</option>
              <option value="asc">Oldest First</option>
            </select>

  </div>
</div>

        {/* ---------- HISTORY TABLE ---------- */}
        <div className="bg-white rounded-xl shadow-md  max-h-[350px] overflow-y-auto">
          <table className="w-full text-sm ">
            <thead className="bg-blue-600 text-white sticky top-0 z-0">
              <tr>
                <th className="p-2">Trolley ID</th>
                <th className="p-2">Source</th>
                <th className="p-2">Destination</th>
                <th className="p-2">Movement Status</th>
                <th className="p-2">Movement Type</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" className="p-4 text-center font-semibold">
        Loading data...
      </td>
    </tr>
  ) : filteredData.length === 0 ? (
    <tr>
      <td colSpan="5" className="p-4 text-center font-semibold">
        No records found
      </td>
    </tr>
  ) : (
    filteredData.map((row, i) => (
      <tr key={i} className="border-b hover:bg-gray-100">
        <td className="p-2 text-center">{row.trolleyId}</td>
        <td className="p-2 text-center">{row.source}</td>
        <td className="p-2 text-center">{row.destination}</td>
         <td className="p-2 text-center">{row.MovementStatus}</td>
        <td className="p-2 text-center">{row.MovementType}</td>
        <td className="p-2 text-center">{row.date}</td>
      </tr>
    ))
  )}
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
