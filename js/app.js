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
    school: '<path d="M12 4l9 4-9 4-9-4z"/><path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>'
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
    var qs = P.progress.questions;
    if (qs && qs.answered) parts.push(qs.correct / qs.answered);
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

    var target = continueTarget();
    var contTitle = target
      ? (target.review ? "Revisit: " + target.c.title
        : (target.resume ? "Continue: " + target.c.title : "Start: " + target.c.title))
      : "Patient cases";
    var contSub = target
      ? (target.resume ? "Patient case · pick up where you left off" : "Patient case · " + target.c.blurb)
      : "Begin your first case";

    var casesDone = countDoneCases();
    var casesTotal = (window.PRAXIS_CASES || []).length;

    view.innerHTML =
      '<section class="hero">' +
        '<div>' +
          '<h1 class="hero-greet">' + greeting() + '</h1>' +
          '<p class="hero-line">' + heroLine(readiness) + '</p>' +
        '</div>' +
        '<div class="ring-wrap">' + ringSVG(readiness) + '<p class="ring-label">progress</p></div>' +
      '</section>' +

      '<div class="encourage">' + P.icon("spark", 20) +
        '<span>' + encourageBanner(readiness) + '</span></div>' +

      '<button class="continue" id="continue-btn">' +
        '<span class="continue-left">' +
          '<span class="continue-ic">' + P.icon("play", 22) + '</span>' +
          '<span style="min-width:0">' +
            '<span class="continue-ttl">' + esc(contTitle) + '</span>' +
            '<span class="continue-sub">' + esc(contSub) + '</span>' +
          '</span>' +
        '</span>' +
        '<span class="btn-solid" aria-hidden="true">' + (target && target.resume ? "Resume" : "Begin") + '</span>' +
      '</button>' +

      '<p class="grid-title">Ways to study</p>' +
      '<div class="modes">' +
        tile("blue", "userHeart", "Patient cases", "Work a real scenario, step by step",
             P.icon("clip", 15) + " " + casesDone + " of " + casesTotal + " completed", "#/cases", false) +
        tile("purple", "list", "Practice questions", "Quiz yourself with instant, kind feedback",
             questionsMeta(), "#/questions", false) +
        tile("green", "cards", "Flashcards", "Spaced repetition on key concepts",
             flashcardsMeta(), "#/flashcards", false) +
        tile("amber", "book", "Domain review", "Focused notes by the 4 exam domains",
             P.icon("book", 15) + " " + ((window.PRAXIS_NOTES || []).length) + " domains", "#/review", false) +
      '</div>' +

      '<p class="foot-note">' + footNote() +
        ' · <a href="#/sources">Sources</a>' +
        ' · <a href="#" id="about-content">about the content</a></p>';

    app.appendChild(view);

    // wire up
    document.getElementById("continue-btn").addEventListener("click", function () {
      if (target) P.go("#/cases/" + target.c.id);
      else P.go("#/cases");
    });
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
    var qs = P.progress.questions;
    if (qs && qs.answered) {
      return P.icon("target", 15) + " " + Math.round(100 * qs.correct / qs.answered) + "% avg · " + qs.answered + " done";
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
    var cfg = P.CONFIG;
    if (cfg.examDateISO) {
      var days = Math.ceil((new Date(cfg.examDateISO) - new Date()) / 86400000);
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
  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () {
    paintStreak();
    route();
  });
})(window.Praxis);
