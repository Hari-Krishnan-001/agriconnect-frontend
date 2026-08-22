import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/businessDashboard.css";
import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

function BusinessDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/orders/my-orders");

      const sortedOrders = [...response.data].sort(
        (a, b) =>
          new Date(b.orderDate) -
          new Date(a.orderDate)
      );

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Failed to load business orders:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // DASHBOARD STATISTICS
  // ================================

  const totalOrders = orders.length;

  const approvedOrders = orders.filter(
    (order) => order.status === "APPROVED"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const totalSpending = orders
    .filter((order) => order.status === "APPROVED")
    .reduce(
      (total, order) =>
        total + Number(order.totalPrice || 0),
      0
    );

  const recentOrders = orders.slice(0, 5);

  const getCropEmoji = (cropName) => {
    const name = cropName?.toLowerCase() || "";

    if (name.includes("tomato")) return "🍅";
    if (name.includes("potato")) return "🥔";
    if (name.includes("onion")) return "🧅";
    if (name.includes("cabbage")) return "🥬";
    if (name.includes("carrot")) return "🥕";
    if (name.includes("chilli")) return "🌶️";
    if (name.includes("pepper")) return "🌶️";
    if (name.includes("corn")) return "🌽";
    if (name.includes("banana")) return "🍌";
    if (name.includes("apple")) return "🍎";
    if (name.includes("mango")) return "🥭";
    if (name.includes("orange")) return "🍊";
    if (name.includes("grape")) return "🍇";
    if (name.includes("watermelon")) return "🍉";

    return "🌱";
  };

  const getStatusText = (status) => {
    switch (status) {
      case "APPROVED":
        return "Approved";

      case "PENDING":
        return "Pending";

      case "REJECTED":
        return "Rejected";

      default:
        return status || "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "approved";

      case "PENDING":
        return "pending";

      case "REJECTED":
        return "rejected";

      default:
        return "pending";
    }
  };

  if (loading) {
    return (
      <div className="business-dashboard">

        <Sidebar />

        <main className="business-content">

          <div className="business-header">

            <div>
              <p className="business-label">
                Business Dashboard
              </p>

              <h1>
                Loading Dashboard...
              </h1>

              <p>
                Please wait while we load your orders.
              </p>
            </div>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="business-dashboard">

      <Sidebar />

      <main className="business-content">

        {/* ================================
            HEADER
        ================================= */}

        <div className="business-header">

          <div>

            <p className="business-label">
              Business Dashboard
            </p>

            <h1>
              Welcome back, AgriTech Solutions!
            </h1>

            <p>
              Manage your crop purchases, orders and
              agricultural opportunities from one place.
            </p>

          </div>

          <button
            className="browse-crops-btn"
            onClick={() => navigate("/marketplace")}
          >
            Browse Crops
          </button>

        </div>


        {/* ================================
            ERROR
        ================================= */}

        {error && (
          <div className="business-dashboard-error">
            {error}
          </div>
        )}


        {/* ================================
            STATISTICS
        ================================= */}

        <section className="business-stats">

          <div className="business-stat-card">

            <span>🛒</span>

            <div>
              <p>Total Orders</p>

              <h2>
                {totalOrders}
              </h2>
            </div>

          </div>


          <div className="business-stat-card">

            <span>✅</span>

            <div>
              <p>Approved Orders</p>

              <h2>
                {approvedOrders}
              </h2>
            </div>

          </div>


          <div className="business-stat-card">

            <span>⏳</span>

            <div>
              <p>Pending Orders</p>

              <h2>
                {pendingOrders}
              </h2>
            </div>

          </div>


          <div className="business-stat-card">

            <span>💰</span>

            <div>
              <p>Total Spending</p>

              <h2>
                ₹{totalSpending.toLocaleString("en-IN")}
              </h2>
            </div>

          </div>

        </section>


        {/* ================================
            RECENT PURCHASES
        ================================= */}

        <section className="purchases-section">

          <div className="section-heading">

            <div>

              <h2>
                Recent Purchases
              </h2>

              <p>
                Track your latest crop purchases.
              </p>

            </div>

            <button
              className="view-orders-btn"
              onClick={() => navigate("/orders")}
            >
              View All Orders
            </button>

          </div>


          <div className="purchase-table">

            {recentOrders.length === 0 ? (

              <div className="business-empty-orders">

                <div>
                  📦
                </div>

                <h3>
                  No Orders Yet
                </h3>

                <p>
                  Start purchasing fresh crops from farmers.
                </p>

                <button
                  onClick={() =>
                    navigate("/marketplace")
                  }
                >
                  Browse Marketplace
                </button>

              </div>

            ) : (

              <table>

                <thead>

                  <tr>
                    <th>Crop</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr key={order.id}>

                      <td>
                        {getCropEmoji(order.cropName)}{" "}
                        {order.cropName}
                      </td>

                      <td>
                        {order.quantity}
                      </td>

                      <td>
                        ₹
                        {Number(
                          order.totalPrice || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>

                        <span
                          className={`status ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {getStatusText(
                            order.status
                          )}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </section>


        {/* ================================
            QUICK ACTIONS
        ================================= */}

        <section className="quick-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="action-grid">


            {/* Browse Crops */}

            <div className="action-card">

              <span>
                🌾
              </span>

              <h3>
                Browse Crops
              </h3>

              <p>
                Find fresh crops directly from farmers.
              </p>

              <button
                onClick={() =>
                  navigate("/marketplace")
                }
              >
                Explore Marketplace
              </button>

            </div>


            {/* My Orders */}

            <div className="action-card">

              <span>
                📦
              </span>

              <h3>
                My Orders
              </h3>

              <p>
                Track and manage your crop orders.
              </p>

              <button
                onClick={() =>
                  navigate("/orders")
                }
              >
                View Orders
              </button>

            </div>


            {/* Projects */}

            <div className="action-card">

              <span>
                💡
              </span>

              <h3>
                Explore Projects
              </h3>

              <p>
                Discover innovative agricultural projects.
              </p>

              <button
                onClick={() =>
                  navigate("/projects")
                }
              >
                Explore Projects
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default BusinessDashboard;