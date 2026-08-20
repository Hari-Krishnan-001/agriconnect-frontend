import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/crops.css";

function Crops() {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await api.get("/api/crops/my-crops");
      setCrops(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load your crops.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="crops-page">
        <h1>My Crops</h1>
        <p>Loading crops...</p>
      </div>
    );
  }

  return (
    <div className="crops-page">

      {/* Header */}
      <div className="crops-header">

        <div>
          <h1>My Crops</h1>
          <p>Manage the crops you have added.</p>
        </div>

        <button
          className="add-crop-button"
          onClick={() => navigate("/farmer/crops/add")}
        >
          + Add New Crop
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="crops-error">
          {error}
        </div>
      )}

      {/* No Crops */}
      {!error && crops.length === 0 && (
        <div className="empty-crops">

          <div className="empty-icon">
            🌱
          </div>

          <h2>No Crops Added</h2>

          <p>
            You haven't added any crops yet.
          </p>

          <button
            className="add-crop-button"
            onClick={() => navigate("/farmer/crops/add")}
          >
            + Add Your First Crop
          </button>

        </div>
      )}

      {/* Crop Cards */}
      <div className="crops-grid">

        {crops.map((crop) => (

          <div
            className="crop-card"
            key={crop.id}
          >

            <div className="crop-card-icon">
              🌱
            </div>

            <div className="crop-card-content">

              <div className="crop-card-top">

                <h2>
                  {crop.cropName}
                </h2>

                <span
                  className={
                    crop.available
                      ? "crop-status available"
                      : "crop-status unavailable"
                  }
                >
                  {crop.available
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

              <p className="crop-category">
                {crop.category}
              </p>

              <div className="crop-info">

                <div>
                  <span>Quantity</span>

                  <strong>
                    {crop.quantity} {crop.unit}
                  </strong>
                </div>

                <div>
                  <span>Price</span>

                  <strong>
                    ₹{crop.pricePerUnit} / {crop.unit}
                  </strong>
                </div>

              </div>

              {crop.description && (
                <p className="crop-description">
                  {crop.description}
                </p>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Crops;