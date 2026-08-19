import "./DashboardCards.css";

function DashboardCards() {
  const cards = [
    {
      title: "Total Crops",
      value: "12",
    },
    {
      title: "Active Orders",
      value: "5",
    },
    {
      title: "Completed Orders",
      value: "8",
    },
    {
      title: "Total Earnings",
      value: "₹45,600",
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="dashboard-card" key={index}>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;