import { useEffect, useState } from "react";
import api from "../../services/api";
import "./CropOverview.css";

function CropOverview() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await api.get("/api/crops/my-crops");

      setCrops(response.data);
    } catch (error) {
      console.error(
        "Failed to load crop overview:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getCropEmoji = (cropName) => {
    const name = cropName?.toLowerCase() || "";

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

  if (loading) {
    return (
      <div className="crop-overview">
        <h2>Crop Overview</h2>
        <p>Loading crops...</p>
      </div>
    );
  }

  return (
    <div className="crop-overview">

      <h2>Crop Overview</h2>

      {crops.length === 0 ? (
        <p>No crops added yet.</p>
      ) : (
        <ul>

          {crops.map((crop) => (

            <li key={crop.id}>

              <span>
                {getCropEmoji(crop.cropName)}
              </span>

              <span>
                {crop.cropName}
              </span>

              <strong>
                ({crop.quantity} {crop.unit})
              </strong>

            </li>

          ))}

        </ul>
      )}

    </div>
  );
}

export default CropOverview;