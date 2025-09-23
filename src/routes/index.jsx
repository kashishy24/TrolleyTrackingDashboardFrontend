import { Routes, Route} from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute.jsx";

// pages
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Alarms from "../pages/Alarms.jsx";
import Cycletime from "../pages/Cycletime.jsx";
import Downtime from "../pages/Downtime.jsx"
import Performance from "../pages/performance/Performance.jsx";
import Parameters from "../pages/Parameters.jsx";
import Quality from "../pages/Quality.jsx";
import Mould from "../pages/Mould.jsx";
import MouldMaint from "../pages/MouldMaint.jsx";
import Error from "../pages/Error.jsx";

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
        path="/performance"
        element={
          <PrivateRoute>
            <Performance />
          </PrivateRoute>
        }
      />

      <Route
        path="/alarms"
        element={
          <PrivateRoute>
            <Alarms />
          </PrivateRoute>
        }
      />

      <Route
        path="/cycletime"
        element={
          <PrivateRoute>
            <Cycletime />
          </PrivateRoute>
        }
      />

      <Route
        path="/downtime"
        element={
          <PrivateRoute>
            <Downtime />
          </PrivateRoute>
        }
      />

      <Route
        path="/parameters"
        element={
          <PrivateRoute>
            <Parameters />
          </PrivateRoute>
        }
      />

      <Route
        path="/quality"
        element={
          <PrivateRoute>
            <Quality />
          </PrivateRoute>
        }
      />

      <Route
        path="/mould"
        element={
          <PrivateRoute>
            <Mould />
          </PrivateRoute>
        }
      />

      <Route
        path="/mould-maint"
        element={
          <PrivateRoute>
            <MouldMaint />
          </PrivateRoute>
        }
      />

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
