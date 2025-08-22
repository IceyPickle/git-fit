/* src/pages/jsx/Category.jsx */

import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CATEGORY_LIST, EXERCISES_BY_CATEGORY } from "../../data/exercises";
import "../../components/ExerciseCard/ExerciseCard.css";
import "../css/Category.css";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import { getFavorites, toggleFavorite } from "../../utils/favorites";

export default function Category() {
  const { slug } = useParams();
  const category = useMemo(
    () => CATEGORY_LIST.find((c) => c.slug === slug) || null,
    [slug]
  );

  const allExercises = useMemo(
    () => EXERCISES_BY_CATEGORY[slug] ?? [],
    [slug]
  );

  const [q, setQ] = useState("");
  const [diff, setDiff] = useState("All");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [favKeys, setFavKeys] = useState([]);

  // Load favorites on page load & when slug changes
  useEffect(() => {
    setFavKeys(getFavorites());
  }, [slug]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return allExercises.filter((ex) => {
      const matchesQ =
        !ql ||
        ex.name.toLowerCase().includes(ql) ||
        ex.muscles.join(" ").toLowerCase().includes(ql);
      const matchesDiff = diff === "All" || ex.difficulty === diff;

      const key = `${slug}:${ex.id}`;
      const matchesFav = !onlyFavs || favKeys.includes(key);

      return matchesQ && matchesDiff && matchesFav;
    });
  }, [q, diff, onlyFavs, allExercises, favKeys, slug]);

  if (!category) {
    return (
      <div className="category-page">
        <h1>Category not found</h1>
        <p className="sub">
          Go back to <Link to="/categories">Categories</Link>.
        </p>
      </div>
    );
  }

  const handleToggleFav = (exId) => {
    const key = `${slug}:${exId}`;
    const next = toggleFavorite(key);
    setFavKeys(next);
  };

  return (
    <div className="category-page">
      <div className="cat-header">
        <div>
          <h1>{category.name}</h1>
          <p className="sub">{allExercises.length} exercises available</p>
        </div>

        <div className="cat-controls">
          <input
            className="input"
            placeholder="Search by name or muscle…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="select"
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <label className="checkbox-inline">
            <input
              type="checkbox"
              checked={onlyFavs}
              onChange={(e) => setOnlyFavs(e.target.checked)}
            />
            Show only favorites
          </label>
        </div>
      </div>

      <div className="exercise-grid">
        {filtered.map((ex) => {
          const fav = favKeys.includes(`${slug}:${ex.id}`);
          return (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              fav={fav}
              onToggleFav={() => handleToggleFav(ex.id)}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty">No exercises match your search/filter.</div>
      )}

      <div className="backlink">
        <Link to="/categories" className="link">
          &larr; Back to Categories
        </Link>
      </div>
    </div>
  );
}
