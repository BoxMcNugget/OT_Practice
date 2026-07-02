/* =========================================================
   Praxis · Clinical simulations (CST-style) mode
   Opening scene → sections where you pick actions from a list;
   each reveals a consequence and is scored. Supportive results.
   ========================================================= */
window.Praxis = window.Praxis || {};
window.Praxis.modes = window.Praxis.modes || {};
(function (P) {
  "use strict";
  var M = {};
  function esc(s) { return P.esc(s); }
  function byId(id) { return (window.PRAXIS_SIMS || []).filter(function (s) { return s.id === id; })[0]; }

  function simProgress(id) {
    if (!P.progress.sims) P.progress.sims = {};
    return P.progress.sims[id];
  }

  /* -------- list -------- */
  M.renderList = function (app) {
    var sims = window.PRAXIS_SIMS || [];
    var view = document.createElement("div");
    view.className = "view";
    var cards = sims.map(function (s, i) {
      var pr = simProgress(s.id);
      var badge = pr && pr.done ? '<span class="tag done">' + P.icon("check", 13) + " " + pr.pct + "%</span>" : "";
      return '<button class="case-card" data-id="' + s.id + '" style="animation-delay:' + (i * 0.05) + 's">' +
        '<span class="case-ic sim-ic">' + P.icon("pulse", 22) + "</span>" +
        '<span class="case-body">' +
          '<span class="case-ttl">' + esc(s.title) + "</span>" +
          '<span class="case-tags">' + badge +
            '<span class="tag">' + esc(s.area) + "</span>" +
            '<span class="tag">' + esc(s.difficulty) + "</span></span>" +
        "</span>" +
        '<span class="case-go">' + P.icon("chev", 20) + "</span></button>";
    }).join("");

    view.innerHTML =
      P.subhead("Clinical simulations", "Work a case like the exam's simulation test", "#/") +
      '<p class="mode-intro">You\'ll read a scene, then choose the actions you\'d take from a full list. ' +
        "Good choices help your client; harmful ones set them back — just like the real thing. There's no single right answer, only better and worse judgment.</p>" +
      '<div class="case-list">' + cards + "</div>" +
      simDraftNote();

    app.appendChild(view);
    P.wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll(".case-card"), function (b) {
      b.addEventListener("click", function () { P.go("#/sims/" + b.getAttribute("data-id")); });
    });
  };

  /* -------- player -------- */
  M.renderSim = function (id, app) {
    var sim = byId(id);
    if (!sim) { P.go("#/sims"); return; }
    renderIntro(app, { sim: sim, i: 0, picks: [], touched: false });
  };

  function renderIntro(app, s) {
    app.innerHTML = "";
    var sim = s.sim;
    var view = document.createElement("div");
    view.className = "view";
    view.innerHTML =
      P.subhead(sim.title, sim.area + " · " + sim.sections.length + " sections", "#/sims") +
      '<div class="patient-card">' +
        '<p class="patient-name">' + P.icon("userHeart", 18) + esc(sim.patient.name) + "</p>" +
        '<p class="patient-summary">' + esc(sim.patient.scene) + "</p>" +
      "</div>" +
      '<div class="sim-howto">' + P.icon("info", 16) +
        "<span>In each section, tap the actions you'd take. You'll see what each one leads to. Choose thoughtfully — you can change your mind before continuing.</span></div>" +
      '<button class="btn-solid block-btn" id="sim-begin">' + P.icon("play", 18) + " Begin simulation</button>" +
      simDraftNote();
    app.appendChild(view);
    P.wireBack(view);
    view.querySelector("#sim-begin").addEventListener("click", function () {
      s.picks = sim.sections.map(function () { return {}; }); // per-section selected map
      renderSection(app, s);
    });
  }

  function renderSection(app, s) {
    app.innerHTML = "";
    var sim = s.sim, sec = sim.sections[s.i];
    var view = document.createElement("div");
    view.className = "view";
    var pct = Math.round(s.i / sim.sections.length * 100);
    var last = s.i === sim.sections.length - 1;
    var selected = s.picks[s.i];

    var rows = sec.options.map(function (o) {
      var on = !!selected[o.id];
      return '<div class="cst-opt' + (on ? " selected" : "") + '" data-oid="' + o.id + '">' +
        '<button class="cst-row" aria-pressed="' + (on ? "true" : "false") + '">' +
          '<span class="cst-check">' + P.icon("check", 14) + "</span>" +
          '<span class="cst-text">' + esc(o.text) + "</span>" +
        "</button>" +
        '<div class="cst-result">' + P.icon("right", 14) + "<span>" + esc(o.result) + "</span></div>" +
      "</div>";
    }).join("");

    view.innerHTML =
      P.subhead(sim.title, "Section " + (s.i + 1) + " of " + sim.sections.length, "#/sims") +
      '<div class="progress-rail"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<p class="q-prompt" style="margin-top:14px">' + esc(sec.prompt) + "</p>" +
      '<div class="cst-list">' + rows + "</div>" +
      '<div class="player-actions">' +
        '<button class="btn-ghost" id="sim-exit">' + P.icon("home", 18) + " Exit</button>" +
        '<button class="btn-solid" id="sim-continue">' + (last ? "See results" : "Continue") + " " + P.icon("right", 18) + "</button>" +
      "</div>";

    app.appendChild(view);
    P.wireBack(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    Array.prototype.forEach.call(view.querySelectorAll(".cst-opt"), function (row) {
      var btn = row.querySelector(".cst-row");
      btn.addEventListener("click", function () {
        var oid = row.getAttribute("data-oid");
        var now = !selected[oid];
        if (now) selected[oid] = true; else delete selected[oid];
        row.classList.toggle("selected", now);
        btn.setAttribute("aria-pressed", now ? "true" : "false");
        if (!s.touched) { s.touched = true; P.touchStreak(); }
      });
    });

    view.querySelector("#sim-exit").addEventListener("click", function () {
      if (confirm("Exit this simulation? Your progress in it won't be saved.")) P.go("#/sims");
    });
    view.querySelector("#sim-continue").addEventListener("click", function () {
      if (last) finishSim(app, s);
      else { s.i++; renderSection(app, s); }
    });
  }

  /* -------- scoring + results -------- */
  function scoreSection(sec, selected) {
    var earned = 0, maxPos = 0, harmful = [], keyMissed = [];
    sec.options.forEach(function (o) {
      if (o.score > 0) maxPos += o.score;
      if (selected[o.id]) {
        earned += o.score;
        if (o.score < 0) harmful.push(o);
      } else if (o.score >= 2) {
        keyMissed.push(o);
      }
    });
    var pct = maxPos > 0 ? Math.max(0, Math.min(1, earned / maxPos)) : 0;
    return { earned: earned, maxPos: maxPos, pct: Math.round(pct * 100), harmful: harmful, keyMissed: keyMissed };
  }

  function finishSim(app, s) {
    var sim = s.sim;
    var totalEarned = 0, totalMax = 0, anyHarmful = false;
    var perSection = sim.sections.map(function (sec, idx) {
      var r = scoreSection(sec, s.picks[idx]);
      totalEarned += r.earned; totalMax += r.maxPos;
      if (r.harmful.length) anyHarmful = true;
      return r;
    });
    var overall = totalMax > 0 ? Math.round(Math.max(0, Math.min(1, totalEarned / totalMax)) * 100) : 0;

    if (!P.progress.sims) P.progress.sims = {};
    P.progress.sims[sim.id] = { done: true, pct: overall };
    P.save();

    app.innerHTML = "";
    var view = document.createElement("div");
    view.className = "view";

    var secBars = perSection.map(function (r, idx) {
      return '<div class="dom-row">' +
        '<div class="dom-top"><span class="dom-name">Section ' + (idx + 1) + "</span><span class=\"dom-pct\">" + r.pct + "%</span></div>" +
        '<div class="dom-bar"><div class="dom-fill" style="width:0" data-pct="' + r.pct + '"></div></div></div>';
    }).join("");

    var review = sim.sections.map(function (sec, idx) {
      var r = perSection[idx];
      var keyList = sec.options.filter(function (o) { return o.score >= 2; })
        .map(function (o) { return "<li>" + P.icon("check", 14) + "<span>" + esc(o.text) + "</span></li>"; }).join("");
      var harmedList = r.harmful.length
        ? '<div class="sim-flag">' + P.icon("info", 15) + " <span>A couple of choices here would have set your client back: " +
          r.harmful.map(function (o) { return esc(o.text.toLowerCase()); }).join("; ") + ". Worth noting why.</span></div>"
        : "";
      return '<div class="sim-review-sec">' +
        "<h3>Section " + (idx + 1) + " — the choices that mattered most</h3>" +
        '<ul class="note-points">' + keyList + "</ul>" + harmedList + "</div>";
    }).join("");

    view.innerHTML =
      '<div class="done-wrap">' +
        '<div class="done-badge">' + P.icon("pulse", 40) + "</div>" +
        '<h2 class="done-ttl">Simulation complete</h2>' +
        '<div class="done-stats"><div class="stat"><div class="stat-num">' + overall + '%</div>' +
          '<div class="stat-lbl">clinical judgment</div></div></div>' +
        '<p class="done-msg">' + esc(simResultMsg(overall, anyHarmful)) + "</p>" +
      "</div>" +
      '<p class="pills-label" style="margin-top:4px">By section</p>' +
      '<div class="dom-list">' + secBars + "</div>" +
      '<div class="sim-review">' + review + "</div>" +
      '<div class="done-actions" style="margin-top:18px">' +
        '<button class="btn-ghost" id="again">' + P.icon("refresh", 18) + " Try again</button>" +
        '<button class="btn-ghost" id="more">' + P.icon("pulse", 18) + " More simulations</button>" +
        '<button class="btn-solid" id="home">' + P.icon("home", 18) + " Home</button></div>";

    app.appendChild(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(function () {
      Array.prototype.forEach.call(view.querySelectorAll(".dom-fill"), function (f) { f.style.width = f.getAttribute("data-pct") + "%"; });
    });
    view.querySelector("#again").addEventListener("click", function () { M.renderSim(sim.id, app); });
    view.querySelector("#more").addEventListener("click", function () { P.go("#/sims"); });
    view.querySelector("#home").addEventListener("click", function () { P.go("#/"); });
  }

  function simResultMsg(pct, anyHarmful) {
    if (pct >= 85) return "Strong, safe clinical judgment throughout — this is exactly the kind of reasoning the exam rewards.";
    if (pct >= 60) return anyHarmful
      ? "Solid overall. A few choices would have set your client back — the review below shows which, so next time is even safer."
      : "Solid work. The review below highlights the choices that mattered most so you can sharpen your reasoning.";
    return "You worked the whole case — that's how this skill grows. The review below shows the highest-value actions and anything to rethink. This is practice, not judgment.";
  }

  function simDraftNote() {
    return '<div class="draft-note">' + P.icon("info", 17) +
      "<span>These simulations are original teaching drafts, not reviewed by a licensed OT. Practice the reasoning, and verify clinical details before relying on them. " +
      '<a href="#/sources">See sources</a>.</span></div>';
  }

  P.modes.sims = M;
})(window.Praxis);
