import { Routes, Route} from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute.jsx";

// pages
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Error from "../pages/Error.jsx";
import MouldMaintenanceHistory from "../pages/MouldMaintenanceHistory/MouldMaintanceHistory.jsx";
import PMStatus from "../pages/PMStatus.jsx";
import HCStatus from "../pages/HCStatus.jsx";
import SparePart from "../pages/SparePart.jsx";
import MouldSummary from "../pages/MouldSummary.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default route → open Login first */}
      <Route path="/" element={<Login />} />

      {/* After login, each route should be protected */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/MouldMaintenanceHistory"
        element={
          <PrivateRoute>
            <MouldMaintenanceHistory />
          </PrivateRoute>
        }
      />

      <Route
        path="/PMStatus"
        element={
          <PrivateRoute>
            <PMStatus />
          </PrivateRoute>
        }
      />

      <Route
        path="/HCStatus"
        element={
          <PrivateRoute>
            <HCStatus />
          </PrivateRoute>
        }
      />

      <Route
        path="/SparePart"
        element={
          <PrivateRoute>
            <SparePart />
          </PrivateRoute>
        }
      />

      <Route
        path="/MouldSummary"
        element={
          <PrivateRoute>
            <MouldSummary />
          </PrivateRoute>
        }
      />

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
