/* src/utils/user.js */
/* get rid of this once you find a backend rou */

const USERS_KEY = "gitfit_users";

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

export function upsertUser({ email, dob }) {
  const users = getUsers();
  const key = String(email).toLowerCase().trim();
  users[key] = { email: key, dob }; // store dob in YYYY-MM-DD (from <input type="date">)
  saveUsers(users);
}

export function findUser(email) {
  const users = getUsers();
  const key = String(email).toLowerCase().trim();
  return users[key] || null;
}
