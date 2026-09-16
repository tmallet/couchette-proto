/* Couchette — HF mobile prototype (client-side only) */

const ROUTES = [
  {
    id: "par-vie",
    from: "Paris",
    to: "Vienne",
    fromCode: "PAR",
    toCode: "VIE",
    operator: "Nightjet",
    opKey: "nj",
    duration: "14 h 10",
    durationH: 14.2,
    cabin: ["couchette", "sleeper"],
    interrail: true,
    depart: "19:12",
    arrive: "09:22",
    nights: "1 nuit",
    tip: "Réservation obligatoire avec Interrail (supplément couchette).",
    comfort: ["Oreiller & couverture fournis", "Lavabo en cabine couchette", "Petit-déj. inclus en sleeper"],
    cabins: [
      { id: "c4", name: "Couchette 4", desc: "Couchette partagée · 4 lits", price: "dès 49 €" },
      { id: "c2", name: "Couchette 2", desc: "Plus d’intimité · 2 lits", price: "dès 79 €" },
      { id: "sl", name: "Sleeper", desc: "Cabine fermée · lavabo", price: "dès 119 €" },
    ],
    mapPath: "M 95 195 Q 140 170 185 155 T 270 140 T 330 125",
  },
  {
    id: "bru-ber",
    from: "Bruxelles",
    to: "Berlin",
    fromCode: "BRU",
    toCode: "BER",
    operator: "European Sleeper",
    opKey: "es",
    duration: "11 h 30",
    durationH: 11.5,
    cabin: ["couchette", "sleeper"],
    interrail: true,
    depart: "19:22",
    arrive: "06:52",
    nights: "1 nuit",
    tip: "Pass Interrail accepté — réservez la couchette à l’avance.",
    comfort: ["Ambiance calme, wagons modernes", "Espace bagages dédié", "Petit-déj. à bord (option)"],
    cabins: [
      { id: "c6", name: "Couchette 6", desc: "Économique · 6 lits", price: "dès 39 €" },
      { id: "c4", name: "Couchette 4", desc: "Confort standard · 4 lits", price: "dès 59 €" },
      { id: "sl", name: "Comfort Sleeper", desc: "Cabine privée", price: "dès 149 €" },
    ],
    mapPath: "M 130 155 Q 170 130 210 115 T 270 95",
  },
  {
    id: "ams-pra",
    from: "Amsterdam",
    to: "Prague",
    fromCode: "AMS",
    toCode: "PRG",
    operator: "European Sleeper",
    opKey: "es",
    duration: "12 h 45",
    durationH: 12.8,
    cabin: ["couchette", "sleeper"],
    interrail: true,
    depart: "20:15",
    arrive: "09:00",
    nights: "1 nuit",
    tip: "Idéal avec Interrail : une nuit = un jour de pass économisé.",
    comfort: ["Départ depuis Amsterdam Centraal", "Connexion douce vers Prague", "Prises USB en couchette"],
    cabins: [
      { id: "c6", name: "Couchette 6", desc: "Partagée · 6 lits", price: "dès 45 €" },
      { id: "c4", name: "Couchette 4", desc: "Standard · 4 lits", price: "dès 65 €" },
      { id: "sl", name: "Sleeper", desc: "Cabine fermée", price: "dès 135 €" },
    ],
    mapPath: "M 145 120 Q 190 125 230 140 T 290 155",
  },
  {
    id: "par-ber",
    from: "Paris",
    to: "Berlin",
    fromCode: "PAR",
    toCode: "BER",
    operator: "Nightjet",
    opKey: "nj",
    duration: "13 h 20",
    durationH: 13.3,
    cabin: ["couchette", "sleeper"],
    interrail: true,
    depart: "19:55",
    arrive: "09:15",
    nights: "1 nuit",
    tip: "Supplément Interrail variable selon type de cabine.",
    comfort: ["Ligne iconique Paris–Berlin", "Dîner possible à bord", "Arrivée centre-ville"],
    cabins: [
      { id: "c4", name: "Couchette 4", desc: "4 lits · lavabo", price: "dès 55 €" },
      { id: "sl", name: "Sleeper", desc: "1–3 lits · cabine", price: "dès 129 €" },
      { id: "dlx", name: "Sleeper Deluxe", desc: "Douche privative", price: "dès 189 €" },
    ],
    mapPath: "M 95 195 Q 150 150 200 120 T 270 95",
  },
  {
    id: "mun-rom",
    from: "Munich",
    to: "Rome",
    fromCode: "MUC",
    toCode: "ROM",
    operator: "Nightjet",
    opKey: "nj",
    duration: "11 h 55",
    durationH: 12,
    cabin: ["couchette", "sleeper"],
    interrail: false,
    depart: "20:28",
    arrive: "08:23",
    nights: "1 nuit",
    tip: "Vérifiez les règles pass selon votre trajet alpine.",
    comfort: ["Traversée des Alpes de nuit", "Petit-déj. inclus sleeper", "Arrivée Roma Termini"],
    cabins: [
      { id: "c4", name: "Couchette 4", desc: "Classique · 4 lits", price: "dès 49 €" },
      { id: "c2", name: "Couchette 2", desc: "Plus calme · 2 lits", price: "dès 89 €" },
      { id: "sl", name: "Sleeper", desc: "Cabine privée", price: "dès 139 €" },
    ],
    mapPath: "M 230 155 Q 245 190 255 220 T 265 270",
  },
  {
    id: "zur-vie",
    from: "Zurich",
    to: "Vienne",
    fromCode: "ZRH",
    toCode: "VIE",
    operator: "Nightjet",
    opKey: "nj",
    duration: "9 h 40",
    durationH: 9.7,
    cabin: ["couchette", "sleeper"],
    interrail: true,
    depart: "21:40",
    arrive: "07:20",
    nights: "1 nuit",
    tip: "Courte nuit — parfait pour tester le sleeper.",
    comfort: ["Durée idéale pour dormir", "Service Nightjet fiable", "Arrivée matinale à Vienne"],
    cabins: [
      { id: "c4", name: "Couchette 4", desc: "4 lits", price: "dès 39 €" },
      { id: "sl", name: "Sleeper", desc: "Cabine · lavabo", price: "dès 99 €" },
    ],
    mapPath: "M 185 175 Q 230 160 270 145 T 330 125",
  },
];

