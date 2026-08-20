import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import "./styles/navbar.css";
import "./styles/landing.css";
import "./styles/sidebar.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;