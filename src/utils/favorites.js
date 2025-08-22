/* src/utils/favorites.js */

const KEY = "gitfit_favorites"; // stores array of keys like "abs:plank"

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setFavorites(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

/** key format suggestion: `${slug}:${exerciseId}` */
export function isFavorite(key) {
  return getFavorites().includes(key);
}

export function toggleFavorite(key) {
  const list = getFavorites();
  const idx = list.indexOf(key);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(key);
  }
  setFavorites(list);
  return list;
}
