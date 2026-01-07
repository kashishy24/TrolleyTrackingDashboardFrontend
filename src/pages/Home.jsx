import React from "react";
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

/* ------------------ STAT CARD ------------------ */
const StatCard = ({ title, items, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-xl transition text-black"
  >
    <div className="flex items-center gap-2 mb-3 justify-center align-center">
      <Icon className="text-blue-600 text-xl" />
      <h3 className="text-sm font-semibold text-black-700 text-center  dark:text-gray-200">
        {title}
      </h3>
    </div>

    <div className="space-y-2 text-sm">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between bg-blue-50 dark:bg-gray-700 px-3 py-1 rounded"
        >
          <span className="text-black-600 dark:text-black-300">
            {item.label}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {item.value}
          </span>
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
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-black  text-center hover:shadow-xl"
  >
    <h3 className="text-sm font-semibold mb-3 text-black-700 dark:text-black-200 font-weight-bold">
      {title}
    </h3>

    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name"  tick={{ fill: "#000", fontWeight: 300 }} />
          <YAxis  tick={{ fill: "#000", fontWeight: 300 }}/>
          <Tooltip />
          <Bar
            dataKey="value"
            fill={barColor}
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

/* ------------------ DATA ------------------ */
const trolleyBreakdownData = [
  { name: "Empty", value: 1000 },
  { name: "FG", value: 700 },
  { name: "Shopfloor", value: 300 },
  { name: "Transit", value: 900 },
  { name: "Breakdown", value: 94 },
];

const trolleyStatusData = [
  { name: "OK", value: 2900 },
  { name: "Breakdown", value: 25 },
  { name: "PM", value: 25 },
  { name: "Scrap", value: 50 },
];

const pmStatusData = [
  { name: "Normal", value: 900 },
  { name: "Alert", value: 900 },
  { name: "Warning", value: 900 },
  { name: "Alarm", value: 900 },
  { name: "Execution", value: 900 },
  { name: "Completed", value: 900 },
];

/* 🔥 NEW: Hourly Movement Trend */
const trolleyMovementHourly = [
  { hour: "08:00", customerToStore: 10, storeToProduction: 15, productionToFGStore: 20, FGStoreToCustomer: 25 },
  { hour: "09:00", customerToStore: 18, storeToProduction: 22, productionToFGStore: 25, FGStoreToCustomer: 30 },
  { hour: "10:00", customerToStore: 14, storeToProduction: 26, productionToFGStore: 30, FGStoreToCustomer: 35 },
  { hour: "11:00", customerToStore: 20, storeToProduction: 30, productionToFGStore: 35, FGStoreToCustomer: 40 },
  { hour: "12:00", customerToStore: 16, storeToProduction: 28, productionToFGStore: 25, FGStoreToCustomer: 31 },
  { hour: "13:00", customerToStore: 22, storeToProduction: 35, productionToFGStore: 40, FGStoreToCustomer: 45 },
];

const abnormalMovementSummary = {
  duplicate: 23,
  wrong: 12,
};

const abnormalMovementTable = [
  { source: "Production", destination: "Empty", value: 2 },
  { source: "FG Store", destination: "Production", value: 5 },
  { source: "Customer", destination: "FG Store", value: 3 },
];

const duplicateLocationWise = [
  { location: "Empty", value: 8 },
  { location: "Production", value: 6 },
  { location: "FG Store", value: 5 },
  { location: "Customer", value: 4 },
];

const wrongLocationWise = [
  { location: "Empty", value: 3 },
  { location: "Production", value: 4 },
  { location: "FG Store", value: 2 },
  { location: "Customer", value: 3 },
];
const ProgressBar = ({ value, max = 10 }) => {
  const width = `${(value / max) * 100}%`;

  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width }}
        transition={{ duration: 0.8 }}
        className="h-6 bg-blue-600 text-white text-xs flex items-center justify-end pr-2 rounded-full"
      >
        {value}
      </motion.div>
    </div>
  );
};
const duplicateLocationChart = duplicateLocationWise.map(item => ({
  name: item.location,
  value: item.value,
}));

const wrongLocationChart = wrongLocationWise.map(item => ({
  name: item.location,
  value: item.value,
}));
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
          <XAxis dataKey="name"  tick={{ fill: "#000", fontWeight: 300 }}/>
          <YAxis allowDecimals={false}  tick={{ fill: "#000", fontWeight: 300 }} />
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




