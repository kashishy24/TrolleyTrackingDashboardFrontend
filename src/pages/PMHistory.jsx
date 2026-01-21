import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
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

/* ---------------- DUMMY TABLE DATA (UNCHANGED) ---------------- */
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
];

/* ============================================================= */

const PMHistory = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trolleyId, setTrolleyId] = useState("");
  /* ---------- TREND STATE ---------- */
  const [trendData, setTrendData] = useState([]);
  const [loadingTrend, setLoadingTrend] = useState(false);
  /* ---------- Table STATE ---------- */
  const [tableData, setTableData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);


  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  /* ---------- KPI STATE ---------- */
  const [kpiData, setKpiData] = useState({
    avg: 0,
    max: 0,
    min: 0,
    total: 0,
    onTime: 0,
    delayed: 0,
  });



  /* ================= KPI API ================= */
  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchPMCards = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/PMHistory/dashboard/pm-cards`,
          { StartDate: startDate, EndDate: endDate }
        );

        if (res.data.success) {
          const d = res.data.data;
          setKpiData({
            avg: d.AvgTimePM,
            max: d.MaxTimePM,
            min: d.MinTimePM,
            total: d.TotalPM,
            onTime: d.OnTimePM,
            delayed: d.DelayedPM,
          });
        }
      } catch (err) {
        console.error("PM Cards Error:", err);
      }
    };

    fetchPMCards();
  }, [startDate, endDate]);

  /* ================= TREND API ================= */
  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchTrend = async () => {
      setLoadingTrend(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/PMHistory/dashboard/pm-plan-actual`,
          { StartDate: startDate, EndDate: endDate }
        );

        if (res.data.success) {
          const formatted = res.data.data.map((d) => ({
            day: d.Day,
            plan: d.Plan,
            actual: d.Actual,
          }));

          setTrendData(formatted);
        }
      } catch (err) {
        console.error("PM Trend Error:", err);
      } finally {
        setLoadingTrend(false);
      }
    };

    fetchTrend();
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchHistoryTable = async () => {
      setLoadingTable(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/PMHistory/dashboard/pm-history-table`,
          {
            StartDate: startDate,
            EndDate: endDate,
            TrolleyID: trolleyId || null,
          }
        );

        if (res.data.success) {
          setTableData(res.data.data);
        }
      } catch (err) {
        console.error("PM History Table Error:", err);
      } finally {
        setLoadingTable(false);
      }
    };

    fetchHistoryTable();
  }, [startDate, endDate, trolleyId]);


  /* ================= FILTER TABLE ================= */
  const filteredData = useMemo(() => {
    return rawData.filter((row) => {
      const rowDate = new Date(row.date);
      return (
        (!startDate || rowDate >= new Date(startDate)) &&
        (!endDate || rowDate <= new Date(endDate)) &&
        (!trolleyId ||
          row.trolleyId.toLowerCase().includes(trolleyId.toLowerCase()))
      );
    });
  }, [startDate, endDate, trolleyId]);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* ================= DATE FILTER ================= */}
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-md border w-full">
            <h2 className="font-bold text-black p-4 flex-grow">
              Preventive Maintenance History Summary
            </h2>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-3 py-1 text-black"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-3 py-1 text-black"
            />
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 text-black">
          {[
            { label: "Avg Time of PM", value: `${kpiData.avg} min` },
            { label: "Max Time of PM", value: `${kpiData.max} min` },
            { label: "Min Time of PM", value: `${kpiData.min} min` },
            { label: "Total PM", value: kpiData.total },
            { label: "On Time PM", value: kpiData.onTime },
            { label: "Delayed PM", value: kpiData.delayed },
          ].map((item, i) => (
            <div key={i} className="bg-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ================= TREND CHART ================= */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-center mb-2 text-black">
            Preventive Maintenance Plan vs Actual
          </h3>

          {loadingTrend ? (
            <p className="text-center text-gray-500">Loading trend...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="plan" stroke="#1e40af" />
                <Line type="monotone" dataKey="actual" stroke="#f97316" />
              </LineChart>
            </ResponsiveContainer>
          )}
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
        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">Trolley ID</th>
                <th className="p-2">Checklist</th>
                <th className="p-2">PM Number</th>
                <th className="p-2">Start Time</th>
                <th className="p-2">End Time</th>
                <th className="p-2">Executed By</th>

                <th className="p-2">Remark</th>


              </tr>
            </thead>
            <tbody>
              {loadingTable ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : tableData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                tableData.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100 text-black text-center">
                    <td className="p-2">{row.TrolleyID}</td>
                    <td className="p-2">{row.CheckListName}</td>
                    <td className="p-2">{row.Instance}</td>
                    <td className="p-2">{row.StartTime}</td>
                    <td className="p-2">{row.PMDate}</td>

                    <td className="p-2">{row.ExecutedBy}</td>
                    <td className="p-2">{row.Remark}</td>
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
