import {
  FaHome,
  FaUser,
  FaSeedling,
  FaShoppingCart,
  FaLeaf,
  FaFlask,
  FaComments,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // Dashboard based on role
  const handleDashboard = () => {
    if (role === "FARMER") {
      navigate("/farmer/dashboard");
    } else if (role === "BUSINESS") {
      navigate("/business/dashboard");
    } else if (role === "STUDENT") {
      navigate("/student/dashboard");
    } else {
      navigate("/");
    }
  };

  // Crops / Marketplace based on role
  const handleCrops = () => {
    if (role === "FARMER") {
      navigate("/farmer/crops");
    } else {
      navigate("/marketplace");
    }
  };

  // Orders based on role
  const handleOrders = () => {
    if (role === "FARMER") {
      navigate("/farmer/orders");
    } else if (role === "BUSINESS") {
      navigate("/orders");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const menuItems = [
    {
      icon: <FaHome />,
      title: "Dashboard",
      onClick: handleDashboard
    },

    {
      icon: <FaUser />,
      title: "My Profile",
      onClick: () => {
        // Profile page can be added later
      }
    },

    {
      icon: <FaSeedling />,
      title: "Crops",
      onClick: handleCrops
    },

    {
      icon: <FaShoppingCart />,
      title: "Orders",
      onClick: handleOrders
    },

    {
      icon: <FaLeaf />,
      title: "Farming Techniques",
      onClick: () => {
        // Can be connected later
      }
    },

    {
      icon: <FaFlask />,
      title: "Pesticides",
      onClick: () => {
        // Can be connected later
      }
    },

    {
      icon: <FaComments />,
      title: "Messages",
      onClick: () => {
        // Can be connected later
      }
    },

    {
      icon: <FaCog />,
      title: "Settings",
      onClick: () => {
        // Can be connected later
      }
    },

    {
      icon: <FaSignOutAlt />,
      title: "Logout",
      onClick: handleLogout
    }
  ];

  return (
    <div className="sidebar">

      <h2>
        AgriConnect
      </h2>

      {menuItems.map((item, index) => (

        <div
          className="sidebar-item"
          key={index}
          onClick={item.onClick}
          style={{ cursor: "pointer" }}
        >

          {item.icon}

          <span>
            {item.title}
          </span>

        </div>

      ))}

    </div>
  );
}

export default Sidebar;