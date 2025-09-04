/* src/utils/regimen.js
   Helpers for reading/writing the regimen store + JSON export/import.
*/

export const V1_KEY = "gitfit_regimen";
export const V2_KEY = "gitfit_regimen_v2";

// Use full day names to match your Regimen page.
export const DAY_KEYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Unassigned"
];

const SHORT_TO_FULL = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export const DEFAULT_PLAN = () => ({
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

function normalizePlanDays(plan) {
  const next = { ...plan, days: { ...(plan?.days || {}) } };
  for (const k of DAY_KEYS) {
    if (!Array.isArray(next.days[k])) next.days[k] = [];
  }
  return next;
}

function migrateDayKeys(plan) {
  if (!plan?.days) return normalizePlanDays(plan || DEFAULT_PLAN());
  let mutated = false;
  const days = { ...plan.days };

  for (const shortKey of Object.keys(SHORT_TO_FULL)) {
    if (Array.isArray(days[shortKey])) {
      const fullKey = SHORT_TO_FULL[shortKey];
      const arr = days[shortKey];
      delete days[shortKey];
      days[fullKey] = Array.isArray(days[fullKey]) ? [...arr, ...days[fullKey]] : arr;
      mutated = true;
    }
  }
  const next = { ...plan, days };
  return normalizePlanDays(mutated ? next : next);
}

function writeStore(obj) {
  localStorage.setItem(V2_KEY, JSON.stringify(obj));
  return obj;
}

export function readStore() {
  // Prefer V2
  try {
    const rawV2 = localStorage.getItem(V2_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (parsed && Array.isArray(parsed.plans) && parsed.activeId) {
        // ensure all plans normalized / migrated
        const migratedPlans = parsed.plans.map((p) => migrateDayKeys(p));
        return writeStore({ ...parsed, plans: migratedPlans });
      }
    }
  } catch {}

  // Try migrate V1 -> V2
  try {
    const rawV1 = localStorage.getItem(V1_KEY);
    if (rawV1) {
      const v1 = JSON.parse(rawV1);
      let plan = DEFAULT_PLAN();
      if (v1 && typeof v1 === "object") {
        for (const k of Object.keys(plan.days)) {
          if (Array.isArray(v1[k])) plan.days[k] = v1[k];
        }
        for (const shortKey of Object.keys(SHORT_TO_FULL)) {
          if (Array.isArray(v1[shortKey])) {
            const fullKey = SHORT_TO_FULL[shortKey];
            plan.days[fullKey] = [...plan.days[fullKey], ...v1[shortKey]];
          }
        }
      }
      plan = migrateDayKeys(plan);
      return writeStore({ plans: [plan], activeId: plan.id });
    }
  } catch {}

  // Fresh
  const plan = DEFAULT_PLAN();
  return writeStore({ plans: [plan], activeId: plan.id });
}

export function getActivePlan(store = readStore()) {
  const { plans, activeId } = store;
  const found = plans.find((p) => p.id === activeId);
  return found ? normalizePlanDays(found) : normalizePlanDays(plans[0]);
}

export function saveActivePlan(mutator) {
  const store = readStore();
  const active = getActivePlan(store);
  const updated = normalizePlanDays(mutator(structuredClone(active)));
  const plans = store.plans.map((p) => (p.id === active.id ? updated : p));
  return writeStore({ ...store, plans });
}

/** Add one exercise to a day in the active plan. */
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
      // optional targets:
      sets: item.sets,
      reps: item.reps,
      weight: item.weight,
    };
    if (toTop) arr.unshift(safe);
    else arr.push(safe);
    p.days[day] = arr;
    return p;
  });
}

/* ----------------- Export / Import (JSON) ----------------- */

/** Returns a JSON string containing all plans and activeId. */
export function exportRegimenJSON() {
  const store = readStore();
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    data: {
      activeId: store.activeId,
      plans: store.plans.map((p) => normalizePlanDays(migrateDayKeys(p))),
    },
  };
  return JSON.stringify(payload, null, 2);
}

/**
 * Import plans from a JSON text.
 * Strategies:
 *  - "append": append incoming plans (new IDs generated on conflicts) and keep current active
 *  - "replaceAll": replace entire store with incoming data
 *  - "replaceActive": replace the current active plan with the first incoming plan (others appended)
 *
 * Returns the new store object.
 */
export function importRegimenJSON(jsonText, strategy = "append") {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON.");
  }
  const incoming = parsed?.data;
  if (!incoming || !Array.isArray(incoming.plans)) {
    throw new Error("JSON missing data.plans array.");
  }

  // normalize/migrate incoming plans
  let incomingPlans = incoming.plans.map((p) => {
    const copy = { ...p };
    // Ensure id
    if (!copy.id || typeof copy.id !== "string") {
      copy.id = `plan_${Math.random().toString(36).slice(2, 9)}`;
    }
    return migrateDayKeys(copy);
  });

  const current = readStore();

  // ensure IDs unique
  const existingIds = new Set(current.plans.map((p) => p.id));
  incomingPlans = incomingPlans.map((p) => {
    if (existingIds.has(p.id)) {
      return { ...p, id: `plan_${Math.random().toString(36).slice(2, 9)}` };
    }
    return p;
  });

  if (strategy === "replaceAll") {
    const next = {
      activeId: incoming.activeId && incomingPlans.find((p) => p.id === incoming.activeId)
        ? incoming.activeId
        : incomingPlans[0]?.id,
      plans: incomingPlans,
    };
    return writeStore(next);
  }

  if (strategy === "replaceActive") {
    const first = incomingPlans[0] || DEFAULT_PLAN();
    const replaced = current.plans.map((p) => (p.id === current.activeId ? first : p));
    // If active wasn't found (shouldn't happen), prepend
    const hasActive = replaced.some((p) => p.id === first.id);
    const plans = hasActive ? [...replaced, ...incomingPlans.slice(1)] : [first, ...current.plans, ...incomingPlans.slice(1)];
    const next = { activeId: first.id, plans };
    return writeStore(next);
  }

  // default: append
  const next = {
    activeId: current.activeId,
    plans: [...current.plans, ...incomingPlans],
  };
  return writeStore(next);
}
