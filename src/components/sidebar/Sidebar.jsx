import {
  FaHome,
  FaUser,
  FaSeedling,
  FaShoppingCart,
  FaLeaf,
  FaFlask,
  FaComments,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ========================================
  // GET LOGGED-IN USER
  // ========================================

  const storedUser =
    localStorage.getItem("user");

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
    role === "BUSINESS"
      ? "/orders"
      : role === "FARMER"
      ? "/farmer/orders"
      : "/orders";


  // ========================================
  // MENU ITEMS
  // ========================================

  const menuItems = [

    // Dashboard

    {
      icon: <FaHome />,
      title: "Dashboard",
      path: dashboardPath,
    },


    // Profile

    {
      icon: <FaUser />,
      title: "My Profile",
      path: profilePath,
    },


    // Farmer-specific crops

    ...(role === "FARMER"
      ? [
          {
            icon: <FaSeedling />,
            title: "Crops",
            path: "/farmer/crops",
          },
        ]
      : []),


    // Orders

    {
      icon: <FaShoppingCart />,
      title: "Orders",
      path: ordersPath,
    },


    // Farming Knowledge

    {
      icon: <FaLeaf />,
      title: "Farming Techniques",
      path: "/knowledge",
    },


    // Pesticides

    {
      icon: <FaFlask />,
      title: "Pesticides",
      path: "/knowledge",
    },


    // Messages

    {
      icon: <FaComments />,
      title: "Messages",
      path: "/messages",
    },


    // Settings

    {
      icon: <FaCog />,
      title: "Settings",
      path: "/settings",
    },
  ];


  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };


  // ========================================
  // SIDEBAR
  // ========================================

  return (
    <div className="sidebar">

      <h2>
        AgriConnect
      </h2>


      <div className="sidebar-menu">

        {menuItems.map((item) => {

          const isActive =
            location.pathname === item.path;


          return (
            <div
              className={`sidebar-item ${
                isActive
                  ? "active"
                  : ""
              }`}
              key={item.title}
              onClick={() =>
                navigate(item.path)
              }
            >

              {item.icon}

              <span>
                {item.title}
              </span>

            </div>
          );
        })}

      </div>


      {/* Logout */}

      <div
        className="sidebar-item logout-item"
        onClick={handleLogout}
      >

        <FaSignOutAlt />

        <span>
          Logout
        </span>

      </div>

    </div>
  );
}

export default Sidebar;