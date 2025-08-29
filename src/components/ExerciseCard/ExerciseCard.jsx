/* src/components/ExerciseCard/ExerciseCard.jsx */

import "./ExerciseCard.css";
import { Link } from "react-router-dom";

export default function ExerciseCard({ exercise, fav = false, onToggleFav, slug }) {
  const { id, name, difficulty, muscles, equipment, description, tips } = exercise;

  // Tip preview (first curated tip)
  const tipPreview = Array.isArray(tips) && tips.length > 0 ? tips[0] : null;

  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    name + " exercise demo"
  )}`;

  return (
    <div className="exercise-card">
      {/* Make title a link to details */}
      <div className="exercise-head">
        <h3 className="exercise-title">
          <Link to={`/categories/${slug}/${id}`} className="link-plain">
            {name}
          </Link>
        </h3>

        <button
          type="button"
          className={`heart ${fav ? "is-fav" : ""}`}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          title={fav ? "Remove from favorites" : "Add to favorites"}
          onClick={onToggleFav}
        >
          {fav ? "♥" : "♡"}
        </button>

        <span className={`diff-badge diff-${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </div>

      <div className="exercise-meta">
        <span><strong>Muscles:</strong> {muscles.join(", ")}</span>
        <span><strong>Equipment:</strong> {equipment}</span>
      </div>

      {tipPreview && <div className="tip-preview">{tipPreview}</div>}

      <p className="exercise-desc">{description}</p>

      <div className="exercise-actions">
        <Link to={`/categories/${slug}/${id}`} className="btn">View details</Link>
        <a href={youtubeSearch} target="_blank" rel="noreferrer" className="btn">Watch demo</a>
      </div>
    </div>
  );
}
