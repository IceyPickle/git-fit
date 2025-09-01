/* src/utils/notes.js
 * Backward-compatible notes store with CSV export/import.
 */

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
// Migrate v1 map -> v2 array
function migrateIfNeeded() {
  const data = readRaw();
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return writeRaw([]);
  const arr = [];
  for (const [key, text] of Object.entries(data)) {
    if (typeof text !== "string") continue;
    const { slug, idPart } = parseKey(key);
    arr.push({
      id: makeId(),
      key,
      slug,
      idPart,
      exerciseName: key,
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

// ---------- Notes API ----------
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
    updatedAt: undefined,
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
export function updateNote(noteId, patch) {
  const arr = readArray();
  const idx = arr.findIndex((n) => n.id === noteId);
  if (idx === -1) return arr;
  const current = arr[idx];
  const sanitized = { ...patch };
  if ("text" in sanitized && sanitized.text != null) {
    sanitized.text = String(sanitized.text).trim();
  }
  for (const k of ["weight", "reps", "sets"]) {
    if (k in sanitized && sanitized[k] !== "") {
      sanitized[k] = sanitized[k] == null ? undefined : Number(sanitized[k]);
    }
  }
  arr[idx] = { ...current, ...sanitized, updatedAt: now() };
  return writeArray(arr);
}

// ---------- Legacy-compatible API ----------
export function getNote(key) {
  const notes = listNotesFor(key);
  return notes.length ? (notes[0].text || "") : "";
}
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
export function deleteNote(arg) {
  if (typeof arg === "string" && arg.includes(":")) {
    return clearNotesFor(arg);
  }
  return deleteNoteById(arg);
}

// ---------- CSV export ----------
function csvEscape(v) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
export function notesToCSV(notes) {
  const header = ["id", "createdAt", "updatedAt", "slug", "exerciseId", "exerciseName", "weight", "reps", "sets", "text"];
  const rows = [header.join(",")];
  for (const n of notes) {
    rows.push([
      n.id || "",
      new Date(n.createdAt || 0).toISOString(),
      n.updatedAt ? new Date(n.updatedAt).toISOString() : "",
      n.slug || "",
      n.idPart || "",
      n.exerciseName || "",
      n.weight ?? "",
      n.reps ?? "",
      n.sets ?? "",
      csvEscape(n.text || ""),
    ].join(","));
  }
  return rows.join("\n");
}

// ---------- CSV import ----------
/**
 * Accepts CSV text and returns { rows, errors } for preview.
 * Expects header with at least: slug, exerciseId, text
 * Optional: id, createdAt, updatedAt, exerciseName, weight, reps, sets
 */
export function parseNotesCSV(csvText) {
  const lines = String(csvText || "").split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return { rows: [], errors: ["CSV is empty"] };

  const header = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const idx = (name) => header.findIndex(h => h.toLowerCase() === name.toLowerCase());
  const get = (arr, i) => (i >= 0 && i < arr.length ? arr[i] : "");
  const ERR = [];

  const idxId = idx("id");
  const idxSlug = idx("slug");
  const idxExId = idx("exerciseId");
  const idxExName = idx("exerciseName");
  const idxCreated = idx("createdAt");
  const idxUpdated = idx("updatedAt");
  const idxWeight = idx("weight");
  const idxReps = idx("reps");
  const idxSets = idx("sets");
  const idxText = idx("text");

  if (idxSlug < 0 || idxExId < 0 || idxText < 0) {
    ERR.push('CSV must include headers: "slug", "exerciseId", "text" (case-insensitive).');
    return { rows: [], errors: ERR };
  }

  const rows = [];
  for (let li = 1; li < lines.length; li++) {
    const raw = splitCSVLine(lines[li], header.length);
    if (!raw) { ERR.push(`Line ${li + 1}: malformed`); continue; }

    const slug = get(raw, idxSlug).trim();
    const idPart = get(raw, idxExId).trim();
    const text = stripQuotes(get(raw, idxText)).trim();

    if (!slug || !idPart || !text) {
      ERR.push(`Line ${li + 1}: missing slug/exerciseId/text`);
      continue;
    }

    const exerciseName = stripQuotes(get(raw, idxExName)).trim() || `${slug}:${idPart}`;
    const weight = toNumOrUndef(get(raw, idxWeight));
    const reps   = toNumOrUndef(get(raw, idxReps));
    const sets   = toNumOrUndef(get(raw, idxSets));

    const createdAt = parseDateOrNow(get(raw, idxCreated));
    const updatedAt = parseDateOrUndef(get(raw, idxUpdated));
    const id = stripQuotes(get(raw, idxId)).trim() || undefined;

    rows.push({ id, slug, idPart, exerciseName, text, weight, reps, sets, createdAt, updatedAt });
  }
  return { rows, errors: ERR };
}

function toNumOrUndef(v) {
  if (v == null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
function parseDateOrNow(v) {
  if (!v) return now();
  const t = Date.parse(v);
  return Number.isFinite(t) ? t : now();
}
function parseDateOrUndef(v) {
  if (!v) return undefined;
  const t = Date.parse(v);
  return Number.isFinite(t) ? t : undefined;
}
function stripQuotes(s) {
  s = String(s ?? "");
  if (s.startsWith('"') && s.endsWith('"')) {
    return s.slice(1, -1).replace(/""/g, '"');
  }
  return s;
}
// Minimal CSV splitter that respects simple quotes/commas
function splitCSVLine(line, minCols) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQ = false; }
      else { cur += ch; }
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ',') { out.push(cur); cur = ""; }
      else cur += ch;
    }
  }
  out.push(cur);
  // pad to min columns if needed
  while (out.length < minCols) out.push("");
  return out;
}

/**
 * Import notes into storage.
 * @param {Array} rows - from parseNotesCSV(csv).rows
 * @param {Object} opts - { strategy: "append" | "replaceAll" | "skipDuplicates" }
 * Duplicate rule: same slug,idPart,text,createdAt considered duplicate.
 */
export function importNotes(rows, opts = {}) {
  const strategy = opts.strategy || "append";
  if (!Array.isArray(rows) || rows.length === 0) return listAllNotes();

  const cur = readArray();

  if (strategy === "replaceAll") {
    const normalized = rows.map(toStoredNote);
    return writeArray(normalized);
  }

  const seen = new Set(cur.map(sigOf));
  const next = [...cur];

  for (const r of rows) {
    const note = toStoredNote(r);
    const sig = sigOf(note);

    if (seen.has(sig)) {
      if (strategy === "skipDuplicates") continue;
      // strategy === "append" but duplicate → skip to avoid exact dup explosion
      continue;
    }

    seen.add(sig);
    next.push(note);
  }

  // newest-first consistent ordering
  next.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  return writeArray(next);
}

function toStoredNote(r) {
  const id = r.id && String(r.id).trim() ? String(r.id).trim() : makeId();
  const slug = String(r.slug || "").trim();
  const idPart = String(r.idPart || r.exerciseId || "").trim();
  const exerciseName = String(r.exerciseName || `${slug}:${idPart}`);
  const text = String(r.text || "").trim();
  const weight = toNumOrUndef(r.weight);
  const reps = toNumOrUndef(r.reps);
  const sets = toNumOrUndef(r.sets);
  const createdAt = r.createdAt && Number.isFinite(r.createdAt) ? r.createdAt : now();
  const updatedAt = r.updatedAt && Number.isFinite(r.updatedAt) ? r.updatedAt : undefined;

  return {
    id,
    key: makeKey(slug, idPart),
    slug,
    idPart,
    exerciseName,
    text,
    weight,
    reps,
    sets,
    createdAt,
    updatedAt,
  };
}
function sigOf(n) {
  // Simple duplicate signature
  return [n.slug, n.idPart, n.text, String(n.createdAt)].join("|");
}
