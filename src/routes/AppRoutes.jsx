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
import Register from "../pages/Register";
import StudentProfile from "../pages/StudentProfile";


// ========================================
// CHAT
// ========================================

import Chat from "../pages/Chat";
import ProjectChat from "../pages/ProjectChat";


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

      <Route
        path="/register"
        element={<Register />}
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

      <Route
        path="/student/profile"
        element={<StudentProfile />}
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

      <Route
        path="/projects"
        element={<ProjectExplorer />}
      />

      <Route
        path="/projects/create"
        element={<CreateProject />}
      />

      <Route
        path="/projects/edit/:id"
        element={<EditProject />}
      />

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


      {/* ========================================
          ORDER CHAT
          FARMER ↔ BUSINESS
      ======================================== */}

      <Route
        path="/chat/:orderId"
        element={<Chat />}
      />


      {/* ========================================
          PROJECT CHAT
          STUDENT ↔ BUSINESS
      ======================================== */}

      <Route
        path="/project-chat/:projectId"
        element={<ProjectChat />}
      />

    </Routes>
  );
}

export default AppRoutes;