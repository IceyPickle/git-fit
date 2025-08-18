/* src/utils/users.js */
/* get rid of this once you find a backend rou */

const USERS_KEY = "gitfit_users";

/** Read the users map from localStorage. Shape: { [emailLower]: { email, dob, password? } } */
export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("users:getUsers failed", e);
    return {};
  }
}

/** Save the users map back to localStorage. */
export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn("users:saveUsers failed", e);
  }
}

/** Create or update a minimal user record. Pass at least { email, dob }. You may also pass password. */
export function upsertUser({ email, dob, password }) {
  const users = getUsers();
  const key = String(email || "").toLowerCase().trim();
  if (!key) return;

  users[key] = {
    // always keep normalized email as the stored identifier
    email: key,
    dob,               // "YYYY-MM-DD" from <input type="date">
    // only store password if provided (optional for your current flow)
    ...(password ? { password } : {}),
  };

  saveUsers(users);
}

/** Find a user by email (case-insensitive). Returns { email, dob, password? } or null. */
export function findUser(email) {
  const users = getUsers();
  const key = String(email || "").toLowerCase().trim();
  return users[key] || null;
}

/** Optionally let reset flows change a stored password (not required for DOB-only verify). */
export function setPassword(email, newPassword) {
  const users = getUsers();
  const key = String(email || "").toLowerCase().trim();
  if (!users[key]) return false;
  users[key].password = newPassword;
  saveUsers(users);
  return true;
}