import { useNavigate } from "react-router-dom";
import "./HelpBanner.css";

function HelpBanner() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/knowledge");
  };

  return (
    <div className="help-banner">

      <div>
        <h2>Need Help With Farming?</h2>

        <p>
          Explore our farming techniques and pesticide guides.
        </p>
      </div>

      <button onClick={handleExplore}>
        Explore
      </button>

    </div>
  );
}

export default HelpBanner;