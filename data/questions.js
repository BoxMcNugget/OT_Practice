/* =========================================================
   Praxis · practice questions
   ---------------------------------------------------------
   DRAFT CONTENT — original questions to practice active recall
   and clinical reasoning. Not reviewed by a licensed OT; verify
   before relying on any item. Add freely — same shape as below.
   Options are shuffled when displayed.
   ========================================================= */

window.PRAXIS_QUESTIONS = [

  /* ---------- Evaluation & assessment ---------- */
  {
    id: "q-eval-1", domain: "Evaluation & assessment", type: "single",
    prompt: "What's the first step in the occupational therapy process with a new client?",
    options: [
      { id: "a", text: "Establish an occupational profile" },
      { id: "b", text: "Begin intervention right away" },
      { id: "c", text: "Order a standardized test for every area" },
      { id: "d", text: "Start discharge planning" }
    ],
    correct: ["a"],
    affirm: "Yes — the occupational profile comes first.",
    coach: "Let's start where the OT process starts.",
    rationale: "The OT process begins with the <strong>occupational profile</strong> — the client's history, roles, routines, and priorities — which guides everything after it.",
    teach: "It's what keeps therapy centered on what matters to the client."
  },
  {
    id: "q-eval-2", domain: "Evaluation & assessment", type: "single",
    prompt: "You want to capture a client's own view of how well they perform daily activities and how satisfied they are. Which assessment fits best?",
    options: [
      { id: "a", text: "Canadian Occupational Performance Measure (COPM)" },
      { id: "b", text: "Manual muscle testing" },
      { id: "c", text: "Goniometry" },
      { id: "d", text: "Grip dynamometer" }
    ],
    correct: ["a"],
    affirm: "Right — the COPM is client-perceived performance and satisfaction.",
    coach: "Let's match the tool to what you're measuring: the client's own perception.",
    rationale: "The <strong>COPM</strong> is a client-centered measure of perceived performance and satisfaction in self-care, productivity, and leisure. The others measure body functions, not perception.",
    teach: "Client-rated measures are great for setting meaningful, collaborative goals."
  },
  {
    id: "q-eval-3", domain: "Evaluation & assessment", type: "single",
    prompt: "Goniometry is used to measure:",
    options: [
      { id: "a", text: "Joint range of motion" },
      { id: "b", text: "Muscle strength" },
      { id: "c", text: "Light-touch sensation" },
      { id: "d", text: "Cognitive status" }
    ],
    correct: ["a"],
    affirm: "Correct — a goniometer measures range of motion.",
    coach: "Let's connect the tool to what it actually measures.",
    rationale: "A <strong>goniometer</strong> measures <strong>joint range of motion</strong> in degrees. Strength is manual muscle testing, sensation uses monofilaments, and cognition uses screens like the MoCA.",
    teach: "Pairing each tool with its purpose is a quick, high-yield thing to memorize."
  },
  {
    id: "q-eval-4", domain: "Evaluation & assessment", type: "multi",
    prompt: "A client after a stroke needs a cognitive screen. Which tools assess cognition? Choose all that apply.",
    options: [
      { id: "a", text: "Montreal Cognitive Assessment (MoCA)" },
      { id: "b", text: "Mini-Mental State Examination (MMSE)" },
      { id: "c", text: "Allen Cognitive Level Screen" },
      { id: "d", text: "Grip dynamometer" },
      { id: "e", text: "Goniometer" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Nicely done — all three screen cognition.",
    coach: "Let's separate the cognitive screens from the physical measures.",
    rationale: "The <strong>MoCA, MMSE, and Allen Cognitive Level Screen</strong> assess cognition. A dynamometer measures grip strength and a goniometer measures range of motion.",
    teach: "Knowing which tools go with which domain saves time on the exam."
  },
  {
    id: "q-eval-5", domain: "Evaluation & assessment", type: "single",
    prompt: "What's the best way to evaluate a client's home safety?",
    options: [
      { id: "a", text: "An in-home evaluation observing performance in context" },
      { id: "b", text: "A brief phone questionnaire only" },
      { id: "c", text: "Assuming the standard set of hazards" },
      { id: "d", text: "Skipping it if the client says they feel safe" }
    ],
    correct: ["a"],
    affirm: "Yes — context-based observation reveals the real risks.",
    coach: "Let's choose the option that shows how the client actually functions at home.",
    rationale: "An <strong>in-home evaluation with observation</strong> surfaces real, modifiable hazards that a questionnaire or assumptions would miss.",
    teach: "Watching the client move through their own space is far richer than any checklist alone."
  },

  /* ---------- Analysis & planning ---------- */
  {
    id: "q-plan-1", domain: "Analysis & planning", type: "single",
    prompt: "Well-written OT goals are best described as:",
    options: [
      { id: "a", text: "Client-centered, measurable, and occupation-based" },
      { id: "b", text: "Vague and open-ended" },
      { id: "c", text: "Focused only on impairments" },
      { id: "d", text: "Set without the client's input" }
    ],
    correct: ["a"],
    affirm: "Exactly — client-centered, measurable, occupation-based.",
    coach: "Let's think about what makes a goal useful and trackable.",
    rationale: "Strong goals are <strong>client-centered, measurable, and tied to occupation</strong>, so progress is clear and meaningful. Impairment-only or vague goals don't guide practice well.",
    teach: "Occupation-based goals keep the plan connected to the client's real life."
  },
  {
    id: "q-plan-2", domain: "Analysis & planning", type: "single",
    prompt: "Activity analysis is used to:",
    options: [
      { id: "a", text: "Break an activity into its components and demands" },
      { id: "b", text: "Diagnose a medical condition" },
      { id: "c", text: "Replace the occupational profile" },
      { id: "d", text: "Measure vital signs" }
    ],
    correct: ["a"],
    affirm: "Right — it breaks a task down into its demands.",
    coach: "Let's recall what activity analysis is for.",
    rationale: "<strong>Activity analysis</strong> examines the steps, skills, and demands of an activity, which helps you grade, adapt, and match it to the client.",
    teach: "It's a core OT skill — understanding a task deeply lets you modify it precisely."
  },
  {
    id: "q-plan-3", domain: "Analysis & planning", type: "single",
    prompt: "To grade an activity to make it easier for a struggling client, a therapist might:",
    options: [
      { id: "a", text: "Reduce the number of steps or add support" },
      { id: "b", text: "Add resistance and complexity" },
      { id: "c", text: "Remove all cues and supports" },
      { id: "d", text: "Increase the pace and time pressure" }
    ],
    correct: ["a"],
    affirm: "Yes — fewer steps or more support makes it achievable.",
    coach: "Let's think about which direction 'easier' means when grading.",
    rationale: "Grading an activity <strong>down</strong> — fewer steps, more support, less resistance — makes it achievable and builds success. Adding demand grades it up.",
    teach: "Grading up or down lets one activity fit many ability levels."
  },
  {
    id: "q-plan-4", domain: "Analysis & planning", type: "single",
    prompt: "A well-chosen long-term goal after a hand injury should focus on:",
    options: [
      { id: "a", text: "Returning to a meaningful occupation or role" },
      { id: "b", text: "A single range-of-motion number in isolation" },
      { id: "c", text: "The therapist's scheduling convenience" },
      { id: "d", text: "Passive modalities alone" }
    ],
    correct: ["a"],
    affirm: "Right — the goal points toward meaningful participation.",
    coach: "Let's aim the long-term goal at what the client is working toward.",
    rationale: "Long-term goals target <strong>meaningful occupation and roles</strong> (e.g., returning to work or a hobby). Isolated measures are short-term steps toward that.",
    teach: "Tying goals to real roles is what makes them motivating."
  },
  {
    id: "q-plan-5", domain: "Analysis & planning", type: "multi",
    prompt: "Sound clinical reasoning draws on which of these? Choose all that apply.",
    options: [
      { id: "a", text: "Scientific reasoning (evidence and diagnosis-related knowledge)" },
      { id: "b", text: "Narrative reasoning (the client's story and meaning)" },
      { id: "c", text: "Pragmatic reasoning (context and practical constraints)" },
      { id: "d", text: "Guessing without considering the client" },
      { id: "e", text: "Ignoring the client's context" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Great — scientific, narrative, and pragmatic reasoning together.",
    coach: "Let's keep the reasoning types and drop the non-reasoning options.",
    rationale: "Skilled practice blends <strong>scientific, narrative, and pragmatic reasoning</strong>, weighing evidence, the client's story, and real-world constraints together.",
    teach: "Good therapists move fluidly among these rather than relying on just one."
  },

  /* ---------- Intervention ---------- */
  {
    id: "q-int-1", domain: "Intervention", type: "single",
    prompt: "Energy conservation techniques are most appropriate for a client with:",
    options: [
      { id: "a", text: "Multiple sclerosis experiencing fatigue" },
      { id: "b", text: "A minor, healed wrist sprain and no limitations" },
      { id: "c", text: "No functional difficulties at all" },
      { id: "d", text: "Only a short-term cognitive goal" }
    ],
    correct: ["a"],
    affirm: "Yes — fatigue conditions like MS are a classic fit.",
    coach: "Let's think about who benefits most from conserving energy.",
    rationale: "<strong>Energy conservation</strong> (pace, plan, prioritize, position) helps clients with fatigue-related conditions such as MS, cardiac, or pulmonary disease participate more fully.",
    teach: "The '4 P's' — pace, plan, prioritize, position — are an easy way to remember it."
  },
  {
    id: "q-int-2", domain: "Intervention", type: "single",
    prompt: "For a client with C6 tetraplegia, a universal cuff is used to:",
    options: [
      { id: "a", text: "Hold utensils or tools without needing finger grip" },
      { id: "b", text: "Improve unsupported sitting balance" },
      { id: "c", text: "Measure hand strength" },
      { id: "d", text: "Replace the need for a wheelchair" }
    ],
    correct: ["a"],
    affirm: "Right — it holds items across the palm without grip.",
    coach: "Let's match the device to what it does for someone without grip.",
    rationale: "A <strong>universal cuff</strong> holds a utensil or tool across the palm so a client without functional grip (like C6) can feed, groom, or write.",
    teach: "It pairs well with tenodesis training to maximize independence."
  },
  {
    id: "q-int-3", domain: "Intervention", type: "single",
    prompt: "After a posterior total hip replacement, the client should avoid:",
    options: [
      { id: "a", text: "Bending the hip beyond 90 degrees" },
      { id: "b", text: "Ankle pumps" },
      { id: "c", text: "Deep breathing exercises" },
      { id: "d", text: "Bending the elbow" }
    ],
    correct: ["a"],
    affirm: "Correct — no hip flexion past 90 degrees.",
    coach: "Let's recall the posterior hip precautions.",
    rationale: "Posterior hip precautions avoid <strong>flexion past 90°</strong>, adduction past midline, and internal rotation. Ankle pumps and breathing are safe and encouraged.",
    teach: "Long-handled equipment helps clients dress without breaking the 90° rule."
  },
  {
    id: "q-int-4", domain: "Intervention", type: "multi",
    prompt: "Which strategies support a client with low vision? Choose all that apply.",
    options: [
      { id: "a", text: "Increase contrast (e.g., dark plate on a light table)" },
      { id: "b", text: "Improve lighting and reduce glare" },
      { id: "c", text: "Use tactile markers or large-print labels" },
      { id: "d", text: "Remove lighting to reduce stimulation" },
      { id: "e", text: "Require fine visual discrimination for every task" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Great set — contrast, lighting, and tactile cues all help.",
    coach: "Let's keep the strategies that make things easier to see or feel.",
    rationale: "Low-vision strategies boost <strong>contrast, lighting, and tactile/large-print cues</strong>. Removing light or demanding fine visual detail makes tasks harder.",
    teach: "Contrast and lighting are simple, high-impact changes in the home."
  },
  {
    id: "q-int-5", domain: "Intervention", type: "single",
    prompt: "Gradually reintroducing a client to a feared but valued activity is called:",
    options: [
      { id: "a", text: "Graded engagement (graded exposure)" },
      { id: "b", text: "Complete avoidance" },
      { id: "c", text: "Passive range of motion" },
      { id: "d", text: "Physical restraint" }
    ],
    correct: ["a"],
    affirm: "Yes — that's graded engagement.",
    coach: "Let's name the approach of easing back in step by step.",
    rationale: "<strong>Graded engagement</strong> reintroduces a valued activity in manageable steps, building confidence and reducing avoidance — useful in anxiety and many other areas.",
    teach: "It fits OT's occupation-based lens perfectly."
  },

  /* ---------- Competency & ethics ---------- */
  {
    id: "q-eth-1", domain: "Competency & ethics", type: "single",
    prompt: "An OT may delegate a task to an occupational therapy assistant (OTA) when:",
    options: [
      { id: "a", text: "The task is within the OTA's competence and appropriately supervised" },
      { id: "b", text: "Never, under any circumstances" },
      { id: "c", text: "The OT is busy, regardless of the OTA's competence" },
      { id: "d", text: "The client asks, regardless of safety" }
    ],
    correct: ["a"],
    affirm: "Right — competence plus appropriate supervision.",
    coach: "Let's recall the conditions for safe, ethical delegation.",
    rationale: "Delegation is appropriate when the task is <strong>within the OTA's competence and properly supervised</strong>. The OT remains responsible for the overall plan.",
    teach: "Supervision requirements vary by setting and regulation — worth knowing your state's rules."
  },
  {
    id: "q-eth-2", domain: "Competency & ethics", type: "single",
    prompt: "OT documentation should be:",
    options: [
      { id: "a", text: "Accurate, timely, and objective" },
      { id: "b", text: "Vague to save time" },
      { id: "c", text: "Adjusted to match desired billing" },
      { id: "d", text: "Written from memory weeks later" }
    ],
    correct: ["a"],
    affirm: "Yes — accurate, timely, objective.",
    coach: "Let's think about what makes documentation trustworthy.",
    rationale: "Good documentation is <strong>accurate, timely, and objective</strong>. It supports care continuity, reimbursement, and ethical, legal practice.",
    teach: "If it isn't documented, it effectively didn't happen — for billing and legal purposes."
  },
  {
    id: "q-eth-3", domain: "Competency & ethics", type: "single",
    prompt: "Respecting a client's right to make their own decisions reflects the ethical principle of:",
    options: [
      { id: "a", text: "Autonomy" },
      { id: "b", text: "Beneficence" },
      { id: "c", text: "Nonmaleficence" },
      { id: "d", text: "Fidelity" }
    ],
    correct: ["a"],
    affirm: "Correct — that's autonomy.",
    coach: "Let's match the principle to its meaning.",
    rationale: "<strong>Autonomy</strong> is respecting a client's right to self-determination. Beneficence is doing good, nonmaleficence is avoiding harm, and fidelity is faithfulness/loyalty.",
    teach: "The core principles come up often — a quick memorize pays off."
  },
  {
    id: "q-eth-4", domain: "Competency & ethics", type: "single",
    prompt: "If asked to perform a procedure outside your competence, the right action is to:",
    options: [
      { id: "a", text: "Decline and seek training, supervision, or refer" },
      { id: "b", text: "Do it anyway to please your employer" },
      { id: "c", text: "Attempt it and hope for the best" },
      { id: "d", text: "Bill for it regardless of the outcome" }
    ],
    correct: ["a"],
    affirm: "Yes — practice within your competence and get support.",
    coach: "Let's choose the response that keeps the client safe and practice ethical.",
    rationale: "Practitioners must work <strong>within their competence</strong>. If a task exceeds it, seek training or supervision, or refer — never proceed unprepared.",
    teach: "Recognizing the edge of your competence is itself a mark of competence."
  },
  {
    id: "q-eth-5", domain: "Competency & ethics", type: "multi",
    prompt: "Maintaining professional competence includes which of these? Choose all that apply.",
    options: [
      { id: "a", text: "Continuing education" },
      { id: "b", text: "Using evidence-based practice" },
      { id: "c", text: "Reflecting on and improving your practice" },
      { id: "d", text: "Never updating your knowledge after graduation" },
      { id: "e", text: "Ignoring new clinical guidelines" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Great — lifelong learning, evidence, and reflection.",
    coach: "Let's keep the habits that keep a clinician sharp.",
    rationale: "Competence is maintained through <strong>continuing education, evidence-based practice, and reflection</strong>. Practice and knowledge evolve, so learning never really stops.",
    teach: "Boards and licensure both expect ongoing competence, not a one-time bar."
  }

];
