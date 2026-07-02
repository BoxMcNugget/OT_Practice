/* =========================================================
   Praxis · Domain review mode
   Concise study notes organized by the four exam domains.
   ========================================================= */
window.Praxis = window.Praxis || {};
window.Praxis.modes = window.Praxis.modes || {};
(function (P) {
  "use strict";
  var M = {};
  function esc(s) { return P.esc(s); }
  var COLORS = ["blue", "purple", "green", "amber"];

  /* -------- domain list -------- */
  M.renderList = function (app) {
    var notes = window.PRAXIS_NOTES || [];
    var view = document.createElement("div");
    view.className = "view";
    var cards = notes.map(function (n, i) {
      return '<button class="review-card ' + COLORS[i % COLORS.length] + '" data-i="' + i + '" style="animation-delay:' + (i * 0.05) + 's">' +
        '<span class="review-ic">' + P.icon("book", 22) + "</span>" +
        '<span class="review-body">' +
          '<span class="review-ttl">' + esc(n.title) + "</span>" +
          '<span class="review-blurb">' + esc(n.blurb) + "</span>" +
        "</span>" +
        '<span class="case-go">' + P.icon("chev", 20) + "</span></button>";
    }).join("");

    view.innerHTML =
      P.subhead("Domain review", "Domain notes and quick-reference topics", "#/") +
      '<div class="review-list">' + cards + "</div>" +
      draftNote();

    app.appendChild(view);
    P.wireBack(view);
    Array.prototype.forEach.call(view.querySelectorAll(".review-card"), function (b) {
      b.addEventListener("click", function () { P.go("#/review/" + b.getAttribute("data-i")); });
    });
  };

  /* -------- one domain's notes -------- */
  M.renderNotes = function (idx, app) {
    var notes = window.PRAXIS_NOTES || [];
    var n = notes[parseInt(idx, 10)];
    if (!n) { P.go("#/review"); return; }
    var view = document.createElement("div");
    view.className = "view";

    var sections = n.sections.map(function (sec, i) {
      var points = sec.points.map(function (p) {
        return '<li>' + P.icon("check", 15) + "<span>" + esc(p) + "</span></li>";
      }).join("");
      return '<div class="note-section" style="animation-delay:' + (i * 0.05) + 's">' +
        "<h2>" + esc(sec.heading) + "</h2>" +
        '<ul class="note-points">' + points + "</ul></div>";
    }).join("");

    view.innerHTML =
      P.subhead(n.title, n.blurb, "#/review") +
      sections +
      draftNote();

    app.appendChild(view);
    P.wireBack(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function draftNote() {
    return '<div class="draft-note">' + P.icon("info", 17) +
      "<span>These are original study notes, not reviewed by a licensed OT. Use them as a quick refresher and verify details against your course materials and textbooks. " +
      '<a href="#/sources">See sources</a>.</span></div>';
  }

  P.modes.review = M;
})(window.Praxis);
