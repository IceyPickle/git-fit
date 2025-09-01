/* src/pages/Exercise/Exercise.jsx */

import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CATEGORY_LIST, getExercises } from "../../data/exercises";
import "../../components/ExerciseCard/ExerciseCard.css";
import "./Exercise.css";
import { getFavorites, toggleFavorite } from "../../utils/favorites";

import {
  makeKey as makeExerciseKey,
  listNotesFor,
  addNote,
  deleteNote,
  updateNote,          // ✅ new
} from "../../utils/notes";

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

  // Notes state
  const eKey = makeExerciseKey(slug, exerciseId);
  const [notes, setNotes] = useState(() => listNotesFor(eKey));

  // create form
  const [text, setText] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  // edit state
  const [editId, setEditId] = useState(null);
  const [eText, setEText] = useState("");
  const [eWeight, setEWeight] = useState("");
  const [eReps, setEReps] = useState("");
  const [eSets, setESets] = useState("");

  useEffect(() => {
    setNotes(listNotesFor(eKey));
  }, [eKey]);

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

  // Create a new note
  const onAddNote = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    const allBlank = !trimmed && weight === "" && reps === "" && sets === "";
    if (allBlank) return;

    addNote({
      slug,
      idPart: exerciseId,
      exerciseName: exercise.name,
      text: trimmed,
      weight,
      reps,
      sets,
    });
    setText(""); setWeight(""); setReps(""); setSets("");
    setNotes(listNotesFor(eKey));
  };

  const onDeleteNote = (noteId) => {
    deleteNote(noteId);
    setNotes(listNotesFor(eKey));
    if (editId === noteId) setEditId(null);
  };

  const startEdit = (n) => {
    setEditId(n.id);
    setEText(n.text || "");
    setEWeight(n.weight ?? "");
    setEReps(n.reps ?? "");
    setESets(n.sets ?? "");
  };
  const cancelEdit = () => {
    setEditId(null);
    setEText(""); setEWeight(""); setEReps(""); setESets("");
  };
  const saveEdit = (noteId) => {
    updateNote(noteId, {
      text: eText,
      weight: eWeight,
      reps: eReps,
      sets: eSets,
    });
    setNotes(listNotesFor(eKey));
    cancelEdit();
  };

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
            <span><strong>Muscles:</strong> {exercise.muscles.join(", ")}</span>
            <span><strong>Equipment:</strong> {exercise.equipment}</span>
            <span><strong>Category:</strong> {category.name}</span>
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

        {Array.isArray(exercise.tips) && exercise.tips.length > 0 && (
          <div className="tips">
            <h3>Tips</h3>
            <ul>{exercise.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        )}

        {Array.isArray(exercise.progressions) && exercise.progressions.length > 0 && (
          <div className="progressions">
            <h3>Progressions</h3>
            <ul>{exercise.progressions.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        )}

        <div className="actions">
          <a href={youtubeSearch} target="_blank" rel="noreferrer" className="btn">Watch demo on YouTube</a>
          <button className="btn" title="Coming soon">Add to regimen (soon)</button>
        </div>

        {/* Notes */}
        <div className="notes">
          <h3>My Notes</h3>

          <form className="note-form" onSubmit={onAddNote}>
            <div className="note-grid">
              <label><span>Weight (lb)</span>
                <input type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 135" />
              </label>
              <label><span>Reps</span>
                <input type="number" inputMode="numeric" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="e.g., 8" />
              </label>
              <label><span>Sets</span>
                <input type="number" inputMode="numeric" value={sets} onChange={(e) => setSets(e.target.value)} placeholder="e.g., 3" />
              </label>
            </div>
            <label className="note-text"><span>Notes</span>
              <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="How did it feel? Form cues? PRs?" />
            </label>
            <div className="note-actions"><button className="btn primary" type="submit">Add note</button></div>
          </form>

          {notes.length === 0 ? (
            <p className="empty">No notes yet. Log your first set!</p>
          ) : (
            <ul className="note-list">
              {notes.map((n) => (
                <li key={n.id} className="note-item">
                  {editId === n.id ? (
                    <>
                      <div className="note-meta">
                        <time>{new Date(n.createdAt).toLocaleString()}</time>
                        {n.updatedAt && <span className="note-stats"> · edited {new Date(n.updatedAt).toLocaleString()}</span>}
                      </div>

                      <div className="note-grid">
                        <label><span>Weight (lb)</span>
                          <input type="number" inputMode="decimal" value={eWeight} onChange={(e) => setEWeight(e.target.value)} />
                        </label>
                        <label><span>Reps</span>
                          <input type="number" inputMode="numeric" value={eReps} onChange={(e) => setEReps(e.target.value)} />
                        </label>
                        <label><span>Sets</span>
                          <input type="number" inputMode="numeric" value={eSets} onChange={(e) => setESets(e.target.value)} />
                        </label>
                      </div>
                      <label className="note-text"><span>Notes</span>
                        <textarea rows={3} value={eText} onChange={(e) => setEText(e.target.value)} />
                      </label>

                      <div className="note-row-actions">
                        <button className="btn primary" onClick={() => saveEdit(n.id)}>Save</button>
                        <button className="btn" onClick={cancelEdit} type="button">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="note-meta">
                        <time>{new Date(n.createdAt).toLocaleString()}</time>
                        {(n.weight || n.reps || n.sets) && (
                          <span className="note-stats">
                            {n.weight != null ? `${n.weight} lb` : ""}
                            {n.reps   != null ? ` · ${n.reps} reps` : ""}
                            {n.sets   != null ? ` · ${n.sets} sets` : ""}
                          </span>
                        )}
                        {n.updatedAt && <span className="note-stats"> · edited {new Date(n.updatedAt).toLocaleString()}</span>}
                      </div>
                      {n.text && <p className="note-textline">{n.text}</p>}
                      <div className="note-row-actions">
                        <button className="btn" onClick={() => startEdit(n)} type="button">Edit</button>
                        <button className="btn" onClick={() => onDeleteNote(n.id)} type="button">Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="footer-links">
        <Link to={`/categories/${slug}`} className="link">&larr; Back to {category.name}</Link>
        <Link to="/categories" className="link">All categories</Link>
      </div>
    </div>
  );
}
