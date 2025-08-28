/* src/utils/regimen.js */

const STORAGE_KEY = "gitfit_regimen";
const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const now = () => Date.now();
const normalizeDay = (d) => {
  if (!d) return null;
  const v = String(d).trim().toLowerCase().slice(0, 3);
  return DAYS.includes(v) ? v : null;
};

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return (parsed && typeof parsed === "object") ? parsed : null;
  } catch {
    return null;
  }
}
function writeRaw(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  return obj;
}

function makeEmptyPlan(name = "My Plan") {
  return {
    id: `plan_${Math.random().toString(36).slice(2, 9)}`,
    name,
    items: [],
    createdAt: now(),
    updatedAt: now(),
  };
}

function migrateIfNeeded() {
  const data = readRaw();

  // First run: create an initial multi-plan doc
  if (!data) {
    const p = makeEmptyPlan("My Plan");
    return writeRaw({ currentId: p.id, plans: [p] });
  }

  // Already multi-plan
  if (Array.isArray(data.plans)) {
    if (!data.currentId || !data.plans.find(p => p.id === data.currentId)) {
      data.currentId = data.plans[0]?.id || makeEmptyPlan("My Plan").id;
      if (!data.plans.length) data.plans.push(makeEmptyPlan("My Plan"));
      writeRaw(data);
    }
    return data;
  }

  // Legacy single-plan: { items: [...] }
  if (Array.isArray(data.items)) {
    const p = makeEmptyPlan("My Plan");
    p.items = data.items;
    p.updatedAt = now();
    return writeRaw({ currentId: p.id, plans: [p] });
  }

  // Anything else: reset to a clean multi-plan
  const p = makeEmptyPlan("My Plan");
  return writeRaw({ currentId: p.id, plans: [p] });
}

function root() {
  const r = migrateIfNeeded();
  return r || migrateIfNeeded();
}

function getCurrentPlanObj() {
  const r = root();
  const plan = r.plans.find(p => p.id === r.currentId) || r.plans[0];
  if (!plan) {
    const p = makeEmptyPlan("My Plan");
    r.plans = [p];
    r.currentId = p.id;
    writeRaw(r);
    return p;
  }
  return plan;
}

function savePlanObj(plan) {
  const r = root();
  const idx = r.plans.findIndex(p => p.id === plan.id);
  if (idx === -1) r.plans.push(plan); else r.plans[idx] = plan;
  plan.updatedAt = now();
  writeRaw(r);
  return plan;
}

// ===== Public API =====
export function makeKey(slug, id) {
  return `${slug}:${id}`;
}

export function listPlans() {
  const r = root();
  const arr = Array.isArray(r.plans) ? r.plans : [];
  return arr.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}
export function getCurrentPlanId() {
  const r = root();
  return r.currentId || (r.plans[0]?.id ?? null);
}
export function getCurrentPlanName() {
  return getCurrentPlanObj().name || "My Plan";
}
export function switchPlan(planId) {
  const r = root();
  if (r.plans.some(p => p.id === planId)) {
    r.currentId = planId;
    writeRaw(r);
  }
  return getCurrentPlanObj();
}
export function createPlan(name = "New Plan") {
  const r = root();
  const p = makeEmptyPlan(name || "New Plan");
  r.plans.push(p);
  r.currentId = p.id;
  writeRaw(r);
  return p;
}
export function duplicateCurrentPlan(newName = "Copy of Plan") {
  const r = root();
  const curr = getCurrentPlanObj();
  const copy = makeEmptyPlan(newName || `Copy of ${curr.name}`);
  copy.items = (curr.items || []).map(it => ({ ...it }));
  r.plans.push(copy);
  r.currentId = copy.id;
  writeRaw(r);
  return copy;
}
export function renamePlan(planId, newName) {
  const r = root();
  const idx = r.plans.findIndex(p => p.id === planId);
  if (idx !== -1) {
    r.plans[idx].name = newName || r.plans[idx].name;
    r.plans[idx].updatedAt = now();
    writeRaw(r);
    return r.plans[idx];
  }
  return null;
}
export function deletePlan(planId) {
  const r = root();
  const next = (r.plans || []).filter(p => p.id !== planId);
  if (!next.length) {
    const p = makeEmptyPlan("My Plan");
    r.plans = [p];
    r.currentId = p.id;
  } else {
    r.plans = next;
    if (!r.plans.find(p => p.id === r.currentId)) {
      r.currentId = r.plans[0].id;
    }
  }
  writeRaw(r);
  return getCurrentPlanObj();
}

export function listItems() {
  return getCurrentPlanObj().items || [];
}
export function isInRegimen(key) {
  return listItems().some(it => it.key === key);
}
export function addToRegimen({ slug, id, name, category, day = null }) {
  const key = makeKey(slug, id);
  const plan = getCurrentPlanObj();
  plan.items = Array.isArray(plan.items) ? plan.items : [];
  if (plan.items.some(it => it.key === key)) return plan.items;
  plan.items.push({
    key, slug, id, name, category,
    day: normalizeDay(day), addedAt: now(),
  });
  savePlanObj(plan);
  return plan.items;
}
export function removeFromRegimen(key) {
  const plan = getCurrentPlanObj();
  plan.items = (plan.items || []).filter(it => it.key !== key);
  savePlanObj(plan);
  return plan.items;
}
export function toggleInRegimen({ slug, id, name, category, day = null }) {
  const key = makeKey(slug, id);
  return isInRegimen(key)
    ? removeFromRegimen(key)
    : addToRegimen({ slug, id, name, category, day });
}
export function assignDay(key, day) {
  const plan = getCurrentPlanObj();
  const idx = (plan.items || []).findIndex(it => it.key === key);
  if (idx !== -1) {
    plan.items[idx].day = normalizeDay(day);
    savePlanObj(plan);
  }
  return plan.items || [];
}
export function clearRegimen() {
  const plan = getCurrentPlanObj();
  plan.items = [];
  savePlanObj(plan);
  return [];
}
export function listByDay() {
  const out = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [], unassigned: [] };
  for (const it of listItems()) {
    const d = normalizeDay(it.day);
    if (d) out[d].push(it); else out.unassigned.push(it);
  }
  return out;
}
