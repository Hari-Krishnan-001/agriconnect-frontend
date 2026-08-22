import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/addCrop.css";

function EditCrop() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    cropName: "",
    category: "",
    quantity: "",
    unit: "kg",
    pricePerUnit: "",
    description: "",
    harvestDate: "",
    available: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load crop
  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      const response = await api.get(`/api/crops/${id}`);

      const crop = response.data;

      setFormData({
        cropName: crop.cropName || "",
        category: crop.category || "",
        quantity: crop.quantity || "",
        unit: crop.unit || "kg",
        pricePerUnit: crop.pricePerUnit || "",
        description: crop.description || "",
        harvestDate: crop.harvestDate
          ? crop.harvestDate.split("T")[0]
          : "",
        available:
          crop.available !== undefined
            ? crop.available
            : true,
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load crop."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      await api.put(`/api/crops/${id}`, {
        cropName: formData.cropName,
        category: formData.category,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        pricePerUnit: Number(formData.pricePerUnit),
        description: formData.description,
        harvestDate: formData.harvestDate
          ? `${formData.harvestDate}T00:00:00`
          : null,
        available: formData.available,
      });

      navigate("/farmer/crops");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to update crop."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="add-crop-page">
        <div className="add-crop-container">
          <div className="add-crop-card">
            <h1>Loading Crop...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-crop-page">

      <div className="add-crop-container">

        <button
          className="back-button"
          onClick={() => navigate("/farmer/crops")}
        >
          ← Back to My Crops
        </button>

        <div className="add-crop-card">

          <div className="add-crop-header">

            <div className="add-crop-icon">
              ✏️
            </div>

            <h1>Edit Crop</h1>

            <p>
              Update your crop information.
            </p>

          </div>

          {error && (
            <div className="add-crop-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">

                <label>Crop Name</label>

                <input
                  type="text"
                  name="cropName"
                  placeholder="e.g. Tomato"
                  value={formData.cropName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Vegetable">
                    Vegetable
                  </option>

                  <option value="Fruit">
                    Fruit
                  </option>

                  <option value="Grain">
                    Grain
                  </option>

                  <option value="Pulse">
                    Pulse
                  </option>

                  <option value="Spice">
                    Spice
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  min="0"
                  step="0.01"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>Unit</label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="kg">
                    Kilogram (kg)
                  </option>

                  <option value="quintal">
                    Quintal
                  </option>

                  <option value="ton">
                    Ton
                  </option>

                  <option value="piece">
                    Piece
                  </option>

                  <option value="litre">
                    Litre
                  </option>

                </select>

              </div>

            </div>

            <div className="form-group">

              <label>Price per Unit (₹)</label>

              <input
                type="number"
                name="pricePerUnit"
                min="0"
                step="0.01"
                value={formData.pricePerUnit}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Harvest Date</label>

              <input
                type="date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                name="description"
                rows="4"
                placeholder="Describe your crop..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            <label className="availability-option">

              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />

              <span>
                Make this crop available for purchase
              </span>

            </label>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/farmer/crops")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-crop-button"
                disabled={saving}
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditCrop;