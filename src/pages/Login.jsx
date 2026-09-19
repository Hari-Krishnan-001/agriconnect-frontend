import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(email, password);

      console.log("Logged in user:", user);

      // -------------------------------------------------
      // ROLE BASED REDIRECTION
      // -------------------------------------------------

      if (user.role === "FARMER") {
        navigate("/farmer/dashboard");
      } else if (user.role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (user.role === "BUSINESS") {
        navigate("/business/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HOME
  // =====================================================

  const goHome = () => {
    navigate("/");
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const goToRegister = () => {
    navigate("/register");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="login-page">

      {/* =================================================
          BACKGROUND OVERLAY
      ================================================= */}

      <div className="login-background-overlay"></div>


      {/* =================================================
          HOME BUTTON
      ================================================= */}

      <button
        type="button"
        className="login-home-button"
        onClick={goHome}
        aria-label="Go to home page"
        title="Home"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 10.5L12 3L21 10.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M5.5 9.5V21H18.5V9.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M9.5 21V14.5H14.5V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>


      {/* =================================================
          LEFT BRANDING
      ================================================= */}

      <section className="login-branding">

        <div className="login-brand">

          {/* AgriLink sprout logo */}

          <div className="login-brand-icon">

            <svg
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              {/* Stem */}

              <path
                d="M40 66V34"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Left leaf */}

              <path
                d="M39.5 40C27 39 17 31 16 17C30 17 39 24 39.5 40Z"
                fill="currentColor"
              />

              {/* Right leaf */}

              <path
                d="M41 36C43 23 52 15 66 15C65 29 56 38 41 40V36Z"
                fill="currentColor"
              />

              {/* Ground */}

              <path
                d="M27 66H53"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />

            </svg>

          </div>


          {/* Brand name */}

          <h2 className="login-brand-name">
            AgriLink
          </h2>

        </div>


        {/* Brand description */}

        <p className="login-brand-description">
          CONNECTING PEOPLE
          <br />
          GROWING OPPORTUNITIES
        </p>

      </section>


      {/* =================================================
          RIGHT TAGLINE
      ================================================= */}

      <section className="login-tagline">

        <div className="tagline-text">
          <span>Farming</span>
          <span>for a better</span>
          <span>tomorrow</span>
        </div>

        <div className="tagline-decoration">

          <span className="tagline-line"></span>

          <span className="tagline-leaf">
            🌿
          </span>

        </div>

      </section>


      {/* =================================================
          LOGIN CARD
      ================================================= */}

      <section className="login-card">

        {/* =================================================
            CARD LOGO
        ================================================= */}

        <div className="login-logo">

          <span className="login-logo-emoji">
            🌱
          </span>

        </div>


        {/* =================================================
            CARD HEADER
        ================================================= */}

        <div className="login-header">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to your AgriLink account
          </p>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="login-error"
            role="alert"
          >
            {error}
          </div>
        )}


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="login-form-group">

            <label htmlFor="email">
              Email
            </label>

            <div className="login-input-wrapper">

              {/* Email icon */}

              <span className="login-input-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M4 7L12 13L20 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </span>


              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                autoComplete="email"
                required
              />

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="login-form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="login-input-wrapper password-wrapper">

              {/* Lock icon */}

              <span className="login-input-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="11"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

              </span>


              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
              />


              {/* =================================================
                  PASSWORD SHOW / HIDE
              ================================================= */}

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                title={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (

                  /* Eye with slash */

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 3L21 21"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M10.6 10.6C10.25 10.95 10 11.45 10 12C10 13.1 10.9 14 12 14C12.55 14 13.05 13.75 13.4 13.4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M9.88 4.28C10.56 4.1 11.27 4 12 4C18 4 21 12 21 12C20.46 13.44 19.48 15.04 18.16 16.36"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M6.61 6.61C4.45 8.13 3 10.44 3 12C3 12 6 20 12 20C13.57 20 15.03 19.51 16.31 18.69"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                ) : (

                  /* Normal eye */

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 12C2.5 12 6 5 12 5C18 5 21.5 12 21.5 12C21.5 12 18 19 12 19C6 19 2.5 12 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>

                )}

              </button>

            </div>

          </div>


          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >

            {loading ? (
              <span className="login-loading">
                <span className="login-spinner"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}

          </button>

        </form>


        {/* =================================================
            REGISTER
        ================================================= */}

        <div className="login-register">

          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={goToRegister}
          >
            Register
          </button>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="login-footer">

          <span>
            <span className="footer-leaf">
              🌿
            </span>
            Sustainable Agriculture
          </span>

          <span className="footer-divider">
            |
          </span>

          <span>
            Stronger Communities
          </span>

        </div>

      </section>

    </main>
  );
}

export default Login;