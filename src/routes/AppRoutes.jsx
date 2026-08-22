import { Routes, Route } from "react-router-dom";

// Landing
import LandingPage from "../pages/LandingPage";

// Dashboards
import FarmerDashboard from "../pages/FarmerDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import BusinessDashboard from "../pages/BusinessDashboard";

// Farmer Crops
import Crops from "../pages/Crops";
import AddCrop from "../pages/AddCrop";
import EditCrop from "../pages/EditCrop";
import FarmerOrders from "../pages/FarmerOrders";

// Marketplace
import Marketplace from "../pages/Marketplace";
import CropDetails from "../pages/CropDetails";

// Business Orders
import Orders from "../pages/Orders";

// Projects
import ProjectExplorer from "../pages/ProjectExplorer";
import ProjectDetails from "../pages/ProjectDetails";

// Knowledge
import KnowledgeBase from "../pages/KnowledgeBase";

// Authentication
import Login from "../pages/Login";


function AppRoutes() {
  return (
    <Routes>

      {/* =================================
          LANDING
      ================================= */}

      <Route
        path="/"
        element={<LandingPage />}
      />


      {/* =================================
          AUTHENTICATION
      ================================= */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =================================
          FARMER
      ================================= */}

      <Route
        path="/farmer/dashboard"
        element={<FarmerDashboard />}
      />

      {/* My Crops */}

      <Route
        path="/farmer/crops"
        element={<Crops />}
      />

      {/* Add Crop */}

      <Route
        path="/farmer/crops/add"
        element={<AddCrop />}
      />

      {/* Edit Crop */}

      <Route
        path="/farmer/crops/edit/:id"
        element={<EditCrop />}
      />

      {/* Farmer Orders */}

      <Route
        path="/farmer/orders"
        element={<FarmerOrders />}
      />


      {/* =================================
          STUDENT
      ================================= */}

      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />


      {/* =================================
          BUSINESS
      ================================= */}

      <Route
        path="/business/dashboard"
        element={<BusinessDashboard />}
      />

      {/* Business Orders */}

      <Route
        path="/orders"
        element={<Orders />}
      />


      {/* =================================
          MARKETPLACE
      ================================= */}

      <Route
        path="/marketplace"
        element={<Marketplace />}
      />

      {/* Crop Details */}

      <Route
        path="/crops/:id"
        element={<CropDetails />}
      />


      {/* =================================
          PROJECTS
      ================================= */}

      <Route
        path="/projects"
        element={<ProjectExplorer />}
      />

      <Route
        path="/projects/:id"
        element={<ProjectDetails />}
      />


      {/* =================================
          KNOWLEDGE BASE
      ================================= */}

      <Route
        path="/knowledge"
        element={<KnowledgeBase />}
      />

    </Routes>
  );
}

export default AppRoutes;