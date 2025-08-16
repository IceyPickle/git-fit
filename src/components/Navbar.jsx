// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const cls = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <NavLink to="/" className="brand">
          <span className="dot" />
          <span className="brand-name">Git Fit</span>
        </NavLink>
        <nav className="links">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/profile" className={cls}>My Profile</NavLink>
          <NavLink to="/categories" className={cls}>Categories</NavLink>
          <NavLink to="/regimen" className={cls}>Regimen</NavLink>
          <NavLink to="/login" className={cls}>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
