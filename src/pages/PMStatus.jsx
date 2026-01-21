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

const [tableData, setTableData] = useState([]);

const [selectedGroup, setSelectedGroup] = useState("All");

const trolleyGroups = React.useMemo(() => {
  return [...new Set(
    tableData
      .map(row => row.TrolleyGroupId)
      .filter(v => v !== null && v !== undefined)
  )];
}, [tableData]);
  const [pmPlan, setPmPlan] = useState({
    day: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  /* ------------------ API CALLS ------------------ */
  useEffect(() => {
  fetchPMStatus();
  fetchPMPlan();
  fetchPMDetails();
}, []);

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     fetchPMDetails(startDate, endDate);
  //   }
  // }, [startDate, endDate]);

  const fetchPMStatus = async () => {
    const res = await axios.get(`${BASE_URL}/trolleypmstatus/TrolleypmStatus`);
    setPmStatus(res.data.data);
  };
const fetchPMDetails = async () => {
  const res = await axios.get(
    `${BASE_URL}/trolleypmstatus/TrolleyPMDetails`
  );
  setTableData(res.data.data);
};

  const fetchPMPlan = async () => {
    const res = await axios.get(
      `${BASE_URL}/trolleypmstatus/TrolleyPMScheduleSummary`
    );
    setPmPlan(res.data.data);
  };

  // const fetchPMDetails = async (start, end) => {
  //   const res = await axios.get(
  //     `${BASE_URL}/trolleypmstatus/TrolleyPMDetails`,
  //     {
  //       params: { startDate: start, endDate: end },
  //     }
  //   );
  //   setTableData(res.data.data);
  // };

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
const ActualCards = [
    { label: "Day", value:8 , color: "bg-green-500" },
    { label: "Week", value: 68, color: "bg-yellow-500" },
    { label: "Month", value:298, color: "bg-orange-500" },
    { label: "Year", value: 2999, color: "bg-red-600" },
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
const planVsActualChartData = [
  {
    name: "Day",
    Plan: pmPlan.day,
    Actual: 8,
  },
  {
    name: "Week",
    Plan: pmPlan.week,
    Actual: 68,
  },
  {
    name: "Month",
    Plan: pmPlan.month,
    Actual: 298,
  },
  {
    name: "Year",
    Plan: pmPlan.year,
    Actual: 2999,
  },
];

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const [selectedStatus, setSelectedStatus] = useState("All");
  const statusOrder = {
    Normal: 1,
    Alert: 2,
    Warning: 3,   // agar backend me "Warring" ho to yaha same rakho
    Alarm: 4,
    Execution: 5,
  };
  // const filteredTableData = tableData
  //   .filter(row => {
  //     if (selectedStatus === "All") return true;
  //     return row.Status === selectedStatus;
  //   })
  //   .sort((a, b) => {
  //     return (
  //       (statusOrder[a.Status] || 99) -
  //       (statusOrder[b.Status] || 99)
  //     );
  //   });
const filteredTableData = tableData
  .filter(row => {
    const statusMatch =
      selectedStatus === "All" || row.Status === selectedStatus;

    const groupMatch =
      selectedGroup === "All" || row.TrolleyGroupId == selectedGroup;

    return statusMatch && groupMatch;
  })
  .sort((a, b) => {
    return (
      (statusOrder[a.Status] || 99) -
      (statusOrder[b.Status] || 99)
    );
  });

    const groupWiseData = React.useMemo(() => {
  const groups = {};

  tableData.forEach((row) => {
    const groupId = row.TrolleyGroupId || "NA";

    if (!groups[groupId]) {
      groups[groupId] = {
        TrolleyGroupID: groupId,
        TrolleyIDCount: 0,
        Normal: 0,
        Warning: 0,
        Alert: 0,
        Alarm: 0,
      };
    }

    groups[groupId].TrolleyIDCount += 1;

    if (row.Status === "Normal") groups[groupId].Normal += 1;
    if (row.Status === "Warning") groups[groupId].Warning += 1;
    if (row.Status === "Alert") groups[groupId].Alert += 1;
    if (row.Status === "Alarm") groups[groupId].Alarm += 1;
  });

  return Object.values(groups);
}, [tableData]);

  return (
    <DashboardLayout>
      <div className="text-black px-8 space-y-6">
        <div className="flex items-center justify-between">

          <div className="text-sm font-bold text-black-700 bg-white px-20 py-4 outline text-center rounded-full shadow">
            📅 Current Date -: {today}
          </div>
        </div>
        {/* ---------- Title ---------- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold rounded-full bg-blue-100 text-gray-800 outline mb-4 p-4 text-center"
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
          className="text-lg font-semibold rounded-full bg-blue-100 text-gray-800 outline mb-4 p-4 text-center"
        >
          Preventive Maintenance Scheduled Plan VS Actuals
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <p className="bg-white text-l shadow-md rounded-xl text-center flex justify-center items-center font-bold ">PLAN</p>
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
<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
   <p className="bg-white text-l shadow-md rounded-xl text-center flex justify-center items-center font-bold ">Actual</p>
          {ActualCards.map((item, index) => (
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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold rounded-full bg-blue-100 text-gray-800 outline mb-4 p-4 text-center"
        >
          Preventive Maintenance Chart Summary
        </motion.h1>
        {/* ---------- Charts ---------- */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* -------- STATUS CHART -------- */}
  <div className="bg-white rounded-xl shadow-md p-4">
    <h2 className="font-bold text-center mb-2">
      PM Status Distribution
    </h2>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={StatuschartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#000", fontWeight: 300, fontSize: 12 }}/>
          <YAxis tick={{ fill: "#000", fontWeight: 300 , fontSize: 12 }}/>
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* -------- PLAN vs ACTUAL CHART -------- */}
  <div className="bg-white rounded-xl shadow-md p-4">
    <h2 className="font-bold text-center mb-2">
      PM Plan vs Actual
    </h2>

    <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={planVsActualChartData}
    barCategoryGap="20%"
    barGap={4}
  >
    <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{ fill: "#000", fontWeight: 300, fontSize: 12 }}/>
          <YAxis tick={{ fill: "#000", fontWeight: 300 , fontSize: 12 }}/>
    <Tooltip />

    {/* PLAN BAR → LEFT */}
    <Bar dataKey="Plan" fill="#2563eb" radius={[6, 6, 0, 0]} />

    {/* ACTUAL BAR → RIGHT */}
    <Bar dataKey="Actual" fill="#88c3f1" radius={[6, 6, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

    </div>
  </div>

</div>


        {/* ---------- Date Filters ---------- */}
   
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-wrap justify-end gap-4 items-center">
          <h2 className="font-bold text-black p-4 flex-grow"> Preventive Maintenance Schedule Table  </h2>

          {/* Trolley Group Filter */}
  <select
    value={selectedGroup}
    onChange={e => setSelectedGroup(e.target.value)}
    className="border rounded px-10 py-1 bg-white"
  >
    <option value="All">All Groups</option>
    {trolleyGroups.map(groupId => (
      <option key={groupId} value={groupId}>
        Group {groupId}
      </option>
    ))}
  </select>
  
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="border rounded px-10 py-1 bg-white"
          >
            <option value="All">All Status</option>
            <option value="Normal">Normal</option>
            <option value="Alert">Alert</option>
            <option value="Warning">Warning</option>
            <option value="Alarm">Alarm</option>
            <option value="Execution">Execution</option>
          </select>


        </div>

        {/* ---------- Table ---------- */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Trolley ID</th>
                <th className="p-2">Trolley Group ID</th>
                <th className="p-2">Last PM</th>
                <th className="p-2">Next PM Due</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTableData.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-center">{row.TrolleyID}</td>
                   <td className="p-2 text-center">{row.TrolleyGroupId}</td>
                  <td className="p-2 text-center">
                    {row.LastPM?.slice(0, 10)}
                  </td>
                  <td className="p-2 text-center">
                    {row.NextPMDue?.slice(0, 10)}
                  </td>
                  <td
                    className={`p-2 text-center font-bold
          ${row.Status === "Normal" && "text-green-600"}
          ${row.Status === "Alert" && "text-orange-500"}
          ${row.Status === "Warning" && "text-yellow-600"}
          ${row.Status === "Alarm" && "text-red-600"}
          ${row.Status === "Execution" && "text-blue-600"}
        `}
                  >
                    {row.Status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
   {/* ---------- TROLLEY GROUP STATUS SUMMARY TABLE ---------- */}
<div className="bg-white rounded-xl shadow-md p-4">
  <h2 className="font-bold text-black mb-4">
    Trolley Group Wise PM Status Summary
  </h2>

  <table className="w-full text-sm border">
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="p-2">Trolley Group ID</th>
        <th className="p-2">Trolley Count</th>
        <th className="p-2">Normal</th>
        <th className="p-2">Warning</th>
        <th className="p-2">Alert</th>
        <th className="p-2">Alarm</th>
      </tr>
    </thead>

    <tbody>
      {groupWiseData.map((row, idx) => (
        <tr key={idx} className="border-b text-center hover:bg-gray-50">
          <td className="p-2 font-semibold">{row.TrolleyGroupID}</td>
          <td className="p-2 font-bold">{row.TrolleyIDCount}</td>

          <td className="p-2 text-green-600 font-semibold">{row.Normal}</td>
          <td className="p-2 text-yellow-600 font-semibold">{row.Warning}</td>
          <td className="p-2 text-orange-500 font-semibold">{row.Alert}</td>
          <td className="p-2 text-red-600 font-semibold">{row.Alarm}</td>
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
