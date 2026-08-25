import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/crops.css";
import Sidebar from "../components/sidebar/Sidebar";

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

  // DELETE CROP
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/crops/${id}`);

      setCrops((prevCrops) =>
        prevCrops.filter((crop) => crop.id !== id)
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to delete crop."
      );
    }
  };

  // TOGGLE AVAILABILITY
  const handleToggleAvailability = async (crop) => {
    try {
      await api.put(`/api/crops/${crop.id}`, {
        cropName: crop.cropName,
        category: crop.category,
        quantity: crop.quantity,
        unit: crop.unit,
        pricePerUnit: crop.pricePerUnit,
        description: crop.description,
        harvestDate: crop.harvestDate,
        available: !crop.available,
      });

      setCrops((prevCrops) =>
        prevCrops.map((item) =>
          item.id === crop.id
            ? {
                ...item,
                available: !item.available,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update crop availability."
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          background: "#f8fafc",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div className="crops-page">
            <h1>My Crops</h1>
            <p>Loading crops...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div className="crops-page">

          {/* Header */}
          <div className="crops-header">

            <div>
              <h1>My Crops</h1>
              <p>Manage the crops you have added.</p>
            </div>

            <button
              className="add-crop-button"
              onClick={() =>
                navigate("/farmer/crops/add")
              }
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
                onClick={() =>
                  navigate("/farmer/crops/add")
                }
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

                  {/* Actions */}
                  <div className="crop-actions">

                    <button
                      className="edit-crop-button"
                      onClick={() =>
                        navigate(
                          `/farmer/crops/edit/${crop.id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="availability-button"
                      onClick={() =>
                        handleToggleAvailability(crop)
                      }
                    >
                      {crop.available
                        ? "Mark Unavailable"
                        : "Mark Available"}
                    </button>

                    <button
                      className="delete-crop-button"
                      onClick={() =>
                        handleDelete(crop.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Crops;