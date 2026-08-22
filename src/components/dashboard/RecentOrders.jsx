import { useEffect, useState } from "react";
import api from "../../services/api";
import "./RecentOrders.css";

function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const response = await api.get("/api/orders/farmer");

      // Show newest orders first
      const sortedOrders = [...response.data].sort(
        (a, b) =>
          new Date(b.orderDate) -
          new Date(a.orderDate)
      );

      // Show only the latest 5
      setOrders(sortedOrders.slice(0, 5));
    } catch (error) {
      console.error(
        "Failed to load recent orders:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="recent-orders">
        <h2>Recent Orders</h2>

        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="recent-orders">

      <h2>Recent Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table>

          <thead>
            <tr>
              <th>Business</th>
              <th>Crop</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>
                  {order.businessFirmName}
                </td>

                <td>
                  {order.cropName}
                </td>

                <td>
                  ₹
                  {Number(
                    order.totalPrice || 0
                  ).toLocaleString("en-IN")}
                </td>

                <td>
                  {getStatusText(order.status)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default RecentOrders;