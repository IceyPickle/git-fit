// src/pages/Login.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [touched, setTouched] = useState({ email: false, password: false });

  // If already logged in, bounce to profile
  useEffect(() => {
    if (user) navigate("/profile", { replace: true });
  }, [user, navigate]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }
  function onBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  // Validation rules
  const errors = useMemo(() => {
    const out = {};
    if (!emailRegex.test(form.email)) {
      out.email = "Enter a valid email address (e.g. you@example.com).";
    }
    if (mode === "signup") {
      if (form.password.length < 8) {
        out.password = "Password must be at least 8 characters.";
      } else if (!/[0-9]/.test(form.password)) {
        out.password = "Password must contain at least one number.";
      }
    } else {
      // login: be a bit looser but still require something
      if (form.password.length < 4) {
        out.password = "Enter your password (min 4 characters).";
      }
    }
    return out;
  }, [form.email, form.password, mode]);

  const isValid = Object.keys(errors).length === 0;

  function onSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    // Fake auth — store just the email (and maybe remember flag later)
    login(form.email);

    // Redirect to the page they came from, or /profile
    const dest = location.state?.from?.pathname || "/profile";
    navigate(dest, { replace: true });
  }

  return (
    <div className="auth-wrap">
      {/* Close (X) */}
      <button
        aria-label="Close"
        className="auth-close"
        onClick={() => navigate(-1)}
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

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email"
            placeholder="you@example.com"
            value={form.email} onChange={onChange} onBlur={onBlur}
            aria-invalid={!!errors.email}
          />
          {touched.email && errors.email && (
            <div className="field-error">{errors.email}</div>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password" name="password" type="password"
            placeholder={mode === "signup" ? "At least 8 chars, include a number" : "Your password"}
            value={form.password} onChange={onChange} onBlur={onBlur}
            aria-invalid={!!errors.password}
          />
          {touched.password && errors.password && (
            <div className="field-error">{errors.password}</div>
          )}

          <div className="auth-actions">
            <button type="submit" className="btn primary" disabled={!isValid}>
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

          <div className="auth-meta">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={onChange}
              />{" "}
              Remember me
            </label>
            <button className="link" type="button" onClick={() => alert("Coming soon!")}>
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
