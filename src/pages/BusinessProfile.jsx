import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/businessProfile.css";

function BusinessProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    phone: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // LOAD PROFILE
  // ========================================

  useEffect(() => {
    fetchProfile();
  }, []);

  // ========================================
  // SET PROFILE DATA
  // ========================================

  const setProfileData = (data) => {
    setProfile(data);

    setFormData({
      companyName: data.companyName || "",
      industry: data.industry || "",
      website: data.website || "",
      phone: data.phone || "",
      location: data.location || "",
      description: data.description || "",
    });
  };

  // ========================================
  // GET PROFILE
  // ========================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/business/profile");

      setProfileData(response.data);
    } catch (err) {
      console.error(
        "Failed to load business profile:",
        err
      );

      // Profile does not exist yet
      if (err.response?.status === 500) {
        setProfile(null);
        setError("");
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load business profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // START CREATE
  // ========================================

  const handleCreate = () => {
    setError("");
    setSuccess("");
    setCreating(true);
  };

  // ========================================
  // CANCEL CREATE
  // ========================================

  const handleCancelCreate = () => {
    setFormData({
      companyName: "",
      industry: "",
      website: "",
      phone: "",
      location: "",
      description: "",
    });

    setError("");
    setSuccess("");
    setCreating(false);
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
      setProfileData(profile);
    }

    setError("");
    setSuccess("");
    setEditing(false);
  };

  // ========================================
  // CREATE / UPDATE PROFILE
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const requestData = {
        companyName: formData.companyName,
        industry: formData.industry,
        website: formData.website,
        phone: formData.phone,
        location: formData.location,
        description: formData.description,
      };

      let response;

      // CREATE
      if (creating) {
        response = await api.post(
          "/api/business",
          requestData
        );

        setProfileData(response.data);

        setCreating(false);

        setSuccess(
          "Business profile created successfully."
        );
      }

      // UPDATE
      else {
        response = await api.put(
          "/api/business/profile",
          requestData
        );

        setProfileData(response.data);

        setEditing(false);

        setSuccess(
          "Business profile updated successfully."
        );
      }
    } catch (err) {
      console.error(
        "Failed to save business profile:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save business profile."
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
      <div className="business-profile-layout">
        <Sidebar />

        <main className="business-profile-page">

          <div className="business-profile-loading">

            <div className="business-profile-loading-icon">
              🏢
            </div>

            <h2>
              Loading Profile...
            </h2>

            <p>
              Please wait while we load your business profile.
            </p>

          </div>

        </main>
      </div>
    );
  }

  // ========================================
  // CREATE PROFILE
  // ========================================

  if (!profile) {
    return (
      <div className="business-profile-layout">

        <Sidebar />

        <main className="business-profile-page">

          {/* Header */}

          <div className="business-profile-header">

            <div>

              <p className="business-profile-label">
                Business Account
              </p>

              <h1>
                Business Profile
              </h1>

              <p>
                Create your company profile to start using AgriConnect.
              </p>

            </div>

          </div>


          {/* Error */}

          {error && (
            <div className="business-profile-error">
              {error}
            </div>
          )}


          {!creating ? (

            /* ========================================
               PROFILE NOT FOUND
            ======================================== */

            <div className="business-profile-empty">

              <div className="business-profile-empty-icon">
                🏢
              </div>

              <h2>
                Create Your Business Profile
              </h2>

              <p>
                Your business profile hasn't been created yet.
                Create one to purchase crops and manage your orders.
              </p>

              <button
                onClick={handleCreate}
                className="business-profile-create-button"
              >
                Create Business Profile
              </button>

            </div>

          ) : (

            /* ========================================
               CREATE FORM
            ======================================== */

            <section className="business-profile-card">

              <div className="business-profile-card-header">

                <h2>
                  Create Business Profile
                </h2>

                <p>
                  Enter your company information below.
                </p>

              </div>


              <form onSubmit={handleSubmit}>

                <div className="business-profile-form-grid">

                  {/* Company Name */}

                  <div className="business-profile-form-group">

                    <label htmlFor="companyName">
                      Company Name
                    </label>

                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />

                  </div>


                  {/* Industry */}

                  <div className="business-profile-form-group">

                    <label htmlFor="industry">
                      Industry
                    </label>

                    <input
                      id="industry"
                      name="industry"
                      type="text"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g. Agriculture"
                      required
                    />

                  </div>


                  {/* Website */}

                  <div className="business-profile-form-group">

                    <label htmlFor="website">
                      Website
                    </label>

                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />

                  </div>


                  {/* Phone */}

                  <div className="business-profile-form-group">

                    <label htmlFor="phone">
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />

                  </div>


                  {/* Location */}

                  <div className="business-profile-form-group business-profile-full-width">

                    <label htmlFor="location">
                      Location
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter business location"
                    />

                  </div>


                  {/* Description */}

                  <div className="business-profile-form-group business-profile-full-width">

                    <label htmlFor="description">
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your business"
                    />

                  </div>

                </div>


                {/* Actions */}

                <div className="business-profile-form-actions">

                  <button
                    type="button"
                    className="business-profile-cancel-button"
                    onClick={handleCancelCreate}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="business-profile-save-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Creating..."
                      : "Create Profile"}
                  </button>

                </div>

              </form>

            </section>

          )}

        </main>

      </div>
    );
  }

  // ========================================
  // NORMAL PROFILE
  // ========================================

  return (
    <div className="business-profile-layout">

      <Sidebar />

      <main className="business-profile-page">

        {/* Header */}

        <div className="business-profile-header">

          <div>

            <p className="business-profile-label">
              Business Account
            </p>

            <h1>
              Business Profile
            </h1>

            <p>
              Manage your company and contact information.
            </p>

          </div>

          {!editing && (
            <button
              className="business-profile-edit-button"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          )}

        </div>


        {/* Messages */}

        {error && (
          <div className="business-profile-error">
            {error}
          </div>
        )}

        {success && (
          <div className="business-profile-success">
            {success}
          </div>
        )}


        {/* Account Information */}

        <section className="business-profile-card">

          <div className="business-profile-card-header">

            <h2>
              Account Information
            </h2>

            <p>
              Your registered AgriConnect account details.
            </p>

          </div>


          <div className="business-account">

            <div className="business-profile-avatar">
              {profile.fullName
                ? profile.fullName.charAt(0).toUpperCase()
                : "B"}
            </div>

            <div>

              <h3>
                {profile.fullName || "Business User"}
              </h3>

              <p>
                {profile.email || "Email not available"}
              </p>

              <span>
                Account holder
              </span>

            </div>

          </div>

        </section>


        {/* Company Information */}

        <section className="business-profile-card">

          <div className="business-profile-card-header">

            <h2>
              Company Information
            </h2>

            <p>
              Details about your business firm.
            </p>

          </div>


          {editing ? (

            <form onSubmit={handleSubmit}>

              <div className="business-profile-form-grid">

                <div className="business-profile-form-group">

                  <label htmlFor="companyName">
                    Company Name
                  </label>

                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                  />

                </div>


                <div className="business-profile-form-group">

                  <label htmlFor="industry">
                    Industry
                  </label>

                  <input
                    id="industry"
                    name="industry"
                    type="text"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="Enter industry"
                  />

                </div>


                <div className="business-profile-form-group">

                  <label htmlFor="website">
                    Website
                  </label>

                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />

                </div>


                <div className="business-profile-form-group">

                  <label htmlFor="phone">
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />

                </div>


                <div className="business-profile-form-group business-profile-full-width">

                  <label htmlFor="location">
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter business location"
                  />

                </div>


                <div className="business-profile-form-group business-profile-full-width">

                  <label htmlFor="description">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your business"
                  />

                </div>

              </div>


              <div className="business-profile-form-actions">

                <button
                  type="button"
                  className="business-profile-cancel-button"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="business-profile-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          ) : (

            <div className="business-profile-information-grid">

              <div>
                <span>Company Name</span>
                <strong>
                  {profile.companyName || "Not provided"}
                </strong>
              </div>

              <div>
                <span>Industry</span>
                <strong>
                  {profile.industry || "Not provided"}
                </strong>
              </div>

              <div>
                <span>Website</span>
                <strong>
                  {profile.website || "Not provided"}
                </strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {profile.phone || "Not provided"}
                </strong>
              </div>

              <div className="business-profile-full-width">
                <span>Location</span>
                <strong>
                  {profile.location || "Not provided"}
                </strong>
              </div>

              <div className="business-profile-full-width">
                <span>Description</span>
                <strong>
                  {profile.description || "Not provided"}
                </strong>
              </div>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default BusinessProfile;