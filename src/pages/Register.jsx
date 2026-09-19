import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // REGISTER
  // ========================================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.role) {
      setError("Please select your account type.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/users/register", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });

      console.log("Registration successful:", response.data);

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // SVG ICONS
  // ========================================

  const HomeIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="register-icon-svg"
      aria-hidden="true"
    >
      <path
        d="M3 10.5L12 3l9 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 9.5V21h13V9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21v-6h5v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MailIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="register-field-icon"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 7l8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="register-field-icon"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 20c.8-3.5 3.1-5.2 7-5.2s6.2 1.7 7 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="register-field-icon"
      aria-hidden="true"
    >
      <path
        d="M7.2 3.5l2.3 4.1-1.9 1.7c1 2.1 2.7 3.8 4.8 4.8l1.7-1.9 4.1 2.3c.6.3.8 1 .6 1.6l-.8 2.1c-.2.6-.8 1-1.4 1C9.8 19.2 4.8 14.2 4.8 7.4c0-.6.4-1.2 1-1.4l2.1-.8c.6-.2 1.3 0 1.6.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LockIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="register-field-icon"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7a4 4 0 018 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );

  const EyeIcon = ({ open }) => (
    <svg
      viewBox="0 0 24 24"
      className="register-eye-icon"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path
            d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </>
      ) : (
        <>
          <path
            d="M3 3l18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10.6 6.2A10.7 10.7 0 0112 6c6 0 9.5 6 9.5 6a16 16 0 01-3.1 3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6.2 6.7C3.9 8.2 2.5 12 2.5 12s3.5 6 9.5 6c1.3 0 2.5-.3 3.5-.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );

  return (
    <div className="register-page">

      {/* ========================================
          BACKGROUND OVERLAY
      ======================================== */}

      <div className="register-background-overlay"></div>

      {/* ========================================
          HOME BUTTON
      ======================================== */}

      <button
        type="button"
        className="register-home-button"
        onClick={() => navigate("/")}
        aria-label="Go to home page"
        title="Home"
      >
        <HomeIcon />
      </button>

      {/* ========================================
          LEFT BRANDING
      ======================================== */}

      <section className="register-branding">

        <div className="register-brand-logo">
          <span className="brand-leaf brand-leaf-left"></span>
          <span className="brand-leaf brand-leaf-right"></span>
          <span className="brand-stem"></span>
          <span className="brand-ground"></span>
        </div>

        <div>
          <h2>AgriLink</h2>

          <p>
            CONNECTING PEOPLE
            <br />
            GROWING OPPORTUNITIES
          </p>
        </div>

      </section>

      {/* ========================================
          RIGHT SLOGAN
      ======================================== */}

      <section className="register-slogan">

        <div className="slogan-text">
          Farming
          <br />
          for a better
          <br />
          tomorrow
        </div>

        <div className="slogan-leaf">
          🌿
        </div>

        <div className="slogan-line"></div>

      </section>

      {/* ========================================
          REGISTER CARD
      ======================================== */}

      <div className="register-card">

        {/* Logo */}

        <div className="register-logo">
          🌱
        </div>

        {/* Heading */}

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join the AgriLink community
        </p>

        {/* Error */}

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="register-success">
            {success}
          </div>
        )}

        {/* ========================================
            FORM
        ======================================== */}

        <form onSubmit={handleRegister}>

          {/* Full Name */}

          <div className="register-form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <div className="register-input-wrapper">

              <UserIcon />

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </div>

          </div>

          {/* Email */}

          <div className="register-form-group">

            <label htmlFor="email">
              Email
            </label>

            <div className="register-input-wrapper">

              <MailIcon />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>

          </div>

          {/* Phone */}

          <div className="register-form-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <div className="register-input-wrapper">

              <PhoneIcon />

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />

            </div>

          </div>

          {/* Account Type */}

          <div className="register-form-group">

            <label htmlFor="role">
              Account Type
            </label>

            <div className="register-select-wrapper">

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select account type
                </option>

                <option value="FARMER">
                  👨‍🌾 Farmer
                </option>

                <option value="STUDENT">
                  🎓 Student
                </option>

                <option value="BUSINESS">
                  🏢 Business
                </option>
              </select>

            </div>

          </div>

          {/* Password */}

          <div className="register-form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="register-input-wrapper">

              <LockIcon />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="6"
                required
              />

              <button
                type="button"
                className="register-eye-button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                <EyeIcon open={showPassword} />
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="register-form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="register-input-wrapper">

              <LockIcon />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="6"
                required
              />

              <button
                type="button"
                className="register-eye-button"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <EyeIcon open={showConfirmPassword} />
              </button>

            </div>

          </div>

          {/* Register Button */}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* ========================================
            LOGIN LINK
        ======================================== */}

        <p className="register-login">

          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </p>

        {/* ========================================
            FOOTER
        ======================================== */}

        <div className="register-footer">

          <span>
            🌿 Sustainable Agriculture
          </span>

          <span className="footer-divider">
            |
          </span>

          <span>
            Stronger Communities
          </span>

        </div>

      </div>

    </div>
  );
}

export default Register;