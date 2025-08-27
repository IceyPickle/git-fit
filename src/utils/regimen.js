/* src/utils/regimen.js */

// LocalStorage schema (simple & forward-compatible):
// {
//   "items": [
//     {
//       "key": "abs:crunch",        // "<slug>:<exerciseId>" (unique)
//       "slug": "abs",
//       "id": "crunch",
//       "name": "Crunches",         // denormalized for convenient display
//       "category": "Abs",          // denormalized category name
//       "day": null,                // "mon" | "tue" | ... | "sun" | null (unassigned)
//       "addedAt": 1735339200000    // timestamp (ms) for sorting
//     },
//     ...
//   ]
// }

const STORAGE_KEY = "gitfit_regimen";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function normalizeDay(day) {
  if (!day) return null;
  const d = String(day).trim().toLowerCase().slice(0, 3);
  return DAYS.includes(d) ? d : null;
}

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { items: [] };
    if (!Array.isArray(data.items)) return { items: [] };
    return data;
  } catch {
    return { items: [] };
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function makeKey(slug, id) {
  return `${slug}:${id}`;
}

export function getRegimen() {
  return read(); // { items: [...] }
}

export function listItems() {
  return read().items;
}

export function isInRegimen(key) {
  return read().items.some((it) => it.key === key);
}

export function addToRegimen({ slug, id, name, category, day = null }) {
  const key = makeKey(slug, id);
  const data = read();
  if (data.items.some((it) => it.key === key)) {
    // already exists — no-op
    return data.items;
  }
  const item = {
    key,
    slug,
    id,
    name,
    category,
    day: normalizeDay(day),
    addedAt: Date.now(),
  };
  data.items.push(item);
  write(data);
  return data.items;
}

export function removeFromRegimen(key) {
  const data = read();
  const next = data.items.filter((it) => it.key !== key);
  write({ items: next });
  return next;
}

export function toggleInRegimen({ slug, id, name, category, day = null }) {
  const key = makeKey(slug, id);
  if (isInRegimen(key)) {
    return removeFromRegimen(key);
  }
  return addToRegimen({ slug, id, name, category, day });
}

export function assignDay(key, day) {
  const data = read();
  const d = normalizeDay(day);
  const idx = data.items.findIndex((it) => it.key === key);
  if (idx === -1) return data.items;
  data.items[idx].day = d;
  write(data);
  return data.items;
}

export function clearRegimen() {
  write({ items: [] });
  return [];
}

export function listByDay() {
  const out = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [], unassigned: [] };
  for (const it of read().items) {
    if (it.day && out[it.day]) out[it.day].push(it);
    else out.unassigned.push(it);
  }
  return out;
}
