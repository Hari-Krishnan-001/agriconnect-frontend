import "../styles/studentDashboard.css";
import Sidebar from "../components/sidebar/Sidebar";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      <Sidebar />

      <main className="student-content">

        <div className="student-header">
          <div>
            <p className="welcome-label">Student Dashboard</p>
            <h1>Welcome back, Hari!</h1>
            <p>
              Manage your projects, explore opportunities and collaborate
              with the agricultural community.
            </p>
          </div>

          <button className="create-project-btn">
            + Create Project
          </button>
        </div>


        {/* Statistics */}

        <section className="student-stats">

          <div className="student-stat-card">
            <span>📁</span>
            <div>
              <p>My Projects</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="student-stat-card">
            <span>👁️</span>
            <div>
              <p>Total Views</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="student-stat-card">
            <span>❤️</span>
            <div>
              <p>Total Likes</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="student-stat-card">
            <span>💰</span>
            <div>
              <p>Funding Received</p>
              <h2>₹0</h2>
            </div>
          </div>

        </section>


        {/* Projects */}

        <section className="student-projects">

          <div className="section-heading">
            <div>
              <h2>My Projects</h2>
              <p>
                Track your agricultural projects and their progress.
              </p>
            </div>

            <button className="view-all-btn">
              View All
            </button>
          </div>


          <div className="empty-project">

            <div className="empty-icon">
              📁
            </div>

            <h3>No projects yet</h3>

            <p>
              Start your first agricultural project and share your
              innovative idea with the community.
            </p>

            <button className="create-project-btn">
              Create Your First Project
            </button>

          </div>

        </section>


        {/* Explore */}

        <section className="explore-banner">

          <div>
            <h2>Discover Agricultural Innovation</h2>

            <p>
              Explore projects created by students and find opportunities
              to collaborate or support innovative ideas.
            </p>
          </div>

          <button>
            Explore Projects
          </button>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;