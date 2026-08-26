import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { SidebarProvider } from "./components/sidebar/SidebarContext";

import "./styles/navbar.css";
import "./styles/landing.css";
import "./styles/sidebar.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("agriconnect_dark_mode") === "true";
  });

  useEffect(() => {
    const applyTheme = (enabled) => {
      const root = document.documentElement;
      const body = document.body;

      if (enabled) {
        root.classList.add("agriconnect-dark-mode");
        body.classList.add("agriconnect-dark-mode");
      } else {
        root.classList.remove("agriconnect-dark-mode");
        body.classList.remove("agriconnect-dark-mode");
      }
    };

    applyTheme(darkMode);

    const handleThemeChange = (event) => {
      const enabled = Boolean(event.detail);

      setDarkMode(enabled);

      localStorage.setItem(
        "agriconnect_dark_mode",
        String(enabled)
      );

      applyTheme(enabled);
    };

    window.addEventListener(
      "agriconnect-theme-change",
      handleThemeChange
    );

    return () => {
      window.removeEventListener(
        "agriconnect-theme-change",
        handleThemeChange
      );
    };
  }, [darkMode]);

  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;