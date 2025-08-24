/* src/pages/jsx/Exercise.jsx */

import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CATEGORY_LIST, getExercises } from "../../data/exercises";
import "../../components/ExerciseCard/ExerciseCard.css"; // reuse badges/btn/heart styles
import "../css/Exercise.css";                              // page-specific styles
import { getFavorites, toggleFavorite } from "../../utils/favorites";

export default function Exercise() {
  const { slug, exerciseId } = useParams();
  const navigate = useNavigate();

  const category = useMemo(
    () => CATEGORY_LIST.find((c) => c.slug === slug) || null,
    [slug]
  );

  const exercise = useMemo(() => {
    const list = getExercises(slug);
    return list.find((e) => e.id === exerciseId) || null;
  }, [slug, exerciseId]);

  const favKey = `${slug}:${exerciseId}`;
  const [isFav, setIsFav] = useState(getFavorites().includes(favKey));

  if (!category || !exercise) {
    return (
      <div className="exercise-page">
        <h1>Not found</h1>
        <p className="sub">
          Go back to{" "}
          <Link to={slug ? `/categories/${slug}` : "/categories"}>the list</Link>.
        </p>
      </div>
    );
  }

  const onToggleFav = () => {
    const next = toggleFavorite(favKey);
    setIsFav(next.includes(favKey));
  };

  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    exercise.name + " exercise demo"
  )}`;

  return (
    <div className="exercise-page">
      <div className="exercise-header">
        <button className="btn back" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        <div className="title-wrap">
          <h1 className="exercise-h1">{exercise.name}</h1>

          <div className="badges">
            <span className={`diff-badge diff-${exercise.difficulty.toLowerCase()}`}>
              {exercise.difficulty}
            </span>
          </div>

          <div className="meta-row">
            <span>
              <strong>Muscles:</strong> {exercise.muscles.join(", ")}
            </span>
            <span>
              <strong>Equipment:</strong> {exercise.equipment}
            </span>
            <span>
              <strong>Category:</strong> {category.name}
            </span>
          </div>
        </div>

        <button
          className={`heart ${isFav ? "is-fav" : ""}`}
          onClick={onToggleFav}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          aria-label={isFav ? "Unfavorite" : "Favorite"}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>

      <div className="exercise-body">
        <p className="desc">{exercise.description}</p>

        {/* Tips (curated from data only) */}
        {Array.isArray(exercise.tips) && exercise.tips.length > 0 && (
          <div className="tips">
            <h3>Tips</h3>
            <ul>
              {exercise.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Progressions (optional in data) */}
        {Array.isArray(exercise.progressions) && exercise.progressions.length > 0 && (
          <div className="progressions">
            <h3>Progressions</h3>
            <ul>
              {exercise.progressions.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="actions">
          <a href={youtubeSearch} target="_blank" rel="noreferrer" className="btn">
            Watch demo on YouTube
          </a>
          <button className="btn" title="Coming soon">
            Add to regimen (soon)
          </button>
          <button className="btn" title="Coming soon">
            Add a note (soon)
          </button>
        </div>
      </div>

      <div className="footer-links">
        <Link to={`/categories/${slug}`} className="link">
          &larr; Back to {category.name}
        </Link>
        <Link to="/categories" className="link">
          All categories
        </Link>
      </div>
    </div>
  );
}