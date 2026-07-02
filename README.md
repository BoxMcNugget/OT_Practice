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
| **Patient cases** | Work a patient scenario step by step, with supportive feedback |
| **Practice questions** | Quizzes filtered by domain and difficulty (Core / Challenge), with per-option rationales; plus "Smart practice" that targets your weak spots |
| **Flashcards** | Spaced repetition — the ones you're still learning come back sooner |
| **Domain review** | Domain notes plus quick-reference topics (assessments, frames of reference, precautions) |
| **Mock exam** | A timed, blueprint-weighted test with an estimated scaled score and domain breakdown |
| **Clinical simulations** | The exam's CST format: read a scene, choose actions from a list, scored for helpful vs. harmful judgment |
| **Progress** | Per-domain mastery, a focus-area suggestion, and "review missed questions" |

Content by the numbers:

- **12 patient cases** across six practice areas (Neuro, Orthopedics, Hand, Pediatrics,
  Mental health, Older adults).
- **40 practice questions** (20 Core + 20 Challenge) across the four exam domains, with
  **per-option rationales** for the Challenge set.
- **2 clinical simulations** (CST-style), **~30 flashcards**, and **7 review topics**.

Answer options are **shuffled every time**. A **Sources** page (footer) lists the real
NBCOT/AOTA references.

> **Exam-fidelity notes:** the mock exam's domain weighting and scaled-score mapping are
> *approximate study estimates* — verify them against the current official NBCOT content
> outline. All practice content is draft, pending review by a licensed OT.

Progress (streak, per-domain accuracy, cards due, sim scores, progress ring) is saved
automatically in the browser.

**Light and dark mode:** there's a sun/moon toggle in the top bar. It follows the device's
system setting by default and remembers the choice. The rest of the flair — the drifting
background glows, hover effects, and the shimmer on the "continue" card — respects the
"reduce motion" accessibility setting and calms down automatically if that's turned on.

## Files

```
index.html             the page
css/styles.css         look, feel, and animations
js/app.js              homepage, navigation, progress tracking + analytics
js/modes/cases.js      Patient cases mode
js/modes/questions.js  Practice questions mode (+ Smart practice)
js/modes/flashcards.js Flashcards mode (spaced repetition)
js/modes/review.js     Domain review / reference mode
js/modes/exam.js       Mock exam mode (timed, scored)
js/modes/sims.js       Clinical simulations (CST) mode
data/cases.js          patient case content     ← edit to add/fix cases
data/questions.js      practice questions
data/rationales.js     per-option "why each answer" explanations  ← great for an OT to edit
data/flashcards.js     flashcards
data/notes.js          domain notes + quick reference
data/simulations.js    clinical simulation scenarios
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
