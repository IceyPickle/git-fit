/* src/components/SuggestionBubble/SuggestionBubble.jsx */

import { useEffect, useMemo, useRef, useState } from "react";
import "./SuggestionBubble.css";

const STORAGE_KEY = "gitfit_suggestions_v1";

function readSuggestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeSuggestions(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function toCSV(rows) {
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ["createdAt","category","workout","details","email","ua"];
  const out = [header.join(",")];
  for (const r of rows) {
    out.push([
      esc(new Date(r.createdAt).toISOString()),
      esc(r.category || ""),
      esc(r.workout || ""),
      esc(r.details || ""),
      esc(r.email || ""),
      esc(r.ua || ""),
    ].join(","));
  }
  return out.join("\n");
}
function downloadText(text, filename, type = "text/csv;charset=utf-8") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function SuggestionBubble({ defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [workout, setWorkout] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [list, setList] = useState(() => readSuggestions());
  const textRef = useRef(null);

  const canSubmit = workout.trim().length >= 3 || details.trim().length >= 8;
  const remaining = 500 - details.length;

  useEffect(() => {
    if (open) {
      // focus first field when opening
      setTimeout(() => textRef.current?.focus(), 0);
    }
  }, [open]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit || saving) return;
    setSaving(true);

    const row = {
      id: `sg_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
      category: category.trim(),
      workout: workout.trim(),
      details: details.trim(),
      email: email.trim(),
      ua: navigator.userAgent || "",
    };
    const next = [row, ...list].slice(0, 500); // keep last 500
    writeSuggestions(next);
    setList(next);

    // reset form
    setWorkout("");
    setDetails("");
    setCategory("");
    setEmail("");

    setSaving(false);
    setOpen(false);
    alert("Thanks! Your suggestion was saved.");
  };

  const exportCSV = () => {
    if (!list.length) {
      alert("No suggestions to export yet.");
      return;
    }
    const csv = toCSV(list);
    downloadText(csv, "gitfit-suggestions.csv");
  };

  const hasSuggestions = useMemo(() => list.length > 0, [list.length]);

  return (
    <>
      {/* Floating button */}
      <button
        className="sg-fab"
        aria-label="Suggest a workout"
        onClick={() => setOpen(true)}
        title="Suggest a workout"
      >
        💬
      </button>

      {/* Backdrop */}
      {open && <div className="sg-backdrop" onClick={() => setOpen(false)} />}

      {/* Speech bubble panel */}
      <aside
        className={`sg-bubble ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sg-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sg-head">
          <h3 id="sg-title">Suggest a workout</h3>
          <button className="sg-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </header>

        <form className="sg-form" onSubmit={onSubmit}>
          <label className="sg-row">
            <span>Category (optional)</span>
            <input
              className="sg-input"
              placeholder="e.g., CrossFit, At Home, Legs…"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <label className="sg-row">
            <span>Workout name</span>
            <input
              className="sg-input"
              placeholder="e.g., Dumbbell thrusters"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
              ref={textRef}
              maxLength={120}
            />
          </label>

          <label className="sg-row">
            <span>Details (optional)</span>
            <textarea
              className="sg-textarea"
              placeholder="Why it's useful, equipment, rep scheme, links…"
              value={details}
              onChange={(e) => setDetails(e.target.value.slice(0, 500))}
              rows={4}
            />
            <div className={`sg-help ${remaining < 0 ? "bad" : ""}`}>
              {remaining} characters left
            </div>
          </label>

          <label className="sg-row">
            <span>Email (optional)</span>
            <input
              className="sg-input"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
            />
          </label>

          <div className="sg-actions">
            <button type="submit" className="btn primary" disabled={!canSubmit || saving}>
              {saving ? "Saving…" : "Send"}
            </button>
            <button type="button" className="btn" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <div className="sg-spacer" />
            <button type="button" className="btn" onClick={exportCSV} disabled={!hasSuggestions}>
              Export CSV
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