const OPERATOR_BOOKING_URLS = {
  nj: "https://www.nightjet.com/en/ticket-buchen?utm_source=couchette",
  es: "https://www.europeansleeper.eu/?utm_source=couchette",
};

function bookingURLForRoute(r) {
  if (!r) return OPERATOR_BOOKING_URLS.nj;
  if (r.bookingURL) return r.bookingURL;
  return OPERATOR_BOOKING_URLS[r.opKey] || OPERATOR_BOOKING_URLS.nj;
}


const CITIES = [
  { id: "par", label: "Paris", x: 95, y: 195 },
  { id: "bru", label: "Bruxelles", x: 130, y: 155 },
  { id: "ams", label: "Amsterdam", x: 145, y: 120 },
  { id: "ber", label: "Berlin", x: 270, y: 95 },
  { id: "muc", label: "Munich", x: 230, y: 155 },
  { id: "zur", label: "Zurich", x: 185, y: 175 },
  { id: "vie", label: "Vienne", x: 330, y: 125 },
  { id: "pra", label: "Prague", x: 290, y: 155 },
  { id: "rom", label: "Rome", x: 265, y: 270 },
];

const state = {
  screen: "explore",
  selectedRouteId: "par-vie",
  selectedCabinId: null,
  filters: { cabin: null, duration: null, interrail: false },
  filterPanel: null,
  favorites: new Set(["par-vie", "bru-ber"]),
  alerts: new Set(["par-vie"]),
  favTab: "saved",
};

function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function getRoute(id) {
  return ROUTES.find((r) => r.id === id);
}

function matchesFilters(route) {
  const f = state.filters;
  if (f.cabin && !route.cabin.includes(f.cabin)) return false;
  if (f.duration === "short" && route.durationH > 11) return false;
  if (f.duration === "medium" && (route.durationH <= 11 || route.durationH > 13)) return false;
  if (f.duration === "long" && route.durationH <= 13) return false;
  if (f.interrail && !route.interrail) return false;
  return true;
}

