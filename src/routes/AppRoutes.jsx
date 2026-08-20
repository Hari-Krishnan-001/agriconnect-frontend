import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import FarmerDashboard from "../pages/FarmerDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import BusinessDashboard from "../pages/BusinessDashboard";

import Crops from "../pages/Crops";
import AddCrop from "../pages/AddCrop";
import Marketplace from "../pages/Marketplace";
import CropDetails from "../pages/CropDetails";

import ProjectExplorer from "../pages/ProjectExplorer";
import ProjectDetails from "../pages/ProjectDetails";
import KnowledgeBase from "../pages/KnowledgeBase";

import Login from "../pages/Login";

function AppRoutes() {
  return (
    <Routes>

      {/* Landing */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Farmer */}
      <Route
        path="/farmer/dashboard"
        element={<FarmerDashboard />}
      />

      <Route
        path="/farmer/crops"
        element={<Crops />}
      />

      <Route
        path="/farmer/crops/add"
        element={<AddCrop />}
      />

      {/* Student */}
      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />

      {/* Business */}
      <Route
        path="/business/dashboard"
        element={<BusinessDashboard />}
      />

      {/* Marketplace */}
      <Route
        path="/marketplace"
        element={<Marketplace />}
      />

      <Route
        path="/crops/:id"
        element={<CropDetails />}
      />

      {/* Projects */}
      <Route
        path="/projects"
        element={<ProjectExplorer />}
      />

      <Route
        path="/projects/:id"
        element={<ProjectDetails />}
      />

      {/* Knowledge */}
      <Route
        path="/knowledge"
        element={<KnowledgeBase />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>
  );
}

export default AppRoutes;