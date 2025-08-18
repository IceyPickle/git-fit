/* src/components/Navbar.jsx */

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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

          {user ? (
            <>
              <span className="nav-link" style={{ opacity: 0.8 }}>{user.email}</span>
              <button
                className="nav-link"
                onClick={() => { logout(); navigate("/"); }}
                style={{ background: "transparent" }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={cls}>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
