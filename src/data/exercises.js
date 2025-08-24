/* src/data/exercise.js */

// Categories shown on the grid
export const CATEGORY_LIST = [
  { slug: "abs",      name: "Abs",      emoji: "💪" },
  { slug: "legs",     name: "Legs",     emoji: "🏃" },
  { slug: "chest",    name: "Chest",    emoji: "🏋️" },
  { slug: "back",     name: "Back",     emoji: "🦍" },
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
  { 
    id: "crunch", 
    name: "Crunches", 
    difficulty: "Beginner", 
    muscles: ["Abs"], 
    equipment: "None", 
    description: "Classic floor crunch. Keep lower back lightly pressed into the floor.",
    tips: [
      "Keep your lower back flat against the floor.",
      "Exhale as you lift your shoulders up.",
      "Lead with your chest, not your neck."
    ]
  },
  { 
    id: "plank", 
    name: "Plank", 
    difficulty: "Beginner", 
    muscles: ["Abs","Core"], 
    equipment: "None", 
    description: "Maintain a straight line from head to heels; don’t let hips sag.",
    tips: [
      "Keep shoulders stacked over elbows.",
      "Engage glutes and abs to avoid sagging.",
      "Breathe steadily; don’t hold your breath."
    ]
  },
  { 
    id: "hanging-leg-raise", 
    name: "Hanging Leg Raise", 
    difficulty: "Intermediate", 
    muscles: ["Abs","Hip Flexors"], 
    equipment: "Pull-up bar", 
    description: "Control the swing; lift with the abs, not momentum.",
    tips: [
      "Start from a dead hang with no swing.",
      "Raise legs under control, avoiding momentum.",
      "Keep core tight and shoulders active throughout."
    ]
  },
  { 
    id: "cable-crunch", 
    name: "Cable Crunch", 
    difficulty: "Intermediate", 
    muscles: ["Abs"], 
    equipment: "Cable machine", 
    description: "Flex spine down toward knees; keep hips stacked.",
    tips: [
      "Kneel far enough to keep constant tension on the cable.",
      "Curl spine forward, bringing elbows toward thighs.",
      "Avoid pulling with arms; initiate from the abs."
    ]
  },
  { 
    id: "bicycle-crunch", 
    name: "Bicycle Crunch", 
    difficulty: "Beginner", 
    muscles: ["Abs","Obliques"], 
    equipment: "None", 
    description: "Slow and controlled; rotate through the torso, not the elbows.",
    tips: [
      "Twist through the torso, not just the elbows.",
      "Extend each leg fully before switching.",
      "Move slowly to maintain tension."
    ]
  },
  { 
    id: "ab-wheel", 
    name: "Ab Wheel Rollout", 
    difficulty: "Advanced", 
    muscles: ["Abs","Core"], 
    equipment: "Ab wheel", 
    description: "Brace hard; only roll as far as you can maintain a neutral spine.",
    tips: [
      "Keep a hollow core to avoid arching the lower back.",
      "Roll out slowly and under control.",
      "Only extend as far as you can keep form tight."
    ]
  },
  { 
    id: "reverse-crunch", 
    name: "Reverse Crunch", 
    difficulty: "Beginner", 
    muscles: ["Lower Abs"], 
    equipment: "None", 
    description: "Lift pelvis off the floor by curling, not swinging legs.",
    tips: [
      "Lift hips by curling, not swinging legs.",
      "Keep head and shoulders relaxed.",
      "Exhale as you curl hips upward."
    ]
  },
  { 
    id: "dead-bug", 
    name: "Dead Bug", 
    difficulty: "Beginner", 
    muscles: ["Core"], 
    equipment: "None", 
    description: "Keep low back pressed down; move opposite arm/leg slowly.",
    tips: [
      "Keep lower back pressed into the floor.",
      "Move opposite arm and leg together slowly.",
      "Don’t let ribs flare as you extend."
    ]
  },
  { 
    id: "mountain-climber", 
    name: "Mountain Climber", 
    difficulty: "Beginner", 
    muscles: ["Core","Cardio"], 
    equipment: "None", 
    description: "Drive knees under hips while keeping shoulders over wrists.",
    tips: [
      "Keep shoulders stacked over wrists.",
      "Drive knees straight forward, not outward.",
      "Maintain a flat back; avoid bouncing hips."
    ]
  },
  { 
    id: "side-plank", 
    name: "Side Plank", 
    difficulty: "Beginner", 
    muscles: ["Obliques","Core"], 
    equipment: "None", 
    description: "Hips tall; body in one line from shoulders to heels.",
    tips: [
      "Stack feet and shoulders in one line.",
      "Lift hips high to keep body straight.",
      "Engage obliques, not just shoulder support."
    ]
  },
],

  legs: [
  { 
    id: "back-squat", 
    name: "Back Squat", 
    difficulty: "Intermediate", 
    muscles: ["Quads","Glutes","Hamstrings"], 
    equipment: "Barbell", 
    description: "Brace your core, chest proud; squat to depth with control.",
    tips: [
      "Brace your core before each rep to keep spine neutral.",
      "Keep knees tracking over toes as you descend.",
      "Drive up through mid-foot and stand tall without leaning forward."
    ]
  },
  { 
    id: "front-squat", 
    name: "Front Squat", 
    difficulty: "Intermediate", 
    muscles: ["Quads","Core"], 
    equipment: "Barbell", 
    description: "Elbows high; keep torso upright and heels down.",
    tips: [
      "Keep elbows lifted to maintain an upright torso.",
      "Descend until thighs are at least parallel to the floor.",
      "Push evenly through heels to return to standing."
    ]
  },
  { 
    id: "walking-lunge", 
    name: "Walking Lunge", 
    difficulty: "Beginner", 
    muscles: ["Quads","Glutes"], 
    equipment: "Dumbbells (optional)", 
    description: "Step long enough to keep front knee behind toes; drive through heel.",
    tips: [
      "Take a long enough step to keep front shin vertical.",
      "Keep torso tall; avoid leaning forward excessively.",
      "Push through the heel of the front foot as you rise."
    ]
  },
  { 
    id: "bulgarian-split-squat", 
    name: "Bulgarian Split Squat", 
    difficulty: "Intermediate", 
    muscles: ["Quads","Glutes"], 
    equipment: "Bench + DBs (optional)", 
    description: "Rear foot elevated; keep torso slightly forward for balance.",
    tips: [
      "Keep front knee in line with toes as you descend.",
      "Maintain a slight forward lean for balance and glute engagement.",
      "Lower until front thigh is nearly parallel, then drive up through heel."
    ]
  },
  { 
    id: "rdl", 
    name: "Romanian Deadlift", 
    difficulty: "Intermediate", 
    muscles: ["Hamstrings","Glutes"], 
    equipment: "Barbell/Dumbbells", 
    description: "Hinge at hips with neutral spine; feel hamstring stretch.",
    tips: [
      "Push hips back while keeping bar close to legs.",
      "Maintain a flat back and neutral spine throughout.",
      "Stop when you feel a strong hamstring stretch without rounding."
    ]
  },
  { 
    id: "leg-press", 
    name: "Leg Press", 
    difficulty: "Beginner", 
    muscles: ["Quads","Glutes"], 
    equipment: "Machine", 
    description: "Lower to ~90° knee bend; don’t lock out harshly.",
    tips: [
      "Place feet shoulder-width and flat on platform.",
      "Lower under control until knees are at ~90°.",
      "Avoid locking knees forcefully at the top."
    ]
  },
  { 
    id: "calf-raise-stand", 
    name: "Standing Calf Raise", 
    difficulty: "Beginner", 
    muscles: ["Calves"], 
    equipment: "Machine/DBs", 
    description: "Full stretch at bottom, full squeeze at top.",
    tips: [
      "Lower heel fully for a deep stretch at the bottom.",
      "Rise up onto toes and squeeze at the top.",
      "Perform reps slowly to maximize muscle activation."
    ]
  },
  { 
    id: "goblet-squat", 
    name: "Goblet Squat", 
    difficulty: "Beginner", 
    muscles: ["Quads","Glutes","Core"], 
    equipment: "Dumbbell/Kettlebell", 
    description: "Hold weight at chest; sit between heels.",
    tips: [
      "Hold the weight close to your chest to stay balanced.",
      "Squat down with elbows inside knees.",
      "Push through heels and keep chest upright."
    ]
  },
  { 
    id: "hip-thrust", 
    name: "Barbell Hip Thrust", 
    difficulty: "Intermediate", 
    muscles: ["Glutes","Hamstrings"], 
    equipment: "Barbell + Bench", 
    description: "Chin tucked; drive hips up and squeeze glutes hard.",
    tips: [
      "Rest upper back on bench and keep chin tucked.",
      "Drive through heels as you lift hips.",
      "Pause at the top and squeeze glutes before lowering."
    ]
  },
  { 
    id: "step-up", 
    name: "Step-Up", 
    difficulty: "Beginner", 
    muscles: ["Quads","Glutes"], 
    equipment: "Bench/Box + DBs (optional)", 
    description: "Drive through entire foot on the box; control the descent.",
    tips: [
      "Step fully onto the box with your whole foot.",
      "Push through heel and keep torso upright.",
      "Lower yourself slowly to control descent."
    ]
  },
],

  chest: [
  { 
    id: "bench-press", 
    name: "Barbell Bench Press", 
    difficulty: "Intermediate", 
    muscles: ["Chest","Triceps","Shoulders"], 
    equipment: "Barbell", 
    description: "Scapulae retracted; lower to mid-chest with wrists stacked.",
    tips: [
      "Keep shoulder blades pinched and pressed into the bench.",
      "Lower the bar under control to mid-chest, elbows at ~45°.",
      "Drive feet into the ground and press bar in a straight line."
    ]
  },
  { 
    id: "incline-db-press", 
    name: "Incline Dumbbell Press", 
    difficulty: "Intermediate", 
    muscles: ["Upper Chest","Triceps"], 
    equipment: "Dumbbells + Bench", 
    description: "Press up and slightly in; control the negative.",
    tips: [
      "Set bench at ~30°–45° to target the upper chest.",
      "Keep wrists stacked over elbows during the press.",
      "Bring dumbbells together slightly at the top for full contraction."
    ]
  },
  { 
    id: "pushup", 
    name: "Push-Up", 
    difficulty: "Beginner", 
    muscles: ["Chest","Triceps","Core"], 
    equipment: "None", 
    description: "Body in straight line; chest close to floor each rep.",
    tips: [
      "Keep body in one line from head to heels.",
      "Lower chest until it’s just above the floor.",
      "Keep elbows tucked at ~45° from your torso."
    ]
  },
  { 
    id: "db-fly", 
    name: "Dumbbell Chest Fly", 
    difficulty: "Intermediate", 
    muscles: ["Chest"], 
    equipment: "Dumbbells + Bench", 
    description: "Soft elbows; open wide with stretch, squeeze together.",
    tips: [
      "Keep a slight bend in elbows throughout the movement.",
      "Lower until you feel a stretch in your chest, not shoulders.",
      "Squeeze dumbbells together in a hugging motion at the top."
    ]
  },
  { 
    id: "dip-forward", 
    name: "Chest Dips (Forward Lean)", 
    difficulty: "Intermediate", 
    muscles: ["Chest","Triceps"], 
    equipment: "Dip bars", 
    description: "Lean forward to bias chest; control depth.",
    tips: [
      "Keep torso leaned forward to emphasize chest over triceps.",
      "Lower until shoulders are just below elbows.",
      "Press up explosively while keeping elbows slightly flared."
    ]
  },
  { 
    id: "cable-crossover", 
    name: "Cable Crossover", 
    difficulty: "Intermediate", 
    muscles: ["Chest"], 
    equipment: "Cable machine", 
    description: "Cross hands slightly at bottom for peak contraction.",
    tips: [
      "Keep a soft bend in elbows while moving arms in an arc.",
      "Cross hands slightly at the bottom for peak squeeze.",
      "Control the return to keep constant tension."
    ]
  },
  { 
    id: "decline-bench", 
    name: "Decline Bench Press", 
    difficulty: "Intermediate", 
    muscles: ["Lower Chest","Triceps"], 
    equipment: "Barbell", 
    description: "Bar path slightly lower on chest; keep shoulder blades set.",
    tips: [
      "Set feet securely and lock in your shoulders.",
      "Lower bar to lower chest/upper stomach area.",
      "Press bar back up in a straight line, keeping wrists stacked."
    ]
  },
  { 
    id: "incline-pushup", 
    name: "Incline Push-Up", 
    difficulty: "Beginner", 
    muscles: ["Chest","Triceps"], 
    equipment: "Bench/Box", 
    description: "Easier variation; same rigid body line.",
    tips: [
      "Keep body in a straight line from head to heels.",
      "Lower chest toward the bench with control.",
      "Push through palms, keeping elbows at ~45°."
    ]
  },
  { 
    id: "machine-press", 
    name: "Machine Chest Press", 
    difficulty: "Beginner", 
    muscles: ["Chest","Triceps"], 
    equipment: "Machine", 
    description: "Adjust seat so handles align with mid-chest.",
    tips: [
      "Adjust seat height so handles are level with mid-chest.",
      "Press straight forward without locking elbows harshly.",
      "Control the return for constant tension."
    ]
  },
  { 
    id: "squeeze-press", 
    name: "DB Squeeze Press", 
    difficulty: "Intermediate", 
    muscles: ["Chest","Triceps"], 
    equipment: "Dumbbells", 
    description: "Press DBs together throughout to increase chest activation.",
    tips: [
      "Hold dumbbells pressed together through the full motion.",
      "Lower slowly to mid-chest under control.",
      "Squeeze dumbbells hard at the top for max contraction."
    ]
  },
],


  back: [
  { 
    id: "pullup", 
    name: "Pull-Up", 
    difficulty: "Intermediate", 
    muscles: ["Lats","Upper Back","Biceps"], 
    equipment: "Pull-up bar", 
    description: "Full hang start; pull chest toward bar; avoid kipping for strength.",
    tips: [
      "Start from a dead hang with arms fully extended.",
      "Lead with your chest and drive elbows down toward your ribs.",
      "Avoid swinging or kipping; control the entire range."
    ]
  },
  { 
    id: "lat-pulldown", 
    name: "Lat Pulldown", 
    difficulty: "Beginner", 
    muscles: ["Lats"], 
    equipment: "Cable machine", 
    description: "Lead with elbows; pull to upper chest, control return.",
    tips: [
      "Grip bar slightly wider than shoulder width.",
      "Pull bar to upper chest, keeping torso upright.",
      "Control bar back up slowly without letting shoulders shrug."
    ]
  },
  { 
    id: "barbell-row", 
    name: "Barbell Row", 
    difficulty: "Intermediate", 
    muscles: ["Lats","Mid-Back"], 
    equipment: "Barbell", 
    description: "Hinge ~45°; pull to lower ribs; keep spine neutral.",
    tips: [
      "Hinge forward at hips until torso is ~45°.",
      "Keep bar close and row to lower ribs/waistline.",
      "Maintain flat back; avoid jerking weight up."
    ]
  },
  { 
    id: "seated-cable-row", 
    name: "Seated Cable Row", 
    difficulty: "Beginner", 
    muscles: ["Mid-Back","Lats"], 
    equipment: "Cable machine", 
    description: "Chest up; pull handles to torso; avoid shrugging.",
    tips: [
      "Sit tall with chest up and shoulders set back.",
      "Pull handles to mid-torso while squeezing shoulder blades.",
      "Control return and avoid letting weight stack slam."
    ]
  },
  { 
    id: "one-arm-db-row", 
    name: "One-Arm DB Row", 
    difficulty: "Beginner", 
    muscles: ["Lats","Mid-Back"], 
    equipment: "Dumbbell + Bench", 
    description: "Drive elbow back; keep shoulders square.",
    tips: [
      "Keep torso flat and shoulders square to floor.",
      "Drive elbow straight back, not out to the side.",
      "Lower dumbbell slowly until arm is fully extended."
    ]
  },
  { 
    id: "deadlift", 
    name: "Conventional Deadlift", 
    difficulty: "Advanced", 
    muscles: ["Posterior Chain","Back"], 
    equipment: "Barbell", 
    description: "Bar close to shins; brace; push floor away; lock out tall.",
    tips: [
      "Set up with bar over mid-foot and shins close.",
      "Brace core and keep back neutral before pulling.",
      "Push floor away and finish standing tall with hips locked."
    ]
  },
  { 
    id: "face-pull", 
    name: "Face Pull", 
    difficulty: "Beginner", 
    muscles: ["Rear Delts","Upper Back"], 
    equipment: "Cable + Rope", 
    description: "Pull to nose/forehead level; externally rotate at end.",
    tips: [
      "Set rope attachment at upper chest/head height.",
      "Pull rope to face while spreading handles apart.",
      "Externally rotate shoulders to finish with upper arms parallel to floor."
    ]
  },
  { 
    id: "straight-arm-pd", 
    name: "Straight-Arm Pulldown", 
    difficulty: "Beginner", 
    muscles: ["Lats"], 
    equipment: "Cable", 
    description: "Arms straight; sweep bar down using lats, not elbows.",
    tips: [
      "Keep arms straight with only a slight elbow bend.",
      "Sweep bar down in an arc toward hips using lats.",
      "Control bar upward slowly to keep tension on lats."
    ]
  },
  { 
    id: "t-bar-row", 
    name: "T-Bar Row", 
    difficulty: "Intermediate", 
    muscles: ["Lats","Mid-Back"], 
    equipment: "T-bar or Landmine", 
    description: "Neutral spine; row to lower chest/upper abs.",
    tips: [
      "Hinge forward with flat back and neutral spine.",
      "Row bar toward lower chest or upper abs.",
      "Control negative to avoid jerking weight down."
    ]
  },
  { 
    id: "inverted-row", 
    name: "Inverted Row", 
    difficulty: "Beginner", 
    muscles: ["Upper Back","Lats"], 
    equipment: "Bar + Rack/TRX", 
    description: "Body straight; pull chest to bar; adjust foot position for difficulty.",
    tips: [
      "Keep body straight from head to heels.",
      "Pull chest to bar by driving elbows back.",
      "Adjust foot position to scale difficulty."
    ]
  },
],

  biceps: [
  { 
    id: "db-curl", 
    name: "Dumbbell Curl", 
    difficulty: "Beginner", 
    muscles: ["Biceps"], 
    equipment: "Dumbbells", 
    description: "Elbows near sides; avoid swinging.",
    tips: [
      "Keep elbows tucked close to your sides.",
      "Curl dumbbells up slowly without swinging.",
      "Lower under control until arms are fully extended."
    ]
  },
  { 
    id: "ez-bar-curl", 
    name: "EZ-Bar Curl", 
    difficulty: "Intermediate", 
    muscles: ["Biceps"], 
    equipment: "EZ bar", 
    description: "Grip angle comfortable; full flexion and extension.",
    tips: [
      "Use the angled grip to reduce wrist strain.",
      "Curl bar smoothly to shoulder height.",
      "Control bar down until arms are nearly straight."
    ]
  },
  { 
    id: "hammer-curl", 
    name: "Hammer Curl", 
    difficulty: "Beginner", 
    muscles: ["Brachialis","Biceps"], 
    equipment: "Dumbbells", 
    description: "Neutral grip to hit brachialis and forearms.",
    tips: [
      "Hold dumbbells with palms facing each other.",
      "Curl straight up without rotating wrists.",
      "Squeeze at the top before lowering slowly."
    ]
  },
  { 
    id: "incline-db-curl", 
    name: "Incline DB Curl", 
    difficulty: "Intermediate", 
    muscles: ["Biceps (long head)"], 
    equipment: "Dumbbells + Incline bench", 
    description: "Shoulders back; deep stretch at bottom.",
    tips: [
      "Keep shoulders pinned to bench for isolation.",
      "Let arms fully stretch at the bottom for long head emphasis.",
      "Curl slowly and avoid swinging elbows forward."
    ]
  },
  { 
    id: "concentration-curl", 
    name: "Concentration Curl", 
    difficulty: "Beginner", 
    muscles: ["Biceps"], 
    equipment: "Dumbbell", 
    description: "Elbow braced against inner thigh; strict form.",
    tips: [
      "Brace elbow firmly against inner thigh.",
      "Curl dumbbell up while keeping upper arm still.",
      "Squeeze biceps hard at the top of each rep."
    ]
  },
  { 
    id: "preacher-curl", 
    name: "Preacher Curl", 
    difficulty: "Intermediate", 
    muscles: ["Biceps"], 
    equipment: "Preacher bench + Bar/DB", 
    description: "Avoid bottom bounce; steady tempo.",
    tips: [
      "Keep upper arms flat against preacher pad.",
      "Curl smoothly without bouncing at the bottom.",
      "Lower bar under control for full stretch."
    ]
  },
  { 
    id: "cable-curl", 
    name: "Cable Curl", 
    difficulty: "Beginner", 
    muscles: ["Biceps"], 
    equipment: "Cable", 
    description: "Constant tension; don’t let elbows drift forward.",
    tips: [
      "Stand close to cable stack for better tension.",
      "Curl without letting elbows drift forward.",
      "Control cable on the way down for constant tension."
    ]
  },
  { 
    id: "reverse-curl", 
    name: "Reverse Curl", 
    difficulty: "Beginner", 
    muscles: ["Brachioradialis","Forearms","Biceps"], 
    equipment: "Bar/EZ bar", 
    description: "Overhand grip biases forearms and brachioradialis.",
    tips: [
      "Use an overhand grip with palms facing down.",
      "Curl bar up slowly, focusing on forearms.",
      "Keep elbows tight to sides during the lift."
    ]
  },
  { 
    id: "drag-curl", 
    name: "Drag Curl", 
    difficulty: "Intermediate", 
    muscles: ["Biceps"], 
    equipment: "Barbell/EZ bar", 
    description: "Bar drags along torso; elbows move back.",
    tips: [
      "Drag bar up close to torso instead of out front.",
      "Let elbows travel backward slightly as you curl.",
      "Squeeze at top before lowering under control."
    ]
  },
  { 
    id: "chin-up", 
    name: "Chin-Up (Close Grip)", 
    difficulty: "Intermediate", 
    muscles: ["Biceps","Lats"], 
    equipment: "Pull-up bar", 
    description: "Supinated grip; drive elbows down; chest to bar if possible.",
    tips: [
      "Use underhand (supinated) grip for biceps emphasis.",
      "Pull chest toward bar while driving elbows down.",
      "Lower slowly until arms are straight for full range."
    ]
  },
],

  triceps: [
  { 
    id: "pushdown", 
    name: "Cable Pushdown", 
    difficulty: "Beginner", 
    muscles: ["Triceps"], 
    equipment: "Cable", 
    description: "Elbows tucked; extend fully without shoulder movement.",
    tips: [
      "Keep elbows tucked close to your sides throughout.",
      "Push handle down until arms are fully extended.",
      "Control the return; don’t let weight pull elbows forward."
    ]
  },
  { 
    id: "skullcrusher", 
    name: "EZ-Bar Skullcrusher", 
    difficulty: "Intermediate", 
    muscles: ["Triceps"], 
    equipment: "EZ bar", 
    description: "Lower to forehead; keep elbows from flaring.",
    tips: [
      "Keep elbows pointed toward the ceiling, not flared outward.",
      "Lower bar slowly to forehead or just behind head.",
      "Extend fully without locking elbows harshly."
    ]
  },
  { 
    id: "close-grip-bench", 
    name: "Close-Grip Bench Press", 
    difficulty: "Intermediate", 
    muscles: ["Triceps","Chest"], 
    equipment: "Barbell", 
    description: "Hands just inside shoulder width; elbows tucked.",
    tips: [
      "Grip bar just inside shoulder-width to target triceps.",
      "Keep elbows tucked close to your torso as you press.",
      "Lower to mid-chest and press bar back up in straight line."
    ]
  },
  { 
    id: "oh-db-ext", 
    name: "Overhead DB Extension", 
    difficulty: "Beginner", 
    muscles: ["Triceps (long head)"], 
    equipment: "Dumbbell", 
    description: "Keep elbows tight; full stretch overhead.",
    tips: [
      "Keep elbows pointing up and close together.",
      "Lower dumbbell behind head for full stretch.",
      "Extend arms fully overhead, squeezing triceps at top."
    ]
  },
  { 
    id: "upright-dip", 
    name: "Triceps Dips (Upright)", 
    difficulty: "Intermediate", 
    muscles: ["Triceps"], 
    equipment: "Dip bars", 
    description: "Stay upright to bias triceps more than chest.",
    tips: [
      "Keep torso upright to emphasize triceps over chest.",
      "Lower until elbows reach ~90° bend.",
      "Press up fully, locking out elbows without shrugging shoulders."
    ]
  },
  { 
    id: "rope-oh-ext", 
    name: "Cable Overhead Rope Ext", 
    difficulty: "Intermediate", 
    muscles: ["Triceps (long head)"], 
    equipment: "Cable + Rope", 
    description: "Lean forward slightly; stretch and extend fully.",
    tips: [
      "Lean forward slightly to keep constant tension.",
      "Stretch rope overhead until triceps feel loaded.",
      "Extend rope down and apart until arms are straight."
    ]
  },
  { 
    id: "bench-dips", 
    name: "Bench Dips", 
    difficulty: "Beginner", 
    muscles: ["Triceps"], 
    equipment: "Bench/Box", 
    description: "Feet out for harder; keep shoulders down and away from ears.",
    tips: [
      "Keep hands close to hips on bench for support.",
      "Lower until elbows are at ~90° angle.",
      "Push through palms, keeping shoulders away from ears."
    ]
  },
  { 
    id: "kickback", 
    name: "DB Kickback", 
    difficulty: "Beginner", 
    muscles: ["Triceps"], 
    equipment: "Dumbbell", 
    description: "Upper arm parallel to floor; extend until straight.",
    tips: [
      "Keep upper arm parallel to floor and stationary.",
      "Extend elbow until arm is straight and triceps squeeze.",
      "Lower dumbbell slowly without swinging."
    ]
  },
  { 
    id: "diamond-pushup", 
    name: "Diamond Push-Up", 
    difficulty: "Beginner", 
    muscles: ["Triceps","Chest"], 
    equipment: "None", 
    description: "Hands close together under chest; elbows tucked.",
    tips: [
      "Place hands close together under chest in diamond shape.",
      "Keep elbows tucked close to body as you lower.",
      "Push through palms to lock out triceps at the top."
    ]
  },
  { 
    id: "crossbody-ext", 
    name: "Cross-Body Cable Extension", 
    difficulty: "Intermediate", 
    muscles: ["Triceps"], 
    equipment: "Cable", 
    description: "Pull down and across body; keep shoulder quiet.",
    tips: [
      "Stand sideways to cable for cross-body motion.",
      "Pull handle across body until elbow is fully extended.",
      "Keep shoulder and torso stable; isolate triceps only."
    ]
  },
],


  cardio: [
  { 
    id: "treadmill-run", 
    name: "Treadmill Run", 
    difficulty: "Beginner", 
    muscles: ["Cardio"], 
    equipment: "Treadmill", 
    description: "Start easy pace; build gradually; focus on posture.",
    tips: [
      "Start with a gentle warm-up before increasing speed.",
      "Keep posture upright, eyes forward, and avoid slouching.",
      "Use a slight incline (1–2%) to mimic outdoor running."
    ]
  },
  { 
    id: "rower", 
    name: "Rowing Machine", 
    difficulty: "Beginner", 
    muscles: ["Cardio","Back","Legs"], 
    equipment: "Rower", 
    description: "Drive legs, swing back slightly, then pull; reverse to return.",
    tips: [
      "Push with legs first, then lean back, then pull arms.",
      "Return sequence is arms → torso → legs.",
      "Keep strokes smooth and steady, not jerky."
    ]
  },
  { 
    id: "bike", 
    name: "Stationary Bike", 
    difficulty: "Beginner", 
    muscles: ["Cardio","Legs"], 
    equipment: "Bike", 
    description: "Maintain smooth cadence; adjust resistance to target zone.",
    tips: [
      "Adjust seat height so knees are slightly bent at bottom.",
      "Keep cadence steady (70–90 RPM for endurance).",
      "Increase resistance gradually for harder efforts."
    ]
  },
  { 
    id: "jump-rope", 
    name: "Jump Rope", 
    difficulty: "Beginner", 
    muscles: ["Cardio","Calves"], 
    equipment: "Rope", 
    description: "Small hops; wrists do most of the work.",
    tips: [
      "Keep jumps low to the ground; avoid big bounces.",
      "Turn rope with wrists, not arms.",
      "Land softly on balls of feet to reduce impact."
    ]
  },
  { 
    id: "stair-climber", 
    name: "Stair Climber", 
    difficulty: "Beginner", 
    muscles: ["Cardio","Legs"], 
    equipment: "Machine", 
    description: "Stand tall; steady pace; light hand support if needed.",
    tips: [
      "Stand upright; avoid leaning heavily on handles.",
      "Use full foot contact on each step.",
      "Maintain steady, sustainable pace for endurance."
    ]
  },
  { 
    id: "hiit-sprints", 
    name: "HIIT Sprints (Track)", 
    difficulty: "Advanced", 
    muscles: ["Cardio","Full Body"], 
    equipment: "Track/Field", 
    description: "Short sprints with full rest; quality over quantity.",
    tips: [
      "Sprint at near-max effort for short distances.",
      "Take full rest (walk or slow jog) between sprints.",
      "Focus on explosive drive and strong arm swing."
    ]
  },
  { 
    id: "incline-walk", 
    name: "Incline Treadmill Walk", 
    difficulty: "Beginner", 
    muscles: ["Cardio","Glutes","Calves"], 
    equipment: "Treadmill", 
    description: "Set incline 5–12%; steady breathing.",
    tips: [
      "Set incline between 5–12% for intensity boost.",
      "Walk with long strides and push through heels.",
      "Maintain steady breathing rhythm; avoid slouching."
    ]
  },
  { 
    id: "elliptical", 
    name: "Elliptical Trainer", 
    difficulty: "Beginner", 
    muscles: ["Cardio"], 
    equipment: "Elliptical", 
    description: "Low impact; vary resistance and cadence intervals.",
    tips: [
      "Keep posture upright and core engaged.",
      "Push and pull evenly with both arms and legs.",
      "Vary resistance and speed to challenge endurance."
    ]
  },
  { 
    id: "swim", 
    name: "Swimming Laps", 
    difficulty: "Intermediate", 
    muscles: ["Cardio","Full Body"], 
    equipment: "Pool", 
    description: "Alternate strokes; focus on breathing rhythm.",
    tips: [
      "Exhale underwater and inhale quickly when turning head.",
      "Keep body streamlined to reduce drag.",
      "Alternate strokes to balance muscle use."
    ]
  },
  { 
    id: "shadow-box", 
    name: "Shadow Boxing", 
    difficulty: "Beginner", 
    muscles: ["Cardio","Upper Body","Core"], 
    equipment: "None", 
    description: "Light combos with footwork; keep guard up and core braced.",
    tips: [
      "Stay light on your feet and keep moving.",
      "Keep hands up in guard position while throwing punches.",
      "Engage core to add power to combinations."
    ]
  },
],

  forearms: [
  { 
    id: "farmers-carry", 
    name: "Farmer’s Carry", 
    difficulty: "Beginner", 
    muscles: ["Forearms","Grip","Core"], 
    equipment: "DBs/Kettlebells", 
    description: "Walk tall with heavy weights; don’t let shoulders slump.",
    tips: [
      "Stand tall with chest up and shoulders back.",
      "Grip weights firmly without letting wrists bend.",
      "Walk in a straight line with controlled steps."
    ]
  },
  { 
    id: "wrist-curl", 
    name: "Wrist Curl", 
    difficulty: "Beginner", 
    muscles: ["Forearms (flexors)"], 
    equipment: "DB/Barbell", 
    description: "Slow control; full wrist flexion/extension.",
    tips: [
      "Rest forearms on bench with wrists hanging off edge.",
      "Curl wrists upward slowly for full contraction.",
      "Lower under control until fully stretched."
    ]
  },
  { 
    id: "rev-wrist-curl", 
    name: "Reverse Wrist Curl", 
    difficulty: "Beginner", 
    muscles: ["Forearms (extensors)"], 
    equipment: "DB/Barbell", 
    description: "Light load; smooth tempo.",
    tips: [
      "Use lighter weight to maintain control.",
      "Lift back of hands upward slowly with elbows supported.",
      "Avoid swinging; focus on smooth contraction."
    ]
  },
  { 
    id: "plate-pinch", 
    name: "Plate Pinch Hold", 
    difficulty: "Intermediate", 
    muscles: ["Grip","Forearms"], 
    equipment: "Plates", 
    description: "Pinch two plates smooth-sides-out; hold for time.",
    tips: [
      "Pinch plates with fingertips, not just palm.",
      "Keep shoulders packed while holding plates.",
      "Time your holds and progressively increase duration."
    ]
  },
  { 
    id: "towel-pullup-hang", 
    name: "Towel Pull-Up Hang", 
    difficulty: "Advanced", 
    muscles: ["Grip","Forearms"], 
    equipment: "Towel + Bar", 
    description: "Hang from towels; keep shoulders packed.",
    tips: [
      "Wrap towels evenly and grip tight near top.",
      "Hang with shoulders engaged, not relaxed.",
      "Build time under tension gradually for grip endurance."
    ]
  },
  { 
    id: "rack-hold", 
    name: "Heavy Rack Hold", 
    difficulty: "Intermediate", 
    muscles: ["Grip","Forearms"], 
    equipment: "Barbell + Rack", 
    description: "Stand tall; hold heavy bar for time just off the pins.",
    tips: [
      "Set safety pins just above knee height.",
      "Stand tall with neutral spine while holding bar.",
      "Grip bar tight and hold for a set time."
    ]
  },
  { 
    id: "grippers", 
    name: "Captains of Crush / Grippers", 
    difficulty: "Beginner", 
    muscles: ["Grip"], 
    equipment: "Gripper", 
    description: "Multiple sets of 5–10 controlled closes each hand.",
    tips: [
      "Hold gripper in center of palm for best leverage.",
      "Close handles fully with controlled squeeze.",
      "Perform slow negatives to build endurance."
    ]
  },
  { 
    id: "hammer-rotation", 
    name: "Hammer Rotations (Pro/Sup)", 
    difficulty: "Beginner", 
    muscles: ["Forearms","Wrist Rotators"], 
    equipment: "Hammer/DB", 
    description: "Rotate through pronation/supination with control.",
    tips: [
      "Grip hammer near end for greater resistance.",
      "Rotate wrist slowly from palm-up to palm-down.",
      "Keep forearm still and isolate wrist movement."
    ]
  },
  { 
    id: "bar-hang", 
    name: "Dead Hang", 
    difficulty: "Beginner", 
    muscles: ["Grip","Shoulders"], 
    equipment: "Pull-up bar", 
    description: "Hang with active shoulders; build duration over time.",
    tips: [
      "Grip bar with full hand wrap for security.",
      "Engage shoulders slightly to avoid over-stretching.",
      "Progressively increase hang duration over time."
    ]
  },
  { 
    id: "rice-bucket", 
    name: "Rice Bucket Drill", 
    difficulty: "Beginner", 
    muscles: ["Forearms","Hands"], 
    equipment: "Bucket + Rice", 
    description: "Open/close/rotate hands in rice for endurance.",
    tips: [
      "Submerge hands fully in rice before starting.",
      "Perform open/close fists, rotations, and claw motions.",
      "Use higher reps for endurance and grip conditioning."
    ]
  },
],

  powerlifting: [
  { 
    id: "pl-back-squat", 
    name: "Back Squat", 
    difficulty: "Intermediate", 
    muscles: ["Quads","Glutes","Hamstrings"], 
    equipment: "Barbell + Rack", 
    description: "Brace hard, hit depth, drive up through mid-foot.",
    tips: [
      "Set feet shoulder-width, brace core, and keep chest tall.",
      "Squat to at least parallel while keeping knees in line with toes.",
      "Drive up through mid-foot while keeping torso tight."
    ]
  },
  { 
    id: "pl-bench", 
    name: "Competition Bench Press", 
    difficulty: "Intermediate", 
    muscles: ["Chest","Triceps","Shoulders"], 
    equipment: "Barbell + Bench + Rack", 
    description: "Set arch, scapulae retracted, pause on chest in comp rules.",
    tips: [
      "Pinch shoulder blades and keep them tight throughout the lift.",
      "Lower bar to mid-chest and pause briefly before pressing.",
      "Drive feet into floor to stabilize arch and generate leg drive."
    ]
  },
  { 
    id: "pl-deadlift", 
    name: "Conventional Deadlift", 
    difficulty: "Advanced", 
    muscles: ["Posterior Chain","Back"], 
    equipment: "Barbell", 
    description: "Bar close, brace, push floor away; lock out strong.",
    tips: [
      "Start with bar over mid-foot and shins touching lightly.",
      "Brace core before lifting and keep bar close to body.",
      "Drive hips and chest up together; lock out by standing tall."
    ]
  },
  { 
    id: "pl-pause-squat", 
    name: "Pause Squat", 
    difficulty: "Intermediate", 
    muscles: ["Quads","Glutes","Core"], 
    equipment: "Barbell + Rack", 
    description: "1–2s pause at depth; kills bounce, builds tightness/control.",
    tips: [
      "Descend under control and pause 1–2 seconds at bottom.",
      "Stay tight during pause; don’t let chest collapse.",
      "Drive up explosively while maintaining brace."
    ]
  },
  { 
    id: "pl-tempo-bench", 
    name: "Tempo Bench (3-1-1)", 
    difficulty: "Intermediate", 
    muscles: ["Chest","Triceps"], 
    equipment: "Barbell", 
    description: "3s eccentric, 1s pause, smooth press for bar path discipline.",
    tips: [
      "Lower bar over 3 seconds with elbows tucked ~45°.",
      "Pause 1 second on chest without losing tightness.",
      "Press smoothly while keeping bar path consistent."
    ]
  },
  { 
    id: "pl-deficit-deadlift", 
    name: "Deficit Deadlift", 
    difficulty: "Advanced", 
    muscles: ["Posterior Chain"], 
    equipment: "Barbell + 1–2\" Deficit", 
    description: "Starts lower; increases ROM and off-floor strength.",
    tips: [
      "Stand on small platform to increase range of motion.",
      "Keep hips and chest rising together from the floor.",
      "Drive explosively to reinforce off-floor strength."
    ]
  },
  { 
    id: "pl-ohp", 
    name: "Overhead Press", 
    difficulty: "Intermediate", 
    muscles: ["Delts","Triceps","Core"], 
    equipment: "Barbell", 
    description: "Strict press; ribs down; squeeze glutes; no layback.",
    tips: [
      "Brace core and squeeze glutes before pressing.",
      "Press bar straight overhead, not forward.",
      "Lock out fully with biceps close to ears."
    ]
  },
  { 
    id: "pl-row", 
    name: "Barbell Row (Strict)", 
    difficulty: "Intermediate", 
    muscles: ["Lats","Mid-Back"], 
    equipment: "Barbell", 
    description: "Hinge ~45°; pull to lower ribs; no torso heave.",
    tips: [
      "Hinge forward to ~45° and keep back flat.",
      "Row bar toward lower ribs with elbows tucked.",
      "Avoid jerking; move bar with controlled strength."
    ]
  },
  { 
    id: "pl-gm", 
    name: "Good Morning", 
    difficulty: "Intermediate", 
    muscles: ["Hamstrings","Glutes","Spinal Erectors"], 
    equipment: "Barbell", 
    description: "Soft knees; hip hinge; neutral spine throughout.",
    tips: [
      "Keep a slight bend in knees and hinge at hips.",
      "Maintain neutral spine; avoid rounding back.",
      "Descend until hamstrings stretch, then drive up."
    ]
  },
  { 
    id: "pl-hip-thrust", 
    name: "Barbell Hip Thrust", 
    difficulty: "Intermediate", 
    muscles: ["Glutes","Hamstrings"], 
    equipment: "Barbell + Bench", 
    description: "Full hip lockout; chin tucked; posterior pelvic tilt at top.",
    tips: [
      "Position upper back on bench and bar over hips.",
      "Drive through heels and extend hips fully.",
      "Tuck chin and squeeze glutes hard at lockout."
    ]
  },
],

