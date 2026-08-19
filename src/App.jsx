import Navbar from "./components/navbar/Navbar";
import FarmerDashboard from "./pages/FarmerDashboard";
import "./styles/sidebar.css";

import "./styles/navbar.css";
import "./styles/landing.css";

function App() {
  return (
    <>
      <Navbar />
      <FarmerDashboard />
    </>
  );
}

export default App;