import DashboardCards from "../components/dashboard/DashboardCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import CropOverview from "../components/dashboard/CropOverview";
import HelpBanner from "../components/dashboard/HelpBanner";
import Sidebar from "../components/sidebar/Sidebar";

import "../styles/farmerDashboard.css";

function FarmerDashboard() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div className="farmer-dashboard">

          {/* Header */}
          <div className="farmer-dashboard-header">
            <h1>Welcome back, Hari!</h1>

            <p>
              Here's what's happening with your farm today.
            </p>
          </div>

          {/* Dashboard Statistics */}
          <DashboardCards />

          {/* Recent Orders + Crop Overview */}
          <div className="farmer-dashboard-middle">
            <RecentOrders />

            <CropOverview />
          </div>

          {/* Help Banner */}
          <HelpBanner />

        </div>
      </main>
    </div>
  );
}

export default FarmerDashboard;