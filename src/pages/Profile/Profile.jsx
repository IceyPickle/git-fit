/* src/pages/Profile/Profile.jsx */

import { useMemo } from "react";
import "./Profile.css";

import { useAuth } from "../../hooks/useAuth";
import { listAllNotes, deleteNote } from "../../utils/notes";
import { getExercises } from "../../data/exercises";

export default function Profile() {
  const { user } = useAuth();

  const notes = useMemo(() => listAllNotes(), []);
  const byExercise = useMemo(() => {
    // Group notes by exercise key
    const map = new Map();
    for (const n of notes) {
      const arr = map.get(n.key) || [];
      arr.push(n);
      map.set(n.key, arr);
    }
    return Array.from(map.entries()); // [ [key, notes[]], ... ]
  }, [notes]);

  return (
    <div className="profile container">
      <h1>My Profile</h1>
      <p className="sub">Welcome back{user?.email ? `, ${user.email}` : ""}.</p>

      {/* Notes */}
      <section className="profile-notes">
        <h2>My Notes</h2>
        {byExercise.length === 0 ? (
          <p className="empty">No notes yet. Add some from any exercise page.</p>
        ) : (
          <div className="notes-groups">
            {byExercise.map(([key, arr]) => {
              const [slug, id] = key.split(":");
              // Try to get the current name from data for display (fallback to stored name)
              const ex = (getExercises(slug) || []).find(e => e.id === id);
              const displayName = ex?.name || arr[0]?.exerciseName || key;

              return (
                <div key={key} className="notes-group">
                  <div className="notes-group-head">
                    <h3>{displayName}</h3>
                    <span className="group-sub">{slug}</span>
                  </div>
                  <ul className="note-list">
                    {arr.map(n => (
                      <li key={n.id} className="note-item">
                        <div className="note-meta">
                          <time>{new Date(n.createdAt).toLocaleString()}</time>
                          {(n.weight || n.reps || n.sets) && (
                            <span className="note-stats">
                              {n.weight != null ? `${n.weight} lb` : ""}
                              {n.reps   != null ? ` · ${n.reps} reps` : ""}
                              {n.sets   != null ? ` · ${n.sets} sets` : ""}
                            </span>
                          )}
                        </div>
                        {n.text && <p className="note-textline">{n.text}</p>}
                        <div className="note-row-actions">
                          <button className="btn" onClick={() => { deleteNote(n.id); location.reload(); }}>
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
