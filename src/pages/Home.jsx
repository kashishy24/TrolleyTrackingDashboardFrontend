import React, { useEffect, useState } from "react";
import DashboardLayout from "../partials/DashboardLayout";
import {
  MdLocalShipping,
  MdBuild,
  MdWarning,
  MdCheckCircle,
} from "react-icons/md";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { motion } from "framer-motion";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

/* ------------------ PROGRESS BAR (✅ ADDED HERE) ------------------ */
const ProgressBar = ({ value }) => {
  const max = 10; // adjust if needed
  const width = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full flex items-center justify-center text-xs text-white font-semibold transition-all duration-500"
        style={{ width: `${width}%` }}
      >
        {value}
      </div>
    </div>
  );
};


/* ------------------ STAT CARD ------------------ */
const StatCard = ({ title, items, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl text-black"
  >
    <div className="flex items-center gap-2 mb-3 justify-center">
      <Icon className="text-blue-600 text-xl" />
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>

    <div className="space-y-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between bg-blue-50 px-3 py-1 rounded">
          <span>{item.label}</span>
          <span className="font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  </motion.div>
);


/* ------------------ CHART CARD ------------------ */
const ChartCard = ({ title, data, barColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-md p-4 text-center"
  >
    <h3 className="text-sm font-semibold mb-3">{title}</h3>
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={barColor} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);



// vertical bar chart
const VerticalBarCard = ({ title, data, barColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-md p-5"
  >
    <h3 className="text-m font-bold mb-4 text-black text-center">
      {title}
    </h3>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fill: "#000", fontWeight: 300 }} />
          <YAxis allowDecimals={false} tick={{ fill: "#000", fontWeight: 300 }} />
          <Tooltip />

          <Bar
            dataKey="value"
            fill={barColor}
            radius={[6, 6, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);


const abnormalMovementTable = [
  { source: "Production", destination: "Empty", value: 2 },
  { source: "FG Store", destination: "Production", value: 5 },
  { source: "Customer", destination: "FG Store", value: 3 },
];
/* ------------------ HOME ------------------ */
const Home = () => {
  const [liveStatus, setLiveStatus] = useState(null);
  const [hourlyTrend, setHourlyTrend] = useState([]);
  const [abnormalSummary, setAbnormalSummary] = useState({ duplicate: 0, wrong: 0 });
  const [duplicateLocation, setDuplicateLocation] = useState([]);
  const [wrongLocation, setWrongLocation] = useState([]);
const [todayAbnormalMovements, setTodayAbnormalMovements] = useState([]);

  /* ------------------ API CALLS ------------------ */
 useEffect(() => {
  const loadDashboard = async () => {
    try {
      /* ---------- LIVE STATUS ---------- */
      const liveRes = await api.get("/Home/TrolleyLiveStatus");
      setLiveStatus(liveRes.data.data);

      /* ---------- HOURLY LOCATION SUMMARY ---------- */
      const hourlyRes = await api.get("/Home/TrolleyLocationHourlySummary");

      const byLocation = {};
      hourlyRes.data.data.forEach(loc => {
        byLocation[loc.locationName] = loc.hourly;
      });

      const hours = byLocation["Customer"]?.map(h => h.hour) || [];

      const merged = hours.map((hour, idx) => ({
        hour,
        customerToEmptyStore: byLocation["Empty"]?.[idx]?.value || 0,
        EmptystoreToProduction: byLocation["Production"]?.[idx]?.value || 0,
        productionToFGStore: byLocation["FG Store"]?.[idx]?.value || 0,
        FGStoreToCustomer: byLocation["Customer"]?.[idx]?.value || 0,
      }));

      setHourlyTrend(merged);

      /* ---------- DUP / WRONG SUMMARY ---------- */
      const abnormalRes = await api.get("/Home/TrolleyTotalDuplicateWrongMovement");
      setAbnormalSummary({
        duplicate: abnormalRes.data.data.DuplicateMovement,
        wrong: abnormalRes.data.data.WrongMovement,
      });

      /* ---------- TODAY WRONG / DUPLICATE MOVEMENT TABLE ---------- */
const todayAbnormalRes = await api.get(
  "/Home/wrong-duplicate-movement/today"
);

setTodayAbnormalMovements(todayAbnormalRes.data.data || []);

      /* ---------- DUP / WRONG LOCATION WISE ---------- */
      const locWiseRes = await api.get("/Home/TrolleyDupWrongMovementLocationWise");

      setDuplicateLocation(
        locWiseRes.data.data.duplicate.map(d => ({
          name: d.LocationName,
          value: d.DuplicateCount,
        }))
      );

      setWrongLocation(
        locWiseRes.data.data.wrong.map(w => ({
          name: w.LocationName,
          value: w.WrongCount,
        }))
      );

    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  };

  loadDashboard();
}, []);


  if (!liveStatus) return null;

  /* ------------------ DATA MAPPING ------------------ */
  const trolleyLocationData = [
    { name: "Empty", value: liveStatus.locationStatus.Empty },
    { name: "FG Store", value: liveStatus.locationStatus.FGStore },
    { name: "Production", value: liveStatus.locationStatus.Production },
    { name: "Customer", value: liveStatus.locationStatus.Customer },
    { name: "Maintenance", value: liveStatus.locationStatus.Maintenance },
  ];

  const trolleyStatusData = [
    { name: "OK", value: liveStatus.locationStatus.OKTrolleys },
    { name: "Breakdown", value: liveStatus.locationStatus.Breakdown },
    { name: "PM", value: liveStatus.locationStatus.PM },
    { name: "Scrap", value: liveStatus.locationStatus.Scrap },
  ];

  const pmStatusData = [
    { name: "Normal", value: liveStatus.locationStatus.PM_Normal },
    { name: "Alert", value: liveStatus.locationStatus.PM_Alert },
    { name: "Warning", value: liveStatus.locationStatus.PM_Warning },
    { name: "Alarm", value: liveStatus.locationStatus.PM_Alarm },
    { name: "Execution", value: liveStatus.locationStatus.PM_Execution },
    { name: "Completed", value: liveStatus.pmCompletedToday },
  ];

  const trolleyBreakdownData = [
    { name: "Total Breakdown", value: liveStatus.breakdown.TotalBreakdown },
    { name: "Under Maintenance", value: liveStatus.breakdown.UnderMaintenance },
    { name: "Repair Today", value: liveStatus.repairedToday },
    { name: "Scrap Today", value: liveStatus.locationStatus.Scrap },
  ];


  return (
    <DashboardLayout>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mr-4 pl-10 font-bold text-black">
        <StatCard title="By Location" icon={MdLocalShipping} items={[
          { label: "Total Trolleys", value: liveStatus.locationStatus.TotalTrolleys },
          { label: "Empty", value: liveStatus.locationStatus.Empty },
          { label: "FG Store", value: liveStatus.locationStatus.FGStore },
          { label: "Production", value: liveStatus.locationStatus.Production },
          { label: "Customer", value: liveStatus.locationStatus.Customer },
          { label: "Maintenance4", value: liveStatus.locationStatus.Maintenance },
        ]}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl text-black"
        />

        <StatCard title="By Trolley Status" icon={MdCheckCircle} items={[
          { label: "OK Trolleys", value: liveStatus.locationStatus.OKTrolleys },
          { label: "Breakdown", value: liveStatus.locationStatus.Breakdown },
          { label: "PM", value: liveStatus.locationStatus.PM },
          { label: "Scrap", value: liveStatus.locationStatus.Scrap },
        ]} />

          

        <StatCard title="By PM Status" icon={MdBuild} items={[
          { label: "Normal", value: liveStatus.locationStatus.PM_Normal },
          { label: "Alert", value: liveStatus.locationStatus.PM_Alert },
          { label: "Warning", value: liveStatus.locationStatus.PM_Warning },
          { label: "Alarm", value: liveStatus.locationStatus.PM_Alarm },
          { label: "Execution", value: liveStatus.locationStatus.PM_Execution },
          { label: "Completed", value: liveStatus.pmCompletedToday },
        ]} /> 


        <StatCard title="Trolley Breakdown" icon={MdWarning} items={[
          { label: "Total Breakdown", value: liveStatus.breakdown.TotalBreakdown },
          { label: "Under Maintenance", value: liveStatus.breakdown.UnderMaintenance },
          { label: "Repaired Today", value: liveStatus.repairedToday },
          { label: "Scrapped Today", value: liveStatus.locationStatus.Scrap },
        ]} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 pl-10">
        <ChartCard title="Trolley Location" data={trolleyLocationData} barColor="#4466ef" />
        <ChartCard title="Trolley Status" data={trolleyStatusData} barColor="#0f0780" />
        <ChartCard title="Trolley Breakdown" data={trolleyBreakdownData} barColor="#0f0780" />
        <ChartCard title="PM Status" data={pmStatusData} barColor="#4466ef" />
      </div>

      {/* EVERYTHING BELOW REMAINS EXACTLY SAME */}
      {/* Movement, abnormal movement, hourly charts can be connected later */}



      <div className="mt-8 pl-10 pr-4 mb-8">
        <h2 className="text-lg font-semibold rounded-full bg-white outline text-gray-800 mb-4 p-4 justify-center text-center">
          🚚 Trolley Movement
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Customer → Empty Store */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex bg-white rounded-xl shadow-md p-4 text-black items-center gap-3"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-black-600 text-xl">
              🚚
            </div>
            <div>
              <p className="text-sm text-black">Customer → Empty Store</p>
              <p className="text-2xl font-semibold text-gray-800"> {liveStatus.locationStatus.Empty}</p>
            </div>
          </motion.div>

          {/* Empty Store → Production */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white rounded-xl shadow-md p-4"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
              🏭
            </div>
            <div>
              <p className="text-sm text-black">Empty Store → Production</p>
              <p className="text-2xl font-semibold text-gray-800">{liveStatus.locationStatus.Production}</p>
            </div>
          </motion.div>

          {/* Production → FG Store */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white rounded-xl shadow-md p-4"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
              🏭
            </div>
            <div>
              <p className="text-sm text-black">Production → FG Store</p>
              <p className="text-2xl font-semibold text-gray-800">{liveStatus.locationStatus.FGStore}</p>
            </div>
          </motion.div>

          {/* FG Store  → IN Transt */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white rounded-xl shadow-md p-4"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
              🏭
            </div>
            <div>
              <p className="text-m text-black">FG Store → Customer</p>
              <p className="text-2xl font-semibold text-gray-800">{liveStatus.locationStatus.Customer}</p>
            </div>
          </motion.div>
        </div>

        {/* Hourly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 mt-6"
        >
          <h3 className="text-md font-semibold text-black text-center mb-4">
            ⏱️ Hourly Movement Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyTrend} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour"
                interval={0} // ensures all labels show and are evenly spaced
                padding={{ left: 10, right: 10 }} // reduce extra padding
                tick={{ fill: "#000", fontWeight: 300 }}
              />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} // optional, tighten Y-axis
                tick={{ fill: "#000", fontWeight: 300 }} />
              <Tooltip />
              <Line type="monotone" dataKey="customerToEmptyStore" stroke="#2563eb" strokeWidth={3}
                name="Customer → Empty Store" />
              <Line type="monotone" dataKey="EmptystoreToProduction" stroke="#16a34a" strokeWidth={3}
                name="Empty Store → Production" />
              <Line type="monotone" dataKey="productionToFGStore" stroke="#9333ea" strokeWidth={3}
                name="Production → FG Store" />
              <Line type="monotone" dataKey="FGStoreToCustomer" stroke="#ea580c" strokeWidth={3}
                name="FG Store → Customer" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Abnormal Summary */}
      <div className="mt-10 pl-10 pr-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold rounded-full bg-white text-gray-800 mb-4 p-4 outline justify-center text-center"
        >
          🚚 Trolley Abnormal Movement
        </motion.div>


        {/* Summary */}
        <div className="flex justify-center gap-10 mt-4">
          <div className="flex items-center gap-3">
            <span className="font-medium bg-blue-100 text-black px-4 py-1 rounded-md">Duplicate Movement</span>
            <span className="px-6 py-1 bg-blue-800 text-white rounded-md font-semibold">
              {abnormalSummary.duplicate}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium bg-blue-100 text-black px-4 py-1 rounded-md">Wrong Movement</span>
            <span className="px-6 py-1 bg-blue-800 text-white rounded-md font-semibold">
              {abnormalSummary.wrong}
            </span>
          </div>
        </div>

        {/* TABLE */}
    {/* TABLE */}
<div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
  <div className="grid grid-cols-3 bg-blue-100 text-black font-bold p-3">
    <span>Source</span>
    <span>Destination</span>
    <span>Movement Count</span>
  </div>

  {todayAbnormalMovements.length === 0 ? (
    <div className="p-4 text-center text-gray-500">
      No abnormal movement today
    </div>
  ) : (
    todayAbnormalMovements.map((row, index) => (
      <motion.div
        key={index}
        whileHover={{ backgroundColor: "#f1f5f9" }}
        className="grid grid-cols-3 items-center p-3 border-b text-sm"
      >
        <span className="text-black font-semibold">
          {row.Source}
        </span>

        <span className="text-black font-semibold">
          {row.Destination}
        </span>

        <ProgressBar value={row.MovementCount} />
      </motion.div>
    ))
  )}
</div>

      </div>
      {/* Location Wise Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 pl-10 pr-4 mb-10 ">
        <VerticalBarCard
          title="Duplicate Movement – Location Wise"
          data={duplicateLocation}
          barColor="#5587f4ff"
        />

        <VerticalBarCard
          title="Wrong Movement – Location Wise"
          data={wrongLocation}
          barColor="#051389ff"
        />
      </div>

    </DashboardLayout>
  );
};

export default Home;
