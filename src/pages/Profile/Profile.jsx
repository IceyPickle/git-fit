/* src/pages/jsx/Profile.jsx */

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CATEGORY_LIST, getExercises } from "../../data/exercises";
import { getFavorites, toggleFavorite } from "../../utils/favorites";
import { getAllNotes, setNote, deleteNote } from "../../utils/notes";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();

  // favorites: ["slug:exerciseId", ...]
  const [favKeys, setFavKeys] = useState([]);
  // notes map: { "slug:id": "text", ... }
  const [notesMap, setNotesMap] = useState({});

  useEffect(() => {
    setFavKeys(getFavorites());
    setNotesMap(getAllNotes());
  }, []);

  // Resolve a favorite key -> { slug, id, category, exercise }
  const resolvedFavorites = useMemo(() => {
    return favKeys
      .map((key) => {
        const [slug, id] = key.split(":");
        const category = CATEGORY_LIST.find((c) => c.slug === slug) || null;
        const list = getExercises(slug);
        const exercise = list.find((e) => e.id === id) || null;
        if (!category || !exercise) return null;
        return { key, slug, id, category, exercise };
      })
      .filter(Boolean);
  }, [favKeys]);

  // Some notes might exist for items that are NOT currently favorited
  const notesOnly = useMemo(() => {
    const entries = Object.entries(notesMap); // [key, text]
    return entries
      .map(([key, text]) => {
        if (!text || !text.trim()) return null;
        if (favKeys.includes(key)) return null; // already shown in favorites grid
        const [slug, id] = key.split(":");
        const category = CATEGORY_LIST.find((c) => c.slug === slug) || null;
        const list = getExercises(slug);
        const exercise = list.find((e) => e.id === id) || null;
        if (!category || !exercise) return null;
        return { key, text, slug, id, category, exercise };
      })
      .filter(Boolean);
  }, [notesMap, favKeys]);

  const handleToggleFav = (key) => {
    const next = toggleFavorite(key);
    setFavKeys(next);
  };

  const handleSaveNote = (key, text) => {
    const next = setNote(key, text);
    setNotesMap(next);
  };

  const handleDeleteNote = (key) => {
    const next = deleteNote(key);
    setNotesMap(next);
  };

  return (
    <div className="profile-page container">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p className="sub">
          {user?.email ? (
            <>Signed in as <strong>{user.email}</strong></>
          ) : (
            <>You are signed in.</>
          )}
        </p>
      </header>

      {/* FAVORITES */}
      <section className="section">
        <div className="section-head">
          <h2>Favorites</h2>
          <p className="sub">Your saved exercises. Click a title to view details.</p>
        </div>

        {resolvedFavorites.length === 0 ? (
          <div className="empty">
            No favorites yet. Browse <Link to="/categories">Categories</Link> and hit the ♥.
          </div>
        ) : (
          <div className="grid-favs">
            {resolvedFavorites.map(({ key, slug, id, category, exercise }) => {
              const noteText = notesMap[key] || "";
              const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
                exercise.name + " exercise demo"
              )}`;
              return (
                <div key={key} className="fav-card">
                  <div className="fav-head">
                    <h3 className="fav-title">
                      <Link to={`/categories/${slug}/${id}`} className="link-plain">
                        {exercise.name}
                      </Link>
                    </h3>
                    <button
                      className={`heart is-fav`}
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                      onClick={() => handleToggleFav(key)}
                    >
                      ♥
                    </button>
                  </div>

                  <div className="fav-meta">
                    <span className={`diff-badge diff-${exercise.difficulty.toLowerCase()}`}>
                      {exercise.difficulty}
                    </span>
                    <span><strong>Category:</strong> {category.name}</span>
                    <span><strong>Muscles:</strong> {exercise.muscles.join(", ")}</span>
                    <span><strong>Equipment:</strong> {exercise.equipment}</span>
                  </div>

                  {/* Curated tip preview */}
                  {Array.isArray(exercise.tips) && exercise.tips[0] && (
                    <div className="tip-preview">{exercise.tips[0]}</div>
                  )}

                  <p className="fav-desc">{exercise.description}</p>

                  <div className="fav-actions">
                    <Link to={`/categories/${slug}/${id}`} className="btn">View details</Link>
                    <a href={youtubeSearch} target="_blank" rel="noreferrer" className="btn">
                      Watch demo
                    </a>
                  </div>

                  {/* Notes editor */}
                  <div className="note-wrap">
                    <label className="note-label" htmlFor={`note-${key}`}>
                      Your note
                    </label>
                    <textarea
                      id={`note-${key}`}
                      className="note-input"
                      placeholder="Log cues, reps/sets, progress, tweaks…"
                      defaultValue={noteText}
                      onBlur={(e) => handleSaveNote(key, e.target.value)}
                    />
                    <div className="note-row">
                      <button
                        className="btn"
                        onClick={(e) => {
                          const textarea = e.currentTarget
                            .closest(".note-wrap")
                            .querySelector("textarea");
                          handleSaveNote(key, textarea.value);
                        }}
                      >
                        Save note
                      </button>
                      {noteText?.trim() ? (
                        <button
                          className="btn danger"
                          onClick={() => handleDeleteNote(key)}
                        >
                          Delete note
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* NOTES THAT AREN'T FAVORITES (still show them) */}
      {notesOnly.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Notes (not favorited)</h2>
            <p className="sub">You have notes on these, but they aren’t currently in favorites.</p>
          </div>
          <div className="list-notes">
            {notesOnly.map(({ key, slug, id, category, exercise, text }) => (
              <div key={key} className="note-item">
                <div className="note-item-head">
                  <h3 className="note-item-title">
                    <Link to={`/categories/${slug}/${id}`} className="link-plain">
                      {exercise.name}
                    </Link>
                  </h3>
                  <span className="note-cat">({category.name})</span>
                </div>
                <p className="note-text">{text}</p>
                <div className="note-actions">
                  <Link to={`/categories/${slug}/${id}`} className="btn">Open exercise</Link>
                  <button className="btn danger" onClick={() => handleDeleteNote(key)}>
                    Delete note
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}