// src/components/Navbar/Navbar.jsx

import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">Git Fit</Link>

        <nav className="nav-links">
          <NavLink to="/categories" className="nav-link">Categories</NavLink>
          <NavLink to="/regimen" className="nav-link">Regimen</NavLink>
          <NavLink to="/profile" className="nav-link">My Profile</NavLink>
          <NavLink to="/login" className="nav-link btn-login">Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
