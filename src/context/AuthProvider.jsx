/* src/context/AuthProvider.jsx */

import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// This is the provider that wraps around your App
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("gitfit_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  // Save whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("gitfit_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("gitfit_user");
    }
  }, [user]);

  const login = (email, password) => {
    // Fake validation for now
    if (!email.includes("@") || password.length < 4) {
      return { success: false, message: "Invalid email or password." };
    }
    const fakeUser = { email };
    setUser(fakeUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
