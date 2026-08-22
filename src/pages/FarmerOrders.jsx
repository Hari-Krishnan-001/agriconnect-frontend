import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/farmerOrders.css";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================================
  // GET FARMER ORDERS
  // ================================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/orders/farmer");

      setOrders(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // APPROVE ORDER
  // ================================
  const handleApprove = async (id) => {
    try {
      setProcessingId(id);
      setError("");

      const response = await api.put(
        `/api/orders/${id}/approve`
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? response.data : order
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to approve order."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ================================
  // REJECT ORDER
  // ================================
  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(id);
      setError("");

      const response = await api.put(
        `/api/orders/${id}/reject`
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? response.data : order
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to reject order."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ================================
  // STATUS CLASS
  // ================================
  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "farmer-order-status approved";

      case "REJECTED":
        return "farmer-order-status rejected";

      default:
        return "farmer-order-status pending";
    }
  };

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="farmer-orders-page">
        <div className="farmer-orders-container">
          <h1>Crop Orders</h1>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  // ================================
  // PAGE
  // ================================
  return (
    <div className="farmer-orders-page">

      <div className="farmer-orders-container">

        {/* Header */}

        <div className="farmer-orders-header">

          <div>
            <p className="farmer-orders-label">
              Farmer Dashboard
            </p>

            <h1>
              Crop Orders
            </h1>

            <p>
              Manage orders received for your crops.
            </p>
          </div>

        </div>


        {/* Error */}

        {error && (
          <div className="farmer-orders-error">
            {error}
          </div>
        )}


        {/* Empty State */}

        {!error && orders.length === 0 && (
          <div className="empty-farmer-orders">

            <div className="empty-farmer-orders-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't received any crop orders yet.
            </p>

          </div>
        )}


        {/* Orders List */}

        {!error && orders.length > 0 && (
          <div className="farmer-orders-list">

            {orders.map((order) => (

              <div
                className="farmer-order-card"
                key={order.id}
              >

                <div className="farmer-order-main">

                  {/* Icon */}

                  <div className="farmer-order-icon">
                    🌱
                  </div>


                  {/* Content */}

                  <div className="farmer-order-content">

                    {/* Title */}

                    <div className="farmer-order-title-row">

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
                        {order.status}
                      </span>

                    </div>


                    {/* Order Information */}

                    <div className="farmer-order-info">

                      <div>
                        <span>
                          Business
                        </span>

                        <strong>
                          {order.businessFirmName ||
                            "Unknown Business"}
                        </strong>
                      </div>


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
                          ₹{order.totalPrice}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Order Date
                        </span>

                        <strong>
                          {order.orderDate
                            ? new Date(
                                order.orderDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </strong>
                      </div>

                    </div>


                    {/* Actions */}

                    {order.status === "PENDING" && (
                      <div className="farmer-order-actions">

                        <button
                          type="button"
                          className="approve-order-button"
                          disabled={
                            processingId === order.id
                          }
                          onClick={() =>
                            handleApprove(order.id)
                          }
                        >
                          {processingId === order.id
                            ? "Processing..."
                            : "Approve Order"}
                        </button>


                        <button
                          type="button"
                          className="reject-order-button"
                          disabled={
                            processingId === order.id
                          }
                          onClick={() =>
                            handleReject(order.id)
                          }
                        >
                          Reject Order
                        </button>

                      </div>
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

export default FarmerOrders;