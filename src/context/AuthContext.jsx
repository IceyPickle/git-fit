// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const STORAGE_KEY = "gitfit_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email } | null
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read stored auth:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fake login: store minimal user object
  function login(email) {
    const u = { email };
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch (e) {
      console.warn("Failed to save auth:", e);
    }
  }

  // Fake logout: clear storage and state
  function logout() {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear auth:", e);
    }
  }

  const value = { user, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
