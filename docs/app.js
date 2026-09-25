(function () {
  "use strict";

  var FAV_KEY = "movihda2026.favorites";

  function loadFavorites() {
    try {
      var raw = localStorage.getItem(FAV_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(list) {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(list));
    } catch (e) {
      /* almacenamiento no disponible: se ignora silenciosamente */
    }
  }

  var favorites = loadFavorites();

  function isFavorite(id) {
    return favorites.indexOf(id) !== -1;
  }

  function toggleFavorite(id) {
    var idx = favorites.indexOf(id);
    if (idx === -1) favorites.push(id);
    else favorites.splice(idx, 1);
    saveFavorites(favorites);
  }

  /* ---------------- Navigation ---------------- */

  var views = document.querySelectorAll("[data-view]");
  var navButtons = document.querySelectorAll("[data-nav]");

  function showView(name) {
    views.forEach(function (v) {
      v.hidden = v.id !== "view-" + name;
    });
    navButtons.forEach(function (b) {
      if (b.dataset.nav) {
        b.classList.toggle("is-active", b.dataset.nav === name);
      }
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  navButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showView(btn.dataset.nav);
    });
  });

  document.getElementById("favToggleTop").addEventListener("click", function () {
    showView("agenda");
    setDayFilter("todos");
    setFavFilter(true);
  });

  /* ---------------- Agenda rendering ---------------- */

  var agendaList = document.getElementById("agendaList");
  var agendaEmpty = document.getElementById("agendaEmpty");
  var dayFilter = "todos";
  var favOnly = false;

  function setDayFilter(day) {
    dayFilter = day;
    document.querySelectorAll("[data-filter-day]").forEach(function (chip) {
      var active = chip.dataset.filterDay === day;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderAgenda();
  }

  function setFavFilter(value) {
    favOnly = value;
    var chip = document.querySelector("[data-filter-fav]");
    chip.classList.toggle("is-active", favOnly);
    chip.setAttribute("aria-selected", favOnly ? "true" : "false");
    renderAgenda();
  }

  document.querySelectorAll("[data-filter-day]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      setDayFilter(chip.dataset.filterDay);
    });
  });

  document.querySelector("[data-filter-fav]").addEventListener("click", function () {
    setFavFilter(!favOnly);
  });

  function heartIcon(filled) {
    return (
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="' +
      (filled ? "currentColor" : "none") +
      '" stroke="currentColor" stroke-width="2">' +
      '<path d="M12 21s-7.5-4.6-10-9.1C.5 8.6 2 5 5.5 5c2 0 3.4 1.1 4.2 2.3C10.6 6.1 12 5 14 5c3.5 0 5 3.6 3.5 6.9C19.5 16.4 12 21 12 21z"/>' +
      "</svg>"
    );
  }

  function sessionCard(session) {
    var wrap = document.createElement("div");
    wrap.className = "session-card glass";

    var speakersLine = session.speakers && session.speakers.length
      ? session.speakers.join(", ")
      : "";

    var badge = session.status === "confirmed"
      ? '<span class="badge badge-confirmed">Confirmado</span>'
      : '<span class="badge badge-provisional">Provisional</span>';

    var note = session.status === "provisional" && session.note
      ? '<p class="session-note">⚠ ' + session.note + "</p>"
      : "";

    wrap.innerHTML =
      '<div class="session-time">' + session.start + '<span>' + session.end + '</span></div>' +
      '<div class="session-body">' +
        '<div class="session-top-row">' +
          '<h3 class="session-title">' + session.title + '</h3>' +
          '<button class="fav-btn' + (isFavorite(session.id) ? ' is-fav' : '') + '" data-fav-id="' + session.id + '" aria-label="' + (isFavorite(session.id) ? 'Quitar de favoritas' : 'Guardar como favorita') + '">' +
            heartIcon(isFavorite(session.id)) +
          '</button>' +
        '</div>' +
        (speakersLine ? '<p class="session-speakers">' + speakersLine + '</p>' : '') +
        '<div class="session-badges">' + badge + '</div>' +
        note +
      '</div>';

    var favBtn = wrap.querySelector(".fav-btn");
    favBtn.addEventListener("click", function () {
      toggleFavorite(session.id);
      favBtn.classList.toggle("is-fav", isFavorite(session.id));
      favBtn.innerHTML = heartIcon(isFavorite(session.id));
      favBtn.setAttribute("aria-label", isFavorite(session.id) ? "Quitar de favoritas" : "Guardar como favorita");
      if (favOnly) renderAgenda();
    });

    return wrap;
  }

  function renderAgenda() {
    agendaList.innerHTML = "";
    var anyRendered = false;

    DAYS.forEach(function (day) {
      if (dayFilter !== "todos" && dayFilter !== day.id) return;

      var sessions = SESSIONS.filter(function (s) {
        if (s.day !== day.id) return false;
        if (favOnly && !isFavorite(s.id)) return false;
        return true;
      });

      if (!sessions.length) return;

      var divider = document.createElement("div");
      divider.className = "day-divider";
      divider.textContent = day.label + " · " + day.dateLabel;
      agendaList.appendChild(divider);

      sessions.forEach(function (session) {
        agendaList.appendChild(sessionCard(session));
        anyRendered = true;
      });
    });

    agendaEmpty.hidden = anyRendered || !favOnly;
  }

  /* ---------------- Speakers ---------------- */

  var speakerList = document.getElementById("speakerList");

  function initials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0]; })
      .join("")
      .toUpperCase();
  }

  function renderSpeakers() {
    speakerList.innerHTML = "";
    SPEAKERS.forEach(function (speaker) {
      var card = document.createElement("div");
      card.className = "speaker-card glass";
      var badge = speaker.status === "confirmed"
        ? '<span class="badge badge-confirmed">Confirmado</span>'
        : '<span class="badge badge-provisional">Programa provisional</span>';
      card.innerHTML =
        '<div class="speaker-avatar">' + initials(speaker.name) + '</div>' +
        '<div class="speaker-info">' +
          '<strong>' + speaker.name + '</strong>' +
          '<span>' + speaker.role + '</span>' +
          '<div class="speaker-badges">' + badge + '</div>' +
        '</div>';
      speakerList.appendChild(card);
    });
  }

  /* ---------------- Málaga links ---------------- */

  var malagaLinks = document.getElementById("malagaLinks");

  function renderMalaga() {
    malagaLinks.innerHTML = "";
    MALAGA_LINKS.forEach(function (link) {
      var a = document.createElement("a");
      a.className = "link-card glass";
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML =
        '<div class="link-card-text"><strong>' + link.title + '</strong><span>' + link.desc + '</span></div>' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"/></svg>';
      malagaLinks.appendChild(a);
    });
  }

  /* ---------------- Init ---------------- */

  renderAgenda();
  renderSpeakers();
  renderMalaga();
  showView("inicio");
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("service-worker.js").catch(function () {});
    });
  }
})();
