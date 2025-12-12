import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Shared/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Offers from "./pages/Offers.jsx";
import Sales from "./pages/Sales.jsx";
import Settings from "./pages/Settings.jsx";
import Geo from "./pages/Geo.jsx";
import Insights from "./pages/Insights.jsx";
import GenAI from "./pages/GenAI.jsx";
import GenAIChatPage from "./pages/GenAIChatPage.jsx";


export default function App () {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offers"      element={<Offers />} />
          <Route path="/sales"     element={<Sales />} />
          <Route path="/settings"  element={<Settings />} />
          <Route path="/geo"  element={<Geo />} />
          <Route path="/genai"  element={<GenAI />} />
          <Route path="/insights"  element={<Insights />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/genai-chat"  element={<GenAIChatPage />} />
        </Route>
      </Routes>
  )
}