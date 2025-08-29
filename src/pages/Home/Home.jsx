/* src/pages/Home/Home.jsx */

import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { CATEGORY_LIST, getExercises } from "../../data/exercises";
import { getFavorites } from "../../utils/favorites";
import "./Home.css";

function resolveFavorite(key) {
  // key format: "<slug>:<exerciseId>"
  const [slug, id] = key.split(":");
  const category = CATEGORY_LIST.find((c) => c.slug === slug) || null;
  const list = getExercises(slug);
  const exercise = list.find((e) => e.id === id) || null;
  if (!category || !exercise) return null;
  return { slug, id, category, exercise };
}

export default function Home() {
  const [favKeys, setFavKeys] = useState([]);

  useEffect(() => {
    setFavKeys(getFavorites());
  }, []);

  // take the last 4 (most recently saved, assuming your toggle append behavior), newest first
  const recentFavs = useMemo(() => {
    if (!favKeys?.length) return [];
    return [...favKeys]
      .slice(-4)
      .reverse()
      .map(resolveFavorite)
      .filter(Boolean);
  }, [favKeys]);

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
      <section className="quicklinks">
        <h2>Jump to a section</h2>
        <div className="cards">
          <CardLink title="My Profile" desc="Calendar, notes, favorites" to="/profile" />
          <CardLink title="Categories" desc="Abs, legs, chest, back, more" to="/categories" />
          <CardLink title="Regimen" desc="Push/Pull/Legs or custom splits" to="/regimen" />
          <CardLink title="Login / Sign Up" desc="Save your progress" to="/login" />
        </div>
      </section>

      {/* My Favorites (shows only if any exist) */}
      {recentFavs.length > 0 && (
        <section className="home-favs">
          <div className="home-favs-head">
            <h2>My Favorites</h2>
            <Link to="/profile" className="link">View all →</Link>
          </div>

          <div className="fav-mini-grid">
            {recentFavs.map(({ slug, id, category, exercise }) => (
              <Link
                key={`${slug}:${id}`}
                to={`/categories/${slug}/${id}`}
                className="fav-mini-card"
                title={`Open ${exercise.name}`}
              >
                <div className="fav-mini-top">
                  <span className={`diff-badge diff-${exercise.difficulty.toLowerCase()}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="fav-heart">♥</span>
                </div>
                <div className="fav-mini-title">{exercise.name}</div>
                <div className="fav-mini-sub">
                  {category.name} • {exercise.muscles.slice(0, 2).join(", ")}
                </div>
                {Array.isArray(exercise.tips) && exercise.tips[0] && (
                  <div className="fav-mini-tip">{exercise.tips[0]}</div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
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
