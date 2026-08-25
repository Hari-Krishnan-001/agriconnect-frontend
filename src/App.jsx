import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import { SidebarProvider } from "./components/sidebar/SidebarContext";

import "./styles/navbar.css";
import "./styles/landing.css";
import "./styles/sidebar.css";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;