import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/cropDetails.css";

function CropDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [crop, setCrop] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get crop from backend
  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/api/crops/${id}`);

      setCrop(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load crop details."
      );
    } finally {
      setLoading(false);
    }
  };

  // Quantity change
  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
      return;
    }

    const numberValue = Number(value);

    if (
      numberValue >= 0 &&
      numberValue <= crop.quantity
    ) {
      setQuantity(value);
    }
  };

  // Calculate total price
  const totalPrice = quantity
    ? Number(quantity) * crop.pricePerUnit
    : 0;

  // Place order
  const handlePlaceOrder = () => {
    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    alert(
      `Order ready!\n\n` +
      `Crop: ${crop.cropName}\n` +
      `Quantity: ${quantity} ${crop.unit}\n` +
      `Price: ₹${crop.pricePerUnit} / ${crop.unit}\n` +
      `Total Price: ₹${totalPrice}`
    );
  };

  // Crop emoji
  const getCropEmoji = (cropName) => {
    const name = cropName.toLowerCase();

    if (name.includes("tomato")) return "🍅";
    if (name.includes("potato")) return "🥔";
    if (name.includes("onion")) return "🧅";
    if (name.includes("cabbage")) return "🥬";
    if (name.includes("carrot")) return "🥕";
    if (name.includes("chilli")) return "🌶️";
    if (name.includes("pepper")) return "🌶️";
    if (name.includes("corn")) return "🌽";
    if (name.includes("banana")) return "🍌";
    if (name.includes("apple")) return "🍎";
    if (name.includes("mango")) return "🥭";
    if (name.includes("orange")) return "🍊";
    if (name.includes("grape")) return "🍇";
    if (name.includes("watermelon")) return "🍉";

    return "🌱";
  };

  // Loading
  if (loading) {
    return (
      <div className="crop-details-page">

        <div className="crop-details-container">

          <div className="crop-details-card">
            <div className="crop-details-info">
              <h1>Loading Crop...</h1>
              <p>
                Please wait while we load the crop details.
              </p>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // Error
  if (error || !crop) {
    return (
      <div className="crop-details-page">

        <div className="crop-details-container">

          <button
            className="back-button"
            onClick={() => navigate("/marketplace")}
          >
            ← Back to Marketplace
          </button>

          <div className="crop-details-card">

            <div className="crop-details-info">

              <h1>Something went wrong</h1>

              <p className="details-description">
                {error || "Crop not found."}
              </p>

              <button
                className="place-order-button"
                onClick={fetchCrop}
              >
                Try Again
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="crop-details-page">

      <div className="crop-details-container">

        {/* Back Button */}

        <button
          className="back-button"
          onClick={() => navigate("/marketplace")}
        >
          ← Back to Marketplace
        </button>


        {/* Crop Information */}

        <div className="crop-details-card">

          {/* Crop Image */}

          <div className="crop-details-image">
            {getCropEmoji(crop.cropName)}
          </div>


          {/* Crop Details */}

          <div className="crop-details-info">

            <span className="details-badge">
              {crop.available
                ? "Fresh Crop"
                : "Currently Unavailable"}
            </span>


            <h1>
              {crop.cropName}
            </h1>


            <p className="details-description">
              {crop.description ||
                `Fresh ${crop.cropName} directly from the farmer.`}
            </p>


            {/* Price */}

            <div className="details-price">

              ₹{crop.pricePerUnit}

              <span>
                {" "}
                / {crop.unit}
              </span>

            </div>


            {/* Information */}

            <div className="details-information">

              <div>

                <span>
                  Available Quantity
                </span>

                <strong>
                  {crop.quantity} {crop.unit}
                </strong>

              </div>


              <div>

                <span>
                  Farmer
                </span>

                <strong>
                  {crop.farmerName || "Farmer"}
                </strong>

              </div>


              <div>

                <span>
                  Category
                </span>

                <strong>
                  {crop.category}
                </strong>

              </div>


              <div>

                <span>
                  Contact
                </span>

                <strong>
                  {crop.farmerEmail || "Not available"}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* Order Section */}

        <div className="place-order-card">

          <div>

            <h2>
              Place Order
            </h2>

            <p>
              Enter the quantity you want to purchase.
            </p>

            <p>
              Maximum available quantity:{" "}
              <strong>
                {crop.quantity} {crop.unit}
              </strong>
            </p>

          </div>


          <div className="order-form">

            <label htmlFor="quantity">
              Quantity ({crop.unit})
            </label>


            <input
              id="quantity"
              type="number"
              min="1"
              max={crop.quantity}
              step="0.01"
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleQuantityChange}
              disabled={!crop.available}
            />


            {/* Total */}

            <div className="order-total">

              <span>
                Total Price
              </span>

              <strong>
                ₹{totalPrice}
              </strong>

            </div>


            {/* Order Button */}

            <button
              className="place-order-button"
              onClick={handlePlaceOrder}
              disabled={!crop.available}
            >
              {crop.available
                ? "Place Order"
                : "Crop Unavailable"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CropDetails;