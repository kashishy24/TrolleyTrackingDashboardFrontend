import React, { useMemo, useState } from "react";
import DashboardLayout from "../partials/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ---------------- DUMMY TABLE DATA ---------------- */
const rawData = [
  {
    trolleyId: "TR-101",
    CheckListName: "Trolley Wheels",
    StartTime: "10:00 AM",
    Instance: "Wrong",
    Remark: "test1",
    ExecutedBy: "chelsy",
    date: "2025-01-05",
  },
  {
    trolleyId: "TR-102",
    CheckListName: "Trolley Wheels",
    StartTime: "11:30 AM",
    Instance: "Wrong",
    Remark: "test2",
    ExecutedBy: "chelsy",
    date: "2025-01-08",
  },
  {
    trolleyId: "TR-103",
    CheckListName: "Brake Check",
    StartTime: "09:00 AM",
    Instance: "Delayed",
    Remark: "test3",
    ExecutedBy: "chelsy",
    date: "2025-01-10",
  },
];

/* ---------------- CHART DATA ---------------- */
const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  plan: 10,
  actual: Math.floor(Math.random() * 4) + 7,
}));

/* ---------------- KPI DATA ---------------- */
const kpiData = {
  avg: 9,
  max: 10,
  min: 7,
  total: 48,
  onTime: 42,
  delayed: 6,
};

const PMHistory = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trolleyId, setTrolleyId] = useState("");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredData = useMemo(() => {
    return rawData.filter((row) => {
      const rowDate = new Date(row.date);

      const afterStart =
        !startDate || rowDate >= new Date(startDate);
      const beforeEnd =
        !endDate || rowDate <= new Date(endDate);

      const trolleyMatch =
        !trolleyId ||
        row.trolleyId.toLowerCase().includes(trolleyId.toLowerCase());

      return afterStart && beforeEnd && trolleyMatch;
    });
  }, [startDate, endDate, trolleyId]);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* ---------- DATE FILTER ---------- */}
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-4  bg-white p-2 rounded-xl shadow-md border justify-end w-full">
            <h2 className="font-bold text-black p-4 flex-grow"> Preventive Maintenance History Summary </h2>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
              <label className="text-sm font-semibold whitespace-nowrap text-black">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="outline-none text-sm bg-transparent text-black"
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
              <label className="text-sm font-semibold whitespace-nowrap text-black">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="outline-none text-sm bg-transparent text-black"
              />
            </div>
          </div>
        </div>

        {/* ---------- KPI CARDS ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 text-black">
          {[
            { label: "Avg Time of PM", value: `${kpiData.avg} min` },
            { label: "Max Time of PM", value: `${kpiData.max} min` },
            { label: "Min Time of PM", value: `${kpiData.min} min` },
            { label: "Total PM", value: kpiData.total },
            { label: "On Time PM", value: kpiData.onTime },
            { label: "Delayed PM", value: kpiData.delayed },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-blue-200 rounded-xl p-4 text-center shadow-md text-black"
            >
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ---------- LINE CHART ---------- */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-center mb-2 text-black">
            Preventive Maintenance Trend (Day Wise)
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: "#000", fontWeight: 300 }} />
              <YAxis  tick={{ fill: "#000", fontWeight: 300 }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="plan" stroke="#1e40af" />
              <Line type="monotone" dataKey="actual" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ---------- TROLLEY FILTER ---------- */}
        <div className="flex justify-end p-2 bg-white rounded-xl shadow-md w-full">
              <h2 className="font-bold text-black p-4 flex-grow"> Preventive Maintenance Checklist History Table  </h2>
          <h1 className="mr-4 self-center text-black font-semibold bg-white p-2 pl-10 pr-10 rounded-lg border outline">Trolley ID -:</h1>
          <input
            type="text"
            placeholder="Enter Trolley ID"
            value={trolleyId}
            onChange={(e) => setTrolleyId(e.target.value)}
            className="border rounded-lg px-4 py-2 w-64 shadow-md text-black"
          />
        </div>

        {/* ---------- HISTORY TABLE ---------- */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Trolley ID</th>
                <th className="p-2">Checklist</th>
                <th className="p-2">Start Time</th>
                <th className="p-2">Instance</th>
                <th className="p-2">Remark</th>
                <th className="p-2">Executed By</th>
                <th className="p-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100 text-black">
                    <td className="p-2 text-center">{row.trolleyId}</td>
                    <td className="p-2 text-center">{row.CheckListName}</td>
                    <td className="p-2 text-center">{row.StartTime}</td>
                    <td className="p-2 text-center">{row.Instance}</td>
                    <td className="p-2 text-center">{row.Remark}</td>
                    <td className="p-2 text-center">{row.ExecutedBy}</td>
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

export default PMHistory;
