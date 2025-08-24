/* src/data/exercise.js */

// Categories shown on the grid
export const CATEGORY_LIST = [
  { slug: "abs",      name: "Abs",      emoji: "💪" },
  { slug: "legs",     name: "Legs",     emoji: "🏃" },
  { slug: "chest",    name: "Chest",    emoji: "🏋️" },
  { slug: "back",     name: "Back",     emoji: "🧱" },
  { slug: "biceps",   name: "Biceps",   emoji: "🦾" },
  { slug: "triceps",  name: "Triceps",  emoji: "✋" },
  { slug: "cardio",   name: "Cardio",   emoji: "❤️" },
  { slug: "forearms", name: "Forearms", emoji: "✊" },
  { slug: "powerlifting",  name: "Powerlifting",  emoji: "🏆" },
  { slug: "calisthenics",  name: "Calisthenics",  emoji: "🤸" },
];

// 10 exercises per category (expand/modify anytime)
export const EXERCISES_BY_CATEGORY = {
  abs: [
    { id: "crunch", name: "Crunches", difficulty: "Beginner", muscles: ["Abs"], equipment: "None", description: "Classic floor crunch. Keep lower back lightly pressed into the floor." },
    { id: "plank", name: "Plank", difficulty: "Beginner", muscles: ["Abs","Core"], equipment: "None", description: "Maintain a straight line from head to heels; don’t let hips sag." },
    { id: "hanging-leg-raise", name: "Hanging Leg Raise", difficulty: "Intermediate", muscles: ["Abs","Hip Flexors"], equipment: "Pull-up bar", description: "Control the swing; lift with the abs, not momentum." },
    { id: "cable-crunch", name: "Cable Crunch", difficulty: "Intermediate", muscles: ["Abs"], equipment: "Cable machine", description: "Flex spine down toward knees; keep hips stacked." },
    { id: "bicycle-crunch", name: "Bicycle Crunch", difficulty: "Beginner", muscles: ["Abs","Obliques"], equipment: "None", description: "Slow and controlled; rotate through the torso, not the elbows." },
    { id: "ab-wheel", name: "Ab Wheel Rollout", difficulty: "Advanced", muscles: ["Abs","Core"], equipment: "Ab wheel", description: "Brace hard; only roll as far as you can maintain a neutral spine." },
    { id: "reverse-crunch", name: "Reverse Crunch", difficulty: "Beginner", muscles: ["Lower Abs"], equipment: "None", description: "Lift pelvis off the floor by curling, not swinging legs." },
    { id: "dead-bug", name: "Dead Bug", difficulty: "Beginner", muscles: ["Core"], equipment: "None", description: "Keep low back pressed down; move opposite arm/leg slowly." },
    { id: "mountain-climber", name: "Mountain Climber", difficulty: "Beginner", muscles: ["Core","Cardio"], equipment: "None", description: "Drive knees under hips while keeping shoulders over wrists." },
    { id: "side-plank", name: "Side Plank", difficulty: "Beginner", muscles: ["Obliques","Core"], equipment: "None", description: "Hips tall; body in one line from shoulders to heels." },
  ],

  legs: [
    { id: "back-squat", name: "Back Squat", difficulty: "Intermediate", muscles: ["Quads","Glutes","Hamstrings"], equipment: "Barbell", description: "Brace your core, chest proud; squat to depth with control." },
    { id: "front-squat", name: "Front Squat", difficulty: "Intermediate", muscles: ["Quads","Core"], equipment: "Barbell", description: "Elbows high; keep torso upright and heels down." },
    { id: "walking-lunge", name: "Walking Lunge", difficulty: "Beginner", muscles: ["Quads","Glutes"], equipment: "Dumbbells (optional)", description: "Step long enough to keep front knee behind toes; drive through heel." },
    { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", difficulty: "Intermediate", muscles: ["Quads","Glutes"], equipment: "Bench + DBs (optional)", description: "Rear foot elevated; keep torso slightly forward for balance." },
    { id: "rdl", name: "Romanian Deadlift", difficulty: "Intermediate", muscles: ["Hamstrings","Glutes"], equipment: "Barbell/Dumbbells", description: "Hinge at hips with neutral spine; feel hamstring stretch." },
    { id: "leg-press", name: "Leg Press", difficulty: "Beginner", muscles: ["Quads","Glutes"], equipment: "Machine", description: "Lower to ~90° knee bend; don’t lock out harshly." },
    { id: "calf-raise-stand", name: "Standing Calf Raise", difficulty: "Beginner", muscles: ["Calves"], equipment: "Machine/DBs", description: "Full stretch at bottom, full squeeze at top." },
    { id: "goblet-squat", name: "Goblet Squat", difficulty: "Beginner", muscles: ["Quads","Glutes","Core"], equipment: "Dumbbell/Kettlebell", description: "Hold weight at chest; sit between heels." },
    { id: "hip-thrust", name: "Barbell Hip Thrust", difficulty: "Intermediate", muscles: ["Glutes","Hamstrings"], equipment: "Barbell + Bench", description: "Chin tucked; drive hips up and squeeze glutes hard." },
    { id: "step-up", name: "Step-Up", difficulty: "Beginner", muscles: ["Quads","Glutes"], equipment: "Bench/Box + DBs (optional)", description: "Drive through entire foot on the box; control the descent." },
  ],

  chest: [
    { id: "bench-press", name: "Barbell Bench Press", difficulty: "Intermediate", muscles: ["Chest","Triceps","Shoulders"], equipment: "Barbell", description: "Scapulae retracted; lower to mid-chest with wrists stacked." },
    { id: "incline-db-press", name: "Incline Dumbbell Press", difficulty: "Intermediate", muscles: ["Upper Chest","Triceps"], equipment: "Dumbbells + Bench", description: "Press up and slightly in; control the negative." },
    { id: "pushup", name: "Push-Up", difficulty: "Beginner", muscles: ["Chest","Triceps","Core"], equipment: "None", description: "Body in straight line; chest close to floor each rep." },
    { id: "db-fly", name: "Dumbbell Chest Fly", difficulty: "Intermediate", muscles: ["Chest"], equipment: "Dumbbells + Bench", description: "Soft elbows; open wide with stretch, squeeze together." },
    { id: "dip-forward", name: "Chest Dips (Forward Lean)", difficulty: "Intermediate", muscles: ["Chest","Triceps"], equipment: "Dip bars", description: "Lean forward to bias chest; control depth." },
    { id: "cable-crossover", name: "Cable Crossover", difficulty: "Intermediate", muscles: ["Chest"], equipment: "Cable machine", description: "Cross hands slightly at bottom for peak contraction." },
    { id: "decline-bench", name: "Decline Bench Press", difficulty: "Intermediate", muscles: ["Lower Chest","Triceps"], equipment: "Barbell", description: "Bar path slightly lower on chest; keep shoulder blades set." },
    { id: "incline-pushup", name: "Incline Push-Up", difficulty: "Beginner", muscles: ["Chest","Triceps"], equipment: "Bench/Box", description: "Easier variation; same rigid body line." },
    { id: "machine-press", name: "Machine Chest Press", difficulty: "Beginner", muscles: ["Chest","Triceps"], equipment: "Machine", description: "Adjust seat so handles align with mid-chest." },
    { id: "squeeze-press", name: "DB Squeeze Press", difficulty: "Intermediate", muscles: ["Chest","Triceps"], equipment: "Dumbbells", description: "Press DBs together throughout to increase chest activation." },
  ],

  back: [
    { id: "pullup", name: "Pull-Up", difficulty: "Intermediate", muscles: ["Lats","Upper Back","Biceps"], equipment: "Pull-up bar", description: "Full hang start; pull chest toward bar; avoid kipping for strength." },
    { id: "lat-pulldown", name: "Lat Pulldown", difficulty: "Beginner", muscles: ["Lats"], equipment: "Cable machine", description: "Lead with elbows; pull to upper chest, control return." },
    { id: "barbell-row", name: "Barbell Row", difficulty: "Intermediate", muscles: ["Lats","Mid-Back"], equipment: "Barbell", description: "Hinge ~45°; pull to lower ribs; keep spine neutral." },
    { id: "seated-cable-row", name: "Seated Cable Row", difficulty: "Beginner", muscles: ["Mid-Back","Lats"], equipment: "Cable machine", description: "Chest up; pull handles to torso; avoid shrugging." },
    { id: "one-arm-db-row", name: "One-Arm DB Row", difficulty: "Beginner", muscles: ["Lats","Mid-Back"], equipment: "Dumbbell + Bench", description: "Drive elbow back; keep shoulders square." },
    { id: "deadlift", name: "Conventional Deadlift", difficulty: "Advanced", muscles: ["Posterior Chain","Back"], equipment: "Barbell", description: "Bar close to shins; brace; push floor away; lock out tall." },
    { id: "face-pull", name: "Face Pull", difficulty: "Beginner", muscles: ["Rear Delts","Upper Back"], equipment: "Cable + Rope", description: "Pull to nose/forehead level; externally rotate at end." },
    { id: "straight-arm-pd", name: "Straight-Arm Pulldown", difficulty: "Beginner", muscles: ["Lats"], equipment: "Cable", description: "Arms straight; sweep bar down using lats, not elbows." },
    { id: "t-bar-row", name: "T-Bar Row", difficulty: "Intermediate", muscles: ["Lats","Mid-Back"], equipment: "T-bar or Landmine", description: "Neutral spine; row to lower chest/upper abs." },
    { id: "inverted-row", name: "Inverted Row", difficulty: "Beginner", muscles: ["Upper Back","Lats"], equipment: "Bar + Rack/TRX", description: "Body straight; pull chest to bar; adjust foot position for difficulty." },
  ],

  biceps: [
    { id: "db-curl", name: "Dumbbell Curl", difficulty: "Beginner", muscles: ["Biceps"], equipment: "Dumbbells", description: "Elbows near sides; avoid swinging." },
    { id: "ez-bar-curl", name: "EZ-Bar Curl", difficulty: "Intermediate", muscles: ["Biceps"], equipment: "EZ bar", description: "Grip angle comfortable; full flexion and extension." },
    { id: "hammer-curl", name: "Hammer Curl", difficulty: "Beginner", muscles: ["Brachialis","Biceps"], equipment: "Dumbbells", description: "Neutral grip to hit brachialis and forearms." },
    { id: "incline-db-curl", name: "Incline DB Curl", difficulty: "Intermediate", muscles: ["Biceps (long head)"], equipment: "Dumbbells + Incline bench", description: "Shoulders back; deep stretch at bottom." },
    { id: "concentration-curl", name: "Concentration Curl", difficulty: "Beginner", muscles: ["Biceps"], equipment: "Dumbbell", description: "Elbow braced against inner thigh; strict form." },
    { id: "preacher-curl", name: "Preacher Curl", difficulty: "Intermediate", muscles: ["Biceps"], equipment: "Preacher bench + Bar/DB", description: "Avoid bottom bounce; steady tempo." },
    { id: "cable-curl", name: "Cable Curl", difficulty: "Beginner", muscles: ["Biceps"], equipment: "Cable", description: "Constant tension; don’t let elbows drift forward." },
    { id: "reverse-curl", name: "Reverse Curl", difficulty: "Beginner", muscles: ["Brachioradialis","Forearms","Biceps"], equipment: "Bar/EZ bar", description: "Overhand grip biases forearms and brachioradialis." },
    { id: "drag-curl", name: "Drag Curl", difficulty: "Intermediate", muscles: ["Biceps"], equipment: "Barbell/EZ bar", description: "Bar drags along torso; elbows move back." },
    { id: "chin-up", name: "Chin-Up (Close Grip)", difficulty: "Intermediate", muscles: ["Biceps","Lats"], equipment: "Pull-up bar", description: "Supinated grip; drive elbows down; chest to bar if possible." },
  ],

  triceps: [
    { id: "pushdown", name: "Cable Pushdown", difficulty: "Beginner", muscles: ["Triceps"], equipment: "Cable", description: "Elbows tucked; extend fully without shoulder movement." },
    { id: "skullcrusher", name: "EZ-Bar Skullcrusher", difficulty: "Intermediate", muscles: ["Triceps"], equipment: "EZ bar", description: "Lower to forehead; keep elbows from flaring." },
    { id: "close-grip-bench", name: "Close-Grip Bench Press", difficulty: "Intermediate", muscles: ["Triceps","Chest"], equipment: "Barbell", description: "Hands just inside shoulder width; elbows tucked." },
    { id: "oh-db-ext", name: "Overhead DB Extension", difficulty: "Beginner", muscles: ["Triceps (long head)"], equipment: "Dumbbell", description: "Keep elbows tight; full stretch overhead." },
    { id: "upright-dip", name: "Triceps Dips (Upright)", difficulty: "Intermediate", muscles: ["Triceps"], equipment: "Dip bars", description: "Stay upright to bias triceps more than chest." },
    { id: "rope-oh-ext", name: "Cable Overhead Rope Ext", difficulty: "Intermediate", muscles: ["Triceps (long head)"], equipment: "Cable + Rope", description: "Lean forward slightly; stretch and extend fully." },
    { id: "bench-dips", name: "Bench Dips", difficulty: "Beginner", muscles: ["Triceps"], equipment: "Bench/Box", description: "Feet out for harder; keep shoulders down and away from ears." },
    { id: "kickback", name: "DB Kickback", difficulty: "Beginner", muscles: ["Triceps"], equipment: "Dumbbell", description: "Upper arm parallel to floor; extend until straight." },
    { id: "diamond-pushup", name: "Diamond Push-Up", difficulty: "Beginner", muscles: ["Triceps","Chest"], equipment: "None", description: "Hands close together under chest; elbows tucked." },
    { id: "crossbody-ext", name: "Cross-Body Cable Extension", difficulty: "Intermediate", muscles: ["Triceps"], equipment: "Cable", description: "Pull down and across body; keep shoulder quiet." },
  ],

  cardio: [
    { id: "treadmill-run", name: "Treadmill Run", difficulty: "Beginner", muscles: ["Cardio"], equipment: "Treadmill", description: "Start easy pace; build gradually; focus on posture." },
    { id: "rower", name: "Rowing Machine", difficulty: "Beginner", muscles: ["Cardio","Back","Legs"], equipment: "Rower", description: "Drive legs, swing back slightly, then pull; reverse to return." },
    { id: "bike", name: "Stationary Bike", difficulty: "Beginner", muscles: ["Cardio","Legs"], equipment: "Bike", description: "Maintain smooth cadence; adjust resistance to target zone." },
    { id: "jump-rope", name: "Jump Rope", difficulty: "Beginner", muscles: ["Cardio","Calves"], equipment: "Rope", description: "Small hops; wrists do most of the work." },
    { id: "stair-climber", name: "Stair Climber", difficulty: "Beginner", muscles: ["Cardio","Legs"], equipment: "Machine", description: "Stand tall; steady pace; light hand support if needed." },
    { id: "hiit-sprints", name: "HIIT Sprints (Track)", difficulty: "Advanced", muscles: ["Cardio","Full Body"], equipment: "Track/Field", description: "Short sprints with full rest; quality over quantity." },
    { id: "incline-walk", name: "Incline Treadmill Walk", difficulty: "Beginner", muscles: ["Cardio","Glutes","Calves"], equipment: "Treadmill", description: "Set incline 5–12%; steady breathing." },
    { id: "elliptical", name: "Elliptical Trainer", difficulty: "Beginner", muscles: ["Cardio"], equipment: "Elliptical", description: "Low impact; vary resistance and cadence intervals." },
    { id: "swim", name: "Swimming Laps", difficulty: "Intermediate", muscles: ["Cardio","Full Body"], equipment: "Pool", description: "Alternate strokes; focus on breathing rhythm." },
    { id: "shadow-box", name: "Shadow Boxing", difficulty: "Beginner", muscles: ["Cardio","Upper Body","Core"], equipment: "None", description: "Light combos with footwork; keep guard up and core braced." },
  ],

  forearms: [
    { id: "farmers-carry", name: "Farmer’s Carry", difficulty: "Beginner", muscles: ["Forearms","Grip","Core"], equipment: "DBs/Kettlebells", description: "Walk tall with heavy weights; don’t let shoulders slump." },
    { id: "wrist-curl", name: "Wrist Curl", difficulty: "Beginner", muscles: ["Forearms (flexors)"], equipment: "DB/Barbell", description: "Slow control; full wrist flexion/extension." },
    { id: "rev-wrist-curl", name: "Reverse Wrist Curl", difficulty: "Beginner", muscles: ["Forearms (extensors)"], equipment: "DB/Barbell", description: "Light load; smooth tempo." },
    { id: "plate-pinch", name: "Plate Pinch Hold", difficulty: "Intermediate", muscles: ["Grip","Forearms"], equipment: "Plates", description: "Pinch two plates smooth-sides-out; hold for time." },
    { id: "towel-pullup-hang", name: "Towel Pull-Up Hang", difficulty: "Advanced", muscles: ["Grip","Forearms"], equipment: "Towel + Bar", description: "Hang from towels; keep shoulders packed." },
    { id: "rack-hold", name: "Heavy Rack Hold", difficulty: "Intermediate", muscles: ["Grip","Forearms"], equipment: "Barbell + Rack", description: "Stand tall; hold heavy bar for time just off the pins." },
    { id: "grippers", name: "Captains of Crush / Grippers", difficulty: "Beginner", muscles: ["Grip"], equipment: "Gripper", description: "Multiple sets of 5–10 controlled closes each hand." },
    { id: "hammer-rotation", name: "Hammer Rotations (Pro/Sup)", difficulty: "Beginner", muscles: ["Forearms","Wrist Rotators"], equipment: "Hammer/DB", description: "Rotate through pronation/supination with control." },
    { id: "bar-hang", name: "Dead Hang", difficulty: "Beginner", muscles: ["Grip","Shoulders"], equipment: "Pull-up bar", description: "Hang with active shoulders; build duration over time." },
    { id: "rice-bucket", name: "Rice Bucket Drill", difficulty: "Beginner", muscles: ["Forearms","Hands"], equipment: "Bucket + Rice", description: "Open/close/rotate hands in rice for endurance." },
  ],

  powerlifting: [
  { id: "pl-back-squat", name: "Back Squat", difficulty: "Intermediate", muscles: ["Quads","Glutes","Hamstrings"], equipment: "Barbell + Rack", description: "Brace hard, hit depth, drive up through mid-foot." },
  { id: "pl-bench", name: "Competition Bench Press", difficulty: "Intermediate", muscles: ["Chest","Triceps","Shoulders"], equipment: "Barbell + Bench + Rack", description: "Set arch, scapulae retracted, pause on chest in comp rules." },
  { id: "pl-deadlift", name: "Conventional Deadlift", difficulty: "Advanced", muscles: ["Posterior Chain","Back"], equipment: "Barbell", description: "Bar close, brace, push floor away; lock out strong." },
  { id: "pl-pause-squat", name: "Pause Squat", difficulty: "Intermediate", muscles: ["Quads","Glutes","Core"], equipment: "Barbell + Rack", description: "1–2s pause at depth; kills bounce, builds tightness/control." },
  { id: "pl-tempo-bench", name: "Tempo Bench (3-1-1)", difficulty: "Intermediate", muscles: ["Chest","Triceps"], equipment: "Barbell", description: "3s eccentric, 1s pause, smooth press for bar path discipline." },
  { id: "pl-deficit-deadlift", name: "Deficit Deadlift", difficulty: "Advanced", muscles: ["Posterior Chain"], equipment: "Barbell + 1–2\" Deficit", description: "Starts lower; increases ROM and off-floor strength." },
  { id: "pl-ohp", name: "Overhead Press", difficulty: "Intermediate", muscles: ["Delts","Triceps","Core"], equipment: "Barbell", description: "Strict press; ribs down; squeeze glutes; no layback." },
  { id: "pl-row", name: "Barbell Row (Strict)", difficulty: "Intermediate", muscles: ["Lats","Mid-Back"], equipment: "Barbell", description: "Hinge ~45°; pull to lower ribs; no torso heave." },
  { id: "pl-gm", name: "Good Morning", difficulty: "Intermediate", muscles: ["Hamstrings","Glutes","Spinal Erectors"], equipment: "Barbell", description: "Soft knees; hip hinge; neutral spine throughout." },
  { id: "pl-hip-thrust", name: "Barbell Hip Thrust", difficulty: "Intermediate", muscles: ["Glutes","Hamstrings"], equipment: "Barbell + Bench", description: "Full hip lockout; chin tucked; posterior pelvic tilt at top." },
],

calisthenics: [
  { id: "cal-pushup", name: "Push-Up", difficulty: "Beginner", muscles: ["Chest","Triceps","Core"], equipment: "None", description: "Rigid plank body; chest near floor; full lockout." },
  { id: "cal-pullup", name: "Pull-Up", difficulty: "Intermediate", muscles: ["Lats","Biceps","Upper Back"], equipment: "Bar", description: "Dead hang start; pull chest toward bar; avoid kipping for strength." },
  { id: "cal-dip", name: "Bar Dips", difficulty: "Intermediate", muscles: ["Triceps","Chest"], equipment: "Dip Bars", description: "Shoulders down/back; full lockout; lean changes emphasis." },
  { id: "cal-pike-pushup", name: "Pike Push-Up", difficulty: "Intermediate", muscles: ["Shoulders","Triceps","Core"], equipment: "None", description: "Hips high; head to triangle between hands; vertical press pattern." },
  { id: "cal-lsit", name: "L-Sit Hold", difficulty: "Advanced", muscles: ["Core","Hip Flexors","Triceps"], equipment: "Parallettes/Floor", description: "Locked knees; toes pointed; shoulders depressed; hollow body." },
  { id: "cal-pistol", name: "Pistol Squat", difficulty: "Advanced", muscles: ["Quads","Glutes","Core"], equipment: "None", description: "Single-leg; counterbalance with arms; control descent; heel loaded." },
  { id: "cal-row", name: "Australian Row (Inverted)", difficulty: "Beginner", muscles: ["Upper Back","Lats","Biceps"], equipment: "Low Bar/TRX", description: "Body straight; pull chest to bar; adjust foot position for difficulty." },
  { id: "cal-handstand", name: "Wall Handstand Hold", difficulty: "Intermediate", muscles: ["Shoulders","Triceps","Core"], equipment: "Wall", description: "Stacked line; ribs down; active shoulders; small holds, frequent." },
  { id: "cal-hollow", name: "Hollow Body Hold", difficulty: "Beginner", muscles: ["Core"], equipment: "None", description: "Lower back pressed down; shoulders/feet off floor; breathe shallow." },
  { id: "cal-muscleup", name: "Strict Muscle-Up (Progression)", difficulty: "Advanced", muscles: ["Lats","Biceps","Triceps","Core"], equipment: "Rings/Bar", description: "False grip + transition drills; strict reps over kipping." },
],

};

// --- Sorting helpers ---

const DIFFICULTY_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 };

/** Return a *sorted copy* of a category's exercises (Beginner → Intermediate → Advanced). */
export function getExercises(slug) {
  const list = EXERCISES_BY_CATEGORY[slug] || [];
  return [...list].sort((a, b) => {
    const da = DIFFICULTY_ORDER[a.difficulty] ?? 99;
    const db = DIFFICULTY_ORDER[b.difficulty] ?? 99;
    if (da !== db) return da - db;
    // stable-ish tie-breaker: alphabetical by name
    return a.name.localeCompare(b.name);
  });
}

/** Optional: get all categories with their lists sorted (useful for bulk ops) */
export const EXERCISES_BY_CATEGORY_SORTED = Object.fromEntries(
  Object.entries(EXERCISES_BY_CATEGORY).map(([slug, arr]) => [
    slug,
    [...arr].sort((a, b) => {
      const da = DIFFICULTY_ORDER[a.difficulty] ?? 99;
      const db = DIFFICULTY_ORDER[b.difficulty] ?? 99;
      if (da !== db) return da - db;
      return a.name.localeCompare(b.name);
    }),
  ])
);
