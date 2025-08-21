/* src/pages/Categories.jsx */

import { Link } from "react-router-dom";
import "../css/Categories.css";

export default function Categories() {
  const groups = [
    { name: "Abs", to: "/categories/abs" },
    { name: "Legs", to: "/categories/legs" },
    { name: "Chest", to: "/categories/chest" },
    { name: "Back", to: "/categories/back" },
    { name: "Biceps", to: "/categories/biceps" },
    { name: "Triceps", to: "/categories/triceps" },
    { name: "Cardio", to: "/categories/cardio" },
    { name: "Forearms", to: "/categories/forearms" },
  ];

  return (
    <div className="categories">
      <h1>Workout Categories</h1>
      <p className="sub">Pick a muscle group to explore demo workouts.</p>

      <div className="cat-grid">
        {groups.map((g) => (
          <Link key={g.name} to={g.to} className="cat-card">
            <div className="cat-title">{g.name}</div>
            <div className="cat-desc">~10+ exercises • demos</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
