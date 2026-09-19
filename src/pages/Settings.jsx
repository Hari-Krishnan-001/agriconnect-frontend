import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authService";

import "../styles/settings.css";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [notifications, setNotifications] = useState(() => {
    return (
      localStorage.getItem("agriconnect_notifications") !==
      "false"
    );
  });

  const [emailUpdates, setEmailUpdates] = useState(() => {
    return (
      localStorage.getItem("agriconnect_email_updates") !==
      "false"
    );
  });

  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("agriconnect_dark_mode") ===
      "true"
    );
  });


  /* ======================================================
     LOAD CURRENT USER
  ====================================================== */

  useEffect(() => {
    const currentUser = getCurrentUser();

    setUser(currentUser);
  }, []);


  /* ======================================================
     APPLY DARK MODE
  ====================================================== */

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add("agriconnect-dark-mode");
      body.classList.add("agriconnect-dark-mode");
    } else {
      root.classList.remove("agriconnect-dark-mode");
      body.classList.remove("agriconnect-dark-mode");
    }

    localStorage.setItem(
      "agriconnect_dark_mode",
      String(darkMode)
    );

    /*
     * Tell the entire application that the theme changed.
     */
    window.dispatchEvent(
      new CustomEvent(
        "agriconnect-theme-change",
        {
          detail: darkMode,
        }
      )
    );
  }, [darkMode]);


  /* ======================================================
     NOTIFICATIONS
  ====================================================== */

  const handleNotificationsToggle = () => {
    const newValue = !notifications;

    setNotifications(newValue);

    localStorage.setItem(
      "agriconnect_notifications",
      String(newValue)
    );
  };


  /* ======================================================
     EMAIL UPDATES
  ====================================================== */

  const handleEmailUpdatesToggle = () => {
    const newValue = !emailUpdates;

    setEmailUpdates(newValue);

    localStorage.setItem(
      "agriconnect_email_updates",
      String(newValue)
    );
  };


  /* ======================================================
     DARK MODE
  ====================================================== */

  const handleDarkModeToggle = () => {
    setDarkMode(
      (previousValue) => !previousValue
    );
  };


  /* ======================================================
     PROFILE PATH
  ====================================================== */

  const getProfilePath = () => {
    if (user?.role === "STUDENT") {
      return "/student/profile";
    }

    if (user?.role === "BUSINESS") {
      return "/business/profile";
    }

    return "/farmer/profile";
  };


  /* ======================================================
     MANAGE PROFILE
  ====================================================== */

  const handleManageProfile = () => {
    navigate(getProfilePath());
  };


  /* ======================================================
     LOGOUT
  ====================================================== */

  const handleLogout = () => {
    logoutUser();

    navigate("/login", {
      replace: true,
    });
  };


  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="settings-page">

      <div className="settings-container">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="settings-header">

          <div>

            <span className="settings-eyebrow">
              ACCOUNT
            </span>

            <h1>
              Settings
            </h1>

            <p>
              Manage your AgriLink preferences and
              account settings.
            </p>

          </div>

        </div>


        {/* ==================================================
            ACCOUNT
        ================================================== */}

        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              👤
            </div>

            <div>

              <h2>
                Account
              </h2>

              <p>
                Manage your personal account information.
              </p>

            </div>

          </div>


          <div className="settings-card">

            {/* PROFILE */}

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Profile Information
                </h3>

                <p>
                  View and update your name, email address
                  and profile details.
                </p>

              </div>


              <button
                type="button"
                className="settings-outline-button"
                onClick={handleManageProfile}
              >
                Manage Profile
              </button>

            </div>


            <div className="settings-divider" />


            {/* SECURITY */}

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Password & Security
                </h3>

                <p>
                  Keep your account secure by managing
                  your password and security options.
                </p>

              </div>


              <button
                type="button"
                className="settings-outline-button"
                onClick={() => {
                  alert(
                    "Password and security settings will be added next."
                  );
                }}
              >
                Manage Security
              </button>

            </div>

          </div>

        </section>


        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              🔔
            </div>

            <div>

              <h2>
                Notifications
              </h2>

              <p>
                Choose how AgriLink keeps you informed.
              </p>

            </div>

          </div>


          <div className="settings-card">

            {/* PUSH NOTIFICATIONS */}

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Push Notifications
                </h3>

                <p>
                  Receive notifications about important
                  updates and activity.
                </p>

              </div>


              <button
                type="button"
                className={`settings-toggle ${
                  notifications ? "active" : ""
                }`}
                onClick={
                  handleNotificationsToggle
                }
                aria-label="Toggle push notifications"
                aria-pressed={notifications}
              >
                <span />
              </button>

            </div>


            <div className="settings-divider" />


            {/* EMAIL UPDATES */}

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Email Updates
                </h3>

                <p>
                  Receive useful updates and
                  information through your email.
                </p>

              </div>


              <button
                type="button"
                className={`settings-toggle ${
                  emailUpdates ? "active" : ""
                }`}
                onClick={
                  handleEmailUpdatesToggle
                }
                aria-label="Toggle email updates"
                aria-pressed={emailUpdates}
              >
                <span />
              </button>

            </div>

          </div>

        </section>


        {/* ==================================================
            APPEARANCE
        ================================================== */}

        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              🎨
            </div>

            <div>

              <h2>
                Appearance
              </h2>

              <p>
                Customize how AgriLink looks on
                your device.
              </p>

            </div>

          </div>


          <div className="settings-card">

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Dark Mode
                </h3>

                <p>
                  Use a darker appearance throughout
                  the application.
                </p>

              </div>


              <button
                type="button"
                className={`settings-toggle ${
                  darkMode ? "active" : ""
                }`}
                onClick={handleDarkModeToggle}
                aria-label="Toggle dark mode"
                aria-pressed={darkMode}
              >
                <span />
              </button>

            </div>

          </div>

        </section>


        {/* ==================================================
            PRIVACY
        ================================================== */}

        <section className="settings-section">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              🔒
            </div>

            <div>

              <h2>
                Privacy
              </h2>

              <p>
                Manage your privacy and data preferences.
              </p>

            </div>

          </div>


          <div className="settings-card">

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Privacy & Data
                </h3>

                <p>
                  Learn how your information is used
                  within AgriLink.
                </p>

              </div>


              <button
                type="button"
                className="settings-outline-button"
                onClick={() => {
                  alert(
                    "Privacy settings will be added next."
                  );
                }}
              >
                View Details
              </button>

            </div>

          </div>

        </section>


        {/* ==================================================
            ACCOUNT ACTIONS
        ================================================== */}

        <section className="settings-section settings-danger-section">

          <div className="settings-section-header">

            <div className="settings-section-icon danger-icon">
              ⚠
            </div>

            <div>

              <h2>
                Account Actions
              </h2>

              <p>
                Actions that affect your AgriLink account.
              </p>

            </div>

          </div>


          <div className="settings-card">

            <div className="settings-row">

              <div className="settings-row-content">

                <h3>
                  Log Out
                </h3>

                <p>
                  Sign out of your current AgriLink
                  session.
                </p>

              </div>


              <button
                type="button"
                className="settings-danger-button"
                onClick={handleLogout}
              >
                Log Out
              </button>

            </div>

          </div>

        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="settings-footer">

          <p>
            AgriConnect Settings
          </p>

          <span>
            Manage your preferences securely.
          </span>

        </div>

      </div>

    </div>
  );
}

export default Settings;