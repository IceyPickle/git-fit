/* src/components/ExerciseCard.jsx */

import "./ExerciseCard.css";

export default function ExerciseCard({ exercise, fav = false, onToggleFav }) {
  const { name, difficulty, muscles, equipment, description } = exercise;
  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    name + " exercise demo"
  )}`;

  return (
    <div className="exercise-card">
      <div className="exercise-head">
        <h3 className="exercise-title">{name}</h3>

        {/* Heart / favorite */}
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

      <p className="exercise-desc">{description}</p>

      <div className="exercise-actions">
        <a href={youtubeSearch} target="_blank" rel="noreferrer" className="btn">
          Watch demo
        </a>
      </div>
    </div>
  );
}
