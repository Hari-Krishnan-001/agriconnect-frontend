function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🌾 AgriConnect
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>About Us</li>
        <li>Features</li>
        <li>How It Works</li>
        <li>Contact</li>
      </ul>

      <button className="register-btn">
        Register
      </button>
    </nav>
  );
}

export default Navbar;