function showToast(msg, noNav = false) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.toggle("no-nav", noNav);
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function goTo(screenId, opts = {}) {
  const screens = $$(".screen");
  screens.forEach((s) => {
    s.classList.remove("active", "slide-back");
  });
  const target = $(`#screen-${screenId}`);
  if (!target) return;
  target.classList.add("active");
  state.screen = screenId;

  // Bottom nav visibility / active
  const nav = $("#bottom-nav");
  const showNav = screenId === "explore" || screenId === "favoris";
  nav.style.display = showNav ? "flex" : "none";

  $$(".nav-item").forEach((n) => {
    n.classList.toggle("active", n.dataset.nav === screenId);
  });

  if (screenId === "detail") renderDetail();
  if (screenId === "handoff") renderHandoff();
  if (screenId === "favoris") renderFavoris();
  if (screenId === "explore") {
    renderMap();
    renderRouteList();
  }

  // Scroll bodies to top
  $$(".screen-body").forEach((b) => { b.scrollTop = 0; });
}

/* —— Explore —— */
function renderMap() {
  const svg = $("#map-svg");
  if (!svg) return;

  const visible = ROUTES.filter(matchesFilters);
  const visibleIds = new Set(visible.map((r) => r.id));
  const usedCities = new Set();
  visible.forEach((r) => {
    usedCities.add(r.from.toLowerCase().slice(0, 3) === "par" ? "par" :
      r.from === "Bruxelles" ? "bru" :
      r.from === "Amsterdam" ? "ams" :
      r.from === "Munich" ? "muc" :
      r.from === "Zurich" ? "zur" : r.fromCode.toLowerCase());
    // simpler: match by label
  });

  const cityByLabel = {};
  CITIES.forEach((c) => { cityByLabel[c.label] = c; });

  let routesHtml = "";
  ROUTES.forEach((r) => {
    const dim = !visibleIds.has(r.id);
    const sel = r.id === state.selectedRouteId;
    routesHtml += `<path class="route-line ${r.opKey}${dim ? " dimmed" : ""}${sel && !dim ? " selected" : ""}" data-route="${r.id}" d="${r.mapPath}" />`;
  });

  let citiesHtml = "";
  CITIES.forEach((c) => {
    const involved = ROUTES.some(
      (r) =>
        visibleIds.has(r.id) &&
        (r.from === c.label || r.to === c.label)
    );
    const anyRoute = ROUTES.some((r) => r.from === c.label || r.to === c.label);
    citiesHtml += `
      <g class="city-group${!involved && anyRoute ? " dimmed" : ""}" data-city="${c.id}">
        <circle class="city-dot" cx="${c.x}" cy="${c.y}" r="4" />
        <text class="city-label" x="${c.x + 7}" y="${c.y + 3}">${c.label}</text>
      </g>`;
  });

  // Stylized Europe outline (simplified FR/Benelux/DE focus)
  svg.innerHTML = `
    <defs>
      <radialGradient id="mapGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#1a2848" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#0a1020" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="390" height="280" fill="url(#mapGlow)"/>
    <!-- soft landmass silhouette -->
    <path d="M 40 80 Q 70 50 110 55 T 160 45 T 220 40 T 280 50 T 340 70
             Q 360 100 355 140 T 340 190 Q 320 230 300 260 T 250 285
             L 200 290 Q 160 275 140 250 T 100 220 Q 70 200 55 170 T 40 120 Z"
          fill="#121c30" stroke="#1e2a42" stroke-width="1" opacity="0.9"/>
    <path d="M 50 200 Q 80 185 100 210 T 90 250 Q 60 245 50 220 Z"
          fill="#101828" stroke="#1e2a42" stroke-width="0.8" opacity="0.7"/>
    <!-- grid dots subtle -->
    ${Array.from({ length: 8 }, (_, i) =>
      Array.from({ length: 6 }, (_, j) =>
        `<circle cx="${50 + i * 40}" cy="${40 + j * 40}" r="0.6" fill="#2a3850" opacity="0.5"/>`
      ).join("")
    ).join("")}
    ${routesHtml}
    ${citiesHtml}
  `;

  $$(".route-line", svg).forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = el.dataset.route;
      if (!matchesFilters(getRoute(id))) return;
      state.selectedRouteId = id;
      renderMap();
      renderRouteList();
      // scroll card into view
      const card = $(`.route-card[data-route="${id}"]`);
      if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

function renderRouteList() {
  const list = $("#route-list");
  const empty = $("#empty-filter");
  const filtered = ROUTES.filter(matchesFilters);

  empty.classList.toggle("show", filtered.length === 0);

  list.innerHTML = filtered
    .map((r) => {
      const sel = r.id === state.selectedRouteId ? " selected" : "";
      return `
      <button type="button" class="route-card${sel}" data-route="${r.id}" aria-label="${r.from} vers ${r.to}">
        <div class="route-card-top">
          <div class="route-cities">${r.from}<span class="arrow">→</span>${r.to}</div>
          <span class="op-badge ${r.opKey}">${r.operator}</span>
        </div>
        <div class="route-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            ${r.duration}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            ${r.cabins[0].name}
          </span>
          <span>${r.depart} → ${r.arrive}</span>
        </div>
        ${r.interrail ? `<div class="interrail-tag">✓ Interrail / Eurail</div>` : ""}
      </button>`;
    })
    .join("");

  $$(".route-card", list).forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedRouteId = card.dataset.route;
      state.selectedCabinId = null;
      goTo("detail");
    });
  });
}

