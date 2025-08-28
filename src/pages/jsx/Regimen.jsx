/* src/pages/jsx/Regimen.jsx */

import { useMemo, useState } from "react";
import {
  listByDay,
  assignDay,
  removeFromRegimen,
  clearRegimen,
  addToRegimen,
  listPlans,
  getCurrentPlanId,
  getCurrentPlanName,
  switchPlan,
  createPlan,
  duplicateCurrentPlan,
  renamePlan,
  deletePlan,
} from "../../utils/regimen";
import "../css/Regimen.css";
import { getExercises } from "../../data/exercises";

const DAY_LABELS = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu",
  fri: "Fri", sat: "Sat", sun: "Sun", unassigned: "Unassigned",
};

function has(slug, id) {
  try {
    const list = getExercises(slug) || [];
    return list.some((e) => e.id === id);
  } catch {
    return false;
  }
}

// ✅ FIXED: accept the array and call its .push() method
function addIfExists(day, slug, id, arr) {
  if (has(slug, id)) arr.push({ day, slug, id });
}

function buildPresets() {
  const PPL = [], UPPERLOWER = [], BRO5 = [], CALI3 = [], PL3 = [];

  // PPL
  addIfExists("mon", "chest", "bench-press", PPL);
  addIfExists("mon", "triceps", "pushdown", PPL);
  addIfExists("mon", "chest", "incline-db-press", PPL);
  addIfExists("wed", "back", "barbell-row", PPL);
  addIfExists("wed", "back", "lat-pulldown", PPL);
  addIfExists("wed", "biceps", "db-curl", PPL);
  addIfExists("fri", "legs", "back-squat", PPL);
  addIfExists("fri", "legs", "rdl", PPL);
  addIfExists("fri", "abs", "plank", PPL);

  // Upper/Lower
  addIfExists("mon", "chest", "bench-press", UPPERLOWER);
  addIfExists("mon", "back", "barbell-row", UPPERLOWER);
  addIfExists("mon", "biceps", "db-curl", UPPERLOWER);
  addIfExists("mon", "triceps", "pushdown", UPPERLOWER);
  addIfExists("tue", "legs", "back-squat", UPPERLOWER);
  addIfExists("tue", "legs", "rdl", UPPERLOWER);
  addIfExists("tue", "abs", "crunch", UPPERLOWER);
  addIfExists("thu", "chest", "incline-db-press", UPPERLOWER);
  addIfExists("thu", "back", "lat-pulldown", UPPERLOWER);
  addIfExists("thu", "biceps", "hammer-curl", UPPERLOWER);
  addIfExists("thu", "triceps", "oh-db-ext", UPPERLOWER);
  addIfExists("fri", "legs", "front-squat", UPPERLOWER);
  addIfExists("fri", "legs", "hip-thrust", UPPERLOWER);
  addIfExists("fri", "abs", "reverse-crunch", UPPERLOWER);

  // Bro 5
  addIfExists("mon", "chest", "bench-press", BRO5);
  addIfExists("mon", "chest", "cable-crossover", BRO5);
  addIfExists("tue", "back", "barbell-row", BRO5);
  addIfExists("tue", "back", "face-pull", BRO5);
  addIfExists("wed", "legs", "back-squat", BRO5);
  addIfExists("wed", "legs", "leg-press", BRO5);
  addIfExists("thu", "triceps", "skullcrusher", BRO5);
  addIfExists("thu", "biceps", "ez-bar-curl", BRO5);
  addIfExists("fri", "abs", "plank", BRO5);
  addIfExists("fri", "cardio", "incline-walk", BRO5);

  // Calisthenics 3
  addIfExists("mon", "calisthenics", "cal-pushup", CALI3);
  addIfExists("mon", "calisthenics", "cal-row", CALI3);
  addIfExists("mon", "abs", "hanging-leg-raise", CALI3);
  addIfExists("wed", "calisthenics", "cal-pullup", CALI3);
  addIfExists("wed", "calisthenics", "cal-dip", CALI3);
  addIfExists("wed", "calisthenics", "cal-hollow", CALI3);
  addIfExists("fri", "calisthenics", "cal-pistol", CALI3);
  addIfExists("fri", "calisthenics", "cal-handstand", CALI3);
  addIfExists("fri", "abs", "side-plank", CALI3);

  // Powerlifting 3
  addIfExists("mon", "powerlifting", "pl-back-squat", PL3);
  addIfExists("mon", "powerlifting", "pl-row", PL3);
  addIfExists("mon", "abs", "dead-bug", PL3);
  addIfExists("wed", "powerlifting", "pl-bench", PL3);
  addIfExists("wed", "powerlifting", "pl-ohp", PL3);
  addIfExists("wed", "triceps", "close-grip-bench", PL3);
  addIfExists("fri", "powerlifting", "pl-deadlift", PL3);
  addIfExists("fri", "legs", "calf-raise-stand", PL3);
  addIfExists("fri", "back", "face-pull", PL3);

  return { PPL, UPPERLOWER, BRO5, CALI3, PL3 };
}

