/* =====================================================================
   TURNER STILLHOUSE - SHARED EVENTS + PROMOS
   Edit this one file and every link page updates:
     /                    Turner Stillhouse
     /three-cuts-gin/     Three Cuts Gin
     /rosevears-whisky/   Rosevears Whisky

   EVENTS: each one shows until its "end" time, then hides itself.
   Times are Tasmanian / Melbourne time (+11:00 during daylight saving,
   +10:00 from April to early October).
   ===================================================================== */

var EVENTS = [
  {
    title: "Rosevears Whisky Tasting & Cocktails",
    where: "Backspace Bar, Melbourne - 5pm",
    start: "2026-11-13T17:00:00+11:00",
    end:   "2026-11-13T18:30:00+11:00",
    url:   "https://www.eventbrite.com.au/e/rosevears-whisky-tasting-cocktails-backspace-bar-melbourne-tickets-2004274150939"
  },
  {
    title: "Taste the Tamar",
    where: "Exeter Showgrounds, TAS - 11:30am",
    start: "2026-11-14T11:30:00+11:00",
    end:   "2026-11-14T18:30:00+11:00",
    url:   "https://tamarvalleywine.com.au/taste-the-tamar"
  },
  {
    title: "Whisky Abbey 2026",
    where: "The Timber Yard, Port Melbourne - 14 to 15 Nov",
    start: "2026-11-14T10:00:00+11:00",
    end:   "2026-11-15T23:59:00+11:00",
    url:   "https://whiskyabbey.au"
  },
  {
    title: "Three Cuts Gin MasterClass - Festival of Roses",
    where: "Woolmers Estate, Longford - 22 Nov, 11am or 2pm",
    start: "2026-11-22T11:00:00+11:00",
    end:   "2026-11-22T16:00:00+11:00",
    url:   "https://www.woolmers.com.au/whats-on/festival-of-roses/"
  },
  {
    title: "BeerFest Launceston",
    where: "Launceston - 30 to 31 Dec",
    tag:   "We're a stallholder",
    start: "2026-12-30T12:00:00+11:00",
    end:   "2026-12-31T23:59:00+11:00",
    url:   "https://www.eventbrite.com.au/e/launceston-beerfest-nye-30-31-december-tickets-1999969747352"
  },
  {
    title: "Festivale Launceston",
    where: "City Park, Launceston - 29 to 31 Jan",
    tag:   "We're a stallholder",
    start: "2027-01-29T12:00:00+11:00",
    end:   "2027-01-31T23:59:00+11:00",
    url:   "https://www.festivale.com.au/tickets/"
  }
];

/* TAMAR SESSIONS: monthly live music + food at Tamar Ridge.
   Each date hides itself once that session finishes. Add new dates here. */
var SESSIONS = {
  where: "Tamar Ridge, Rosevears",
  time:  "12pm - 4pm",
  directions: "https://www.google.com/maps/place/Tamar+Ridge+%26+PIRIE+Cellar+Door/data=!4m2!3m1!1s0x0:0xec1bee997ac589f7?sa=X&ved=1t:2428&ictx=111",
  dates: [
    { start: "2026-12-05T12:00:00+11:00", end: "2026-12-05T16:00:00+11:00" },
    { start: "2027-01-23T12:00:00+11:00", end: "2027-01-23T16:00:00+11:00" },
    { start: "2027-02-27T12:00:00+11:00", end: "2027-02-27T16:00:00+11:00" },
    { start: "2027-03-20T12:00:00+11:00", end: "2027-03-20T16:00:00+11:00" },
    { start: "2027-04-24T12:00:00+10:00", end: "2027-04-24T16:00:00+10:00" }
  ]
};

/* PROMOS: shown only between "start" and "end". */
var PROMOS = [
  {
    id: "black-friday",
    start: "2026-11-16T09:00:00+11:00",
    end:   "2026-11-30T23:59:59+11:00",
    html:
      '<p class="kicker">Black Friday</p>' +
      '<h2>Spend &amp; <span class="hl">Save</span></h2>' +
      '<p class="lede">Spend more, save more on Three Cuts Gin, Rosevears Whisky, gifts and merch:</p>' +
      '<ul class="tiers">' +
        '<li>Spend $100 <b class="hl">15% off</b></li>' +
        '<li>Spend $200 <b class="hl">20% off</b></li>' +
        '<li>Spend $300 <b class="hl">25% off</b></li>' +
      '</ul>' +
      '<p class="note">Free delivery on all orders over $100.</p>' +
      '<div class="code"><div><span>Use code at checkout</span><strong>BLK2026</strong></div>' +
        '<button class="copy" type="button" data-code="BLK2026">Copy</button></div>' +
      '<a class="btn" href="https://turnerstillhouse.com/shop-all/" target="_blank" rel="noopener"><span>Shop the Sale</span>{ARROW}</a>' +
      '<p class="fine">Excludes Rosevears Single Apera Cask Matured Single Malt, Gin Club Membership, Gift Cards, and Tours &amp; Tastings.</p>' +
      '<p class="sign">Grain to glass, Tamar Valley made, now with a little extra incentive to stock the bar.</p>'
  }
];

