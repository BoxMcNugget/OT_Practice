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
    id: "q-eval-img-1", domain: "Evaluation & assessment", type: "single",
    imageAlt: "A goniometer positioned at a joint, its two arms forming a right angle",
    imageSvg: '<svg viewBox="0 0 210 130" width="210" height="130" role="img" aria-label="A goniometer positioned at a joint forming an angle to estimate"><line x1="32" y1="106" x2="192" y2="106" stroke="var(--ink-soft)" stroke-width="3" stroke-linecap="round"/><line x1="32" y1="106" x2="32" y2="20" stroke="var(--ink-soft)" stroke-width="3" stroke-linecap="round"/><path d="M32 74 A32 32 0 0 0 64 106" fill="none" stroke="var(--teal)" stroke-width="3"/><circle cx="32" cy="106" r="4.5" fill="var(--ink-soft)"/><text x="74" y="92" font-size="17" fill="var(--teal-dark)" font-weight="600">?</text></svg>',
    prompt: "A therapist positions a goniometer at a client's elbow as shown. Approximately what angle is being measured?",
    options: [
      { id: "a", text: "About 90 degrees" },
      { id: "b", text: "About 45 degrees" },
      { id: "c", text: "About 135 degrees" },
      { id: "d", text: "About 180 degrees (full extension)" }
    ],
    correct: ["a"],
    affirm: "Yes — the two arms form a right angle, about 90 degrees.",
    coach: "Picture the corner the two arms of the goniometer make.",
    rationale: "The goniometer's arms form a <strong>right angle</strong>, so the joint is at about <strong>90 degrees</strong> of flexion. Reading goniometer angles accurately is a core evaluation skill.",
    teach: "0 degrees is full extension (a straight line); a right angle is 90 degrees of flexion."
  },
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
  },

  /* =========================================================
     CHALLENGE TIER — every option is plausible; pick the BEST.
     ========================================================= */

  /* ---------- Evaluation & assessment ---------- */
  {
    id: "cq-eval-1", domain: "Evaluation & assessment", type: "single", difficulty: "Challenge",
    prompt: "A client with a right CVA is impulsive, overestimates their abilities, and already had one fall trying to transfer alone. Before formal standardized testing, what is the MOST important initial focus of the OT's evaluation?",
    options: [
      { id: "a", text: "Safety awareness and the level of supervision the client needs during functional tasks" },
      { id: "b", text: "A full visual-perceptual battery to explain the impulsivity" },
      { id: "c", text: "Manual muscle testing of all four extremities" },
      { id: "d", text: "Standing balance measured with a formal scale" }
    ],
    correct: ["a"],
    affirm: "Yes — with impulsivity and a fall already, safety leads.",
    coach: "All of these are real parts of an evaluation. Let's think about what can't wait.",
    rationale: "With impulsivity and a fall history, the immediate priority is <strong>safety and supervision needs during real tasks</strong>. The other assessments matter, but they don't address the active risk in front of you first.",
    teach: "On the exam, an active safety risk almost always outranks gathering more data."
  },
  {
    id: "cq-eval-2", domain: "Evaluation & assessment", type: "single", difficulty: "Challenge",
    prompt: "You want to measure change in how well a client actually performs a valued activity over an episode of care, capturing their own priorities and satisfaction. Which tool is the BEST fit?",
    options: [
      { id: "a", text: "Canadian Occupational Performance Measure (COPM)" },
      { id: "b", text: "Functional Independence Measure (FIM)" },
      { id: "c", text: "Barthel Index" },
      { id: "d", text: "Role Checklist" }
    ],
    correct: ["a"],
    affirm: "Right — the COPM centers the client's own priorities and satisfaction.",
    coach: "Several of these measure function. Let's find the one built around the client's own priorities and satisfaction.",
    rationale: "The <strong>COPM</strong> captures client-identified priorities plus their rating of performance and satisfaction, and it's designed to detect change. The FIM and Barthel measure level of independence, and the Role Checklist looks at roles — none capture perceived satisfaction with a chosen activity.",
    teach: "When a stem stresses the client's own perception and priorities, think COPM."
  },
  {
    id: "cq-eval-3", domain: "Evaluation & assessment", type: "single", difficulty: "Challenge",
    prompt: "A client with a recent TBI performs well on structured, quiet cognitive tasks but becomes disorganized and off-task in the busy clinic gym. What does this discrepancy MOST strongly indicate?",
    options: [
      { id: "a", text: "The need to assess performance in varied, real-world contexts, not just a quiet room" },
      { id: "b", text: "That cognition is essentially intact because structured performance was good" },
      { id: "c", text: "That the structured test should simply be re-scored" },
      { id: "d", text: "That further assessment should be deferred until the client improves" }
    ],
    correct: ["a"],
    affirm: "Exactly — context changes performance, so assess across contexts.",
    coach: "Notice the gap between the quiet room and the busy gym. What does that tell us about where to assess?",
    rationale: "Performance that falls apart with real-world demands points to the value of <strong>ecological, context-based assessment</strong>. A quiet-room score alone can overestimate everyday function after TBI.",
    teach: "Real environments reveal executive and attention demands that structured tests hide."
  },
  {
    id: "cq-eval-4", domain: "Evaluation & assessment", type: "multi", difficulty: "Challenge",
    prompt: "Which conditions make it appropriate to use a standardized assessment as intended? Choose all that apply.",
    options: [
      { id: "a", text: "It has established reliability and validity" },
      { id: "b", text: "It was normed on a population similar to your client" },
      { id: "c", text: "It's administered following the standardized procedure" },
      { id: "d", text: "It's simply the quickest tool available, regardless of fit" },
      { id: "e", text: "You modify the instructions mid-test to help the client score higher" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Well reasoned — validity, appropriate norms, and faithful administration.",
    coach: "A few of these sound helpful but quietly undermine the results. Let's sort them out.",
    rationale: "A standardized tool is appropriate when it's <strong>reliable and valid, normed on a similar population, and given exactly as designed</strong>. Choosing purely by speed, or altering the procedure, invalidates the scores — even when the intent is kind.",
    teach: "Changing standardized instructions to help a client is a classic 'nice but wrong' trap."
  },
  {
    id: "cq-eval-5", domain: "Evaluation & assessment", type: "single", difficulty: "Challenge",
    prompt: "A home-health OT arrives to evaluate an older adult after a hip fracture. The client is alone, short of breath at rest, and newly confused since yesterday. What should the OT do FIRST?",
    options: [
      { id: "a", text: "Address the acute change in condition by contacting the medical provider / seeking medical attention" },
      { id: "b", text: "Proceed with the planned ADL evaluation" },
      { id: "c", text: "Begin hip-precaution education" },
      { id: "d", text: "Set up adaptive equipment for dressing" }
    ],
    correct: ["a"],
    affirm: "Yes — new dyspnea plus new confusion is a medical red flag.",
    coach: "The plan was to evaluate ADLs, but something more urgent is happening. Let's respond to that first.",
    rationale: "New shortness of breath with new-onset confusion signals a possible acute medical emergency. The OT's first responsibility is to <strong>get the client appropriate medical attention</strong> before continuing the planned evaluation.",
    teach: "A sudden change in medical status overrides the scheduled agenda every time."
  },

  /* ---------- Analysis & planning ---------- */
  {
    id: "cq-plan-1", domain: "Analysis & planning", type: "single", difficulty: "Challenge",
    prompt: "Which is the BEST-written short-term goal?",
    options: [
      { id: "a", text: "Within 2 weeks, the client will don a button-up shirt with setup assistance using adaptive techniques in 3 of 4 trials." },
      { id: "b", text: "The client will improve upper-extremity strength." },
      { id: "c", text: "The client will be independent in all ADLs." },
      { id: "d", text: "The therapist will provide dressing training twice weekly." }
    ],
    correct: ["a"],
    affirm: "Right — measurable, time-bound, occupation-based, and about the client.",
    coach: "They all look goal-ish. Let's check each against measurable, meaningful, and client-centered.",
    rationale: "Option A is <strong>specific, measurable, time-bound, occupation-based, and client-centered</strong>. B isn't measurable, C isn't realistic or time-bound, and D describes the therapist's action rather than the client's outcome.",
    teach: "A strong goal names who, does what, under what conditions, how well, and by when."
  },
  {
    id: "cq-plan-2", domain: "Analysis & planning", type: "single", difficulty: "Challenge",
    prompt: "A client refuses a shower chair, saying it makes them 'feel old,' even though it would improve safety. The OT explores what bathing independence means to the client's identity and life story, then adjusts the approach. This BEST reflects which type of reasoning?",
    options: [
      { id: "a", text: "Narrative reasoning" },
      { id: "b", text: "Procedural (scientific) reasoning" },
      { id: "c", text: "Pragmatic reasoning" },
      { id: "d", text: "Interactive reasoning" }
    ],
    correct: ["a"],
    affirm: "Yes — you're reasoning through the client's story and meaning.",
    coach: "Several reasoning types are close. Focus on what the OT is actually attending to here.",
    rationale: "Attending to the <strong>meaning and identity</strong> bound up in the client's story is <strong>narrative reasoning</strong>. Procedural reasoning targets the condition, pragmatic reasoning weighs practical constraints, and interactive reasoning focuses on the therapist–client interaction itself.",
    teach: "Narrative reasoning asks, 'What does this mean in the story of this person's life?'"
  },
  {
    id: "cq-plan-3", domain: "Analysis & planning", type: "single", difficulty: "Challenge",
    prompt: "A client with severe rheumatoid arthritis and painful, deforming hand joints wants to keep cooking. The OT provides built-up-handle utensils and a jar opener. This intervention is BEST described as:",
    options: [
      { id: "a", text: "Adaptation (compensation) with joint protection" },
      { id: "b", text: "Remediation of hand strength" },
      { id: "c", text: "Grading the activity to be more challenging" },
      { id: "d", text: "Preventing all future joint damage" }
    ],
    correct: ["a"],
    affirm: "Right — you changed the tools to fit the client, protecting the joints.",
    coach: "Think about whether the OT is changing the client or changing the task/tools.",
    rationale: "Modifying the tools so the task fits the client is <strong>adaptation/compensation</strong>, and larger handles reduce joint stress (joint protection). It isn't remediation (nothing is being restored), and it doesn't 'prevent all' damage.",
    teach: "In progressive conditions like RA, compensation and joint protection often lead over remediation."
  },
  {
    id: "cq-plan-4", domain: "Analysis & planning", type: "multi", difficulty: "Challenge",
    prompt: "A client post-stroke has left neglect, shoulder subluxation, impaired sitting balance, and low mood. Which principles should guide how you prioritize intervention? Choose all that apply.",
    options: [
      { id: "a", text: "Prioritize issues affecting safety, such as neglect and balance during transfers" },
      { id: "b", text: "Prioritize what most limits the client's valued occupational participation" },
      { id: "c", text: "Collaborate with the client on what matters most to them" },
      { id: "d", text: "Always treat impairments in head-to-toe anatomical order" },
      { id: "e", text: "Work only on the impairment that's easiest to measure" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Nicely done — safety, meaning, and the client's voice.",
    coach: "Two of these are rules that ignore the individual. Let's keep the client-centered ones.",
    rationale: "Prioritization is guided by <strong>safety, impact on valued participation, and the client's own priorities</strong>. Rigid anatomical order or picking the easiest-to-measure problem ignores what actually matters to this person.",
    teach: "'Safety, meaning, and the client's voice' is a reliable prioritization lens."
  },
  {
    id: "cq-plan-5", domain: "Analysis & planning", type: "single", difficulty: "Challenge",
    prompt: "Discharge is approaching and a client hasn't met a long-term ADL goal, though they've made steady progress. What is the MOST appropriate clinical action?",
    options: [
      { id: "a", text: "Re-evaluate and revise the goals and plan based on current status and the discharge setting" },
      { id: "b", text: "Document 'goal not met' and discontinue services without changes" },
      { id: "c", text: "Keep the same plan unchanged and hope for improvement" },
      { id: "d", text: "Extend therapy indefinitely regardless of setting constraints" }
    ],
    correct: ["a"],
    affirm: "Yes — reassess and adjust the plan to fit where the client is now.",
    coach: "Progress is real but the goal shifted out of reach in this setting. What's the responsive move?",
    rationale: "When progress is steady but a goal isn't met, you <strong>reassess and revise</strong> — update goals, plan next-level care, and set up a home program suited to the discharge context. Simply stopping, standing pat, or extending forever all ignore the client's actual trajectory.",
    teach: "Plans are living documents; revising them is good practice, not failure."
  },

  /* ---------- Intervention ---------- */
  {
    id: "cq-int-1", domain: "Intervention", type: "single", difficulty: "Challenge",
    prompt: "A client is 2 days after open-heart surgery with sternal precautions. During upper-body dressing they report lightheadedness, and you notice pallor and sweating. What is the MOST appropriate immediate action?",
    options: [
      { id: "a", text: "Stop the activity, have the client rest, and monitor for signs of distress and vital-sign changes" },
      { id: "b", text: "Switch to a front-button shirt to reduce shoulder motion" },
      { id: "c", text: "Add energy-conservation strategies and continue more slowly" },
      { id: "d", text: "Have the client quickly finish dressing, then rest" }
    ],
    correct: ["a"],
    affirm: "Right — those are signs of distress, so you stop and monitor.",
    coach: "Every option is something an OT might do. Which one puts safety first, right now?",
    rationale: "Lightheadedness with pallor and diaphoresis suggests cardiovascular distress. The immediate action is to <strong>stop, rest, and monitor</strong>. B, C, and D all keep the client working through concerning symptoms.",
    teach: "When distress signs appear, stop first — modify the task afterward, once it's safe."
  },
  {
    id: "cq-int-2", domain: "Intervention", type: "single", difficulty: "Challenge",
    prompt: "A client 3 weeks post-stroke has emerging movement returning in the affected arm and is motivated to use it. Which intervention approach is MOST appropriate to prioritize at this stage?",
    options: [
      { id: "a", text: "Task-oriented training that encourages active use of the affected arm" },
      { id: "b", text: "Teach one-handed techniques and provide adaptive equipment to compensate" },
      { id: "c", text: "Rest the affected arm and focus only on the unaffected side" },
      { id: "d", text: "Provide a mobile arm support for all activities" }
    ],
    correct: ["a"],
    affirm: "Yes — with return emerging early, prioritize active use and recovery.",
    coach: "One-handed techniques are classic stroke OT — but read the stage and the client's potential closely.",
    rationale: "With <strong>emerging motor return early after stroke</strong> and a motivated client, prioritize <strong>restorative, task-oriented use of the affected arm</strong> to promote recovery and prevent learned nonuse. Compensation is appropriate later or once recovery plateaus — here it could reinforce nonuse.",
    teach: "Match the approach to the stage: restore while return is emerging, compensate when it plateaus."
  },
  {
    id: "cq-int-3", domain: "Intervention", type: "single", difficulty: "Challenge",
    prompt: "A client has a new radial nerve palsy ('wrist drop') after a humeral fracture. Which orthosis is MOST appropriate to support function while nerve recovery is awaited?",
    options: [
      { id: "a", text: "A wrist-extension orthosis that positions the wrist and supports grasp" },
      { id: "b", text: "A resting orthosis holding the wrist in flexion" },
      { id: "c", text: "A thumb spica orthosis for the CMC joint" },
      { id: "d", text: "No orthosis; let the wrist drop to stretch the extensors" }
    ],
    correct: ["a"],
    affirm: "Right — support extension to restore function and protect the muscles.",
    coach: "Picture what 'wrist drop' means, then choose the position that helps.",
    rationale: "Radial nerve palsy causes loss of wrist and finger extension, so a <strong>wrist-extension orthosis</strong> substitutes for the extensors, enables grasp, and prevents overstretch/contracture. Flexion is the wrong direction, a thumb spica addresses a different problem, and leaving it dropped risks contracture.",
    teach: "Support the motion the nerve can't produce — here, wrist and finger extension."
  },
  {
    id: "cq-int-4", domain: "Intervention", type: "multi", difficulty: "Challenge",
    prompt: "A client with COPD wants to prepare a simple meal without becoming short of breath. Which strategies are MOST appropriate? Choose all that apply.",
    options: [
      { id: "a", text: "Sit to work and keep supplies within easy reach to reduce exertion" },
      { id: "b", text: "Use pursed-lip breathing and pace tasks with rest breaks" },
      { id: "c", text: "Do the cooking during their highest-energy time of day" },
      { id: "d", text: "Hold their breath during exertion to work faster" },
      { id: "e", text: "Complete every step standing and quickly to get it over with" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Great — sit, breathe, pace, and time it well.",
    coach: "Two of these quietly work against the breathing. Let's keep the ones that conserve energy.",
    rationale: "Energy conservation and breathing control — <strong>sitting, reaching less, pursed-lip breathing, pacing, and using peak-energy times</strong> — reduce breathlessness. Holding the breath or rushing while standing increases exertion and shortness of breath.",
    teach: "Breath-holding during exertion is contraindicated in COPD — exhale on effort instead."
  },
  {
    id: "cq-int-5", domain: "Intervention", type: "single", difficulty: "Challenge",
    prompt: "On an inpatient psychiatric unit, a client in acute mania is highly distractible, over-stimulated, and unable to finish tasks. Which OT intervention is MOST appropriate?",
    options: [
      { id: "a", text: "A structured, low-stimulation activity that is short and can be finished successfully" },
      { id: "b", text: "An open-ended, highly creative group project with many choices" },
      { id: "c", text: "Having the client lead a large, fast-paced group game" },
      { id: "d", text: "A complex multi-step task to channel the extra energy" }
    ],
    correct: ["a"],
    affirm: "Right — reduce stimulation and offer short, achievable structure.",
    coach: "Think about whether to add or reduce stimulation for someone who's already over-stimulated.",
    rationale: "In acute mania, the goal is to <strong>reduce stimulation and provide structure</strong> with short, attainable tasks. Open-ended, fast-paced, or complex activities add stimulation and set the client up to be unable to complete them.",
    teach: "Match the demand to the state: less stimulation and more structure during mania."
  },

  /* ---------- Competency & ethics ---------- */
  {
    id: "cq-eth-1", domain: "Competency & ethics", type: "single", difficulty: "Challenge",
    prompt: "An OTA tells the supervising OT they feel uncomfortable performing a specific advanced intervention that was delegated, because they haven't been trained in it. What should the OT do?",
    options: [
      { id: "a", text: "Not delegate that task until competency is established, or perform it themselves" },
      { id: "b", text: "Tell the OTA to do it anyway, since the OT is ultimately responsible" },
      { id: "c", text: "Report the OTA for refusing an assignment" },
      { id: "d", text: "Remove the needed intervention from the plan to sidestep the issue" }
    ],
    correct: ["a"],
    affirm: "Right — delegation has to match competence.",
    coach: "The OT is responsible — but that cuts a particular way here. Let's think about competence.",
    rationale: "Delegation must match the OTA's <strong>demonstrated competence</strong>. The OT should provide training/verify competency or do it themselves. Forcing it is unsafe, reporting is punitive, and dropping needed care shortchanges the client.",
    teach: "Being 'responsible' means ensuring competence, not overriding a valid safety concern."
  },
  {
    id: "cq-eth-2", domain: "Competency & ethics", type: "single", difficulty: "Challenge",
    prompt: "A client insists on walking to the bathroom alone despite a high fall risk and instructions to call for help. The OT feels torn between honoring the client's wishes and preventing harm. This tension is BEST described as a conflict between:",
    options: [
      { id: "a", text: "Autonomy and nonmaleficence" },
      { id: "b", text: "Justice and fidelity" },
      { id: "c", text: "Beneficence and veracity" },
      { id: "d", text: "Autonomy and justice" }
    ],
    correct: ["a"],
    affirm: "Exactly — self-determination versus avoiding harm.",
    coach: "Name the two forces: the client's right to choose, and the duty to prevent harm.",
    rationale: "The client's right to decide is <strong>autonomy</strong>; the duty to avoid harm is <strong>nonmaleficence</strong>. Justice (fairness), fidelity (loyalty), beneficence (doing good), and veracity (truthfulness) aren't the core of this particular conflict.",
    teach: "Knowing the principles by name — not just their definitions — is what these items test."
  },
  {
    id: "cq-eth-3", domain: "Competency & ethics", type: "single", difficulty: "Challenge",
    prompt: "An OT realizes they documented and billed a 30-minute treatment, but the session was only 15 minutes because the client tired early. What is the MOST appropriate action?",
    options: [
      { id: "a", text: "Correct the documentation and billing to reflect the actual time and service" },
      { id: "b", text: "Leave it, since the plan called for 30 minutes" },
      { id: "c", text: "Add extra minutes at the next visit to make up the billing" },
      { id: "d", text: "Ask the client not to mention the shorter session" }
    ],
    correct: ["a"],
    affirm: "Right — correct it to match what actually happened.",
    coach: "The plan and the reality differ. Which choice keeps your documentation truthful?",
    rationale: "Documentation and billing must reflect <strong>what actually occurred</strong> (veracity and integrity). Leaving it, 'making it up' later, or concealing it are forms of fraud.",
    teach: "Bill and document the service delivered — not the service planned."
  },
  {
    id: "cq-eth-4", domain: "Competency & ethics", type: "multi", difficulty: "Challenge",
    prompt: "A new intervention is trending on social media. Before using it with a client, an ethical, competent practitioner should: Choose all that apply.",
    options: [
      { id: "a", text: "Evaluate the evidence for its effectiveness and safety" },
      { id: "b", text: "Confirm it's within their scope and competence" },
      { id: "c", text: "Consider whether it fits this client's needs and goals" },
      { id: "d", text: "Adopt it right away because it's popular" },
      { id: "e", text: "Use it without consent because it seems harmless" }
    ],
    correct: ["a", "b", "c"],
    affirm: "Great — evidence, scope, and client fit.",
    coach: "Popularity and 'seems harmless' are tempting shortcuts. Let's keep the sound steps.",
    rationale: "Sound practice weighs the <strong>evidence, the practitioner's scope/competence, and the fit for this client's goals</strong>, with informed consent. Popularity is not evidence, and 'harmless-looking' never replaces consent.",
    teach: "Evidence + scope + client fit + consent is the gate every new technique passes through."
  },
  {
    id: "cq-eth-5", domain: "Competency & ethics", type: "single", difficulty: "Challenge",
    prompt: "During a home visit, an OT notices signs strongly suggesting an older client is being neglected by a caregiver (poor hygiene, unexplained weight loss, fearfulness around the caregiver). What is the MOST appropriate action?",
    options: [
      { id: "a", text: "Follow mandatory-reporting duties and report the suspected neglect to the appropriate authority" },
      { id: "b", text: "Confront the caregiver directly and demand an explanation" },
      { id: "c", text: "Say nothing, in case the OT is mistaken" },
      { id: "d", text: "Wait a few weeks to see whether the situation resolves on its own" }
    ],
    correct: ["a"],
    affirm: "Right — suspected neglect triggers your duty to report.",
    coach: "This is a hard, human moment. Let's focus on the client's safety and your legal duty.",
    rationale: "OTs are typically <strong>mandated reporters</strong>: suspected abuse or neglect must be reported to the appropriate authority — you don't need proof, only reasonable suspicion. Confronting the caregiver can escalate risk, and silence or waiting fails a vulnerable client.",
    teach: "Reasonable suspicion is the threshold to report — investigating isn't your job, protecting the client is."
  }

];
