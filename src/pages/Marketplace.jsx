import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/marketplace.css";
import Sidebar from "../components/sidebar/Sidebar";

function Marketplace() {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Crops");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOAD AVAILABLE CROPS
  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/crops/available");

      setCrops(response.data);
      setFilteredCrops(response.data);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load marketplace crops."
      );

    } finally {
      setLoading(false);
    }
  };

  // SEARCH + CATEGORY FILTER
  useEffect(() => {
    let result = [...crops];

    // Search by crop name
    if (search.trim() !== "") {
      const searchText = search.toLowerCase();

      result = result.filter((crop) =>
        crop.cropName?.toLowerCase().includes(searchText)
      );
    }

    // Filter by category
    if (category !== "All Crops") {
      result = result.filter(
        (crop) =>
          crop.category?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    setFilteredCrops(result);

  }, [search, category, crops]);

  // CROP EMOJI
  const getCropEmoji = (cropName) => {
    const name = cropName?.toLowerCase();

    if (name?.includes("tomato")) return "🍅";
    if (name?.includes("potato")) return "🥔";
    if (name?.includes("onion")) return "🧅";
    if (name?.includes("cabbage")) return "🥬";
    if (name?.includes("carrot")) return "🥕";
    if (name?.includes("chilli")) return "🌶️";
    if (name?.includes("pepper")) return "🌶️";
    if (name?.includes("corn")) return "🌽";
    if (name?.includes("banana")) return "🍌";
    if (name?.includes("apple")) return "🍎";
    if (name?.includes("mango")) return "🥭";
    if (name?.includes("rice")) return "🌾";
    if (name?.includes("wheat")) return "🌾";

    return "🌱";
  };

  return (
    <div className="marketplace-page">

      <Sidebar />

      <main className="marketplace-content">

        {/* HEADER */}
        <div className="marketplace-header">

          <div>

            <p className="marketplace-label">
              Marketplace
            </p>

            <h1>
              Crop Marketplace
            </h1>

            <p>
              Browse fresh crops available directly from farmers.
            </p>

          </div>

        </div>


        {/* SEARCH AND FILTERS */}
        <div className="marketplace-filters">

          {/* SEARCH */}
          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search crops..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="All Crops">
              All Crops
            </option>

            <option value="Vegetable">
              Vegetables
            </option>

            <option value="Fruit">
              Fruits
            </option>

            <option value="Grain">
              Grains
            </option>

            <option value="Pulse">
              Pulses
            </option>

            <option value="Spice">
              Spices
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* LOADING */}
        {loading && (

          <div className="marketplace-message">

            <h2>
              Loading crops...
            </h2>

            <p>
              Finding fresh crops from farmers.
            </p>

          </div>

        )}


        {/* ERROR */}
        {!loading && error && (

          <div className="marketplace-error">

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button
              className="view-crop-btn"
              onClick={fetchCrops}
            >
              Try Again
            </button>

          </div>

        )}


        {/* NO CROPS */}
        {!loading &&
          !error &&
          filteredCrops.length === 0 && (

            <div className="marketplace-message">

              <div className="empty-icon">
                🌱
              </div>

              <h2>
                No Crops Found
              </h2>

              <p>
                No available crops match your search.
              </p>

            </div>

          )}


        {/* CROP CARDS */}
        {!loading &&
          !error &&
          filteredCrops.length > 0 && (

            <section className="crop-grid">

              {filteredCrops.map((crop) => (

                <div
                  className="market-crop-card"
                  key={crop.id}
                >

                  {/* CROP ICON */}
                  <div className="crop-image">

                    {getCropEmoji(crop.cropName)}

                  </div>


                  <div className="crop-card-content">

                    {/* TITLE */}
                    <div className="crop-title-row">

                      <h2>
                        {crop.cropName}
                      </h2>

                      <span className="fresh-badge">
                        Available
                      </span>

                    </div>


                    {/* PRICE */}
                    <p className="crop-price">

                      ₹{crop.pricePerUnit} / {crop.unit}

                    </p>


                    {/* INFORMATION */}
                    <div className="crop-info">

                      <span>
                        📦 {crop.quantity} {crop.unit} available
                      </span>

                      <span>
                        🌱 {crop.category}
                      </span>

                      <span>
                        👨‍🌾 {crop.fullName}
                      </span>

                    </div>


                    {/* DESCRIPTION */}
                    {crop.description && (

                      <p className="crop-description">

                        {crop.description}

                      </p>

                    )}


                    {/* VIEW CROP */}
                    <button
                      className="view-crop-btn"
                      onClick={() =>
                        navigate(`/crops/${crop.id}`)
                      }
                    >
                      View Crop
                    </button>

                  </div>

                </div>

              ))}

            </section>

          )}

      </main>

    </div>
  );
}

export default Marketplace;