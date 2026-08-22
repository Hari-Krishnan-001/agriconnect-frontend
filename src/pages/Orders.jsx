import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/orders.css";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  // ========================================
  // FETCH BUSINESS ORDERS
  // ========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/orders/my-orders"
      );

      setOrders(response.data || []);
    } catch (err) {
      console.error(
        "Failed to load orders:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // CROP EMOJI
  // ========================================

  const getCropEmoji = (cropName) => {
    const name =
      cropName?.toLowerCase() || "";

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


  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "order-status approved";

      case "REJECTED":
        return "order-status rejected";

      case "PENDING":
      default:
        return "order-status pending";
    }
  };


  // ========================================
  // STATUS TEXT
  // ========================================

  const getStatusText = (status) => {
    switch (status) {
      case "APPROVED":
        return "Approved";

      case "REJECTED":
        return "Rejected";

      case "PENDING":
        return "Pending";

      default:
        return status || "Unknown";
    }
  };


  // ========================================
  // FORMAT PRICE
  // ========================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "en-IN"
    );
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="orders-page">

        <div className="orders-container">

          <div className="orders-header">

            <div>
              <p className="orders-label">
                Orders
              </p>

              <h1>
                My Orders
              </h1>

              <p>
                Loading your crop orders...
              </p>
            </div>

          </div>

          <div className="orders-loading">

            <div className="orders-loading-icon">
              📦
            </div>

            <h2>
              Loading Orders...
            </h2>

            <p>
              Please wait while we retrieve your orders.
            </p>

          </div>

        </div>

      </div>
    );
  }


  // ========================================
  // MAIN PAGE
  // ========================================

  return (
    <div className="orders-page">

      <div className="orders-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="orders-header">

          <div>

            <p className="orders-label">
              Orders
            </p>

            <h1>
              My Orders
            </h1>

            <p>
              Track the crops you have ordered
              from farmers.
            </p>

          </div>


          <button
            className="browse-marketplace-button"
            onClick={() =>
              navigate("/marketplace")
            }
          >
            Browse Marketplace
          </button>

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (

          <div className="orders-error">

            <span>
              {error}
            </span>

            <button
              onClick={fetchOrders}
            >
              Try Again
            </button>

          </div>

        )}


        {/* =================================
            EMPTY STATE
        ================================= */}

        {!error && orders.length === 0 && (

          <div className="empty-orders">

            <div className="empty-orders-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              className="browse-marketplace-button"
              onClick={() =>
                navigate("/marketplace")
              }
            >
              Browse Crops
            </button>

          </div>

        )}


        {/* =================================
            ORDERS
        ================================= */}

        {!error && orders.length > 0 && (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-card-main">

                  {/* Crop Icon */}

                  <div className="order-crop-icon">

                    {getCropEmoji(
                      order.cropName
                    )}

                  </div>


                  {/* Order Details */}

                  <div className="order-details">

                    <div className="order-title-row">

                      <div>

                        <h2>
                          {order.cropName}
                        </h2>

                        <p>
                          Order #{order.id}
                        </p>

                      </div>


                      <span
                        className={getStatusClass(
                          order.status
                        )}
                      >
                        {getStatusText(
                          order.status
                        )}
                      </span>

                    </div>


                    {/* Order Information */}

                    <div className="order-info">

                      <div>

                        <span>
                          Quantity
                        </span>

                        <strong>
                          {order.quantity}
                        </strong>

                      </div>


                      <div>

                        <span>
                          Total Price
                        </span>

                        <strong>
                          ₹
                          {formatPrice(
                            order.totalPrice
                          )}
                        </strong>

                      </div>


                      <div>

                        <span>
                          Ordered On
                        </span>

                        <strong>
                          {order.orderDate
                            ? new Date(
                                order.orderDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}
                        </strong>

                      </div>

                    </div>


                    {/* Status Message */}

                    {order.status ===
                      "PENDING" && (

                      <p className="order-status-message">
                        Your order is waiting for
                        farmer approval.
                      </p>

                    )}


                    {order.status ===
                      "APPROVED" && (

                      <p className="order-status-message approved-message">
                        Your order has been
                        approved by the farmer.
                      </p>

                    )}


                    {order.status ===
                      "REJECTED" && (

                      <p className="order-status-message rejected-message">
                        This order was rejected by
                        the farmer.
                      </p>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Orders;