function updateFilterChips() {
  const f = state.filters;
  $("#chip-cabin").classList.toggle("active", !!f.cabin || state.filterPanel === "cabin");
  $("#chip-duration").classList.toggle("active", !!f.duration || state.filterPanel === "duration");
  $("#chip-interrail").classList.toggle("active", f.interrail);

  // labels
  const cabinLabels = { couchette: "Couchette", sleeper: "Sleeper" };
  const durLabels = { short: "< 11 h", medium: "11–13 h", long: "> 13 h" };
  $("#chip-cabin span").textContent = f.cabin ? cabinLabels[f.cabin] : "Cabine";
  $("#chip-duration span").textContent = f.duration ? durLabels[f.duration] : "Durée";

  // option buttons
  $$("[data-filter-cabin]").forEach((b) => {
    b.classList.toggle("active", f.cabin === b.dataset.filterCabin);
  });
  $$("[data-filter-duration]").forEach((b) => {
    b.classList.toggle("active", f.duration === b.dataset.filterDuration);
  });
}

function toggleFilterPanel(name) {
  if (name === "interrail") {
    state.filters.interrail = !state.filters.interrail;
    state.filterPanel = null;
    $("#panel-cabin").classList.remove("open");
    $("#panel-duration").classList.remove("open");
    updateFilterChips();
    renderMap();
    renderRouteList();
    return;
  }
  if (state.filterPanel === name) {
    state.filterPanel = null;
  } else {
    state.filterPanel = name;
  }
  $("#panel-cabin").classList.toggle("open", state.filterPanel === "cabin");
  $("#panel-duration").classList.toggle("open", state.filterPanel === "duration");
  updateFilterChips();
}

