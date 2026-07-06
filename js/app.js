/* =========================================================
   Praxis · app core
   Router, progress (localStorage), homepage, encouragement.
   ========================================================= */
window.Praxis = window.Praxis || {};
(function (P) {
  "use strict";

  /* ---- Easy-to-edit settings ---- */
  P.CONFIG = {
    studentName: "Megan",     // change to personalize the greeting
    examDateISO: null         // e.g. "2026-09-15" to show a gentle countdown, or leave null
  };

  /* ---- Supportive copy (rotates so it stays fresh) ---- */
  P.COPY = {
    // homepage sub-lines, chosen by how much progress there is
    heroStart: [
      "Every expert started exactly where you are. Let's take the first step together.",
      "No pressure today — just one small bit of progress.",
      "You've already done the hard part: showing up. Let's build from here."
    ],
    heroGoing: [
      "You're building real momentum. Proud of the work you're putting in.",
      "Steady and consistent — that's how this exam gets learned.",
      "Look how far you've come already. Let's keep the streak alive."
    ],
    heroStrong: [
      "You're in a really strong place. Trust what you've built.",
      "This is clicking for you. Keep doing what's working.",
      "You're ready for more than you think. Let's keep sharpening."
    ],
    // little nudges shown when moving between steps
    nudge: [
      "You're doing great — keep going.",
      "Nice focus. On to the next one.",
      "One step at a time. You've got this.",
      "Love the effort here.",
      "Steady progress — keep it up."
    ],
    // celebration lines on completing a case
    done: [
      "You worked all the way through that case — that's exactly how clinical reasoning grows.",
      "Finishing a full case is a real accomplishment. Well done.",
      "That's the kind of thinking the boards are looking for. Be proud of this.",
      "You showed up and did the work today. That matters more than any single answer."
    ]
  };

  /* ---- small utilities ---- */
  var ICONS = {
    play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    check: '<path d="M5 12l4 4 10-11"/>',
    spark: '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9z"/><path d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    userHeart: '<circle cx="9" cy="8" r="3.3"/><path d="M3.5 20c0-3 2.6-5.2 5.5-5.2"/><path d="M17 20s-3-1.8-3-3.9a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.1-3 3.9-3 3.9z"/>',
    list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M4 6l1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17"/>',
    cards: '<rect x="3.5" y="7" width="12" height="13" rx="2"/><path d="M8 4h8.5a2 2 0 0 1 2 2v10.5"/>',
    book: '<path d="M12 6c-2-1.4-5-1.4-7.5 0v12c2.5-1.4 5.5-1.4 7.5 0 2-1.4 5-1.4 7.5 0V6c-2.5-1.4-5.5-1.4-7.5 0z"/><path d="M12 6v12"/>',
    clip: '<rect x="6" y="4.5" width="12" height="15.5" rx="2"/><path d="M9.5 4.5h5v3h-5z"/><path d="M9 12h6M9 16h4"/>',
    refresh: '<path d="M4.5 12a7.5 7.5 0 0 1 13-5"/><path d="M18 3v4h-4"/><path d="M19.5 12a7.5 7.5 0 0 1-13 5"/><path d="M6 21v-4h4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6h.01"/>',
    bulb: '<path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.4c.8.8 1 1.4 1 2.6h6c0-1.2.2-1.8 1-2.6A6 6 0 0 0 12 3z"/>',
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.6"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    ext: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    school: '<path d="M12 4l9 4-9 4-9-4z"/><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    chart: '<path d="M5 20V4"/><path d="M5 20h15"/><path d="M9 20v-6M13 20v-10M17 20v-4"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevUp: '<path d="M6 15l6-6 6 6"/>',
    pulse: '<path d="M3 12h4l2 6 4-14 2 8h6"/>',
    minus: '<path d="M6 12h12"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
    flame: '<path d="M12 3c1.2 3 4 4.2 4 7.5a4 4 0 0 1-8 0c0-1.3.6-2.2 1.2-2.8C9 9.5 9 12 9 12S8.2 7.5 12 3z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M9 14.5L8 21l4-2 4 2-1-6.5"/>',
    volume: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a9 9 0 0 1 0 12"/>',
    heart: '<path d="M12 20s-7-4.6-9.3-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.3 5c-2.3 4.4-9.3 9-9.3 9z"/>',
    wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h9"/>'
  };

  // text-to-speech (hands-free study)
  P.speak = function (text) {
    try {
      if (!("speechSynthesis" in window)) { P.toast("Audio isn't supported in this browser."); return; }
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  };
  P.stopSpeaking = function () { try { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); } catch (e) {} };

  // text-size (accessibility comfort) — zoom on the content area, persisted
  var FONT_SCALES = { sm: 0.92, md: 1, lg: 1.12, xl: 1.28 };
  P.applyFontScale = function (key) {
    if (!FONT_SCALES[key]) key = "md";
    try { localStorage.setItem("praxis.fontScale", key); } catch (e) {}
    var app = document.getElementById("app");
    if (app) app.style.zoom = FONT_SCALES[key];
  };
  P.currentFontScale = function () {
    try { return localStorage.getItem("praxis.fontScale") || "md"; } catch (e) { return "md"; }
  };

  // renders an optional image/diagram for a question (image path or inline SVG)
  P.questionFigure = function (q) {
    if (q.imageSvg) return '<div class="q-figure">' + q.imageSvg + "</div>";
    if (q.image) return '<div class="q-figure"><img src="' + esc(q.image) + '" alt="' + esc(q.imageAlt || "") + '"></div>';
    return "";
  };

  P.icon = function (name, size) {
    size = size || 24;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || "") + "</svg>";
  };

  P.pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

  P.toast = function (msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  };

  // shared sub-view header with a back button (used by every mode)
  P.subhead = function (title, sub, backHash) {
    return '<div class="subhead">' +
      '<button class="back" data-back="' + backHash + '" aria-label="Go back">' + P.icon("left", 20) + "</button>" +
      '<div><h1 class="subhead-ttl">' + esc(title) + "</h1>" +
      (sub ? '<p class="subhead-sub">' + esc(sub) + "</p>" : "") + "</div></div>";
  };
  P.wireBack = function (view) {
    var b = view.querySelector(".back");
    if (b) b.addEventListener("click", function () { P.go(b.getAttribute("data-back")); });
  };

  /* ---- progress store ---- */
  var KEY = "praxis.v1";
  P.progress = loadProgress();

  function loadProgress() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { streak: { count: 0, lastDay: null }, cases: {}, lastCaseId: null };
  }
  P.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(P.progress)); } catch (e) {}
  };

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  function yesterdayStr() {
    var d = new Date(); d.setDate(d.getDate() - 1);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  // call when the user does real study work
  P.touchStreak = function () {
    var s = P.progress.streak || (P.progress.streak = { count: 0, lastDay: null });
    var t = todayStr();
    if (s.lastDay === t) return;
    if (s.lastDay === yesterdayStr()) s.count += 1;
    else s.count = 1;
    s.lastDay = t;
    P.save();
    paintStreak();
  };

  function paintStreak() {
    var el = document.getElementById("streak-count");
    if (el) el.textContent = (P.progress.streak && P.progress.streak.count) || 0;
  }

  P.caseProgress = function (id) {
    return P.progress.cases[id] || (P.progress.cases[id] = { step: 0, done: false, firstTry: 0, total: 0 });
  };
  P.qStats = function () {
    return P.progress.questions || (P.progress.questions = { answered: 0, correct: 0 });
  };
  P.cardState = function (id) {
    if (!P.progress.cards) P.progress.cards = {};
    return P.progress.cards[id] || (P.progress.cards[id] = { level: 0, due: 0 });
  };
  P.dueCardCount = function () {
    var now = Date.now();
    return (window.PRAXIS_FLASHCARDS || []).filter(function (c) {
      var st = P.progress.cards && P.progress.cards[c.id];
      return !st || !st.due || st.due <= now;
    }).length;
  };
  P.cardsLearnedFraction = function () {
    var all = window.PRAXIS_FLASHCARDS || [];
    if (!all.length || !P.progress.cards) return null;
    var learned = 0, touched = 0;
    all.forEach(function (c) {
      var st = P.progress.cards[c.id];
      if (st) { touched++; if ((st.level || 0) >= 2) learned++; }
    });
    return touched ? learned / all.length : null;
  };

  /* ---- question answer tracking (powers analytics, review, adaptive) ---- */
  P.stats = function () {
    return P.progress.stats || (P.progress.stats = { byDomain: {}, answered: {}, totalSeen: 0, totalCorrect: 0 });
  };
  // records the most recent outcome per question id, plus confidence + pacing
  P.recordAnswer = function (q, correct, confidence, elapsedMs) {
    var s = P.stats();
    var DAY = 86400000;
    var d = q.domain || "Other";
    var bd = s.byDomain[d] || (s.byDomain[d] = { seen: 0, correct: 0 });
    var prev = s.answered[q.id];
    // adjust running totals so re-answering a question doesn't double-count
    if (prev) {
      bd.seen = Math.max(0, bd.seen - 1); if (prev.correct) bd.correct = Math.max(0, bd.correct - 1);
      s.totalSeen = Math.max(0, s.totalSeen - 1); if (prev.correct) s.totalCorrect = Math.max(0, s.totalCorrect - 1);
    }
    bd.seen++; if (correct) bd.correct++;
    s.totalSeen++; if (correct) s.totalCorrect++;

    var rec = { correct: !!correct, ts: Date.now() };
    if (confidence) rec.confidence = confidence;
    if (!correct) {
      // spaced re-review: sooner if missed repeatedly, up to 4 days out
      var misses = ((prev && prev.misses) || 0) + 1;
      rec.misses = misses;
      rec.due = Date.now() + Math.min(misses, 4) * DAY;
    }
    if (elapsedMs && elapsedMs > 0 && elapsedMs < 600000) {
      s.timeCount = (s.timeCount || 0) + 1;
      s.timeTotal = (s.timeTotal || 0) + elapsedMs;
    }
    s.answered[q.id] = rec;
    P.save();
  };
  P.missedQuestions = function () {
    var s = P.progress.stats;
    if (!s || !s.answered) return [];
    return (window.PRAXIS_QUESTIONS || []).filter(function (q) {
      var a = s.answered[q.id];
      return a && a.correct === false;
    });
  };
  P.dueMissedCount = function () {
    var s = P.progress.stats;
    if (!s || !s.answered) return 0;
    var now = Date.now();
    return P.missedQuestions().filter(function (q) {
      var a = s.answered[q.id];
      return !a.due || a.due <= now;
    }).length;
  };
  P.confidentlyWrong = function () {
    var s = P.progress.stats;
    if (!s || !s.answered) return [];
    return (window.PRAXIS_QUESTIONS || []).filter(function (q) {
      var a = s.answered[q.id];
      return a && a.correct === false && a.confidence === "high";
    });
  };
  P.avgQuestionSeconds = function () {
    var s = P.progress.stats;
    if (!s || !s.timeCount) return null;
    return Math.round(s.timeTotal / s.timeCount / 1000);
  };
  P.recordMockScore = function (score, pct) {
    var s = P.stats();
    if (!s.mockScores) s.mockScores = [];
    s.mockScores.push({ score: score, pct: pct, ts: Date.now() });
    if (s.mockScores.length > 50) s.mockScores.shift();
    P.save();
  };
  // accuracy grouped by the confidence she reported
  P.confidenceStats = function () {
    var s = P.progress.stats;
    if (!s || !s.answered) return null;
    var g = { low: { seen: 0, correct: 0 }, mid: { seen: 0, correct: 0 }, high: { seen: 0, correct: 0 } };
    var any = false;
    Object.keys(s.answered).forEach(function (id) {
      var a = s.answered[id];
      if (a.confidence && g[a.confidence]) { g[a.confidence].seen++; if (a.correct) g[a.confidence].correct++; any = true; }
    });
    return any ? g : null;
  };
  P.milestones = function () {
    var s = P.progress.stats || {};
    var streak = (P.progress.streak && P.progress.streak.count) || 0;
    var casesDone = (window.PRAXIS_CASES || []).filter(function (c) { var p = P.progress.cases[c.id]; return p && p.done; }).length;
    var sims = P.progress.sims ? Object.keys(P.progress.sims).length : 0;
    var mocks = s.mockScores || [];
    var bestMock = mocks.reduce(function (m, x) { return Math.max(m, x.score || 0); }, 0);
    var bd = s.byDomain || {};
    var doms = ["Evaluation & assessment", "Analysis & planning", "Intervention", "Competency & ethics"];
    var allDomains70 = doms.every(function (d) { var x = bd[d]; return x && x.seen >= 3 && (x.correct / x.seen) >= 0.7; });
    return [
      { icon: "play", label: "First steps", desc: "Answer your first question", earned: (s.totalSeen || 0) >= 1 },
      { icon: "flame", label: "Consistent", desc: "A 7-day study streak", earned: streak >= 7 },
      { icon: "target", label: "Century", desc: "Answer 100 questions", earned: (s.totalSeen || 0) >= 100 },
      { icon: "award", label: "Passed a mock", desc: "Score 450+ on a mock exam", earned: bestMock >= 450 },
      { icon: "chart", label: "Well-rounded", desc: "All four domains at 70%+", earned: allDomains70 },
      { icon: "pulse", label: "Simulation-ready", desc: "Finish 2 clinical simulations", earned: sims >= 2 },
      { icon: "userHeart", label: "Case worker", desc: "Complete 5 patient cases", earned: casesDone >= 5 }
    ];
  };
  P.examDate = function () { return P.progress.examDate || P.CONFIG.examDateISO || null; };
  P.daysToExam = function () {
    var iso = P.examDate();
    if (!iso) return null;
    return Math.ceil((new Date(iso + "T00:00:00") - new Date()) / 86400000);
  };
  P.weakestDomainName = function () {
    var s = P.progress.stats;
    if (!s || !s.byDomain) return null;
    var weak = null;
    Object.keys(s.byDomain).forEach(function (d) {
      var bd = s.byDomain[d];
      if (!bd.seen) return;
      var acc = bd.correct / bd.seen;
      if (acc < 0.85 && (!weak || acc < weak.acc)) weak = { d: d, acc: acc };
    });
    return weak ? weak.d : null;
  };
  // the single best next action, for the home "today's focus" card
  P.recommendedAction = function () {
    var cases = window.PRAXIS_CASES || [];
    for (var i = 0; i < cases.length; i++) {
      var pr = P.progress.cases[cases[i].id];
      if (pr && !pr.done && pr.step > 0)
        return { label: "Continue: " + cases[i].title, sub: "Pick up your patient case where you left off", hash: "#/cases/" + cases[i].id, cta: "Resume", icon: "play" };
    }
    var s = P.progress.stats;
    if (!s || !s.totalSeen)
      return { label: "Warm up with practice questions", sub: "A quick set to get started", hash: "#/questions", cta: "Start", icon: "play" };
    var cw = P.confidentlyWrong().length;
    if (cw) return { label: "Revisit your confident misses", sub: cw + " you were sure about but missed", hash: "#/progress", cta: "Review", icon: "bulb" };
    var dm = P.dueMissedCount();
    if (dm) return { label: "Review questions due for another look", sub: dm + " due today", hash: "#/progress", cta: "Review", icon: "refresh" };
    var dc = P.dueCardCount();
    if (dc) return { label: "Run your due flashcards", sub: dc + " card" + (dc === 1 ? "" : "s") + " due", hash: "#/flashcards", cta: "Start", icon: "cards" };
    var weak = P.weakestDomainName();
    if (weak) return { label: "Practice your weakest area", sub: weak, hash: "#/questions", cta: "Start", icon: "target" };
    return { label: "Take a timed mock exam", sub: "Practice under real conditions", hash: "#/exam", cta: "Begin", icon: "target" };
  };

  // "progress" blends the study activities that have data
  P.computeReadiness = function () {
    var parts = [];
    var cases = Object.keys(P.progress.cases).map(function (k) { return P.progress.cases[k]; });
    if (cases.length) {
      var totalCases = (window.PRAXIS_CASES || []).length || 1;
      var doneCount = 0, firstTry = 0, steps = 0;
      cases.forEach(function (c) { if (c.done) doneCount++; firstTry += c.firstTry || 0; steps += c.total || 0; });
      var accuracy = steps ? firstTry / steps : 0;
      var coverage = doneCount / totalCases;
      parts.push(0.55 * accuracy + 0.45 * coverage);
    }
    var st = P.progress.stats;
    if (st && st.totalSeen) parts.push(st.totalCorrect / st.totalSeen);
    var frac = P.cardsLearnedFraction();
    if (frac !== null) parts.push(frac);
    if (!parts.length) return 0;
    var sum = parts.reduce(function (a, b) { return a + b; }, 0);
    return Math.round(100 * (sum / parts.length));
  };

  /* ---- router ---- */
  P.go = function (hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  };

  function route() {
    var h = location.hash || "#/";
    var app = document.getElementById("app");
    var parts = h.replace(/^#\//, "").split("/").filter(Boolean); // e.g. ['cases','id']
    app.innerHTML = "";
    if (parts[0] === "cases" && parts[1]) {
      P.modes.cases.renderCase(parts[1], app);
    } else if (parts[0] === "cases") {
      P.modes.cases.renderList(app);
    } else if (parts[0] === "questions") {
      P.modes.questions.render(app);
    } else if (parts[0] === "flashcards") {
      P.modes.flashcards.render(app);
    } else if (parts[0] === "review" && parts[1]) {
      P.modes.review.renderNotes(parts[1], app);
    } else if (parts[0] === "review") {
      P.modes.review.renderList(app);
    } else if (parts[0] === "progress") {
      renderProgress(app);
    } else if (parts[0] === "plan") {
      renderPlan(app);
    } else if (parts[0] === "calm") {
      renderCalm(app);
    } else if (parts[0] === "exam") {
      P.modes.exam.render(app);
    } else if (parts[0] === "sims" && parts[1]) {
      P.modes.sims.renderSim(parts[1], app);
    } else if (parts[0] === "sims") {
      P.modes.sims.renderList(app);
    } else if (parts[0] === "sources") {
      renderSources(app);
    } else {
      renderHome(app);
    }
    app.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---- homepage ---- */
  function greeting() {
    var h = new Date().getHours();
    var part = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    return part + ", " + P.CONFIG.studentName;
  }

  function heroLine(readiness) {
    if (readiness >= 70) return P.pick(P.COPY.heroStrong);
    if (readiness >= 25) return P.pick(P.COPY.heroGoing);
    return P.pick(P.COPY.heroStart);
  }

  function continueTarget() {
    var cases = window.PRAXIS_CASES || [];
    // 1) in-progress case
    for (var i = 0; i < cases.length; i++) {
      var pr = P.progress.cases[cases[i].id];
      if (pr && !pr.done && pr.step > 0) return { c: cases[i], resume: true };
    }
    // 2) first not-done
    for (var j = 0; j < cases.length; j++) {
      var pr2 = P.progress.cases[cases[j].id];
      if (!pr2 || !pr2.done) return { c: cases[j], resume: false };
    }
    // 3) all done → revisit first
    return cases.length ? { c: cases[0], resume: false, review: true } : null;
  }

  function renderHome(app) {
    var readiness = P.computeReadiness();
    var view = document.createElement("div");
    view.className = "view";

    var rec = P.recommendedAction();
    var casesDone = countDoneCases();
    var casesTotal = (window.PRAXIS_CASES || []).length;

    view.innerHTML =
      '<section class="hero">' +
        '<div>' +
          '<h1 class="hero-greet">' + greeting() + '</h1>' +
          '<p class="hero-line">' + heroLine(readiness) + '</p>' +
        '</div>' +
        '<a class="ring-wrap" href="#/progress" aria-label="View your progress and weak areas">' + ringSVG(readiness) + '<p class="ring-label">progress</p></a>' +
      '</section>' +

      '<div class="encourage">' + P.icon("spark", 20) +
        '<span>' + encourageBanner(readiness) + '</span></div>' +

      '<button class="continue" id="focus-btn">' +
        '<span class="continue-left">' +
          '<span class="continue-ic">' + P.icon(rec.icon || "play", 22) + '</span>' +
          '<span style="min-width:0">' +
            '<span class="continue-kicker">Today\'s focus</span>' +
            '<span class="continue-ttl">' + esc(rec.label) + '</span>' +
            '<span class="continue-sub">' + esc(rec.sub) + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="btn-solid" aria-hidden="true">' + esc(rec.cta) + '</span>' +
      '</button>' +

      '<button class="exam-cta" id="exam-cta">' +
        '<span class="exam-cta-ic">' + P.icon("target", 22) + '</span>' +
        '<span class="exam-cta-body">' +
          '<span class="exam-cta-ttl">Take a mock exam</span>' +
          '<span class="exam-cta-sub">Timed, exam-style, with a scaled-score estimate</span>' +
        '</span>' +
        '<span class="exam-cta-go">' + P.icon("right", 18) + '</span>' +
      '</button>' +

      '<p class="grid-title">Ways to study</p>' +
      '<div class="modes">' +
        tile("blue", "userHeart", "Patient cases", "Work a real scenario, step by step",
             P.icon("clip", 15) + " " + casesDone + " of " + casesTotal + " completed", "#/cases", false) +
        tile("purple", "list", "Practice questions", "Quiz yourself with instant, kind feedback",
             questionsMeta(), "#/questions", false) +
        tile("green", "cards", "Flashcards", "Spaced repetition on key concepts",
             flashcardsMeta(), "#/flashcards", false) +
        tile("amber", "book", "Domain review", "Domain notes plus quick reference",
             P.icon("book", 15) + " " + ((window.PRAXIS_NOTES || []).length) + " topics", "#/review", false) +
      '</div>' +

      '<button class="sim-tile" id="sim-tile">' +
        '<span class="sim-tile-ic">' + P.icon("pulse", 24) + '</span>' +
        '<span class="sim-tile-body">' +
          '<span class="sim-tile-ttl">Clinical simulations</span>' +
          '<span class="sim-tile-sub">Choose your actions from a full list — the exam\'s simulation format</span>' +
        '</span>' +
        '<span class="sim-tile-meta">' + ((window.PRAXIS_SIMS || []).length) + ' sims ' + P.icon("right", 16) + '</span>' +
      '</button>' +

      '<p class="foot-note">' + footNote() +
        ' · <a href="#/plan">Plan</a>' +
        ' · <a href="#/progress">Progress</a>' +
        ' · <a href="#/calm">Calm</a>' +
        ' · <a href="#/sources">Sources</a>' +
        ' · <a href="#" id="about-content">about the content</a></p>';

    app.appendChild(view);

    // wire up
    document.getElementById("focus-btn").addEventListener("click", function () { P.go(rec.hash); });
    var examCta = document.getElementById("exam-cta");
    if (examCta) examCta.addEventListener("click", function () { P.go("#/exam"); });
    var simTile = document.getElementById("sim-tile");
    if (simTile) simTile.addEventListener("click", function () { P.go("#/sims"); });
    Array.prototype.forEach.call(view.querySelectorAll(".tile"), function (btn) {
      btn.addEventListener("click", function () {
        var soon = btn.getAttribute("data-soon") === "1";
        var href = btn.getAttribute("data-href");
        if (soon) P.toast("That's next on the build list — coming soon.");
        else if (href) P.go(href);
      });
    });
    var about = document.getElementById("about-content");
    if (about) about.addEventListener("click", function (e) {
      e.preventDefault();
      P.toast("Practice content is original and still being reviewed by an OT. Double-check anything before you rely on it.");
    });

    paintStreak();
    // animate the ring after paint
    requestAnimationFrame(function () {
      var fill = view.querySelector(".ring-fill");
      if (fill) fill.style.strokeDashoffset = fill.getAttribute("data-off");
    });
  }

  function countDoneCases() {
    return (window.PRAXIS_CASES || []).filter(function (c) {
      var p = P.progress.cases[c.id];
      return p && p.done;
    }).length;
  }

  function questionsMeta() {
    var st = P.progress.stats;
    if (st && st.totalSeen) {
      return P.icon("target", 15) + " " + Math.round(100 * st.totalCorrect / st.totalSeen) + "% avg · " + st.totalSeen + " done";
    }
    return P.icon("target", 15) + " a quick recall quiz";
  }

  function flashcardsMeta() {
    var due = P.dueCardCount();
    return P.icon("refresh", 15) + " " + due + " card" + (due === 1 ? "" : "s") + " due";
  }

  function encourageBanner(readiness) {
    if (readiness === 0) return "Welcome to Praxis. This is your space — go at your own pace, and be kind to yourself.";
    if (readiness < 40) return "You're finding your rhythm. Small, steady sessions add up faster than you'd think.";
    if (readiness < 70) return "You're doing the work and it shows. Keep trusting the process.";
    return "You've built something real here. Walk into that exam knowing you prepared.";
  }

  function footNote() {
    var days = P.daysToExam();
    if (days != null) {
      if (days > 0) return days + " days until your exam · you're getting there";
      if (days === 0) return "Exam day — you've got this. Trust your preparation.";
    }
    return "Made with care for your OT boards journey";
  }

  function ringSVG(pct) {
    var r = 30, c = 2 * Math.PI * r; // ~188.5
    var off = c * (1 - pct / 100);
    return '<svg class="ring" width="72" height="72" viewBox="0 0 72 72" role="img" aria-label="' + pct + ' percent progress">' +
      '<circle class="ring-track" cx="36" cy="36" r="' + r + '" fill="none" stroke-width="7"/>' +
      '<circle class="ring-fill" cx="36" cy="36" r="' + r + '" fill="none" stroke-width="7" ' +
      'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + c.toFixed(1) + '" data-off="' + off.toFixed(1) + '"/>' +
      '<text class="ring-num" x="36" y="41" text-anchor="middle" transform="rotate(90 36 36)">' + pct + '%</text>' +
      '</svg>';
  }

  function tile(color, ic, title, sub, meta, href, soon) {
    return '<button class="tile ' + color + '" data-href="' + (href || "") + '" data-soon="' + (soon ? "1" : "0") +
      '" aria-label="' + esc(title) + (soon ? " (coming soon)" : "") + '">' +
      (soon ? '<span class="tile-soon">Soon</span>' : "") +
      '<span class="tile-ic">' + P.icon(ic, 24) + '</span>' +
      '<span class="tile-ttl">' + esc(title) + '</span>' +
      '<span class="tile-sub">' + esc(sub) + '</span>' +
      '<span class="tile-meta">' + meta + '</span>' +
      '</button>';
  }

  /* ---- progress / analytics page ---- */
  var Q_DOMAINS = ["Evaluation & assessment", "Analysis & planning", "Intervention", "Competency & ethics"];

  function paceMsg(sec) {
    if (sec <= 80) return "About " + sec + "s per question — nicely within the ~80s the real exam allows.";
    if (sec <= 110) return "About " + sec + "s per question — a little over the ~80s exam pace; keep an eye on timing.";
    return "About " + sec + "s per question — worth practicing a bit quicker; the exam allows roughly 80s each.";
  }

  // self-drawn line chart of mock scaled scores over time, with the 450 pass line
  function mockChartSVG(scores) {
    var W = 320, H = 150, padL = 8, padR = 8, padT = 14, padB = 14;
    var yMin = 250, yMax = 600, n = scores.length;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    function xy(i, v) {
      var x = padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
      var y = padT + (1 - (v - yMin) / (yMax - yMin)) * plotH;
      return [x, y];
    }
    var y450 = padT + (1 - (450 - yMin) / (yMax - yMin)) * plotH;
    var pts = scores.map(function (sc, i) { return xy(i, Math.max(yMin, Math.min(yMax, sc.score))); });
    var line = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
    var dots = pts.map(function (p) { return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3.5" fill="var(--teal)"/>'; }).join("");
    return '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" role="img" aria-label="Your mock exam scaled scores over time">' +
      '<line x1="' + padL + '" y1="' + y450.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y450.toFixed(1) + '" stroke="var(--revisit)" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<text x="' + (W - padR) + '" y="' + (y450 - 5).toFixed(1) + '" text-anchor="end" font-size="11" fill="var(--revisit)">pass 450</text>' +
      '<path d="' + line + '" fill="none" stroke="var(--teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots + "</svg>";
  }
  function calibMsg(cs) {
    var h = cs.high;
    if (h.seen >= 3 && (h.correct / h.seen) < 0.6)
      return "When you feel sure, it's worth a second look — a few confident answers are slipping. Totally normal, and good to notice.";
    if (h.seen >= 3 && (h.correct / h.seen) >= 0.85)
      return "Your confidence lines up well with your accuracy — that's a great sign of solid knowledge.";
    return "Keep rating your confidence — over time this shows where your instincts are reliable.";
  }
  function milestonesHTML() {
    var badges = P.milestones();
    var earned = badges.filter(function (b) { return b.earned; }).length;
    return '<p class="pills-label" style="margin-top:24px">Milestones · ' + earned + " of " + badges.length + "</p>" +
      '<div class="badge-grid">' + badges.map(function (b) {
        return '<div class="badge' + (b.earned ? " earned" : "") + '">' +
          '<span class="badge-ic">' + P.icon(b.icon, 20) + "</span>" +
          '<span class="badge-ttl">' + esc(b.label) + "</span>" +
          '<span class="badge-desc">' + esc(b.desc) + "</span></div>";
      }).join("") + "</div>";
  }
  function mockChartHTML() {
    var mocks = (P.progress.stats && P.progress.stats.mockScores) || [];
    if (!mocks.length) return "";
    var last = mocks[mocks.length - 1];
    return '<p class="pills-label" style="margin-top:24px">Mock exam scores</p>' +
      '<div class="chart-card">' + mockChartSVG(mocks) + "</div>" +
      '<p class="pace-note">' + P.icon("target", 14) + " Latest estimate: <strong style=\"color:var(--ink)\">" + last.score +
      "</strong> (" + (last.score >= 450 ? "above" : "below") + " the 450 pass line).</p>";
  }
  function calibHTML() {
    var cs = P.confidenceStats();
    if (!cs) return "";
    var order = [["high", "Confident"], ["mid", "Fairly sure"], ["low", "Not sure"]];
    var rows = order.map(function (o) {
      var g = cs[o[0]]; if (!g.seen) return "";
      var acc = Math.round(100 * g.correct / g.seen);
      return '<div class="calib-row"><div class="calib-top"><span>' + o[1] + '</span><span class="dom-pct">' + acc + "%</span></div>" +
        '<div class="dom-bar"><div class="dom-fill" style="width:' + acc + '%"></div></div>' +
        '<div class="dom-sub">right on ' + g.correct + " of " + g.seen + "</div></div>";
    }).join("");
    return '<p class="pills-label" style="margin-top:24px">Confidence check</p>' +
      '<div class="calib">' + rows + "</div>" +
      '<p class="pace-note">' + P.icon("bulb", 14) + " " + esc(calibMsg(cs)) + "</p>";
  }

  function renderProgress(app) {
    var s = P.progress.stats;
    var view = document.createElement("div");
    view.className = "view";

    if (!s || !s.totalSeen) {
      view.innerHTML =
        P.subhead("Progress", "Your strengths and what to focus on", "#/") +
        '<div class="empty-state">' + P.icon("target", 30) +
          '<p>Answer some practice questions and this page will show how you\'re doing in each exam domain — plus anything worth revisiting.</p>' +
          '<button class="btn-solid" id="go-q">' + P.icon("play", 18) + " Start practicing</button>" +
        "</div>";
      app.appendChild(view);
      P.wireBack(view);
      var g = view.querySelector("#go-q");
      if (g) g.addEventListener("click", function () { P.go("#/questions"); });
      return;
    }

    var domains = Q_DOMAINS.slice();
    Object.keys(s.byDomain).forEach(function (d) { if (domains.indexOf(d) < 0) domains.push(d); });

    var overallPct = Math.round(100 * s.totalCorrect / s.totalSeen);
    var missed = P.missedQuestions().length;
    var avgSec = P.avgQuestionSeconds();
    var confWrong = P.confidentlyWrong().length;

    var weakest = null;
    domains.forEach(function (d) {
      var bd = s.byDomain[d];
      if (!bd || !bd.seen) return;
      var acc = bd.correct / bd.seen;
      if (!weakest || acc < weakest.acc) weakest = { d: d, acc: acc };
    });

    var bars = domains.map(function (d) {
      var bd = s.byDomain[d] || { seen: 0, correct: 0 };
      var pct = bd.seen ? Math.round(100 * bd.correct / bd.seen) : 0;
      return '<div class="dom-row">' +
        '<div class="dom-top"><span class="dom-name">' + esc(d) + "</span>" +
          '<span class="dom-pct">' + (bd.seen ? pct + "%" : "—") + "</span></div>" +
        '<div class="dom-bar"><div class="dom-fill" style="width:0" data-pct="' + (bd.seen ? pct : 0) + '"></div></div>' +
        '<div class="dom-sub">' + (bd.seen ? bd.correct + " of " + bd.seen + " correct" : "not practiced yet") + "</div>" +
      "</div>";
    }).join("");

    view.innerHTML =
      P.subhead("Progress", "Your strengths and what to focus on", "#/") +
      '<div class="stat-cards">' +
        '<div class="metric"><div class="metric-num">' + overallPct + '%</div><div class="metric-lbl">overall accuracy</div></div>' +
        '<div class="metric"><div class="metric-num">' + s.totalSeen + '</div><div class="metric-lbl">questions answered</div></div>' +
        '<div class="metric"><div class="metric-num">' + (avgSec != null ? avgSec + "s" : missed) + '</div><div class="metric-lbl">' +
          (avgSec != null ? "avg / question" : "to review") + "</div></div>" +
      "</div>" +
      (avgSec != null ? '<p class="pace-note">' + P.icon("clock", 14) + " " + esc(paceMsg(avgSec)) + "</p>" : "") +
      (confWrong ? '<div class="focus-note warn">' + P.icon("bulb", 16) +
        " <span><strong>" + confWrong + " confident mistake" + (confWrong === 1 ? "" : "s") +
        "</strong> — the single highest-value thing to review, gently.</span></div>" : "") +
      (weakest && weakest.acc < 0.85 ? '<div class="focus-note">' + P.icon("target", 16) +
        " <span>Focus area: <strong>" + esc(weakest.d) + "</strong> — a good place to spend your next session.</span></div>" : "") +
      '<p class="pills-label" style="margin-top:22px">By exam domain</p>' +
      '<div class="dom-list">' + bars + "</div>" +
      (confWrong ? '<button class="btn-solid block-btn" id="review-conf" style="margin-top:10px">' +
        P.icon("bulb", 18) + " Review " + confWrong + " confident mistake" + (confWrong === 1 ? "" : "s") + "</button>" : "") +
      (missed ? '<button class="btn-ghost block-btn" id="review-missed" style="margin-top:10px">' +
        P.icon("refresh", 18) + " Review " + missed + " missed question" + (missed === 1 ? "" : "s") + "</button>" : "") +
      milestonesHTML() +
      mockChartHTML() +
      calibHTML() +
      '<p class="mode-foot">' + P.icon("info", 14) + " Accuracy reflects your most recent answer on each question.</p>";

    app.appendChild(view);
    P.wireBack(view);
    var rm = view.querySelector("#review-missed");
    if (rm) rm.addEventListener("click", function () { P.modes.questions.reviewMissed(app); });
    var rc = view.querySelector("#review-conf");
    if (rc) rc.addEventListener("click", function () { P.modes.questions.reviewConfidentMistakes(app); });
    requestAnimationFrame(function () {
      Array.prototype.forEach.call(view.querySelectorAll(".dom-fill"), function (f) {
        f.style.width = f.getAttribute("data-pct") + "%";
      });
    });
  }

  /* ---- study plan page ---- */
  function planMetric(num, label) {
    return '<div class="metric"><div class="metric-num">' + num + '</div><div class="metric-lbl">' + label + "</div></div>";
  }
  function planMsg(days) {
    if (days > 84) return "Plenty of runway. Build the habit now — a little every day beats cramming later.";
    if (days > 28) return "A solid stretch ahead. Keep steady sessions and take a weekly mock exam to build stamina.";
    if (days > 7) return "Final weeks — lean into your weak areas, your confident misses, and full-length mocks.";
    return "Home stretch. Keep review light, trust your preparation, and protect your rest and sleep.";
  }
  function planRows() {
    var rows = [
      ["Mon", "Evaluation & assessment — questions plus flashcards"],
      ["Tue", "Analysis & planning — questions plus a patient case"],
      ["Wed", "Intervention — questions plus a clinical simulation"],
      ["Thu", "Competency & ethics — questions, then review your misses"],
      ["Fri", "Mixed practice or a timed mock exam"],
      ["Sat", "Review confident misses and any due flashcards"],
      ["Sun", "Rest, or a light domain review"]
    ];
    return rows.map(function (r) {
      return '<div class="plan-row"><span class="plan-day">' + r[0] + '</span><span class="plan-task">' + esc(r[1]) + "</span></div>";
    }).join("");
  }

  function renderPlan(app) {
    var view = document.createElement("div");
    view.className = "view";
    var days = P.daysToExam();
    var dateVal = P.progress.examDate || P.CONFIG.examDateISO || "";
    var body;
    if (days != null && days >= 0) {
      var weeks = Math.max(1, Math.ceil(days / 7));
      var perDay = days > 60 ? 10 : days > 30 ? 15 : 20;
      body =
        '<div class="stat-cards">' +
          planMetric(days, "days to exam") +
          planMetric("~" + weeks, "weeks left") +
          planMetric("~" + perDay, "questions / day") +
        "</div>" +
        '<div class="focus-note">' + P.icon("target", 16) + " <span>" + esc(planMsg(days)) + "</span></div>" +
        '<p class="pills-label" style="margin-top:22px">A simple weekly rhythm</p>' +
        '<div class="plan-list">' + planRows() + "</div>" +
        '<p class="mode-foot">' + P.icon("info", 14) + " Adjust it to fit your life — consistency matters more than perfection.</p>";
    } else if (days != null) {
      body = '<div class="focus-note">' + P.icon("target", 16) + " <span>Your exam date has passed. Update it above if you're planning another sitting.</span></div>";
    } else {
      body = '<p class="mode-intro">Set your exam date and Praxis will count down with you and suggest a simple daily rhythm.</p>';
    }
    view.innerHTML =
      P.subhead("Study plan", "Set your exam date and get a simple plan", "#/") +
      '<div class="plan-date"><label for="exam-date">Exam date</label>' +
        '<input type="date" id="exam-date" value="' + esc(dateVal) + '"></div>' +
      body;
    app.appendChild(view);
    P.wireBack(view);
    var input = view.querySelector("#exam-date");
    input.addEventListener("change", function () {
      P.progress.examDate = input.value || null;
      P.save();
      app.innerHTML = "";
      renderPlan(app);
    });
  }

  /* ---- calm & confidence (wellbeing) page ---- */
  var CHECKLIST = [
    "Get a good night's sleep beforehand",
    "Eat a solid breakfast",
    "Bring your ID and confirmation",
    "Know the test-center location and travel time",
    "Plan to arrive early",
    "Bring water and a snack for the break",
    "Take slow breaths if nerves rise"
  ];
  var TIPS = [
    "A little anxiety is normal — it means you care. Slow breathing tells your body you're safe.",
    "You don't need every question right. Aim for steady, not perfect.",
    "If a question stumps you, flag it and move on — momentum matters.",
    "You've prepared for this. Trust the work you've put in."
  ];

  function checklistHTML() {
    var state = P.progress.checklist || {};
    return CHECKLIST.map(function (t, i) {
      return '<button class="check-item' + (state[i] ? " on" : "") + '" data-i="' + i + '" aria-pressed="' + (state[i] ? "true" : "false") + '">' +
        '<span class="check-box">' + P.icon("check", 14) + "</span><span>" + esc(t) + "</span></button>";
    }).join("");
  }
  function tipsHTML() {
    return TIPS.map(function (t) { return '<div class="tip-card">' + P.icon("heart", 16) + "<span>" + esc(t) + "</span></div>"; }).join("");
  }

  function renderCalm(app) {
    var view = document.createElement("div");
    view.className = "view";
    var cur = P.currentFontScale();
    var sizes = [["sm", "Small"], ["md", "Default"], ["lg", "Large"], ["xl", "Extra"]];
    var sizeBtns = sizes.map(function (x) { return '<button class="size-btn' + (x[0] === cur ? " on" : "") + '" data-sz="' + x[0] + '">A</button>'; }).join("");

    view.innerHTML =
      P.subhead("Calm & confidence", "Steady your nerves and take care of yourself", "#/") +
      '<p class="pills-label">Text size</p>' +
      '<div class="size-row" id="size-row" role="group" aria-label="Text size">' + sizeBtns + "</div>" +
      '<p class="pills-label" style="margin-top:24px">Box breathing</p>' +
      '<div class="breathe-card">' +
        '<div class="breathe-stage"><div class="breathe-circle" id="breathe-circle"><span id="breathe-label">Ready?</span></div></div>' +
        '<button class="btn-solid" id="breathe-btn">' + P.icon("wind", 18) + " Start breathing</button>" +
        '<p class="breathe-hint">Breathe in for 4, hold for 4, out for 4, hold for 4. A minute or two settles the nervous system.</p>' +
      "</div>" +
      '<p class="pills-label" style="margin-top:24px">Exam-day checklist</p>' +
      '<div class="checklist" id="checklist">' + checklistHTML() + "</div>" +
      '<p class="pills-label" style="margin-top:24px">A few reminders</p>' +
      '<div class="tips">' + tipsHTML() + "</div>";

    app.appendChild(view);
    P.wireBack(view);

    Array.prototype.forEach.call(view.querySelectorAll(".size-btn"), function (b) {
      b.addEventListener("click", function () {
        P.applyFontScale(b.getAttribute("data-sz"));
        Array.prototype.forEach.call(view.querySelectorAll(".size-btn"), function (x) { x.classList.toggle("on", x === b); });
      });
    });
    Array.prototype.forEach.call(view.querySelectorAll(".check-item"), function (b) {
      b.addEventListener("click", function () {
        if (!P.progress.checklist) P.progress.checklist = {};
        var i = b.getAttribute("data-i");
        if (P.progress.checklist[i]) delete P.progress.checklist[i]; else P.progress.checklist[i] = true;
        var on = !!P.progress.checklist[i];
        b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false");
        P.save();
      });
    });
    wireBreathing(view);
  }

  function wireBreathing(view) {
    var btn = view.querySelector("#breathe-btn");
    var circle = view.querySelector("#breathe-circle");
    var label = view.querySelector("#breathe-label");
    var running = false, timer = null, pi = 0;
    var phases = [["Breathe in", "add", 4000], ["Hold", "none", 4000], ["Breathe out", "remove", 4000], ["Hold", "none", 4000]];
    function step() {
      var p = phases[pi];
      label.textContent = p[0];
      if (p[1] === "add") circle.classList.add("expanded");
      else if (p[1] === "remove") circle.classList.remove("expanded");
      pi = (pi + 1) % phases.length;
      timer = setTimeout(step, p[2]);
    }
    function start() { running = true; pi = 0; btn.innerHTML = P.icon("x", 18) + " Stop"; step(); }
    function stop() { running = false; clearTimeout(timer); circle.classList.remove("expanded"); label.textContent = "Ready?"; btn.innerHTML = P.icon("wind", 18) + " Start breathing"; }
    btn.addEventListener("click", function () { running ? stop() : start(); });
  }

  /* ---- sources page ---- */
  var SOURCES = [
    {
      group: "Official exam information",
      icon: "school",
      items: [
        { title: "NBCOT — Certification exam info", url: "https://www.nbcot.org/exam-info",
          note: "The official certification board: exam format, eligibility, and scheduling." },
        { title: "NBCOT — Exam outline (the four domains)", url: "https://www.nbcot.org/exam-info/exam-outline",
          note: "The official content outline the exam is built from." },
        { title: "NBCOT — Foundations of the exam", url: "https://www.nbcot.org/exam-info/foundations",
          note: "How the exam is designed and scored (pass = scaled score of 450)." },
        { title: "NBCOT — Study tools & practice tests", url: "https://www.nbcot.org/study-tools",
          note: "Official self-assessments and full-length practice tests." }
      ]
    },
    {
      group: "Study strategies",
      icon: "bulb",
      items: [
        { title: "AOTA — Preparing for the NBCOT OTR exam", url: "https://www.aota.org/publications/student-articles/nbcot/preparing-for-the-nbcot-otr-exam",
          note: "Guidance from the American Occupational Therapy Association." },
        { title: "AOTA — Study tips for the NBCOT OTR exam", url: "https://www.aota.org/publications/student-articles/nbcot/study-tips-for-the-nbcot-otr-exam",
          note: "Active recall, building a schedule, and exam-day endurance." }
      ]
    },
    {
      group: "Practice question banks",
      icon: "target",
      items: [
        { title: "Mometrix — OT practice test", url: "https://www.mometrix.com/academy/nbcot-otr-practice-test/",
          note: "Free sample questions and a study guide." },
        { title: "TrueLearn — OT exam prep", url: "https://truelearn.com/occupational-therapy/ot-exam/",
          note: "Practice questions with detailed rationales (paid)." },
        { title: "TherapyEd — OT exam review", url: "https://www.therapyed.com/nbcots-otr-exam/nbcots-otr-study-guide/",
          note: "A well-known review course and book (paid)." }
      ]
    }
  ];

  function renderSources(app) {
    var view = document.createElement("div");
    view.className = "view";

    var groups = SOURCES.map(function (g) {
      var items = g.items.map(function (it) {
        return '<a class="src-item" href="' + it.url + '" target="_blank" rel="noopener">' +
          '<span class="src-item-top"><span class="src-title">' + esc(it.title) + "</span>" +
          '<span class="ext">' + P.icon("ext", 15) + "</span></span>" +
          '<span class="src-note">' + esc(it.note) + "</span>" +
          '<span class="src-url">' + esc(it.url) + "</span>" +
        "</a>";
      }).join("");
      return '<div class="src-group">' +
        "<h2><span class=\"src-ic\">" + P.icon(g.icon, 17) + "</span>" + esc(g.group) + "</h2>" +
        '<div class="src-list">' + items + "</div></div>";
    }).join("");

    view.innerHTML =
      '<div class="subhead">' +
        '<button class="back" id="src-back" aria-label="Go back">' + P.icon("left", 20) + "</button>" +
        '<div><h1 class="subhead-ttl">Sources</h1>' +
        '<p class="subhead-sub">Where the exam facts and study methods come from</p></div></div>' +
      '<p class="src-intro">These are the resources behind Praxis. Follow any link to verify the information yourself — the exam details come straight from NBCOT and AOTA.</p>' +
      groups +
      '<div class="src-disclaimer">' + P.icon("info", 17) +
        "<span>The practice cases in Praxis are original teaching material and haven't been reviewed by a licensed OT. For clinical accuracy, verify details against trusted course materials and textbooks such as the AOTA Occupational Therapy Practice Framework (OTPF-4), <em>Pedretti's Occupational Therapy</em>, and <em>Willard &amp; Spackman's Occupational Therapy</em>.</span></div>";

    app.appendChild(view);
    var b = view.querySelector("#src-back");
    if (b) b.addEventListener("click", function () { P.go("#/"); });
  }

  P.esc = esc;
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m];
    });
  }

  /* ---- boot ---- */
  function setupTheme() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    function sync() {
      btn.setAttribute("aria-checked",
        document.documentElement.getAttribute("data-theme") === "dark" ? "true" : "false");
    }
    sync();
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("praxis.theme", next); } catch (e) {}
      sync();
    });
  }

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () {
    setupTheme();
    P.applyFontScale(P.currentFontScale());
    var skip = document.getElementById("skip-link");
    if (skip) skip.addEventListener("click", function (e) {
      e.preventDefault();
      var a = document.getElementById("app");
      if (a) { a.focus(); a.scrollIntoView(); }
    });
    paintStreak();
    route();
  });
})(window.Praxis);
