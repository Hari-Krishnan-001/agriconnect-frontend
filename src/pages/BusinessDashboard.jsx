import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/businessDashboard.css";
import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

function BusinessDashboard() {
  const navigate = useNavigate();

  // ========================================
  // LOGGED-IN USER
  // ========================================

  const [userName, setUserName] = useState("User");

  // ========================================
  // DASHBOARD STATE
  // ========================================

  const [orders, setOrders] = useState([]);
  const [projectChats, setProjectChats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatError, setChatError] = useState("");

  // ========================================
  // GET LOGGED-IN USER
  // ========================================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      /*
       * Different parts of the existing application
       * may use different property names.
       *
       * Check the available fields in a safe order.
       */

      const displayName =
        user.fullName ||
        user.full_name ||
        user.name ||
        user.businessName ||
        user.business_name ||
        user.email ||
        "User";

      setUserName(displayName);
    } catch (error) {
      console.error(
        "Failed to read logged-in user:",
        error
      );
    }
  }, []);

  // ========================================
  // FETCH DASHBOARD DATA
  // ========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      setChatError("");

      const [
        ordersResponse,
        chatsResponse,
      ] = await Promise.all([
        api.get("/api/orders/my-orders"),
        api.get("/api/project-chats/business"),
      ]);

      const sortedOrders = [
        ...(ordersResponse.data || []),
      ].sort(
        (a, b) =>
          new Date(b.orderDate) -
          new Date(a.orderDate)
      );

      setOrders(sortedOrders);

      setProjectChats(
        chatsResponse.data || []
      );
    } catch (err) {
      console.error(
        "Failed to load business dashboard:",
        err
      );

      /*
       * If only the project-chat request failed,
       * keep the business dashboard working.
       */

      if (
        err.config?.url?.includes(
          "/api/project-chats/business"
        )
      ) {
        setChatError(
          err.response?.data?.message ||
            "Unable to load project chats."
        );

        /*
         * Try loading orders separately so an
         * unavailable chat endpoint does not
         * break the complete dashboard.
         */

        try {
          const response = await api.get(
            "/api/orders/my-orders"
          );

          const sortedOrders = [
            ...(response.data || []),
          ].sort(
            (a, b) =>
              new Date(b.orderDate) -
              new Date(a.orderDate)
          );

          setOrders(sortedOrders);
        } catch (orderError) {
          console.error(
            "Failed to load business orders:",
            orderError
          );

          setError(
            orderError.response?.data?.message ||
              "Failed to load dashboard data."
          );
        }
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DASHBOARD STATISTICS
  // ========================================

  const totalOrders =
    orders.length;

  const approvedOrders =
    orders.filter(
      (order) =>
        order.status === "APPROVED"
    ).length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "PENDING"
    ).length;

  const totalSpending =
    orders
      .filter(
        (order) =>
          order.status === "APPROVED"
      )
      .reduce(
        (total, order) =>
          total +
          Number(
            order.totalPrice || 0
          ),
        0
      );

  const recentOrders =
    orders.slice(0, 5);

  // ========================================
  // CROP EMOJI
  // ========================================

  const getCropEmoji = (cropName) => {
    const name =
      cropName?.toLowerCase() || "";

    if (name.includes("tomato"))
      return "🍅";

    if (name.includes("potato"))
      return "🥔";

    if (name.includes("onion"))
      return "🧅";

    if (name.includes("cabbage"))
      return "🥬";

    if (name.includes("carrot"))
      return "🥕";

    if (name.includes("chilli"))
      return "🌶️";

    if (name.includes("pepper"))
      return "🌶️";

    if (name.includes("corn"))
      return "🌽";

    if (name.includes("banana"))
      return "🍌";

    if (name.includes("apple"))
      return "🍎";

    if (name.includes("mango"))
      return "🥭";

    if (name.includes("orange"))
      return "🍊";

    if (name.includes("grape"))
      return "🍇";

    if (name.includes("watermelon"))
      return "🍉";

    return "🌱";
  };

  // ========================================
  // STATUS TEXT
  // ========================================

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

  // ========================================
  // STATUS CLASS
  // ========================================

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

  // ========================================
  // CHAT DATE
  // ========================================

  const formatChatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN"
    );
  };

  // ========================================
  // OPEN PROJECT CHAT
  // ========================================

  const openProjectChat = (
    projectId
  ) => {
    navigate(
      `/project-chat/${projectId}`
    );
  };

  // ========================================
  // LOADING
  // ========================================

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
                Please wait while we load your
                dashboard.
              </p>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // ========================================
  // MAIN PAGE
  // ========================================

  return (
    <div className="business-dashboard">

      <Sidebar />

      <main className="business-content">

        {/* =================================
            HEADER
        ================================= */}

        <div className="business-header">

          <div>

            <p className="business-label">
              Business Dashboard
            </p>

            <h1>
              Welcome back, {userName}!
            </h1>

            <p>
              Manage your crop purchases, orders
              and agricultural opportunities from
              one place.
            </p>

          </div>

          <button
            className="browse-crops-btn"
            onClick={() =>
              navigate("/marketplace")
            }
          >
            Browse Crops
          </button>

        </div>

        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div className="business-dashboard-error">

            <span>
              {error}
            </span>

            <button
              onClick={
                fetchDashboardData
              }
            >
              Try Again
            </button>

          </div>
        )}

        {/* =================================
            STATISTICS
        ================================= */}

        <section className="business-stats">

          {/* Total Orders */}

          <div className="business-stat-card">

            <span>
              🛒
            </span>

            <div>

              <p>
                Total Orders
              </p>

              <h2>
                {totalOrders}
              </h2>

            </div>

          </div>

          {/* Approved Orders */}

          <div className="business-stat-card">

            <span>
              ✅
            </span>

            <div>

              <p>
                Approved Orders
              </p>

              <h2>
                {approvedOrders}
              </h2>

            </div>

          </div>

          {/* Pending Orders */}

          <div className="business-stat-card">

            <span>
              ⏳
            </span>

            <div>

              <p>
                Pending Orders
              </p>

              <h2>
                {pendingOrders}
              </h2>

            </div>

          </div>

          {/* Total Spending */}

          <div className="business-stat-card">

            <span>
              💰
            </span>

            <div>

              <p>
                Total Spending
              </p>

              <h2>
                ₹
                {totalSpending.toLocaleString(
                  "en-IN"
                )}
              </h2>

            </div>

          </div>

        </section>

        {/* =================================
            PROJECT CHATS
        ================================= */}

        <section className="business-project-chats">

          <div className="section-heading">

            <div>

              <h2>
                💬 Project Chats
              </h2>

              <p>
                Communicate with students about
                agricultural projects.
              </p>

            </div>

          </div>

          {/* CHAT ERROR */}

          {chatError && (
            <div className="business-dashboard-error">

              <span>
                {chatError}
              </span>

              <button
                onClick={
                  fetchDashboardData
                }
              >
                Try Again
              </button>

            </div>
          )}

          {/* EMPTY CHAT */}

          {!chatError &&
            projectChats.length === 0 && (

              <div className="empty-business-project-chats">

                <div className="business-empty-chat-icon">
                  💬
                </div>

                <h3>
                  No Project Chats Yet
                </h3>

                <p>
                  When you start a conversation
                  with a student about a project,
                  it will appear here.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/projects")
                  }
                >
                  Explore Projects
                </button>

              </div>

            )}

          {/* CHAT LIST */}

          {!chatError &&
            projectChats.length > 0 && (

              <div className="business-project-chat-list">

                {projectChats.map(
                  (chat) => (

                    <div
                      className="business-project-chat-card"
                      key={chat.id}
                    >

                      {/* CHAT ICON */}

                      <div className="business-project-chat-icon">
                        💬
                      </div>

                      {/* CHAT CONTENT */}

                      <div className="business-project-chat-content">

                        <div className="business-project-chat-header">

                          <div>

                            <h3>
                              {chat.projectTitle ||
                                "Untitled Project"}
                            </h3>

                            <p>
                              Project #
                              {chat.projectId}
                            </p>

                          </div>

                        </div>

                        {/* CHAT INFORMATION */}

                        <div className="business-project-chat-info">

                          <div>

                            <span>
                              Student
                            </span>

                            <strong>
                              {chat.studentName ||
                                "Unknown Student"}
                            </strong>

                          </div>

                          <div>

                            <span>
                              Student Email
                            </span>

                            <strong>
                              {chat.studentEmail ||
                                "N/A"}
                            </strong>

                          </div>

                          <div>

                            <span>
                              Started
                            </span>

                            <strong>
                              {formatChatDate(
                                chat.createdAt
                              )}
                            </strong>

                          </div>

                        </div>

                        {/* OPEN CHAT */}

                        <button
                          type="button"
                          className="business-project-chat-button"
                          onClick={() =>
                            openProjectChat(
                              chat.projectId
                            )
                          }
                        >
                          Open Chat →
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

        </section>

        {/* =================================
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
              onClick={() =>
                navigate("/orders")
              }
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
                  Start purchasing fresh crops
                  from farmers.
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

                    <th>
                      Crop
                    </th>

                    <th>
                      Quantity
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map(
                    (order) => (

                      <tr
                        key={order.id}
                      >

                        <td>
                          {getCropEmoji(
                            order.cropName
                          )}{" "}
                          {order.cropName}
                        </td>

                        <td>
                          {order.quantity}
                        </td>

                        <td>
                          ₹
                          {Number(
                            order.totalPrice || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
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

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        </section>

        {/* =================================
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
                Find fresh crops directly from
                farmers.
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
                Discover innovative agricultural
                projects.
              </p>

              <button
                onClick={() =>
                  navigate("/projects")
                }
              >
                Explore Projects
              </button>

            </div>

            {/* Project Chats */}

            <div className="action-card">

              <span>
                💬
              </span>

              <h3>
                Project Chats
              </h3>

              <p>
                Continue conversations with
                students.
              </p>

              <button
                onClick={() =>
                  document
                    .querySelector(
                      ".business-project-chats"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                View Chats
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default BusinessDashboard;