/* ------------------ HOME ------------------ */
const Home = () => {
  return (
    <DashboardLayout>
      {/* TOP STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mr-4 pl-10 font-bold text-black">
        <StatCard
          title="By Location"
          icon={MdLocalShipping}
          items={[
            { label: "Total Trolleys", value: 3000 },
            { label: "Empty", value: 1000 },
            { label: "FG Store", value: 700 },
            { label: "Shopfloor", value: 300 },
            { label: "In Transit", value: 900 },
            { label: "Breakdown", value: 94 },
            { label: "Under PM", value: 6 },
            { label: "Scrap", value: 0 },
          ]}
           className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl text-black"
        />

        <StatCard
          title="By Trolley Status"
          icon={MdCheckCircle}
          items={[
            { label: "OK Trolleys", value: 2900 },
            { label: "Breakdown", value: 25 },
            { label: "PM", value: 25 },
            { label: "Scrap", value: 50 },
          ]}
        />

        <StatCard
          title="By PM Status"
          icon={MdBuild}
          items={[
            { label: "Normal", value: 900 },
            { label: "Alert", value: 900 },
            { label: "Warning", value: 900 },
            { label: "Alarm", value: 900 },
            { label: "Execution", value: 900 },
            { label: "Completed", value: 900 },
          ]}
        />

        <StatCard
          title="Trolley Breakdown"
          icon={MdWarning}
          className="text-black text-bold text-center"
          items={[
            { label: "Total Breakdown", value: 15 },
            { label: "Under Maintenance", value: 10 },
            { label: "Repaired Today", value: 5 },
            { label: "Scrapped Today", value: 5 },
          ]}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 pl-10 pr-4">
        <ChartCard
          title="Trolley Location"
          data={trolleyBreakdownData}
          barColor="#4466efff"
        />

        <ChartCard
          title="Trolley Status"
          data={trolleyStatusData}
          barColor="#0f0780ff"
        />

        <ChartCard
          title="Trolley Breakdown"
          data={trolleyBreakdownData}
          barColor="#0f0780ff"
        />

        <ChartCard
          title="PM Status"
          data={pmStatusData}
          barColor="#4466efff"
        />
      </div>

      {/* ------------------ MOVEMENT + HOURLY TREND ------------------ */}
      <div className="mt-8 pl-10 pr-4 mb-8">
        <h2 className="text-lg font-semibold rounded-full bg-white text-gray-800 mb-4 p-4 justify-center text-center">
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
      <p className="text-2xl font-semibold text-gray-800">2900</p>
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
      <p className="text-2xl font-semibold text-gray-800">2900</p>
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
      <p className="text-2xl font-semibold text-gray-800">2900</p>
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
      <p className="text-m text-black">FG Store → IN Transt</p>
      <p className="text-2xl font-semibold text-gray-800">2</p>
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

          <ResponsiveContainer width="100%" height={280}>
           <LineChart
    data={trolleyMovementHourly}
    margin={{ top: 5, right: 20, left: 10, bottom: 5 }} // tighten spacing
  >
              <CartesianGrid strokeDasharray="3 3" />
             <XAxis
  dataKey="hour"
  interval={0} // ensures all labels show and are evenly spaced
  padding={{ left: 10, right: 10 }} // reduce extra padding
   tick={{ fill: "#000", fontWeight: 300 }}
/>
<YAxis
  domain={['dataMin - 5', 'dataMax + 5']} // optional, tighten Y-axis
   tick={{ fill: "#000", fontWeight: 300 }}
/>
Also, for 
              <Tooltip />
              <Line
                type="monotone"
                dataKey="customerToStore"
                stroke="#2563eb"
                strokeWidth={3}
                name="Customer → Store"
              />
              <Line
                type="monotone"
                dataKey="storeToProduction"
                stroke="#e39ed8ff"
                strokeWidth={3}
                name="Store → Production"
              />
              <Line
                type="monotone"
                dataKey="productionToFGStore"
                stroke="#1f4158ff"
                strokeWidth={3}
                name="Production → FG Store"
              />
              <Line
                type="monotone"
                dataKey="FGStoreToCustomer"
                stroke="#cd941aff"
                strokeWidth={3}
                name="FG Store → Customer"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

{/* ------------------ TROLLEY ABNORMAL MOVEMENT ------------------ */}

<div className="mt-10 pl-10 pr-4">
  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-lg font-semibold rounded-full bg-white text-gray-800 mb-4 p-4 justify-center text-center"
  >
   🚚 Trolley Abnormal Movement
  </motion.div>

  {/* Summary */}
  <div className="flex justify-center gap-10 mt-4">
    <div className="flex items-center gap-3">
      <span className="font-medium bg-blue-100 text-black px-4 py-1 rounded-md">Duplicate Movement</span>
      <span className="px-6 py-1 bg-blue-800 text-white rounded-md font-semibold">
        {abnormalMovementSummary.duplicate}
      </span>
    </div>

    <div className="flex items-center gap-3">
      <span className="font-medium bg-blue-100 text-black px-4 py-1 rounded-md">Wrong Movement</span>
      <span className="px-6 py-1 bg-blue-800 text-white rounded-md font-semibold">
        {abnormalMovementSummary.wrong}
      </span>
    </div>
  </div>

  {/* TABLE */}
  <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
    <div className="grid grid-cols-3 bg-blue-100 text-black font-bold p-3">
      <span>Source</span>
      <span>Destination</span>
      <span>Movement Count</span>
    </div>

    {abnormalMovementTable.map((row, index) => (
      <motion.div
        key={index}
        whileHover={{ backgroundColor: "#f1f5f9" }}
        className="grid grid-cols-3 items-center p-3 border-b text-sm"
      >
        <span className="text-black font-semibold">{row.source}</span>
        <span className="text-black font-semibold">{row.destination}</span>
        <ProgressBar value={row.value} />
      </motion.div>
    ))}
  </div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 pl-10 pr-4 mb-10 ">
  <VerticalBarCard
    title="Duplicate Movement – Location Wise"
    data={duplicateLocationChart}
    barColor="#5587f4ff"
  />

  <VerticalBarCard
    title="Wrong Movement – Location Wise"
    data={wrongLocationChart}
    barColor="#051389ff"
  />
</div>

    </DashboardLayout>
  );
};

export default Home;
