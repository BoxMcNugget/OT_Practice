/* =========================================================
   Praxis · Practice questions mode
   Active-recall quizzes with instant, encouraging feedback.
   ========================================================= */
window.Praxis = window.Praxis || {};
window.Praxis.modes = window.Praxis.modes || {};
(function (P) {
  "use strict";
  var M = {};
  var DOMAINS = ["Evaluation & assessment", "Analysis & planning", "Intervention", "Competency & ethics"];
  var LEVELS = ["Core", "Challenge", "Mixed"];
  var SESSION_SIZE = 10;
  var selected = "All domains";
  var selectedLevel = "Mixed";
  function levelOf(q) { return q.difficulty || "Core"; }

  function esc(s) { return P.esc(s); }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function setsEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.slice().sort().join(",") === b.slice().sort().join(",");
  }

  // per-distractor rationale breakdown, shown after answering (if authored)
  function whyHTML(q) {
    var whys = (window.PRAXIS_WHYS || {})[q.id];
    if (!whys) return "";
    var rows = q.options.map(function (o) {
      var correct = q.correct.indexOf(o.id) >= 0;
      var w = whys[o.id] || "";
      return '<li class="why-row ' + (correct ? "ok" : "no") + '">' +
        '<span class="why-ic">' + P.icon(correct ? "check" : "minus", 13) + "</span>" +
        '<span class="why-text"><strong>' + esc(o.text) + "</strong>" + (w ? " — " + esc(w) : "") + "</span></li>";
    }).join("");
    return '<div class="why-list"><p class="why-title">Why each option</p><ul>' + rows + "</ul></div>";
  }
  function poolFor(domain, level) {
    var all = window.PRAXIS_QUESTIONS || [];
    return all.filter(function (q) {
      var domOk = domain === "All domains" || q.domain === domain;
      var lvlOk = level === "Mixed" || levelOf(q) === level;
      return domOk && lvlOk;
    });
  }

  // weights a session toward missed questions, then weakest domains, then fresh ones
  function buildAdaptivePool(level, size) {
    var all = window.PRAXIS_QUESTIONS || [];
    var byLevel = function (q) { return level === "Mixed" || levelOf(q) === level; };
    var candidates = all.filter(byLevel);
    var stats = P.progress.stats;
    var chosen = [], used = {};
    function add(q) { if (!used[q.id]) { used[q.id] = 1; chosen.push(q); } }

    // 1) questions previously missed
    var missed = (P.missedQuestions ? P.missedQuestions() : []).filter(byLevel);
    shuffle(missed).forEach(function (q) { if (chosen.length < size) add(q); });

    // 2) questions from the weakest-scoring domains
    if (stats && stats.byDomain) {
      var doms = Object.keys(stats.byDomain).filter(function (d) { return stats.byDomain[d].seen; });
      doms.sort(function (a, b) {
        return (stats.byDomain[a].correct / stats.byDomain[a].seen) - (stats.byDomain[b].correct / stats.byDomain[b].seen);
      });
      doms.forEach(function (d) {
        shuffle(candidates.filter(function (q) { return q.domain === d; })).forEach(function (q) { if (chosen.length < size) add(q); });
      });
    }
    // 3) fill with anything else
    shuffle(candidates).forEach(function (q) { if (chosen.length < size) add(q); });
    return shuffle(chosen).slice(0, size);
  }

  /* -------- start screen -------- */
  M.render = function (app) {
    var view = document.createElement("div");
    view.className = "view";
    var pills = ["All domains"].concat(DOMAINS).map(function (d) {
      return '<button class="pill' + (d === selected ? " active" : "") + '" data-d="' + esc(d) + '">' + esc(d) + "</button>";
    }).join("");
    var levelPills = LEVELS.map(function (l) {
      return '<button class="pill' + (l === selectedLevel ? " active" : "") + '" data-l="' + esc(l) + '">' + esc(l) + "</button>";
    }).join("");
    var avail = poolFor(selected, selectedLevel).length;
    var n = Math.min(SESSION_SIZE, avail);

    view.innerHTML =
      P.subhead("Practice questions", "Quick questions with instant, encouraging feedback", "#/") +
      '<p class="mode-intro">Pick a focus and a level, then begin. You\'ll get ' + n + " question" + (n === 1 ? "" : "s") +
        ", one at a time, each with a gentle explanation afterward.</p>" +
      '<p class="pills-label">Level</p><div class="pills" id="qlevels">' + levelPills + "</div>" +
      '<p class="level-note">' + levelBlurb(selectedLevel) + "</p>" +
      '<p class="pills-label">Focus</p><div class="pills" id="qpills">' + pills + "</div>" +
      '<button class="btn-solid block-btn" id="qstart"' + (n === 0 ? " disabled" : "") + ">" +
        P.icon("play", 18) + " Start practice</button>" +
      '<button class="btn-ghost block-btn" id="qsmart" style="margin-top:10px">' +
        P.icon("target", 18) + " Smart practice · focus on your weak spots</button>" +
      '<p class="mode-foot">' + P.icon("info", 14) + ' Practice content is a draft — <a href="#/sources">see sources</a>.</p>';

    app.appendChild(view);
    P.wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll("#qpills .pill"), function (b) {
      b.addEventListener("click", function () { selected = b.getAttribute("data-d"); app.innerHTML = ""; M.render(app); });
    });
    Array.prototype.forEach.call(view.querySelectorAll("#qlevels .pill"), function (b) {
      b.addEventListener("click", function () { selectedLevel = b.getAttribute("data-l"); app.innerHTML = ""; M.render(app); });
    });
    view.querySelector("#qstart").addEventListener("click", function () {
      var pool = shuffle(poolFor(selected, selectedLevel)).slice(0, SESSION_SIZE);
      if (!pool.length) return;
      renderQ(app, { pool: pool, i: 0, correct: 0, touched: false });
    });
    view.querySelector("#qsmart").addEventListener("click", function () {
      var pool = buildAdaptivePool(selectedLevel, SESSION_SIZE);
      if (!pool.length) { P.toast("Add a few answers first, then Smart practice can target your weak spots."); return; }
      renderQ(app, { pool: pool, i: 0, correct: 0, touched: false });
    });
  };

  function levelBlurb(level) {
    if (level === "Core") return "Core — build the fundamentals with clear, foundational questions.";
    if (level === "Challenge") return "Challenge — exam-style questions where every option looks reasonable and you pick the best.";
    return "Mixed — a blend of Core and Challenge questions.";
  }

  /* -------- review only the questions she's missed (due ones first) -------- */
  M.reviewMissed = function (app) {
    var missed = P.missedQuestions ? P.missedQuestions() : [];
    if (!missed.length) {
      P.toast("Nothing to review right now — nice work!");
      P.go("#/progress");
      return;
    }
    var ans = (P.progress.stats && P.progress.stats.answered) || {};
    missed.sort(function (a, b) { return ((ans[a.id] || {}).due || 0) - ((ans[b.id] || {}).due || 0); });
    renderQ(app, { pool: missed.slice(0, 20), i: 0, correct: 0, touched: false });
  };

  /* -------- review the ones she was confident but wrong about -------- */
  M.reviewConfidentMistakes = function (app) {
    var pool = P.confidentlyWrong ? P.confidentlyWrong() : [];
    if (!pool.length) { P.toast("No confident mistakes to review — that's a good place to be."); P.go("#/progress"); return; }
    renderQ(app, { pool: shuffle(pool).slice(0, 20), i: 0, correct: 0, touched: false });
  };

  /* -------- one question -------- */
  function renderQ(app, s) {
    app.innerHTML = "";
    var q = s.pool[s.i];
    var view = document.createElement("div");
    view.className = "view";
    var pct = Math.round((s.i) / s.pool.length * 100);
    var selectLabel = q.type === "multi" ? "Select all that apply" : "Select one";
    var opts = shuffle(q.options).map(function (o) {
      return '<button class="opt" data-oid="' + o.id + '" aria-pressed="false">' +
        '<span class="opt-box">' + P.icon("check", 14) + "</span>" +
        '<span class="opt-text">' + esc(o.text) + "</span>" +
        '<span class="opt-note"></span></button>';
    }).join("");

    view.innerHTML =
      P.subhead("Practice questions", q.domain, "#/questions") +
      '<div class="progress-rail"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<p class="progress-text">Question ' + (s.i + 1) + " of " + s.pool.length +
        (levelOf(q) === "Challenge" ? ' <span class="level-badge challenge">Challenge</span>' : "") + "</p>" +
      '<p class="q-prompt">' + esc(q.prompt) + "</p>" +
      P.questionFigure(q) +
      '<p class="q-hint">' + P.icon("info", 15) + " " + selectLabel + "</p>" +
      '<div class="options" id="opts">' + opts + "</div>" +
      '<div class="conf" id="conf">' +
        '<span class="conf-label">How sure are you?</span>' +
        '<div class="conf-opts">' +
          '<button class="conf-chip" data-c="low">Not sure</button>' +
          '<button class="conf-chip" data-c="mid">Fairly sure</button>' +
          '<button class="conf-chip" data-c="high">Confident</button>' +
        "</div></div>" +
      '<div id="feedback-slot"></div>' +
      '<div class="player-actions">' +
        '<button class="btn-ghost" id="exit-btn">' + P.icon("home", 18) + " Exit</button>" +
        '<button class="btn-solid" id="primary-btn" disabled>Check my thinking</button></div>';

    app.appendChild(view);
    P.wireBack(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    var optsWrap = view.querySelector("#opts");
    var primary = view.querySelector("#primary-btn");
    var selection = [];
    var revealed = false;
    var selectedConfidence = null;
    var startTime = Date.now();
    function refreshPrimary() { primary.disabled = !(selection.length && selectedConfidence); }

    view.querySelector("#exit-btn").addEventListener("click", function () { P.go("#/"); });

    Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (btn) {
      btn.addEventListener("click", function () {
        if (revealed) return;
        var oid = btn.getAttribute("data-oid");
        if (q.type === "single") {
          selection = [oid];
          Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (b) {
            var on = b === btn; b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        } else {
          var at = selection.indexOf(oid);
          if (at >= 0) selection.splice(at, 1); else selection.push(oid);
          var on = selection.indexOf(oid) >= 0;
          btn.classList.toggle("selected", on); btn.setAttribute("aria-pressed", on ? "true" : "false");
        }
        refreshPrimary();
      });
    });

    var confWrap = view.querySelector("#conf");
    Array.prototype.forEach.call(confWrap.querySelectorAll(".conf-chip"), function (btn) {
      btn.addEventListener("click", function () {
        if (revealed) return;
        selectedConfidence = btn.getAttribute("data-c");
        Array.prototype.forEach.call(confWrap.querySelectorAll(".conf-chip"), function (b) { b.classList.toggle("on", b === btn); });
        refreshPrimary();
      });
    });

    primary.addEventListener("click", function () {
      if (!revealed) {
        revealed = true;
        confWrap.style.display = "none";
        var isBest = setsEqual(selection, q.correct);
        if (isBest) s.correct++;
        P.recordAnswer(q, isBest, selectedConfidence, Date.now() - startTime);
        if (!s.touched) { s.touched = true; P.touchStreak(); }
        Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (btn) {
          var oid = btn.getAttribute("data-oid");
          btn.classList.add("locked"); btn.classList.remove("selected");
          var note = btn.querySelector(".opt-note");
          if (q.correct.indexOf(oid) >= 0) { btn.classList.add("is-best"); note.textContent = "best choice"; }
          else if (selection.indexOf(oid) >= 0) { btn.classList.add("is-review"); note.textContent = "let's revisit"; }
        });
        var slot = view.querySelector("#feedback-slot");
        var tone = isBest ? "affirm" : "revisit";
        var head = isBest ? "Nice reasoning" : "Let's look at this together";
        var lead = isBest ? q.affirm : q.coach;
        var metaNote = "";
        if (!isBest && selectedConfidence === "high") {
          metaNote = '<p class="feedback-meta">' + P.icon("bulb", 14) +
            " You felt sure on this one, so it's a high-value one to revisit — no judgment, just useful data.</p>";
        } else if (isBest && selectedConfidence === "low") {
          metaNote = '<p class="feedback-meta">' + P.icon("check", 14) +
            " You got it even though you weren't sure — your instincts are stronger than you think.</p>";
        }
        slot.innerHTML =
          '<div class="feedback ' + tone + '">' +
            '<p class="feedback-head">' + P.icon(isBest ? "check" : "bulb", 18) + " " + esc(head) + "</p>" +
            '<p class="feedback-body">' + esc(lead) + "<br><br>" + q.rationale + "</p>" +
            (q.teach ? '<p class="feedback-teach">' + P.icon("bulb", 15) + " " + esc(q.teach) + "</p>" : "") +
            metaNote +
            whyHTML(q) +
          "</div>";
        slot.querySelector(".feedback").scrollIntoView({ behavior: "smooth", block: "center" });
        var last = s.i === s.pool.length - 1;
        primary.innerHTML = last ? "See how you did " + P.icon("right", 18) : "Next question " + P.icon("right", 18);
      } else {
        if (s.i === s.pool.length - 1) finish(app, s);
        else { s.i++; P.toast(P.pick(P.COPY.nudge)); renderQ(app, s); }
      }
    });
  }

  /* -------- results -------- */
  function finish(app, s) {
    // per-question outcomes are recorded live in P.recordAnswer during each reveal
    app.innerHTML = "";
    var view = document.createElement("div");
    view.className = "view";
    var total = s.pool.length;
    view.innerHTML =
      '<div class="done-wrap">' +
        '<div class="done-badge">' + P.icon("spark", 40) + "</div>" +
        '<h2 class="done-ttl">Practice complete</h2>' +
        '<p class="done-msg">' + esc(P.pick(P.COPY.done)) + "</p>" +
        '<div class="done-stats">' +
          stat(s.correct + " / " + total, "spot-on first try") +
          stat(total, "questions worked") +
        "</div>" +
        '<p class="done-msg" style="font-size:14px">' + reflect(s.correct, total) + "</p>" +
        '<div class="done-actions">' +
          '<button class="btn-ghost" id="again">' + P.icon("refresh", 18) + " Practice again</button>" +
          '<button class="btn-solid" id="home">' + P.icon("home", 18) + " Home</button></div></div>";
    app.appendChild(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    view.querySelector("#again").addEventListener("click", function () { app.innerHTML = ""; M.render(app); });
    view.querySelector("#home").addEventListener("click", function () { P.go("#/"); });
  }

  function reflect(c, t) {
    if (c === t) return "Every one on the first try — your recall is really coming together.";
    if (c >= Math.ceil(t / 2)) return "Solid work. The ones you reviewed are exactly what to revisit next time — that's how it sticks.";
    return "This is practice, not a test. The questions you reviewed are the ones you're now learning — that's the win.";
  }
  function stat(num, label) {
    return '<div class="stat"><div class="stat-num">' + num + '</div><div class="stat-lbl">' + label + "</div></div>";
  }

  P.modes.questions = M;
})(window.Praxis);