export default function Regimen() {
  const [byDay, setByDay] = useState(listByDay());
  const [plans, setPlans] = useState(listPlans());
  const [currentId, setCurrentId] = useState(getCurrentPlanId());
  const [currentName, setCurrentName] = useState(getCurrentPlanName());

  const refreshPlanData = () => {
    setByDay(listByDay());
    setPlans(listPlans());
    setCurrentId(getCurrentPlanId());
    setCurrentName(getCurrentPlanName());
  };

  const onAssign = (key, value) => { assignDay(key, value === "unassigned" ? null : value); setByDay(listByDay()); };
  const onRemove = (key) => { removeFromRegimen(key); setByDay(listByDay()); };
  const onClear   = () => { if (confirm("Clear the current plan?")) { clearRegimen(); setByDay(listByDay()); } };

  const applyPreset = (items) => {
    try {
      clearRegimen();
      for (const it of items) {
        const list = getExercises(it.slug) || [];
        const ex = list.find((e) => e.id === it.id);
        if (!ex) continue;
        addToRegimen({
          slug: it.slug,
          id: it.id,
          name: ex.name,
          category: ex.categoryName || "",
          day: it.day,
        });
      }
      setByDay(listByDay());
    } catch (e) {
      console.warn("Preset apply failed:", e);
    }
  };

  const { PPL, UPPERLOWER, BRO5, CALI3, PL3 } = useMemo(buildPresets, []);

  const onSwitchPlan     = (id) => { switchPlan(id); refreshPlanData(); };
  const onCreatePlan     = () => { const name = prompt("Name your new plan:", "My Plan"); if (!name) return; createPlan(name); refreshPlanData(); };
  const onDuplicatePlan  = () => { const name = prompt("Name for the copy:", `Copy of ${currentName}`) || `Copy of ${currentName}`; duplicateCurrentPlan(name); refreshPlanData(); };
  const onRenamePlan     = () => { const name = prompt("Rename current plan to:", currentName); if (!name) return; renamePlan(currentId, name); refreshPlanData(); };
  const onDeletePlan     = () => { if (!confirm(`Delete "${currentName}"?`)) return; deletePlan(currentId); refreshPlanData(); };

  const dayEntries = Object.entries(byDay || {});

  return (
    <div className="regimen container">
      <div className="regimen-head">
        <div>
          <h1>Training Regimen</h1>
          <p className="sub">Manage multiple plans, use presets, and assign exercises to days.</p>
        </div>
        <button className="btn danger" onClick={onClear}>Clear current plan</button>
      </div>

      <div className="plans-bar">
        <select className="select" value={currentId || ""} onChange={(e) => onSwitchPlan(e.target.value)} title="Switch plan">
          {(plans || []).map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <div className="plan-actions">
          <button className="btn" onClick={onCreatePlan}>New</button>
          <button className="btn" onClick={onDuplicatePlan}>Duplicate</button>
          <button className="btn" onClick={onRenamePlan}>Rename</button>
          <button className="btn danger" onClick={onDeletePlan}>Delete</button>
        </div>
      </div>

      <div className="presets">
        <button className="btn" onClick={() => applyPreset(PPL)}>PPL (3-day)</button>
        <button className="btn" onClick={() => applyPreset(UPPERLOWER)}>Upper/Lower (4-day)</button>
        <button className="btn" onClick={() => applyPreset(BRO5)}>Bro Split (5-day)</button>
        <button className="btn" onClick={() => applyPreset(CALI3)}>Calisthenics (3-day)</button>
        <button className="btn" onClick={() => applyPreset(PL3)}>Powerlifting (3-day)</button>
      </div>

      <div className="regimen-grid">
        {dayEntries.map(([day, items]) => (
          <section key={day} className="regimen-day">
            <h3>{DAY_LABELS[day] ?? day.toUpperCase()}</h3>
            {(items || []).length === 0 ? (
              <p className="empty">No exercises</p>
            ) : (
              <ul className="day-list">
                {(items || []).map((it) => (
                  <li key={it.key} className="regimen-item">
                    <div className="item-main">
                      <div className="item-title">{it.name}</div>
                      <div className="item-sub">{it.category}</div>
                    </div>
                    <div className="item-actions">
                      <select
                        className="select"
                        value={it.day || "unassigned"}
                        onChange={(e) => onAssign(it.key, e.target.value)}
                      >
                        <option value="unassigned">Unassigned</option>
                        <option value="mon">Mon</option>
                        <option value="tue">Tue</option>
                        <option value="wed">Wed</option>
                        <option value="thu">Thu</option>
                        <option value="fri">Fri</option>
                        <option value="sat">Sat</option>
                        <option value="sun">Sun</option>
                      </select>
                      <button className="btn" onClick={() => onRemove(it.key)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
