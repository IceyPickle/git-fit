/* src/utils/notes.js */

const STORAGE_KEY = "gitfit_notes";

// notes are stored as: { "<slug>:<exerciseId>": "note text", ... }

export function getAllNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getNote(key) {
  const map = getAllNotes();
  return map[key] || "";
}

export function setNote(key, text) {
  const map = getAllNotes();
  if (text && text.trim()) {
    map[key] = text.trim();
  } else {
    delete map[key];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  return map;
}

export function deleteNote(key) {
  const map = getAllNotes();
  if (map[key]) {
    delete map[key];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }
  return map;
}
