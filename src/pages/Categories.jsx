/* src/pages/Categories.jsx */

import { Link } from "react-router-dom";
import "./Categories.css";

export default function Categories() {
  const groups = [
    { slug: "abs", name: "Abs" },
    { slug: "legs", name: "Legs" },
    { slug: "biceps", name: "Biceps" },
    { slug: "triceps", name: "Triceps" },
    { slug: "cardio", name: "Cardio" },
    { slug: "chest", name: "Chest" },
    { slug: "back", name: "Back" },
    { slug: "forearm", name: "Forearm" },
  ];

  return (
    <div className="categories">
      <h1>Workout Categories</h1>
      <p className="sub">Pick a muscle group to explore demo workouts.</p>

      <div className="cat-grid">
        {groups.map(g => (
          <Link key={g.slug} to={`/categories/${g.slug}`} className="cat-card">
            <div className="cat-title">{g.name}</div>
            <div className="cat-desc">~10+ exercises • demos</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

