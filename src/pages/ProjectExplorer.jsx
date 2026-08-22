import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/projectExplorer.css";

function ProjectExplorer() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/projects");

      setProjects(response.data || []);
    } catch (err) {
      console.error("Failed to load projects:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "project-status open";

      case "CLOSED":
        return "project-status closed";

      case "FUNDED":
        return "project-status funded";

      default:
        return "project-status open";
    }
  };

  if (loading) {
    return (
      <div className="project-explorer-layout">

        <Sidebar />

        <main className="project-explorer-page">

          <div className="project-explorer-loading">

            <div className="loading-icon">
              📁
            </div>

            <h2>
              Loading Projects...
            </h2>

            <p>
              Please wait while we load agricultural projects.
            </p>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="project-explorer-layout">

      <Sidebar />

      <main className="project-explorer-page">

        {/* Header */}

        <div className="project-explorer-header">

          <div>

            <p className="project-explorer-label">
              Agricultural Innovation
            </p>

            <h1>
              Project Explorer
            </h1>

            <p>
              Explore innovative agricultural projects
              created by students.
            </p>

          </div>

          <button
            className="create-project-button"
            onClick={() =>
              navigate("/projects/create")
            }
          >
            + Create Project
          </button>

        </div>


        {/* Error */}

        {error && (

          <div className="project-explorer-error">

            <span>
              {error}
            </span>

            <button
              onClick={fetchProjects}
            >
              Try Again
            </button>

          </div>

        )}


        {/* Empty */}

        {!error && projects.length === 0 && (

          <div className="project-explorer-empty">

            <div className="empty-project-icon">
              📁
            </div>

            <h2>
              No Projects Found
            </h2>

            <p>
              There are currently no agricultural
              projects available.
            </p>

            <button
              onClick={() =>
                navigate("/projects/create")
              }
            >
              Create First Project
            </button>

          </div>

        )}


        {/* Projects */}

        {!error && projects.length > 0 && (

          <div className="project-explorer-grid">

            {projects.map((project) => (

              <div
                className="project-explorer-card"
                key={project.id}
              >

                {/* Card Header */}

                <div className="project-card-top">

                  <div className="project-card-icon">
                    🌱
                  </div>

                  <span
                    className={getStatusClass(
                      project.status
                    )}
                  >
                    {project.status || "OPEN"}
                  </span>

                </div>


                {/* Title */}

                <h2>
                  {project.title}
                </h2>

                <p className="project-number">
                  Project #{project.id}
                </p>


                {/* Description */}

                <p className="project-card-description">

                  {project.description ||
                    project.solution ||
                    "No description available."}

                </p>


                {/* Student */}

                <div className="project-student">

                  <span>
                    Created by
                  </span>

                  <strong>
                    {project.studentName ||
                      "Student"}
                  </strong>

                </div>


                {/* Technology */}

                <div className="project-card-info">

                  <div>

                    <span>
                      Technology
                    </span>

                    <strong>
                      {project.technology ||
                        "Not specified"}
                    </strong>

                  </div>

                  <div>

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

                </div>


                {/* Footer */}

                <div className="project-card-footer">

                  <span>

                    {project.createdAt
                      ? new Date(
                          project.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "N/A"}

                  </span>


                  <button
                    onClick={() =>
                      navigate(
                        `/projects/${project.id}`
                      )
                    }
                  >
                    View Project →
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default ProjectExplorer;