/* —— Detail —— */
function renderDetail() {
  const r = getRoute(state.selectedRouteId);
  if (!r) return;

  if (!state.selectedCabinId) state.selectedCabinId = r.cabins[0].id;

  const hero = $("#detail-hero-bg");
  hero.className = `cabin-placeholder ${r.opKey}-cabin`;

  $("#detail-title").innerHTML = `${r.from}<span class="arrow">→</span>${r.to}`;
  $("#detail-op").textContent = r.operator;
  $("#detail-op").className = `op-badge ${r.opKey}`;

  $("#stat-duration").textContent = r.duration;
  $("#stat-depart").textContent = r.depart;
  $("#stat-arrive").textContent = r.arrive;

  const cabinsEl = $("#cabin-types");
  cabinsEl.innerHTML = r.cabins
    .map((c) => {
      const sel = c.id === state.selectedCabinId ? " selected" : "";
      return `
      <button type="button" class="cabin-type-card${sel}" data-cabin="${c.id}">
        <div class="cabin-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="8" width="18" height="10" rx="2"/><path d="M3 12h18M7 8V6a1 1 0 011-1h8a1 1 0 011 1v2"/></svg>
        </div>
        <div class="cabin-info">
          <div class="name">${c.name}</div>
          <div class="desc">${c.desc}</div>
        </div>
        <div class="cabin-price">${c.price}</div>
        <div class="cabin-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>
        </div>
      </button>`;
    })
    .join("");

  $$(".cabin-type-card", cabinsEl).forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedCabinId = btn.dataset.cabin;
      renderDetail();
    });
  });

  const tips = $("#comfort-tips");
  tips.innerHTML = r.comfort.map((t) => `<li>${t}</li>`).join("");

  $("#interrail-tip-text").textContent = r.tip;
  $("#interrail-tip-block").style.display = r.interrail ? "flex" : "none";

  const cabin = r.cabins.find((c) => c.id === state.selectedCabinId);
  $("#cta-operator").innerHTML = `
    Continuer sur ${r.operator}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 17L17 7M9 7h8v8"/></svg>
  `;

  const favBtn = $("#btn-fav");
  favBtn.classList.toggle("active", state.favorites.has(r.id));
  favBtn.setAttribute("aria-pressed", state.favorites.has(r.id));

  const alertBtn = $("#btn-alert");
  alertBtn.classList.toggle("active-alert", state.alerts.has(r.id));
  alertBtn.innerHTML = state.alerts.has(r.id)
    ? `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/></svg> Alerte active`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/></svg> Alerte ouverture ventes`;
}

function renderHandoff() {
  const r = getRoute(state.selectedRouteId);
  if (!r) return;
  const cabin = r.cabins.find((c) => c.id === state.selectedCabinId) || r.cabins[0];

  $("#handoff-title").textContent = `Réservation chez ${r.operator}`;
  $("#handoff-lead").textContent =
    `Couchette vous accompagne jusqu’ici. La réservation et le paiement se font sur le site officiel de ${r.operator}.`;

  $("#ho-route").textContent = `${r.from} → ${r.to}`;
  $("#ho-cabin").textContent = cabin.name;
  $("#ho-when").textContent = `${r.depart} → ${r.arrive} · ${r.nights}`;
  $("#ho-op").textContent = r.operator;

  const leave = $("#btn-leave");
  leave.textContent = `Ouvrir ${r.operator}`;
  leave.setAttribute("href", bookingURLForRoute(r));
}

function renderFavoris() {
  const saved = ROUTES.filter((r) => state.favorites.has(r.id));
  const list = $("#fav-list");
  const empty = $("#fav-empty");

  // segment
  $$(".seg-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.seg === state.favTab);
  });

  if (state.favTab === "alerts") {
    const alertRoutes = ROUTES.filter((r) => state.alerts.has(r.id));
    empty.classList.toggle("show", alertRoutes.length === 0);
    list.style.display = alertRoutes.length ? "flex" : "none";
    list.innerHTML = alertRoutes
      .map((r) => favCardHtml(r, true))
      .join("");
  } else {
    empty.classList.toggle("show", saved.length === 0);
    list.style.display = saved.length ? "flex" : "none";
    list.innerHTML = saved.map((r) => favCardHtml(r, false)).join("");
  }

  bindFavCards();
}

function favCardHtml(r, alertsOnly) {
  const on = state.alerts.has(r.id);
  return `
    <div class="fav-card" data-route="${r.id}">
      <div class="fav-card-top">
        <div class="cities">${r.from}<span class="arrow">→</span>${r.to}</div>
        <span class="op-badge ${r.opKey}">${r.operator}</span>
      </div>
      <div class="fav-meta">${r.duration} · ${r.depart} → ${r.arrive}${r.interrail ? " · Interrail" : ""}</div>
      <div class="alert-toggle-row">
        <div class="label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16l-2-2z"/></svg>
          <div>
            Alerte ouverture ventes
            <span class="sub">${on ? "Vous serez notifié·e (démo)" : "Désactivée"}</span>
          </div>
        </div>
        <button type="button" class="toggle${on ? " on" : ""}" data-toggle-alert="${r.id}" aria-pressed="${on}" aria-label="Alerte ouverture ventes"></button>
      </div>
      <button type="button" class="btn-secondary" style="margin-top:12px;width:100%" data-open-detail="${r.id}">Voir la fiche</button>
    </div>`;
}

function bindFavCards() {
  $$("[data-toggle-alert]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.toggleAlert;
      if (state.alerts.has(id)) state.alerts.delete(id);
      else state.alerts.add(id);
      renderFavoris();
      showToast(state.alerts.has(id) ? "Alerte activée (démo)" : "Alerte désactivée");
    });
  });
  $$("[data-open-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedRouteId = btn.dataset.openDetail;
      state.selectedCabinId = null;
      goTo("detail");
    });
  });
}

function init() {
  // Time in status bars
  const updateTime = () => {
    const now = new Date();
    const t = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    $$(".status-time").forEach((el) => { el.textContent = t; });
  };
  updateTime();
  setInterval(updateTime, 30000);

  // Filters
  $("#chip-cabin").addEventListener("click", () => toggleFilterPanel("cabin"));
  $("#chip-duration").addEventListener("click", () => toggleFilterPanel("duration"));
  $("#chip-interrail").addEventListener("click", () => toggleFilterPanel("interrail"));

  $$("[data-filter-cabin]").forEach((b) => {
    b.addEventListener("click", () => {
      const v = b.dataset.filterCabin;
      state.filters.cabin = state.filters.cabin === v ? null : v;
      updateFilterChips();
      renderMap();
      renderRouteList();
    });
  });
  $$("[data-filter-duration]").forEach((b) => {
    b.addEventListener("click", () => {
      const v = b.dataset.filterDuration;
      state.filters.duration = state.filters.duration === v ? null : v;
      updateFilterChips();
      renderMap();
      renderRouteList();
    });
  });
  $("#btn-reset-filters")?.addEventListener("click", () => {
    state.filters = { cabin: null, duration: null, interrail: false };
    state.filterPanel = null;
    $("#panel-cabin").classList.remove("open");
    $("#panel-duration").classList.remove("open");
    updateFilterChips();
    renderMap();
    renderRouteList();
  });

  // Nav
  $$(".nav-item").forEach((n) => {
    n.addEventListener("click", () => goTo(n.dataset.nav));
  });

  // Detail actions
  $("#btn-back-detail").addEventListener("click", () => goTo("explore"));
  $("#btn-back-handoff").addEventListener("click", () => goTo("detail"));
  $("#btn-fav").addEventListener("click", () => {
    const id = state.selectedRouteId;
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      showToast("Retiré des favoris", true);
    } else {
      state.favorites.add(id);
      showToast("Ajouté aux favoris", true);
    }
    renderDetail();
  });
  $("#btn-alert").addEventListener("click", () => {
    const id = state.selectedRouteId;
    if (state.alerts.has(id)) {
      state.alerts.delete(id);
      showToast("Alerte désactivée", true);
    } else {
      state.alerts.add(id);
      showToast("Alerte ouverture ventes activée", true);
    }
    renderDetail();
  });
  $("#cta-operator").addEventListener("click", () => goTo("handoff"));

  // btn-leave is an <a target=_blank> — href set in renderHandoff
  $("#btn-stay").addEventListener("click", () => goTo("detail"));

  // Favoris segments
  $$(".seg-btn").forEach((b) => {
    b.addEventListener("click", () => {
      state.favTab = b.dataset.seg;
      renderFavoris();
    });
  });
  $("#btn-explore-from-empty")?.addEventListener("click", () => goTo("explore"));

  updateFilterChips();
  renderMap();
  renderRouteList();
  goTo("explore");
}

document.addEventListener("DOMContentLoaded", init);
