import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/editProject.css";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    solution: "",
    technology: "",
    fundingRequired: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // FETCH PROJECT
  // ========================================

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/api/projects/${id}`
      );

      const project = response.data;

      setFormData({
        title: project.title || "",
        problem: project.problem || "",
        solution: project.solution || "",
        technology: project.technology || "",
        fundingRequired:
          project.fundingRequired ?? "",
        description: project.description || "",
      });
    } catch (err) {
      console.error(
        "Failed to load project:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load project."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // UPDATE PROJECT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const requestData = {
        title: formData.title.trim(),
        problem: formData.problem.trim(),
        solution: formData.solution.trim(),
        technology: formData.technology.trim(),
        fundingRequired:
          formData.fundingRequired === ""
            ? null
            : Number(formData.fundingRequired),
        description: formData.description.trim(),
      };

      const response = await api.put(
        `/api/projects/${id}`,
        requestData
      );

      console.log(
        "Project updated:",
        response.data
      );

      navigate(`/projects/${id}`);
    } catch (err) {
      console.error(
        "Failed to update project:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="edit-project-layout">

        <Sidebar />

        <main className="edit-project-page">

          <div className="edit-project-loading">

            <div className="edit-project-loading-icon">
              ✏️
            </div>

            <h2>
              Loading Project...
            </h2>

            <p>
              Please wait while we load the project.
            </p>

          </div>

        </main>

      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error && !formData.title) {
    return (
      <div className="edit-project-layout">

        <Sidebar />

        <main className="edit-project-page">

          <div className="edit-project-error-page">

            <div>
              ⚠️
            </div>

            <h2>
              Unable to Load Project
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={() =>
                navigate(`/projects/${id}`)
              }
            >
              ← Back to Project
            </button>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="edit-project-layout">

      <Sidebar />

      <main className="edit-project-page">

        {/* =================================
            HEADER
        ================================= */}

        <div className="edit-project-header">

          <div>

            <p className="edit-project-label">
              Student Projects
            </p>

            <h1>
              Edit Project
            </h1>

            <p>
              Update the information of your
              agricultural project.
            </p>

          </div>

          <button
            type="button"
            className="edit-project-back-button"
            onClick={() =>
              navigate(`/projects/${id}`)
            }
          >
            ← Back to Project
          </button>

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div className="edit-project-error">
            {error}
          </div>
        )}


        {/* =================================
            FORM
        ================================= */}

        <form
          className="edit-project-card"
          onSubmit={handleSubmit}
        >

          <div className="edit-project-card-header">

            <h2>
              Project Information
            </h2>

            <p>
              Make your changes and save the
              updated project.
            </p>

          </div>


          {/* Title */}

          <div className="edit-project-form-group">

            <label htmlFor="title">
              Project Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* Problem */}

          <div className="edit-project-form-group">

            <label htmlFor="problem">
              Problem
            </label>

            <textarea
              id="problem"
              name="problem"
              rows="5"
              placeholder="Describe the agricultural problem"
              value={formData.problem}
              onChange={handleChange}
              required
            />

          </div>


          {/* Solution */}

          <div className="edit-project-form-group">

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

          <div className="edit-project-form-group">

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

          <div className="edit-project-form-group">

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

          <div className="edit-project-form-group">

            <label htmlFor="description">
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Give a brief description"
              value={formData.description}
              onChange={handleChange}
            />

          </div>


          {/* ACTIONS */}

          <div className="edit-project-actions">

            <button
              type="button"
              className="edit-project-cancel-button"
              onClick={() =>
                navigate(`/projects/${id}`)
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-project-submit-button"
              disabled={saving}
            >
              {saving
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default EditProject;