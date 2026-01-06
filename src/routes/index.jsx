import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute.jsx";

// pages
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Error from "../pages/Error.jsx";
import TrolleyHistory from "../pages/TrolleyHistory.jsx";
import TrolleyBreakdown from "../pages/TrolleyBreakdown.jsx";
import PMStatus from "../pages/PMStatus.jsx";
import PMHistory from "../pages/PMHistory.jsx";
import TrolleyExceptionReport from "../pages/TrolleyExceptionReport.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/TrolleyHistory"
        element={
          <PrivateRoute>
            <TrolleyHistory />
          </PrivateRoute>
        }
      />

      <Route
        path="/TrolleyBreakdown"
        element={
          <PrivateRoute>
            <TrolleyBreakdown />
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
        path="/PMHistory"
        element={
          <PrivateRoute>
            <PMHistory />
          </PrivateRoute>
        }
      />

      <Route
        path="/TrolleyExceptionReport"
        element={
          <PrivateRoute>
            <TrolleyExceptionReport />
          </PrivateRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
