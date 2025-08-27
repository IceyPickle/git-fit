/* src/pages/jsx/Signup.jsx */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../css/Login.css"; // reuse same styles

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup({ email, password, dob, remember });
      nav("/profile", { replace: true });
    } catch (error) {
      setErr(error.message || "Sign up failed");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create your account</h1>
          <p className="auth-sub">Save your workouts, notes, and regimen.</p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Date of birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="pwd-field">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              placeholder="At least 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="pwd-toggle"
              aria-label={showPwd ? "Hide password" : "Show password"}
              onClick={() => setShowPwd((v) => !v)}
              title={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? "🙈" : "👁️"}
            </button>
          </div>

          {err && <div className="error">{err}</div>}

          <div className="auth-actions">
            <button type="submit" className="btn primary">Create account</button>
            <Link to="/login" className="btn">Back to login</Link>
          </div>

          <div className="auth-meta">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}