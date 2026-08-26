import { useRef, useState } from "react";

import {
  FaCamera,
  FaCloudUploadAlt,
  FaSearch,
  FaShieldAlt,
  FaTimes,
  FaArrowLeft,
  FaFlask,
  FaLeaf,
  FaBug,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../styles/pesticideScanner.css";


function PesticideScanner() {

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);


  // ========================================
  // SEARCH STATE
  // ========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const [selectedPesticide, setSelectedPesticide] =
    useState(null);

  const [isSearching, setIsSearching] =
    useState(false);

  const [searchError, setSearchError] =
    useState("");

  const [hasSearched, setHasSearched] =
    useState(false);


  // ========================================
  // IMAGE STATE
  // ========================================

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);


  // ========================================
  // HANDLE IMAGE
  // ========================================

  const handleImageSelect = (file) => {

    if (!file) {
      return;
    }


    if (!file.type.startsWith("image/")) {
      return;
    }


    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }


    setSelectedImage(file);


    const previewUrl =
      URL.createObjectURL(file);


    setImagePreview(previewUrl);
  };


  // ========================================
  // UPLOAD IMAGE
  // ========================================

  const handleUploadClick = () => {

    fileInputRef.current?.click();
  };


  // ========================================
  // CAMERA
  // ========================================

  const handleCameraClick = () => {

    cameraInputRef.current?.click();
  };


  // ========================================
  // FILE CHANGE
  // ========================================

  const handleFileChange = (event) => {

    const file =
      event.target.files?.[0];


    handleImageSelect(file);


    event.target.value = "";
  };


  // ========================================
  // REMOVE IMAGE
  // ========================================

  const handleRemoveImage = () => {

    if (imagePreview) {

      URL.revokeObjectURL(
        imagePreview
      );
    }


    setSelectedImage(null);

    setImagePreview(null);
  };


  // ========================================
  // SEARCH PESTICIDE
  // ========================================

  const handleSearch = async () => {

    const trimmedSearch =
      searchTerm.trim();


    if (!trimmedSearch) {

      setSearchResults([]);

      setSelectedPesticide(null);

      setSearchError(
        "Please enter a pesticide name."
      );

      setHasSearched(true);

      return;
    }


    setIsSearching(true);

    setSearchError("");

    setSearchResults([]);

    setSelectedPesticide(null);

    setHasSearched(true);


    try {

      const response =
        await fetch(
          `http://localhost:8080/api/pesticides/search?name=${encodeURIComponent(
            trimmedSearch
          )}`
        );


      if (!response.ok) {

        throw new Error(
          `Search failed with status ${response.status}`
        );
      }


      const data =
        await response.json();


      const results =
        Array.isArray(data)
          ? data
          : [];


      setSearchResults(results);


      if (results.length === 0) {

        setSearchError(
          `No pesticide found matching "${trimmedSearch}".`
        );
      }

    } catch (error) {

      console.error(
        "Pesticide search error:",
        error
      );


      setSearchResults([]);

      setSearchError(
        "Unable to connect to the pesticide database. Please make sure the AgriConnect backend is running."
      );

    } finally {

      setIsSearching(false);
    }
  };


  // ========================================
  // ENTER KEY
  // ========================================

  const handleSearchKeyDown = (event) => {

    if (event.key === "Enter") {

      handleSearch();
    }
  };


  // ========================================
  // CLEAR SEARCH
  // ========================================

  const handleClearSearch = () => {

    setSearchTerm("");

    setSearchResults([]);

    setSelectedPesticide(null);

    setSearchError("");

    setHasSearched(false);
  };


  // ========================================
  // SELECT PESTICIDE
  // ========================================

  const handleSelectPesticide = (
    pesticide
  ) => {

    setSelectedPesticide(
      pesticide
    );

    setSearchError("");
  };


  // ========================================
  // DISPLAY VALUE
  // ========================================

  const displayValue = (
    value,
    fallback = "Information not available"
  ) => {

    if (
      value === null ||
      value === undefined
    ) {

      return fallback;
    }


    const text =
      String(value).trim();


    return text || fallback;
  };


  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="pesticide-scanner-page">


      {/* ==================================
          HIDDEN INPUTS
      ================================== */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="pesticide-scanner-hidden-input"
      />


      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="pesticide-scanner-hidden-input"
      />


      {/* ==================================
          HEADER
      ================================== */}

      <header className="pesticide-scanner-header">

        <button
          type="button"
          className="pesticide-scanner-back"
          onClick={() =>
            navigate("/pesticides")
          }
        >

          <FaArrowLeft />

          <span>
            Back to Pesticides
          </span>

        </button>


        <div className="pesticide-scanner-title-area">

          <div className="pesticide-scanner-title-icon">
            🧪
          </div>


          <div>

            <p className="pesticide-scanner-label">
              AgriConnect Smart Tool
            </p>


            <h1>
              Smart Pesticide Finder
            </h1>


            <p>
              Identify a pesticide and explore
              useful information about its purpose,
              crops, and safety.
            </p>

          </div>

        </div>

      </header>


      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <main className="pesticide-scanner-content">


        {/* ==================================
            IMAGE SCANNER
        ================================== */}

        <section className="pesticide-scanner-card">

          <div className="pesticide-scanner-card-header">

            <div>

              <span className="pesticide-scanner-step">
                STEP 1
              </span>


              <h2>
                Scan or upload a pesticide
              </h2>


              <p>
                Take a photo of the pesticide
                bottle or packet, or upload an
                existing image of the label.
              </p>

            </div>

          </div>


          {/* ==================================
              IMAGE PREVIEW
          ================================== */}

          {imagePreview ? (

            <div className="pesticide-scanner-preview">

              <img
                src={imagePreview}
                alt="Selected pesticide"
              />


              <div className="pesticide-scanner-preview-overlay">

                <div>

                  <span>
                    Image selected
                  </span>


                  <strong>
                    {selectedImage?.name}
                  </strong>

                </div>


                <button
                  type="button"
                  onClick={
                    handleRemoveImage
                  }
                  aria-label="Remove image"
                >

                  <FaTimes />

                </button>

              </div>

            </div>

          ) : (

            <div className="pesticide-scanner-upload-area">

              <div className="pesticide-scanner-upload-icon">
                <FaCloudUploadAlt />
              </div>


              <h3>
                Add a pesticide image
              </h3>


              <p>
                Upload a clear photo of the
                front label or product packaging.
              </p>


              <div className="pesticide-scanner-actions">

                <button
                  type="button"
                  className="pesticide-scanner-primary-button"
                  onClick={
                    handleCameraClick
                  }
                >

                  <FaCamera />

                  <span>
                    Capture Image
                  </span>

                </button>


                <button
                  type="button"
                  className="pesticide-scanner-secondary-button"
                  onClick={
                    handleUploadClick
                  }
                >

                  <FaCloudUploadAlt />

                  <span>
                    Upload Image
                  </span>

                </button>

              </div>

            </div>
          )}


          {/* ==================================
              IMAGE ACTIONS
          ================================== */}

          {imagePreview && (

            <div className="pesticide-scanner-image-actions">

              <button
                type="button"
                className="pesticide-scanner-primary-button"
                onClick={
                  handleCameraClick
                }
              >

                <FaCamera />

                Capture Again

              </button>


              <button
                type="button"
                className="pesticide-scanner-secondary-button"
                onClick={
                  handleUploadClick
                }
              >

                <FaCloudUploadAlt />

                Choose Another

              </button>

            </div>
          )}

        </section>


        {/* ==================================
            OR DIVIDER
        ================================== */}

        <div className="pesticide-scanner-divider">

          <span>
            OR
          </span>

        </div>


        {/* ==================================
            NAME SEARCH
        ================================== */}

        <section className="pesticide-scanner-card pesticide-name-search-card">

          <div className="pesticide-scanner-card-header">

            <div>

              <span className="pesticide-scanner-step">
                STEP 2
              </span>


              <h2>
                Search by pesticide name
              </h2>


              <p>
                Already know the pesticide name?
                Enter it below to find information
                from the AgriConnect database.
              </p>

            </div>

          </div>


          <div className="pesticide-name-search">

            <FaSearch />


            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              onKeyDown={
                handleSearchKeyDown
              }
              placeholder="Enter pesticide name..."
              aria-label="Pesticide name"
            />


            {searchTerm && (

              <button
                type="button"
                className="pesticide-name-clear"
                onClick={
                  handleClearSearch
                }
                aria-label="Clear search"
              >

                <FaTimes />

              </button>

            )}


            <button
              type="button"
              className="pesticide-name-search-button"
              onClick={
                handleSearch
              }
              disabled={isSearching}
            >

              {isSearching
                ? "Searching..."
                : "Search"}

            </button>

          </div>


          {/* ==================================
              SEARCH STATUS
          ================================== */}

          {isSearching && (

            <div className="pesticide-scanner-search-status">

              <div className="pesticide-scanner-spinner" />

              <span>
                Searching the AgriConnect pesticide
                database...
              </span>

            </div>
          )}


          {!isSearching &&
            searchError && (

              <div className="pesticide-scanner-search-error">

                <FaExclamationTriangle />

                <span>
                  {searchError}
                </span>

              </div>
            )}


          {!isSearching &&
            !searchError &&
            hasSearched &&
            searchResults.length > 0 && (

              <div className="pesticide-scanner-search-success">

                <FaCheckCircle />

                <span>
                  {searchResults.length}{" "}
                  {searchResults.length === 1
                    ? "pesticide"
                    : "pesticides"}{" "}
                  found
                </span>

              </div>
            )}

        </section>


        {/* ==================================
            SEARCH RESULTS
        ================================== */}

        {!isSearching &&
          searchResults.length > 0 && (

            <section className="pesticide-scanner-results">

              <div className="pesticide-scanner-results-header">

                <div>

                  <span>
                    DATABASE MATCHES
                  </span>


                  <h2>
                    Select a pesticide
                  </h2>

                </div>


                <strong>
                  {searchResults.length} found
                </strong>

              </div>


              <div className="pesticide-scanner-results-grid">

                {searchResults.map(
                  (pesticide) => (

                    <button
                      type="button"
                      key={pesticide.id}
                      className={`pesticide-scanner-result-card ${
                        selectedPesticide?.id ===
                        pesticide.id
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleSelectPesticide(
                          pesticide
                        )
                      }
                    >

                      <div className="pesticide-scanner-result-icon">
                        <FaFlask />
                      </div>


                      <div className="pesticide-scanner-result-content">

                        <span>
                          {displayValue(
                            pesticide.type,
                            "Pesticide"
                          )}
                        </span>


                        <h3>
                          {displayValue(
                            pesticide.name
                          )}
                        </h3>


                        <p>
                          {displayValue(
                            pesticide.activeIngredient,
                            "Active ingredient information unavailable"
                          )}
                        </p>

                      </div>


                      <div className="pesticide-scanner-result-check">

                        {selectedPesticide?.id ===
                          pesticide.id && (
                          <FaCheckCircle />
                        )}

                      </div>

                    </button>
                  )
                )}

              </div>

            </section>
          )}


        {/* ==================================
            SELECTED PESTICIDE DETAILS
        ================================== */}

        {selectedPesticide && (

          <section className="pesticide-scanner-details">

            <div className="pesticide-scanner-details-header">

              <div className="pesticide-scanner-details-icon">
                <FaFlask />
              </div>


              <div>

                <span>
                  PESTICIDE IDENTIFIED
                </span>


                <h2>
                  {displayValue(
                    selectedPesticide.name
                  )}
                </h2>


                <p>
                  {displayValue(
                    selectedPesticide.type,
                    "Registered pesticide"
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                ACTIVE INGREDIENT
            ================================== */}

            <div className="pesticide-scanner-info-section">

              <div className="pesticide-scanner-info-icon">
                <FaFlask />
              </div>


              <div>

                <h3>
                  Active Ingredient
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.activeIngredient
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                DESCRIPTION
            ================================== */}

            <div className="pesticide-scanner-info-section">

              <div className="pesticide-scanner-info-icon">
                <FaLeaf />
              </div>


              <div>

                <h3>
                  Description
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.description
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                USES
            ================================== */}

            <div className="pesticide-scanner-info-section">

              <div className="pesticide-scanner-info-icon">
                <FaCheckCircle />
              </div>


              <div>

                <h3>
                  Uses
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.uses
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                SUGGESTED CROPS
            ================================== */}

            <div className="pesticide-scanner-info-section">

              <div className="pesticide-scanner-info-icon">
                <FaLeaf />
              </div>


              <div>

                <h3>
                  Suggested Crops
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.crops ??
                    selectedPesticide.suggestedCrops
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                TARGET PESTS
            ================================== */}

            <div className="pesticide-scanner-info-section">

              <div className="pesticide-scanner-info-icon">
                <FaBug />
              </div>


              <div>

                <h3>
                  Target Pests
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.targetPests
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                SAFETY MEASURES
            ================================== */}

            <div className="pesticide-scanner-safety-details">

              <div className="pesticide-scanner-safety-details-icon">
                <FaShieldAlt />
              </div>


              <div>

                <h3>
                  Safety Measures
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.safetyMeasures
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                WARNINGS
            ================================== */}

            <div className="pesticide-scanner-warning-details">

              <div className="pesticide-scanner-warning-icon">
                <FaExclamationTriangle />
              </div>


              <div>

                <h3>
                  Warnings
                </h3>


                <p>
                  {displayValue(
                    selectedPesticide.warnings
                  )}
                </p>

              </div>

            </div>


            {/* ==================================
                CLOSE DETAILS
            ================================== */}

            <button
              type="button"
              className="pesticide-scanner-details-close"
              onClick={() =>
                setSelectedPesticide(null)
              }
            >
              Close Details
            </button>

          </section>
        )}


        {/* ==================================
            INFORMATION & SAFETY
        ================================== */}

        <section className="pesticide-scanner-safety">

          <div className="pesticide-scanner-safety-icon">
            <FaShieldAlt />
          </div>


          <div>

            <h2>
              Information & Safety
            </h2>


            <p>
              AgriConnect uses the identified
              product to find information from
              its database. Always verify the
              product label and follow applicable
              agricultural guidance before using
              any pesticide.
            </p>

          </div>

        </section>


      </main>

    </div>
  );
}


export default PesticideScanner;