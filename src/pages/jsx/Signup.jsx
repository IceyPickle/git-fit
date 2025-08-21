/* src/pages/jsx/Signup.jsx */

import { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { upsertUser } from "../../utils/users";
import "../css/Login.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "", password: "", confirm: "", dob: "", remember: false,
  });
  const [touched, setTouched] = useState({
    email: false, password: false, confirm: false, dob: false,
  });

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }
  function onBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function calculateAge(dob) {
    if (!dob) return 0;
    const d = new Date(dob), t = new Date();
    let age = t.getFullYear() - d.getFullYear();
    const m = t.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < d.getDate())) age--;
    return age;
  }

  const errors = useMemo(() => {
    const out = {};
    if (!emailRegex.test(form.email)) out.email = "Enter a valid email (e.g. you@example.com).";
    if (form.password.length < 8) out.password = "Password must be at least 8 characters.";
    else if (!/[0-9]/.test(form.password)) out.password = "Password must include at least one number.";
    if (form.confirm !== form.password) out.confirm = "Passwords do not match.";
    const age = calculateAge(form.dob);
    if (!form.dob) out.dob = "Please enter your date of birth.";
    else if (age < 13) out.dob = "You must be at least 13 years old to sign up.";
    return out;
  }, [form.email, form.password, form.confirm, form.dob]);

  const isValid = Object.keys(errors).length === 0;

  function onSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    upsertUser({ email: form.email, dob: form.dob }); // store minimal record
    login(form.email); // fake login

    const dest = location.state?.from?.pathname || "/profile";
    navigate(dest, { replace: true });
  }

  return (
    <div className="auth-wrap">
      <button aria-label="Close" className="auth-close" onClick={() => navigate(-1)} title="Close">×</button>

      <div className="auth-card">
        <header className="auth-header">
          <h1>Create your Git Fit account</h1>
          <p className="auth-sub">Save your workouts, notes, and regimen. It’s free.</p>
        </header>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com"
                 value={form.email} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.email} />
          {touched.email && errors.email && <div className="field-error">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="At least 8 chars, include a number"
                 value={form.password} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.password} />
          {touched.password && errors.password && <div className="field-error">{errors.password}</div>}

          <label htmlFor="confirm">Confirm Password</label>
          <input id="confirm" name="confirm" type="password" placeholder="Re-enter your password"
                 value={form.confirm} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.confirm} />
          {touched.confirm && errors.confirm && <div className="field-error">{errors.confirm}</div>}

          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" name="dob" type="date"
                 value={form.dob} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.dob} />
          {touched.dob && errors.dob && <div className="field-error">{errors.dob}</div>}

          <div className="auth-actions">
            <button type="submit" className="btn primary" disabled={!isValid}>Sign Up</button>
            <Link to="/login" className="btn">Already have an account?</Link>
          </div>

          <div className="auth-meta">
            <label className="checkbox">
              <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} />{" "}
              Remember me
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
