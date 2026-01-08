import React, { useState } from "react";
import DashboardLayout from "../partials/DashboardLayout";

/* --------- DUMMY DATA --------- */
const tableData = [
  {
    trolleyId: "TR-101",
    pmStatus: "Completed",
    locationStatus: "OK",
    movementStatus: "Duplicate",
    trolleyStatus: "OK",
    materialStatus: "Loaded",
    timestamp: "2025-01-08 10:30",
    userId: "USR-01",
  },
  {
    trolleyId: "TR-102",
    pmStatus: "Pending",
    locationStatus: "Wrong",
    movementStatus: "Error",
    trolleyStatus: "Maintenance",
    materialStatus: "Missing",
    timestamp: "2025-01-09 11:15",
    userId: "USR-02",
  },
  {
    trolleyId: "TR-103",
    pmStatus: "Pending",
    locationStatus: "Wrong",
    movementStatus: "Error",
    trolleyStatus: "Maintenance",
    materialStatus: "Missing",
    timestamp: "2025-01-09 11:15",
    userId: "USR-02",
  },
  {
    trolleyId: "TR-104",
    pmStatus: "Pending",
    locationStatus: "Wrong",
    movementStatus: "Error",
    trolleyStatus: "Maintenance",
    materialStatus: "Missing",
    timestamp: "2025-01-09 11:15",
    userId: "USR-02",
  },
  {
    trolleyId: "TR-105",
    pmStatus: "Pending",
    locationStatus: "Wrong",
    movementStatus: "Error",
    trolleyStatus: "Maintenance",
    materialStatus: "Missing",
    timestamp: "2025-01-09 11:15",
    userId: "USR-02",
  },
];

/* --------- STATUS BADGE --------- */
const StatusBadge = ({ value }) => {
  const colorMap = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Duplicate: "bg-orange-100 text-orange-700",
    Error: "bg-red-100 text-red-700",
    OK: "bg-green-100 text-green-700",
    Wrong: "bg-red-100 text-red-700",
    OK: "bg-blue-100 text-blue-700",
    Maintenance: "bg-gray-200 text-gray-700",
    Loaded: "bg-indigo-100 text-indigo-700",
    Missing: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        colorMap[value] || "bg-gray-100 text-gray-600"
      }`}
    >
      {value}
    </span>
  );
};

const TrolleyHistory = () => {
  const [trolley, setTrolley] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fadeIn">
        {/* ---------- FILTER SECTION ---------- */}
        <div className="flex flex-wrap justify-between gap-4 bg-white p-4 rounded-xl shadow-md">
          <div className="flex flex-row gap-4">
    <label className="text-m font-bold whitespace-nowrap text-black py-2">Trolley ID</label>
          <input
            type="text"
            placeholder="Trolley Number"
            value={trolley}
            onChange={(e) => setTrolley(e.target.value)}
            className="border rounded-lg px-4 py-2 w-56 focus:ring-2 focus:ring-blue-400"
          />
          </div>

          <div className="flex gap-3">
            <label className="text-sm font-semibold whitespace-nowrap text-black py-2"> Start Date </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
                     <label className="text-sm font-semibold whitespace-nowrap text-black py-2"> End Date </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* ---------- TABLE CARD ---------- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 font-semibold text-lg">
            Trolley History Table 
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  {[
                    "Trolley ID",
                    "PM Status",
                    "Location Status",
                    "Movement Status",
                    "Trolley Status",
                    "Material Status",
                    "Timestamp",
                    "User ID",
                  ].map((h) => (
                    <th key={h} className="p-3 text-center whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-blue-50 transition-all duration-200 text-black"
                  >
                    <td className="p-2 text-center font-semibold ">
                      {row.trolleyId}
                    </td>
                    <td className="p-2 text-center">
                      <StatusBadge value={row.pmStatus} />
                    </td>
                    <td className="p-2 text-center">
                      <StatusBadge value={row.locationStatus} />
                    </td>
                    <td className="p-2 text-center">
                      <StatusBadge value={row.movementStatus} />
                    </td>
                    <td className="p-2 text-center">
                      <StatusBadge value={row.trolleyStatus} />
                    </td>
                    <td className="p-2 text-center">
                      <StatusBadge value={row.materialStatus} />
                    </td>
                    <td className="p-2 text-center">{row.timestamp}</td>
                    <td className="p-2 text-center">{row.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------- SIMPLE FADE ANIMATION ---------- */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </DashboardLayout>
  );
};

export default TrolleyHistory;
