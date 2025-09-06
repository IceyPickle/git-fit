/* src/pages/Profile/Profile.jsx */

import { useMemo, useRef, useState, useCallback } from "react";
import "./Profile.css";

import { useAuth } from "../../hooks/useAuth";
import {
  listAllNotes,
  deleteNote,
  updateNote,
  notesToCSV,
  parseNotesCSV,
  importNotes,
  clearNotesFor,
} from "../../utils/notes";
import { getExercises } from "../../data/exercises";

export default function Profile() {
  const { user } = useAuth();

  // Load once
  const initial = useMemo(() => listAllNotes(), []);
  const [notes, setNotes] = useState(initial);

  // ---------- Search / Filter / Sort controls ----------
  const [query, setQuery] = useState("");                 // free text search
  const [onlyNumeric, setOnlyNumeric] = useState(false);  // has weight/reps/sets
  const [sortBy, setSortBy] = useState("newest");         // newest | oldest | weight | reps | sets | exercise

  // Helper: text match
  const matches = (n, q) => {
    if (!q) return true;
    const hay = `${n.exerciseName || ""} ${n.slug || ""} ${n.idPart || ""} ${n.text || ""}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  };

  // Helper: numeric presence
  const hasNumbers = (n) =>
    n.weight != null || n.reps != null || n.sets != null;

  // Note-level sort
  const noteSortCmp = useCallback((a, b) => {
    if (sortBy === "newest") return (b.createdAt || 0) - (a.createdAt || 0);
    if (sortBy === "oldest") return (a.createdAt || 0) - (b.createdAt || 0);
    if (sortBy === "weight") return (b.weight ?? -Infinity) - (a.weight ?? -Infinity);
    if (sortBy === "reps")   return (b.reps   ?? -Infinity) - (a.reps   ?? -Infinity);
    if (sortBy === "sets")   return (b.sets   ?? -Infinity) - (a.sets   ?? -Infinity);
    // "exercise" is handled at group level; keep notes newest-first there
    return (b.createdAt || 0) - (a.createdAt || 0);
  }, [sortBy]);

  // Build filtered+sorted groups
  const groups = useMemo(() => {
    // 1) filter notes
    const filtered = notes.filter((n) => matches(n, query) && (!onlyNumeric || hasNumbers(n)));

    // 2) group by exercise key
    const map = new Map();
    for (const n of filtered) {
      const arr = map.get(n.key) || [];
      arr.push(n);
      map.set(n.key, arr);
    }

    // 3) sort inside each group
    const grouped = [];
    for (const [key, arr] of map.entries()) {
      const sortedArr =
        sortBy === "exercise"
          ? arr.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)) // newest inside group
          : arr.slice().sort(noteSortCmp); // metric-based or date order
      if (sortedArr.length) grouped.push([key, sortedArr]);
    }

    // 4) sort groups
    if (sortBy === "exercise") {
      // A→Z by resolved exercise display name; fall back to key
      grouped.sort((A, B) => {
        const [keyA, arrA] = A;
        const [keyB, arrB] = B;
        const [slugA, idA] = keyA.split(":");
        const [slugB, idB] = keyB.split(":");
        const exA = (getExercises(slugA) || []).find((e) => e.id === idA);
        const exB = (getExercises(slugB) || []).find((e) => e.id === idB);
        const nameA = (exA?.name || arrA[0]?.exerciseName || keyA).toLowerCase();
        const nameB = (exB?.name || arrB[0]?.exerciseName || keyB).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else {
      // Order groups by their first (best) note according to noteSortCmp
      grouped.sort((A, B) => noteSortCmp(A[1][0], B[1][0]));
    }

    return grouped; // [ [key, notes[]], ... ]
  }, [notes, query, onlyNumeric, sortBy, noteSortCmp]);

  // ---------- CSV export / import ----------
  const fileRef = useRef(null);

  const exportAllCSV = () => {
    // export only currently visible notes
    const visible = groups.flatMap(([, arr]) => arr);
    const csv = notesToCSV(visible);
    downloadBlob(csv, "gitfit-notes.csv");
  };

  const exportGroupCSV = (groupNotes, key) => {
    // export only visible notes for that group (already filtered)
    const csv = notesToCSV(groupNotes);
    const safe = key.replace(/[^\w.-]+/g, "_");
    downloadBlob(csv, `gitfit-notes-${safe}.csv`);
  };

  const onClickImport = () => fileRef.current?.click();

  const onImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const { rows, errors } = parseNotesCSV(text);
      if (errors?.length) alert("CSV issues:\n" + errors.join("\n"));
      if (!rows.length) { alert("No valid rows found in CSV."); e.target.value = ""; return; }
      const merged = importNotes(rows, { strategy: "append" }); // append by default
      setNotes(merged);
      alert(`Imported ${rows.length} note(s).`);
    } catch (err) {
      console.error(err);
      alert("Failed to import CSV. See console for details.");
    } finally {
      e.target.value = "";
    }
  };

  // ---------- Inline edit ----------
  const [editId, setEditId] = useState(null);
  const [eText, setEText] = useState("");
  const [eWeight, setEWeight] = useState("");
  const [eReps, setEReps] = useState("");
  const [eSets, setESets] = useState("");

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
    const merged = updateNote(noteId, {
      text: eText,
      weight: eWeight,
      reps: eReps,
      sets: eSets,
    });
    setNotes(merged);
    cancelEdit();
  };

  const onDeleteNote = (noteId) => {
    if (!confirm("Delete this note?")) return;
    const merged = deleteNote(noteId);
    setNotes(merged);
    if (editId === noteId) cancelEdit();
  };

  const onClearGroup = (key) => {
    if (!confirm("Clear ALL notes for this exercise?")) return;
    const merged = clearNotesFor(key);
    setNotes(merged);
    cancelEdit();
  };

  return (
    <div className="profile container">
      <h1>My Profile</h1>
      <p className="sub">Welcome back{user?.email ? `, ${user.email}` : ""}.</p>

      {/* Global controls */}
      <div className="profile-controls">
        <input
          className="input"
          placeholder="Search notes (exercise, muscle/slug, text)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          title="Sort notes"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="weight">Highest weight</option>
          <option value="reps">Highest reps</option>
          <option value="sets">Highest sets</option>
          <option value="exercise">Exercise A→Z</option>
        </select>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={onlyNumeric}
            onChange={(e) => setOnlyNumeric(e.target.checked)}
          />
          Numbers only
        </label>

        <div className="spacer" />

        <button className="btn" onClick={exportAllCSV}>Export (CSV)</button>
        <button className="btn" onClick={onClickImport}>Import (CSV)</button>
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

        {groups.length === 0 ? (
          <p className="empty">No notes match your filters.</p>
        ) : (
          <div className="notes-groups">
            {groups.map(([key, arr]) => {
              const [slug, id] = key.split(":");
              const ex = (getExercises(slug) || []).find((e) => e.id === id);
              const displayName = ex?.name || arr[0]?.exerciseName || key;

              return (
                <div key={key} className="notes-group">
                  <div className="notes-group-head" style={{ gap: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                      <h3 style={{ margin: 0 }}>{displayName}</h3>
                      <span className="group-sub">{slug}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button className="btn" onClick={() => exportGroupCSV(arr, key)}>Export group CSV</button>
                      <button className="btn" onClick={() => onClearGroup(key)}>Clear group</button>
                    </div>
                  </div>

                  <ul className="note-list">
                    {arr.map((n) => (
                      <li key={n.id} className="note-item">
                        {editId === n.id ? (
                          <>
                            <div className="note-meta">
                              <time>{new Date(n.createdAt).toLocaleString()}</time>
                              {n.updatedAt && (
                                <span className="note-stats">
                                  {" "}· edited {new Date(n.updatedAt).toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="note-grid">
                              <label><span>Weight (lb)</span>
                                <input
                                  type="number"
                                  inputMode="decimal"
                                  value={eWeight}
                                  onChange={(e) => setEWeight(e.target.value)}
                                />
                              </label>
                              <label><span>Reps</span>
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  value={eReps}
                                  onChange={(e) => setEReps(e.target.value)}
                                />
                              </label>
                              <label><span>Sets</span>
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  value={eSets}
                                  onChange={(e) => setESets(e.target.value)}
                                />
                              </label>
                            </div>

                            <label className="note-text"><span>Notes</span>
                              <textarea
                                rows={3}
                                value={eText}
                                onChange={(e) => setEText(e.target.value)}
                              />
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
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* util: blob download */
function downloadBlob(text, filename) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
