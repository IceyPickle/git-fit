/* src/components/Navbar/Navbar.jsx */

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="nav-inner container">
        <Link to="/" className="logo">Git Fit</Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/regimen">Regimen</NavLink>
          {user && <NavLink to="/profile">My Profile</NavLink>}
        </nav>

        <div className="nav-cta">
          {!user ? (
            <>
              <NavLink to="/login" className="btn">Login</NavLink>
              <NavLink to="/signup" className="btn">Sign up</NavLink>
            </>
          ) : (
            <>
              <span className="who">{user.email}</span>
              <button className="btn danger" onClick={onLogout}>Sign out</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}