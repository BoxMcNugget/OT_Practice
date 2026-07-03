/* =========================================================
   Praxis · clinical simulations (CST-style)
   ---------------------------------------------------------
   Mirrors the NBCOT Clinical Simulation Test format: an opening
   scene, then sections where the candidate selects the actions
   they'd take from a long list. Each action reveals a result and
   carries a score: appropriate actions earn points, harmful or
   contraindicated actions lose points, neutral ones are zero.

   DRAFT CONTENT — clinically plausible but NOT verified by a
   licensed OT. Verify before relying on it.

   Model:
   {
     id, title, area, difficulty, blurb,
     patient: { name, scene },
     sections: [
       { prompt, options: [ { id, text, score, result } ] }
     ]
   }
   score: +2 clearly appropriate · +1 helpful · 0 neutral · -2 harmful/unsafe
   ========================================================= */

window.PRAXIS_SIMS = [
  {
    id: "sim-tbi-01",
    title: "Traumatic brain injury — inpatient rehab",
    area: "Neurological rehab",
    difficulty: "Challenge",
    blurb: "Confusion and agitation · gather information, then manage",
    patient: {
      name: "Ryan, 22",
      scene:
        "Ryan was admitted to inpatient rehabilitation after a car accident three weeks ago that caused a traumatic brain injury. He is confused, agitated at times, and has trouble with attention and forming new memories. He becomes restless when there's a lot of activity around him and pulls at his lines. His family is present and eager to help."
    },
    sections: [
      {
        prompt: "You're beginning your evaluation. Select the actions you would take to gather information. Each one shows you what it reveals.",
        options: [
          { id: "a", text: "Review the medical chart for precautions, imaging, and current status", score: 2,
            result: "Weight-bearing is unrestricted, no seizures today, and there are precautions for agitation and fall risk." },
          { id: "b", text: "Ask nursing about his behavior, sleep, and best times of day", score: 2,
            result: "Nursing reports he's calmest in the morning and tends to escalate during busy afternoons." },
          { id: "c", text: "Briefly screen orientation and attention in a quiet room", score: 2,
            result: "In a quiet space he's oriented to person only and can attend for about two minutes." },
          { id: "d", text: "Interview the family about his prior routines, roles, and interests", score: 1,
            result: "His mother shares that he's a college student and avid gamer who does best with structure." },
          { id: "e", text: "Observe him during a familiar self-care task in his room", score: 1,
            result: "He starts brushing his teeth but gets distracted partway and stops." },
          { id: "f", text: "Run a full standardized cognitive battery in the busy therapy gym now", score: -2,
            result: "The noisy gym overwhelms him; he becomes agitated and the results wouldn't reflect his real ability." },
          { id: "g", text: "Push him through a long, complex multi-step task to find his ceiling", score: -2,
            result: "He becomes frustrated and agitated — this yields little useful information and erodes trust." },
          { id: "h", text: "Skip the evaluation and start a fixed exercise protocol", score: -2,
            result: "Without understanding his needs, a generic protocol risks missing safety issues and his real goals." }
        ]
      },
      {
        prompt: "Based on what you've learned, select the actions you'd include in his intervention. Each shows what happens.",
        options: [
          { id: "a", text: "Provide short, structured, low-stimulation activities in a quiet space", score: 2,
            result: "He engages more calmly and finishes a simple task successfully." },
          { id: "b", text: "Use consistent routines and orient him gently throughout tasks", score: 2,
            result: "Repetition and orientation help him feel safer and participate more." },
          { id: "c", text: "Educate the family on reducing overstimulation and using simple cues", score: 2,
            result: "The family feels empowered and his environment becomes calmer and more consistent." },
          { id: "d", text: "Schedule his sessions in the morning when he's calmest", score: 1,
            result: "Morning sessions go noticeably better." },
          { id: "e", text: "Grade tasks to be short and achievable, building up gradually", score: 1,
            result: "Small, repeated successes slowly build his tolerance." },
          { id: "f", text: "Hold the session in the busy gym with several activities at once", score: -2,
            result: "He's overwhelmed and agitated, and participation drops sharply." },
          { id: "g", text: "Introduce a brand-new complex routine each visit to challenge him", score: -2,
            result: "The novelty confuses him and increases frustration." },
          { id: "h", text: "Restrain him whenever he becomes restless to keep him on task", score: -2,
            result: "Restraint escalates agitation and isn't appropriate — a calming, adaptive approach is what's needed." }
        ]
      }
    ]
  },

  {
    id: "sim-cardiac-01",
    title: "Cardiac surgery recovery — acute care",
    area: "Cardiac & pulmonary",
    difficulty: "Challenge",
    blurb: "Post-CABG with sternal precautions · evaluate, then intervene",
    patient: {
      name: "Gloria, 64",
      scene:
        "Gloria is three days out from coronary artery bypass graft (CABG) surgery in acute care. She has sternal precautions and becomes short of breath with exertion. She lives alone in a two-story home and is anxious about managing once she's discharged."
    },
    sections: [
      {
        prompt: "Select the actions you would take to gather information before intervening. Each shows what you find.",
        options: [
          { id: "a", text: "Review the chart for sternal precautions, activity orders, and vital-sign parameters", score: 2,
            result: "Sternal precautions are in place; she's cleared for light activity within tolerance, with vitals monitored." },
          { id: "b", text: "Check her vital signs and plan to monitor her response to activity", score: 2,
            result: "Resting vitals are stable — you'll watch heart rate, blood pressure, and exertion during tasks." },
          { id: "c", text: "Ask about her home layout, stairs, and support system", score: 2,
            result: "She lives alone with stairs, and a neighbor can help a few days a week." },
          { id: "d", text: "Observe light seated grooming while monitoring her tolerance", score: 1,
            result: "She manages seated grooming but tires and gets short of breath toward the end." },
          { id: "e", text: "Discuss her priorities and what independence means to her", score: 1,
            result: "She most wants to return home safely and keep caring for herself." },
          { id: "f", text: "Have her perform a maximal-effort exercise test to find her limit", score: -2,
            result: "Pushing to maximal exertion this soon after CABG is unsafe and risks serious complications." },
          { id: "g", text: "Ask her to lift and carry a heavy object to test her arm strength", score: -2,
            result: "This violates sternal precautions and could harm the healing sternum." }
        ]
      },
      {
        prompt: "Select the actions you'd include in her intervention and discharge plan. Each shows what happens.",
        options: [
          { id: "a", text: "Teach energy-conservation techniques (pace, plan, prioritize, position)", score: 2,
            result: "She understands how to break tasks up and rest, and feels less overwhelmed." },
          { id: "b", text: "Reinforce sternal precautions during all ADL training", score: 2,
            result: "She practices dressing and grooming without straining her sternum." },
          { id: "c", text: "Teach her to monitor exertion, take rest breaks, and stop with symptoms", score: 2,
            result: "She learns to recognize her limits and pause before overdoing it." },
          { id: "d", text: "Recommend a shower chair and adaptive equipment for safe seated bathing", score: 1,
            result: "Seated bathing lowers her exertion and fall risk." },
          { id: "e", text: "Plan graded activity that increases gradually as she tolerates it", score: 1,
            result: "A gradual plan builds her endurance and confidence safely." },
          { id: "f", text: "Address her home situation — stairs, help, and a safe daily routine", score: 1,
            result: "You plan for the stairs, her neighbor's help, and a manageable routine at home." },
          { id: "g", text: "Have her do heavy lifting and overhead pushing to build strength quickly", score: -2,
            result: "This breaks sternal precautions and endangers the healing sternum." },
          { id: "h", text: "Encourage her to push through shortness of breath to build tolerance", score: -2,
            result: "Ignoring symptoms after cardiac surgery is unsafe — she needs to rest and monitor instead." }
        ]
      }
    ]
  },

  {
    id: "sim-peds-01",
    title: "School-based pediatrics — sensory and handwriting",
    area: "Pediatrics",
    difficulty: "Challenge",
    blurb: "A child overwhelmed in class · gather information, then support",
    patient: {
      name: "Noah, 7",
      scene:
        "Noah is a second grader referred by his teacher. His handwriting is hard to read, he becomes overwhelmed by classroom noise, and he struggles with transitions between activities. He's bright and kind, and gets frustrated when his work looks messy."
    },
    sections: [
      {
        prompt: "Select the actions you would take to understand what's going on. Each shows what you find.",
        options: [
          { id: "a", text: "Observe Noah in the classroom during a writing task", score: 2,
            result: "He grips the pencil tightly, presses hard, tires quickly, and glances anxiously toward noisy areas." },
          { id: "b", text: "Talk with the teacher about when he struggles most", score: 2,
            result: "The teacher notes he unravels during loud, unstructured times and transitions." },
          { id: "c", text: "Ask the family about routines and what helps him at home", score: 1,
            result: "At home, warnings before changes and a quiet space help him stay calm." },
          { id: "d", text: "Screen his fine-motor skills and sensory responses in context", score: 2,
            result: "You see reduced hand endurance and clear over-responsivity to noise." },
          { id: "e", text: "Pull him into an unfamiliar room for a long testing battery right away", score: -2,
            result: "The strange setting and length overwhelm him; the results won't reflect his real ability." },
          { id: "f", text: "Assume he's simply being difficult on purpose", score: -2,
            result: "This misreads his sensory and motor needs and risks harming your rapport." }
        ]
      },
      {
        prompt: "Select the actions you'd include to support Noah. Each shows what happens.",
        options: [
          { id: "a", text: "Offer sensory supports — movement breaks and noise-reducing options", score: 2,
            result: "He regulates better and stays engaged longer." },
          { id: "b", text: "Use a visual schedule and warnings to ease transitions", score: 2,
            result: "Transitions become far smoother for him." },
          { id: "c", text: "Collaborate with the teacher on simple classroom strategies", score: 2,
            result: "The strategies carry over across his whole day." },
          { id: "d", text: "Adapt writing tools — a pencil grip and slant board", score: 1,
            result: "His grasp and posture improve and writing tires him less." },
          { id: "e", text: "Make him sit through loud assemblies to toughen him up", score: -2,
            result: "He's overwhelmed and more anxious, not desensitized." },
          { id: "f", text: "Remove recess so he can practice handwriting instead", score: -2,
            result: "Losing movement and a break worsens his regulation and focus." },
          { id: "g", text: "Keep all strategies inside the therapy room only", score: -1,
            result: "Gains don't carry over to where he actually struggles." }
        ]
      }
    ]
  },

  {
    id: "sim-sci-01",
    title: "Spinal cord injury — inpatient rehab",
    area: "Neurological rehab",
    difficulty: "Challenge",
    blurb: "C6 tetraplegia · evaluate safely, then build independence",
    patient: {
      name: "Darnell, 25",
      scene:
        "Darnell has a complete C6 spinal cord injury after a fall and is in inpatient rehab. He has wrist movement but limited hand function and impaired sensation below the injury. He's motivated to regain as much independence as he can."
    },
    sections: [
      {
        prompt: "Select the actions you would take to evaluate him safely. Each shows what you find.",
        options: [
          { id: "a", text: "Review the chart for his level of injury, skin status, and precautions", score: 2,
            result: "You confirm a C6 level, intact skin so far, and orders to monitor for autonomic dysreflexia." },
          { id: "b", text: "Assess his available movement and functional strength", score: 2,
            result: "He has wrist extension (a basis for tenodesis grasp) but no active finger flexion." },
          { id: "c", text: "Ask about his prior roles, home setup, and goals", score: 2,
            result: "He was a student who lived independently and badly wants to feed and groom himself again." },
          { id: "d", text: "Check his skin and teach the importance of pressure relief", score: 1,
            result: "Skin is intact; he learns why regular weight shifts matter with reduced sensation." },
          { id: "e", text: "Skip the skin assessment because he says he feels fine", score: -2,
            result: "With impaired sensation he can't feel a developing pressure injury — skipping this is unsafe." },
          { id: "f", text: "Assume he'll be fully dependent and set no active goals", score: -2,
            result: "This sells him short; at C6 meaningful independence is achievable." }
        ]
      },
      {
        prompt: "Select the actions you'd include in his intervention. Each shows what happens.",
        options: [
          { id: "a", text: "Train his tenodesis grasp and provide a universal cuff for self-feeding", score: 2,
            result: "He feeds himself for the first time since the injury — a big win." },
          { id: "b", text: "Teach and schedule pressure-relief weight shifts and skin checks", score: 2,
            result: "He builds a routine that protects his skin." },
          { id: "c", text: "Educate him and his caregivers on recognizing autonomic dysreflexia", score: 2,
            result: "They learn the warning signs and what to do — a potential life-saver." },
          { id: "d", text: "Adapt his ADLs with appropriate equipment", score: 1,
            result: "Adaptations open up more of his daily routine to him." },
          { id: "e", text: "Focus only on restoring finger grip through strengthening exercises", score: -2,
            result: "The finger muscles aren't innervated at C6; this misdirects effort away from what works." },
          { id: "f", text: "Keep him in bed to avoid any risk", score: -2,
            result: "Immobility invites pressure injuries and deconditioning and stalls his goals." },
          { id: "g", text: "Do all of his self-care for him to save time", score: -1,
            result: "Doing it for him removes the very independence he's working toward." }
        ]
      }
    ]
  }
];
