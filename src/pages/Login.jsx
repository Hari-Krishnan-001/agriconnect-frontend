import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(email, password);

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
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          🌱
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your AgriConnect account
        </p>


        {error && (
          <div className="login-error">
            {error}
          </div>
        )}


        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="login-register">

          Don't have an account?

          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </p>

      </div>

    </div>
  );
}

export default Login;