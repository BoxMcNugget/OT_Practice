/* =========================================================
   Praxis · Mock exam mode
   A timed, blueprint-weighted, exam-style test. No feedback
   during the exam (like the real thing); scored at the end with
   an estimated scaled score and a domain-by-domain breakdown.
   ========================================================= */
window.Praxis = window.Praxis || {};
window.Praxis.modes = window.Praxis.modes || {};
(function (P) {
  "use strict";
  var M = {};

  // Approximate NBCOT OTR domain weighting — VERIFY against the current
  // official content outline and adjust. Intervention is the largest domain.
  var BLUEPRINT = {
    "Evaluation & assessment": 0.25,
    "Analysis & planning": 0.23,
    "Intervention": 0.37,
    "Competency & ethics": 0.15
  };
  var DOMAINS = ["Evaluation & assessment", "Analysis & planning", "Intervention", "Competency & ethics"];
  var PER_Q_MS = 80000; // ~1:20 per item, mirroring ~240 min / ~170+ items

  function esc(s) { return P.esc(s); }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function setsEqual(a, b) {
    if (!a || a.length !== b.length) return false;
    return a.slice().sort().join(",") === b.slice().sort().join(",");
  }
  function optText(q, id) {
    for (var i = 0; i < q.options.length; i++) if (q.options[i].id === id) return q.options[i].text;
    return "";
  }

  /* -------- build a blueprint-weighted exam -------- */
  function buildPool(target) {
    var all = window.PRAXIS_QUESTIONS || [];
    var byDomain = {};
    DOMAINS.forEach(function (d) { byDomain[d] = shuffle(all.filter(function (q) { return q.domain === d; })); });
    var picked = [], usedIds = {};
    DOMAINS.forEach(function (d) {
      var want = Math.round(target * (BLUEPRINT[d] || 0));
      byDomain[d].slice(0, want).forEach(function (q) { picked.push(q); usedIds[q.id] = 1; });
    });
    // fill any shortfall (rounding or thin domains) from whatever's left
    if (picked.length < target) {
      shuffle(all.filter(function (q) { return !usedIds[q.id]; }))
        .slice(0, target - picked.length)
        .forEach(function (q) { picked.push(q); usedIds[q.id] = 1; });
    }
    return shuffle(picked).slice(0, target);
  }

  /* -------- scaled-score estimate (UNOFFICIAL) --------
     Anchored so ~65% correct ≈ 450 (the pass mark). The real
     scaling is proprietary — this is only a study estimate. */
  function scaledScore(pct) {
    var s = pct >= 65
      ? 450 + (pct - 65) / 35 * 150
      : 300 + (pct / 65) * 150;
    return Math.max(0, Math.min(600, Math.round(s)));
  }

  function fmtTime(ms) {
    if (ms < 0) ms = 0;
    var total = Math.round(ms / 1000);
    var m = Math.floor(total / 60), sec = total % 60;
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  /* -------- start screen -------- */
  M.render = function (app) {
    var available = (window.PRAXIS_QUESTIONS || []).length;
    var quick = Math.min(20, available);
    var view = document.createElement("div");
    view.className = "view";

    view.innerHTML =
      P.subhead("Mock exam", "Practice under real exam conditions", "#/") +
      '<p class="mode-intro">A timed test with no feedback until the end — just like the real thing. ' +
        "You'll get an estimated scaled score and see exactly which domains to shore up.</p>" +
      '<div class="exam-facts">' +
        '<div class="exam-fact">' + P.icon("clock", 16) + " Timed · about 1:20 per question</div>" +
        '<div class="exam-fact">' + P.icon("chart", 16) + " Weighted across the four domains</div>" +
        '<div class="exam-fact">' + P.icon("target", 16) + " Scaled-score estimate (pass = 450)</div>" +
      "</div>" +
      '<div class="exam-options">' +
        examCard("quick", "Quick mock", quick + " questions · ~" + Math.round(quick * PER_Q_MS / 60000) + " min",
          "A shorter timed set to build rhythm.") +
        examCard("full", "Full mock", available + " questions · ~" + Math.round(available * PER_Q_MS / 60000) + " min",
          "Every question in the bank, timed.") +
      "</div>" +
      '<div class="draft-note">' + P.icon("info", 17) +
        "<span>The real NBCOT exam is roughly 170 questions plus 3 clinical simulations in 4 hours. " +
        "As the question bank grows, the full mock scales toward that. The scaled score here is an unofficial study estimate. " +
        '<a href="#/sources">See sources</a>.</span></div>';

    app.appendChild(view);
    P.wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll(".exam-card"), function (c) {
      c.addEventListener("click", function () {
        var len = c.getAttribute("data-len") === "full" ? available : quick;
        if (!len) { P.toast("No questions available yet."); return; }
        startExam(app, len);
      });
    });
  };

  function examCard(len, title, meta, sub) {
    return '<button class="exam-card" data-len="' + len + '">' +
      '<span class="exam-card-ttl">' + esc(title) + "</span>" +
      '<span class="exam-card-meta">' + esc(meta) + "</span>" +
      '<span class="exam-card-sub">' + esc(sub) + "</span>" +
      '<span class="exam-card-go">' + P.icon("play", 15) + " Begin</span></button>";
  }

  /* -------- run the exam -------- */
  function startExam(app, len) {
    var s = {
      pool: buildPool(len),
      i: 0,
      answers: {},          // qid -> [selected ids]
      durationMs: len * PER_Q_MS,
      startTs: Date.now(),
      timerId: null,
      finished: false,
      touched: false
    };
    renderExamQ(app, s);
  }

  function remaining(s) { return s.durationMs - (Date.now() - s.startTs); }

  function renderExamQ(app, s) {
    app.innerHTML = "";
    var q = s.pool[s.i];
    var view = document.createElement("div");
    view.className = "view";
    var pct = Math.round(s.i / s.pool.length * 100);
    var selectLabel = q.type === "multi" ? "Select all that apply" : "Select one";
    var prior = s.answers[q.id] || [];

    var opts = shuffle(q.options).map(function (o) {
      var on = prior.indexOf(o.id) >= 0;
      return '<button class="opt' + (on ? " selected" : "") + '" data-oid="' + o.id + '" aria-pressed="' + (on ? "true" : "false") + '">' +
        '<span class="opt-box">' + P.icon("check", 14) + "</span>" +
        '<span class="opt-text">' + esc(o.text) + "</span></button>";
    }).join("");

    var last = s.i === s.pool.length - 1;

    view.innerHTML =
      '<div class="exam-bar">' +
        '<button class="exam-quit" id="exam-quit" aria-label="Quit exam">' + P.icon("x", 18) + "</button>" +
        '<div class="exam-timer" id="exam-timer">' + P.icon("clock", 15) + ' <span id="tval">' + fmtTime(remaining(s)) + "</span></div>" +
        '<div class="exam-count">' + (s.i + 1) + " / " + s.pool.length + "</div>" +
      "</div>" +
      '<div class="progress-rail"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<p class="q-prompt" style="margin-top:14px">' + esc(q.prompt) + "</p>" +
      '<p class="q-hint">' + P.icon("info", 15) + " " + selectLabel + "</p>" +
      '<div class="options" id="opts">' + opts + "</div>" +
      '<div class="player-actions">' +
        '<button class="btn-ghost" id="exam-finish">Finish now</button>' +
        '<button class="btn-solid" id="exam-next">' + (last ? "Finish exam" : "Next") + " " + P.icon("right", 18) + "</button>" +
      "</div>";

    app.appendChild(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    var optsWrap = view.querySelector("#opts");
    Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (btn) {
      btn.addEventListener("click", function () {
        var oid = btn.getAttribute("data-oid");
        var sel = s.answers[q.id] || (s.answers[q.id] = []);
        if (q.type === "single") {
          s.answers[q.id] = [oid];
          Array.prototype.forEach.call(optsWrap.querySelectorAll(".opt"), function (b) {
            var on = b === btn; b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        } else {
          var at = sel.indexOf(oid);
          if (at >= 0) sel.splice(at, 1); else sel.push(oid);
          var on = sel.indexOf(oid) >= 0;
          btn.classList.toggle("selected", on); btn.setAttribute("aria-pressed", on ? "true" : "false");
        }
        if (!s.touched) { s.touched = true; P.touchStreak(); }
      });
    });

    view.querySelector("#exam-next").addEventListener("click", function () {
      stopTimer(s);
      if (last) finishExam(app, s);
      else { s.i++; renderExamQ(app, s); }
    });
    view.querySelector("#exam-finish").addEventListener("click", function () {
      if (confirm("Finish the exam now and see your results?")) { stopTimer(s); finishExam(app, s); }
    });
    view.querySelector("#exam-quit").addEventListener("click", function () {
      if (confirm("Quit this exam? Your progress in it won't be saved.")) { stopTimer(s); P.go("#/"); }
    });

    startTimer(s, view);
  }

  function startTimer(s, view) {
    stopTimer(s);
    var tval = view.querySelector("#tval");
    var wrap = view.querySelector("#exam-timer");
    s.timerId = setInterval(function () {
      if (!document.body.contains(tval)) { clearInterval(s.timerId); return; }
      var rem = remaining(s);
      tval.textContent = fmtTime(rem);
      if (rem <= 60000) wrap.classList.add("low");
      if (rem <= 0) { clearInterval(s.timerId); if (!s.finished) finishExam(document.getElementById("app"), s); }
    }, 1000);
  }
  function stopTimer(s) { if (s.timerId) { clearInterval(s.timerId); s.timerId = null; } }

  /* -------- results -------- */
  function finishExam(app, s) {
    if (s.finished) return;
    s.finished = true;
    stopTimer(s);

    var byDomain = {};
    DOMAINS.forEach(function (d) { byDomain[d] = { seen: 0, correct: 0 }; });
    var correct = 0;
    s.pool.forEach(function (q) {
      var sel = s.answers[q.id];
      var isRight = setsEqual(sel, q.correct);
      var d = q.domain || "Other";
      if (!byDomain[d]) byDomain[d] = { seen: 0, correct: 0 };
      byDomain[d].seen++;
      if (isRight) { byDomain[d].correct++; correct++; }
      if (sel && sel.length) P.recordAnswer(q, isRight); // only answered items feed Progress
    });

    var total = s.pool.length;
    var pct = total ? Math.round(100 * correct / total) : 0;
    var scaled = scaledScore(total ? (correct / total * 100) : 0);
    var passed = scaled >= 450;
    var timeUsed = Math.min(s.durationMs, Date.now() - s.startTs);

    var bars = DOMAINS.map(function (d) {
      var bd = byDomain[d]; if (!bd || !bd.seen) return "";
      var dp = Math.round(100 * bd.correct / bd.seen);
      return '<div class="dom-row">' +
        '<div class="dom-top"><span class="dom-name">' + esc(d) + "</span><span class=\"dom-pct\">" + dp + "%</span></div>" +
        '<div class="dom-bar"><div class="dom-fill" style="width:0" data-pct="' + dp + '"></div></div>' +
        '<div class="dom-sub">' + bd.correct + " of " + bd.seen + " correct</div></div>";
    }).join("");

    var app2 = app || document.getElementById("app");
    app2.innerHTML = "";
    var view = document.createElement("div");
    view.className = "view";
    view.innerHTML =
      '<div class="done-wrap">' +
        '<div class="score-ring ' + (passed ? "pass" : "") + '">' +
          '<div class="score-num">' + scaled + "</div><div class=\"score-lbl\">scaled estimate</div></div>" +
        '<h2 class="done-ttl">' + (passed ? "Above the passing line" : "Keep building") + "</h2>" +
        '<p class="done-msg">' + esc(resultMsg(passed)) + "</p>" +
        '<div class="done-stats">' +
          '<div class="stat"><div class="stat-num">' + pct + '%</div><div class="stat-lbl">correct</div></div>' +
          '<div class="stat"><div class="stat-num">' + correct + " / " + total + '</div><div class="stat-lbl">questions</div></div>' +
          '<div class="stat"><div class="stat-num">' + fmtTime(timeUsed) + '</div><div class="stat-lbl">time used</div></div>' +
        "</div>" +
      "</div>" +
      '<p class="pills-label" style="margin-top:6px">By exam domain</p>' +
      '<div class="dom-list">' + bars + "</div>" +
      '<button class="btn-ghost block-btn" id="review-toggle">' + P.icon("list", 18) + " Review your answers</button>" +
      '<div id="review-slot"></div>' +
      '<div class="done-actions" style="margin-top:18px">' +
        '<button class="btn-ghost" id="again">' + P.icon("refresh", 18) + " New mock exam</button>" +
        '<button class="btn-solid" id="home">' + P.icon("home", 18) + " Home</button></div>" +
      '<p class="mode-foot">' + P.icon("info", 14) + " Scaled score is an unofficial study estimate, not an NBCOT score.</p>";

    app2.appendChild(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(function () {
      Array.prototype.forEach.call(view.querySelectorAll(".dom-fill"), function (f) { f.style.width = f.getAttribute("data-pct") + "%"; });
    });

    var reviewOpen = false;
    view.querySelector("#review-toggle").addEventListener("click", function () {
      reviewOpen = !reviewOpen;
      var slot = view.querySelector("#review-slot");
      slot.innerHTML = reviewOpen ? reviewHTML(s) : "";
      this.innerHTML = (reviewOpen ? P.icon("chevUp", 18) + " Hide review" : P.icon("list", 18) + " Review your answers");
    });
    view.querySelector("#again").addEventListener("click", function () { M.render(app2); });
    view.querySelector("#home").addEventListener("click", function () { P.go("#/"); });
  }

  function resultMsg(passed) {
    if (passed) return "On this mock, your estimate landed above the 450 pass mark. That's real evidence your preparation is working — keep it steady.";
    return "This mock came in under 450 — and that's genuinely useful. The domains below show exactly where your next study time will pay off most. You're learning, not being judged.";
  }

  function reviewHTML(s) {
    var rows = s.pool.map(function (q, idx) {
      var sel = s.answers[q.id] || [];
      var right = setsEqual(sel, q.correct);
      var yours = sel.length ? sel.map(function (id) { return esc(optText(q, id)); }).join("; ") : "<em>left blank</em>";
      var best = q.correct.map(function (id) { return esc(optText(q, id)); }).join("; ");
      return '<div class="rev-item ' + (right ? "ok" : "revisit") + '">' +
        '<div class="rev-q">' + (idx + 1) + ". " + esc(q.prompt) + "</div>" +
        '<div class="rev-line"><span class="rev-tag">' + (right ? "You got this" : "Revisit") + "</span></div>" +
        '<div class="rev-ans"><strong>Your answer:</strong> ' + yours + "</div>" +
        (right ? "" : '<div class="rev-ans"><strong>Best answer:</strong> ' + best + "</div>") +
        '<div class="rev-why">' + q.rationale + "</div>" +
      "</div>";
    }).join("");
    return '<div class="rev-list">' + rows + "</div>";
  }

  P.modes.exam = M;
})(window.Praxis);
