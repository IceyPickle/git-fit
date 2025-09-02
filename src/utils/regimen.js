/* src/utils/regimen.js */

/*
   Central helpers for the Regimen feature.
   - Uses FULL day names to match the UI (Monday..Sunday, Unassigned)
   - Migrates any old short keys (Mon..Sun) forward automatically
*/

export const V1_KEY = "gitfit_regimen";
export const V2_KEY = "gitfit_regimen_v2";

// ✅ Full day names used everywhere in the app
export const DAY_KEYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Unassigned",
];

// Map short -> full (for migration)
const SHORT_TO_FULL = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const DEFAULT_PLAN = () => ({
  id: `plan_${Math.random().toString(36).slice(2, 9)}`,
  name: "My Plan",
  days: Object.fromEntries(DAY_KEYS.map((k) => [k, []])),
});

function normalizePlanDays(plan) {
  const next = { ...plan, days: { ...plan.days } };
  for (const k of DAY_KEYS) {
    if (!Array.isArray(next.days[k])) next.days[k] = [];
  }
  return next;
}

// Migrate short keys inside a single plan
function migrateDayKeys(plan) {
  if (!plan?.days) return plan;
  let mutated = false;
  const days = { ...plan.days };

  for (const shortKey of Object.keys(SHORT_TO_FULL)) {
    if (Array.isArray(days[shortKey])) {
      const fullKey = SHORT_TO_FULL[shortKey];
      const arr = days[shortKey];
      delete days[shortKey];
      // merge if full key already exists
      days[fullKey] = Array.isArray(days[fullKey]) ? [...arr, ...days[fullKey]] : arr;
      mutated = true;
    }
  }
  const next = { ...plan, days };
  return normalizePlanDays(mutated ? next : next);
}

function writeStore(obj) {
  try {
    localStorage.setItem(V2_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error("regimen: failed to write store:", e);
  }
  return obj;
}

export function readStore() {
  // Prefer V2
  try {
    const rawV2 = localStorage.getItem(V2_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (parsed && Array.isArray(parsed.plans) && parsed.activeId) {
        // migrate any plans that still have short keys
        const migratedPlans = parsed.plans.map((p) => migrateDayKeys(p));
        const fixed = { ...parsed, plans: migratedPlans };
        return writeStore(fixed);
      }
    }
  } catch (e) {
    if (import.meta?.env?.DEV) console.warn("regimen v2 parse failed:", e);
  }

  // Try migrate V1 -> V2 (best-effort)
  try {
    const rawV1 = localStorage.getItem(V1_KEY);
    if (rawV1) {
      const v1 = JSON.parse(rawV1);
      let plan = DEFAULT_PLAN();
      if (v1 && typeof v1 === "object") {
        // copy any full-name keys
        for (const k of DAY_KEYS) {
          if (Array.isArray(v1[k])) plan.days[k] = v1[k];
        }
        // copy any short keys and merge
        for (const shortKey of Object.keys(SHORT_TO_FULL)) {
          if (Array.isArray(v1[shortKey])) {
            const fullKey = SHORT_TO_FULL[shortKey];
            plan.days[fullKey] = [...plan.days[fullKey], ...v1[shortKey]];
          }
        }
      }
      plan = migrateDayKeys(plan);
      const migrated = { plans: [plan], activeId: plan.id };
      return writeStore(migrated);
    }
  } catch (e) {
    if (import.meta?.env?.DEV) console.warn("regimen v1 parse failed:", e);
  }

  // Fresh store
  const plan = DEFAULT_PLAN();
  return writeStore({ plans: [plan], activeId: plan.id });
}

export function getActivePlan(store = readStore()) {
  const { plans, activeId } = store;
  const found = plans.find((p) => p.id === activeId) || plans[0];
  return normalizePlanDays(found);
}

export function saveActivePlan(mutator) {
  const store = readStore();
  const active = getActivePlan(store);
  const updated = normalizePlanDays(mutator(structuredClone(active)));
  const plans = store.plans.map((p) => (p.id === active.id ? updated : p));
  return writeStore({ ...store, plans });
}

/**
 * Add one exercise to a day in the active plan.
 * item: { slug, id, name, category?, difficulty? }
 * day: one of DAY_KEYS (Monday..Sunday or "Unassigned")
 * toTop: if true insert at top, else at bottom
 */
export function addExerciseToDay(item, day = "Unassigned", toTop = true) {
  if (!DAY_KEYS.includes(day)) day = "Unassigned";
  return saveActivePlan((p) => {
    const arr = Array.isArray(p.days[day]) ? p.days[day] : [];
    const safe = {
      slug: String(item.slug),
      id: String(item.id),
      name: String(item.name),
      category: item.category || "",
      difficulty: item.difficulty || "",
    };
    if (toTop) arr.unshift(safe);
    else arr.push(safe);
    p.days[day] = arr;
    return p;
  });
}
