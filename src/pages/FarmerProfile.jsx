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
  const [creating, setCreating] = useState(false);


  // ========================================
  // LOAD PROFILE
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
        "/api/farmer/profile"
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

      setCreating(false);

    } catch (err) {
      console.error(
        "Failed to load farmer profile:",
        err
      );

      // ====================================
      // PROFILE DOES NOT EXIST
      // ====================================

      if (err.response?.status === 404) {

        setProfile(null);

        setError("");

        setCreating(true);

        setFormData({
          state: "",
          district: "",
          village: "",
          address: "",
          farmSize: "",
          farmType: "",
          about: "",
        });

      } else {

        setError(
          err.response?.data?.message ||
            "Failed to load farmer profile."
        );

        setCreating(false);
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
  // VALIDATE FORM
  // ========================================

  const validateForm = () => {

    if (!formData.state.trim()) {
      setError("State is required.");
      return false;
    }

    if (!formData.district.trim()) {
      setError("District is required.");
      return false;
    }

    if (!formData.village.trim()) {
      setError("Village is required.");
      return false;
    }

    if (!formData.address.trim()) {
      setError("Address is required.");
      return false;
    }

    if (
      formData.farmSize === "" ||
      Number(formData.farmSize) <= 0
    ) {
      setError("Farm size must be greater than 0.");
      return false;
    }

    if (!formData.farmType.trim()) {
      setError("Farm type is required.");
      return false;
    }

    return true;
  };


  // ========================================
  // CREATE PROFILE
  // ========================================

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {

      setSaving(true);

      const requestData = {
        state: formData.state.trim(),
        district: formData.district.trim(),
        village: formData.village.trim(),
        address: formData.address.trim(),
        farmSize: Number(formData.farmSize),
        farmType: formData.farmType.trim(),
        about: formData.about.trim(),
      };

      const response = await api.post(
        "/api/farmer",
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

      setCreating(false);
      setEditing(false);

      setSuccess(
        "Farmer profile created successfully."
      );

    } catch (err) {

      console.error(
        "Failed to create farmer profile:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to create farmer profile."
      );

    } finally {
      setSaving(false);
    }
  };


  // ========================================
  // UPDATE PROFILE
  // ========================================

  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {

      setSaving(true);

      const requestData = {
        state: formData.state.trim(),
        district: formData.district.trim(),
        village: formData.village.trim(),
        address: formData.address.trim(),
        farmSize: Number(formData.farmSize),
        farmType: formData.farmType.trim(),
        about: formData.about.trim(),
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

      setSuccess(
        "Profile updated successfully."
      );

    } catch (err) {

      console.error(
        "Failed to update profile:",
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
  // CANCEL EDIT
  // ========================================

  const handleCancel = () => {

    if (!profile) {
      return;
    }

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


  // ========================================
  // DELETE PROFILE
  // ========================================

  const handleDelete = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete your farmer profile?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");
      setSuccess("");
      setSaving(true);

      await api.delete(
        "/api/farmer/profile"
      );

      setProfile(null);

      setFormData({
        state: "",
        district: "",
        village: "",
        address: "",
        farmSize: "",
        farmType: "",
        about: "",
      });

      setCreating(true);

      setSuccess(
        "Farmer profile deleted successfully."
      );

    } catch (err) {

      console.error(
        "Failed to delete profile:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete farmer profile."
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
      <div className="farmer-profile-layout">

        <Sidebar />

        <main className="farmer-profile-page">

          <div className="farmer-profile-loading">

            <div className="profile-loading-icon">
              🌱
            </div>

            <h2>
              Loading Profile...
            </h2>

            <p>
              Please wait while we load your farmer profile.
            </p>

          </div>

        </main>

      </div>
    );
  }


  // ========================================
  // MAIN PAGE
  // ========================================

  return (
    <div className="farmer-profile-layout">

      <Sidebar />

      <main className="farmer-profile-page">

        {/* ==================================
            HEADER
        ================================== */}

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


          {!editing &&
            !creating &&
            profile && (

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


        {/* ==================================
            MESSAGES
        ================================== */}

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


        {/* ==================================
            CREATE PROFILE
        ================================== */}

        {creating && !profile && (

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>
                  Create Farmer Profile
                </h2>

                <p>
                  Complete your farmer and farm information to get started.
                </p>

              </div>

            </div>


            <form onSubmit={handleCreate}>

              <div className="profile-form-grid">

                {/* STATE */}

                <div className="profile-form-group">

                  <label htmlFor="state">
                    State *
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    required
                  />

                </div>


                {/* DISTRICT */}

                <div className="profile-form-group">

                  <label htmlFor="district">
                    District *
                  </label>

                  <input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter your district"
                    required
                  />

                </div>


                {/* VILLAGE */}

                <div className="profile-form-group">

                  <label htmlFor="village">
                    Village *
                  </label>

                  <input
                    id="village"
                    name="village"
                    type="text"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="Enter your village"
                    required
                  />

                </div>


                {/* FARM SIZE */}

                <div className="profile-form-group">

                  <label htmlFor="farmSize">
                    Farm Size *
                  </label>

                  <input
                    id="farmSize"
                    name="farmSize"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.farmSize}
                    onChange={handleChange}
                    placeholder="Enter farm size"
                    required
                  />

                </div>


                {/* FARM TYPE */}

                <div className="profile-form-group">

                  <label htmlFor="farmType">
                    Farm Type *
                  </label>

                  <input
                    id="farmType"
                    name="farmType"
                    type="text"
                    value={formData.farmType}
                    onChange={handleChange}
                    placeholder="e.g. Organic, Mixed"
                    required
                  />

                </div>


                {/* ADDRESS */}

                <div className="profile-form-group profile-full-width">

                  <label htmlFor="address">
                    Address *
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your farm address"
                    required
                  />

                </div>


                {/* ABOUT */}

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
                  onClick={() =>
                    navigate("/farmer/dashboard")
                  }
                  disabled={saving}
                >
                  Back to Dashboard
                </button>


                <button
                  type="submit"
                  className="profile-save-button"
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


        {/* ==================================
            EXISTING PROFILE
        ================================== */}

        {profile && (

          <>

            {/* ACCOUNT INFORMATION */}

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
                    {profile.email ||
                      "Email not available"}
                  </p>

                  <span>
                    {profile.phone ||
                      "Phone not available"}
                  </span>

                </div>

              </div>

            </section>


            {/* FARM INFORMATION */}

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
                        State *
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                        required
                      />

                    </div>


                    <div className="profile-form-group">

                      <label htmlFor="district">
                        District *
                      </label>

                      <input
                        id="district"
                        name="district"
                        type="text"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Enter your district"
                        required
                      />

                    </div>


                    <div className="profile-form-group">

                      <label htmlFor="village">
                        Village *
                      </label>

                      <input
                        id="village"
                        name="village"
                        type="text"
                        value={formData.village}
                        onChange={handleChange}
                        placeholder="Enter your village"
                        required
                      />

                    </div>


                    <div className="profile-form-group">

                      <label htmlFor="farmSize">
                        Farm Size *
                      </label>

                      <input
                        id="farmSize"
                        name="farmSize"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={formData.farmSize}
                        onChange={handleChange}
                        placeholder="Enter farm size"
                        required
                      />

                    </div>


                    <div className="profile-form-group">

                      <label htmlFor="farmType">
                        Farm Type *
                      </label>

                      <input
                        id="farmType"
                        name="farmType"
                        type="text"
                        value={formData.farmType}
                        onChange={handleChange}
                        placeholder="e.g. Organic, Mixed"
                        required
                      />

                    </div>


                    <div className="profile-form-group profile-full-width">

                      <label htmlFor="address">
                        Address *
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your farm address"
                        required
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

                    <span>
                      State
                    </span>

                    <strong>
                      {profile.state ||
                        "Not provided"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      District
                    </span>

                    <strong>
                      {profile.district ||
                        "Not provided"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Village
                    </span>

                    <strong>
                      {profile.village ||
                        "Not provided"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Farm Size
                    </span>

                    <strong>
                      {profile.farmSize !== null &&
                      profile.farmSize !== undefined
                        ? `${profile.farmSize}`
                        : "Not provided"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Farm Type
                    </span>

                    <strong>
                      {profile.farmType ||
                        "Not provided"}
                    </strong>

                  </div>


                  <div className="profile-full-width">

                    <span>
                      Address
                    </span>

                    <strong>
                      {profile.address ||
                        "Not provided"}
                    </strong>

                  </div>


                  <div className="profile-full-width">

                    <span>
                      About
                    </span>

                    <strong>
                      {profile.about ||
                        "Not provided"}
                    </strong>

                  </div>

                </div>

              )}

            </section>


            {/* DANGER ZONE */}

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
                  disabled={saving}
                >
                  {saving
                    ? "Deleting..."
                    : "Delete Profile"}
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