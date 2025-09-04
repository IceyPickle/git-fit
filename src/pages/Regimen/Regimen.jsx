/* src/pages/Regimen/Regimen.jsx */

import { useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Regimen.css";
import { getExercises } from "../../data/exercises";

// ---------- storage keys & helpers ----------
const V1_KEY = "gitfit_regimen";
const V2_KEY = "gitfit_regimen_v2";

// Full day names (matches your setup)
const DAY_KEYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Unassigned"];

const DEFAULT_PLAN = () => ({
  id: `plan_${Math.random().toString(36).slice(2, 9)}`,
  name: "My Plan",
  days: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
    Unassigned: [],
  },
});

// Map for migrating old short keys → full names
const SHORT_TO_FULL = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

// Ensure a plan has all DAY_KEYS present as arrays
function normalizePlanDays(plan) {
  const next = { ...plan, days: { ...plan.days } };
  for (const k of DAY_KEYS) {
    if (!Array.isArray(next.days[k])) next.days[k] = [];
  }
  return next;
}

// Migrate a single plan's days from short keys to full keys if needed
function migrateDayKeys(plan) {
  if (!plan?.days) return plan;
  let mutated = false;
  const days = { ...plan.days };

  for (const shortKey of Object.keys(SHORT_TO_FULL)) {
    if (Array.isArray(days[shortKey])) {
      const fullKey = SHORT_TO_FULL[shortKey];
      const arr = days[shortKey];
      delete days[shortKey];
      // Merge if target already exists
      days[fullKey] = Array.isArray(days[fullKey]) ? [...arr, ...days[fullKey]] : arr;
      mutated = true;
    }
  }
  const next = { ...plan, days };
  return normalizePlanDays(mutated ? next : next);
}

