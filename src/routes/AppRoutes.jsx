import { Routes, Route } from "react-router-dom";

// ========================================
// LANDING
// ========================================

import LandingPage from "../pages/LandingPage";


// ========================================
// DASHBOARDS
// ========================================

import FarmerDashboard from "../pages/FarmerDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import BusinessDashboard from "../pages/BusinessDashboard";


// ========================================
// FARMER
// ========================================

import FarmerProfile from "../pages/FarmerProfile";
import Crops from "../pages/Crops";
import AddCrop from "../pages/AddCrop";
import EditCrop from "../pages/EditCrop";
import FarmerOrders from "../pages/FarmerOrders";


// ========================================
// BUSINESS
// ========================================

import BusinessProfile from "../pages/BusinessProfile";
import Orders from "../pages/Orders";


// ========================================
// MARKETPLACE
// ========================================

import Marketplace from "../pages/Marketplace";
import CropDetails from "../pages/CropDetails";


// ========================================
// PROJECTS
// ========================================

import ProjectExplorer from "../pages/ProjectExplorer";
import ProjectDetails from "../pages/ProjectDetails";
import CreateProject from "../pages/CreateProject";
import EditProject from "../pages/EditProject";


// ========================================
// KNOWLEDGE
// ========================================

import KnowledgeBase from "../pages/KnowledgeBase";


// ========================================
// AUTHENTICATION
// ========================================

import Login from "../pages/Login";
import StudentProfile from "../pages/StudentProfile";
import Register from "../pages/Register";


function AppRoutes() {
  return (
    <Routes>

      {/* ========================================
          LANDING
      ======================================== */}

      <Route
        path="/"
        element={<LandingPage />}
      />


      {/* ========================================
          AUTHENTICATION
      ======================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ========================================
          FARMER
      ======================================== */}

      <Route
        path="/farmer/dashboard"
        element={<FarmerDashboard />}
      />

      <Route
        path="/farmer/profile"
        element={<FarmerProfile />}
      />

      <Route
        path="/farmer/crops"
        element={<Crops />}
      />

      <Route
        path="/farmer/crops/add"
        element={<AddCrop />}
      />

      <Route
        path="/farmer/crops/edit/:id"
        element={<EditCrop />}
      />

      <Route
        path="/farmer/orders"
        element={<FarmerOrders />}
      />


      {/* ========================================
          STUDENT
      ======================================== */}

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />


      {/* ========================================
          BUSINESS
      ======================================== */}

      <Route
        path="/business/dashboard"
        element={<BusinessDashboard />}
      />

      <Route
        path="/business/profile"
        element={<BusinessProfile />}
      />

      <Route
        path="/orders"
        element={<Orders />}
      />


      {/* ========================================
          MARKETPLACE
      ======================================== */}

      <Route
        path="/marketplace"
        element={<Marketplace />}
      />

      <Route
        path="/crops/:id"
        element={<CropDetails />}
      />


      {/* ========================================
          PROJECTS
      ======================================== */}

      {/* Project Explorer */}

      <Route
        path="/projects"
        element={<ProjectExplorer />}
      />

      {/* Create Project */}

      <Route
        path="/projects/create"
        element={<CreateProject />}
      />

      {/* Edit Project */}

      <Route
        path="/projects/edit/:id"
        element={<EditProject />}
      />

      {/* Project Details */}

      <Route
        path="/projects/:id"
        element={<ProjectDetails />}
      />


      {/* ========================================
          KNOWLEDGE BASE
      ======================================== */}

      <Route
        path="/knowledge"
        element={<KnowledgeBase />}
      />

      <Route
        path="/student/profile"
        element={<StudentProfile />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

    </Routes>
  );
}

export default AppRoutes;