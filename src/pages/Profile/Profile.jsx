/* src/pages/Profile/Profile.jsx */
import { useMemo, useRef } from "react";
import "./Profile.css";

import { useAuth } from "../../hooks/useAuth";
import {
  listAllNotes,
  deleteNote,
  notesToCSV,
  parseNotesCSV,
  importNotes,
} from "../../utils/notes";
import { getExercises } from "../../data/exercises";

export default function Profile() {
  const { user } = useAuth();
  const notes = useMemo(() => listAllNotes(), []);
  const byExercise = useMemo(() => {
    const map = new Map();
    for (const n of notes) {
      const arr = map.get(n.key) || [];
      arr.push(n);
      map.set(n.key, arr);
    }
    return Array.from(map.entries());
  }, [notes]);

  const fileRef = useRef(null);

  const exportCSV = () => {
    const csv = notesToCSV(notes);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gitfit-notes.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onClickImport = () => fileRef.current?.click();

  const onImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const { rows, errors } = parseNotesCSV(text);
      if (errors?.length) {
        alert("CSV issues:\n" + errors.join("\n"));
        // you can choose to stop here; we’ll proceed only if rows exist
      }
      if (!rows.length) {
        alert("No valid rows found in CSV.");
        e.target.value = ""; // reset chooser
        return;
      }

      // Choose merge strategy: "append" | "replaceAll" | "skipDuplicates"
      importNotes(rows, { strategy: "append" });

      alert(`Imported ${rows.length} note(s). Reloading...`);
      location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to import CSV. See console for details.");
    } finally {
      e.target.value = ""; // reset chooser for next time
    }
  };

  return (
    <div className="profile container">
      <h1>My Profile</h1>
      <p className="sub">Welcome back{user?.email ? `, ${user.email}` : ""}.</p>

      <div style={{ marginTop: 12, marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn" onClick={exportCSV}>Export notes (CSV)</button>
        <button className="btn" onClick={onClickImport}>Import notes (CSV)</button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          style={{ display: "none" }}
          onChange={onImportFile}
        />
      </div>

      <section className="profile-notes">
        <h2>My Notes</h2>
        {byExercise.length === 0 ? (
          <p className="empty">No notes yet. Add some from any exercise page.</p>
        ) : (
          <div className="notes-groups">
            {byExercise.map(([key, arr]) => {
              const [slug, id] = key.split(":");
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
                          {n.updatedAt && <span className="note-stats"> · edited {new Date(n.updatedAt).toLocaleString()}</span>}
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
