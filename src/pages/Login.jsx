/* src/pages/Login.jsx */

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

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

  const errors = useMemo(() => {
    const out = {};
    if (!emailRegex.test(form.email)) {
      out.email = "Enter a valid email address (e.g. you@example.com).";
    }
    if (form.password.length < 4) {
      out.password = "Enter your password (min 4 characters).";
    }
    return out;
  }, [form.email, form.password]);

  const isValid = Object.keys(errors).length === 0;

  function onSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    login(form.email);
    const dest = location.state?.from?.pathname || "/profile";
    navigate(dest, { replace: true });
  }

  return (
    <div className="auth-wrap">
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
          <p className="auth-sub">Log in to access your workouts, notes, and regimen.</p>
        </header>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" placeholder="you@example.com"
            value={form.email} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.email}
          />
          {touched.email && errors.email && <div className="field-error">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <input
            id="password" name="password" type="password" placeholder="Your password"
            value={form.password} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.password}
          />
          {touched.password && errors.password && <div className="field-error">{errors.password}</div>}

          <div className="auth-actions">
            <button type="submit" className="btn primary" disabled={!isValid}>
              Log In
            </button>
            <Link to="/signup" className="btn">Need an account?</Link>
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

            {/* ← updated to navigate to the new page */}
            <Link to="/forgot-password" className="link">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
