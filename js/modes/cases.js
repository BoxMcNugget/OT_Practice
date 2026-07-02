/* =========================================================
   Praxis · Patient cases mode
   Step-through clinical scenarios with supportive feedback.
   ========================================================= */
window.Praxis = window.Praxis || {};
window.Praxis.modes = window.Praxis.modes || {};
(function (P) {
  "use strict";
  var M = {};

  function esc(s) { return P.esc(s); }
  function byId(id) { return (window.PRAXIS_CASES || []).filter(function (c) { return c.id === id; })[0]; }

  function setsEqual(a, b) {
    if (a.length !== b.length) return false;
    var sa = a.slice().sort().join(","), sb = b.slice().sort().join(",");
    return sa === sb;
  }

  // Fisher-Yates shuffle (used so the best answer isn't always in the same spot)
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* -------- case list -------- */
  M.renderList = function (app) {
    var cases = window.PRAXIS_CASES || [];
    var view = document.createElement("div");
    view.className = "view";

    // group cases by practice area, preserving their order
    var areas = [];
    var byArea = {};
    cases.forEach(function (c) {
      var a = c.area || "Other";
      if (!byArea[a]) { byArea[a] = []; areas.push(a); }
      byArea[a].push(c);
    });

    var i = 0;
    var groups = areas.map(function (area) {
      var cards = byArea[area].map(function (c) {
        var pr = P.progress.cases[c.id];
        var done = pr && pr.done;
        var tags = c.domains.map(function (d) { return '<span class="tag">' + esc(d) + "</span>"; }).join("");
        if (done) tags = '<span class="tag done">' + P.icon("check", 13) + " completed</span>" + tags;
        var delay = (i++ * 0.05);
        return '<button class="case-card" data-id="' + c.id + '" style="animation-delay:' + delay + 's">' +
          '<span class="case-ic">' + P.icon("clip", 22) + "</span>" +
          '<span class="case-body">' +
            '<span class="case-ttl">' + esc(c.title) + "</span>" +
            '<span class="case-tags">' + tags + "</span>" +
          "</span>" +
          '<span class="case-go">' + P.icon("chev", 20) + "</span>" +
        "</button>";
      }).join("");
      return '<p class="area-head">' + esc(area) + "</p>" +
             '<div class="case-list">' + cards + "</div>";
    }).join("");

    view.innerHTML =
      subhead("Patient cases", "Choose a scenario and work it through, one step at a time", "#/") +
      groups +
      draftNote();

    app.appendChild(view);
    wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll(".case-card"), function (btn) {
      btn.addEventListener("click", function () { P.go("#/cases/" + btn.getAttribute("data-id")); });
    });
  };

  /* -------- case player -------- */
  M.renderCase = function (id, app) {
    var c = byId(id);
    if (!c) { P.go("#/cases"); return; }

    var cp = P.caseProgress(id);
    cp.total = c.steps.length;
    cp.answered = cp.answered || {};

    var state = {
      c: c, cp: cp,
      i: Math.min(cp.step || 0, c.steps.length - 1),
      selection: [],
      revealed: false,
      touched: false
    };
    // if the case was already finished, start fresh for a re-run
    if (cp.done) { cp.done = false; cp.step = 0; cp.answered = {}; state.i = 0; }

    renderStep(app, state);
  };

  function renderStep(app, s) {
    app.innerHTML = "";
    var c = s.c, step = c.steps[s.i];
    s.selection = [];
    s.revealed = false;

    var view = document.createElement("div");
    view.className = "view";

    var pct = Math.round((s.i) / c.steps.length * 100);
    var selectLabel = step.type === "multi" ? "Select all that apply" : "Select one";

    var opts = shuffle(step.options).map(function (o) {
      return '<button class="opt" data-oid="' + o.id + '" aria-pressed="false">' +
        '<span class="opt-box">' + P.icon("check", 14) + "</span>" +
        '<span class="opt-text">' + esc(o.text) + "</span>" +
        '<span class="opt-note"></span>' +
      "</button>";
    }).join("");

    view.innerHTML =
      subhead(c.title, c.setting, "#/cases") +
      '<div class="progress-rail"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<p class="progress-text">Step ' + (s.i + 1) + " of " + c.steps.length + "</p>" +

      '<div class="patient-card">' +
        '<p class="patient-name">' + P.icon("userHeart", 18) + esc(c.patient.name) + "</p>" +
        '<p class="patient-setting">' + esc(c.patient.setting) + "</p>" +
        '<p class="patient-summary">' + esc(c.patient.summary) + "</p>" +
      "</div>" +

      '<p class="q-prompt">' + esc(step.prompt) + "</p>" +
      '<p class="q-hint">' + P.icon("info", 15) + " " + selectLabel +
        (step.hint ? " · " + esc(step.hint) : "") + "</p>" +

      '<div class="options" id="opts">' + opts + "</div>" +

      '<div id="feedback-slot"></div>' +

      '<div class="player-actions">' +
        '<button class="btn-ghost" id="exit-btn">' + P.icon("left", 18) + " Save &amp; exit</button>" +
        '<button class="btn-solid" id="primary-btn" disabled>Check my thinking</button>' +
      "</div>";

    app.appendChild(view);
    wireBack(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    var optsWrap = view.querySelector("#opts");
    var primary = view.querySelector("#primary-btn");
    view.querySelector("#exit-btn").addEventListener("click", function () {
      P.save();
      P.toast("Saved. Come back whenever you're ready.");
      P.go("#/cases");
    });

    Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (btn) {
      btn.addEventListener("click", function () {
        if (s.revealed) return;
        var oid = btn.getAttribute("data-oid");
        if (step.type === "single") {
          s.selection = [oid];
          Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (b) {
            var on = b === btn;
            b.classList.toggle("selected", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        } else {
          var at = s.selection.indexOf(oid);
          if (at >= 0) s.selection.splice(at, 1); else s.selection.push(oid);
          var onNow = s.selection.indexOf(oid) >= 0;
          btn.classList.toggle("selected", onNow);
          btn.setAttribute("aria-pressed", onNow ? "true" : "false");
        }
        primary.disabled = s.selection.length === 0;
      });
    });

    primary.addEventListener("click", function () {
      if (!s.revealed) reveal(s, view, step, primary);
      else advance(s, app);
    });
  }

  function reveal(s, view, step, primary) {
    s.revealed = true;
    var isBest = setsEqual(s.selection, step.correct);

    if (!s.touched) { s.touched = true; P.touchStreak(); }
    // record only the first answer for a step (protects the "first try" stat)
    if (s.cp.answered[s.i] === undefined) s.cp.answered[s.i] = isBest ? "best" : "review";
    P.save();

    var optsWrap = view.querySelector("#opts");
    Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (btn) {
      var oid = btn.getAttribute("data-oid");
      btn.classList.add("locked");
      var note = btn.querySelector(".opt-note");
      var inCorrect = step.correct.indexOf(oid) >= 0;
      var selected = s.selection.indexOf(oid) >= 0;
      btn.classList.remove("selected");
      if (inCorrect) { btn.classList.add("is-best"); note.textContent = "best choice"; }
      else if (selected) { btn.classList.add("is-review"); note.textContent = "let's revisit"; }
    });

    var slot = view.querySelector("#feedback-slot");
    var tone = isBest ? "affirm" : "revisit";
    var head = isBest ? "Nice reasoning" : "Let's look at this together";
    var lead = isBest ? step.affirm : step.coach;
    slot.innerHTML =
      '<div class="feedback ' + tone + '">' +
        '<p class="feedback-head">' + P.icon(isBest ? "check" : "bulb", 18) + " " + esc(head) + "</p>" +
        '<p class="feedback-body">' + esc(lead) + "<br><br>" + step.rationale + "</p>" +
        (step.teach ? '<p class="feedback-teach">' + P.icon("bulb", 15) + " " + esc(step.teach) + "</p>" : "") +
      "</div>";
    slot.querySelector(".feedback").scrollIntoView({ behavior: "smooth", block: "center" });

    var last = s.i === s.c.steps.length - 1;
    primary.innerHTML = last ? "See how you did " + P.icon("right", 18) : "Next step " + P.icon("right", 18);
  }

  function advance(s, app) {
    var last = s.i === s.c.steps.length - 1;
    s.cp.step = s.i + 1;
    P.save();
    if (last) {
      s.cp.done = true;
      s.cp.firstTry = countBest(s.cp.answered);
      s.cp.total = s.c.steps.length;
      P.save();
      renderDone(app, s);
    } else {
      s.i += 1;
      P.toast(P.pick(P.COPY.nudge));
      renderStep(app, s);
    }
  }

  function countBest(answered) {
    return Object.keys(answered).filter(function (k) { return answered[k] === "best"; }).length;
  }

  /* -------- completion -------- */
  function renderDone(app, s) {
    app.innerHTML = "";
    var c = s.c;
    var best = countBest(s.cp.answered);
    var total = c.steps.length;
    var view = document.createElement("div");
    view.className = "view";

    view.innerHTML =
      '<div class="done-wrap">' +
        '<div class="done-badge">' + P.icon("spark", 40) + "</div>" +
        '<h2 class="done-ttl">Case complete</h2>' +
        '<p class="done-msg">' + esc(P.pick(P.COPY.done)) + "</p>" +
        '<div class="done-stats">' +
          stat(total, "steps worked") +
          stat(best + " / " + total, "spot-on first try") +
        "</div>" +
        '<p class="done-msg" style="font-size:14px">' + doneReflection(best, total) + "</p>" +
        '<div class="done-actions">' +
          '<button class="btn-ghost" id="again-btn">' + P.icon("refresh", 18) + " Redo this case</button>" +
          '<button class="btn-ghost" id="cases-btn">' + P.icon("clip", 18) + " More cases</button>" +
          '<button class="btn-solid" id="home-btn">' + P.icon("home", 18) + " Home</button>" +
        "</div>" +
      "</div>";

    app.appendChild(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    view.querySelector("#again-btn").addEventListener("click", function () {
      s.cp.done = false; s.cp.step = 0; s.cp.answered = {}; P.save();
      M.renderCase(c.id, app);
    });
    view.querySelector("#cases-btn").addEventListener("click", function () { P.go("#/cases"); });
    view.querySelector("#home-btn").addEventListener("click", function () { P.go("#/"); });
  }

  function doneReflection(best, total) {
    if (best === total) return "You reasoned through every step on the first pass — that's real mastery taking shape.";
    if (best >= Math.ceil(total / 2)) return "You worked through the tricky parts and reviewed the rest — that reviewing is exactly what makes it stick.";
    return "The steps you reviewed are now the ones you'll remember best. That's the whole point — you're learning, not being tested.";
  }

  function stat(num, label) {
    return '<div class="stat"><div class="stat-num">' + num + '</div><div class="stat-lbl">' + label + "</div></div>";
  }

  /* -------- shared bits -------- */
  function subhead(title, sub, backHash) {
    return '<div class="subhead">' +
      '<button class="back" data-back="' + backHash + '" aria-label="Go back">' + P.icon("left", 20) + "</button>" +
      "<div><h1 class=\"subhead-ttl\">" + esc(title) + "</h1>" +
      (sub ? '<p class="subhead-sub">' + esc(sub) + "</p>" : "") + "</div></div>";
  }
  function wireBack(view) {
    var b = view.querySelector(".back");
    if (b) b.addEventListener("click", function () { P.go(b.getAttribute("data-back")); });
  }
  function draftNote() {
    return '<div class="draft-note">' + P.icon("info", 17) +
      "<span>These practice cases are original and written to build reasoning, but they haven't been reviewed by a licensed OT yet. Use them to practice thinking — and double-check any clinical detail before you rely on it. " +
      '<a href="#/sources">See sources</a>.</span></div>';
  }

  P.modes.cases = M;
})(window.Praxis);
