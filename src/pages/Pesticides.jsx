import { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaBug,
  FaLeaf,
  FaFlask,
  FaSeedling,
  FaShieldAlt,
  FaRecycle,
  FaTimes,
  FaChevronRight,
  FaCamera,
  FaCloudUploadAlt,
  FaDatabase,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";

import "../styles/pesticides.css";


function Pesticides() {

  const navigate = useNavigate();


  // ========================================
  // STATE
  // ========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [selectedPesticide, setSelectedPesticide] =
    useState(null);

  const [databaseResults, setDatabaseResults] =
    useState([]);

  const [isSearchingDatabase, setIsSearchingDatabase] =
    useState(false);

  const [databaseError, setDatabaseError] =
    useState("");


  // ========================================
  // PESTICIDE INFORMATION
  // ========================================

  const pesticides = [

    // ======================================
    // INSECTICIDES
    // ======================================

    {
      id: 1,
      title: "Insecticides",
      category: "Insecticides",
      icon: <FaBug />,

      shortDescription:
        "Products used to manage insect pests that can damage crops.",

      description:
        "Insecticides are substances designed to control or manage insect pests. Their use should be based on proper pest identification, crop requirements, local agricultural guidance, and label instructions.",

      uses: [
        "Management of identified insect pests",
        "Protection of crops from insect damage",
        "Part of an integrated pest management strategy",
      ],

      safety:
        "Always identify the pest before considering control measures. Follow the product label, use appropriate protective equipment, and keep products away from children, animals, food, and water sources.",
    },


    // ======================================
    // FUNGICIDES
    // ======================================

    {
      id: 2,
      title: "Fungicides",
      category: "Fungicides",
      icon: <FaFlask />,

      shortDescription:
        "Products used to manage certain fungal diseases affecting plants.",

      description:
        "Fungicides are products used to manage fungal diseases in crops. Disease identification is important because symptoms caused by fungi can sometimes resemble other plant problems.",

      uses: [
        "Management of certain fungal diseases",
        "Protection of susceptible crops",
        "Part of an integrated disease-management program",
      ],

      safety:
        "Correctly identify the disease before treatment. Always follow the registered product label and local agricultural recommendations.",
    },


    // ======================================
    // HERBICIDES
    // ======================================

    {
      id: 3,
      title: "Herbicides",
      category: "Herbicides",
      icon: <FaLeaf />,

      shortDescription:
        "Products used to manage unwanted plants and weeds.",

      description:
        "Herbicides are substances used to control unwanted plants. Weed identification and understanding the crop, growth stage, and application restrictions are important before selecting a product.",

      uses: [
        "Management of unwanted weeds",
        "Reduction of competition between weeds and crops",
        "Part of integrated weed management",
      ],

      safety:
        "Use only products registered for the intended use. Avoid unintended contact with crops and non-target plants, and carefully follow the product label.",
    },


    // ======================================
    // BIOLOGICAL CONTROL
    // ======================================

    {
      id: 4,
      title: "Biological Control",
      category: "Biological",
      icon: <FaSeedling />,

      shortDescription:
        "Use beneficial organisms or biological products to help manage pests.",

      description:
        "Biological control uses beneficial organisms or biological agents to help manage agricultural pests. It is an important component of integrated pest management and can reduce reliance on conventional chemical control in suitable situations.",

      uses: [
        "Management of selected agricultural pests",
        "Support for integrated pest management",
        "Encouragement of beneficial organisms",
      ],

      safety:
        "Biological products have specific handling and storage requirements. Follow the product instructions and recommendations from qualified agricultural sources.",
    },


    // ======================================
    // INTEGRATED PEST MANAGEMENT
    // ======================================

    {
      id: 5,
      title: "Integrated Pest Management",
      category: "IPM",
      icon: <FaShieldAlt />,

      shortDescription:
        "Combine monitoring, prevention, biological, cultural, and other control methods.",

      description:
        "Integrated Pest Management, or IPM, combines different pest-management approaches based on monitoring and identification. The goal is to manage pests effectively while reducing unnecessary risks to people, beneficial organisms, and the environment.",

      uses: [
        "Regular crop and pest monitoring",
        "Correct identification of pests",
        "Combining multiple management approaches",
        "Reducing unnecessary pesticide use",
      ],

      safety:
        "Pesticides should not automatically be the first response to every pest problem. Use monitoring and appropriate management strategies before considering chemical control.",
    },


    // ======================================
    // RESPONSIBLE USE
    // ======================================

    {
      id: 6,
      title: "Responsible Pesticide Use",
      category: "Safety",
      icon: <FaShieldAlt />,

      shortDescription:
        "Follow responsible practices when handling and using crop-protection products.",

      description:
        "Responsible pesticide use means selecting only appropriate registered products, following label directions, using suitable protective equipment, storing products safely, and preventing contamination of people, food, animals, and water sources.",

      uses: [
        "Read and follow the product label",
        "Use appropriate protective equipment",
        "Store products securely",
        "Dispose of containers responsibly",
      ],

      safety:
        "Never use a pesticide without understanding its label and intended use. Keep products in their original containers and follow local disposal requirements.",
    },


    // ======================================
    // PESTICIDE RESISTANCE
    // ======================================

    {
      id: 7,
      title: "Resistance Management",
      category: "IPM",
      icon: <FaRecycle />,

      shortDescription:
        "Use integrated strategies to reduce the development of pest resistance.",

      description:
        "Repeated use of the same type of pest-control product can contribute to resistance in pest populations. Integrated management and following recognized resistance-management recommendations can help preserve the effectiveness of available control methods.",

      uses: [
        "Encourages integrated pest management",
        "Supports responsible product selection",
        "Reduces repeated dependence on one control method",
      ],

      safety:
        "Follow resistance-management guidance on registered product labels and recommendations from qualified agricultural authorities.",
    },
  ];


  // ========================================
  // CATEGORIES
  // ========================================

  const categories = [
    "All",
    "Insecticides",
    "Fungicides",
    "Herbicides",
    "Biological",
    "IPM",
    "Safety",
  ];


  // ========================================
  // LOCAL FILTER
  // ========================================

  const filteredPesticides = useMemo(() => {

    const search =
      searchTerm.trim().toLowerCase();

    return pesticides.filter(
      (pesticide) => {

        const matchesCategory =
          activeCategory === "All" ||
          pesticide.category === activeCategory;


        const matchesSearch =
          search === "" ||
          pesticide.title
            .toLowerCase()
            .includes(search) ||
          pesticide.shortDescription
            .toLowerCase()
            .includes(search) ||
          pesticide.description
            .toLowerCase()
            .includes(search) ||
          pesticide.category
            .toLowerCase()
            .includes(search);


        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );

  }, [
    searchTerm,
    activeCategory,
  ]);


  // ========================================
  // DATABASE SEARCH
  // ========================================

  useEffect(() => {

    const trimmedSearch =
      searchTerm.trim();


    if (!trimmedSearch) {

      setDatabaseResults([]);

      setDatabaseError("");

      setIsSearchingDatabase(false);

      return;
    }


    const controller =
      new AbortController();


    const searchDatabase =
      async () => {

        setIsSearchingDatabase(true);

        setDatabaseError("");


        try {

          const response =
            await fetch(
              `http://localhost:8080/api/pesticides/search?name=${encodeURIComponent(
                trimmedSearch
              )}`,
              {
                method: "GET",

                headers: {
                  Accept:
                    "application/json",
                },

                signal:
                  controller.signal,
              }
            );


          if (!response.ok) {

            throw new Error(
              `Database search failed (${response.status})`
            );
          }


          const data =
            await response.json();


          setDatabaseResults(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (error) {

          if (
            error.name ===
            "AbortError"
          ) {

            return;
          }


          console.error(
            "Pesticide database search error:",
            error
          );


          setDatabaseResults([]);

          setDatabaseError(
            "Unable to connect to the pesticide database."
          );

        } finally {

          if (
            !controller.signal.aborted
          ) {

            setIsSearchingDatabase(false);
          }
        }
      };


    const timer =
      setTimeout(
        searchDatabase,
        350
      );


    return () => {

      clearTimeout(timer);

      controller.abort();

    };

  }, [searchTerm]);


  // ========================================
  // CONVERT DATABASE RECORD
  // ========================================

  const convertDatabasePesticide =
    (pesticide) => {

      let icon =
        <FaFlask />;


      const type =
        (
          pesticide.type ||
          ""
        ).toLowerCase();


      if (
        type.includes("insect")
      ) {

        icon =
          <FaBug />;

      } else if (
        type.includes("fung")
      ) {

        icon =
          <FaFlask />;

      } else if (
        type.includes("herb")
      ) {

        icon =
          <FaLeaf />;

      } else if (
        type.includes("biological")
      ) {

        icon =
          <FaSeedling />;

      } else if (
        type.includes("ipm")
      ) {

        icon =
          <FaShieldAlt />;
      }


      return {

        ...pesticide,

        id:
          `db-${pesticide.id}`,

        title:
          pesticide.name,

        category:
          pesticide.type ||
          "Pesticide",

        icon,

        shortDescription:
          pesticide.activeIngredient
            ? `Active ingredient: ${pesticide.activeIngredient}`
            : "Pesticide information from the AgriConnect database.",

        description:
          pesticide.description ||
          "No additional description is currently available.",

        uses:
          pesticide.uses
            ? pesticide.uses
                .split(/[.;]/)
                .map(
                  (item) =>
                    item.trim()
                )
                .filter(Boolean)
            : [
                "Refer to the registered product label.",
              ],

        safety:
          pesticide.safetyMeasures ||
          "Follow the registered product label and local agricultural guidance.",

      };

    };


  // ========================================
  // DATABASE RESULT HANDLER
  // ========================================

  const handleOpenDatabasePesticide =
    (pesticide) => {

      setSelectedPesticide(
        convertDatabasePesticide(
          pesticide
        )
      );
    };


  // ========================================
  // OPEN KNOWLEDGE DETAILS
  // ========================================

  const handleOpenPesticide = (
    pesticide
  ) => {

    setSelectedPesticide(
      pesticide
    );
  };


  // ========================================
  // CLOSE DETAILS
  // ========================================

  const handleClosePesticide = () => {

    setSelectedPesticide(
      null
    );
  };


  // ========================================
  // CLEAR FILTERS
  // ========================================

  const handleClearFilters = () => {

    setSearchTerm("");

    setActiveCategory(
      "All"
    );

    setDatabaseResults([]);

    setDatabaseError("");
  };


  // ========================================
  // OPEN SMART SCANNER
  // ========================================

  const handleOpenScanner = () => {

    navigate(
      "/pesticide-scanner"
    );
  };


  // ========================================
  // PAGE
  // ========================================

  return (

    <div className="pesticides-page-layout">

      <Sidebar />


      <main className="pesticides-page">


        {/* ==================================
            HEADER
        ================================== */}

        <section className="pesticides-header">

          <div>

            <p className="pesticides-label">
              AgriLink Knowledge
            </p>

            <h1>
              Pesticides
            </h1>

            <p className="pesticides-subtitle">
              Learn about crop-protection products,
              integrated pest management, and
              responsible agricultural practices.
            </p>

          </div>

        </section>


        {/* ==================================
            SMART PESTICIDE FINDER
        ================================== */}

        <section className="pesticides-scanner-hero">

          <div className="pesticides-scanner-content">

            <div className="pesticides-scanner-icon">

              <span>
                🧪
              </span>

            </div>


            <div className="pesticides-scanner-text">

              <span className="pesticides-scanner-badge">
                SMART TOOL
              </span>

              <h2>
                Smart Pesticide Finder
              </h2>

              <p>
                Identify a pesticide by capturing
                a photo, uploading the product label,
                or searching by its name.
              </p>


              <div className="pesticides-scanner-methods">

                <span>
                  <FaCamera />
                  Capture
                </span>

                <span>
                  <FaCloudUploadAlt />
                  Upload
                </span>

                <span>
                  <FaSearch />
                  Search name
                </span>

              </div>

            </div>


            <button
              type="button"
              className="pesticides-scanner-button"
              onClick={
                handleOpenScanner
              }
            >

              Open Scanner

              <FaChevronRight />

            </button>

          </div>

        </section>


        {/* ==================================
            RESPONSIBLE USE
        ================================== */}

        <section className="pesticides-notice">

          <div className="pesticides-notice-icon">

            <FaShieldAlt />

          </div>


          <div>

            <h2>
              Use Responsibly
            </h2>

            <p>
              Always identify the pest or disease
              correctly and follow the registered
              product label and local agricultural
              guidance. Avoid unnecessary pesticide
              use and protect people, animals,
              beneficial organisms, and water sources.
            </p>

          </div>

        </section>


        {/* ==================================
            SEARCH
        ================================== */}

        <section className="pesticides-search-section">

          <div className="pesticides-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search pesticides and pest-management topics..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />


            {searchTerm && (

              <button
                type="button"
                className="pesticides-search-clear"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
              >

                <FaTimes />

              </button>

            )}

          </div>

        </section>


        {/* ==================================
            CATEGORIES
        ================================== */}

        <section className="pesticides-categories">

          {categories.map(
            (category) => (

              <button
                key={category}
                type="button"
                className={`pesticides-category-button ${
                  activeCategory === category
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
              >

                {category}

              </button>

            )
          )}

        </section>


        {/* ==================================
            DATABASE RESULTS
        ================================== */}

        {searchTerm.trim() && (

          <section className="pesticides-database-section">

            <div className="pesticides-results-info">

              <div className="pesticides-database-title">

                <FaDatabase />

                <h2>
                  Database Results
                </h2>

              </div>


              {!isSearchingDatabase &&
                !databaseError && (

                  <span>

                    {databaseResults.length}{" "}

                    {databaseResults.length === 1
                      ? "match"
                      : "matches"}

                  </span>

                )}

            </div>


            {isSearchingDatabase && (

              <div className="pesticides-database-status">

                <div className="pesticides-loading-spinner" />

                <span>
                  Searching AgriConnect pesticide database...
                </span>

              </div>

            )}


            {!isSearchingDatabase &&
              databaseError && (

                <div className="pesticides-database-error">

                  <FaShieldAlt />

                  <span>
                    {databaseError}
                  </span>

                </div>

            )}


            {!isSearchingDatabase &&
              !databaseError &&
              databaseResults.length === 0 && (

                <div className="pesticides-database-empty">

                  <FaSearch />

                  <div>

                    <strong>
                      No pesticide found
                    </strong>

                    <p>
                      Try another product name or check
                      the spelling.
                    </p>

                  </div>

                </div>

            )}


            {!isSearchingDatabase &&
              !databaseError &&
              databaseResults.length > 0 && (

                <div className="pesticides-database-grid">

                  {databaseResults.map(
                    (pesticide) => (

                      <article
                        key={
                          pesticide.id
                        }
                        className="pesticide-database-card"
                      >

                        <div className="pesticide-database-card-icon">

                          {convertDatabasePesticide(
                            pesticide
                          ).icon}

                        </div>


                        <div className="pesticide-database-card-content">

                          <span>
                            {pesticide.type ||
                              "Pesticide"}
                          </span>

                          <h3>
                            {pesticide.name}
                          </h3>


                          {pesticide.activeIngredient && (

                            <p>
                              <strong>
                                Active ingredient:
                              </strong>{" "}
                              {pesticide.activeIngredient}
                            </p>

                          )}

                        </div>


                        <button
                          type="button"
                          className="pesticide-database-card-button"
                          onClick={() =>
                            handleOpenDatabasePesticide(
                              pesticide
                            )
                          }
                        >

                          View Details

                          <FaChevronRight />

                        </button>

                      </article>

                    )
                  )}

                </div>

            )}

          </section>

        )}


        {/* ==================================
            KNOWLEDGE RESULTS
        ================================== */}

        <div className="pesticides-results-info">

          <h2>
            Crop Protection & Pest Management
          </h2>

          <span>

            {filteredPesticides.length}{" "}

            {filteredPesticides.length === 1
              ? "topic"
              : "topics"}

          </span>

        </div>


        {filteredPesticides.length > 0 ? (

          <section className="pesticides-grid">

            {filteredPesticides.map(
              (pesticide) => (

                <article
                  className="pesticide-card"
                  key={pesticide.id}
                >

                  <div className="pesticide-card-top">

                    <div className="pesticide-card-icon">

                      {pesticide.icon}

                    </div>


                    <span className="pesticide-card-category">

                      {pesticide.category}

                    </span>

                  </div>


                  <div className="pesticide-card-content">

                    <h3>
                      {pesticide.title}
                    </h3>

                    <p>
                      {pesticide.shortDescription}
                    </p>

                  </div>


                  <button
                    type="button"
                    className="pesticide-learn-button"
                    onClick={() =>
                      handleOpenPesticide(
                        pesticide
                      )
                    }
                  >

                    <span>
                      Learn more
                    </span>

                    <FaChevronRight />

                  </button>

                </article>

              )
            )}

          </section>

        ) : (

          <section className="pesticides-empty">

            <div className="pesticides-empty-icon">
              🔍
            </div>

            <h2>
              No topics found
            </h2>

            <p>
              Try a different search term
              or choose another category.
            </p>

            <button
              type="button"
              onClick={
                handleClearFilters
              }
            >
              Clear Filters
            </button>

          </section>

        )}


        {/* ==================================
            DETAILS MODAL
        ================================== */}

        {selectedPesticide && (

          <div
            className="pesticides-modal-overlay"
            onClick={
              handleClosePesticide
            }
          >

            <div
              className="pesticides-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                type="button"
                className="pesticides-modal-close"
                onClick={
                  handleClosePesticide
                }
                aria-label="Close"
              >

                <FaTimes />

              </button>


              <div className="pesticides-modal-icon">

                {selectedPesticide.icon}

              </div>


              <span className="pesticides-modal-category">

                {selectedPesticide.category}

              </span>


              <h2>
                {selectedPesticide.title}
              </h2>


              <p className="pesticides-modal-description">

                {selectedPesticide.description}

              </p>


              {selectedPesticide.activeIngredient && (

                <div className="pesticides-modal-section">

                  <h3>
                    Active Ingredient
                  </h3>

                  <p>
                    {selectedPesticide.activeIngredient}
                  </p>

                </div>

              )}


              <div className="pesticides-modal-section">

                <h3>
                  General Uses
                </h3>

                <ul>

                  {selectedPesticide.uses.map(
                    (use, index) => (

                      <li key={index}>
                        {use}
                      </li>

                    )
                  )}

                </ul>

              </div>


              {selectedPesticide.crops && (

                <div className="pesticides-modal-section">

                  <h3>
                    Crops
                  </h3>

                  <p>
                    {selectedPesticide.crops}
                  </p>

                </div>

              )}


              {selectedPesticide.targetPests && (

                <div className="pesticides-modal-section">

                  <h3>
                    Target Pests / Diseases
                  </h3>

                  <p>
                    {selectedPesticide.targetPests}
                  </p>

                </div>

              )}


              <div className="pesticides-modal-safety">

                <div className="pesticides-modal-safety-icon">

                  <FaShieldAlt />

                </div>


                <div>

                  <h3>
                    Safety
                  </h3>

                  <p>
                    {selectedPesticide.safety}
                  </p>

                </div>

              </div>


              {selectedPesticide.warnings && (

                <div className="pesticides-modal-safety">

                  <div className="pesticides-modal-safety-icon">

                    <FaShieldAlt />

                  </div>


                  <div>

                    <h3>
                      Important Warning
                    </h3>

                    <p>
                      {selectedPesticide.warnings}
                    </p>

                  </div>

                </div>

              )}


              <button
                type="button"
                className="pesticides-modal-done"
                onClick={
                  handleClosePesticide
                }
              >
                Close
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Pesticides;