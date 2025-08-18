/* src/pages/ForgetPassword.jsx */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUser, setPassword } from "../utils/users";
import "./Login.css"; // reuse the auth styles

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Step 1: verify identity (email + DOB)
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [verifyTouched, setVerifyTouched] = useState({ email: false, dob: false });
  const [verifyError, setVerifyError] = useState("");

  // Step 2: set new password
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [resetTouched, setResetTouched] = useState({ password: false, confirm: false });
  const [resetError, setResetError] = useState("");

  // Validation helpers
  function verifyErrors() {
    const out = {};
    if (!emailRegex.test(email)) out.email = "Enter a valid email address.";
    if (!dob) out.dob = "Enter your date of birth.";
    return out;
  }

  function resetErrors() {
    const out = {};
    if (newPassword.length < 8) {
      out.password = "Password must be at least 8 characters.";
    } else if (!/[0-9]/.test(newPassword)) {
      out.password = "Password must include at least one number.";
    }
    if (confirm !== newPassword) {
      out.confirm = "Passwords do not match.";
    }
    return out;
  }

  // Handlers
  function handleVerify(e) {
    e.preventDefault();
    setVerifyError("");
    const errs = verifyErrors();
    if (Object.keys(errs).length) {
      setVerifyTouched({ email: true, dob: true });
      return;
    }
    const user = findUser(email);
    if (!user || user.dob !== dob) {
      setVerifyError("We couldn’t verify your details. Check your email and DOB or sign up.");
      return;
    }
    setStep(2);
  }

  function handleReset(e) {
    e.preventDefault();
    setResetError("");
    const errs = resetErrors();
    if (Object.keys(errs).length) {
      setResetTouched({ password: true, confirm: true });
      return;
    }
    setPassword(email, newPassword);
    alert("Password updated! You can now log in with your new password.");
    navigate("/login", { replace: true });
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
        {step === 1 ? (
          <>
            <header className="auth-header">
              <h1>Forgot Password</h1>
              <p className="auth-sub">Enter your email <em>and</em> date of birth to verify your identity.</p>
            </header>

            <form className="auth-form" onSubmit={handleVerify} noValidate>
              <label htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setVerifyTouched((t) => ({ ...t, email: true }))}
                aria-invalid={!!verifyErrors().email}
              />
              {verifyTouched.email && verifyErrors().email && (
                <div className="field-error">{verifyErrors().email}</div>
              )}

              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob" name="dob" type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onBlur={() => setVerifyTouched((t) => ({ ...t, dob: true }))}
                aria-invalid={!!verifyErrors().dob}
              />
              {verifyTouched.dob && verifyErrors().dob && (
                <div className="field-error">{verifyErrors().dob}</div>
              )}

              {verifyError && <div className="field-error" style={{ marginTop: 8 }}>{verifyError}</div>}

              <div className="auth-actions">
                <button type="submit" className="btn primary">Verify</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <header className="auth-header">
              <h1>Set a new password</h1>
              <p className="auth-sub">for <strong>{email}</strong></p>
            </header>

            <form className="auth-form" onSubmit={handleReset} noValidate>
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword" name="newPassword" type="password"
                placeholder="At least 8 chars, include a number"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => setResetTouched((t) => ({ ...t, password: true }))}
                aria-invalid={!!resetErrors().password}
              />
              {resetTouched.password && resetErrors().password && (
                <div className="field-error">{resetErrors().password}</div>
              )}

              <label htmlFor="confirm">Confirm New Password</label>
              <input
                id="confirm" name="confirm" type="password"
                placeholder="Re-enter your new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onBlur={() => setResetTouched((t) => ({ ...t, confirm: true }))}
                aria-invalid={!!resetErrors().confirm}
              />
              {resetTouched.confirm && resetErrors().confirm && (
                <div className="field-error">{resetErrors().confirm}</div>
              )}

              {resetError && <div className="field-error" style={{ marginTop: 8 }}>{resetError}</div>}

              <div className="auth-actions">
                <button type="submit" className="btn primary">Save new password</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
