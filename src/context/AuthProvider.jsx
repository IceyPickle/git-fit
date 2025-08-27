/* src/context/AuthProvider.jsx */

import { useEffect, useMemo, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "gitfit_user";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // hydrate from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setUser(parsed);
      } catch {
        // ignore invalid JSON
      }
    }
    setLoading(false);
  }, []);

  const persist = useCallback((next, remember) => {
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async (payload = {}) => {
    const email = String(payload.email ?? "").trim();
    const password = String(payload.password ?? "");
    const remember = Boolean(payload.remember);

    if (!email || !emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const nextUser = { email, createdAt: Date.now() };
    setUser(nextUser);
    persist(nextUser, remember);
    return nextUser;
  }, [persist]);

  const signup = useCallback(async (payload = {}) => {
    const email = String(payload.email ?? "").trim();
    const password = String(payload.password ?? "");
    const dob = String(payload.dob ?? "").trim();
    const remember = Boolean(payload.remember);

    if (!email || !emailRegex.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
    if (!dob) {
      throw new Error("Please enter your date of birth.");
    }

    const nextUser = { email, dob, createdAt: Date.now() };
    setUser(nextUser);
    persist(nextUser, remember);
    return nextUser;
  }, [persist]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}