calisthenics: [
  { 
    id: "cal-pushup", 
    name: "Push-Up", 
    difficulty: "Beginner", 
    muscles: ["Chest","Triceps","Core"], 
    equipment: "None", 
    description: "Rigid plank body; chest near floor; full lockout.",
    tips: [
      "Keep body in a straight line from head to heels.",
      "Lower chest close to floor while elbows track back ~45°.",
      "Push through palms and fully lock out elbows at the top."
    ]
  },
  { 
    id: "cal-pullup", 
    name: "Pull-Up", 
    difficulty: "Intermediate", 
    muscles: ["Lats","Biceps","Upper Back"], 
    equipment: "Bar", 
    description: "Dead hang start; pull chest toward bar; avoid kipping for strength.",
    tips: [
      "Start each rep from a full dead hang for range of motion.",
      "Pull chest toward bar while keeping shoulders tight.",
      "Avoid kipping; move in a slow, controlled manner."
    ]
  },
  { 
    id: "cal-dip", 
    name: "Bar Dips", 
    difficulty: "Intermediate", 
    muscles: ["Triceps","Chest"], 
    equipment: "Dip Bars", 
    description: "Shoulders down/back; full lockout; lean changes emphasis.",
    tips: [
      "Keep shoulders down and chest slightly forward.",
      "Lower until elbows are ~90° without straining shoulders.",
      "Lock out fully at the top with elbows straight."
    ]
  },
  { 
    id: "cal-pike-pushup", 
    name: "Pike Push-Up", 
    difficulty: "Intermediate", 
    muscles: ["Shoulders","Triceps","Core"], 
    equipment: "None", 
    description: "Hips high; head to triangle between hands; vertical press pattern.",
    tips: [
      "Keep hips high so torso is close to vertical.",
      "Lower head between hands under control.",
      "Press straight up to mimic overhead pressing."
    ]
  },
  { 
    id: "cal-lsit", 
    name: "L-Sit Hold", 
    difficulty: "Advanced", 
    muscles: ["Core","Hip Flexors","Triceps"], 
    equipment: "Parallettes/Floor", 
    description: "Locked knees; toes pointed; shoulders depressed; hollow body.",
    tips: [
      "Press hands firmly into ground or bars to lift body.",
      "Keep knees locked and toes pointed for best engagement.",
      "Maintain shoulders depressed and core braced."
    ]
  },
  { 
    id: "cal-pistol", 
    name: "Pistol Squat", 
    difficulty: "Advanced", 
    muscles: ["Quads","Glutes","Core"], 
    equipment: "None", 
    description: "Single-leg; counterbalance with arms; control descent; heel loaded.",
    tips: [
      "Extend one leg forward while squatting on the other.",
      "Control descent slowly without collapsing knee inward.",
      "Drive up through heel while keeping torso upright."
    ]
  },
  { 
    id: "cal-row", 
    name: "Australian Row (Inverted)", 
    difficulty: "Beginner", 
    muscles: ["Upper Back","Lats","Biceps"], 
    equipment: "Low Bar/TRX", 
    description: "Body straight; pull chest to bar; adjust foot position for difficulty.",
    tips: [
      "Keep body in one line from shoulders to heels.",
      "Pull chest up to bar while squeezing shoulder blades.",
      "Move feet forward/back to adjust difficulty."
    ]
  },
  { 
    id: "cal-handstand", 
    name: "Wall Handstand Hold", 
    difficulty: "Intermediate", 
    muscles: ["Shoulders","Triceps","Core"], 
    equipment: "Wall", 
    description: "Stacked line; ribs down; active shoulders; small holds, frequent.",
    tips: [
      "Kick up gently against wall with core braced.",
      "Keep ribs tucked and glutes squeezed for alignment.",
      "Press into ground with active shoulders, not shrugged."
    ]
  },
  { 
    id: "cal-hollow", 
    name: "Hollow Body Hold", 
    difficulty: "Beginner", 
    muscles: ["Core"], 
    equipment: "None", 
    description: "Lower back pressed down; shoulders/feet off floor; breathe shallow.",
    tips: [
      "Press lower back into floor to avoid arching.",
      "Lift shoulders and feet just off floor.",
      "Maintain shallow breaths while holding position."
    ]
  },
  { 
    id: "cal-muscleup", 
    name: "Strict Muscle-Up (Progression)", 
    difficulty: "Advanced", 
    muscles: ["Lats","Biceps","Triceps","Core"], 
    equipment: "Rings/Bar", 
    description: "False grip + transition drills; strict reps over kipping.",
    tips: [
      "Use false grip on rings/bar for easier transition.",
      "Pull explosively until chest is over bar/rings.",
      "Practice transition phase slowly before full reps."
    ]
  },
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