function readStore() {
  // Try v2
  try {
    const rawV2 = localStorage.getItem(V2_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (parsed && Array.isArray(parsed.plans) && parsed.activeId) {
        // Migrate any plans with short keys
        const migratedPlans = parsed.plans.map((p) => migrateDayKeys(p));
        const fixed = { ...parsed, plans: migratedPlans };
        localStorage.setItem(V2_KEY, JSON.stringify(fixed));
        return fixed;
      }
    }
  } catch {
    // ignore errors
  }
  // Try old v1 (one-plan object with day arrays)
  try {
    const rawV1 = localStorage.getItem(V1_KEY);
    if (rawV1) {
      const v1 = JSON.parse(rawV1);
      let plan = DEFAULT_PLAN();
      if (v1 && typeof v1 === "object") {
        // Copy any known keys over, then migrate if they’re short
        for (const k of Object.keys(plan.days)) {
          if (Array.isArray(v1[k])) plan.days[k] = v1[k];
        }
        // Also copy short keys if present
        for (const shortKey of Object.keys(SHORT_TO_FULL)) {
          if (Array.isArray(v1[shortKey])) {
            const fullKey = SHORT_TO_FULL[shortKey];
            plan.days[fullKey] = [...plan.days[fullKey], ...v1[shortKey]];
          }
        }
      }
      plan = migrateDayKeys(plan);
      const migrated = { plans: [plan], activeId: plan.id };
      localStorage.setItem(V2_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {
    // ignore errors
  }
  // Fresh
  const plan = DEFAULT_PLAN();
  const fresh = { plans: [plan], activeId: plan.id };
  localStorage.setItem(V2_KEY, JSON.stringify(fresh));
  return fresh;
}
function writeStore(obj) {
  localStorage.setItem(V2_KEY, JSON.stringify(obj));
  return obj;
}

// ---------- CSV helpers (export/import) ----------
const csvEscape = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function storeToCSV(store) {
  const header = [
    "planId","planName","day","slug","exerciseId","name","category","difficulty","sets","reps","weight",
  ];
  const rows = [header.join(",")];

  for (const p of store.plans) {
    const plan = normalizePlanDays(migrateDayKeys(p));
    for (const day of DAY_KEYS) {
      const list = plan.days[day] || [];
      for (const it of list) {
        rows.push([
          csvEscape(plan.id),
          csvEscape(plan.name),
          csvEscape(day),
          csvEscape(it.slug),
          csvEscape(it.id),
          csvEscape(it.name),
          csvEscape(it.category ?? ""),
          csvEscape(it.difficulty ?? ""),
          csvEscape(it.sets ?? ""),
          csvEscape(it.reps ?? ""),
          csvEscape(it.weight ?? ""),
        ].join(","));
      }
    }
  }
  return rows.join("\n");
}

// minimal CSV line splitter (quote-aware)
function splitCSVLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQ = false; }
      else cur += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ',') { out.push(cur); cur = ""; }
      else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function parseRegimenCSV(text) {
  const lines = String(text || "").split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) {
    return { plans: [], errors: ["CSV is empty."] };
  }

  const header = splitCSVLine(lines[0]).map(h => h.trim());
  const need = ["planId","planName","day","slug","exerciseId","name","category","difficulty","sets","reps","weight"];
  const index = (name) => header.findIndex(h => h.toLowerCase() === name.toLowerCase());
  const idx = Object.fromEntries(need.map(n => [n, index(n)]));
  if (idx.planId < 0 || idx.planName < 0 || idx.day < 0 || idx.slug < 0 || idx.exerciseId < 0 || idx.name < 0) {
    return { plans: [], errors: ['CSV must include headers: planId, planName, day, slug, exerciseId, name (case-insensitive).'] };
  }

  const groups = new Map(); // key: planName -> {id, name, days}
  const ERR = [];

  for (let li = 1; li < lines.length; li++) {
    const cols = splitCSVLine(lines[li]);
    const get = (k) => (idx[k] >= 0 && idx[k] < cols.length ? cols[idx[k]] : "");
    const planId = get("planId").trim();
    const planName = get("planName").trim() || "Imported Plan";
    const day = get("day").trim();
    const slug = get("slug").trim();
    const exerciseId = get("exerciseId").trim();
    const name = get("name").trim();

    if (!DAY_KEYS.includes(day)) {
      ERR.push(`Line ${li + 1}: invalid day "${day}".`);
      continue;
    }
    if (!slug || !exerciseId || !name) {
      ERR.push(`Line ${li + 1}: missing slug/exerciseId/name.`);
      continue;
    }

    const category = (get("category") || "").trim();
    const difficulty = (get("difficulty") || "").trim();
    // keep as strings so inputs stay controlled
    const sets = (get("sets") || "").trim();
    const reps = (get("reps") || "").trim();
    const weight = (get("weight") || "").trim();

    const key = planName.toLowerCase();
    if (!groups.has(key)) {
      groups.set(key, {
        id: planId || `plan_${Math.random().toString(36).slice(2, 9)}`,
        name: planName,
        days: {
          Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [], Unassigned: [],
        },
      });
    }
    groups.get(key).days[day].push({ slug, id: exerciseId, name, category, difficulty, sets, reps, weight });
  }

  // normalize & array-ify
  const plans = Array.from(groups.values()).map(normalizePlanDays);
  return { plans, errors: ERR };
}

