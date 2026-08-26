import { useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("agriconnect_dark_mode") === "true";
  });

  const changeTheme = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    localStorage.setItem(
      "agriconnect_dark_mode",
      String(nextMode)
    );

    window.dispatchEvent(
      new CustomEvent("agriconnect-theme-change", {
        detail: nextMode,
      })
    );
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <button
        className="navbar-logo"
        onClick={() => goTo("/")}
        aria-label="AgriConnect Home"
      >
        <span className="navbar-logo-mark">
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M39.8 7.4C25.6 7.8 14.8 12.5 10.3 21.2c-3.1 6-1.7 12.9 3.4 16.7 3.6 2.7 8.4 2.5 11.8-.2-2.9-.2-5.8-1.5-7.6-4.2-2.3-3.5-1.9-8.3 1.2-11.2 3.7-3.5 10.3-4.6 18.4-3.9.7-3.3 1.4-6.7 2.3-11z"
              fill="currentColor"
            />

            <path
              d="M14.5 40.5c6.2-8.4 13.5-15.1 23-20.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="navbar-logo-text">
          Agri<span>Connect</span>
        </span>
      </button>

      {/* CENTER NAVIGATION */}
      <div className="navbar-center">

        <button
          className="navbar-link active"
          onClick={() => goTo("/")}
        >
          Home
        </button>

        <button
          className="navbar-link"
          onClick={() => scrollToSection("about-section")}
        >
          About
        </button>

        <button
          className="navbar-link"
          onClick={() => scrollToSection("features-section")}
        >
          Features
        </button>

        <button
          className="navbar-link"
          onClick={() =>
            scrollToSection("how-it-works-section")
          }
        >
          Community
        </button>

        <button
          className="navbar-link"
          onClick={() => scrollToSection("resources-section")}
        >
          Resources
        </button>

        <button
          className="navbar-link"
          onClick={() => scrollToSection("contact-section")}
        >
          Contact
        </button>

      </div>

      {/* RIGHT ACTIONS */}
      <div className="navbar-actions">

        <button
          className="navbar-theme-button"
          onClick={changeTheme}
          aria-label={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {darkMode ? "☀" : "☾"}
        </button>

        <button
          className="navbar-login-button"
          onClick={() => goTo("/login")}
        >
          Login
        </button>

        <button
          className="navbar-get-started"
          onClick={() => goTo("/register")}
        >
          Get Started
        </button>

      </div>

    </nav>
  );
}

export default Navbar;