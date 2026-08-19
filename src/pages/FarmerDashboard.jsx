import Sidebar from "../components/sidebar/Sidebar";

import DashboardCards from "../components/dashboard/DashboardCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import CropOverview from "../components/dashboard/CropOverview";
import HelpBanner from "../components/dashboard/HelpBanner";

function FarmerDashboard() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
        flex: 1,
        padding: "40px",
        backgroundColor: "#f5f7f5",
        minHeight: "100vh",
        }}
      >
        <h1>Welcome back, Hari!</h1>

        <DashboardCards />

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <RecentOrders />

          <CropOverview />
        </div>

        <HelpBanner />
      </div>
    </div>
  );
}

export default FarmerDashboard;