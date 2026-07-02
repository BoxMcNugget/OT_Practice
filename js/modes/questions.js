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
  var SESSION_SIZE = 10;
  var selected = "All domains";

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
  function poolFor(domain) {
    var all = window.PRAXIS_QUESTIONS || [];
    return domain === "All domains" ? all.slice() : all.filter(function (q) { return q.domain === domain; });
  }

  /* -------- start screen -------- */
  M.render = function (app) {
    var view = document.createElement("div");
    view.className = "view";
    var pills = ["All domains"].concat(DOMAINS).map(function (d) {
      return '<button class="pill' + (d === selected ? " active" : "") + '" data-d="' + esc(d) + '">' + esc(d) + "</button>";
    }).join("");
    var n = Math.min(SESSION_SIZE, poolFor(selected).length);

    view.innerHTML =
      P.subhead("Practice questions", "Quick questions with instant, encouraging feedback", "#/") +
      '<p class="mode-intro">Pick a focus, then begin. You\'ll get ' + n + " question" + (n === 1 ? "" : "s") +
        ", one at a time, each with a gentle explanation afterward.</p>" +
      '<p class="pills-label">Focus</p><div class="pills" id="qpills">' + pills + "</div>" +
      '<button class="btn-solid block-btn" id="qstart">' + P.icon("play", 18) + " Start practice</button>" +
      '<p class="mode-foot">' + P.icon("info", 14) + ' Practice content is a draft — <a href="#/sources">see sources</a>.</p>';

    app.appendChild(view);
    P.wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll("#qpills .pill"), function (b) {
      b.addEventListener("click", function () { selected = b.getAttribute("data-d"); app.innerHTML = ""; M.render(app); });
    });
    view.querySelector("#qstart").addEventListener("click", function () {
      var pool = shuffle(poolFor(selected)).slice(0, SESSION_SIZE);
      renderQ(app, { pool: pool, i: 0, correct: 0, touched: false });
    });
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
      '<p class="progress-text">Question ' + (s.i + 1) + " of " + s.pool.length + "</p>" +
      '<p class="q-prompt">' + esc(q.prompt) + "</p>" +
      '<p class="q-hint">' + P.icon("info", 15) + " " + selectLabel + "</p>" +
      '<div class="options" id="opts">' + opts + "</div>" +
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
        primary.disabled = selection.length === 0;
      });
    });

    primary.addEventListener("click", function () {
      if (!revealed) {
        revealed = true;
        var isBest = setsEqual(selection, q.correct);
        if (isBest) s.correct++;
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
        slot.innerHTML =
          '<div class="feedback ' + tone + '">' +
            '<p class="feedback-head">' + P.icon(isBest ? "check" : "bulb", 18) + " " + esc(head) + "</p>" +
            '<p class="feedback-body">' + esc(lead) + "<br><br>" + q.rationale + "</p>" +
            (q.teach ? '<p class="feedback-teach">' + P.icon("bulb", 15) + " " + esc(q.teach) + "</p>" : "") +
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
    var qs = P.qStats();
    qs.answered += s.pool.length;
    qs.correct += s.correct;
    P.save();

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
