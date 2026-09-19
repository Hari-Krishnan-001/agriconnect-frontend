import { useEffect, useState } from "react";
import heroImage from "../assets/agriconnect-hero-reference.png";

function LandingPage() {
  const [stats, setStats] = useState({
    farmers: 0,
    students: 0,
    businesses: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/stats"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch community statistics");
        }

        const data = await response.json();

        setStats({
          farmers: Number(data.farmers) || 0,
          students: Number(data.students) || 0,
          businesses: Number(data.businesses) || 0,
        });
      } catch (error) {
        console.error(
          "Unable to load community statistics:",
          error
        );
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Section #${id} was not found.`);
      return;
    }

    const navbarOffset = 80;

    const elementTop =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: Math.max(0, elementTop),
      behavior: "smooth",
    });
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <main className="landing-page">

      {/* =====================================================
          TOP NAVIGATION BAR
      ===================================================== */}

      <footer className="landing-footer">

        <button
          className="landing-footer-logo"
          onClick={() => goTo("/")}
        >
          <span>🍃</span>
          Agri<span>Link</span>
        </button>

        <div className="landing-footer-links">

          <button onClick={() => goTo("/")}>
            Home
          </button>

          <button
            onClick={() =>
              scrollToSection("about-section")
            }
          >
            About
          </button>

          <button
            onClick={() =>
              scrollToSection("features-section")
            }
          >
            Features
          </button>

          <button
            onClick={() =>
              scrollToSection("how-it-works-section")
            }
          >
            Community
          </button>

          <button
            onClick={() =>
              scrollToSection("resources-section")
            }
          >
            Resources
          </button>

          <button
            onClick={() =>
              scrollToSection("contact-section")
            }
          >
            Contact
          </button>

        </div>

        <div className="landing-footer-actions">

          <button
            className="landing-footer-theme"
            onClick={() => {
              const current =
                document.body.classList.contains(
                  "agriconnect-dark-mode"
                );

              window.dispatchEvent(
                new CustomEvent(
                  "agriconnect-theme-change",
                  {
                    detail: !current,
                  }
                )
              );
            }}
            aria-label="Toggle theme"
          >
            ☾
          </button>

          <button
            className="landing-footer-login"
            onClick={() => goTo("/login")}
          >
            Login
          </button>

          <button
            className="landing-footer-start"
            onClick={() => goTo("/register")}
          >
            Get Started
          </button>

        </div>

      </footer>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="landing-hero">

        <div className="landing-hero-content">

          <div className="landing-eyebrow">
            AGRICULTURE
            <span>•</span>
            EDUCATION
            <span>•</span>
            BUSINESS
          </div>

          <h1>
            Connecting Farmers,
            <br />
            Students &amp; Businesses
            <br />
            for a <span>Better Tomorrow</span>
          </h1>

          <p className="landing-hero-description">
            An unified platform empowering agriculture,
            education and business collaboration for
            sustainable growth.
          </p>

          <div className="landing-role-buttons">

            <button
              className="landing-role-card farmer"
              onClick={() => goTo("/register")}
            >
              <span className="landing-role-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M12 12C7.5 12 5 9.5 5 5c4.5 0 7 2.5 7 7Z"
                    fill="currentColor"
                  />

                  <path
                    d="M12 15c0-4.5 2.5-7 7-7 0 4.5-2.5 7-7 7Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <span>
                <strong>I'm a Farmer</strong>
                <small>Grow &amp; Sell</small>
              </span>
            </button>


            <button
              className="landing-role-card student"
              onClick={() => goTo("/register")}
            >
              <span className="landing-role-icon">
                🎓
              </span>

              <span>
                <strong>I'm a Student</strong>
                <small>Learn &amp; Build</small>
              </span>
            </button>


            <button
              className="landing-role-card business"
              onClick={() => goTo("/register")}
            >
              <span className="landing-role-icon">
                🏢
              </span>

              <span>
                <strong>I'm a Business</strong>
                <small>Connect &amp; Grow</small>
              </span>
            </button>

          </div>


          <div className="landing-member-row">

            <div className="landing-member-avatars">
              <span>👨🏽‍🌾</span>
              <span>👩🏽‍💻</span>
              <span>👨🏻‍💼</span>
            </div>

            <p>
              Join{" "}
              <strong>
                {loadingStats
                  ? "—"
                  : stats.farmers +
                    stats.students +
                    stats.businesses}
              </strong>{" "}
              members already growing together
            </p>

          </div>

        </div>


        <div className="landing-hero-visual">

          <img
            src={heroImage}
            alt="Farmer working in a rural agricultural landscape"
          />

          <div className="landing-floating-stats">

            <div className="landing-floating-stat">

              <span className="landing-floating-icon farmer">
                🌱
              </span>

              <div>
                <strong>
                  {loadingStats
                    ? "—"
                    : `${stats.farmers}+`}
                </strong>

                <small>Farmers</small>
              </div>

            </div>


            <div className="landing-floating-divider" />


            <div className="landing-floating-stat">

              <span className="landing-floating-icon student">
                🎓
              </span>

              <div>
                <strong>
                  {loadingStats
                    ? "—"
                    : `${stats.students}+`}
                </strong>

                <small>Students</small>
              </div>

            </div>


            <div className="landing-floating-divider" />


            <div className="landing-floating-stat">

              <span className="landing-floating-icon business">
                🏢
              </span>

              <div>
                <strong>
                  {loadingStats
                    ? "—"
                    : `${stats.businesses}+`}
                </strong>

                <small>Businesses</small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about-section"
        className="landing-about-section"
      >

        <div className="landing-about-content">

          <div className="landing-about-heading">

            <span>
              ABOUT AGRILINK
            </span>

            <h2>
              Building a Connected Future for Agriculture
            </h2>

            <p>
              Agriculture today is more than growing crops.
              Farmers need access to better markets, modern
              farming knowledge, technology and reliable
              business connections.
            </p>

            <p>
              At the same time, students need opportunities
              to learn through real-world agricultural
              experiences, while businesses need meaningful
              connections with farmers and emerging talent.
            </p>

            <p>
              AgriConnect brings these communities together
              on one platform, creating a space where people
              can discover opportunities, share knowledge,
              collaborate and grow together.
            </p>

          </div>


          <div className="landing-about-visual">

            <div className="landing-about-ecosystem">

              <div className="landing-about-ecosystem-icon">
                🌱
              </div>

              <h3>
                One Connected Ecosystem
              </h3>

              <p>
                Farmers, students and businesses
                working together for a stronger
                agricultural future.
              </p>

              <div className="landing-about-connections">

                <div className="landing-about-person farmer">

                  <span>🌱</span>

                  <strong>Farmers</strong>

                  <small>
                    Grow &amp; Sell
                  </small>

                </div>


                <div className="landing-about-line" />


                <div className="landing-about-person student">

                  <span>🎓</span>

                  <strong>Students</strong>

                  <small>
                    Learn &amp; Build
                  </small>

                </div>


                <div className="landing-about-line" />


                <div className="landing-about-person business">

                  <span>🏢</span>

                  <strong>Businesses</strong>

                  <small>
                    Connect &amp; Grow
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        <div className="landing-about-pillars">

          <div className="landing-about-pillar">

            <div className="landing-about-pillar-icon farmer">
              🌱
            </div>

            <div>
              <h3>For Farmers</h3>

              <p>
                Discover markets, access farming
                knowledge and connect with businesses.
              </p>
            </div>

          </div>


          <div className="landing-about-pillar">

            <div className="landing-about-pillar-icon student">
              🎓
            </div>

            <div>
              <h3>For Students</h3>

              <p>
                Learn from agriculture, explore
                projects and gain practical experience.
              </p>
            </div>

          </div>


          <div className="landing-about-pillar">

            <div className="landing-about-pillar-icon business">
              🏢
            </div>

            <div>
              <h3>For Businesses</h3>

              <p>
                Find opportunities, connect with
                farmers and build meaningful partnerships.
              </p>
            </div>

          </div>

        </div>


        <div className="landing-about-highlight">

          <div className="landing-about-highlight-icon">
            🍃
          </div>

          <div>

            <strong>
              Why AgriLink matters today
            </strong>

            <p>
              As agriculture becomes increasingly connected
              with technology, education and business,
              collaboration is essential for sustainable
              growth.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        id="features-section"
        className="landing-features-section"
      >

        <div className="landing-section-heading">

          <span>
            EVERYTHING CONNECTED
          </span>

          <h2>
            One Platform. Endless Possibilities.
          </h2>

        </div>


        <div className="landing-feature-grid">

          <article className="landing-feature-item">

            <div className="landing-feature-icon">
              🛍
            </div>

            <h3>
              Marketplace
            </h3>

            <p>
              Buy and sell agricultural
              products with ease.
            </p>

          </article>


          <article className="landing-feature-item">

            <div className="landing-feature-icon">
              🌱
            </div>

            <h3>
              Smart Farming
            </h3>

            <p>
              Get AI-powered insights
              for better farming.
            </p>

          </article>


          <article className="landing-feature-item">

            <div className="landing-feature-icon">
              🎓
            </div>

            <h3>
              Education
            </h3>

            <p>
              Access courses and
              resources to learn.
            </p>

          </article>


          <article className="landing-feature-item">

            <div className="landing-feature-icon">
              👥
            </div>

            <h3>
              Projects
            </h3>

            <p>
              Collaborate on real-world
              agricultural projects.
            </p>

          </article>


          <article className="landing-feature-item">

            <div className="landing-feature-icon">
              💬
            </div>

            <h3>
              Communication
            </h3>

            <p>
              Connect and chat
              seamlessly.
            </p>

          </article>


          <article className="landing-feature-item">

            <div className="landing-feature-icon">
              🍃
            </div>

            <h3>
              Pesticide Finder
            </h3>

            <p>
              Identify pests and find
              the right solutions.
            </p>

          </article>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works-section"
        className="landing-how-section"
      >

        <div className="landing-how-process">

          <div className="landing-how-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Discover. Connect. Grow Together.
            </h2>

          </div>


          <div className="landing-process-row">

            <div className="landing-process-step">

              <div className="landing-step-circle">

                <b>1</b>

                <span>⌕</span>

              </div>

              <h3>
                Discover
              </h3>

              <p>
                Explore opportunities,
                products, and knowledge.
              </p>

            </div>


            <div className="landing-process-connector" />


            <div className="landing-process-step">

              <div className="landing-step-circle">

                <b>2</b>

                <span>👥</span>

              </div>

              <h3>
                Connect
              </h3>

              <p>
                Connect with farmers,
                students and businesses.
              </p>

            </div>


            <div className="landing-process-connector" />


            <div className="landing-process-step">

              <div className="landing-step-circle">

                <b>3</b>

                <span>🍃</span>

              </div>

              <h3>
                Grow Together
              </h3>

              <p>
                Collaborate and grow for
                a better tomorrow.
              </p>

            </div>

          </div>

        </div>


        <div
          id="contact-section"
          className="landing-how-cta"
        >

          <div className="landing-cta-icon">
            🍃
          </div>

          <h3>
            Agriculture is better
            <br />
            when we grow together.
          </h3>

          <button
            onClick={() => goTo("/register")}
          >
            Join AgriLink Today!
          </button>

        </div>

      </section>

    </main>
  );
}

export default LandingPage;