// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const STORAGE_KEY = "gitfit_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email } | null
  const [loading, setLoading] = useState(true);

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

  function login(email) {
    const u = { email };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = { user, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
