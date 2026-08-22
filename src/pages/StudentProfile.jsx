import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/studentProfile.css";

function StudentProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    college: "",
    department: "",
    year: "",
    skills: "",
    researchInterests: "",
    about: "",
  });


  // ========================================
  // FETCH PROFILE
  // ========================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.get(
        "/api/student/profile"
      );

      const data = response.data;

      setProfile(data);

      setFormData({
        college: data.college || "",
        department: data.department || "",
        year: data.year || "",
        skills: data.skills || "",
        researchInterests:
          data.researchInterests || "",
        about: data.about || "",
      });

      setCreating(false);

    } catch (err) {
      console.error(
        "Failed to load student profile:",
        err
      );

      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "";

      /*
       * A newly registered student does not
       * have a Student profile yet.
       *
       * Backend returns 404.
       */

      if (
        err.response?.status === 404 ||
        String(message).includes(
          "Student profile not found"
        )
      ) {
        setProfile(null);
        setCreating(true);
        setError("");
      } else {
        setError(
          String(message) ||
            "Failed to load student profile."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ========================================
  // CREATE PROFILE
  // ========================================

  const handleCreateProfile = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/api/student",
        {
          college: formData.college,
          department: formData.department,
          year: formData.year,
          skills: formData.skills,
          researchInterests:
            formData.researchInterests,
          about: formData.about,
        }
      );

      const data = response.data;

      setProfile(data);

      setFormData({
        college: data.college || "",
        department: data.department || "",
        year: data.year || "",
        skills: data.skills || "",
        researchInterests:
          data.researchInterests || "",
        about: data.about || "",
      });

      setCreating(false);
      setEditing(false);

      setSuccess(
        "Student profile created successfully."
      );

    } catch (err) {
      console.error(
        "Failed to create student profile:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to create student profile."
      );

    } finally {
      setSaving(false);
    }
  };


  // ========================================
  // EDIT PROFILE
  // ========================================

  const handleEdit = () => {
    setError("");
    setSuccess("");
    setEditing(true);
  };


  // ========================================
  // CANCEL EDIT
  // ========================================

  const handleCancel = () => {

    if (profile) {

      setFormData({
        college: profile.college || "",
        department: profile.department || "",
        year: profile.year || "",
        skills: profile.skills || "",
        researchInterests:
          profile.researchInterests || "",
        about: profile.about || "",
      });

    }

    setError("");
    setSuccess("");
    setEditing(false);
  };


  // ========================================
  // UPDATE PROFILE
  // ========================================

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        "/api/student/profile",
        {
          college: formData.college,
          department: formData.department,
          year: formData.year,
          skills: formData.skills,
          researchInterests:
            formData.researchInterests,
          about: formData.about,
        }
      );

      const data = response.data;

      setProfile(data);

      setFormData({
        college: data.college || "",
        department: data.department || "",
        year: data.year || "",
        skills: data.skills || "",
        researchInterests:
          data.researchInterests || "",
        about: data.about || "",
      });

      setEditing(false);

      setSuccess(
        "Profile updated successfully."
      );

    } catch (err) {
      console.error(
        "Failed to update student profile:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update profile."
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
      <div className="student-profile-layout">

        <Sidebar />

        <main className="student-profile-page">

          <div className="student-profile-loading">

            <div className="student-profile-loading-icon">
              🎓
            </div>

            <h2>
              Loading Profile...
            </h2>

            <p>
              Please wait while we load your profile.
            </p>

          </div>

        </main>

      </div>
    );
  }


  // ========================================
  // CREATE PROFILE
  // ========================================

  if (creating) {
    return (
      <div className="student-profile-layout">

        <Sidebar />

        <main className="student-profile-page">

          {/* Header */}

          <div className="student-profile-header">

            <div>

              <p className="student-profile-label">
                Student Profile
              </p>

              <h1>
                Complete Your Profile
              </h1>

              <p>
                Add your academic information to
                complete your AgriConnect profile.
              </p>

            </div>

          </div>


          {/* Error */}

          {error && (
            <div className="student-profile-inline-error">
              {error}
            </div>
          )}


          {/* Profile Card */}

          <section className="student-profile-card">

            <div className="student-profile-hero">

              <div className="student-profile-avatar">
                🎓
              </div>

              <div>

                <h2>
                  Complete Student Profile
                </h2>

                <p>
                  Add your academic and professional
                  information.
                </p>

              </div>

            </div>


            {/* Form */}

            <form
              className="student-profile-form"
              onSubmit={handleCreateProfile}
            >

              <div className="student-profile-form-grid">

                {/* College */}

                <div className="student-profile-field">

                  <label>
                    College
                  </label>

                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college"
                    required
                  />

                </div>


                {/* Department */}

                <div className="student-profile-field">

                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                    required
                  />

                </div>


                {/* Year */}

                <div className="student-profile-field">

                  <label>
                    Year
                  </label>

                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Eg: 2nd Year"
                    required
                  />

                </div>


                {/* Skills */}

                <div className="student-profile-field">

                  <label>
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Eg: Java, Python, React"
                  />

                </div>


                {/* Research Interests */}

                <div className="student-profile-field full-width">

                  <label>
                    Research Interests
                  </label>

                  <input
                    type="text"
                    name="researchInterests"
                    value={
                      formData.researchInterests
                    }
                    onChange={handleChange}
                    placeholder="Eg: AI, Smart Farming"
                  />

                </div>


                {/* About */}

                <div className="student-profile-field full-width">

                  <label>
                    About
                  </label>

                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows="5"
                  />

                </div>

              </div>


              {/* Buttons */}

              <div className="student-profile-form-actions">

                <button
                  type="button"
                  className="student-profile-cancel-button"
                  onClick={() =>
                    navigate("/student/dashboard")
                  }
                  disabled={saving}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="student-profile-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Creating..."
                    : "Create Profile"}
                </button>

              </div>

            </form>

          </section>

        </main>

      </div>
    );
  }


  // ========================================
  // ERROR
  // ========================================

  if (error || !profile) {
    return (
      <div className="student-profile-layout">

        <Sidebar />

        <main className="student-profile-page">

          <div className="student-profile-error-page">

            <div className="student-profile-error-icon">
              ⚠️
            </div>

            <h2>
              Unable to Load Profile
            </h2>

            <p>
              {error ||
                "Student profile not found."}
            </p>

            <button
              onClick={fetchProfile}
            >
              Try Again
            </button>

          </div>

        </main>

      </div>
    );
  }


  // ========================================
  // MAIN PROFILE
  // ========================================

  return (
    <div className="student-profile-layout">

      <Sidebar />

      <main className="student-profile-page">

        {/* Header */}

        <div className="student-profile-header">

          <div>

            <p className="student-profile-label">
              Student Profile
            </p>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your academic information
              and research interests.
            </p>

          </div>


          {!editing && (
            <button
              className="student-profile-edit-button"
              onClick={handleEdit}
            >
              ✏️ Edit Profile
            </button>
          )}

        </div>


        {/* Error */}

        {error && (
          <div className="student-profile-inline-error">
            {error}
          </div>
        )}


        {/* Success */}

        {success && (
          <div className="student-profile-success">
            {success}
          </div>
        )}


        {/* Profile Card */}

        <section className="student-profile-card">

          {/* Profile Header */}

          <div className="student-profile-hero">

            <div className="student-profile-avatar">

              {profile.fullName
                ? profile.fullName
                    .charAt(0)
                    .toUpperCase()
                : "S"}

            </div>

            <div>

              <h2>
                {profile.fullName}
              </h2>

              <p>
                {profile.email}
              </p>

              {profile.phone && (
                <p>
                  📱 {profile.phone}
                </p>
              )}

            </div>

          </div>


          {/* Edit Mode */}

          {editing ? (

            <form
              className="student-profile-form"
              onSubmit={handleUpdateProfile}
            >

              <div className="student-profile-form-grid">

                <div className="student-profile-field">

                  <label>
                    College
                  </label>

                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="student-profile-field">

                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="student-profile-field">

                  <label>
                    Year
                  </label>

                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="student-profile-field">

                  <label>
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />

                </div>


                <div className="student-profile-field full-width">

                  <label>
                    Research Interests
                  </label>

                  <input
                    type="text"
                    name="researchInterests"
                    value={
                      formData.researchInterests
                    }
                    onChange={handleChange}
                  />

                </div>


                <div className="student-profile-field full-width">

                  <label>
                    About
                  </label>

                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="5"
                  />

                </div>

              </div>


              <div className="student-profile-form-actions">

                <button
                  type="button"
                  className="student-profile-cancel-button"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="student-profile-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          ) : (

            /* View Mode */

            <div className="student-profile-information">

              <div className="student-profile-info-grid">

                <div className="student-profile-info-item">

                  <span>
                    College
                  </span>

                  <strong>
                    {profile.college ||
                      "Not provided"}
                  </strong>

                </div>


                <div className="student-profile-info-item">

                  <span>
                    Department
                  </span>

                  <strong>
                    {profile.department ||
                      "Not provided"}
                  </strong>

                </div>


                <div className="student-profile-info-item">

                  <span>
                    Year
                  </span>

                  <strong>
                    {profile.year ||
                      "Not provided"}
                  </strong>

                </div>


                <div className="student-profile-info-item">

                  <span>
                    Skills
                  </span>

                  <strong>
                    {profile.skills ||
                      "Not provided"}
                  </strong>

                </div>


                <div className="student-profile-info-item full-width">

                  <span>
                    Research Interests
                  </span>

                  <strong>
                    {profile.researchInterests ||
                      "Not provided"}
                  </strong>

                </div>


                <div className="student-profile-about full-width">

                  <span>
                    About
                  </span>

                  <p>
                    {profile.about ||
                      "No information provided."}
                  </p>

                </div>

              </div>

            </div>

          )}

        </section>


        {/* Bottom */}

        <div className="student-profile-bottom-actions">

          <button
            onClick={() =>
              navigate("/student/dashboard")
            }
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default StudentProfile;