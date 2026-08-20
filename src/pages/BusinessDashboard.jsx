import "../styles/businessDashboard.css";
import Sidebar from "../components/sidebar/Sidebar";

function BusinessDashboard() {
  return (
    <div className="business-dashboard">

      <Sidebar />

      <main className="business-content">

        {/* Header */}

        <div className="business-header">

          <div>
            <p className="business-label">
              Business Dashboard
            </p>

            <h1>Welcome back, AgriTech Solutions!</h1>

            <p>
              Manage your crop purchases, orders and agricultural
              opportunities from one place.
            </p>
          </div>

          <button className="browse-crops-btn">
            Browse Crops
          </button>

        </div>


        {/* Statistics */}

        <section className="business-stats">

          <div className="business-stat-card">
            <span>🛒</span>

            <div>
              <p>Total Orders</p>
              <h2>2</h2>
            </div>
          </div>


          <div className="business-stat-card">
            <span>✅</span>

            <div>
              <p>Approved Orders</p>
              <h2>1</h2>
            </div>
          </div>


          <div className="business-stat-card">
            <span>⏳</span>

            <div>
              <p>Pending Orders</p>
              <h2>1</h2>
            </div>
          </div>


          <div className="business-stat-card">
            <span>💰</span>

            <div>
              <p>Total Spending</p>
              <h2>₹750</h2>
            </div>
          </div>

        </section>


        {/* Recent Purchases */}

        <section className="purchases-section">

          <div className="section-heading">

            <div>
              <h2>Recent Purchases</h2>

              <p>
                Track your latest crop purchases.
              </p>
            </div>

            <button className="view-orders-btn">
              View All Orders
            </button>

          </div>


          <div className="purchase-table">

            <table>

              <thead>

                <tr>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>🍅 Tomato</td>
                  <td>10 kg</td>
                  <td>₹500</td>

                  <td>
                    <span className="status approved">
                      Approved
                    </span>
                  </td>
                </tr>


                <tr>
                  <td>🥔 Potato</td>
                  <td>10 kg</td>
                  <td>₹250</td>

                  <td>
                    <span className="status pending">
                      Pending
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>


        {/* Quick Actions */}

        <section className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-grid">

            <div className="action-card">
              <span>🌾</span>

              <h3>Browse Crops</h3>

              <p>
                Find fresh crops directly from farmers.
              </p>

              <button>
                Explore Marketplace
              </button>
            </div>


            <div className="action-card">
              <span>📦</span>

              <h3>My Orders</h3>

              <p>
                Track and manage your crop orders.
              </p>

              <button>
                View Orders
              </button>
            </div>


            <div className="action-card">
              <span>💡</span>

              <h3>Explore Projects</h3>

              <p>
                Discover innovative agricultural projects.
              </p>

              <button>
                Explore Projects
              </button>
            </div>

          </div>

        </section>


      </main>

    </div>
  );
}

export default BusinessDashboard;