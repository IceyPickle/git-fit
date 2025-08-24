/* src/utils/tips.js */

// Basic difficulty cues to append when useful
const DIFF_TIPS = {
  Beginner: [
    "Use a weight/variation that lets you keep perfect form.",
    "Control each rep; avoid rushing.",
  ],
  Intermediate: [
    "Track rest times (60–90s for hypertrophy; 2–3 min for strength).",
    "Use a controlled negative (2–3s) for better tension.",
  ],
  Advanced: [
    "Avoid form breakdown near failure; stop 1–2 reps before technique slips.",
    "Use pauses/tempos sparingly to attack weak points.",
  ],
};

// Category-specific defaults
const CATEGORY_TIPS = {
  abs: [
    "Keep your lower back lightly pressed into the floor when applicable.",
    "Exhale during the hardest part; brace the core throughout.",
  ],
  legs: [
    "Knees track over toes; drive through mid-foot or heel.",
    "Brace your core before each rep; maintain a neutral spine.",
  ],
  chest: [
    "Retract and depress your shoulder blades to protect shoulders.",
    "Press through a full range with control; avoid flaring elbows too wide.",
  ],
  back: [
    "Lead with elbows, not hands; squeeze shoulder blades together.",
    "Keep a neutral spine; avoid shrugging during pulls/rows.",
  ],
  biceps: [
    "Keep elbows close to your sides; avoid swinging the torso.",
    "Full extension at the bottom; squeeze hard at the top.",
  ],
  triceps: [
    "Keep elbows tucked; minimize shoulder movement.",
    "Lock out under control; avoid snapping the joint.",
  ],
  cardio: [
    "Build intensity gradually; keep breathing rhythm steady.",
    "Posture tall; relax shoulders and jaw.",
  ],
  forearms: [
    "Use smooth tempo; avoid jerking the wrist.",
    "Grip the handle evenly; keep wrist neutral unless targeted.",
  ],
  powerlifting: [
    "Big breath and 360° brace before each rep.",
    "Bar path over mid-foot; maintain tightness throughout.",
  ],
  calisthenics: [
    "Maintain hollow body tension; ribs down, glutes engaged.",
    "Progress gradually; own easier variations before advancing.",
  ],
};

// Equipment-based nudges
const EQUIP_HINTS = [
  { match: /barbell/i, tips: ["Set your feet, squeeze the bar, and keep wrists stacked over elbows."] },
  { match: /dumbbell|db/i, tips: ["Control the negative; match both arms’ speed and range."] },
  { match: /cable|machine/i, tips: ["Use constant tension; avoid bottoming out the stack."] },
  { match: /pull-?up bar|rings?/i, tips: ["Start from an active hang; avoid uncontrolled kipping for strength work."] },
  { match: /treadmill|bike|rower|elliptical|stair/i, tips: ["Pace yourself; use intervals to manage intensity."] },
];

export function getDefaultTips(exercise, slug) {
  const out = [];

  // Category defaults
  const base = CATEGORY_TIPS[slug] || [];
  out.push(...base);

  // Equipment hints
  for (const rule of EQUIP_HINTS) {
    if (rule.match.test(exercise.equipment || "")) {
      out.push(...rule.tips);
    }
  }

  // Difficulty suggestions
  const d = DIFF_TIPS[exercise.difficulty];
  if (d) out.push(...d);

  // De-dupe while preserving order
  return Array.from(new Set(out));
}

/**
 * Final tips to render: prefer exercise.tips; otherwise compute defaults.
 */
export function getTipsForExercise(exercise, slug) {
  if (Array.isArray(exercise.tips) && exercise.tips.length > 0) {
    return exercise.tips;
  }
  return getDefaultTips(exercise, slug);
}
