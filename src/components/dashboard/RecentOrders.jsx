import "./RecentOrders.css";

function RecentOrders() {
  const orders = [
    {
      business: "AgriTech",
      crop: "Tomato",
      amount: "₹500",
      status: "Approved",
    },
    {
      business: "Green Basket",
      crop: "Potato",
      amount: "₹750",
      status: "Pending",
    },
    {
      business: "Fresh Farm",
      crop: "Onion",
      amount: "₹600",
      status: "Completed",
    },
  ];

  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>

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
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.business}</td>
              <td>{order.crop}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders;