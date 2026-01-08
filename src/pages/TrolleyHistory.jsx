import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "../partials/DashboardLayout";
/* --------- DUMMY DATA --------- */
const STATUS_COLORS = {
  PM_STATUS: {
    Normal: "bg-green-100 text-green-700",
    Alert: "bg-yellow-100 text-yellow-700",
    Warning: "bg-orange-100 text-orange-700",
    Alarm: "bg-red-100 text-red-700",
  },

  MOVEMENT_STATUS: {
    OK: "bg-green-100 text-green-700",
    NOK: "bg-red-100 text-red-700",
    Duplicate: "bg-orange-100 text-orange-700",
  },

  TROLLEY_STATUS: {
    OK: "bg-green-100 text-green-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
    PM: "bg-blue-100 text-blue-700",
    Scrap: "bg-red-100 text-red-700",
    Execution: "bg-indigo-100 text-indigo-700",
  },

  MATERIAL_STATUS: {
    Empty: "bg-gray-100 text-gray-700",
    Loaded: "bg-green-100 text-green-700",
    Hold: "bg-yellow-100 text-yellow-700",
    PartialLoaded: "bg-orange-100 text-orange-700",
  },

  LOCATION_STATUS: {
    Empty: "bg-gray-100 text-gray-700",
    Production: "bg-blue-100 text-blue-700",
    FGStore: "bg-indigo-100 text-indigo-700",
    Customer: "bg-green-100 text-green-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
  },

  GATE_STATUS: {
    TrolleyIn: "bg-green-100 text-green-700",
    TrolleyOut: "bg-red-100 text-red-700",
    Production: "bg-blue-100 text-blue-700",
    FGStore: "bg-indigo-100 text-indigo-700",
     Maintenance: "bg-yellow-100 text-yellow-700",
     TrolleyOut: "bg-green-100 text-green-700",
     TrolleyOut: "bg-green-100 text-green-700",
  },

  MOVEMENT_TYPE: {
    RFID: "bg-purple-100 text-purple-700",
    MobileDevice: "bg-cyan-100 text-cyan-700",
  },
};
/* --------- STATUS BADGE --------- */
const StatusBadge = ({ value, type }) => {
  const color =
    STATUS_COLORS[type]?.[value] ||
    "bg-gray-100 text-gray-600";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {value}
    </span>
  );
};
const TrolleyHistory = () => {
  const [trolley, setTrolley] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
const [loading, setLoading] = useState(false)
const BASE = (import.meta.env.VITE_BACKEND_BASE_URL || "").replace(/\/+$/, "");

const fetchTrolleyHistory = async () => {
  if (!trolley || !startDate || !endDate) {
    alert("Please select Trolley ID, Start Date and End Date");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      `${BASE}/TrolleyHistory/TrolleyHistory`,
      {
        trolleyId: trolley,
        startDate,
        endDate,
      }
    );

    setData(response.data.data || []);
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to fetch data");
  } finally {
    setLoading(false);
  }
};

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
             <button
  onClick={fetchTrolleyHistory}
  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
>
  Search
</button>
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
                    "Gate Status",
                    "MovementType",
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
               {data.map((row, i) => (
                  <tr
  key={i}
  className="border-b hover:bg-blue-50 transition-all duration-200 text-black font-weight-bold text-m "
>
   <td className="p-2 text-center">{row.TrolleyID}</td>
 <td className="p-2 text-center">
  <StatusBadge value={row.PMStatusDesc} type="PM_STATUS" />
</td>

<td className="p-2 text-center">
  <StatusBadge value={row.LocationStatusDesc} type="LOCATION_STATUS" />
</td>

<td className="p-2 text-center">
  <StatusBadge value={row.MovementStatusDesc} type="MOVEMENT_STATUS" />
</td>

<td className="p-2 text-center">
  <StatusBadge value={row.TrolleyStatusDesc} type="TROLLEY_STATUS" />
</td>

<td className="p-2 text-center">
  <StatusBadge value={row.MaterialStatusDesc} type="MATERIAL_STATUS" />
</td>

<td className="p-2 text-center">
  <StatusBadge value={row.GateStatusDesc} type="GATE_STATUS" />
</td>

<td className="p-2 text-center">
  <StatusBadge value={row.MovementTypeDesc} type="MOVEMENT_TYPE" />
</td>
 <td className="p-2 text-center">{row.Timestamp}</td>
                    <td className="p-2 text-center">{row.UserID}</td>
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
