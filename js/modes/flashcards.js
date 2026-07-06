/* =========================================================
   Praxis · Flashcards mode
   Lightweight spaced repetition. Cards you're "still learning"
   come back sooner; cards you "know" space out over time.
   ========================================================= */
window.Praxis = window.Praxis || {};
window.Praxis.modes = window.Praxis.modes || {};
(function (P) {
  "use strict";
  var M = {};
  var DAY = 86400000;
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days per level
  var selected = "All";
  var MAX_SESSION = 20;

  function esc(s) { return P.esc(s); }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function categories() {
    var seen = {}, list = [];
    (window.PRAXIS_FLASHCARDS || []).forEach(function (c) { if (!seen[c.category]) { seen[c.category] = 1; list.push(c.category); } });
    return list;
  }
  function inCategory(c) { return selected === "All" || c.category === selected; }
  function isDue(card) { var st = P.cardState(card.id); return !st.due || st.due <= Date.now(); }

  /* -------- start screen -------- */
  M.render = function (app) {
    var view = document.createElement("div");
    view.className = "view";
    var cats = ["All"].concat(categories());
    var pills = cats.map(function (c) {
      return '<button class="pill' + (c === selected ? " active" : "") + '" data-c="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    var pool = (window.PRAXIS_FLASHCARDS || []).filter(inCategory);
    var due = pool.filter(isDue).length;
    var btnLabel = due > 0 ? "Start review · " + due + " due" : "Review all cards";

    view.innerHTML =
      P.subhead("Flashcards", "Spaced repetition — the tricky ones come back sooner", "#/") +
      '<p class="mode-intro">Tap a card to flip it, then say whether you\'re still learning it or you\'ve got it. Praxis remembers, and brings the harder ones back sooner.</p>' +
      '<p class="pills-label">Deck</p><div class="pills" id="fcpills">' + pills + "</div>" +
      '<div class="fc-summary">' +
        '<span>' + P.icon("refresh", 16) + " " + due + " due today</span>" +
        '<span>' + P.icon("cards", 16) + " " + pool.length + " in deck</span>" +
      "</div>" +
      '<button class="btn-solid block-btn" id="fcstart">' + P.icon("play", 18) + " " + btnLabel + "</button>" +
      '<p class="mode-foot">' + P.icon("info", 14) + ' Study content is a draft — <a href="#/sources">see sources</a>.</p>';

    app.appendChild(view);
    P.wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll("#fcpills .pill"), function (b) {
      b.addEventListener("click", function () { selected = b.getAttribute("data-c"); app.innerHTML = ""; M.render(app); });
    });
    view.querySelector("#fcstart").addEventListener("click", function () {
      var pool2 = (window.PRAXIS_FLASHCARDS || []).filter(inCategory);
      var dueCards = pool2.filter(isDue);
      var deck = (dueCards.length ? dueCards : pool2);
      var queue = shuffle(deck).slice(0, MAX_SESSION);
      runSession(app, { queue: queue, seen: {}, learned: 0, reviewing: 0, total: queue.length, touched: false });
    });
  };

  /* -------- session -------- */
  function runSession(app, s) {
    if (!s.queue.length) { finish(app, s); return; }
    var card = s.queue.shift();
    renderCard(app, s, card);
  }

  function renderCard(app, s, card) {
    app.innerHTML = "";
    if (P.stopSpeaking) P.stopSpeaking();
    var view = document.createElement("div");
    view.className = "view";
    var doneCount = s.total - s.queue.length; // 1-based position of current

    view.innerHTML =
      P.subhead("Flashcards", card.category, "#/flashcards") +
      '<div class="fc-toprow"><span class="progress-text">Card ' + doneCount + " of " + s.total + "</span>" +
        '<button class="listen-btn" id="fc-listen" aria-label="Listen to this card">' + P.icon("volume", 15) + " Listen</button></div>" +
      '<div class="flashcard-wrap"><div class="flashcard" id="card" tabindex="0" role="button" aria-label="Tap to flip the card">' +
        '<div class="fc-face fc-front">' +
          '<span class="fc-cat">' + esc(card.category) + "</span>" +
          '<p class="fc-text">' + esc(card.front) + "</p>" +
          '<span class="fc-hint">' + P.icon("refresh", 14) + " tap to reveal</span>" +
        "</div>" +
        '<div class="fc-face fc-back">' +
          '<span class="fc-cat">answer</span>' +
          '<p class="fc-text fc-back-text">' + esc(card.back) + "</p>" +
        "</div>" +
      "</div></div>" +
      '<div class="fc-actions" id="fcact" aria-hidden="true">' +
        '<button class="btn-ghost fc-again" id="still">' + P.icon("refresh", 18) + " Still learning</button>" +
        '<button class="btn-solid fc-got" id="got">' + P.icon("check", 18) + " Got it</button>" +
      "</div>";

    app.appendChild(view);
    P.wireBack(view);
    window.scrollTo({ top: 0, behavior: "smooth" });

    var cardEl = view.querySelector("#card");
    var actions = view.querySelector("#fcact");
    var flipped = false;
    function flip() {
      if (flipped) return;
      flipped = true;
      cardEl.classList.add("back-shown");
      actions.classList.add("show");
      actions.setAttribute("aria-hidden", "false");
    }
    cardEl.addEventListener("click", flip);
    cardEl.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });

    var listen = view.querySelector("#fc-listen");
    if (listen) listen.addEventListener("click", function () { P.speak(flipped ? card.back : card.front); });

    if (!s.touched) { s.touched = true; P.touchStreak(); }

    view.querySelector("#got").addEventListener("click", function () { grade(app, s, card, true); });
    view.querySelector("#still").addEventListener("click", function () { grade(app, s, card, false); });
  }

  function grade(app, s, card, gotIt) {
    var st = P.cardState(card.id);
    if (gotIt) {
      st.level = Math.min((st.level || 0) + 1, INTERVALS.length - 1);
      st.due = Date.now() + INTERVALS[st.level] * DAY;
      s.learned++;
    } else {
      st.level = 0;
      st.due = Date.now() + 10 * 60 * 1000; // ~10 minutes; comes back soon
      s.reviewing++;
      var count = (s.seen[card.id] || 0);
      if (count < 2) { s.seen[card.id] = count + 1; s.queue.push(card); } // see it again this session (max twice)
    }
    P.save();
    runSession(app, s);
  }

  /* -------- completion -------- */
  function finish(app, s) {
    app.innerHTML = "";
    var view = document.createElement("div");
    view.className = "view";
    view.innerHTML =
      '<div class="done-wrap">' +
        '<div class="done-badge">' + P.icon("spark", 40) + "</div>" +
        '<h2 class="done-ttl">Deck complete</h2>' +
        '<p class="done-msg">' + esc(reflect(s)) + "</p>" +
        '<div class="done-stats">' +
          stat(s.learned, "marked known") +
          stat(s.reviewing, "still learning") +
        "</div>" +
        '<p class="done-msg" style="font-size:14px">The ones you\'re still learning will come back around soon — that\'s the spaced repetition working for you.</p>' +
        '<div class="done-actions">' +
          '<button class="btn-ghost" id="again">' + P.icon("refresh", 18) + " Review again</button>" +
          '<button class="btn-solid" id="home">' + P.icon("home", 18) + " Home</button></div></div>";
    app.appendChild(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    view.querySelector("#again").addEventListener("click", function () { app.innerHTML = ""; M.render(app); });
    view.querySelector("#home").addEventListener("click", function () { P.go("#/"); });
  }

  function reflect(s) {
    if (s.reviewing === 0) return "You knew every card in this set — lovely work.";
    if (s.learned >= s.reviewing) return "Great session. You're locking these in nicely.";
    return "You showed up and worked through the whole deck — that's exactly how these stick.";
  }
  function stat(num, label) {
    return '<div class="stat"><div class="stat-num">' + num + '</div><div class="stat-lbl">' + label + "</div></div>";
  }

  P.modes.flashcards = M;
})(window.Praxis);