export default function Regimen() {
  const [store, setStore] = useState(() => readStore());
  const [preview, setPreview] = useState(null); // {slug, id}

  // 🔹 DnD state
  const [dragData, setDragData] = useState(null); // { fromDay, fromIndex }
  const [dragOver, setDragOver] = useState(null); // { day, index } or { day, index: 'end' }

  // 🔹 Import (CSV) file input
  const fileRef = useRef(null);

  const activePlan = useMemo(() => {
    const p = store.plans.find((p) => p.id === store.activeId);
    return p ? normalizePlanDays(p) : normalizePlanDays(store.plans[0]);
  }, [store]);

  const setActivePlan = (planUpdater) => {
    setStore((prev) => {
      const current = prev.plans.find((p) => p.id === prev.activeId) || prev.plans[0];
      const updated = normalizePlanDays(planUpdater(structuredClone(current)));
      const plans = prev.plans.map((p) => (p.id === current.id ? updated : p));
      const next = writeStore({ ...prev, plans });
      return next;
    });
  };

  // ---------- plan actions ----------
  const onNewPlan = () => {
    const p = DEFAULT_PLAN();
    setStore((prev) => writeStore({ plans: [p, ...prev.plans], activeId: p.id }));
  };
  const onRenamePlan = () => {
    const name = prompt("New plan name:", activePlan?.name || "");
    if (!name) return;
    setActivePlan((p) => ({ ...p, name: name.trim() || p.name }));
  };
  const onDuplicatePlan = () => {
    const copy = normalizePlanDays(structuredClone(activePlan));
    copy.id = `plan_${Math.random().toString(36).slice(2, 9)}`;
    copy.name = `${activePlan.name} (copy)`;
    setStore((prev) => writeStore({ plans: [copy, ...prev.plans], activeId: copy.id }));
  };
  const onDeletePlan = () => {
    if (!confirm(`Delete plan "${activePlan.name}"?`)) return;
    setStore((prev) => {
      const left = prev.plans.filter((p) => p.id !== activePlan.id);
      if (left.length === 0) {
        const p = DEFAULT_PLAN();
        return writeStore({ plans: [p], activeId: p.id });
      }
      return writeStore({ plans: left, activeId: left[0].id });
    });
  };
  const onChangeActive = (id) => {
    setStore((prev) => writeStore({ ...prev, activeId: id }));
  };

  // ---------- day helpers ----------
  const indexOfDay = (day) => DAY_KEYS.indexOf(day);
  const prevDay = (day) => DAY_KEYS[(indexOfDay(day) + DAY_KEYS.length - 1) % DAY_KEYS.length];
  const nextDay = (day) => DAY_KEYS[(indexOfDay(day) + 1) % DAY_KEYS.length];

  // ---------- item ops ----------
  const moveItem = (fromDay, idx, toDay, toIndex = 0) =>
    setActivePlan((p) => {
      const fromArr = Array.isArray(p.days[fromDay]) ? p.days[fromDay].slice() : [];
      const toArr = Array.isArray(p.days[toDay]) ? p.days[toDay].slice() : [];
      const [item] = fromArr.splice(idx, 1);
      if (!item) return p;
      const insertAt = Math.max(0, Math.min(toIndex, toArr.length));
      toArr.splice(insertAt, 0, item);
      p.days[fromDay] = fromArr;
      p.days[toDay] = toArr;
      return p;
    });

  const removeItem = (day, idx) =>
    setActivePlan((p) => {
      const arr = Array.isArray(p.days[day]) ? p.days[day].slice() : [];
      arr.splice(idx, 1);
      p.days[day] = arr;
      return p;
    });

  const reorderItem = (day, idx, dir) =>
    setActivePlan((p) => {
      const arr = Array.isArray(p.days[day]) ? p.days[day].slice() : [];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return p;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      p.days[day] = arr;
      return p;
    });

  const clearDay = (day) =>
    setActivePlan((p) => {
      p.days[day] = [];
      return p;
    });

  const clearPlan = () => {
    if (!confirm("Clear ALL days in this plan?")) return;
    setActivePlan((p) => {
      for (const k of DAY_KEYS) p.days[k] = [];
      return p;
    });
  };

  // ---------- keep target fields as strings while typing ----------
  const updateTargets = (day, idx, patch) =>
    setActivePlan((p) => {
      const arr = Array.isArray(p.days[day]) ? p.days[day].slice() : [];
      if (!arr[idx]) return p;

      const norm = { ...patch };
      if ("sets"   in norm) norm.sets   = norm.sets   == null ? "" : String(norm.sets);
      if ("reps"   in norm) norm.reps   = norm.reps   == null ? "" : String(norm.reps);
      if ("weight" in norm) norm.weight = norm.weight == null ? "" : String(norm.weight);

      arr[idx] = { ...arr[idx], ...norm };
      p.days[day] = arr;
      return p;
    });

  // ============================================================
  //        RANDOMIZER (PPL + Powerlifting + Calisthenics)
  // ============================================================
  const TYPE_MAP = {
    Push: ["chest", "triceps"],
    Pull: ["back", "biceps", "forearms"],
    Legs: ["legs", "abs"],
    Powerlifting: ["powerlifting"],
    Calisthenics: ["calisthenics"],
  };

  const DIFFS = ["Beginner", "Intermediate", "Advanced"];

  function normalizeDifficulty(d) {
    const s = String(d || "").toLowerCase();
    if (s.startsWith("beg")) return "Beginner";
    if (s.startsWith("int")) return "Intermediate";
    if (s.startsWith("adv")) return "Advanced";
    return "Beginner";
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function poolForType(type) {
    const slugs = TYPE_MAP[type] || [];
    const byDiff = { Beginner: [], Intermediate: [], Advanced: [] };

    for (const slug of slugs) {
      const list = getExercises(slug) || [];
      for (const ex of list) {
        const diff = normalizeDifficulty(ex.difficulty);
        byDiff[diff].push({
          slug,
          id: ex.id,
          name: ex.name,
          category: type,
          difficulty: diff,
          // start empty targets so inputs render cleanly
          sets: "",
          reps: "",
          weight: "",
        });
      }
    }
    for (const d of DIFFS) byDiff[d] = shuffle(byDiff[d]);
    return byDiff;
  }

  function takeN(pool, n) {
    return pool.slice(0, Math.max(0, n));
  }

  function randomSetFor(type) {
    const pools = poolForType(type);
    const pick = [];
    for (const d of DIFFS) pick.push(...takeN(pools[d], 2)); // 2 per difficulty
    return pick;
  }

  function addItemsToDay(day, items, { toTop = true, skipDup = true } = {}) {
    setActivePlan((p) => {
      const arr = Array.isArray(p.days[day]) ? p.days[day] : [];
      const existing = new Set(arr.map((it) => `${it.slug}:${it.id}`));
      const incoming = items.filter((it) => {
        const key = `${it.slug}:${it.id}`;
        return skipDup ? !existing.has(key) : true;
      });
      // Ensure targets are strings
      const primed = incoming.map((it) => ({
        ...it,
        sets: it.sets ?? "",
        reps: it.reps ?? "",
        weight: it.weight ?? "",
      }));
      p.days[day] = toTop ? [...primed, ...arr] : [...arr, ...primed];
      return p;
    });
  }

  // Quick fill controls
  const [qfDay, setQfDay] = useState("Monday");
  const [qfType, setQfType] = useState("Push");
  const [qfSkipDup, setQfSkipDup] = useState(true);

  const onQuickFillOne = () => {
    const set = randomSetFor(qfType);
    if (set.length === 0) {
      alert(`No exercises found for ${qfType}.`);
      return;
    }
    addItemsToDay(qfDay, set, { toTop: true, skipDup: qfSkipDup });
  };

  const onFillPPLCycle = () => {
    const order = ["Push", "Pull", "Legs", "Push", "Pull", "Legs"];
    const startIdx = DAY_KEYS.indexOf(qfDay);
    if (startIdx === -1) return;

    for (let i = 0; i < order.length; i++) {
      const day = DAY_KEYS[(startIdx + i) % DAY_KEYS.length];
      if (day === "Unassigned") continue;
      const set = randomSetFor(order[i]);
      if (set.length) addItemsToDay(day, set, { toTop: true, skipDup: qfSkipDup });
    }
    alert("Filled a 6-day PPL cycle (2/2/2 per day).");
  };

  const onFillPowerliftingCycle = () => {
    const order = ["Powerlifting", "Pull", "Legs", "Powerlifting", "Pull", "Legs"];
    const startIdx = DAY_KEYS.indexOf(qfDay);
    if (startIdx === -1) return;

    for (let i = 0; i < order.length; i++) {
      const day = DAY_KEYS[(startIdx + i) % DAY_KEYS.length];
      if (day === "Unassigned") continue;
      const set = randomSetFor(order[i]);
      if (set.length) addItemsToDay(day, set, { toTop: true, skipDup: qfSkipDup });
    }
    alert("Filled a 6-day Powerlifting-focused cycle (PL/Pull/Legs x2).");
  };

  const onFillCalisthenicsCycle = () => {
    const order = ["Calisthenics", "Pull", "Legs", "Calisthenics", "Pull", "Legs"];
    const startIdx = DAY_KEYS.indexOf(qfDay);
    if (startIdx === -1) return;

    for (let i = 0; i < order.length; i++) {
      const day = DAY_KEYS[(startIdx + i) % DAY_KEYS.length];
      if (day === "Unassigned") continue;
      const set = randomSetFor(order[i]);
      if (set.length) addItemsToDay(day, set, { toTop: true, skipDup: qfSkipDup });
    }
    alert("Filled a 6-day Calisthenics-focused cycle (Cal/Pull/Legs x2).");
  };

  // ---------- DnD handlers ----------
  const onDragStart = (fromDay, fromIndex) => {
    setDragData({ fromDay, fromIndex });
  };
  const onDragOverItem = (e, day, index) => {
    e.preventDefault(); // allow drop
    setDragOver({ day, index });
  };
  const onDragOverListEnd = (e, day) => {
    e.preventDefault(); // allow drop
    setDragOver({ day, index: "end" });
  };
  const onDropItem = (day, index) => {
    if (!dragData) return;
    const { fromDay, fromIndex } = dragData;
    let toIndex = index;
    if (fromDay === day && fromIndex < index) {
      toIndex = Math.max(0, index - 1);
    }
    moveItem(fromDay, fromIndex, day, toIndex);
    setDragData(null);
    setDragOver(null);
  };
  const onDropListEnd = (day) => {
    if (!dragData) return;
    const { fromDay, fromIndex } = dragData;
    const endIndex = (activePlan.days[day] || []).length;
    moveItem(fromDay, fromIndex, day, endIndex);
    setDragData(null);
    setDragOver(null);
  };

  // ---------- Export / Import (CSV) ----------
  const onExportCSV = () => {
    try {
      const csv = storeToCSV(store);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gitfit-regimen.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to export regimen CSV.");
    }
  };

  const onClickImport = () => fileRef.current?.click();

  const onImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const { plans: incomingPlans, errors } = parseRegimenCSV(text);
      if (errors?.length) {
        alert("CSV issues:\n" + errors.join("\n"));
      }
      if (!incomingPlans.length) {
        alert("No valid rows found.");
        e.target.value = "";
        return;
      }

      // Ensure unique ids vs existing
      const existingIds = new Set(store.plans.map((p) => p.id));
      const normalizedIncoming = incomingPlans.map((p) => {
        let id = p.id && typeof p.id === "string" ? p.id : `plan_${Math.random().toString(36).slice(2, 9)}`;
        if (existingIds.has(id)) id = `plan_${Math.random().toString(36).slice(2, 9)}`;
        return normalizePlanDays({ ...p, id });
      });

      const next = {
        activeId: store.activeId, // keep the same active plan
        plans: [...store.plans, ...normalizedIncoming],
      };

      writeStore(next);
      setStore(next);
      alert(`Imported ${normalizedIncoming.length} plan(s) from CSV.`);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to import regimen CSV.");
    } finally {
      e.target.value = "";
    }
  };

  // ---------- rendering ----------
  return (
    <div className="regimen container">
      <header className="reg-header">
        <div className="reg-title">
          <h1>Training Regimen</h1>
        </div>

        <div className="reg-planbar">
          <select
            className="select"
            value={store.activeId}
            onChange={(e) => onChangeActive(e.target.value)}
            aria-label="Active plan"
          >
            {store.plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="plan-actions">
            <button className="btn" onClick={onNewPlan}>New</button>
            <button className="btn" onClick={onRenamePlan}>Rename</button>
            <button className="btn" onClick={onDuplicatePlan}>Duplicate</button>
            <button className="btn danger" onClick={onDeletePlan}>Delete</button>
            <button className="btn" onClick={clearPlan}>Clear Plan</button>
          </div>
        </div>

        {/* CSV Export / Import */}
        <div className="plan-actions" style={{ flexWrap: "wrap", gap: 8 }}>
          <button className="btn" onClick={onExportCSV}>Export plan(s) (CSV)</button>
          <button className="btn" onClick={onClickImport}>Import plan(s) (CSV)</button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            style={{ display: "none" }}
            onChange={onImportFile}
          />
        </div>

        {/* QUICK FILL */}
        <div className="plan-actions" style={{ flexWrap: "wrap", gap: 8 }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="muted">Day</span>
            <select className="select" value={qfDay} onChange={(e) => setQfDay(e.target.value)}>
              {DAY_KEYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>

          <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="muted">Type</span>
            <select className="select" value={qfType} onChange={(e) => setQfType(e.target.value)}>
              <option>Push</option>
              <option>Pull</option>
              <option>Legs</option>
              <option>Powerlifting</option>
              <option>Calisthenics</option>
            </select>
          </label>

          <label className="checkbox" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <input type="checkbox" checked={qfSkipDup} onChange={(e) => setQfSkipDup(e.target.checked)} />
            <span className="muted">Skip duplicates in day</span>
          </label>

          <button className="btn" onClick={onQuickFillOne}>Add Random 2/2/2 to Day</button>
          <button className="btn" onClick={onFillPPLCycle}>Fill 6-Day PPL Cycle</button>
          <button className="btn" onClick={onFillPowerliftingCycle}>Fill 6-Day PL Cycle</button>
          <button className="btn" onClick={onFillCalisthenicsCycle}>Fill 6-Day Calisthenics Cycle</button>
        </div>
      </header>

      {/* GRID */}
      <section className="reg-grid">
        {DAY_KEYS.map((day) => (
          <DayColumn
            key={day}
            label={day}
            items={activePlan.days[day] || []}
            onMovePrev={(idx) => moveItem(day, idx, prevDay(day), 0)}
            onMoveNext={(idx) => moveItem(day, idx, nextDay(day), 0)}
            onMoveTo={(idx, targetDay) => moveItem(day, idx, targetDay, 0)}
            onUp={(idx) => reorderItem(day, idx, -1)}
            onDown={(idx) => reorderItem(day, idx, +1)}
            onRemove={(idx) => removeItem(day, idx)}
            onClear={() => clearDay(day)}
            onDetails={(it) => setPreview({ slug: it.slug, id: it.id })}

            // DnD props
            dragOver={dragOver}
            onDragStart={(i) => onDragStart(day, i)}
            onDragOverItem={(i, e) => onDragOverItem(e, day, i)}
            onDragOverListEnd={(e) => onDragOverListEnd(e, day)}
            onDropItem={(i) => onDropItem(day, i)}
            onDropListEnd={() => onDropListEnd(day)}

            // Targets
            onTargetsChange={(i, patch) => updateTargets(day, i, patch)}
          />
        ))}
      </section>

      {/* Details Modal */}
      {preview && (
        <DetailsModal
          slug={preview.slug}
          exerciseId={preview.id}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}

function DayColumn({
  label,
  items,
  onMovePrev,
  onMoveNext,
  onMoveTo,
  onUp,
  onDown,
  onRemove,
  onClear,
  onDetails,
  // DnD
  dragOver,
  onDragStart,
  onDragOverItem,
  onDragOverListEnd,
  onDropItem,
  onDropListEnd,
  // Targets
  onTargetsChange,
}) {
  const isListDragOver = dragOver && dragOver.day === label && dragOver.index === "end";

  // keep only digits & dot; return strings so inputs stay controlled
  const onNum = (v) => (v === "" ? "" : String(v).replace(/[^\d.]/g, ""));

  return (
    <div className="reg-col">
      <div className="reg-col-head">
        <div className="reg-col-title">
          <h3>{label}</h3>
          <span className="pill">{items.length}</span>
        </div>
        <button className="btn small" onClick={onClear} disabled={items.length === 0}>
          Clear
        </button>
      </div>

      <ol
        className={`reg-col-list ${isListDragOver ? "drag-over" : ""}`}
        onDragOver={(e) => onDragOverListEnd(e)}
        onDrop={onDropListEnd}
      >
        {items.length === 0 ? (
          <li className="empty">No exercises</li>
        ) : (
          items.map((it, i) => {
            const isCardDragOver =
              dragOver && dragOver.day === label && dragOver.index === i;

            const sets = it.sets ?? "";
            const reps = it.reps ?? "";
            const weight = it.weight ?? "";

            return (
              <li
                key={`${it.slug}:${it.id}:${i}`}
                className={`ex-card ${isCardDragOver ? "drag-over" : ""}`}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOverItem(i, e)}
                onDrop={() => onDropItem(i)}
              >
                {/* Header: Name + Difficulty */}
                <div className="ex-head">
                  <div className="ex-name">{it.name}</div>
                  {it.difficulty && (
                    <span className={`tag diff-${String(it.difficulty).toLowerCase()}`}>
                      {it.difficulty}
                    </span>
                  )}
                </div>

                {/* Subline: Category/slug */}
                <div className="ex-sub">
                  <span className="muted">{it.category || it.slug}</span>
                </div>

                {/* Targets */}
                <div className="ex-targets">
                  <label>
                    <span>Sets</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={sets}
                      onChange={(e) => onTargetsChange(i, { sets: onNum(e.target.value) })}
                      placeholder="e.g., 3"
                    />
                  </label>
                  <label>
                    <span>Reps</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={reps}
                      onChange={(e) => onTargetsChange(i, { reps: onNum(e.target.value) })}
                      placeholder="e.g., 8"
                    />
                  </label>
                  <label>
                    <span>Weight</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={weight}
                      onChange={(e) => onTargetsChange(i, { weight: onNum(e.target.value) })}
                      placeholder="lb"
                    />
                  </label>
                </div>

                {/* Actions row */}
                <div className="ex-actions">
                  <button className="icon" onClick={() => onDetails(it)} title="Details" aria-label="Details">
                    Details
                  </button>
                  <button className="icon" onClick={() => onUp(i)} title="Move up" aria-label="Move up">↑</button>
                  <button className="icon" onClick={() => onDown(i)} title="Move down" aria-label="Move down">↓</button>
                  <button className="icon" onClick={() => onMovePrev(i)} title="Move to previous day" aria-label="Move to previous day">◀</button>
                  <button className="icon" onClick={() => onMoveNext(i)} title="Move to next day" aria-label="Move to next day">▶</button>
                  <select
                    className="mini"
                    onChange={(e) => { if (e.target.value) onMoveTo(i, e.target.value); e.target.value = ""; }}
                    defaultValue=""
                    aria-label="Move to another day"
                  >
                    <option value="" disabled>Move to…</option>
                    {DAY_KEYS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <button className="icon danger" onClick={() => onRemove(i)} title="Remove" aria-label="Remove">✕</button>
                </div>
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
}

/* ---------------- Modal ---------------- */

function DetailsModal({ slug, exerciseId, onClose }) {
  const list = getExercises(slug) || [];
  const ex = list.find((e) => e.id === exerciseId) || null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!ex ? (
          <>
            <div className="modal-header">
              <h3>Not found</h3>
              <button className="icon" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="modal-body">
              <p>That exercise could not be found. It may have been removed.</p>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h3>{ex.name}</h3>
              <button className="icon" onClick={onClose} aria-label="Close">✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-meta">
                <span className={`tag diff-${ex.difficulty.toLowerCase()}`}>{ex.difficulty}</span>
                <span><strong>Muscles:</strong> {ex.muscles?.join(", ")}</span>
                <span><strong>Equipment:</strong> {ex.equipment}</span>
              </div>

              {ex.description && <p className="desc">{ex.description}</p>}

              {Array.isArray(ex.tips) && ex.tips.length > 0 && (
                <div className="tips">
                  <h4>Tips</h4>
                  <ul>{ex.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <Link className="btn" to={`/categories/${slug}/${exerciseId}`} onClick={onClose}>
                Open full page
              </Link>
              <button className="btn" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
