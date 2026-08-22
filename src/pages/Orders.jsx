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

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/orders/my-orders");

      setOrders(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "order-status approved";

      case "REJECTED":
        return "order-status rejected";

      default:
        return "order-status pending";
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1>My Orders</h1>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        {/* Header */}

        <div className="orders-header">

          <div>
            <p className="orders-label">
              Orders
            </p>

            <h1>
              My Orders
            </h1>

            <p>
              Track the crops you have ordered from farmers.
            </p>
          </div>

          <button
            className="browse-marketplace-button"
            onClick={() => navigate("/marketplace")}
          >
            Browse Marketplace
          </button>

        </div>


        {/* Error */}

        {error && (
          <div className="orders-error">
            {error}
          </div>
        )}


        {/* Empty */}

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
              onClick={() => navigate("/marketplace")}
            >
              Browse Crops
            </button>

          </div>
        )}


        {/* Orders */}

        {!error && orders.length > 0 && (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-card-main">

                  <div className="order-crop-icon">
                    🌱
                  </div>

                  <div className="order-details">

                    <div className="order-title-row">

                      <h2>
                        {order.cropName}
                      </h2>

                      <span
                        className={getStatusClass(
                          order.status
                        )}
                      >
                        {order.status}
                      </span>

                    </div>

                    <p>
                      Order #{order.id}
                    </p>

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
                          ₹{order.totalPrice}
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
                              ).toLocaleDateString()
                            : "N/A"}
                        </strong>
                      </div>

                    </div>

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