/* =========================================================
   Praxis · seeded patient cases
   ---------------------------------------------------------
   DRAFT CONTENT — written to be clinically plausible and to
   practice reasoning, NOT verified by a licensed OT. Megan
   should confirm accuracy before relying on any item. Editing
   is easy: each case is a plain object; add or change freely.

   12 cases · 2 per practice area · 6 areas.

   Model:
   {
     id, title, area, blurb, difficulty, domains:[], setting,
     patient: { name, setting, summary },
     steps: [{
       prompt, hint, type:'single'|'multi',
       options: [{ id, text }],      // shown in random order on screen
       correct: [ids],
       affirm: shown when the best answer is chosen,
       coach:  shown as gentle constructive framing otherwise,
       rationale: the teaching (always shown),
       teach:  optional extra tip
     }]
   }
   Note: option order is randomized when displayed, so the
   "correct" answer being listed first here does not matter.
   ========================================================= */

window.PRAXIS_CASES = [

  /* ================= NEUROLOGICAL REHAB ================= */
  {
    id: "right-cva-01",
    title: "Right CVA, left hemiparesis",
    area: "Neurological rehab",
    blurb: "Inpatient rehab · self-care and unilateral neglect",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Inpatient rehabilitation",
    patient: {
      name: "Robert, 68",
      setting: "Inpatient rehab · day 3 after a right-hemisphere stroke",
      summary:
        "Robert had a right CVA and has left-sided weakness. He was independent at home before, lives with his wife, and loves cooking. Nursing notes he sometimes leaves food untouched on one side of his tray and has bumped his left arm on doorframes."
    },
    steps: [
      {
        prompt: "You're meeting Robert for the first time. What's the most fitting way to begin?",
        hint: "Think about where the OT process starts.",
        type: "single",
        options: [
          { id: "a", text: "Build an occupational profile — his prior roles, routines, and what he most wants to get back to" },
          { id: "b", text: "Start upper-extremity strengthening exercises right away" },
          { id: "c", text: "Recommend a power wheelchair for discharge" },
          { id: "d", text: "Hand him a printed home exercise program to begin" }
        ],
        correct: ["a"],
        affirm: "Yes — you're starting exactly where the OT process starts.",
        coach: "Good instinct to want to help fast. Let's line this up with the OT process, which starts a step earlier.",
        rationale:
          "The occupational therapy process opens with the <strong>occupational profile</strong>: understanding the client's history, roles, routines, and priorities before assessing or intervening. It grounds everything that follows in what matters to Robert.",
        teach: "The profile is also where you learn his goals — cooking again is a meaningful thread you can build the whole plan around."
      },
      {
        prompt: "During breakfast, Robert doesn't touch the food on the left side of his tray and bumps his left arm on the doorway. Which best explains what you're seeing?",
        hint: "Consider which hemisphere was affected.",
        type: "single",
        options: [
          { id: "a", text: "Left unilateral neglect (inattention to the left side)" },
          { id: "b", text: "General fatigue and low appetite" },
          { id: "c", text: "Purely a strength problem in the left arm" },
          { id: "d", text: "Ideomotor apraxia" }
        ],
        correct: ["a"],
        affirm: "That's the pattern — you connected the lesion side to the behavior.",
        coach: "Reasonable things to consider. Let's tie the specific signs together with the side of the stroke.",
        rationale:
          "Right-hemisphere (non-dominant) strokes commonly produce <strong>left unilateral neglect</strong> — reduced awareness of stimuli on the left. Ignoring food on the left and bumping the left arm are classic signs, distinct from weakness alone.",
        teach: "Neglect is a safety issue too: it raises fall and injury risk, so it shapes how you set up his environment."
      },
      {
        prompt: "You're helping Robert with grooming at the sink. Which strategies genuinely support his left neglect? Choose all that apply.",
        hint: "You can select more than one. Aim for approaches that invite him toward his left, not away from it.",
        type: "multi",
        options: [
          { id: "a", text: "Place a bright colored anchor on the left edge of the sink to cue him to scan left" },
          { id: "b", text: "Teach him to turn his head and actively scan toward his left side" },
          { id: "c", text: "Gently cue him to check his left before finishing a step" },
          { id: "d", text: "Move every item to his right so he never has to look left" },
          { id: "e", text: "Do the task for him to save time" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Nicely reasoned — every one you picked pulls his attention across midline.",
        coach: "You're thinking about making the task doable, which is caring. Let's separate strategies that build awareness from ones that quietly work around it.",
        rationale:
          "Effective neglect strategies <strong>invite attention to the left</strong>: anchoring, active scanning, and cueing all build awareness. Keeping everything on his right or doing it for him avoids the neglect rather than addressing it, and reduces his engagement.",
        teach: "As he improves, you can fade the cues — that fading is itself a sign of progress worth naming out loud to him."
      },
      {
        prompt: "You move on to lower-body dressing. What's the most sound technique for one-handed dressing with left hemiparesis?",
        hint: "Think about which side goes in first.",
        type: "single",
        options: [
          { id: "a", text: "Dress the weaker (left) side first, and undress it last" },
          { id: "b", text: "Dress the stronger side first to build momentum" },
          { id: "c", text: "Avoid adaptive equipment so his arm has to work harder" },
          { id: "d", text: "Require him to stand unsupported the whole time" }
        ],
        correct: ["a"],
        affirm: "Exactly — affected side in first, out last.",
        coach: "Close, and this one has a reliable rule of thumb worth locking in.",
        rationale:
          "For dressing with one functional side, guide the <strong>affected limb into clothing first</strong> and take it out last. It's easier to manage the weaker limb when the garment is loose, which makes the task safer and more successful.",
        teach: "Adaptive tools like a reacher or dressing stick support independence here — using them isn't 'cheating,' it's smart energy use."
      }
    ]
  },

  {
    id: "sci-c6-01",
    title: "Spinal cord injury, C6 tetraplegia",
    area: "Neurological rehab",
    blurb: "Inpatient rehab · functional expectations and safety",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Inpatient rehabilitation",
    patient: {
      name: "Devon, 24",
      setting: "Inpatient rehab · C6 complete tetraplegia after a diving injury",
      summary:
        "Devon has a complete C6 spinal cord injury. He's motivated, was studying graphic design, and wants to regain as much independence as possible. He has wrist movement but limited hand function."
    },
    steps: [
      {
        prompt: "Given a C6 level, which ability can you expect to build function around?",
        hint: "Think about which muscles are still innervated at C6.",
        type: "single",
        options: [
          { id: "a", text: "Wrist extension, which enables a tenodesis grasp" },
          { id: "b", text: "Full finger flexion and fine pinch" },
          { id: "c", text: "Strong triceps for active elbow extension" },
          { id: "d", text: "Trunk control for unsupported sitting" }
        ],
        correct: ["a"],
        affirm: "Right — wrist extension is the key you build on at C6.",
        coach: "Let's map this to the C6 level so the plan fits what his body can do.",
        rationale:
          "At <strong>C6</strong>, wrist extensors are typically preserved. Extending the wrist passively flexes the fingers — a <strong>tenodesis grasp</strong> — which becomes the functional pinch you train and protect.",
        teach: "Because tenodesis depends on slightly tight finger flexors, therapists are careful not to over-stretch them."
      },
      {
        prompt: "What's the best approach to help Devon feed himself independently?",
        hint: "Pair his available movement with the right tool.",
        type: "single",
        options: [
          { id: "a", text: "Train his tenodesis grasp and use a universal cuff to hold utensils" },
          { id: "b", text: "Strengthen his intrinsic hand muscles to restore pinch" },
          { id: "c", text: "Recommend full feeding assistance at every meal" },
          { id: "d", text: "Splint his wrist in flexion during meals" }
        ],
        correct: ["a"],
        affirm: "Perfect — you matched his movement to a smart adaptation.",
        coach: "Let's find the option that uses what he has rather than what the injury took.",
        rationale:
          "A <strong>universal cuff</strong> holds a utensil across his palm so he doesn't need finger grip, and tenodesis training builds functional grasp. Intrinsics aren't available at C6, and a flexed-wrist splint would work against tenodesis.",
        teach: "Adaptive equipment here is empowering — it's the bridge to independence, not a limitation."
      },
      {
        prompt: "Mid-session Devon suddenly reports a pounding headache and is sweating above his injury level. Which actions are appropriate? Choose all that apply.",
        hint: "You can select more than one. This pattern is an emergency.",
        type: "multi",
        options: [
          { id: "a", text: "Stop the activity and sit him upright" },
          { id: "b", text: "Look for and relieve triggers, such as a full bladder or tight clothing" },
          { id: "c", text: "Get help and seek medical attention promptly" },
          { id: "d", text: "Lay him flat and continue the session" },
          { id: "e", text: "Treat it as normal exertion and push on" }
        ],
        correct: ["a", "b", "c"],
        affirm: "You recognized autonomic dysreflexia and responded exactly right.",
        coach: "This one's important to lock in — those symptoms signal autonomic dysreflexia, a medical emergency.",
        rationale:
          "A pounding headache with sweating above the lesion suggests <strong>autonomic dysreflexia</strong>, a dangerous blood-pressure spike. <strong>Sit him upright</strong> (which lowers blood pressure), <strong>find and remove the trigger</strong>, and <strong>get medical help</strong>. Lying flat or continuing makes it worse.",
        teach: "Teaching Devon and his caregivers to recognize these signs early is life-protecting education."
      },
      {
        prompt: "To protect Devon's skin through the day, what do you teach?",
        hint: "He has impaired sensation below the injury.",
        type: "single",
        options: [
          { id: "a", text: "Regular pressure-relief weight shifts every 15–30 minutes and routine skin checks" },
          { id: "b", text: "Stay seated without shifting to build sitting tolerance" },
          { id: "c", text: "Use a doughnut-style cushion for long periods of sitting" },
          { id: "d", text: "Skip skin checks on days he feels fine" }
        ],
        correct: ["a"],
        affirm: "Yes — regular pressure relief and skin checks prevent injury.",
        coach: "Because he can't feel pressure building, let's choose the option that catches problems before they start.",
        rationale:
          "With impaired sensation, <strong>scheduled weight shifts and daily skin inspection</strong> prevent pressure injuries. Sitting still, doughnut cushions, and skipping checks all raise skin-breakdown risk.",
        teach: "Building these into his routine (a phone reminder, a mirror for checks) makes them sustainable."
      }
    ]
  },

  /* ================= ORTHOPEDICS & PHYSICAL REHAB ================= */
  {
    id: "tha-posterior-01",
    title: "Total hip replacement",
    area: "Orthopedics & physical rehab",
    blurb: "Acute care · posterior approach precautions and ADLs",
    difficulty: "Core",
    domains: ["Intervention", "Practice management"],
    setting: "Acute care",
    patient: {
      name: "Margaret, 72",
      setting: "Post-op day 1 · right total hip arthroplasty, posterior approach",
      summary:
        "Margaret had a right hip replacement through a posterior approach. She lives alone in a two-story home and is eager to get back to her garden. You're seeing her for the first time to begin safe self-care and to teach precautions."
    },
    steps: [
      {
        prompt: "Which posterior hip precautions will you reinforce with Margaret? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Avoid bending the hip past 90 degrees" },
          { id: "b", text: "Avoid crossing the legs or bringing the operated leg past midline" },
          { id: "c", text: "Avoid turning the operated leg inward (internal rotation)" },
          { id: "d", text: "Practice deep squats to strengthen the hip quickly" },
          { id: "e", text: "Sleep face-down each night" }
        ],
        correct: ["a", "b", "c"],
        affirm: "That's the classic posterior trio — well done.",
        coach: "You've got most of this. Let's sort the true precautions from the couple that would actually strain the new hip.",
        rationale:
          "Standard posterior precautions are: <strong>no hip flexion past 90°, no adduction past midline, and no internal rotation</strong>. Deep squats and lying prone would push the joint into exactly the positions we're protecting against.",
        teach: "These three tend to combine in everyday moves (like reaching for a sock), which is why adaptive equipment matters so much."
      },
      {
        prompt: "To dress and bathe safely within those precautions, which equipment set fits best?",
        hint: "Picture what keeps her from bending past 90 degrees.",
        type: "single",
        options: [
          { id: "a", text: "Reacher, sock aid, long-handled shoehorn, and dressing stick, plus a tub bench" },
          { id: "b", text: "A low stool she squats down onto to reach her feet" },
          { id: "c", text: "No equipment — encourage her to bend and stretch to her toes" },
          { id: "d", text: "A weighted vest to build core strength during dressing" }
        ],
        correct: ["a"],
        affirm: "Perfect fit — every item keeps her upright and within range.",
        coach: "Let's match the tools to the goal of keeping her hip under 90 degrees.",
        rationale:
          "Long-handled equipment — <strong>reacher, sock aid, long shoehorn, dressing stick</strong> — lets Margaret dress her lower body without bending past 90°. A tub bench keeps bathing safe. The other options invite her into the exact motions we're avoiding.",
        teach: "Have her demonstrate each tool back to you; teaching it isn't done until she can do it independently and safely."
      },
      {
        prompt: "Margaret needs to ride home in the car. What's the safest way to coach her getting in?",
        hint: "Think about seat height and hip angle.",
        type: "single",
        options: [
          { id: "a", text: "Recline the seat, have her back in and keep the operated leg extended, avoiding flexion past 90 degrees" },
          { id: "b", text: "Step in facing forward and pivot on the operated leg" },
          { id: "c", text: "Have her climb up into a tall truck cab for more room" },
          { id: "d", text: "Sit fully upright in a low bucket seat" }
        ],
        correct: ["a"],
        affirm: "Yes — reclined and backing in keeps her hip safe.",
        coach: "Good to be thinking about the car — it's a real-world sticking point. Let's find the position that protects the hip.",
        rationale:
          "Backing in with the <strong>seat reclined and the leg extended</strong> keeps hip flexion under 90°. Pivoting on the operated leg risks internal rotation, and a low or very high seat can force too much flexion.",
        teach: "A firm cushion to raise a low seat is a simple fix worth mentioning for her own car."
      },
      {
        prompt: "Margaret says gardening is what she misses most, but it means bending low. How do you respond?",
        hint: "Balance safety with what makes life meaningful to her.",
        type: "single",
        options: [
          { id: "a", text: "Explore adaptive gardening — raised beds, long-handled tools, a kneeler-seat — and write the goal into her plan" },
          { id: "b", text: "Tell her gardening is off-limits from now on" },
          { id: "c", text: "Say gardening isn't something OT deals with" },
          { id: "d", text: "Suggest she wait a year and not think about it" }
        ],
        correct: ["a"],
        affirm: "Beautiful — you honored her precautions and what she loves.",
        coach: "Her precautions matter, and so does what makes her life feel like hers. There's a way to hold both.",
        rationale:
          "Occupational therapy is <strong>client-centered</strong>: you protect the healing hip while keeping meaningful occupation in reach. Adaptive gardening (raised beds, long tools, a kneeler-seat) lets Margaret return to what she values within her precautions.",
        teach: "Naming a meaningful goal like this often boosts motivation for the less exciting parts of recovery."
      }
    ]
  },

  {
    id: "tka-01",
    title: "Total knee replacement",
    area: "Orthopedics & physical rehab",
    blurb: "Home health · ADLs, transfers, and returning to routine",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Home health",
    patient: {
      name: "Barbara, 66",
      setting: "Post-op day 4 · right total knee replacement, now home",
      summary:
        "Barbara is home after a knee replacement and moving carefully. She lives with her husband in a single-level home with one step at the entry. She's a little nervous about getting back to cooking and daily routines."
    },
    steps: [
      {
        prompt: "What's the most fitting first OT priority in the home?",
        hint: "Think function and safety before exercise.",
        type: "single",
        options: [
          { id: "a", text: "Assess how safely she performs daily activities and transfers right now" },
          { id: "b", text: "Begin heavy resistive knee strengthening immediately" },
          { id: "c", text: "Order a wheelchair for the house" },
          { id: "d", text: "Focus only on measuring knee range of motion" }
        ],
        correct: ["a"],
        affirm: "Yes — you started with safe function in her real environment.",
        coach: "Let's begin where OT adds the most right now: her daily function and safety.",
        rationale:
          "OT's role centers on <strong>safe occupational performance</strong> — evaluating ADLs and transfers in her actual home guides everything else. Heavy strengthening and isolated ROM lean toward other priorities or providers early on.",
        teach: "Seeing her move around her own kitchen and bathroom reveals real risks a clinic can't."
      },
      {
        prompt: "For lower-body dressing with limited knee bending, what do you teach?",
        hint: "Reduce how far she has to reach toward her feet.",
        type: "single",
        options: [
          { id: "a", text: "Adaptive techniques using a reacher, sock aid, and long-handled shoehorn" },
          { id: "b", text: "Deeply bending the knee to reach her foot each time" },
          { id: "c", text: "Having someone else dress her for the foreseeable future" },
          { id: "d", text: "Avoiding all equipment to toughen the knee" }
        ],
        correct: ["a"],
        affirm: "Exactly — the right tools protect the knee and keep her independent.",
        coach: "Let's pick the approach that keeps her dressing herself without straining the knee.",
        rationale:
          "Long-handled equipment lets Barbara dress without forcing painful knee flexion, supporting <strong>independence and comfort</strong>. Deep bending strains the joint, and doing it for her removes the independence we're building.",
        teach: "Independence in dressing is often an early confidence win — worth celebrating with her."
      },
      {
        prompt: "What's the safest toileting setup for her right now?",
        hint: "Reduce deep bending and add support.",
        type: "single",
        options: [
          { id: "a", text: "A raised toilet seat with grab bars to reduce deep knee bending and steady her transfers" },
          { id: "b", text: "A very low toilet to build strength through deep squats" },
          { id: "c", text: "No modifications at all" },
          { id: "d", text: "A soft cushion with nothing to hold onto" }
        ],
        correct: ["a"],
        affirm: "Right — raised seat plus grab bars is the safe, sensible setup.",
        coach: "Let's choose what lowers her fall risk and eases the transfer.",
        rationale:
          "A <strong>raised toilet seat and grab bars</strong> reduce the knee flexion and effort of sit-to-stand and add stability — a common, effective safety recommendation after knee replacement.",
        teach: "Pair the equipment with teaching a safe sit-to-stand technique so the setup is actually used well."
      },
      {
        prompt: "Barbara is anxious about standing to cook again. What's the best OT response?",
        hint: "Grade the activity toward her goal.",
        type: "single",
        options: [
          { id: "a", text: "Grade the task — energy conservation, a high stool at the counter, and gradually building standing tolerance" },
          { id: "b", text: "Advise her to stay out of the kitchen for three months" },
          { id: "c", text: "Tell her cooking isn't an OT concern" },
          { id: "d", text: "Have her stand for long stretches right away to toughen up" }
        ],
        correct: ["a"],
        affirm: "Lovely — you met her goal with a graded, encouraging plan.",
        coach: "Her worry is understandable. Let's find the path that eases her back toward cooking.",
        rationale:
          "<strong>Grading the activity</strong> — perch stool, energy conservation, gradually increasing standing — lets Barbara return to cooking safely and confidently. Avoidance or overexertion both undercut recovery.",
        teach: "Breaking a big goal into small wins is exactly what keeps an anxious client engaged."
      }
    ]
  },

  /* ================= HAND & UPPER EXTREMITY ================= */
  {
    id: "cts-01",
    title: "Carpal tunnel syndrome",
    area: "Hand & upper extremity",
    blurb: "Outpatient hand therapy · conservative management",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Outpatient hand therapy",
    patient: {
      name: "Priya, 41",
      setting: "Outpatient · conservative (non-surgical) management",
      summary:
        "Priya does data entry all day and reports numbness and tingling in her thumb, index, and middle fingers that wakes her at night. She's worried about her ability to keep working."
    },
    steps: [
      {
        prompt: "Her nighttime numbness in the thumb, index, and middle fingers most points to which problem?",
        hint: "Think about which nerve serves those fingers.",
        type: "single",
        options: [
          { id: "a", text: "Median nerve compression at the wrist" },
          { id: "b", text: "Ulnar nerve compression at the elbow" },
          { id: "c", text: "Radial nerve injury" },
          { id: "d", text: "A C5 nerve root problem" }
        ],
        correct: ["a"],
        affirm: "Yes — that distribution is classic median nerve.",
        coach: "Let's map the numb fingers to the nerve that supplies them.",
        rationale:
          "Numbness in the <strong>thumb, index, and middle fingers</strong>, worse at night, fits <strong>median nerve compression at the wrist</strong> (carpal tunnel syndrome). The ulnar and radial nerves serve different areas.",
        teach: "Night symptoms are common because many people sleep with flexed wrists, which raises tunnel pressure."
      },
      {
        prompt: "What's a cornerstone of conservative management you'd provide?",
        hint: "Think about wrist position at night.",
        type: "single",
        options: [
          { id: "a", text: "A wrist orthosis positioned in neutral, worn at night" },
          { id: "b", text: "A wrist splint holding the wrist in full flexion at night" },
          { id: "c", text: "Immobilizing the entire arm for a month" },
          { id: "d", text: "Aggressive resistive gripping pushed through the pain" }
        ],
        correct: ["a"],
        affirm: "Exactly — a neutral night orthosis is a first-line strategy.",
        coach: "Let's choose the option that lowers pressure in the carpal tunnel.",
        rationale:
          "A <strong>neutral wrist orthosis, especially at night</strong>, minimizes carpal tunnel pressure and eases symptoms. A flexed position increases pressure, whole-arm immobilization is excessive, and painful gripping can aggravate it.",
        teach: "Comfort and fit drive adherence — a splint only helps if she'll actually wear it."
      },
      {
        prompt: "Which workplace strategies would you teach Priya? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Neutral wrist posture with a supportive keyboard and mouse setup" },
          { id: "b", text: "Regular micro-breaks and gentle stretching through the day" },
          { id: "c", text: "Nerve and tendon gliding exercises as indicated" },
          { id: "d", text: "Holding the hand completely still all day without moving it" },
          { id: "e", text: "Pushing through numbness to build tolerance" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Well chosen — ergonomics, breaks, and gliding all reduce load.",
        coach: "Let's keep the strategies that reduce strain and drop the ones that add it.",
        rationale:
          "<strong>Ergonomic setup, micro-breaks, and nerve/tendon gliding</strong> reduce repetitive strain and support the nerve. Total stillness isn't practical, and working through numbness can worsen symptoms.",
        teach: "Small, frequent changes usually beat one big fix for repetitive-strain issues."
      },
      {
        prompt: "Priya fears she'll lose her job. What's the best OT approach?",
        hint: "Support both her health and her work role.",
        type: "single",
        options: [
          { id: "a", text: "Collaborate on activity modification and work simplification so she can keep working safely" },
          { id: "b", text: "Tell her she should quit her job" },
          { id: "c", text: "Say her job stress is outside OT's scope" },
          { id: "d", text: "Tell her surgery is the only real option" }
        ],
        correct: ["a"],
        affirm: "Yes — you supported her worker role and her recovery together.",
        coach: "Her job matters to her. Let's find the approach that keeps it within reach.",
        rationale:
          "OT supports <strong>occupational participation</strong>, including work. Modifying tasks and simplifying her workflow helps her keep her job while protecting the nerve. Quitting or dismissing her concern isn't client-centered.",
        teach: "Addressing her fear directly is part of the therapy — worry itself affects function."
      }
    ]
  },

  {
    id: "distal-radius-01",
    title: "Distal radius (wrist) fracture",
    area: "Hand & upper extremity",
    blurb: "Outpatient · post-cast mobility, edema, and ADLs",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Outpatient hand therapy",
    patient: {
      name: "Frank, 58",
      setting: "Six weeks after a distal radius fracture · cast just removed",
      summary:
        "Frank fractured his wrist in a fall and just had the cast removed. His wrist is stiff and swollen and he's struggling with daily tasks. He's been cleared to begin active range of motion, and he's eager to get back to woodworking."
    },
    steps: [
      {
        prompt: "At cast removal, what should your first priorities include assessing?",
        hint: "Think mobility, swelling, and daily function.",
        type: "single",
        options: [
          { id: "a", text: "Active range of motion, edema, and how the wrist is limiting his daily activities" },
          { id: "b", text: "Only maximal grip strength against heavy resistance" },
          { id: "c", text: "Cardiovascular endurance on a treadmill" },
          { id: "d", text: "Memory and cognition" }
        ],
        correct: ["a"],
        affirm: "Right — mobility, edema, and function are the place to start.",
        coach: "Let's focus the assessment on what a freshly healed wrist needs first.",
        rationale:
          "Early after cast removal, assess <strong>active motion, edema, and functional limitations</strong>. Maximal resistance testing is too aggressive at this stage, and endurance or cognition aren't the concern here.",
        teach: "Beginning with function keeps the plan tied to what Frank actually wants to do again."
      },
      {
        prompt: "With active motion cleared, what should early therapy emphasize?",
        hint: "Gentle and active, not forceful.",
        type: "single",
        options: [
          { id: "a", text: "Gentle active range of motion and edema management" },
          { id: "b", text: "Immediate heavy resistive strengthening" },
          { id: "c", text: "Continued full immobilization of the wrist" },
          { id: "d", text: "Forceful passive stretching into pain" }
        ],
        correct: ["a"],
        affirm: "Exactly — gentle active motion and edema control come first.",
        coach: "Let's choose what safely restores movement without overloading healing bone.",
        rationale:
          "Early rehab favors <strong>gentle active motion and edema management</strong> to restore mobility safely. Heavy resistance and forceful passive stretch risk irritation early; ongoing immobilization causes more stiffness.",
        teach: "Progression is gradual — strength work comes later, once motion and comfort improve."
      },
      {
        prompt: "Which edema-management strategies are appropriate? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Elevating the hand above heart level" },
          { id: "b", text: "Gentle active motion to help pump fluid out" },
          { id: "c", text: "Retrograde massage or light compression as indicated" },
          { id: "d", text: "Keeping the hand low and completely still" },
          { id: "e", text: "Applying a very tight, tourniquet-like wrap" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Nicely done — those all move fluid without harm.",
        coach: "Let's keep the strategies that reduce swelling safely and skip the ones that trap it.",
        rationale:
          "<strong>Elevation, gentle motion, and appropriate compression or retrograde massage</strong> reduce edema. A dependent, still hand lets fluid pool, and an overly tight wrap can cut off circulation.",
        teach: "Edema control early makes every later gain in motion easier to achieve."
      },
      {
        prompt: "Frank wants to get back to woodworking. What's the best plan?",
        hint: "Work toward the goal gradually.",
        type: "single",
        options: [
          { id: "a", text: "Grade the activity gradually, building motion and strength toward the goal while watching pain and swelling" },
          { id: "b", text: "Return to full heavy tool use today" },
          { id: "c", text: "Tell him woodworking is no longer possible" },
          { id: "d", text: "Refuse to discuss goals until he's fully healed" }
        ],
        correct: ["a"],
        affirm: "Yes — grading toward his goal is the encouraging, safe path.",
        coach: "His goal is motivating. Let's find the approach that moves toward it safely.",
        rationale:
          "<strong>Graded return</strong> to woodworking — progressively increasing demand while monitoring symptoms — respects healing and keeps Frank engaged. Rushing risks setback; refusing the goal removes his motivation.",
        teach: "Using his real occupation as therapy (light woodworking tasks) is both meaningful and effective."
      }
    ]
  },

  /* ================= PEDIATRICS ================= */
  {
    id: "peds-handwriting-01",
    title: "School-based handwriting",
    area: "Pediatrics",
    blurb: "Pediatrics · fine motor, posture, and carryover",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "School-based practice",
    patient: {
      name: "Liam, 7",
      setting: "Second grade · referred by his teacher",
      summary:
        "Liam's teacher reports his handwriting is hard to read, he avoids coloring, presses very hard with a fisted grasp, and tires quickly during writing. He's bright and social, and gets frustrated when his work looks messy."
    },
    steps: [
      {
        prompt: "Where's the most fitting place to begin your evaluation?",
        hint: "Think about seeing the skill where it actually happens.",
        type: "single",
        options: [
          { id: "a", text: "Observe Liam during a real classroom writing task — posture, grasp, endurance, and how he copes" },
          { id: "b", text: "Immediately replace handwriting with a keyboard" },
          { id: "c", text: "Start teaching cursive to skip the problem" },
          { id: "d", text: "Recommend he repeat the grade" }
        ],
        correct: ["a"],
        affirm: "Yes — you're evaluating the skill in its natural context.",
        coach: "You clearly want to help him quickly. Let's gather the picture first, right where the difficulty shows up.",
        rationale:
          "Occupation-centered evaluation means observing the <strong>task in context</strong>. Watching Liam write in class reveals posture, grasp, endurance, and frustration together — information you can't get from jumping straight to a solution.",
        teach: "Context-based observation also shows what supports already help, which you can build on rather than replace."
      },
      {
        prompt: "You notice a fisted grasp, heavy pressure, and quick fatigue. Which underlying factors most likely contribute? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Reduced hand strength and endurance" },
          { id: "b", text: "Immature or inefficient pencil grasp" },
          { id: "c", text: "Difficulty grading pressure (proprioceptive feedback)" },
          { id: "d", text: "Low intelligence" },
          { id: "e", text: "A vision problem is the only possible cause" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Well reasoned — you separated the motor factors from assumptions.",
        coach: "Let's focus on the factors the signs actually point to, and set aside the ones they don't.",
        rationale:
          "A fisted grasp, heavy pressure, and fatigue point to <strong>hand strength, grasp maturity, and pressure grading</strong>. Nothing here suggests low intelligence, and while vision is worth screening, it isn't the only possible cause — so we don't assume it.",
        teach: "Framing it as skill factors (not ability) also protects a sensitive child's confidence — the same care applies to how you talk to Liam."
      },
      {
        prompt: "Which school-based, occupation-centered strategies fit Liam? Choose all that apply.",
        hint: "You can select more than one. Favor playful skill-building over rote drilling.",
        type: "multi",
        options: [
          { id: "a", text: "Short fine-motor warm-ups (theraputty, tongs, tweezers) before writing" },
          { id: "b", text: "A pencil grip and a slant board to support grasp and posture" },
          { id: "c", text: "Vertical work at an easel or chalkboard to build wrist extension" },
          { id: "d", text: "Have him copy full pages of text over and over until neat" },
          { id: "e", text: "Take away recess to practice writing instead" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Great set — playful, purposeful, and kind to his motivation.",
        coach: "You're close. Let's keep the strategies that build skill without wearing down a child who already gets frustrated.",
        rationale:
          "Fun, targeted approaches — <strong>fine-motor warm-ups, a grip and slant board, and vertical work</strong> — build the underlying skills. Repetitive copying and removing recess tend to increase fatigue and frustration without addressing the root factors.",
        teach: "Recess and movement actually help regulation and focus — protecting them usually helps handwriting, not hurts it."
      },
      {
        prompt: "How do you best support carryover so the gains stick?",
        hint: "Think beyond the therapy session itself.",
        type: "single",
        options: [
          { id: "a", text: "Collaborate with the teacher and family on a few simple classroom and home strategies" },
          { id: "b", text: "Keep all techniques inside your OT session only" },
          { id: "c", text: "Give the family a 20-step daily program to complete" },
          { id: "d", text: "Wait and see if it resolves on its own" }
        ],
        correct: ["a"],
        affirm: "Exactly — carryover lives in the team around him.",
        coach: "Your session time is valuable and limited. Let's think about what keeps the gains going the other six days a week.",
        rationale:
          "Skills generalize when the <strong>whole team supports them</strong>. A few realistic strategies the teacher and family can actually sustain beat an overwhelming program or keeping everything locked in the therapy room.",
        teach: "Keeping the home plan small and doable is what makes families follow through — less really is more here."
      }
    ]
  },

  {
    id: "peds-sensory-01",
    title: "Autism and sensory processing",
    area: "Pediatrics",
    blurb: "Early intervention · sensory needs and routines",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Outpatient pediatrics",
    patient: {
      name: "Mateo, 5",
      setting: "Outpatient pediatrics · autism spectrum disorder",
      summary:
        "Mateo seeks lots of intense movement, covers his ears when sounds are loud, and has a hard time with transitions and mealtimes. His parents want help making daily routines calmer and more successful."
    },
    steps: [
      {
        prompt: "What's the best way to begin your evaluation?",
        hint: "Combine caregiver knowledge with real-life observation.",
        type: "single",
        options: [
          { id: "a", text: "Gather caregiver input and observe him during play and daily routines" },
          { id: "b", text: "Rely only on one standardized test in a quiet, unfamiliar room" },
          { id: "c", text: "Begin intervention before doing any assessment" },
          { id: "d", text: "Give him a medical diagnosis for his sensory processing" }
        ],
        correct: ["a"],
        affirm: "Yes — caregiver input plus real-world observation is ideal.",
        coach: "Let's choose the approach that sees the real Mateo, not a test-room version.",
        rationale:
          "A strong pediatric evaluation blends <strong>caregiver report with observation in natural routines</strong>. A single isolated test misses context, skipping assessment isn't sound, and diagnosing isn't the OT's role.",
        teach: "Parents are experts on their child — their input is data, not just background."
      },
      {
        prompt: "Mateo covering his ears at loud sounds most likely reflects what?",
        hint: "Think about how he responds to sensory input.",
        type: "single",
        options: [
          { id: "a", text: "Sensory over-responsivity to auditory input" },
          { id: "b", text: "Confirmed hearing loss" },
          { id: "c", text: "Deliberate misbehavior" },
          { id: "d", text: "Low intelligence" }
        ],
        correct: ["a"],
        affirm: "Right — that's a classic over-responsive pattern.",
        coach: "Let's read his behavior as communication about how sound feels to him.",
        rationale:
          "Covering the ears suggests <strong>sensory over-responsivity</strong> — loud sound feels overwhelming. It isn't a hearing test result, misbehavior, or a reflection of intelligence.",
        teach: "Seeing behavior as a sensory response, not defiance, changes how the whole team supports him."
      },
      {
        prompt: "Which family-centered strategies fit Mateo's needs? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "A sensory diet with movement breaks matched to his needs" },
          { id: "b", text: "Visual schedules and gentle warnings to ease transitions" },
          { id: "c", text: "Environmental changes like reducing noise or offering ear protection" },
          { id: "d", text: "Making him sit through loud environments to desensitize quickly" },
          { id: "e", text: "Removing all play to focus on repetitive drills" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Great choices — supportive, proactive, and child-centered.",
        coach: "Let's keep the strategies that support his regulation and drop the ones that overwhelm it.",
        rationale:
          "A <strong>sensory diet, visual supports, and environmental modification</strong> help Mateo regulate and participate. Forced exposure to overwhelming input and removing play tend to escalate distress rather than build skills.",
        teach: "Play is a child's main occupation — it's the vehicle for therapy, not a distraction from it."
      },
      {
        prompt: "How do you best support carryover into daily life?",
        hint: "Empower the people with him every day.",
        type: "single",
        options: [
          { id: "a", text: "Coach caregivers with simple, doable strategies woven into everyday routines" },
          { id: "b", text: "Keep all strategies inside the clinic" },
          { id: "c", text: "Hand the family a long, rigid home program" },
          { id: "d", text: "Wait for him to outgrow the difficulties" }
        ],
        correct: ["a"],
        affirm: "Exactly — coaching caregivers is where real change happens.",
        coach: "Let's think about what helps Mateo the other 23 hours of the day.",
        rationale:
          "<strong>Caregiver coaching</strong> embedded in daily routines drives carryover. Clinic-only strategies don't generalize, and rigid, lengthy programs overwhelm families.",
        teach: "A few strategies used consistently beat many strategies used once."
      }
    ]
  },

  /* ================= MENTAL HEALTH ================= */
  {
    id: "mh-depression-01",
    title: "Major depression",
    area: "Mental health",
    blurb: "Community mental health · routine and re-engagement",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Community mental health",
    patient: {
      name: "Sarah, 34",
      setting: "Outpatient community mental health · major depressive disorder",
      summary:
        "Sarah has withdrawn from activities she used to love, her daily routine has fallen apart, and she has little energy or motivation. She used to paint often. She's gentle with others but very hard on herself."
    },
    steps: [
      {
        prompt: "What's the best OT starting point with Sarah?",
        hint: "Center her roles and what she values.",
        type: "single",
        options: [
          { id: "a", text: "Build an occupational profile of her roles, routines, and valued activities" },
          { id: "b", text: "Focus only on managing her medications" },
          { id: "c", text: "Assign her a list of chores without her input" },
          { id: "d", text: "Avoid asking about her interests" }
        ],
        correct: ["a"],
        affirm: "Yes — understanding what matters to her comes first.",
        coach: "Let's begin by understanding Sarah as a person and what she values.",
        rationale:
          "Starting with an <strong>occupational profile</strong> centers Sarah's roles, values, and routines — the foundation for meaningful, motivating goals. Medication is outside OT's role, and imposing tasks without her voice isn't client-centered.",
        teach: "Her painting is a thread worth gently holding onto — meaningful occupation is powerful in depression care."
      },
      {
        prompt: "For her low motivation and withdrawal, which OT approach is most sound?",
        hint: "Action can come before motivation, not only after it.",
        type: "single",
        options: [
          { id: "a", text: "Behavioral activation — gradually re-engaging in meaningful, achievable activities" },
          { id: "b", text: "Waiting passively until she feels motivated to start" },
          { id: "c", text: "Scheduling only demanding, high-stress tasks" },
          { id: "d", text: "Discouraging social participation" }
        ],
        correct: ["a"],
        affirm: "Right — gentle re-engagement builds momentum and mood.",
        coach: "Let's choose the approach that helps her take small steps back into life.",
        rationale:
          "<strong>Behavioral activation</strong> — gradual re-engagement in valued, doable activities — is well supported in depression. Waiting for motivation, piling on stress, or discouraging connection all tend to deepen withdrawal.",
        teach: "In depression, doing often comes before feeling like it — small actions can lift mood, not the other way around."
      },
      {
        prompt: "Which strategies set Sarah up for success and self-efficacy? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Grade activities from small and achievable, building up over time" },
          { id: "b", text: "Reconnect her with painting in a low-pressure way" },
          { id: "c", text: "Establish a consistent daily routine and sleep/wake structure" },
          { id: "d", text: "Expect her to resume her full prior schedule all at once" },
          { id: "e", text: "Treat any missed day as a failure" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Beautifully chosen — gentle, structured, and encouraging.",
        coach: "Let's keep the approaches that build her confidence, not ones that set the bar too high.",
        rationale:
          "<strong>Graded activity, reconnecting with meaning, and routine</strong> build self-efficacy and stability. Expecting an all-at-once return or framing setbacks as failure works against a client who's already self-critical.",
        teach: "How we talk about 'off' days matters — reframing them as normal protects a fragile sense of progress."
      },
      {
        prompt: "Sarah says, \"I'll never feel like myself again.\" What's the best response?",
        hint: "Lead with empathy, then realistic hope.",
        type: "single",
        options: [
          { id: "a", text: "Respond with empathy, validate her feelings, and gently offer realistic hope and a next step" },
          { id: "b", text: "Tell her she's being dramatic" },
          { id: "c", text: "Change the subject to avoid the discomfort" },
          { id: "d", text: "Promise she'll be completely fine by tomorrow" }
        ],
        correct: ["a"],
        affirm: "Yes — empathy paired with honest hope is exactly right.",
        coach: "This is a tender moment. Let's find the response that honors her feelings and still opens a door.",
        rationale:
          "<strong>Empathy plus realistic hope</strong> — validating her experience while gently pointing to a next step — reflects therapeutic use of self. Dismissing, avoiding, or over-promising all break trust.",
        teach: "Therapeutic use of self is a real intervention: how you show up shapes whether she keeps going."
      }
    ]
  },

  {
    id: "mh-anxiety-01",
    title: "Anxiety and stress management",
    area: "Mental health",
    blurb: "Outpatient · coping skills and re-engagement",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Outpatient mental health",
    patient: {
      name: "Jordan, 28",
      setting: "Outpatient · generalized anxiety",
      summary:
        "Jordan has been avoiding situations that feel stressful, has trouble concentrating, feels tense, and isn't sleeping well. He wants to get back to work, classes, and seeing friends without feeling overwhelmed."
    },
    steps: [
      {
        prompt: "What's the best OT focus at the start?",
        hint: "Connect his anxiety to his daily life and goals.",
        type: "single",
        options: [
          { id: "a", text: "Understand how anxiety is affecting his daily occupations and identify his goals" },
          { id: "b", text: "Diagnose his anxiety disorder" },
          { id: "c", text: "Prescribe medication for him" },
          { id: "d", text: "Simply tell him to relax" }
        ],
        correct: ["a"],
        affirm: "Yes — you tied his anxiety to real, meaningful goals.",
        coach: "Let's ground this in how anxiety shows up in his everyday life.",
        rationale:
          "OT focuses on <strong>how anxiety affects participation</strong> and on the client's goals. Diagnosing and prescribing are outside OT's role, and 'just relax' isn't a strategy.",
        teach: "Framing therapy around his goals — work, class, friends — makes the harder coping work feel worth it."
      },
      {
        prompt: "Which OT strategies would help Jordan? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Teach relaxation and grounding techniques like deep breathing and mindfulness" },
          { id: "b", text: "Graded engagement in the occupations he's been avoiding" },
          { id: "c", text: "Time-management and routine strategies to reduce overwhelm" },
          { id: "d", text: "Encourage broad avoidance of anything that feels stressful" },
          { id: "e", text: "Push him to tackle every goal at once" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Great set — coping skills plus gentle, graded re-engagement.",
        coach: "Let's keep the strategies that build coping and gradually widen his world.",
        rationale:
          "<strong>Relaxation skills, graded engagement, and routine strategies</strong> help him cope and re-participate. Broad avoidance reinforces anxiety, and overwhelming him with everything at once can backfire.",
        teach: "Graded exposure through meaningful activity is a natural fit for OT's occupation-based lens."
      },
      {
        prompt: "Continuing to avoid the activities he fears tends to do what over time?",
        hint: "Consider the cycle of avoidance.",
        type: "single",
        options: [
          { id: "a", text: "Maintain or worsen anxiety, which is why graded engagement matters" },
          { id: "b", text: "Permanently cure the anxiety" },
          { id: "c", text: "Have no effect on his function" },
          { id: "d", text: "Improve his participation in daily life" }
        ],
        correct: ["a"],
        affirm: "Right — avoidance feeds the cycle, so we gently reverse it.",
        coach: "Let's think about what avoidance does to anxiety in the long run.",
        rationale:
          "Avoidance offers short-term relief but <strong>maintains or worsens anxiety</strong> over time. Gradually re-engaging in valued activities breaks the cycle and rebuilds confidence.",
        teach: "Naming this cycle for Jordan helps him understand why facing things gradually actually helps."
      },
      {
        prompt: "After a hard week, Jordan says he's \"failing\" at recovery. What's the best response?",
        hint: "Setbacks are part of the path.",
        type: "single",
        options: [
          { id: "a", text: "Normalize setbacks, reframe them as part of progress, and adjust the plan together" },
          { id: "b", text: "Tell him he isn't trying hard enough" },
          { id: "c", text: "Suggest he give up on his goals" },
          { id: "d", text: "Ignore the setback entirely" }
        ],
        correct: ["a"],
        affirm: "Yes — normalizing setbacks keeps him moving forward.",
        coach: "Let's meet his discouragement with perspective and a small adjustment.",
        rationale:
          "<strong>Normalizing setbacks and adjusting collaboratively</strong> keeps Jordan engaged and self-compassionate. Blame, giving up, or ignoring it would all undermine progress.",
        teach: "Recovery isn't linear — helping him expect bumps makes them less discouraging when they come."
      }
    ]
  },

  /* ================= OLDER ADULTS ================= */
  {
    id: "geri-falls-01",
    title: "Home safety and fall prevention",
    area: "Older adults",
    blurb: "Home health · falls, ADLs, and staying independent",
    difficulty: "Core",
    domains: ["Evaluation", "Intervention"],
    setting: "Home health",
    patient: {
      name: "Eleanor, 78",
      setting: "Home health · two recent falls",
      summary:
        "Eleanor lives alone in a two-story home and has fallen twice recently. There are throw rugs throughout and dim lighting on the stairs. She's determined to stay in her own home and keep doing things for herself."
    },
    steps: [
      {
        prompt: "What's the best first step during your home visit?",
        hint: "See her function and environment together.",
        type: "single",
        options: [
          { id: "a", text: "Complete a home safety evaluation and observe her ADLs and IADLs in context" },
          { id: "b", text: "Immediately recommend she move to assisted living" },
          { id: "c", text: "Focus only on lower-extremity strengthening" },
          { id: "d", text: "Assume the falls were just bad luck" }
        ],
        correct: ["a"],
        affirm: "Yes — assess her real environment and daily performance first.",
        coach: "Let's start by understanding both Eleanor and her home before recommending anything.",
        rationale:
          "A <strong>home safety evaluation with observation of daily tasks</strong> identifies the real, modifiable risks. Jumping to placement ignores her goal, isolated strengthening isn't OT's whole role, and dismissing the falls misses the point.",
        teach: "Seeing her move through her own home reveals hazards no checklist alone would catch."
      },
      {
        prompt: "Which home modifications reduce her fall risk? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Remove or secure throw rugs and clear clutter from walkways" },
          { id: "b", text: "Improve lighting, especially on the stairs and at night" },
          { id: "c", text: "Install grab bars and use non-slip mats in the bathroom" },
          { id: "d", text: "Add more loose rugs for extra cushioning" },
          { id: "e", text: "Keep pathways narrow so she can hold onto furniture" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Well done — those are the evidence-based fixes.",
        coach: "Let's keep the changes that reduce hazards and drop the ones that add them.",
        rationale:
          "<strong>Removing trip hazards, improving lighting, and adding bathroom supports</strong> are core fall-prevention modifications. Loose rugs and narrow, cluttered paths increase risk rather than reduce it.",
        teach: "The bathroom is a top fall location — grab bars and non-slip surfaces there go a long way."
      },
      {
        prompt: "Beyond the environment, what's a key OT contribution to fall prevention?",
        hint: "Think skills, devices, and how she does tasks.",
        type: "single",
        options: [
          { id: "a", text: "Training safe ADL techniques and recommending appropriate assistive devices and footwear" },
          { id: "b", text: "Simply telling her to be more careful" },
          { id: "c", text: "Restricting all of her activity to avoid any risk" },
          { id: "d", text: "Treating falls as purely a medical issue outside OT" }
        ],
        correct: ["a"],
        affirm: "Right — safe technique, devices, and footwear are OT's sweet spot.",
        coach: "Let's choose the option that actually changes how safely she moves.",
        rationale:
          "OT adds <strong>safe task technique, assistive devices, and footwear guidance</strong> on top of environment changes. Vague advice, over-restriction, or treating it as 'not OT' all miss OT's real contribution.",
        teach: "Restricting activity can worsen deconditioning and isolation — safe participation is the goal, not avoidance."
      },
      {
        prompt: "Eleanor is afraid of losing her independence. What's the best approach?",
        hint: "Honor her goal while keeping her safe.",
        type: "single",
        options: [
          { id: "a", text: "Partner with her to keep doing what matters safely, honoring her goal to stay home" },
          { id: "b", text: "Override her wishes in the name of safety" },
          { id: "c", text: "Dismiss her concerns as unrealistic" },
          { id: "d", text: "Tell her to stop bathing and cooking alone without any assessment" }
        ],
        correct: ["a"],
        affirm: "Lovely — you respected her autonomy and her safety together.",
        coach: "Her independence matters deeply to her. Let's find the approach that protects both her and her wishes.",
        rationale:
          "<strong>Client-centered partnership</strong> keeps Eleanor safely engaged in valued occupations at home. Overriding, dismissing, or restricting her without assessment ignores her autonomy and goals.",
        teach: "Autonomy and safety aren't opposites — good OT finds the overlap between them."
      }
    ]
  },

  {
    id: "geri-dementia-01",
    title: "Dementia care and caregiver support",
    area: "Older adults",
    blurb: "Home · ADL cueing, environment, and caregiver education",
    difficulty: "Core",
    domains: ["Intervention", "Practice management"],
    setting: "Home health",
    patient: {
      name: "Harold, 82",
      setting: "Home · moderate Alzheimer's dementia",
      summary:
        "Harold lives with his daughter, who is his main caregiver. He needs more help with daily activities, gets agitated in the late afternoon, and has begun to wander. His daughter is loving but exhausted and overwhelmed."
    },
    steps: [
      {
        prompt: "For daily activities with moderate dementia, what's the best strategy?",
        hint: "Reduce demand and lean on routine.",
        type: "single",
        options: [
          { id: "a", text: "Simplify tasks, use step-by-step cues, and rely on familiar routines" },
          { id: "b", text: "Expect independent multi-step performance without cues" },
          { id: "c", text: "Do all activities for him to save time" },
          { id: "d", text: "Introduce new, complex routines every day" }
        ],
        correct: ["a"],
        affirm: "Yes — simplify, cue, and use routine to support his function.",
        coach: "Let's match the approach to how memory and sequencing change with dementia.",
        rationale:
          "<strong>Task simplification, step-by-step cueing, and consistent routines</strong> support participation in dementia. Expecting unaided multi-step performance sets him up to fail, doing everything for him erodes remaining skills, and constant novelty increases confusion.",
        teach: "Supporting his remaining abilities — not just doing tasks for him — preserves dignity and function longer."
      },
      {
        prompt: "Which environmental strategies support function and reduce agitation? Choose all that apply.",
        hint: "You can select more than one.",
        type: "multi",
        options: [
          { id: "a", text: "Reduce clutter and provide clear visual cues or labels" },
          { id: "b", text: "Keep routines and surroundings consistent and calm" },
          { id: "c", text: "Use safety measures for wandering, like secured doors and ID" },
          { id: "d", text: "Frequently rearrange the home to keep it stimulating" },
          { id: "e", text: "Increase noise and activity in the evening" }
        ],
        correct: ["a", "b", "c"],
        affirm: "Great choices — calm, consistent, and safe.",
        coach: "Let's keep the changes that lower confusion and protect him.",
        rationale:
          "<strong>Reduced clutter with cues, consistency, and wandering safety</strong> support orientation and calm. Rearranging the home and raising evening stimulation tend to worsen confusion and late-day agitation.",
        teach: "Late-day agitation ('sundowning') often eases with a calmer, predictable evening environment."
      },
      {
        prompt: "Harold's daughter is exhausted. What's a core OT role here?",
        hint: "The caregiver is part of the plan.",
        type: "single",
        options: [
          { id: "a", text: "Educate and support the caregiver, including strategies and connecting her to respite and resources" },
          { id: "b", text: "Focus only on Harold and leave his daughter out" },
          { id: "c", text: "Tell her to simply manage on her own" },
          { id: "d", text: "Recommend immediate institutionalization without assessment" }
        ],
        correct: ["a"],
        affirm: "Yes — supporting the caregiver is central, not optional.",
        coach: "Let's remember the caregiver is part of who OT serves here.",
        rationale:
          "<strong>Caregiver education and support</strong> — practical strategies plus respite and resources — is central in dementia care. Ignoring her, leaving her to cope alone, or pushing placement without assessment all fall short.",
        teach: "Caregiver burnout directly affects the client's wellbeing, so supporting her supports Harold too."
      },
      {
        prompt: "Harold becomes agitated during bathing. What's the best response?",
        hint: "Adapt the approach rather than force the task.",
        type: "single",
        options: [
          { id: "a", text: "Adapt the approach — calm setting, familiar routine, simplify steps, offer choices, and reduce triggers" },
          { id: "b", text: "Insist he finish the bath quickly despite his distress" },
          { id: "c", text: "Physically restrain him to complete it" },
          { id: "d", text: "Stop bathing him altogether indefinitely" }
        ],
        correct: ["a"],
        affirm: "Right — adapt the approach to meet him where he is.",
        coach: "Let's find the response that lowers his distress instead of adding to it.",
        rationale:
          "<strong>Adapting the approach</strong> — a calm environment, familiar routine, simplified steps, choices, and fewer triggers — reduces bathing-related agitation. Forcing, restraining, or abandoning hygiene are neither safe nor person-centered.",
        teach: "Offering simple choices ('washcloth or sponge?') can restore a sense of control and reduce resistance."
      }
    ]
  }

];
