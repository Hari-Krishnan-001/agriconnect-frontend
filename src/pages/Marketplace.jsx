import "../styles/marketplace.css";
import Sidebar from "../components/sidebar/Sidebar";

function Marketplace() {
  const crops = [
    {
      name: "Tomato",
      emoji: "🍅",
      quantity: "50 kg",
      price: "₹25 / kg",
      location: "Kochi, Kerala",
      farmer: "Hari Test",
    },
    {
      name: "Potato",
      emoji: "🥔",
      quantity: "100 kg",
      price: "₹26 / kg",
      location: "Thrissur, Kerala",
      farmer: "Arjun Farmer",
    },
    {
      name: "Onion",
      emoji: "🧅",
      quantity: "80 kg",
      price: "₹21 / kg",
      location: "Kottayam, Kerala",
      farmer: "Fresh Farm",
    },
    {
      name: "Cabbage",
      emoji: "🥬",
      quantity: "60 kg",
      price: "₹16 / kg",
      location: "Alappuzha, Kerala",
      farmer: "Green Valley",
    },
    {
      name: "Carrot",
      emoji: "🥕",
      quantity: "70 kg",
      price: "₹28 / kg",
      location: "Palakkad, Kerala",
      farmer: "Farm Fresh",
    },
    {
      name: "Chilli",
      emoji: "🌶️",
      quantity: "30 kg",
      price: "₹40 / kg",
      location: "Idukki, Kerala",
      farmer: "Green Basket",
    },
  ];

  return (
    <div className="marketplace-page">

      <Sidebar />

      <main className="marketplace-content">

        <div className="marketplace-header">
          <div>
            <p className="marketplace-label">Marketplace</p>

            <h1>Crop Marketplace</h1>

            <p>
              Browse fresh crops available directly from farmers.
            </p>
          </div>
        </div>


        {/* Search and Filters */}

        <div className="marketplace-filters">

          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search crops..."
            />
          </div>

          <select>
            <option>All Crops</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Other</option>
          </select>

          <select>
            <option>All Locations</option>
            <option>Kochi</option>
            <option>Thrissur</option>
            <option>Kottayam</option>
            <option>Alappuzha</option>
          </select>

        </div>


        {/* Crop Cards */}

        <section className="crop-grid">

          {crops.map((crop, index) => (

            <div className="market-crop-card" key={index}>

              <div className="crop-image">
                {crop.emoji}
              </div>

              <div className="crop-card-content">

                <div className="crop-title-row">
                  <h2>{crop.name}</h2>

                  <span className="fresh-badge">
                    Fresh
                  </span>
                </div>

                <p className="crop-price">
                  {crop.price}
                </p>

                <div className="crop-info">
                  <span>📦 {crop.quantity} available</span>
                  <span>📍 {crop.location}</span>
                  <span>👨‍🌾 {crop.farmer}</span>
                </div>

                <button className="view-crop-btn">
                  View Crop
                </button>

              </div>

            </div>

          ))}

        </section>

      </main>

    </div>
  );
}

export default Marketplace;