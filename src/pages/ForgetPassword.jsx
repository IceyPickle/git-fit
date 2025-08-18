/* src/pages/ForgetPassword.jsx */

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUser } from "../utils/users";
import "./Login.css"; // reuse auth styles

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", dob: "" });
  const [touched, setTouched] = useState({ email: false, dob: false });
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function onBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  const errors = useMemo(() => {
    const out = {};
    if (!emailRegex.test(form.email)) out.email = "Enter a valid email address.";
    if (!form.dob) out.dob = "Enter your date of birth.";
    return out;
  }, [form.email, form.dob]);

  const isValid = Object.keys(errors).length === 0;

  function onSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (!isValid) return;

    const user = findUser(form.email);
    if (!user) {
      setServerError("We couldn't verify your details. Please check your info or sign up.");
      return;
    }
    // strict match: stored dob === entered dob (YYYY-MM-DD)
    if (user.dob !== form.dob) {
      setServerError("Email and date of birth do not match our records.");
      return;
    }

    // Verified! Issue a demo reset token
    const token = Math.random().toString(36).slice(2);
    sessionStorage.setItem(
      "gitfit_reset_token",
      JSON.stringify({ email: user.email, token, ts: Date.now() })
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div className="auth-wrap">
        <button aria-label="Close" className="auth-close" onClick={() => navigate(-1)} title="Close">×</button>
        <div className="auth-card">
          <header className="auth-header">
            <h1>Verification matched</h1>
            <p className="auth-sub">We’ve created a reset link for <strong>{form.email}</strong>.</p>
          </header>
          <div className="auth-actions" style={{ marginTop: 16 }}>
            {/* Demo shortcut to the reset page */}
            <button
              className="btn primary"
              onClick={() => navigate(`/reset?email=${encodeURIComponent(form.email)}`)}
            >
              Continue to reset
            </button>
            <Link to="/login" className="btn">Back to login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrap">
      <button aria-label="Close" className="auth-close" onClick={() => navigate(-1)} title="Close">×</button>
      <div className="auth-card">
        <header className="auth-header">
          <h1>Forgot your password?</h1>
          <p className="auth-sub">Enter your email <em>and date of birth</em> to verify your identity.</p>
        </header>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" placeholder="you@example.com"
            value={form.email} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.email}
          />
          {touched.email && errors.email && <div className="field-error">{errors.email}</div>}

          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob" name="dob" type="date"
            value={form.dob} onChange={onChange} onBlur={onBlur} aria-invalid={!!errors.dob}
          />
          {touched.dob && errors.dob && <div className="field-error">{errors.dob}</div>}

          {serverError && (
            <div className="field-error" style={{ marginTop: 8 }}>{serverError}</div>
          )}

          <div className="auth-actions">
            <button type="submit" className="btn primary" disabled={!isValid}>
              Verify and send link
            </button>
            <Link to="/login" className="btn">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
