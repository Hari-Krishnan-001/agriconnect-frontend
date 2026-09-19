import {
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaSeedling,
  FaShoppingCart,
  FaLeaf,
  FaFlask,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useSidebar } from "./SidebarContext";


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
  } = useSidebar();


  // ========================================
  // GET LOGGED-IN USER
  // ========================================

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error(
      "Failed to read stored user:",
      error
    );
  }

  const role = user?.role;


  // ========================================
  // ROLE-BASED PATHS
  // ========================================

  const dashboardPath =
    role === "BUSINESS"
      ? "/business/dashboard"
      : role === "STUDENT"
      ? "/student/dashboard"
      : "/farmer/dashboard";


  const profilePath =
    role === "BUSINESS"
      ? "/business/profile"
      : role === "STUDENT"
      ? "/student/profile"
      : "/farmer/profile";


  const ordersPath =
    role === "FARMER"
      ? "/farmer/orders"
      : "/orders";


  // ========================================
  // MENU ITEMS
  // ========================================

  const menuItems = [

    // ======================================
    // HOME / LANDING PAGE
    // ======================================

    {
      icon: <FaHome />,
      title: "Home",
      path: "/",
    },


    // ======================================
    // DASHBOARD
    // ======================================

    {
      icon: <FaTachometerAlt />,
      title: "Dashboard",
      path: dashboardPath,
    },


    // ======================================
    // PROFILE
    // ======================================

    {
      icon: <FaUser />,
      title: "My Profile",
      path: profilePath,
    },


    // ======================================
    // FARMER CROPS
    // ======================================

    ...(role === "FARMER"
      ? [
          {
            icon: <FaSeedling />,
            title: "Crops",
            path: "/farmer/crops",
          },
        ]
      : []),


    // ======================================
    // ORDERS
    // ======================================

    {
      icon: <FaShoppingCart />,
      title: "Orders",
      path: ordersPath,
    },


    // ======================================
    // FARMING TECHNIQUES
    // ======================================

    {
      icon: <FaLeaf />,
      title: "Farming Techniques",
      path: "/farming-techniques",
    },


    // ======================================
    // PESTICIDES
    // ======================================

    {
      icon: <FaFlask />,
      title: "Pesticides",
      path: "/pesticides",
    },


    // ======================================
    // MESSAGES
    // ======================================

    {
      icon: <FaComments />,
      title: "Messages",
      path: "/messages",
    },


    // ======================================
    // SETTINGS
    // ======================================

    {
      icon: <FaCog />,
      title: "Settings",
      path: "/settings",
    },

  ];


  // ========================================
  // NAVIGATION
  // ========================================

  const handleNavigation = (path) => {

    navigate(path);

    // Close sidebar after navigation
    closeSidebar();
  };


  // ========================================
  // ACTIVE ITEM
  // ========================================

  const isActive = (path) => {

    // Home should only be active on exact "/"
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    closeSidebar();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  // ========================================
  // SIDEBAR
  // ========================================

  return (
    <>

      {/* ====================================
          OPEN SIDEBAR BUTTON
      ==================================== */}

      {!isSidebarOpen && (

        <button
          type="button"
          className="sidebar-toggle-button"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
        >

          <FaBars />

        </button>

      )}


      {/* ====================================
          OVERLAY
      ==================================== */}

      {isSidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />

      )}


      {/* ====================================
          SIDEBAR
      ==================================== */}

      <aside
        className={`sidebar ${
          isSidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >

        {/* ==================================
            LOGO
        ================================== */}

        <div className="sidebar-logo">

          <div className="sidebar-logo-row">

            <h2>
              AgriLink
            </h2>


            <button
              type="button"
              className="sidebar-close-button"
              onClick={closeSidebar}
              aria-label="Close navigation menu"
            >

              <FaTimes />

            </button>

          </div>

        </div>


        {/* ==================================
            NAVIGATION
        ================================== */}

        <nav className="sidebar-menu">

          {menuItems.map((item) => (

            <div
              key={item.title}
              className={`sidebar-item ${
                isActive(item.path)
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation(item.path)
              }
            >

              <span className="sidebar-icon">

                {item.icon}

              </span>


              <span className="sidebar-text">

                {item.title}

              </span>

            </div>

          ))}

        </nav>


        {/* ==================================
            LOGOUT
        ================================== */}

        <div
          className="sidebar-item logout-item"
          onClick={handleLogout}
        >

          <span className="sidebar-icon">

            <FaSignOutAlt />

          </span>


          <span className="sidebar-text">

            Logout

          </span>

        </div>

      </aside>

    </>
  );
}


export default Sidebar;