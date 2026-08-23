import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/studentDashboard.css";
import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

function StudentDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // FETCH DASHBOARD DATA
  // ========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [profileResponse, projectsResponse] =
        await Promise.all([
          api.get("/api/student/profile"),
          api.get("/api/projects/my-projects"),
        ]);

      setProfile(profileResponse.data);
      setProjects(projectsResponse.data || []);

    } catch (err) {
      console.error(
        "Failed to load student dashboard:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // STATISTICS
  // ========================================

  const totalProjects = projects.length;

  const totalFundingRequired = projects.reduce(
    (total, project) =>
      total +
      Number(project.fundingRequired || 0),
    0
  );

  const totalViews = projects.reduce(
    (total, project) =>
      total +
      Number(project.views || 0),
    0
  );

  const totalLikes = projects.reduce(
    (total, project) =>
      total +
      Number(project.likes || 0),
    0
  );


  // ========================================
  // FORMAT MONEY
  // ========================================

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };


  // ========================================
  // STATUS
  // ========================================

  const getStatusClass = (status) => {
    switch (status) {

      case "OPEN":
        return "student-project-status open";

      case "CLOSED":
        return "student-project-status closed";

      case "FUNDED":
        return "student-project-status funded";

      default:
        return "student-project-status open";
    }
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="student-dashboard">

        <Sidebar />

        <main className="student-content">

          <div className="student-loading">

            <div className="student-loading-icon">
              🎓
            </div>

            <h2>
              Loading Dashboard...
            </h2>

            <p>
              Please wait while we load your dashboard.
            </p>

          </div>

        </main>

      </div>
    );
  }


  // ========================================
  // MAIN
  // ========================================

  return (
    <div className="student-dashboard">

      <Sidebar />

      <main className="student-content">


        {/* =================================
            HEADER
        ================================= */}

        <div className="student-header">

          <div>

            <p className="welcome-label">
              Student Dashboard
            </p>

            <h1>
              Welcome back,{" "}
              {profile?.fullName || "Student"}!
            </h1>

            <p>
              Manage your projects, explore
              opportunities and collaborate with
              the agricultural community.
            </p>

          </div>


          <button
            className="create-project-btn"
            onClick={() =>
              navigate("/projects/create")
            }
          >
            + Create Project
          </button>

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div className="student-dashboard-error">

            <span>
              {error}
            </span>

            <button
              onClick={fetchDashboardData}
            >
              Try Again
            </button>

          </div>
        )}


        {/* =================================
            STATISTICS
        ================================= */}

        <section className="student-stats">


          {/* My Projects */}

          <div className="student-stat-card">

            <span>
              📁
            </span>

            <div>

              <p>
                My Projects
              </p>

              <h2>
                {totalProjects}
              </h2>

            </div>

          </div>


          {/* Total Views */}

          <div className="student-stat-card">

            <span>
              👁️
            </span>

            <div>

              <p>
                Total Views
              </p>

              <h2>
                {totalViews}
              </h2>

            </div>

          </div>


          {/* Total Likes */}

          <div className="student-stat-card">

            <span>
              ❤️
            </span>

            <div>

              <p>
                Total Likes
              </p>

              <h2>
                {totalLikes}
              </h2>

            </div>

          </div>


          {/* Funding */}

          <div className="student-stat-card">

            <span>
              💰
            </span>

            <div>

              <p>
                Funding Required
              </p>

              <h2>
                ₹
                {formatMoney(
                  totalFundingRequired
                )}
              </h2>

            </div>

          </div>

        </section>


        {/* =================================
            MY PROJECTS
        ================================= */}

        <section className="student-projects">


          <div className="section-heading">

            <div>

              <h2>
                My Projects
              </h2>

              <p>
                Track your agricultural projects
                and their progress.
              </p>

            </div>


            {projects.length > 0 && (

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate("/projects")
                }
              >
                View All
              </button>

            )}

          </div>


          {/* =================================
              EMPTY PROJECTS
          ================================= */}

          {projects.length === 0 && !error && (

            <div className="empty-project">

              <div className="empty-icon">
                📁
              </div>

              <h3>
                No projects yet
              </h3>

              <p>
                Start your first agricultural
                project and share your innovative
                idea with the community.
              </p>

              <button
                className="create-project-btn"
                onClick={() =>
                  navigate("/projects/create")
                }
              >
                Create Your First Project
              </button>

            </div>

          )}


          {/* =================================
              PROJECT LIST
          ================================= */}

          {projects.length > 0 && (

            <div className="student-project-list">

              {projects
                .slice(0, 3)
                .map((project) => (

                  <div
                    className="student-project-card"
                    key={project.id}
                  >


                    {/* Project Header */}

                    <div className="student-project-card-header">

                      <div>

                        <h3>
                          {project.title}
                        </h3>

                        <p>
                          Project #{project.id}
                        </p>

                      </div>


                      <span
                        className={getStatusClass(
                          project.status
                        )}
                      >
                        {project.status ||
                          "OPEN"}
                      </span>

                    </div>


                    {/* Description */}

                    <p className="student-project-description">

                      {project.description ||
                        project.solution ||
                        "No project description available."}

                    </p>


                    {/* Project Information */}

                    <div className="student-project-info">


                      {/* Technology */}

                      <div>

                        <span>
                          Technology
                        </span>

                        <strong>
                          {project.technology ||
                            "Not specified"}
                        </strong>

                      </div>


                      {/* Funding */}

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


                      {/* Created */}

                      <div>

                        <span>
                          Created
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


                      {/* Views */}

                      <div>

                        <span>
                          Views
                        </span>

                        <strong>
                          👁️{" "}
                          {project.views ?? 0}
                        </strong>

                      </div>


                      {/* Likes */}

                      <div>

                        <span>
                          Likes
                        </span>

                        <strong>
                          ❤️{" "}
                          {project.likes ?? 0}
                        </strong>

                      </div>

                    </div>


                    {/* View Project */}

                    <button
                      className="student-project-view-btn"
                      onClick={() =>
                        navigate(
                          `/projects/${project.id}`
                        )
                      }
                    >
                      View Project
                    </button>

                  </div>

                ))}

            </div>

          )}

        </section>


        {/* =================================
            EXPLORE
        ================================= */}

        <section className="explore-banner">

          <div>

            <h2>
              Discover Agricultural Innovation
            </h2>

            <p>
              Explore projects created by students
              and find opportunities to collaborate
              or support innovative ideas.
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/projects")
            }
          >
            Explore Projects
          </button>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;