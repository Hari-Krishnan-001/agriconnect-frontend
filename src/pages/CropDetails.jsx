import { useState } from "react";
import "../styles/cropDetails.css";

function CropDetails() {
  const pricePerUnit = 25;
  const availableQuantity = 50;

  const [quantity, setQuantity] = useState("");

  const totalPrice = quantity
    ? Number(quantity) * pricePerUnit
    : 0;

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
      return;
    }

    const numberValue = Number(value);

    if (numberValue >= 0 && numberValue <= availableQuantity) {
      setQuantity(value);
    }
  };

  const handlePlaceOrder = () => {
    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    alert(
      `Order ready!\nQuantity: ${quantity} kg\nTotal Price: ₹${totalPrice}`
    );
  };

  return (
    <div className="crop-details-page">

      <div className="crop-details-container">

        {/* Back Button */}

        <button className="back-button">
          ← Back to Marketplace
        </button>


        {/* Crop Information */}

        <div className="crop-details-card">

          <div className="crop-details-image">
            🍅
          </div>


          <div className="crop-details-info">

            <span className="details-badge">
              Fresh Crop
            </span>

            <h1>Tomato</h1>

            <p className="details-description">
              Fresh and organic tomatoes directly from the farmer.
            </p>


            <div className="details-price">
              ₹{pricePerUnit}
              <span> / kg</span>
            </div>


            <div className="details-information">

              <div>
                <span>Available Quantity</span>
                <strong>{availableQuantity} kg</strong>
              </div>

              <div>
                <span>Farmer</span>
                <strong>Hari Test</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>Kochi, Kerala</strong>
              </div>

              <div>
                <span>Quality</span>
                <strong>100% Organic</strong>
              </div>

            </div>

          </div>

        </div>


        {/* Order Section */}

        <div className="place-order-card">

          <div>

            <h2>Place Order</h2>

            <p>
              Enter the quantity you want to purchase.
            </p>

            <p>
              Maximum available quantity:{" "}
              <strong>{availableQuantity} kg</strong>
            </p>

          </div>


          <div className="order-form">

            <label htmlFor="quantity">
              Quantity (kg)
            </label>

            <input
              id="quantity"
              type="number"
              min="1"
              max={availableQuantity}
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />


            <div className="order-total">

              <span>Total Price</span>

              <strong>
                ₹{totalPrice}
              </strong>

            </div>


            <button
              className="place-order-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CropDetails;