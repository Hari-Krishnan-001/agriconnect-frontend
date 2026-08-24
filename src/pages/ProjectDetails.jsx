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

  // ========================================
  // LIKE STATE
  // ========================================

  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);


  // ========================================
  // PROJECT CHAT STATE
  // ========================================

  const [openingChat, setOpeningChat] = useState(false);


  // ========================================
  // LOAD PROJECT
  // ========================================

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

      // ------------------------------------
      // GET PROJECT
      // ------------------------------------

      const response = await api.get(
        `/api/projects/${id}`
      );

      setProject(response.data);


      // ------------------------------------
      // ADD VIEW
      // ------------------------------------

      try {
        const viewResponse = await api.post(
          `/api/projects/${id}/view`
        );

        if (viewResponse.data) {
          setProject(viewResponse.data);
        }
      } catch (viewError) {
        console.error(
          "Failed to record project view:",
          viewError
        );

        // View failure should NOT prevent
        // the project from being displayed.
      }


      // ------------------------------------
      // CHECK LIKE STATUS
      // ------------------------------------

      try {
        const likedResponse = await api.get(
          `/api/projects/${id}/liked`
        );

        setLiked(
          Boolean(likedResponse.data)
        );
      } catch (likeStatusError) {
        console.error(
          "Failed to check like status:",
          likeStatusError
        );

        setLiked(false);
      }

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
  // LIKE / UNLIKE PROJECT
  // ========================================

  const handleLike = async () => {
    if (liking) {
      return;
    }

    try {
      setLiking(true);
      setError("");

      const response = await api.post(
        `/api/projects/${id}/like`
      );

      // Backend returns updated project
      if (response.data) {
        setProject(response.data);
      }

      // Toggle local state
      setLiked((previousLiked) =>
        !previousLiked
      );

    } catch (err) {
      console.error(
        "Failed to like project:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update project like."
      );
    } finally {
      setLiking(false);
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

      alert(
        "Project deleted successfully."
      );

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
  // OPEN PROJECT CHAT
  // ========================================

  const handleOpenProjectChat = async () => {
    if (openingChat) {
      return;
    }

    try {
      setOpeningChat(true);
      setError("");

      /*
       * The backend will:
       *
       * Business:
       *   Create the chat if it does not exist.
       *
       * Student owner:
       *   Open an existing business chat.
       *
       * Authorization is enforced by the backend.
       */

      await api.get(
        `/api/project-chats/project/${id}`
      );

      navigate(
        `/project-chat/${id}`
      );

    } catch (err) {
      console.error(
        "Failed to open project chat:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to open project chat."
      );

    } finally {
      setOpeningChat(false);
    }
  };


  // ========================================
  // FORMAT MONEY
  // ========================================

  const formatMoney = (amount) => {
    return Number(
      amount || 0
    ).toLocaleString("en-IN");
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
              type="button"
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


  // ========================================
  // PROJECT PAGE
  // ========================================

  return (
    <div className="project-details-layout">

      <Sidebar />

      <main className="project-details-page">


        {/* =================================
            TOP NAVIGATION
        ================================= */}

        <div className="project-details-topbar">

          <button
            type="button"
            className="project-details-back-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            ← Back to Projects
          </button>

        </div>


        {/* =================================
            INLINE ERROR
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
            PROJECT STATISTICS
        ================================= */}

        <section className="project-details-statistics">

          {/* Views */}

          <div className="project-stat-card">

            <div className="project-stat-icon">
              👁️
            </div>

            <div>

              <span>
                Views
              </span>

              <strong>
                {project.views ?? 0}
              </strong>

            </div>

          </div>


          {/* Likes */}

          <div className="project-stat-card">

            <div className="project-stat-icon">
              ❤️
            </div>

            <div>

              <span>
                Likes
              </span>

              <strong>
                {project.likes ?? 0}
              </strong>

            </div>

          </div>


          {/* Like Button */}

          <button
            type="button"
            className={
              liked
                ? "project-like-button liked"
                : "project-like-button"
            }
            onClick={handleLike}
            disabled={liking}
          >
            {liking
              ? "Updating..."
              : liked
              ? "❤️ Liked"
              : "🤍 Like Project"}
          </button>

        </section>


        {/* =================================
            PROJECT INFORMATION
        ================================= */}

        <section className="project-details-grid">

          {/* Problem */}

          <div className="project-details-card">

            <h2>
              Problem
            </h2>

            <p>
              {project.problem ||
                "No problem statement provided."}
            </p>

          </div>


          {/* Solution */}

          <div className="project-details-card">

            <h2>
              Solution
            </h2>

            <p>
              {project.solution ||
                "No solution details provided."}
            </p>

          </div>


          {/* Description */}

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

          {/* Created By */}

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


          {/* Technology */}

          <div className="project-meta-card">

            <span>
              Technology
            </span>

            <strong>
              {project.technology ||
                "Not specified"}
            </strong>

          </div>


          {/* Funding */}

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


          {/* Created */}

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


          {/* Explore */}

          <button
            type="button"
            className="project-details-secondary-button"
            onClick={() =>
              navigate("/projects")
            }
          >
            Explore More Projects
          </button>


          {/* =================================
              PROJECT CHAT
          ================================= */}

          {!project.owner && (
            <button
              type="button"
              className="project-details-chat-button"
              onClick={handleOpenProjectChat}
              disabled={openingChat}
            >
              {openingChat
                ? "Opening Chat..."
                : "💬 Contact Student"}
            </button>
          )}


          {/* =================================
              EDIT - OWNER ONLY
          ================================= */}

          {project.owner && (
            <button
              type="button"
              className="project-details-edit-button"
              onClick={() =>
                navigate(
                  `/projects/edit/${project.id}`
                )
              }
            >
              ✏️ Edit Project
            </button>
          )}


          {/* =================================
              DELETE - OWNER ONLY
          ================================= */}

          {project.owner && (
            <button
              type="button"
              className="project-details-delete-button"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting
                ? "Deleting..."
                : "🗑️ Delete Project"}
            </button>
          )}


          {/* Dashboard */}

          <button
            type="button"
            className="project-details-primary-button"
            onClick={() =>
              navigate(
                "/student/dashboard"
              )
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