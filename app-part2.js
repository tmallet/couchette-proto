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

  $("#btn-leave").textContent = `Ouvrir ${r.operator}`;
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

function simulateExternalHandoff() {
  const r = getRoute(state.selectedRouteId);
  const flash = $("#external-flash");
  $("#external-op-name").textContent = r ? r.operator.toUpperCase() : "OPÉRATEUR";
  flash.classList.add("show");
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

  $("#btn-leave").addEventListener("click", () => simulateExternalHandoff());
  $("#btn-stay").addEventListener("click", () => goTo("detail"));
  $("#btn-flash-back").addEventListener("click", () => {
    $("#external-flash").classList.remove("show");
    goTo("explore");
  });

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
