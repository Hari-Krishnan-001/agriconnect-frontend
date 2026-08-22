import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/projectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  // ========================================
  // FETCH PROJECT
  // ========================================

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/api/projects/${id}`
      );

      setProject(response.data);
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
  // DELETE PROJECT
  // ========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await api.delete(
        `/api/projects/${id}`
      );

      alert("Project deleted successfully.");

      navigate("/projects");
    } catch (err) {
      console.error(
        "Failed to delete project:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete project."
      );

      setDeleting(false);
    }
  };

  // ========================================
  // FORMAT MONEY
  // ========================================

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  // ========================================
  // STATUS CLASS
  // ========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "project-details-status open";

      case "CLOSED":
        return "project-details-status closed";

      case "FUNDED":
        return "project-details-status funded";

      default:
        return "project-details-status open";
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="project-details-layout">

        <Sidebar />

        <main className="project-details-page">

          <div className="project-details-loading">

            <div className="project-details-loading-icon">
              📁
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

  if (error && !project) {
    return (
      <div className="project-details-layout">

        <Sidebar />

        <main className="project-details-page">

          <div className="project-details-error-page">

            <div className="project-details-error-icon">
              ⚠️
            </div>

            <h2>
              Project Not Found
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={() =>
                navigate("/projects")
              }
            >
              ← Back to Projects
            </button>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="project-details-layout">

      <Sidebar />

      <main className="project-details-page">

        {/* =================================
            TOP NAVIGATION
        ================================= */}

        <div className="project-details-topbar">

          <button
            className="project-details-back-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            ← Back to Projects
          </button>

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div className="project-details-inline-error">
            {error}
          </div>
        )}


        {/* =================================
            PROJECT HEADER
        ================================= */}

        <section className="project-details-header">

          <div className="project-details-header-main">

            <div className="project-details-icon">
              🌱
            </div>

            <div>

              <p className="project-details-label">
                Agricultural Innovation
              </p>

              <h1>
                {project.title}
              </h1>

              <p className="project-details-id">
                Project #{project.id}
              </p>

            </div>

          </div>


          <span
            className={getStatusClass(
              project.status
            )}
          >
            {project.status || "OPEN"}
          </span>

        </section>


        {/* =================================
            PROJECT INFORMATION
        ================================= */}

        <section className="project-details-grid">

          <div className="project-details-card">

            <h2>
              Problem
            </h2>

            <p>
              {project.problem ||
                "No problem statement provided."}
            </p>

          </div>


          <div className="project-details-card">

            <h2>
              Solution
            </h2>

            <p>
              {project.solution ||
                "No solution details provided."}
            </p>

          </div>


          <div className="project-details-card full-width">

            <h2>
              Project Description
            </h2>

            <p>
              {project.description ||
                "No project description provided."}
            </p>

          </div>

        </section>


        {/* =================================
            PROJECT METADATA
        ================================= */}

        <section className="project-details-meta">

          <div className="project-meta-card">

            <span>
              Created By
            </span>

            <strong>
              {project.studentName ||
                "Student"}
            </strong>

            {project.studentEmail && (
              <small>
                {project.studentEmail}
              </small>
            )}

          </div>


          <div className="project-meta-card">

            <span>
              Technology
            </span>

            <strong>
              {project.technology ||
                "Not specified"}
            </strong>

          </div>


          <div className="project-meta-card">

            <span>
              Funding Required
            </span>

            <strong>
              ₹
              {formatMoney(
                project.fundingRequired
              )}
            </strong>

          </div>


          <div className="project-meta-card">

            <span>
              Created On
            </span>

            <strong>
              {project.createdAt
                ? new Date(
                    project.createdAt
                  ).toLocaleDateString(
                    "en-IN"
                  )
                : "N/A"}
            </strong>

          </div>

        </section>


        {/* =================================
            ACTIONS
        ================================= */}

        <div className="project-details-actions">

          <button
            className="project-details-secondary-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            Explore More Projects
          </button>


          <button
            className="project-details-edit-button"
            onClick={() =>
              navigate(
                `/projects/edit/${project.id}`
              )
            }
          >
            ✏️ Edit Project
          </button>


          <button
            className="project-details-delete-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting
              ? "Deleting..."
              : "🗑️ Delete Project"}
          </button>


          <button
            className="project-details-primary-button"
            onClick={() =>
              navigate("/student/dashboard")
            }
          >
            Go to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default ProjectDetails;