/* ---------------- Rendering (no need to edit below) ---------------- */
(function () {
  var TZ = "Australia/Hobart";
  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var now = Date.now();

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function part(d, opt) { return new Intl.DateTimeFormat("en-AU", Object.assign({ timeZone: TZ }, opt)).format(d); }

  function renderEvents(el) {
    var live = EVENTS.filter(function (e) { return Date.parse(e.end) >= now; })
                     .sort(function (a, b) { return Date.parse(a.start) - Date.parse(b.start); });
    if (!live.length) { el.remove(); return; }
    var items = live.map(function (e) {
      var d = new Date(e.start);
      return '<a class="event" href="' + esc(e.url) + '" target="_blank" rel="noopener">' +
        '<span class="date"><b>' + part(d, { day: "numeric" }) + '</b><i>' + part(d, { month: "short" }) + '</i></span>' +
        '<span>' + (e.tag ? '<em class="ev-tag">' + esc(e.tag) + '</em>' : '') +
        '<h3>' + esc(e.title) + '</h3><p>' + esc(e.where) + '</p></span>' +
        '<span class="tix">Tickets</span></a>';
    }).join("");
    el.outerHTML = '<details class="box events"' + (el.hasAttribute("data-open") ? " open" : "") + '><summary><span>' +
      esc(el.getAttribute("data-title") || "Ticketed Events") + '<span class="count">' + live.length + '</span></span>' + CHEV +
      '</summary><div class="event-list">' + items + '</div></details>';
  }

  function renderPromos(el) {
    var html = PROMOS.filter(function (p) { return now >= Date.parse(p.start) && now <= Date.parse(p.end); })
      .map(function (p) { return '<section class="box promo" id="promo-' + p.id + '">' + p.html.replace("{ARROW}", ARROW) + '</section>'; })
      .join("");
    if (html) el.outerHTML = html; else el.remove();
  }

  function renderSessions(el) {
    var left = SESSIONS.dates.filter(function (s) { return Date.parse(s.end) >= now; })
                             .sort(function (a, b) { return Date.parse(a.start) - Date.parse(b.start); });
    if (!left.length) { el.remove(); return; }
    var next = new Date(left[0].start);
    var chips = left.map(function (s, i) {
      var d = new Date(s.start);
      return '<li' + (i === 0 ? ' class="next"' : '') + '><span class="date"><b>' + part(d, { day: "numeric" }) +
        '</b><i>' + part(d, { month: "short" }) + '</i></span></li>';
    }).join("");
    el.outerHTML = '<section class="box promo sessions" id="tamar-sessions">' +
      '<p class="kicker">Tamar Ridge x Turner Stillhouse</p>' +
      '<h2>Tamar <span class="hl">Sessions</span></h2>' +
      '<p class="lede">Live music, a food truck and drinks from us and Tamar Ridge. One Saturday a month, ' +
        esc(SESSIONS.time) + ' at ' + esc(SESSIONS.where) + '.</p>' +
      '<p class="sess-next">Next up: <b>' + part(next, { weekday: "long", day: "numeric", month: "long" }) + '</b></p>' +
      '<ul class="sess-dates" aria-label="Upcoming Tamar Sessions dates">' + chips + '</ul>' +
      '<a class="btn ghost" href="' + esc(SESSIONS.directions) + '" target="_blank" rel="noopener"><span>Get Directions</span>' + ARROW + '</a>' +
      '<p class="sign">Pull up a chair, the Tamar Valley is pouring.</p>' +
      '</section>';
  }

  document.querySelectorAll('[data-hub="sessions"]').forEach(renderSessions);
  document.querySelectorAll('[data-hub="events"]').forEach(renderEvents);
  document.querySelectorAll('[data-hub="promos"]').forEach(renderPromos);

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest(".copy");
    if (!b) return;
    var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(b.getAttribute("data-code")).then(done, done); else done();
  });
})();
