import { Routes, Route } from "react-router-dom";

// ========================================
// LAYOUT
// ========================================

import AppLayout from "../layouts/AppLayout";

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
// STUDENT
// ========================================

import StudentProfile from "../pages/StudentProfile";

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
import Pesticides from "../pages/Pesticides";
import PesticideScanner from "../pages/PesticideScanner";

// ========================================
// AUTHENTICATION
// ========================================

import Login from "../pages/Login";
import Register from "../pages/Register";

// ========================================
// CHAT
// ========================================

import Chat from "../pages/Chat";
import ProjectChat from "../pages/ProjectChat";
import Messages from "../pages/Messages";

import Settings from "../pages/Settings";


function AppRoutes() {
  return (
    <Routes>

      {/* ========================================
          PUBLIC PAGES
      ======================================== */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ========================================
          AUTHENTICATED APPLICATION

          All normal application pages use
          AppLayout and therefore have access
          to the sidebar.
      ======================================== */}

      <Route element={<AppLayout />}>

        {/* ======================================
            DASHBOARDS
        ====================================== */}

        <Route
          path="/farmer/dashboard"
          element={<FarmerDashboard />}
        />

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/business/dashboard"
          element={<BusinessDashboard />}
        />


        {/* ======================================
            FARMER
        ====================================== */}

        <Route
          path="/farmer/profile"
          element={<FarmerProfile />}
        />

        <Route
          path="/farmer/crops"
          element={<Crops />}
        />

        <Route
          path="/farmer/orders"
          element={<FarmerOrders />}
        />


        {/* ======================================
            BUSINESS
        ====================================== */}

        <Route
          path="/business/profile"
          element={<BusinessProfile />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />


        {/* ======================================
            STUDENT
        ====================================== */}

        <Route
          path="/student/profile"
          element={<StudentProfile />}
        />


        {/* ======================================
            MARKETPLACE
        ====================================== */}

        <Route
          path="/marketplace"
          element={<Marketplace />}
        />


        {/* ======================================
            PROJECTS
        ====================================== */}

        <Route
          path="/projects"
          element={<ProjectExplorer />}
        />


        {/* ======================================
            KNOWLEDGE
        ====================================== */}

        <Route
          path="/knowledge"
          element={<KnowledgeBase />}
        />

        <Route
          path="/farming-techniques"
          element={<KnowledgeBase />}
        />

        <Route
          path="/pesticides"
          element={<Pesticides />}
        />

        <Route
          path="/pesticide-scanner"
          element={<PesticideScanner />}
        />

      </Route>


      {/* ========================================
          FOCUSED / FULL-SCREEN PAGES

          These also use AppLayout so the
          sidebar remains available.
      ======================================== */}

      <Route element={<AppLayout />}>

        {/* ======================================
            FARMER CROP PAGES
        ====================================== */}

        <Route
          path="/farmer/crops/add"
          element={<AddCrop />}
        />

        <Route
          path="/farmer/crops/edit/:id"
          element={<EditCrop />}
        />


        {/* ======================================
            CROP DETAILS
        ====================================== */}

        <Route
          path="/crops/:id"
          element={<CropDetails />}
        />


        {/* ======================================
            PROJECT PAGES
        ====================================== */}

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


        {/* ======================================
            CHAT
        ====================================== */}

        <Route
          path="/chat/:orderId"
          element={<Chat />}
        />

        <Route
          path="/project-chat/:projectId"
          element={<ProjectChat />}
        />

        <Route
          path="/messages"
          element={<Messages />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;