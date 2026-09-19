import { useMemo, useState } from "react";

import {
  FaSearch,
  FaSeedling,
  FaTint,
  FaLeaf,
  FaRecycle,
  FaSun,
  FaWater,
  FaTractor,
  FaFlask,
  FaBug,
  FaChartLine,
  FaHome,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

import Sidebar from "../components/sidebar/Sidebar";

import "../styles/knowledgeBase.css";


function KnowledgeBase() {

  // ========================================
  // STATE
  // ========================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [selectedTechnique, setSelectedTechnique] =
    useState(null);


  // ========================================
  // FARMING TECHNIQUES
  // ========================================

  const techniques = [

    // ======================================
    // CROPS
    // ======================================

    {
      id: 1,
      title: "Crop Rotation",
      category: "Crops",
      icon: <FaSeedling />,
      shortDescription:
        "Grow different crops in a planned sequence to support soil and crop management.",
      description:
        "Crop rotation involves changing the type of crop grown in a field across different growing seasons. Using a planned sequence can support soil fertility management, crop diversity, and management of recurring crop-specific pests and diseases.",
      benefits: [
        "Supports soil fertility management",
        "Encourages crop diversity",
        "Can reduce repeated pest pressure",
        "Helps improve nutrient planning",
      ],
    },

    {
      id: 2,
      title: "Intercropping",
      category: "Crops",
      icon: <FaSeedling />,
      shortDescription:
        "Grow two or more compatible crops together in the same field.",
      description:
        "Intercropping is the practice of growing more than one crop in the same field during part or all of a growing season. Different crop combinations can make use of available space, light, water, and nutrients in different ways.",
      benefits: [
        "Increases crop diversity",
        "Makes use of available growing space",
        "Can provide production diversity",
        "May support better resource use",
      ],
    },

    {
      id: 3,
      title: "Crop Diversification",
      category: "Crops",
      icon: <FaLeaf />,
      shortDescription:
        "Include a wider range of crops in a farming system.",
      description:
        "Crop diversification involves growing a variety of crops rather than depending heavily on a single crop. It can help create a more diverse farming system and may spread production risks.",
      benefits: [
        "Reduces dependence on one crop",
        "Encourages biodiversity",
        "Can spread production risk",
        "Provides different crop options",
      ],
    },

    {
      id: 4,
      title: "Cover Cropping",
      category: "Crops",
      icon: <FaLeaf />,
      shortDescription:
        "Grow crops primarily to protect and improve the soil between main crops.",
      description:
        "Cover crops are grown mainly for soil protection and management rather than direct harvest. Depending on the crop selected, they can help protect the soil surface and contribute organic material.",
      benefits: [
        "Protects exposed soil",
        "Can reduce erosion",
        "Adds plant material to the system",
        "Supports soil health",
      ],
    },

    {
      id: 5,
      title: "Companion Planting",
      category: "Crops",
      icon: <FaSeedling />,
      shortDescription:
        "Grow selected plant combinations together for complementary benefits.",
      description:
        "Companion planting involves growing certain plants together based on their complementary characteristics. The suitability of combinations depends on crop, climate, soil, and local growing conditions.",
      benefits: [
        "Encourages plant diversity",
        "Makes efficient use of growing space",
        "Can support beneficial organisms",
        "Creates more diverse planting systems",
      ],
    },


    // ======================================
    // WATER
    // ======================================

    {
      id: 6,
      title: "Drip Irrigation",
      category: "Water",
      icon: <FaTint />,
      shortDescription:
        "Deliver water in a controlled manner near the root zone.",
      description:
        "Drip irrigation supplies water slowly through emitters positioned near plants. It allows irrigation to be targeted closer to the root zone instead of applying water uniformly across the whole field.",
      benefits: [
        "Provides controlled water delivery",
        "Can reduce unnecessary water application",
        "Supports targeted irrigation",
        "Useful for many row crops",
      ],
    },

    {
      id: 7,
      title: "Sprinkler Irrigation",
      category: "Water",
      icon: <FaWater />,
      shortDescription:
        "Apply water over crops using a system of pipes and sprinklers.",
      description:
        "Sprinkler irrigation distributes water through sprinkler devices, creating droplets that fall over the crop area. Proper system design and operation are important for efficient water application.",
      benefits: [
        "Can cover larger areas",
        "Provides relatively uniform application",
        "Suitable for many crop systems",
        "Can be adapted to different field layouts",
      ],
    },

    {
      id: 8,
      title: "Rainwater Harvesting",
      category: "Water",
      icon: <FaTint />,
      shortDescription:
        "Collect and store rainwater for suitable agricultural uses.",
      description:
        "Rainwater harvesting involves collecting rainfall from suitable surfaces or areas and storing or directing it for later use. It can be part of a broader farm water-management strategy.",
      benefits: [
        "Makes use of seasonal rainfall",
        "Can provide supplementary water",
        "Supports water conservation",
        "Can reduce dependence on other sources",
      ],
    },

    {
      id: 9,
      title: "Water Conservation",
      category: "Water",
      icon: <FaWater />,
      shortDescription:
        "Use practical methods to reduce unnecessary water loss on farms.",
      description:
        "Water conservation includes a combination of irrigation scheduling, soil management, maintenance of irrigation systems, and practices that help retain moisture in the root zone.",
      benefits: [
        "Reduces unnecessary water loss",
        "Improves irrigation planning",
        "Supports sustainable water use",
        "Can improve farm resource efficiency",
      ],
    },

    {
      id: 10,
      title: "Smart Irrigation",
      category: "Water",
      icon: <FaChartLine />,
      shortDescription:
        "Use sensors and data to make irrigation decisions more efficiently.",
      description:
        "Smart irrigation systems can combine sensors, weather information, timers, and automated controls to help determine when and how much irrigation is needed.",
      benefits: [
        "Supports data-based irrigation",
        "Can reduce unnecessary watering",
        "Helps monitor soil conditions",
        "Can automate parts of irrigation management",
      ],
    },


    // ======================================
    // SOIL
    // ======================================

    {
      id: 11,
      title: "Composting",
      category: "Soil",
      icon: <FaRecycle />,
      shortDescription:
        "Convert suitable organic materials into a useful soil amendment.",
      description:
        "Composting is the controlled decomposition of suitable organic materials into a stable material that can be used as a soil amendment. Proper composting helps recycle organic resources.",
      benefits: [
        "Recycles organic materials",
        "Adds organic matter to soil",
        "Supports soil structure",
        "Helps reduce organic waste",
      ],
    },

    {
      id: 12,
      title: "Mulching",
      category: "Soil",
      icon: <FaLeaf />,
      shortDescription:
        "Cover the soil surface to support moisture and soil management.",
      description:
        "Mulching involves placing an appropriate layer of organic or other suitable material over the soil surface. It can help reduce evaporation, manage weeds, and protect the soil surface.",
      benefits: [
        "Helps reduce evaporation",
        "Can suppress some weeds",
        "Protects the soil surface",
        "Organic mulches can add organic matter",
      ],
    },

    {
      id: 13,
      title: "Soil Testing",
      category: "Soil",
      icon: <FaFlask />,
      shortDescription:
        "Assess soil properties to support informed soil management.",
      description:
        "Soil testing provides information about selected physical and chemical properties of soil. Farmers can use test results together with local agricultural guidance when planning soil-management practices.",
      benefits: [
        "Provides information about soil condition",
        "Supports better nutrient planning",
        "Helps identify soil-management needs",
        "Encourages evidence-based decisions",
      ],
    },

    {
      id: 14,
      title: "Green Manuring",
      category: "Soil",
      icon: <FaLeaf />,
      shortDescription:
        "Grow suitable plants and incorporate their biomass to support soil management.",
      description:
        "Green manuring involves growing plants specifically for incorporation into the soil. Suitable green-manure crops can contribute organic material and are often used as part of soil fertility management.",
      benefits: [
        "Adds organic material",
        "Supports soil fertility management",
        "Can improve soil structure",
        "Encourages nutrient cycling",
      ],
    },

    {
      id: 15,
      title: "Conservation Tillage",
      category: "Soil",
      icon: <FaTractor />,
      shortDescription:
        "Reduce unnecessary soil disturbance while maintaining crop production.",
      description:
        "Conservation tillage includes approaches that reduce the intensity or frequency of soil disturbance compared with conventional intensive tillage. Practices vary according to crop and local conditions.",
      benefits: [
        "Can reduce soil disturbance",
        "May help protect soil structure",
        "Can support erosion management",
        "May help retain crop residues",
      ],
    },


    // ======================================
    // ORGANIC
    // ======================================

    {
      id: 16,
      title: "Organic Farming",
      category: "Organic",
      icon: <FaLeaf />,
      shortDescription:
        "Use ecological approaches to manage crops, soil, and farm resources.",
      description:
        "Organic farming focuses on ecological farming practices, maintaining soil organic matter, encouraging biological processes, and using suitable natural and biological inputs within an appropriate production system.",
      benefits: [
        "Encourages soil biological activity",
        "Promotes ecological management",
        "Supports biodiversity",
        "Encourages responsible input management",
      ],
    },

    {
      id: 17,
      title: "Natural Pest Management",
      category: "Organic",
      icon: <FaBug />,
      shortDescription:
        "Use ecological methods to manage pest populations.",
      description:
        "Natural pest management can include cultural practices, biological control, habitat management, monitoring, and other non-chemical approaches. Effective strategies depend on the crop, pest, and local conditions.",
      benefits: [
        "Encourages ecological pest management",
        "Supports beneficial organisms",
        "Can reduce unnecessary chemical use",
        "Promotes regular crop monitoring",
      ],
    },

    {
      id: 18,
      title: "Vermicomposting",
      category: "Organic",
      icon: <FaRecycle />,
      shortDescription:
        "Use earthworms and microorganisms to process suitable organic materials.",
      description:
        "Vermicomposting uses earthworms and microorganisms to break down suitable organic materials into a nutrient-rich organic amendment. Proper moisture, aeration, and suitable feed materials are important.",
      benefits: [
        "Recycles organic materials",
        "Produces organic amendment",
        "Supports waste reduction",
        "Can complement soil-management practices",
      ],
    },


    // ======================================
    // MODERN
    // ======================================

    {
      id: 19,
      title: "Protected Cultivation",
      category: "Modern",
      icon: <FaHome />,
      shortDescription:
        "Grow crops inside structures that provide greater control over conditions.",
      description:
        "Protected cultivation uses structures such as greenhouses, polyhouses, and shade structures to provide greater control over environmental factors such as temperature, humidity, light, and physical exposure.",
      benefits: [
        "Provides greater environmental control",
        "Can protect crops from some weather conditions",
        "Supports specialized crop production",
        "Can extend suitable growing periods",
      ],
    },

    {
      id: 20,
      title: "Precision Agriculture",
      category: "Modern",
      icon: <FaChartLine />,
      shortDescription:
        "Use data and technology to manage farm resources more precisely.",
      description:
        "Precision agriculture uses technologies such as GPS, sensors, satellite imagery, drones, and farm data to understand field variation and support more precise decisions about crops and farm resources.",
      benefits: [
        "Supports data-based decisions",
        "Helps identify field variation",
        "Can improve resource management",
        "Encourages efficient farm planning",
      ],
    },

    {
      id: 21,
      title: "Hydroponics",
      category: "Modern",
      icon: <FaTint />,
      shortDescription:
        "Grow plants without conventional soil using a controlled nutrient solution.",
      description:
        "Hydroponics is a method of growing plants without conventional soil. Plant roots receive water, nutrients, oxygen, and other required conditions through a controlled growing system.",
      benefits: [
        "Can be used where soil is limited",
        "Allows controlled nutrient management",
        "Can support efficient space use",
        "Suitable for controlled growing environments",
      ],
    },

    {
      id: 22,
      title: "Vertical Farming",
      category: "Modern",
      icon: <FaSeedling />,
      shortDescription:
        "Grow crops in vertically arranged layers to make efficient use of space.",
      description:
        "Vertical farming uses stacked or vertically arranged growing areas, often in controlled environments. It can combine technologies such as hydroponics, artificial lighting, and environmental monitoring.",
      benefits: [
        "Makes efficient use of vertical space",
        "Can support controlled production",
        "Useful where land is limited",
        "Can enable production close to urban areas",
      ],
    },
  ];


  // ========================================
  // CATEGORIES
  // ========================================

  const categories = [
    "All",
    "Soil",
    "Water",
    "Crops",
    "Organic",
    "Modern",
  ];


  // ========================================
  // FILTER TECHNIQUES
  // ========================================

  const filteredTechniques = useMemo(() => {

    const search =
      searchTerm.trim().toLowerCase();


    return techniques.filter(
      (technique) => {

        const matchesCategory =
          activeCategory === "All" ||
          technique.category ===
            activeCategory;


        const matchesSearch =
          search === "" ||
          technique.title
            .toLowerCase()
            .includes(search) ||
          technique.shortDescription
            .toLowerCase()
            .includes(search) ||
          technique.description
            .toLowerCase()
            .includes(search) ||
          technique.category
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
  // OPEN TECHNIQUE
  // ========================================

  const handleOpenTechnique = (
    technique
  ) => {

    setSelectedTechnique(
      technique
    );
  };


  // ========================================
  // CLOSE TECHNIQUE
  // ========================================

  const handleCloseTechnique = () => {

    setSelectedTechnique(null);
  };


  // ========================================
  // CLEAR FILTERS
  // ========================================

  const handleClearFilters = () => {

    setSearchTerm("");

    setActiveCategory("All");
  };


  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="knowledge-page-layout">

      <Sidebar />


      <main className="knowledge-page">

        {/* ==================================
            HEADER
        ================================== */}

        <section className="knowledge-header">

          <div>

            <p className="knowledge-label">
              AgriLink Knowledge
            </p>

            <h1>
              Farming Techniques
            </h1>

            <p className="knowledge-subtitle">
              Explore practical farming methods
              and learn how different techniques
              can support better farm management.
            </p>

          </div>

        </section>


        {/* ==================================
            SEARCH
        ================================== */}

        <section className="knowledge-search-section">

          <div className="knowledge-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search farming techniques..."
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
                className="knowledge-search-clear"
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

        <section className="knowledge-categories">

          {categories.map(
            (category) => (

              <button
                key={category}
                type="button"
                className={`knowledge-category-button ${
                  activeCategory ===
                  category
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
            RESULTS INFO
        ================================== */}

        <div className="knowledge-results-info">

          <h2>
            Farming Techniques
          </h2>

          <span>
            {filteredTechniques.length}{" "}
            {filteredTechniques.length === 1
              ? "technique"
              : "techniques"}
          </span>

        </div>


        {/* ==================================
            TECHNIQUE GRID
        ================================== */}

        {filteredTechniques.length > 0 ? (

          <section className="knowledge-grid">

            {filteredTechniques.map(
              (technique) => (

                <article
                  className="knowledge-card"
                  key={technique.id}
                >

                  <div className="knowledge-card-top">

                    <div className="knowledge-card-icon">
                      {technique.icon}
                    </div>


                    <span className="knowledge-card-category">
                      {technique.category}
                    </span>

                  </div>


                  <div className="knowledge-card-content">

                    <h3>
                      {technique.title}
                    </h3>

                    <p>
                      {technique.shortDescription}
                    </p>

                  </div>


                  <button
                    type="button"
                    className="knowledge-learn-button"
                    onClick={() =>
                      handleOpenTechnique(
                        technique
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

          /* ==================================
             EMPTY STATE
          ================================== */

          <section className="knowledge-empty">

            <div className="knowledge-empty-icon">
              🔍
            </div>


            <h2>
              No techniques found
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
            DETAIL MODAL
        ================================== */}

        {selectedTechnique && (

          <div
            className="knowledge-modal-overlay"
            onClick={
              handleCloseTechnique
            }
          >

            <div
              className="knowledge-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                type="button"
                className="knowledge-modal-close"
                onClick={
                  handleCloseTechnique
                }
                aria-label="Close"
              >
                <FaTimes />
              </button>


              <div className="knowledge-modal-icon">
                {selectedTechnique.icon}
              </div>


              <span className="knowledge-modal-category">
                {selectedTechnique.category}
              </span>


              <h2>
                {selectedTechnique.title}
              </h2>


              <p className="knowledge-modal-description">
                {selectedTechnique.description}
              </p>


              <div className="knowledge-modal-benefits">

                <h3>
                  Key Benefits
                </h3>


                <ul>

                  {selectedTechnique.benefits.map(
                    (benefit, index) => (

                      <li
                        key={index}
                      >
                        {benefit}
                      </li>

                    )
                  )}

                </ul>

              </div>


              <button
                type="button"
                className="knowledge-modal-done"
                onClick={
                  handleCloseTechnique
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

export default KnowledgeBase;