import { useEffect, useState } from "react";
import api from "../../services/api";
import "./DashboardCards.css";

function DashboardCards() {
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [cropsResponse, ordersResponse] =
        await Promise.all([
          api.get("/api/crops/my-crops"),
          api.get("/api/orders/farmer"),
        ]);

      setCrops(cropsResponse.data);
      setOrders(ordersResponse.data);

    } catch (error) {
      console.error(
        "Failed to load dashboard data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const totalCrops = crops.length;

  const activeOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "APPROVED"
  ).length;

  const totalEarnings = orders
    .filter((order) => order.status === "APPROVED")
    .reduce(
      (total, order) =>
        total + Number(order.totalPrice || 0),
      0
    );

  const cards = [
    {
      title: "Total Crops",
      value: totalCrops,
    },
    {
      title: "Active Orders",
      value: activeOrders,
    },
    {
      title: "Completed Orders",
      value: completedOrders,
    },
    {
      title: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString("en-IN")}`,
    },
  ];

  if (loading) {
    return (
      <div className="cards-container">

        {cards.map((card, index) => (
          <div
            className="dashboard-card"
            key={index}
          >
            <h3>{card.title}</h3>
            <p>...</p>
          </div>
        ))}

      </div>
    );
  }

  return (
    <div className="cards-container">

      {cards.map((card, index) => (

        <div
          className="dashboard-card"
          key={index}
        >

          <h3>
            {card.title}
          </h3>

          <p>
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;