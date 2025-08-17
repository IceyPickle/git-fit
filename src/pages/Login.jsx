// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [form, setForm] = useState({ email: "", password: "" });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // For now, just demo handling
    console.log(`${mode.toUpperCase()} with`, form);
    alert(`${mode === "login" ? "Logged in" : "Signed up"} (demo)`);
  }

  return (
    <div className="auth-wrap">
      {/* Close (X) */}
      <button
        aria-label="Close"
        className="auth-close"
        onClick={() => navigate(-1)} // go back
        title="Close"
      >
        ×
      </button>

      <div className="auth-card">
        <header className="auth-header">
          <h1>Keep Track of Your Progress</h1>
          <p className="auth-sub">
            {mode === "login"
              ? "Log in to access your workouts, notes, and regimen."
              : "Create an account to save your workouts and progress."}
          </p>
        </header>

        <form className="auth-form" onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            required
          />

          <div className="auth-actions">
            <button type="submit" className="btn primary">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Switch to Sign Up" : "Switch to Login"}
            </button>
          </div>
        </form>

        <div className="auth-meta">
          <label className="checkbox">
            <input type="checkbox" /> Remember me
          </label>
          <button className="link" type="button" onClick={() => alert("Coming soon!")}>
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
