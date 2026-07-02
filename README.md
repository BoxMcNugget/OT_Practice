# Praxis — NBCOT OTR study companion

A calm, encouraging study website for the occupational therapy board exam (NBCOT OTR).
Built with plain HTML, CSS, and JavaScript — no accounts, no server, works on phone and computer.

> **About the study content:** the patient cases are original and written to practice
> clinical reasoning. They are **drafts and have not been reviewed by a licensed OT.**
> Verify any clinical detail before relying on it.

---

## What's here

| Mode | What it does |
|------|--------------|
| **Patient cases** | Work a patient scenario step by step, with supportive feedback and teaching notes |
| **Practice questions** | Quick quizzes (filter by domain) with instant, kind feedback |
| **Flashcards** | Spaced repetition — the ones you're still learning come back sooner |
| **Domain review** | Concise study notes organized by the four exam domains |

All four modes are live. Content by the numbers:

- **12 patient cases**, two in each of six practice areas: Neurological rehab, Orthopedics,
  Hand & upper extremity, Pediatrics, Mental health, and Older adults.
- **20 practice questions** across the four exam domains.
- **~30 flashcards** with real spaced repetition (Praxis remembers what's due).
- **4 domains** of review notes.

Answer options are **shuffled every time** so she reads and reasons rather than memorizing
positions. A **Sources** page (linked in the footer) lists the real NBCOT/AOTA references.

Progress (streak, completed cases, quiz accuracy, cards due, progress ring) is saved
automatically in the browser.

## Files

```
index.html            the page
css/styles.css        look, feel, and animations
js/app.js             homepage, navigation, progress tracking
js/modes/cases.js     the Patient cases mode
js/modes/questions.js the Practice questions mode
js/modes/flashcards.js the Flashcards mode (spaced repetition)
js/modes/review.js    the Domain review mode
data/cases.js         patient case content   ← edit to add/fix cases
data/questions.js     practice questions
data/flashcards.js    flashcards
data/notes.js         domain review notes
```

## Try it locally

Double-click `index.html` — it opens in your browser and works fully offline.

## Put it online with GitHub Pages (free)

1. Create a free account at [github.com](https://github.com).
2. Make a new **public** repository (for example, `praxis`).
3. Upload everything in this folder (keep the folder structure — `css/`, `js/`, `data/`).
4. In the repo, go to **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to `Deploy from a branch`, pick the `main`
   branch and the `/ (root)` folder, then **Save**.
6. Wait about a minute. GitHub gives you a link like
   `https://YOUR-USERNAME.github.io/praxis/` — that's the site. Share it with Megan.

Any time you change a file and upload it again, the site updates automatically.

## Personalize it

Open `js/app.js` and edit the settings near the top:

```js
P.CONFIG = {
  studentName: "Megan",     // the name in the greeting
  examDateISO: null         // e.g. "2026-09-15" to show a friendly countdown
};
```

## Add or fix a case

Open `data/cases.js`. Each case is a plain object — copy an existing one and change the
text. The important pieces:

- `patient` — the scenario shown at the top of every step
- `steps[]` — each step has a `prompt`, answer `options`, the `correct` answer id(s),
  and the supportive feedback (`affirm`, `coach`, `rationale`, `teach`)
- set `type` to `"single"` (choose one) or `"multi"` (choose all that apply)

No coding tools needed — it's just text. Save the file and reload the page.

## The supportive tone (please keep it)

This site deliberately avoids "wrong" or "incorrect." When an answer isn't the best one,
it reframes as *"let's look at this together"* and teaches gently. If you add content,
keep that warmth — it's the point.
