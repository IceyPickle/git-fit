/* src/pages/Login/Login.jsx */

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login({ email, password, remember });
      nav(redirectTo, { replace: true });
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Keep Track of Your Progress</h1>
          <p className="auth-sub">Log in to save favorites, notes, and your regimen.</p>
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

          <label>Password</label>
          <div className="pwd-field">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              placeholder="••••••••"
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
            <button type="submit" className="btn primary">Log in</button>
            <Link to="/signup" className="btn">Sign up</Link>
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
            <Link to="/forgot-password" className="link">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}