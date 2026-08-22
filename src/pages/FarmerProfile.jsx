import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import api from "../services/api";

import "../styles/farmerProfile.css";

function FarmerProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    state: "",
    district: "",
    village: "",
    address: "",
    farmSize: "",
    farmType: "",
    about: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(false);

  // ================================
  // LOAD PROFILE
  // ================================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.get("/api/farmer/profile");

      setProfile(response.data);

      setFormData({
        state: response.data.state || "",
        district: response.data.district || "",
        village: response.data.village || "",
        address: response.data.address || "",
        farmSize:
          response.data.farmSize !== null &&
          response.data.farmSize !== undefined
            ? response.data.farmSize
            : "",
        farmType: response.data.farmType || "",
        about: response.data.about || "",
      });
    } catch (err) {
      console.error("Failed to load farmer profile:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load farmer profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================================
  // UPDATE PROFILE
  // ================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const requestData = {
        state: formData.state,
        district: formData.district,
        village: formData.village,
        address: formData.address,
        farmSize:
          formData.farmSize === ""
            ? null
            : Number(formData.farmSize),
        farmType: formData.farmType,
        about: formData.about,
      };

      const response = await api.put(
        "/api/farmer/profile",
        requestData
      );

      setProfile(response.data);

      setFormData({
        state: response.data.state || "",
        district: response.data.district || "",
        village: response.data.village || "",
        address: response.data.address || "",
        farmSize:
          response.data.farmSize !== null &&
          response.data.farmSize !== undefined
            ? response.data.farmSize
            : "",
        farmType: response.data.farmType || "",
        about: response.data.about || "",
      });

      setEditing(false);

      setSuccess("Profile updated successfully.");

    } catch (err) {
      console.error("Failed to update profile:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // CANCEL EDIT
  // ================================

  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      state: profile.state || "",
      district: profile.district || "",
      village: profile.village || "",
      address: profile.address || "",
      farmSize:
        profile.farmSize !== null &&
        profile.farmSize !== undefined
          ? profile.farmSize
          : "",
      farmType: profile.farmType || "",
      about: profile.about || "",
    });

    setError("");
    setSuccess("");
    setEditing(false);
  };

  // ================================
  // DELETE PROFILE
  // ================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your farmer profile?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await api.delete("/api/farmer/profile");

      setProfile(null);

      setSuccess(
        "Farmer profile deleted successfully."
      );

    } catch (err) {
      console.error("Failed to delete profile:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete farmer profile."
      );
    }
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="farmer-profile-layout">
        <Sidebar />

        <main className="farmer-profile-page">

          <div className="farmer-profile-loading">
            <div className="profile-loading-icon">
              🌱
            </div>

            <h2>Loading Profile...</h2>

            <p>
              Please wait while we load your farmer profile.
            </p>
          </div>

        </main>
      </div>
    );
  }

  // ================================
  // MAIN PAGE
  // ================================

  return (
    <div className="farmer-profile-layout">

      <Sidebar />

      <main className="farmer-profile-page">

        {/* Header */}

        <div className="farmer-profile-header">

          <div>
            <p className="profile-label">
              Farmer Account
            </p>

            <h1>
              My Profile
            </h1>

            <p className="profile-subtitle">
              Manage your personal and farm information.
            </p>
          </div>

          {!editing && profile && (
            <button
              className="profile-edit-button"
              onClick={() => {
                setError("");
                setSuccess("");
                setEditing(true);
              }}
            >
              Edit Profile
            </button>
          )}

        </div>

        {/* Messages */}

        {error && (
          <div className="profile-error">
            {error}
          </div>
        )}

        {success && (
          <div className="profile-success">
            {success}
          </div>
        )}

        {/* No Profile */}

        {!profile && !error && (
          <div className="profile-empty">

            <div className="profile-empty-icon">
              🌱
            </div>

            <h2>
              Farmer Profile Not Found
            </h2>

            <p>
              Your farmer profile has not been created yet.
            </p>

            <button
              className="profile-back-button"
              onClick={() =>
                navigate("/farmer/dashboard")
              }
            >
              Back to Dashboard
            </button>

          </div>
        )}

        {/* Profile */}

        {profile && (
          <>

            {/* Account Information */}

            <section className="profile-card">

              <div className="profile-card-header">
                <div>
                  <h2>
                    Account Information
                  </h2>

                  <p>
                    Your registered account details.
                  </p>
                </div>
              </div>

              <div className="profile-account">

                <div className="profile-avatar">
                  {profile.fullName
                    ? profile.fullName
                        .charAt(0)
                        .toUpperCase()
                    : "F"}
                </div>

                <div className="profile-account-details">

                  <h3>
                    {profile.fullName || "Farmer"}
                  </h3>

                  <p>
                    {profile.email || "Email not available"}
                  </p>

                  <span>
                    {profile.phone ||
                      "Phone not available"}
                  </span>

                </div>

              </div>

            </section>

            {/* Farm Information */}

            <section className="profile-card">

              <div className="profile-card-header">

                <div>
                  <h2>
                    Farm Information
                  </h2>

                  <p>
                    Information about your farm and location.
                  </p>
                </div>

              </div>

              {editing ? (

                <form onSubmit={handleSave}>

                  <div className="profile-form-grid">

                    <div className="profile-form-group">

                      <label htmlFor="state">
                        State
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                      />

                    </div>

                    <div className="profile-form-group">

                      <label htmlFor="district">
                        District
                      </label>

                      <input
                        id="district"
                        name="district"
                        type="text"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Enter your district"
                      />

                    </div>

                    <div className="profile-form-group">

                      <label htmlFor="village">
                        Village
                      </label>

                      <input
                        id="village"
                        name="village"
                        type="text"
                        value={formData.village}
                        onChange={handleChange}
                        placeholder="Enter your village"
                      />

                    </div>

                    <div className="profile-form-group">

                      <label htmlFor="farmSize">
                        Farm Size
                      </label>

                      <input
                        id="farmSize"
                        name="farmSize"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.farmSize}
                        onChange={handleChange}
                        placeholder="Enter farm size"
                      />

                    </div>

                    <div className="profile-form-group">

                      <label htmlFor="farmType">
                        Farm Type
                      </label>

                      <input
                        id="farmType"
                        name="farmType"
                        type="text"
                        value={formData.farmType}
                        onChange={handleChange}
                        placeholder="e.g. Organic, Mixed"
                      />

                    </div>

                    <div className="profile-form-group profile-full-width">

                      <label htmlFor="address">
                        Address
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your farm address"
                      />

                    </div>

                    <div className="profile-form-group profile-full-width">

                      <label htmlFor="about">
                        About
                      </label>

                      <textarea
                        id="about"
                        name="about"
                        rows="5"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Tell us about your farm"
                      />

                    </div>

                  </div>

                  <div className="profile-form-actions">

                    <button
                      type="button"
                      className="profile-cancel-button"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="profile-save-button"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                  </div>

                </form>

              ) : (

                <div className="profile-information-grid">

                  <div>
                    <span>State</span>
                    <strong>
                      {profile.state || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>District</span>
                    <strong>
                      {profile.district || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Village</span>
                    <strong>
                      {profile.village || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Farm Size</span>
                    <strong>
                      {profile.farmSize !== null &&
                      profile.farmSize !== undefined
                        ? `${profile.farmSize}`
                        : "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Farm Type</span>
                    <strong>
                      {profile.farmType || "Not provided"}
                    </strong>
                  </div>

                  <div className="profile-full-width">

                    <span>Address</span>

                    <strong>
                      {profile.address || "Not provided"}
                    </strong>

                  </div>

                  <div className="profile-full-width">

                    <span>About</span>

                    <strong>
                      {profile.about || "Not provided"}
                    </strong>

                  </div>

                </div>

              )}

            </section>

            {/* Danger Zone */}

            {!editing && (
              <section className="profile-danger-card">

                <div>
                  <h2>
                    Delete Farmer Profile
                  </h2>

                  <p>
                    Permanently remove your farmer
                    profile information.
                  </p>
                </div>

                <button
                  className="profile-delete-button"
                  onClick={handleDelete}
                >
                  Delete Profile
                </button>

              </section>
            )}

          </>
        )}

      </main>

    </div>
  );
}

export default FarmerProfile;