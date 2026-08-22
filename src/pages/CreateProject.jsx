import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/createProject.css";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    solution: "",
    technology: "",
    fundingRequired: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/api/projects", {
        title: formData.title.trim(),
        problem: formData.problem.trim(),
        solution: formData.solution.trim(),
        technology: formData.technology.trim(),
        fundingRequired:
          formData.fundingRequired === ""
            ? null
            : Number(formData.fundingRequired),
        description: formData.description.trim(),
      });

      console.log("Project created:", response.data);

      navigate(`/projects/${response.data.id}`);
    } catch (err) {
      console.error("Failed to create project:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-layout">

      <Sidebar />

      <main className="create-project-page">

        {/* Header */}

        <div className="create-project-header">

          <div>
            <p className="create-project-label">
              Student Projects
            </p>

            <h1>
              Create Project
            </h1>

            <p>
              Share your agricultural idea with the
              AgriConnect community.
            </p>
          </div>

          <button
            type="button"
            className="create-project-back-button"
            onClick={() => navigate("/student/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>


        {/* Error */}

        {error && (
          <div className="create-project-error">
            {error}
          </div>
        )}


        {/* Form */}

        <form
          className="create-project-card"
          onSubmit={handleSubmit}
        >

          <div className="create-project-card-header">

            <h2>
              Project Information
            </h2>

            <p>
              Provide the details of your agricultural
              project.
            </p>

          </div>


          {/* Title */}

          <div className="create-project-form-group">

            <label htmlFor="title">
              Project Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter your project title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* Problem */}

          <div className="create-project-form-group">

            <label htmlFor="problem">
              Problem
            </label>

            <textarea
              id="problem"
              name="problem"
              rows="5"
              placeholder="Describe the agricultural problem you are solving"
              value={formData.problem}
              onChange={handleChange}
              required
            />

          </div>


          {/* Solution */}

          <div className="create-project-form-group">

            <label htmlFor="solution">
              Solution
            </label>

            <textarea
              id="solution"
              name="solution"
              rows="5"
              placeholder="Explain your proposed solution"
              value={formData.solution}
              onChange={handleChange}
              required
            />

          </div>


          {/* Technology */}

          <div className="create-project-form-group">

            <label htmlFor="technology">
              Technology
            </label>

            <input
              id="technology"
              name="technology"
              type="text"
              placeholder="Example: Java, React, IoT"
              value={formData.technology}
              onChange={handleChange}
              required
            />

          </div>


          {/* Funding */}

          <div className="create-project-form-group">

            <label htmlFor="fundingRequired">
              Funding Required (₹)
            </label>

            <input
              id="fundingRequired"
              name="fundingRequired"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter required funding"
              value={formData.fundingRequired}
              onChange={handleChange}
            />

          </div>


          {/* Description */}

          <div className="create-project-form-group">

            <label htmlFor="description">
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Give a brief description of your project"
              value={formData.description}
              onChange={handleChange}
            />

          </div>


          {/* Actions */}

          <div className="create-project-actions">

            <button
              type="button"
              className="create-project-cancel-button"
              onClick={() =>
                navigate("/student/dashboard")
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-project-submit-button"
              disabled={loading}
            >
              {loading
                ? "Creating Project..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreateProject;