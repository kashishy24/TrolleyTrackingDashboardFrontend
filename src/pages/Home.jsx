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
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-xl transition"
  >
    <div className="flex items-center gap-2 mb-3">
      <Icon className="text-blue-600 text-xl" />
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>
    </div>

    <div className="space-y-2 text-sm">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
        >
          <span className="text-gray-600 dark:text-gray-300">
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
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
  >
    <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
      {title}
    </h3>

    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis />
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
  { hour: "08:00", customerToStore: 10, storeToProduction: 15, productionToFGStore: 20, FGStoreToInTransit: 25 },
  { hour: "09:00", customerToStore: 18, storeToProduction: 22, productionToFGStore: 25, FGStoreToInTransit: 30 },
  { hour: "10:00", customerToStore: 14, storeToProduction: 26, productionToFGStore: 30, FGStoreToInTransit: 35 },
  { hour: "11:00", customerToStore: 20, storeToProduction: 30, productionToFGStore: 35, FGStoreToInTransit: 40 },
  { hour: "12:00", customerToStore: 16, storeToProduction: 28, productionToFGStore: 25, FGStoreToInTransit: 31 },
  { hour: "13:00", customerToStore: 22, storeToProduction: 35, productionToFGStore: 40, FGStoreToInTransit: 45 },
];
const trolleyAbnormalMovement = [
  { label: "Duplicate Movement", value: 85 },
  { label: "Scanner Source Destination", value: 78 },
  { label: "Scanner Source Destination", value: 55 },
];


/* ------------------ HOME ------------------ */
const Home = () => {
  return (
    <DashboardLayout>
      {/* TOP STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mr-4 pl-10">
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
          barColor="#ef4444"
        />

        <ChartCard
          title="Trolley Status"
          data={trolleyStatusData}
          barColor="#22c55e"
        />

        <ChartCard
          title="Trolley Breakdown"
          data={trolleyBreakdownData}
          barColor="#ef4444"
        />

        <ChartCard
          title="PM Status"
          data={pmStatusData}
          barColor="#3b82f6"
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
    className="flex bg-white rounded-xl shadow-md p-4"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
      🚚
    </div>
    <div>
      <p className="text-xs text-gray-500">Customer → Empty Store</p>
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
      <p className="text-xs text-gray-500">Empty Store → Production</p>
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
      <p className="text-xs text-gray-500">Production → FG Store</p>
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
      <p className="text-xs text-gray-500">FG Store → IN Transt</p>
      <p className="text-2xl font-semibold text-gray-800">2900</p>
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
          <h3 className="text-md font-semibold text-gray-700 mb-4">
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
/>
<YAxis
  domain={['dataMin - 5', 'dataMax + 5']} // optional, tighten Y-axis
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
                stroke="#16a34a"
                strokeWidth={3}
                name="Store → Production"
              />
              <Line
                type="monotone"
                dataKey="productionToFGStore"
                stroke="#a3165fff"
                strokeWidth={3}
                name="Production → FG Store"
              />
              <Line
                type="monotone"
                dataKey="FGStoreToInTransit"
                stroke="#cd941aff"
                strokeWidth={3}
                name="FG Store → In Transit"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

{/* ------------------ TROLLEY ABNORMAL MOVEMENT ------------------ */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="bg-white rounded-xl shadow-md p-5 mt-8 mb-4 pl-6 pr-6 ml-6 mr-6" 
>
  {/* Header */}
  <div className="w-full bg-blue-600 text-white text-center font-semibold py-2 rounded-md mb-4">
    Trolley Abnormal Movement
  </div>

  {/* List */}
  <div className="divide-y divide-gray-200">
    {trolleyAbnormalMovement.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        className="flex items-center justify-between py-3 px-2 cursor-pointer pl-4 pr-4"
      >
        {/* Label */}
        <span className="text-sm text-gray-700">
          {item.label}
        </span>

        {/* Right Badge */}
        <span className="min-w-[500px] text-center px-3 py-1 rounded-full 
                         bg-blue-100 text-blue-700 text-sm font-semibold">
          {item.value}
        </span>
      </motion.div>
    ))}
  </div>
</motion.div>




    </DashboardLayout>
  );
};

export default Home;
