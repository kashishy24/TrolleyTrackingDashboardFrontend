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
      <h3 className="text-sm font-semibold text-black-700 dark:text-gray-200">
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
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill={barColor}
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

/* ------------------ DUMMY DATA ------------------ */
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

/* ------------------ HOME SCREEN ------------------ */
const Home = () => {
  return (
    <DashboardLayout>
      {/* ------------------ TOP STATS ------------------ */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 mr-4 pl-10">
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

      {/* ------------------ CHARTS ------------------ */}
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

      {/* ------------------ MOVEMENT ------------------ */}
      <div className="mt-8 pl-10 pr-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Trolley Movement
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white rounded-xl p-6 shadow-md"
          >
            <p className="text-sm opacity-80">Customer to Empty Store</p>
            <h3 className="text-3xl font-bold mt-2">—</h3>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-600 text-white rounded-xl p-6 shadow-md"
          >
            <p className="text-sm opacity-80">Empty Store to Production</p>
            <h3 className="text-3xl font-bold mt-2">2900</h3>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
