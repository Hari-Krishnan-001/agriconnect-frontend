import DashboardCards from "../components/dashboard/DashboardCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import CropOverview from "../components/dashboard/CropOverview";
import HelpBanner from "../components/dashboard/HelpBanner";
import Sidebar from "../components/sidebar/Sidebar";

import "../styles/farmerDashboard.css";

function FarmerDashboard() {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to read stored user:", error);
  }
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
            <h1>Welcome back, {user?.fullName || user?.full_name || "User"}!</h1>

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