/* src/utils/notes.js
 *
 * Backward-compatible notes store. */

const STORAGE_KEY = "gitfit_notes";

// ---------- helpers ----------
const now = () => Date.now();
const makeId = () => `note_${Math.random().toString(36).slice(2, 9)}`;
export function makeKey(slug, id) {
  return `${slug}:${id}`;
}
function parseKey(key) {
  if (typeof key !== "string" || !key.includes(":")) return { slug: "", idPart: "" };
  const [slug, ...rest] = key.split(":");
  return { slug, idPart: rest.join(":") };
}

// Low-level read/write that tolerate both schemas
function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeRaw(v) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  return v;
}

// Migrate legacy map -> array
function migrateIfNeeded() {
  const data = readRaw();

  // Already v2 array
  if (Array.isArray(data)) return data;

  // Legacy empty/invalid -> start fresh v2
  if (!data || typeof data !== "object") return writeRaw([]);

  // Legacy map object -> convert to array
  const arr = [];
  for (const [key, text] of Object.entries(data)) {
    if (typeof text !== "string") continue;
    const { slug, idPart } = parseKey(key);
    arr.push({
      id: makeId(),
      key,
      slug,
      idPart,
      exerciseName: key,      // unknown at this time; pages may display real name
      text: text.trim(),
      createdAt: now(),
    });
  }
  return writeRaw(arr);
}

function readArray() {
  const v2 = migrateIfNeeded();
  return Array.isArray(v2) ? v2 : [];
}
function writeArray(arr) {
  return writeRaw(Array.isArray(arr) ? arr : []);
}

// ---------- New API (rich notes) ----------
export function listAllNotes() {
  return readArray().slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function listNotesFor(key) {
  return listAllNotes().filter((n) => n.key === key);
}

export function addNote({ slug, idPart, exerciseName, text, weight, reps, sets }) {
  const key = makeKey(slug, idPart);
  const note = {
    id: makeId(),
    key,
    slug,
    idPart,
    exerciseName: exerciseName || `${slug}:${idPart}`,
    text: String(text || "").trim(),
    weight: weight !== "" && weight != null ? Number(weight) : undefined,
    reps:   reps   !== "" && reps   != null ? Number(reps)   : undefined,
    sets:   sets   !== "" && sets   != null ? Number(sets)   : undefined,
    createdAt: now(),
  };
  const next = [note, ...readArray()];
  return writeArray(next);
}

export function deleteNoteById(noteId) {
  const next = readArray().filter((n) => n.id !== noteId);
  return writeArray(next);
}

export function clearNotesFor(key) {
  const next = readArray().filter((n) => n.key !== key);
  return writeArray(next);
}

// ---------- Legacy-compatible API ----------
// getNote(key): return latest text for this exercise (or "")
export function getNote(key) {
  const notes = listNotesFor(key);
  return notes.length ? (notes[0].text || "") : "";
}

// setNote(key, text):
// - non-empty text -> append a new note (text only)
// - empty/blank     -> remove ALL notes for that exercise key
export function setNote(key, text) {
  const t = String(text || "").trim();
  const { slug, idPart } = parseKey(key);
  if (!slug || !idPart) return readArray();

  if (t) {
    return addNote({ slug, idPart, exerciseName: key, text: t });
  } else {
    return clearNotesFor(key);
  }
}

/**
 * deleteNote(arg):
 * Back-compat behavior:
 * - If arg looks like an exercise key ("slug:id"), clear all notes for that exercise.
 * - Otherwise, treat arg as a note ID and delete that one note.
 *
 * This lets older code that calls deleteNote(key) continue to work,
 * and newer code can pass a specific note id.
 */
export function deleteNote(arg) {
  if (typeof arg === "string" && arg.includes(":")) {
    return clearNotesFor(arg);
  }
  return deleteNoteById(arg);
}
