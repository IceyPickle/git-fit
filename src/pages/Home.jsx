// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Build Strength. Track Progress. Stay Consistent.</h1>
          <p>
            Git Fit helps you log workouts, choose training splits, and keep notes—everything in one place.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn primary">Keep Track of Your Progress</Link>
            <Link to="/categories" className="btn">Explore Workouts</Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="quicklinks container">
        <h2>Jump to a section</h2>
        <div className="cards">
          <CardLink title="My Profile" desc="Calendar, notes, favorites" to="/profile" />
          <CardLink title="Categories" desc="Abs, legs, chest, back, more" to="/categories" />
          <CardLink title="Regimen" desc="Push/Pull/Legs or custom splits" to="/regimen" />
          <CardLink title="Login / Sign Up" desc="Save your progress" to="/login" />
        </div>
      </section>
    </div>
  );
}

function CardLink({ title, desc, to }) {
  return (
    <Link to={to} className="card-link">
      <div className="card-title">{title}</div>
      <div className="card-desc">{desc}</div>
    </Link>
  );
}
