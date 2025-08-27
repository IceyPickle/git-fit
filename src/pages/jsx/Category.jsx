/* src/pages/jsx/Category.jsx */

import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORY_LIST, getExercises } from "../../data/exercises";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import "../css/Category.css";
import { getFavorites, toggleFavorite } from "../../utils/favorites";


export default function Category() {
  const { slug } = useParams();

  const category = useMemo(
    () => CATEGORY_LIST.find((c) => c.slug === slug) || null,
    [slug]
  );

  const allExercises = useMemo(() => getExercises(slug), [slug]);

  // favorites (store keys as `${slug}:${id}`)
  const [favKeys, setFavKeys] = useState([]);
  useEffect(() => {
    setFavKeys(getFavorites());
  }, [slug]);

  const handleToggleFav = (id) => {
    const next = toggleFavorite(`${slug}:${id}`);
    setFavKeys(next);
  };

  // filters
  const [query, setQuery] = useState("");
  const [diff, setDiff] = useState("all");
  const [onlyFavs, setOnlyFavs] = useState(false);

  const filtered = useMemo(() => {
    return allExercises.filter((ex) => {
      if (onlyFavs && !favKeys.includes(`${slug}:${ex.id}`)) return false;
      if (diff !== "all" && ex.difficulty.toLowerCase() !== diff) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${ex.name} ${ex.description} ${ex.muscles.join(" ")} ${ex.equipment}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allExercises, onlyFavs, diff, query, favKeys, slug]);

  if (!category) {
    return (
      <div className="category-page container">
        <h1>Category not found</h1>
        <Link to="/categories" className="link">
          &larr; Back to all categories
        </Link>
      </div>
    );
  }

  return (
    <div className="category-page container">
      <header className="cat-header">
        <h1>{category.name}</h1>
        <p className="sub">{category.desc || "Choose an exercise to learn more."}</p>
        <div className="cat-controls">
          <input
            className="input"
            placeholder="Search exercises…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="select"
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
          >
            <option value="all">All difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={onlyFavs}
              onChange={(e) => setOnlyFavs(e.target.checked)}
            />
            Favorites only
          </label>
        </div>
      </header>

      <section className="grid-cards">
        {filtered.length === 0 ? (
          <div className="empty">No matches. Try adjusting filters.</div>
        ) : (
          filtered.map((ex) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              fav={favKeys.includes(`${slug}:${ex.id}`)}
              onToggleFav={() => handleToggleFav(ex.id)}
              slug={slug}
            />
          ))
        )}
      </section>

      <footer className="cat-footer">
        <Link to="/categories" className="link">
          &larr; Back to all categories
        </Link>
      </footer>
    </div>
  );
}