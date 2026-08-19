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

function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, title: "Dashboard" },
    { icon: <FaUser />, title: "My Profile" },
    { icon: <FaSeedling />, title: "Crops" },
    { icon: <FaShoppingCart />, title: "Orders" },
    { icon: <FaLeaf />, title: "Farming Techniques" },
    { icon: <FaFlask />, title: "Pesticides" },
    { icon: <FaComments />, title: "Messages" },
    { icon: <FaCog />, title: "Settings" },
    { icon: <FaSignOutAlt />, title: "Logout" }
  ];

  return (
    <div className="sidebar">
      <h2>AgriConnect</h2>

      {menuItems.map((item, index) => (
        <div className="sidebar-item" key={index}>
          {item.icon}

          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;