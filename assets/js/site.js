/* =====================================================================
   Sainte-Brigitte — scripts du site (version 2)
   - en-tête et pied de page communs
   - bilingue français / breton (bouton FR | BR, mémorisé)
   - photos (contenu/photos.js) et contenus (contenu/donnees.js)
   - animations discrètes
   ---------------------------------------------------------------------
   Pour traduire un texte fixe d'une page : ajouter l'attribut
   data-br="texte en breton" sur l'élément.
   Les titres h1/h2 qui ont data-br affichent aussi l'autre langue en
   petite ligne italique au-dessus.
   ===================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var PH = window.PHOTOS || {};
  var M = S.mairie || {};
  var C = S.commune || {};
  var corps = document.body;
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Langue
     ------------------------------------------------------------------ */
  var LANGUE = "fr";
  try { var lg = localStorage.getItem("sb-langue"); LANGUE = lg === "br" || lg === "en" ? lg : "fr"; } catch (e) {}
  var EN = {};
  window.SB_MANQUANTS = [];
  function cleEn(t) { return String(t).replace(/&amp;/g, "&").replace(/&nbsp;|\u00a0/g, " ").replace(/\s+/g, " ").trim(); }
  Object.keys(window.SITE_EN || {}).forEach(function (k) { EN[cleEn(k)] = window.SITE_EN[k].trim(); });
  function enDe(fr) {
    if (fr == null || fr === "") return fr;
    var v = EN[cleEn(fr)];
    if (v == null) { window.SB_MANQUANTS.push(cleEn(fr)); return fr; }
    return (/^\s/.test(fr) ? " " : "") + v + (/\s$/.test(fr) ? " " : "");
  }
  function T(fr, br) { if (LANGUE === "en") return enDe(fr); return LANGUE === "br" && br ? br : fr; }

  var JOURS = { fr: ["", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"], br: ["", "Dilun", "Dimeurzh", "Dimerc'her", "Diriaou", "Digwener", "Disadorn", "Disul"], en: ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] };
  var MOIS = { fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"], br: ["Genver", "C'hwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu"], en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] };
  var MOIS_COURT = { fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."], br: ["Gen.", "C'hwe.", "Meu.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kerzu"], en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
  function jour(n) { return JOURS[LANGUE][n]; }

  /* ------------------------------------------------------------------
     Outils
     ------------------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function echap(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lire(chemin) { return chemin.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S); }
  function slug(t) { return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function confirmer(html, oui, note) { return oui ? '<span class="a-confirmer" data-note="' + echap(note || "À confirmer avec la mairie") + '">' + html + "</span>" : html; }
  function dateDe(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dateLongue(iso) { var d = dateDe(iso); return d.getDate() + " " + MOIS[LANGUE][d.getMonth()] + " " + d.getFullYear(); }
  function maintenantParis() { try { return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" })); } catch (e) { return new Date(); } }
  function minutes(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function heureFr(hhmm) { var p = hhmm.split(":"); return (+p[0]) + (LANGUE === "en" ? ":" : "h") + p[1]; }

  /* ------------------------------------------------------------------
     Icônes (traits fins)
     ------------------------------------------------------------------ */
  var I = {
    fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    gauche: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    meteo: '<circle cx="9" cy="9" r="3.5"/><path d="M9 2.5v1.5M3.5 9H2M4.4 4.4l1 1M13.6 4.4l-1 1"/><path d="M8 20h9a4 4 0 0 0 0-8 5 5 0 0 0-9.5 1.5A3.3 3.3 0 0 0 8 20z"/>',
    salle: '<path d="M8 3h8l-1 7a3 3 0 0 1-6 0L8 3zM12 13v8M8 21h8"/>',
    tente: '<path d="M3 20L12 4l9 16H3zM12 4v16M9 20l3-6 3 6"/>',
    tri: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    livre: '<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5z"/><path d="M4 20a2 2 0 0 0 2 2h13v-4"/>',
    document: '<path d="M14 3H6v18h12V7l-4-4z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    maison: '<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-6h4v6"/>',
    feuille: '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19l8-8"/>',
    epingle: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clic: '<path d="M9 4v8l-2-1.5a1.5 1.5 0 0 0-2 2.2L9.5 20h8l1.5-7-6-1.5V4a2 2 0 0 0-4 0z"/>',
    bulle: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/>',
    croix: '<path d="M6 6l12 12M18 6L6 18"/>',
    valide: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
    groupe: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2.5 19a5.5 5.5 0 0 1 11 0M10.5 19a5.5 5.5 0 0 1 11 0"/>'
  };
  function icone(nom) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[nom] || "") + "</svg>";
  }

  /* Blason de la commune, version au trait (une couleur, prend la couleur du texte).
     La version en couleurs est dans assets/img/blason.svg */
  function logo() {
    var h = function (x, y) { return '<g transform="translate(' + x + " " + y + ') scale(.55)"><circle cx="0" cy="-9" r="2.2"/><circle cx="-3.8" cy="-6" r="2.2"/><circle cx="3.8" cy="-6" r="2.2"/><path d="M0 -4 C-1 0 -2.8 4.5 -5.6 9.4 L-1.8 7.4 L0 11 L1.8 7.4 L5.6 9.4 C2.8 4.5 1 0 0 -4Z"/></g>'; };
    return '<svg viewBox="0 0 200 240" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 10 H188 V118 C188 176 152 212 100 230 C48 212 12 176 12 118 Z" fill="none" stroke="currentColor" stroke-width="12" stroke-linejoin="round"/>' +
      '<path d="M12 10 H84 V82 H12 Z M48 24 L70 46 L48 68 L26 46 Z M48 35 L59 46 L48 57 L37 46 Z" fill-rule="evenodd"/>' +
      '<path d="M66 100 V82 H80 V92 H93 V82 H107 V92 H120 V82 H134 V100 L128 106 V200 H72 V106 Z M84 154 V138 a5 5 0 0 1 10 0 V154 Z M106 154 V138 a5 5 0 0 1 10 0 V154 Z M88 200 V176 a12 12 0 0 1 24 0 V200 Z" fill-rule="evenodd"/>' +
      h(130, 40) + h(162, 40) + h(150, 100) + h(160, 160) + h(40, 160) + h(50, 110) + "</svg>";
  }

  /* ------------------------------------------------------------------
     Photos
     ------------------------------------------------------------------ */
  var photosUtilisees = {};
  function imgPhoto(cle, largeur, eager) {
    var p = PH[cle];
    if (!p) return "";
    photosUtilisees[cle] = p;
    return '<img src="' + p.url(largeur || 1280) + '" alt="' + echap(p.titre) + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ">";
  }
  function creditPhoto(cle) {
    var p = PH[cle];
    return p ? '<a class="credit" href="' + p.page + '" target="_blank" rel="noopener">' + echap(p.auteur) + " · " + echap(p.licence) + "</a>" : "";
  }

  /* ------------------------------------------------------------------
     Textes fixes bilingues (data-br) et lignes en breton sous les titres
     ------------------------------------------------------------------ */
  function textesFixes() {
    $$("[data-br], [data-tr]").forEach(function (el) {
      if (el.dataset.fr == null) el.dataset.fr = el.innerHTML;
      el.innerHTML = LANGUE === "en" ? enDe(el.dataset.fr) : LANGUE === "br" && el.dataset.br != null ? el.dataset.br : el.dataset.fr;
    });
    // ligne dans l'autre langue au-dessus des grands titres
    $$("h1[data-br], h2[data-br], .bi[data-br]").forEach(function (el) {
      var autre = el.previousElementSibling;
      if (!autre || !autre.classList.contains("bi__autre")) {
        autre = document.createElement("span");
        autre.className = "bi__autre";
        autre.setAttribute("aria-hidden", "true");
        el.parentNode.insertBefore(autre, el);
      }
      var tmp = document.createElement("div");
      tmp.innerHTML = LANGUE === "br" ? el.dataset.fr : el.dataset.br;
      autre.textContent = tmp.textContent.trim();
      if (el.classList.contains("revele")) autre.className = "bi__autre revele" + (el.classList.contains("visible") ? " visible" : "");
    });
    document.documentElement.lang = LANGUE;
    var tb = document.querySelector('meta[name="titre-br"]');
    if (tb) { if (!document.documentElement.dataset.titreFr) document.documentElement.dataset.titreFr = document.title; document.title = LANGUE === "br" ? tb.content : LANGUE === "en" ? enDe(document.documentElement.dataset.titreFr) : document.documentElement.dataset.titreFr; }
  }

  /* ------------------------------------------------------------------
     En-tête et pied de page
     ------------------------------------------------------------------ */
  var PAGES = [
    ["mairie.html", "La mairie", "An ti-kêr"],
    ["demarches.html", "Démarches", "Kammedoù"],
    ["vie-locale.html", "Vie locale", "Buhez lec'hel"],
    ["nature.html", "Nature", "Natur"],
    ["decouvrir.html", "Découvrir", "Dizoleiñ"],
    ["actualites.html", "Actualités", "Keleier"],
    ["contact.html", "Contact", "Darempred"]
  ];
  var pageCourante = (location.pathname.split("/").pop() || "index.html");

  function entete() {
    return '<a class="lien-evitement" href="#contenu">' + T("Aller au contenu", "Mont d'an endalc'had") + "</a>" +
      '<header class="entete"><div class="conteneur">' +
      '<a class="marque" href="index.html" aria-label="' + T("Accueil — Sainte-Brigitte", "Degemer — Santez-Berc'hed") + '">' + logo() +
      '<span><span class="marque__nom">' + echap(T(C.nom, C.nomBreton)) + '</span><span class="marque__sous">' + echap(T(C.nomBreton, C.nom)) + "</span></span></a>" +
      '<nav class="nav" id="nav" aria-label="' + T("Menu principal", "Lañser pennañ") + '">' +
      PAGES.map(function (p) { return '<a href="' + p[0] + '"' + (pageCourante === p[0] ? ' aria-current="page"' : "") + ">" + T(p[1], p[2]) + "</a>"; }).join("") +
      "</nav>" +
      '<div class="outils"><div class="langue" role="group" aria-label="Langue / Yezh">' +
      '<button type="button" data-langue="fr" aria-pressed="' + (LANGUE === "fr") + '" lang="fr" title="Français">FR</button>' +
      '<button type="button" data-langue="br" aria-pressed="' + (LANGUE === "br") + '" lang="br" title="Brezhoneg">BR</button>' +
      '<button type="button" data-langue="en" aria-pressed="' + (LANGUE === "en") + '" lang="en" title="English">EN</button></div>' +
      '<button class="burger" aria-expanded="false" aria-controls="nav">' + T("Menu", "Lañser") + "</button></div>" +
      "</div></header>";
  }

  function pied() {
    var h = (M.horaires || []).map(function (j) {
      return "<li>" + jour(j.jour) + " · " + j.plages.map(function (p) { return heureFr(p[0]) + "–" + heureFr(p[1]); }).join(", ") + "</li>";
    }).join("");
    var credits = Object.keys(photosUtilisees).map(function (k) {
      var p = photosUtilisees[k];
      return '<a href="' + p.page + '" target="_blank" rel="noopener">' + echap(p.titre) + "</a> — " + echap(p.auteur) + ", " + echap(p.licence);
    }).join(" · ");
    return '<footer class="pied"><div class="conteneur"><div class="pied__grille">' +
      '<div><a class="marque marque--blason" href="index.html" style="color:var(--vert)"><img src="assets/img/blason.svg" alt="' + T("Armoiries de Sainte-Brigitte", "Armoù Santez-Berc'hed") + '" width="48" height="58"><span><span class="marque__nom">' + echap(C.nom) + '</span><span class="marque__sous">' + echap(C.nomBreton) + "</span></span></a>" +
      '<p class="pied__devise">' + T("Etre lenn ha koad.", "Entre lac et forêt.") + "</p>" +
      '<p style="color:var(--gris)">' + T("Entre lac et forêt, au cœur de la Bretagne.", "Etre lenn ha koad, e kreiz Breizh.") + "</p></div>" +
      "<div><h4>" + T("Mairie", "Ti-kêr") + "</h4><ul><li>" + echap(M.adresse) + "</li><li>" + echap(M.codePostal + " " + M.ville) + '</li><li><a href="tel:' + echap((M.telephone || "").replace(/\s/g, "")) + '">' + echap(M.telephone) + '</a></li><li><a href="mailto:' + echap(M.email) + '">' + echap(M.email) + "</a></li></ul></div>" +
      "<div><h4>" + T("Horaires", "Eurioù digeriñ") + "</h4><ul>" + h + "</ul></div>" +
      "<div><h4>" + T("Raccourcis", "Berradennoù") + '</h4><ul><li><a href="demarches.html#salle">' + T("Salle des fêtes", "Sal ar gouelioù") + '</a></li><li><a href="decouvrir.html#camping">' + T("Camping municipal", "Kampin ar gumun") + '</a></li><li><a href="covoiturage.html">' + T("Covoiturage", "Kenweturiñ") + '</a></li><li><a href="vie-locale.html#bulletins">' + T("Bulletins", "Kannadigoù") + '</a></li><li><a href="https://www.pontivy-communaute.bzh" rel="noopener">Pontivy Communauté</a></li><li><a href="#" data-ticket>' + T("Signaler une erreur", "Kemenn ur fazi") + "</a></li></ul></div>" +
      "</div>" +
      '<div class="pied__bas"><span>© ' + new Date().getFullYear() + " " + T("Commune de ", "Kumun ") + echap(T(C.nom, C.nomBreton)) + '</span><ul><li><a href="mentions-legales.html">' + T("Mentions légales", "Evezhiadennoù lezennel") + '</a></li><li><a href="mentions-legales.html#accessibilite">' + T("Accessibilité : partiellement conforme", "Haezadusted : diouzh al lezenn en un doare darnel") + "</a></li></ul></div>" +
      (credits ? '<p class="pied__credits">' + T("Photos", "Luc'hskeudennoù") + " : " + credits + " (Wikimedia Commons)</p>" : "") +
      "</div></footer>";
  }

  function installerCadre() {
    $$(".lien-evitement, .entete, .pied").forEach(function (e) { e.remove(); });
    corps.insertAdjacentHTML("afterbegin", entete());
    var main = $("main");
    (main || corps).insertAdjacentHTML(main ? "afterend" : "beforeend", pied());

    var burger = $(".burger");
    burger.addEventListener("click", function () {
      var ouvert = document.documentElement.classList.toggle("menu-ouvert");
      burger.setAttribute("aria-expanded", ouvert);
      burger.textContent = ouvert ? T("Fermer", "Serriñ") : T("Menu", "Lañser");
      document.documentElement.style.overflow = ouvert ? "hidden" : "";
    });
    $$(".langue button").forEach(function (b) { b.addEventListener("click", function () { changerLangue(b.dataset.langue); }); });
  }

  /* L'en-tête devient opaque au défilement et se cache quand on descend */
  var dernierY = 0;
  function surDefilement() {
    var head = $(".entete"), y = window.scrollY;
    if (!head) return;
    head.classList.toggle("entete--solide", y > 40);
    head.classList.toggle("entete--cache", y > 300 && y > dernierY && !document.documentElement.classList.contains("menu-ouvert"));
    dernierY = y;
  }

  /* ------------------------------------------------------------------
     Horaires
     ------------------------------------------------------------------ */
  function statutOuverture(horaires, fermetures) {
    var n = maintenantParis(), j = n.getDay() || 7, m = n.getHours() * 60 + n.getMinutes();
    var iso = n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");
    var auj = horaires.filter(function (h) { return h.jour === j; })[0];
    if (auj && (fermetures || []).indexOf(iso) < 0) {
      for (var i = 0; i < auj.plages.length; i++) {
        var p = auj.plages[i];
        if (m >= minutes(p[0]) && m < minutes(p[1])) return { ouvert: true, texte: T("Ouvert jusqu'à ", "Digor betek ") + heureFr(p[1]) };
        if (m < minutes(p[0])) return { ouvert: false, texte: T("Ouvre aujourd'hui à ", "Digor hiziv da ") + heureFr(p[0]) };
      }
    }
    for (var k = 1; k <= 7; k++) {
      var jj = ((j - 1 + k) % 7) + 1, h = horaires.filter(function (x) { return x.jour === jj; })[0];
      if (h) return { ouvert: false, texte: T("Fermé · réouverture ", "Serret · digor en-dro ") + (k === 1 ? T("demain", "warc'hoazh") : jour(jj).toLowerCase()) + T(" à ", " da ") + heureFr(h.plages[0][0]) };
    }
    return { ouvert: false, texte: T("Fermé", "Serret") };
  }
  function listeHoraires(horaires) {
    var j = maintenantParis().getDay() || 7, s = "";
    for (var d = 1; d <= 7; d++) {
      var h = horaires.filter(function (x) { return x.jour === d; })[0];
      s += '<li class="' + (d === j ? "aujourdhui" : "") + '"><span>' + jour(d) + "</span><span>" +
        (h ? h.plages.map(function (p) { return heureFr(p[0]) + " – " + heureFr(p[1]); }).join("<br>") : T("Fermé", "Serret")) + "</span></li>";
    }
    return s;
  }

  /* Météo du bourg (Open-Meteo, gratuit, sans cookie) */
  var meteoCache = null;
  function meteo(el) {
    var codes = { 0: ["Ciel dégagé", "Oabl sklaer"], 1: ["Plutôt dégagé", "Sklaer a-walc'h"], 2: ["Éclaircies", "Sklaeradurioù"], 3: ["Couvert", "Koumoulek"], 45: ["Brouillard", "Latar"], 48: ["Brouillard", "Latar"], 51: ["Bruine", "Glav munut"], 53: ["Bruine", "Glav munut"], 55: ["Bruine", "Glav munut"], 61: ["Pluie faible", "Glav skañv"], 63: ["Pluie", "Glav"], 65: ["Forte pluie", "Glav pounner"], 71: ["Neige", "Erc'h"], 73: ["Neige", "Erc'h"], 75: ["Neige", "Erc'h"], 80: ["Averses", "Barradoù glav"], 81: ["Averses", "Barradoù glav"], 82: ["Averses", "Barradoù glav"], 95: ["Orage", "Arnev"], 96: ["Orage", "Arnev"], 99: ["Orage", "Arnev"] };
    function afficher(d) { var c = codes[d.current.weather_code] || ["", ""]; el.textContent = Math.round(d.current.temperature_2m) + "°C · " + T(c[0], c[1]); }
    if (meteoCache) return afficher(meteoCache);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + C.latitude + "&longitude=" + C.longitude + "&current=temperature_2m,weather_code&timezone=Europe%2FParis")
      .then(function (r) { return r.json(); }).then(function (d) { meteoCache = d; afficher(d); })
      .catch(function () { el.textContent = T("Lac de Guerlédan tout proche", "Lenn Gwerledan e-kichen"); });
  }

  /* ------------------------------------------------------------------
     Contenus dynamiques
     ------------------------------------------------------------------ */
  function carteActu(a, i) {
    var visuel = a.photo ? imgPhoto(a.photo, 960) : (a.image ? '<img src="' + echap(a.image) + '" alt="" loading="lazy">' : "");
    return '<a class="carte revele" style="--delai:' + (i * 0.08) + 's" href="actualites.html?a=' + slug(a.titre) + '">' +
      '<div class="carte__visuel">' + visuel + "</div>" +
      '<div class="carte__corps"><div class="carte__meta"><span class="etiquette">' + echap(T(a.categorie, a.categorie_br)) + '</span><time datetime="' + a.date + '">' + dateLongue(a.date) + "</time></div>" +
      "<h3>" + confirmer(echap(T(a.titre, a.titre_br)), a.aConfirmer, "Date et contenu à confirmer") + "</h3><p>" + echap(T(a.resume, a.resume_br)) + "</p></div></a>";
  }

  var RENDUS = {
    actualites: function (el) { el.innerHTML = (S.actualites || []).slice(0, +el.dataset.limite || 99).map(carteActu).join(""); },
    agenda: function (el) {
      var auj = new Date(); auj.setHours(0, 0, 0, 0);
      var ev = (S.agenda || []).filter(function (e) { return dateDe(e.date) >= auj; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; }).slice(0, +el.dataset.limite || 99);
      el.innerHTML = ev.length ? ev.map(function (e, i) {
        var d = dateDe(e.date);
        return '<li class="revele" style="--delai:' + (i * 0.06) + 's"><div class="agenda__date"><b>' + d.getDate() + "</b><span>" + MOIS_COURT[LANGUE][d.getMonth()] + "</span></div>" +
          "<div><h3>" + confirmer(echap(T(e.titre, e.titre_br)), e.aConfirmer) + "</h3><p>" + echap(T(e.lieu)) + (e.organisateur ? " · " + echap(T(e.organisateur)) : "") + '</p></div><span class="agenda__heure">' + echap(e.heure || "") + "</span></li>";
      }).join("") : "<li><div></div><div><h3>" + T("Pas de rendez-vous annoncé", "Emgav ebet evit ar mare") + "</h3></div></li>";
    },
    associations: function (el) {
      el.innerHTML = (S.associations || []).map(function (a) {
        return '<div class="pro"><strong>' + echap(a.nom) + "</strong><span>" + echap(T(a.activites)) + "</span>" + (a.email ? '<br><a href="mailto:' + echap(a.email) + '" style="font-size:.84rem">' + echap(a.email) + "</a>" : "") + "</div>";
      }).join("");
    },
    /* Annuaire des professionnels, groupé par catégorie (contenu/lieux.js) */
    pros: function (el) {
      var CAT = S.categoriesLieux || {};
      el.innerHTML = Object.keys(CAT).filter(function (c) { return c !== "voir"; }).map(function (c) {
        var liste = (S.lieux || []).filter(function (l) { return l.cat === c; });
        if (!liste.length) return "";
        return '<h3 style="margin-top:28px"><span class="pastille" style="--c:' + CAT[c].couleur + '"></span>' + echap(T(CAT[c].fr, CAT[c].br)) + '</h3><div class="liste-pros">' + liste.map(function (p) {
          return '<div class="pro"><strong>' + echap(p.nom) + "</strong><span>" + echap(T(p.desc || "")) + "</span>" +
            '<div class="pro__liens">' + (p.adresse || p.ville ? "<span>" + echap([p.adresse, p.ville].filter(Boolean).join(", ")) + "</span>" : "") +
            (p.tel ? '<a href="tel:' + p.tel.replace(/\s/g, "") + '">' + echap(p.tel) + "</a>" : "") +
            (p.site ? '<a href="' + echap(p.site) + '" target="_blank" rel="noopener">' + T("Site", "Lec'hienn") + "</a>" : "") +
            (p.lat ? '<a href="' + lienGoogle(p) + '" target="_blank" rel="noopener">Google Maps</a>' : "") + "</div></div>";
        }).join("") + "</div>";
      }).join("");
    },
    carte: function (el) { installerCarte(el); },
    bulletins: function (el) {
      el.innerHTML = (S.bulletins || []).map(function (b) {
        var href = b.fichier ? 'href="' + echap(b.fichier) + '" target="_blank" rel="noopener"' : 'href="contact.html"';
        return '<a class="bulletin" ' + href + '><div class="bulletin__couv"><small>' + echap(C.nomBreton) + "</small><b>" + echap(b.titre) + "</b><small>" + echap(T(b.sousTitre)) + (b.fichier ? " · PDF" : T(" · en mairie", " · en ti-kêr")) + "</small></div></a>";
      }).join("");
    },
    conseil: function (el) {
      el.innerHTML = (S.conseil || []).map(function (p) {
        var vide = p.nom === "À compléter";
        return '<div class="personne"><div class="personne__avatar">' + (vide ? logo() : echap(p.nom.split(" ").map(function (m) { return m[0]; }).join("").slice(0, 2))) + "</div><strong>" + confirmer(echap(vide ? T("À compléter", "Da glokaat") : p.nom), vide, "Après les élections") + "</strong><span>" + echap(T(p.role)) + "</span></div>";
      }).join("");
    },
    "tarifs-salle": function (el) {
      el.innerHTML = '<table class="tableau"><thead><tr><th>' + T("Objet de la location", "Abeg ar feurmañ") + "</th><th>" + T("Locaux", "Tud ar gumun") + "</th><th>" + T("Extérieurs", "Tud a-ziavaez") + "</th></tr></thead><tbody>" +
        S.tarifs.salle.map(function (l) { return "<tr><td>" + l.map(function (x) { return echap(T(x)); }).join("</td><td>") + "</td></tr>"; }).join("") +
        "<tr><td>" + T("Consommation électrique", "Tredan implijet") + '</td><td colspan="2">' + T("Selon tarifs du fournisseur", "Hervez priz ar pourvezer") + "</td></tr></tbody></table>";
    },
    "tarifs-services": function (el) {
      el.innerHTML = '<table class="tableau"><thead><tr><th>' + T("Service", "Servij") + "</th><th>" + T("Tarif ", "Priz ") + S.tarifs.annee + "</th></tr></thead><tbody>" +
        S.tarifs.services.map(function (l) { return "<tr><td>" + echap(T(l[0])) + "</td><td>" + echap(/^[\d,]+ € *$/.test(l[1]) ? l[1] : T(l[1])) + "</td></tr>"; }).join("") + "</tbody></table>";
    },
    lots: function (el) {
      el.innerHTML = '<table class="tableau"><thead><tr><th>' + T("Lot", "Lodenn") + "</th><th>" + T("Surface", "Gorread") + "</th><th>" + T("Prix indicatif", "Priz da heul") + "</th></tr></thead><tbody>" +
        S.terrains.lots.map(function (l) { return "<tr><td>" + T("Lot n°", "Lodenn niv. ") + l.numero + "</td><td>" + l.surface.toLocaleString("fr-FR") + " m²</td><td>" + (l.surface * 10).toLocaleString("fr-FR") + " € TTC</td></tr>"; }).join("") + "</tbody></table>";
    },
    "horaires-mairie": function (el) { el.innerHTML = listeHoraires(M.horaires || []); },
    "horaires-biblio": function (el) { el.innerHTML = listeHoraires((S.bibliotheque || {}).horaires || []); },
    statut: function (el) { var s = statutOuverture(M.horaires || [], M.fermetures); el.className = "statut " + (s.ouvert ? "statut--ouvert" : ""); el.innerHTML = "<i></i>" + s.texte; },
    meteo: meteo,
    maire: function (el) { el.innerHTML = confirmer(echap(M.maire), M.maireAConfirmer, "Nouvelles élections annoncées"); },
    /* <div data-rendu="photo" data-photo="lac1"> : photo + crédit */
    photo: function (el) { if (!el.querySelector("img")) el.insertAdjacentHTML("afterbegin", imgPhoto(el.dataset.photo, +el.dataset.largeur || 1280, el.dataset.prioritaire != null) + creditPhoto(el.dataset.photo)); }
  };

  /* ------------------------------------------------------------------
     Carte interactive des lieux (Leaflet + fond de carte CARTO/OSM)
     <div data-rendu="carte" data-cats="voir,manger"></div>
     data-cats (facultatif) : catégories affichées au départ
     ------------------------------------------------------------------ */
  function lienGoogle(p) {
    var q = p.nom + ", " + (p.adresse ? p.adresse + ", " : "") + (p.ville || "56480 Sainte-Brigitte");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }
  function lienItineraire(p) { return "https://www.google.com/maps/dir/?api=1&destination=" + p.lat + "," + p.lng; }

  var leafletPromesse = null;
  function chargerLeaflet() {
    if (window.L) return Promise.resolve();
    if (leafletPromesse) return leafletPromesse;
    /* On attend la feuille de style ET le script : sans le style, la carte
       calcule mal sa taille et s'affiche grise et dézoomée. */
    leafletPromesse = Promise.all([
      new Promise(function (ok) {
        var css = document.createElement("link");
        css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        css.onload = ok; css.onerror = ok;
        document.head.appendChild(css);
      }),
      new Promise(function (ok, ko) {
        var js = document.createElement("script");
        js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        js.onload = ok; js.onerror = ko;
        document.head.appendChild(js);
      })
    ]);
    return leafletPromesse;
  }

  function installerCarte(el) {
    var CAT = S.categoriesLieux || {}, lieux = (S.lieux || []).filter(function (l) { return l.lat; });
    var actives = el.dataset.cats ? el.dataset.cats.split(",") : Object.keys(CAT);
    if (el._carte) { el._carte.remove(); el._carte = null; }
    el.innerHTML = '<div class="carte-lieux__filtres" role="group" aria-label="' + T("Filtrer la carte", "Silañ ar gartenn") + '">' +
      Object.keys(CAT).map(function (c) {
        var n = lieux.filter(function (l) { return l.cat === c; }).length;
        return '<button type="button" data-cat="' + c + '" aria-pressed="' + (actives.indexOf(c) >= 0) + '" style="--c:' + CAT[c].couleur + '"><span class="pastille"></span>' + echap(T(CAT[c].fr, CAT[c].br)) + " <small>" + n + "</small></button>";
      }).join("") + "</div>" +
      '<div class="carte-lieux__corps"><div class="carte-lieux__carte"></div><ul class="carte-lieux__liste"></ul></div>';
    var zone = $(".carte-lieux__carte", el), liste = $(".carte-lieux__liste", el);

    chargerLeaflet().then(function () {
      var L = window.L;
      var carte = L.map(zone, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([48.172, -3.115], 13);
      el._carte = carte;
      carte.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(carte);
      carte.on("focus", function () { carte.scrollWheelZoom.enable(); });
      carte.on("blur", function () { carte.scrollWheelZoom.disable(); });

      var marqueurs = lieux.map(function (p, i) {
        var c = CAT[p.cat] || {};
        var m = L.marker([p.lat, p.lng], {
          title: p.nom, riseOnHover: true,
          icon: L.divIcon({ className: "repere", html: '<span style="--c:' + c.couleur + '">' + icone(c.icone) + "</span>", iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] })
        });
        m.bindPopup(
          '<div class="bulle"><span class="bulle__cat" style="color:' + c.couleur + '">' + echap(T(c.fr, c.br)) + "</span>" +
          "<strong>" + echap(p.nom) + "</strong>" + (p.desc ? "<p>" + echap(T(p.desc)) + "</p>" : "") +
          (p.horaires ? '<p class="bulle__petit">' + icone("horloge") + echap(T(p.horaires)) + "</p>" : "") +
          '<p class="bulle__petit">' + icone("epingle") + echap([p.adresse, p.ville || "Sainte-Brigitte"].filter(Boolean).join(", ")) + "</p>" +
          (p.tel ? '<p class="bulle__petit">' + icone("tel") + '<a href="tel:' + p.tel.replace(/\s/g, "") + '">' + echap(p.tel) + "</a></p>" : "") +
          '<div class="bulle__boutons"><a class="bouton bouton--vert" href="' + lienGoogle(p) + '" target="_blank" rel="noopener">Google Maps</a>' +
          '<a class="bouton bouton--contour" href="' + lienItineraire(p) + '" target="_blank" rel="noopener">' + T("Itinéraire", "Hentad") + "</a>" +
          (p.site ? '<a class="lien-fleche" href="' + echap(p.site) + '" target="_blank" rel="noopener">' + T("Site web", "Lec'hienn") + "</a>" : "") + "</div></div>",
          { maxWidth: 290 }
        );
        m._cat = p.cat; m._i = i;
        return m;
      });

      function afficher() {
        var vis = [];
        marqueurs.forEach(function (m) {
          if (actives.indexOf(m._cat) >= 0) { m.addTo(carte); vis.push(m); } else { carte.removeLayer(m); }
        });
        liste.innerHTML = vis.map(function (m) {
          var p = lieux[m._i], c = CAT[p.cat];
          return '<li><button type="button" data-i="' + m._i + '"><span class="pastille" style="--c:' + c.couleur + '"></span><span><strong>' + echap(p.nom) + "</strong><small>" + echap(p.adresse || "") + "</small></span></button></li>";
        }).join("") || "<li class=\"petit\" style=\"padding:14px\">" + T("Choisissez une catégorie.", "Dibabit ur rummad.") + "</li>";
        cadrer(vis);
      }
      var visiblesCourants = [];
      function cadrer(vis) {
        visiblesCourants = vis || visiblesCourants;
        carte.invalidateSize(false);
        if (visiblesCourants.length && zone.clientHeight > 50) carte.fitBounds(L.featureGroup(visiblesCourants).getBounds().pad(0.15), { maxZoom: 15, animate: false });
      }
      /* Recalage quand la carte apparaît à l'écran ou que la fenêtre change de taille */
      if ("IntersectionObserver" in window) {
        var dejaVue = false;
        new IntersectionObserver(function (ent) { if (ent[0].isIntersecting && !dejaVue) { dejaVue = true; setTimeout(function () { cadrer(); }, 120); } }, { threshold: 0.1 }).observe(zone);
      }
      if ("ResizeObserver" in window) {
        var attente;
        new ResizeObserver(function () { clearTimeout(attente); attente = setTimeout(function () { carte.invalidateSize(false); }, 150); }).observe(zone);
      }
      $$(".carte-lieux__filtres button", el).forEach(function (b) {
        b.addEventListener("click", function () {
          var c = b.dataset.cat, i = actives.indexOf(c);
          if (i >= 0) actives.splice(i, 1); else actives.push(c);
          b.setAttribute("aria-pressed", i < 0);
          afficher();
        });
      });
      liste.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        var m = marqueurs[+b.dataset.i];
        carte.flyTo(m.getLatLng(), 16, { duration: reduit ? 0 : 0.8 });
        setTimeout(function () { m.openPopup(); }, reduit ? 0 : 850);
        if (window.innerWidth < 860) zone.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      afficher();
    }).catch(function () {
      zone.innerHTML = '<p class="petit" style="padding:20px">' + T("La carte n'a pas pu se charger (connexion internet ?).", "N'eus ket bet gallet kargañ ar gartenn.") + "</p>";
    });
  }

  function rendreContenus() {
    $$("[data-rendu]").forEach(function (el) { var f = RENDUS[el.dataset.rendu]; if (f) f(el); });
    $$("[data-info]").forEach(function (el) {
      var v = lire(el.dataset.info);
      if (v == null) return;
      if (el.dataset.lien === "tel") el.href = "tel:" + String(v).replace(/\s/g, "");
      if (el.dataset.lien === "mail") el.href = "mailto:" + v;
      el.textContent = v;
    });
    $$("[data-icone]").forEach(function (el) { el.innerHTML = icone(el.dataset.icone); });
  }

  function pageArticle() {
    var cible = new URLSearchParams(location.search).get("a"), zone = $("#article");
    if (!zone || !cible) return;
    var a = (S.actualites || []).filter(function (x) { return slug(x.titre) === cible; })[0];
    if (!a) return;
    $("#liste-actus").hidden = true;
    zone.hidden = false;
    document.title = T(a.titre, a.titre_br) + " — " + C.nom;
    var t = $("#tete-titre"); t.removeAttribute("data-br"); t.innerHTML = confirmer(echap(T(a.titre, a.titre_br)), a.aConfirmer);
    var prev = t.previousElementSibling; if (prev && prev.classList.contains("bi__autre")) prev.textContent = LANGUE === "br" ? a.titre : (a.titre_br || "");
    var ch = $("#tete-chapeau"); ch.removeAttribute("data-br"); ch.textContent = T(a.resume, a.resume_br);
    if (a.photo) { var f = $(".tete-page .photo-fond"); f.innerHTML = imgPhoto(a.photo, 1920, true) + creditPhoto(a.photo); }
    zone.innerHTML = '<div class="carte__meta" style="margin-bottom:24px"><span class="etiquette">' + echap(T(a.categorie, a.categorie_br)) + "</span><time>" + dateLongue(a.date) + "</time></div>" +
      (LANGUE === "en" ? '<p class="petit"><em>' + T("Article complet disponible en français.") + "</em></p>" : "") + '<div class="article-texte" lang="fr">' + (LANGUE === "en" ? a.texte : T(a.texte, a.texte_br)) + "</div>" +
      '<p style="margin-top:40px"><a class="lien-fleche" href="actualites.html">' + icone("gauche") + T(" Toutes les actualités", " An holl geleier") + "</a></p>";
  }

  /* ------------------------------------------------------------------
     Animations discrètes
     ------------------------------------------------------------------ */
  var obs = "IntersectionObserver" in window ? new IntersectionObserver(function (ent) {
    ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function observer() { $$(".revele:not(.visible), .panneau:not(.visible)").forEach(function (el) { obs ? obs.observe(el) : el.classList.add("visible"); }); }

  function compteurs() {
    var o = "IntersectionObserver" in window ? new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        o.unobserve(e.target);
        var el = e.target, fin = +el.dataset.compteur, t0 = performance.now(), d = reduit ? 1 : 1600;
        (function pas(t) { var k = Math.min(1, (t - t0) / d); el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(pas); })(t0);
      });
    }, { threshold: 0.6 }) : null;
    $$("[data-compteur]").forEach(function (el) { o ? o.observe(el) : (el.textContent = el.dataset.compteur); });
  }

  function sommaire() {
    var liens = $$(".sommaire a");
    if (!liens.length || !("IntersectionObserver" in window)) return;
    var o = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) liens.forEach(function (a) { a.classList.toggle("actif", a.getAttribute("href") === "#" + e.target.id); }); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    liens.forEach(function (a) { var c = $(a.getAttribute("href")); if (c) o.observe(c); });
  }

  /* ------------------------------------------------------------------
     Tickets : « Signaler / suggérer » sur chaque page
     Envoi via Web3Forms (gratuit, sans serveur) si une clé est configurée,
     sinon ouverture de la messagerie du visiteur.
     ------------------------------------------------------------------ */
  function referenceTicket() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    return "SB-" + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function installerTicket() {
    var cfg = S.tickets || {};
    $$(".ticket-bouton, .ticket").forEach(function (e) { e.remove(); });
    if (!cfg.actif) return;
    var types = [
      ["erreur", "Erreur sur le site", "Fazi war al lec'hienn"],
      ["maj", "Info à mettre à jour", "Titour da hizivaat"],
      ["idee", "Idée ou suggestion", "Mennoz pe kinnig"],
      ["nature", "Observation nature", "Arsell natur"],
      ["autre", "Autre", "All"]
    ];
    corps.insertAdjacentHTML("beforeend",
      '<button type="button" class="ticket-bouton" aria-haspopup="dialog">' + icone("bulle") + "<span>" + T("Signaler / suggérer", "Kemenn / kinnig") + "</span></button>" +
      '<dialog class="ticket" aria-labelledby="ticket-titre">' +
      '<form class="ticket__form" novalidate>' +
      '<button type="button" class="ticket__fermer" aria-label="' + T("Fermer", "Serriñ") + '">' + icone("croix") + "</button>" +
      '<h2 id="ticket-titre">' + T("Une erreur, une idée ?", "Ur fazi, ur mennoz ?") + "</h2>" +
      '<p class="petit">' + T("Votre message arrive directement au responsable du site, qui le traite au plus vite.", "Ho kemennadenn a zeu war-eeun da ren al lec'hienn.") + "</p>" +
      '<fieldset class="ticket__types"><legend class="sr">' + T("Type de demande", "Seurt goulenn") + "</legend>" +
      types.map(function (t, i) { return '<label><input type="radio" name="type" value="' + t[1] + '"' + (i === 0 ? " checked" : "") + "><span>" + T(t[1], t[2]) + "</span></label>"; }).join("") +
      "</fieldset>" +
      '<label class="ticket__champ">' + T("Page concernée", "Pajenn") + '<input name="page" value="' + echap(document.title) + '"></label>' +
      '<label class="ticket__champ"><span>' + T("Votre message", "Ho kemennadenn") + ' <em>*</em></span><textarea name="message" rows="5" required placeholder="' + T("Ex. : l'horaire de la bibliothèque a changé, c'est maintenant le jeudi…", "Sk. : cheñchet eo eurioù al levraoueg…") + '"></textarea></label>' +
      '<div class="ticket__ligne"><label class="ticket__champ">' + T("Nom (facultatif)", "Anv (diret)") + '<input name="nom" autocomplete="name"></label>' +
      '<label class="ticket__champ">' + T("E-mail pour vous répondre (facultatif)", "Postel (diret)") + '<input name="email" type="email" autocomplete="email"></label></div>' +
      '<input type="checkbox" name="botcheck" class="sr" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<p class="ticket__erreur" role="alert" hidden></p>' +
      '<button class="bouton bouton--vert" type="submit">' + T("Envoyer le ticket", "Kas an tiked") + "</button>" +
      '<p class="petit" style="margin:0">' + T("Vos données servent uniquement à traiter votre demande.", "Ho roadennoù a dalvez hepken da respont d'ho koulenn.") + ' <a href="mentions-legales.html#donnees">' + T("En savoir plus", "Gouzout muioc'h") + "</a></p>" +
      "</form>" +
      '<div class="ticket__merci" hidden>' + icone("valide") + "<h2>" + T("Merci !", "Trugarez !") + '</h2><p>' + T("Votre ticket est bien parti. Gardez sa référence :", "Kaset eo bet ho tiked. Mirit e zave :") + '</p><p class="ticket__ref"></p><button type="button" class="bouton bouton--contour ticket__fermer2">' + T("Fermer", "Serriñ") + "</button></div>" +
      "</dialog>");

    var bouton = $(".ticket-bouton"), dlg = $(".ticket"), form = $(".ticket__form", dlg), merci = $(".ticket__merci", dlg), err = $(".ticket__erreur", dlg);
    function ouvrir() {
      form.hidden = false; merci.hidden = true; err.hidden = true;
      form.page.value = document.title;
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
      setTimeout(function () { form.message.focus(); }, 50);
    }
    function fermer() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    bouton.addEventListener("click", ouvrir);
    $$(".ticket__fermer, .ticket__fermer2", dlg).forEach(function (b) { b.addEventListener("click", fermer); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) fermer(); });
    $$('[data-ticket]').forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); ouvrir(); }); });
    /* Ouverture pré-remplie, ex. depuis le catalogue faune & flore */
    window.SB.ouvrirTicket = function (opts) {
      ouvrir();
      opts = opts || {};
      if (opts.type) { var r = form.querySelector('[name=type][value="' + opts.type + '"]'); if (r) r.checked = true; }
      if (opts.page) form.page.value = opts.page;
      if (opts.message) { form.message.value = opts.message; var n = form.message.value.length; form.message.setSelectionRange(n, n); }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.message.value.trim()) { err.textContent = T("Écrivez votre message avant d'envoyer.", "Skrivit ho kemennadenn a-raok kas."); err.hidden = false; form.message.focus(); return; }
      if (form.botcheck.checked) return;
      var ref = referenceTicket(), type = form.querySelector("[name=type]:checked").value;
      var texte = "Référence : " + ref + "\nType : " + type + "\nPage : " + form.page.value + "\nAdresse : " + location.href +
        "\nLangue : " + LANGUE + "\n\n" + form.message.value.trim() + "\n\n— " + (form.nom.value || "Anonyme") + (form.email.value ? " <" + form.email.value + ">" : "");
      var sujet = "[Ticket " + ref + "] " + type + " — " + form.page.value;
      function reussi() { form.hidden = true; merci.hidden = false; $(".ticket__ref", merci).textContent = ref; form.reset(); }
      function parMail() {
        var dest = cfg.emailSecours || M.email;
        location.href = "mailto:" + dest + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(texte);
        reussi();
      }
      if (!cfg.cleWeb3Forms) return parMail();
      var btn = form.querySelector("[type=submit]"); btn.disabled = true; btn.textContent = T("Envoi…", "O kas…");
      fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: cfg.cleWeb3Forms, subject: sujet, from_name: "Site " + C.nom, name: form.nom.value || "Anonyme", email: form.email.value || undefined, message: texte, botcheck: false })
      }).then(function (r) { return r.json(); }).then(function (d) {
        if (d.success) reussi(); else throw new Error(d.message);
      }).catch(function () {
        err.innerHTML = T("L'envoi n'a pas fonctionné. ", "N'eo ket aet kuit. ") + '<a href="#" class="ticket__secours">' + T("Envoyer par e-mail à la place", "Kas dre bostel") + "</a>";
        err.hidden = false;
        $(".ticket__secours", err).addEventListener("click", function (ev) { ev.preventDefault(); parMail(); });
      }).then(function () { btn.disabled = false; btn.textContent = T("Envoyer le ticket", "Kas an tiked"); });
    });
  }

  /* ------------------------------------------------------------------
     Catalogue faune & flore : <div data-rendu="especes"></div>
     ------------------------------------------------------------------ */
  RENDUS.especes = function (el) {
    var CAT = S.categoriesEspeces || {}, liste = S.especes || [], ZE = S.zonesEspeces || {}, ARBRES = S.arbres || [], MI = S.carteMilieux;
    var moisCourant = maintenantParis().getMonth() + 1;
    var initiales = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    var MILIEUX = milieuxNature();
    var GROUPES = {
      animaux: { nom: T("Animaux", "Loened"), fams: [
        { k: "oiseaux", nom: T(CAT.oiseaux.fr, CAT.oiseaux.br), c: "#2b62a0" },
        { k: "papillons", nom: T(CAT.papillons.fr, CAT.papillons.br), c: "#c2478a" },
        { k: "mammiferes", nom: T(CAT.mammiferes.fr, CAT.mammiferes.br), c: "#8a5a2b" },
        { k: "ferme", nom: T(CAT.ferme.fr, CAT.ferme.br), c: "#c9843f" },
        { k: "autres", nom: T(CAT.autres.fr, CAT.autres.br), c: "#5b7d3a" }] },
      plantes: { nom: T("Fleurs, arbres & champignons", "Bleuñv, gwez ha togoù-touseg"), fams: [
        { k: "arbres", nom: T("Arbres", "Gwez"), c: "#3f7d4e" },
        { k: "fleurs", nom: T("Fleurs & plantes", "Bleuñv ha plant"), c: "#c2478a" },
        { k: "champignons", nom: T(CAT.champignons.fr, CAT.champignons.br), c: "#b5532a" }] }
    };
    function famille(e) { return e.cat === "plantes" ? (ARBRES.indexOf(e.la) >= 0 ? "arbres" : "fleurs") : e.cat; }
    var etat = { groupe: "animaux", caches: {}, saison: false, q: "" };
    if (el._carte) { el._carte.remove(); el._carte = null; }
    el.innerHTML =
      '<div class="cn__onglets" role="group" aria-label="' + T("Choisir une carte", "Dibab ur gartenn") + '">' +
      Object.keys(GROUPES).map(function (g) { return '<button type="button" data-groupe="' + g + '">' + echap(GROUPES[g].nom) + "</button>"; }).join("") + "</div>" +
      '<div class="carte-lieux__filtres cn__filtres" role="group" aria-label="' + T("Afficher ou cacher", "Diskouez pe kuzhat") + '"></div>' +
      '<div class="carte-lieux__carte cn__carte"></div><div class="cn__legende"></div>' +
      '<p class="petit cn__note">' + T("Chaque couleur est un milieu de vie : touchez une zone pour voir les espèces à y chercher. Ce sont des milieux favorables, pas des observations précises.", "") + "</p>" +
      '<div class="cata__droite cn__recherche"><label class="cata__saison"><input type="checkbox"> <span>' + T("À voir en ", "Da welet e ") + MOIS[LANGUE][moisCourant - 1] + "</span></label>" +
      '<input class="cata__recherche" type="search" placeholder="' + T("Rechercher une espèce…", "Klask ur spesad…") + '" aria-label="' + T("Rechercher une espèce", "Klask ur spesad") + '"></div>' +
      '<p class="cata__compte petit" aria-live="polite"></p><div class="cata__grille"></div>';
    var grille = $(".cata__grille", el), compte = $(".cata__compte", el), filtres = $(".cn__filtres", el), legende = $(".cn__legende", el), zoneCarte = $(".cn__carte", el);
    var dessinerCarte = function () {};

    function periode(m) {
      if (m.length >= 12) return T("Toute l'année", "A-hed ar bloaz");
      return MOIS[LANGUE][m[0] - 1] + " – " + MOIS[LANGUE][m[m.length - 1] - 1];
    }
    function ligne(t, v) { return "<dt>" + t + "</dt><dd>" + v + "</dd>"; }
    function carte(e, i) {
      var c = CAT[e.cat] || {};
      var barre = initiales.map(function (l, k) { return '<span class="' + (e.mois.indexOf(k + 1) >= 0 ? "on" : "") + (k + 1 === moisCourant ? " maintenant" : "") + '" title="' + MOIS[LANGUE][k] + '">' + l + "</span>"; }).join("");
      var milieux = (ZE[e.la] || []).map(function (k) { return MILIEUX[k].nom; }).join(", ");
      return '<article class="espece revele" style="--delai:' + Math.min(i, 8) * 0.04 + 's">' +
        '<div class="espece__photo"><img src="' + e.photo[0] + '" alt="' + echap(T(e.fr)) + '" loading="lazy">' +
        '<a class="credit" href="' + e.photo[3] + '" target="_blank" rel="noopener">' + echap(e.photo[1]) + " · " + echap(e.photo[2]) + "</a>" +
        '<div class="espece__badges">' + (e.local ? '<span class="badge badge--local">' + T("Vu à Sainte-Brigitte", "Gwelet e Santez-Berc'hed") + "</span>" : "") +
        (e.protege ? '<span class="badge badge--protege">' + T("Protégée", "Gwarezet") + "</span>" : "") + (e.danger ? '<span class="badge badge--danger">' + T(e.danger === "mortelle" ? "Mortelle" : "Toxique", e.danger === "mortelle" ? "Marvus" : "Pistrius") + "</span>" : "") + "</div></div>" +
        '<div class="espece__corps"><span class="etiquette">' + echap(T(c.fr, c.br)) + "</span>" +
        "<h3>" + echap(T(e.fr)) + "</h3>" +
        '<p class="espece__noms">' + (e.br ? '<span class="breton">' + confirmer(echap(e.br), e.brSource === "a-verifier", "Nom breton à faire valider") + "</span> · " : "") + "<i>" + echap(e.la) + "</i></p>" +
        "<p>" + echap(T(e.texte)) + "</p>" + (e.cat === "champignons" ? '<p class="espece__alerte">' + T("Ne cueillez jamais d'après une photo : faites vérifier par un pharmacien ou un mycologue.") + "</p>" : "") +
        '<div class="espece__mois" aria-label="' + T("Meilleure période d'observation", "Ar mare gwellañ evit arsellout") + '">' + barre + "</div>" +
        '<details class="plus"><summary>' + T("En savoir plus", "Gouzout hiroc'h") + "</summary><dl>" +
        (milieux ? ligne(T("Où la chercher", "Pelec'h he c'havout"), echap(milieux)) : "") +
        ligne(T("Quand l'observer", "Pegoulz"), echap(periode(e.mois))) +
        ligne(T("Nom scientifique", "Anv skiantel"), "<i>" + echap(e.la) + "</i>") +
        (e.protege ? ligne(T("Statut", "Statud"), T("Espèce protégée en France", "Spesad gwarezet e Frañs")) : "") +
        "</dl></details>" +
        '<button type="button" class="lien-fleche espece__vu" data-i="' + liste.indexOf(e) + '">' + icone("feuille") + " " + T("J'ai vu cette espèce", "Gwelet em eus ar spesad-mañ") + "</button>" +
        "</div></article>";
    }
    function visibles() {
      var fams = GROUPES[etat.groupe].fams.map(function (f) { return f.k; });
      var q = etat.q.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      return liste.filter(function (e) {
        var f = famille(e);
        if (fams.indexOf(f) < 0 || etat.caches[f]) return false;
        if (etat.saison && e.mois.indexOf(moisCourant) < 0) return false;
        if (q && (e.fr + " " + (EN[e.fr] || "") + " " + (e.br || "") + " " + e.la).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").indexOf(q) < 0) return false;
        return true;
      });
    }
    function afficher() {
      var vis = visibles();
      grille.innerHTML = vis.map(carte).join("") || '<p class="petit">' + T("Aucune espèce ne correspond.", "Spesad ebet ne glot.") + "</p>";
      compte.textContent = vis.length + " " + T(vis.length > 1 ? "espèces" : "espèce", "spesad");
      observer();
      dessinerCarte(vis);
    }
    function construireFiltres() {
      $$(".cn__onglets button", el).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.groupe === etat.groupe); });
      filtres.innerHTML = GROUPES[etat.groupe].fams.map(function (f) {
        var n = liste.filter(function (e) { return famille(e) === f.k; }).length;
        return '<button type="button" data-fam="' + f.k + '" aria-pressed="' + !etat.caches[f.k] + '" style="--c:' + f.c + '"><span class="pastille"></span>' + echap(f.nom) + " <small>" + n + "</small></button>";
      }).join("");
    }
    $$(".cn__onglets button", el).forEach(function (b) {
      b.addEventListener("click", function () { etat.groupe = b.dataset.groupe; construireFiltres(); afficher(); });
    });
    filtres.addEventListener("click", function (ev) {
      var b = ev.target.closest("button"); if (!b) return;
      var k = b.dataset.fam; etat.caches[k] = !etat.caches[k]; b.setAttribute("aria-pressed", !etat.caches[k]); afficher();
    });
    $(".cata__saison input", el).addEventListener("change", function () { etat.saison = this.checked; afficher(); });
    $(".cata__recherche", el).addEventListener("input", function () { etat.q = this.value; afficher(); });
    grille.addEventListener("click", function (ev) {
      var b = ev.target.closest(".espece__vu"); if (!b || !window.SB.ouvrirTicket) return;
      var e = liste[+b.dataset.i];
      window.SB.ouvrirTicket({
        type: "Observation nature",
        page: T("Faune & flore", "Loened ha plant") + " — " + T(e.fr) + " (" + e.la + ")",
        message: T("J'ai vu : ", "Gwelet em eus : ") + T(e.fr) + "\n" + T("Date : ", "Deiziad : ") + new Date().toLocaleDateString("fr-FR") + "\n" + T("Lieu (village, chemin…) : ", "Lec'h : ") + "\n" + T("Nombre : ", "Niver : ") + "\n" + T("Remarques : ", "Evezhiadennoù : ")
      });
    });
    construireFiltres();
    afficher();

    if (MI) carteNature(el, zoneCarte, function (L, carte, couches) {
      dessinerCarte = function (vis) {
        couches.clearLayers(); carte.closePopup();
        var presents = [];
        ["campagne", "foret", "etangs", "lac", "bourg"].forEach(function (m) {
          var ici = vis.filter(function (e) { return (ZE[e.la] || []).indexOf(m) >= 0; });
          if (!ici.length) return;
          presents.push(m);
          var M = MILIEUX[m], st = { color: M.c, weight: 1, fillColor: M.c, fillOpacity: m === "campagne" ? 0.28 : 0.55 }, c;
          if (m === "bourg") c = L.featureGroup((S.reperesCarte || []).map(function (r) { return L.circle([r.lat, r.lng], Object.assign({ radius: 320 }, st)); }));
          else c = L.polygon(m === "campagne" ? MI.commune : MI[m], st);
          c.bindPopup('<div class="bulle"><span class="bulle__cat" style="color:' + M.c + '">' + ici.length + " " + T(ici.length > 1 ? "espèces" : "espèce", "spesad") + "</span><strong>" + echap(M.nom) + '</strong><ul class="cn__liste">' + ici.map(function (e) { return "<li>" + echap(T(e.fr)) + "</li>"; }).join("") + "</ul></div>", { maxWidth: 260 });
          couches.addLayer(c);
        });
        legende.innerHTML = presents.map(function (m) { return '<span><i style="background:' + MILIEUX[m].c + '"></i>' + echap(MILIEUX[m].nom) + "</span>"; }).join("");
      };
      dessinerCarte(visibles());
    });
  };

  function milieuxNature() {
    return {
      campagne: { nom: T("Campagne & haies", "Maezioù ha kleuzioù"), c: "#c9a93f" },
      foret: { nom: T("Forêt & landes", "Koad ha lanneier"), c: "#3f7d4e" },
      etangs: { nom: T("Étangs & ruisseaux", "Stankoù ha gwazhioù"), c: "#2fa3b5" },
      lac: { nom: T("Lac de Guerlédan", "Lenn Gwerledan"), c: "#2b62a0" },
      bourg: { nom: T("Bourg & jardins", "Bourk ha liorzhoù"), c: "#d0702b" }
    };
  }

  /* Prépare une grande carte Leaflet commune aux onglets de la page Nature */
  function carteNature(el, zone, pret) {
    chargerLeaflet().then(function () {
      var L = window.L, couches = L.layerGroup();
      var carte = L.map(zone, { scrollWheelZoom: false, zoomControl: true, minZoom: 12 }).setView([48.178, -3.13], 12); /* la carte géologique n'existe pas à plus petite échelle */
      el._carte = carte;
      carte.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(carte);
      couches.addTo(carte);
      function cadrer() { carte.invalidateSize(false); if (zone.clientHeight > 50) carte.fitBounds([[48.143, -3.2], [48.214, -3.06]], { animate: false }); }
      if ("IntersectionObserver" in window) {
        var vue = false;
        new IntersectionObserver(function (ent) { if (ent[0].isIntersecting && !vue) { vue = true; setTimeout(cadrer, 120); } }, { threshold: 0.1 }).observe(zone);
      }
      if ("ResizeObserver" in window) {
        var att;
        new ResizeObserver(function () { clearTimeout(att); att = setTimeout(function () { carte.invalidateSize(false); }, 150); }).observe(zone);
      }
      pret(L, carte, couches);
      cadrer();
    }).catch(function () { zone.innerHTML = '<p class="petit" style="padding:20px">' + T("La carte n'a pas pu se charger (connexion internet ?).", "") + "</p>"; });
  }

  /* Onglet Minéraux : catégories, carte, puis fiches à détails dépliables */
  RENDUS.mineraux = function (el) {
    var CAT = S.categoriesMineraux || {}, liste = S.mineraux || [], GI = S.gisements || [];
    var COUL = { Fe: "#a8432b", Zr: "#6a55b5", Pb: "#55616b", Feld: "#c9a93f", And: "#2f8f83" };
    var SUB = { Fe: T("Fer", "Houarn"), Zr: T("Zirconium (zircon)", "Zirkoniom"), Pb: T("Plomb", "Plom"), Feld: T("Feldspath", "Feldspat"), And: T("Andalousite", "Andaluzit") };
    var COULC = { roches: "#b58a4a", mineraux: "#6a55b5", mines: "#a8432b" };
    function tr(o) { return LANGUE === "en" ? o.en : o.fr; }
    var caches = {};
    if (el._carte) { el._carte.remove(); el._carte = null; }
    el.innerHTML = '<div class="carte-lieux__filtres cn__filtres" role="group" aria-label="' + T("Afficher ou cacher", "Diskouez pe kuzhat") + '">' +
      Object.keys(CAT).map(function (c) { return '<button type="button" data-cat="' + c + '" aria-pressed="true" style="--c:' + COULC[c] + '"><span class="pastille"></span>' + echap(T(CAT[c].fr, CAT[c].br)) + " <small>" + liste.filter(function (m) { return m.cat === c; }).length + "</small></button>"; }).join("") + "</div>" +
      '<div class="carte-lieux__carte cn__carte"></div><div class="cn__legende"></div>' +
      '<p class="petit cn__note">' + T("Les couleurs de fond sont celles de la carte géologique : chacune correspond à une roche. Les points viennent de l'inventaire du BRGM : ce sont souvent de simples indices, sans rien à voir sur place. Ne prélevez rien, respectez les terrains privés et n'entrez jamais dans une ancienne galerie.", "") +
      ' <a href="https://infoterre.brgm.fr/" target="_blank" rel="noopener">' + T("Légende des couleurs sur InfoTerre", "") + "</a></p>" +
      '<div class="cata__grille"></div><p class="petit">' + T("Source : notice de la carte géologique Pontivy n° 313 (BRGM). Les photos sont des illustrations, pas des échantillons trouvés sur la commune.", "") + "</p>";
    var grille = $(".cata__grille", el), legende = $(".cn__legende", el), dessinerCarte = function () {};
    function fiche(m, i) {
      return '<article class="espece revele" style="--delai:' + Math.min(i, 8) * 0.04 + 's"><div class="espece__photo"><img src="' + m.photo[0] + '" alt="' + echap(tr(m.nom)) + '" loading="lazy">' +
        '<a class="credit" href="' + m.photo[3] + '" target="_blank" rel="noopener">' + echap(m.photo[1]) + " · " + echap(m.photo[2]) + "</a>" +
        (m.star ? '<div class="espece__badges"><span class="badge badge--protege">' + T("Spécialité locale", "Arbennikaat lec'hel") + "</span></div>" : "") + "</div>" +
        '<div class="espece__corps"><span class="etiquette">' + echap(T(CAT[m.cat].fr, CAT[m.cat].br)) + "</span><h3>" + echap(tr(m.nom)) + '</h3><p class="espece__noms"><i>' + echap(m.tech) + "</i></p><p>" + echap(tr(m.resume)) + "</p>" +
        m.details.map(function (d) { return '<details class="plus"><summary>' + echap(tr(d.t)) + "</summary><p>" + echap(tr(d.x)) + "</p></details>"; }).join("") + "</div></article>";
    }
    function afficher() {
      grille.innerHTML = liste.filter(function (m) { return !caches[m.cat]; }).map(fiche).join("");
      observer();
      dessinerCarte();
    }
    $$(".cn__filtres button", el).forEach(function (b) {
      b.addEventListener("click", function () { var c = b.dataset.cat; caches[c] = !caches[c]; b.setAttribute("aria-pressed", !caches[c]); afficher(); });
    });
    afficher();
    carteNature(el, $(".cn__carte", el), function (L, carte, couches) {
      var geologie = L.tileLayer.wms("https://geoservices.brgm.fr/geologie", { layers: "SCAN_H_GEOL50", format: "image/png", transparent: true, opacity: 0.7, attribution: '<a href="https://infoterre.brgm.fr/">BRGM</a>' });
      dessinerCarte = function () {
        couches.clearLayers(); carte.closePopup();
        if (caches.roches) carte.removeLayer(geologie); else geologie.addTo(carte);
        var vus = [];
        GI.forEach(function (g) {
          if (caches[g.cat]) return;
          if (vus.indexOf(g.substance) < 0) vus.push(g.substance);
          var m = L.circleMarker([g.lat, g.lng], { radius: 9, color: "#fff", weight: 2, fillColor: COUL[g.substance], fillOpacity: 0.95 });
          m.bindPopup('<div class="bulle"><span class="bulle__cat" style="color:' + COUL[g.substance] + '">' + echap(SUB[g.substance]) + "</span><strong>" + echap(g.nom) + "</strong><p>" + echap(T(g.info)) + "</p></div>", { maxWidth: 260 });
          couches.addLayer(m);
        });
        legende.innerHTML = vus.map(function (s) { return '<span><i style="background:' + COUL[s] + '"></i>' + echap(SUB[s]) + "</span>"; }).join("");
      };
      dessinerCarte();
    });
  };

  /* Mode enfant de la page Nature (textes et dessins : contenu/enfants.js) */
  RENDUS.enfants = function (el) {
    var E = S.enfants, D = S.dessinsEnfants; if (!E) return;
    function tr(o) { return LANGUE === "en" ? o.en : o.fr; }
    function dessin(k) { return '<svg viewBox="0 0 120 120" aria-hidden="true">' + D[k] + "</svg>"; }
    el.innerHTML = '<div class="enf__intro"><div class="enf__heros">' + dessin(E.intro.qui) + '</div><div class="enf__bulle"><h2>' + echap(tr(E.intro.titre)) + "</h2><p>" + echap(tr(E.intro.texte)) + "</p></div></div>" +
      E.groupes.map(function (g) {
        return '<h3 class="enf__titre">' + echap(tr(g.titre)) + '</h3><div class="enf__grille">' + g.cartes.map(function (c, i) {
          return '<article class="enf__carte revele" style="--fond:' + g.couleur + ";--delai:" + Math.min(i, 5) * 0.06 + 's"><div class="enf__animal">' + dessin(c.qui) + "</div>" +
            '<span class="enf__nom">' + echap(c.nom) + "</span><h4>" + echap(tr(c.q)) + "</h4><p>" + echap(tr(c.r)) + "</p>" +
            '<details class="enf__plus' + (c.alerte ? " enf__plus--alerte" : "") + '"><summary>' + T("Encore !", "C'hoazh !") + "</summary><p>" + echap(tr(c.plus)) + "</p></details></article>";
        }).join("") + "</div>";
      }).join("") +
      '<div class="enf__code revele"><h3>' + echap(tr(E.code.titre)) + "</h3><ol>" + E.code.regles.map(function (x) { return "<li>" + echap(tr(x)) + "</li>"; }).join("") + "</ol></div>";
    observer();
  };

  /* Les deux grands onglets de la page Nature */
  RENDUS["onglets-nature"] = function (el) {
    function ouvrir(p) {
      $$("button", el).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.panneau === p); });
      $$("[data-panneau-nature]").forEach(function (x) { x.hidden = x.dataset.panneauNature !== p; });
      try { sessionStorage.setItem("sb-nature", p); } catch (e) {}
      observer();
    }
    var dep = "vivant"; try { dep = sessionStorage.getItem("sb-nature") || "vivant"; } catch (e) {}
    ouvrir(dep);
    if (el._pret) return;
    el._pret = true;
    el.addEventListener("click", function (ev) { var b = ev.target.closest("button"); if (b) ouvrir(b.dataset.panneau); });
  };


/* Covoiturage : carte et liste des trajets (contenu/covoiturage.js) */
  RENDUS.covoiturage = function (el) {
    var CV = S.covoiturage || {}, trajets = CV.trajets || [], tel = (M.telephone || "");
    var TYPES = {
      propose: { nom: T("Propose des places", "Lec'hioù da ginnig"), court: T("Je propose", "Kinnig a ran"), c: "#2f7d4e" },
      cherche: { nom: T("Cherche une voiture", "Klask ur c'harr"), court: T("Je cherche", "Klask a ran"), c: "#d0702b" }
    };
    var caches = {};
    function quand(t) {
      if (t.date) return T("Le ", "D'an ") + dateLongue(t.date);
      if (t.jours.length === 5 && t.jours.join() === "1,2,3,4,5") return T("Du lundi au vendredi", "Eus al Lun d'ar Gwener");
      return t.jours.map(function (j) { return jour(j); }).join(", ");
    }
    function fiche(t, i) {
      var y = TYPES[t.type];
      return '<article class="covoit revele" data-i="' + i + '" style="--c:' + y.c + ";--delai:" + Math.min(i, 6) * 0.05 + 's" tabindex="0">' +
        '<div class="covoit__haut"><span class="covoit__type">' + echap(y.nom) + "</span>" + (t.exemple ? '<span class="covoit__exemple">' + T("Exemple", "Skouer") + "</span>" : "") + '<b class="covoit__ref">' + echap(t.ref) + "</b></div>" +
        '<p class="covoit__trajet"><span>' + echap(T(t.de.nom)) + '</span><i aria-hidden="true">→</i><span>' + echap(T(t.a.nom)) + "</span></p>" +
        '<p class="covoit__quand">' + icone("horloge") + echap(quand(t)) + " · " + heureFr(t.depart) + " → " + heureFr(t.arrivee) +
        (t.retour ? " · " + T("retour ", "distro ") + heureFr(t.retour) : "") + "</p>" +
        (t.places ? '<p class="covoit__places">' + t.places + " " + T(t.places > 1 ? "places libres" : "place libre", "lec'h vak") + "</p>" : "") +
        (t.note ? '<p class="covoit__note">« ' + echap(T(t.note)) + " »</p>" : "") +
        '<a class="bouton bouton--vert covoit__appel" href="tel:' + tel.replace(/\s/g, "") + '">' + icone("tel") + " " + T("Je suis intéressé(e)", "Dedennet on") + "</a>" +
        '<p class="petit covoit__aide">' + T("Appelez la mairie et donnez la référence ", "Galvit an ti-kêr ha roit an dave ") + "<b>" + echap(t.ref) + "</b>.</p></article>";
    }
    if (el._carte) { el._carte.remove(); el._carte = null; }
    el.innerHTML = '<div class="carte-lieux__filtres" role="group" aria-label="' + T("Afficher ou cacher", "Diskouez pe kuzhat") + '">' +
      Object.keys(TYPES).map(function (k) { return '<button type="button" data-type="' + k + '" aria-pressed="true" style="--c:' + TYPES[k].c + '"><span class="pastille"></span>' + echap(TYPES[k].nom) + " <small>" + trajets.filter(function (t) { return t.type === k; }).length + "</small></button>"; }).join("") + "</div>" +
      (trajets.some(function (t) { return t.exemple; }) && S.modeRelecture ? '<p class="petit a-confirmer" data-note="À supprimer avant la mise en ligne">' + T("Les trajets marqués « Exemple » sont fictifs : ils montrent à quoi ressemblera la page.", "") + "</p>" : "") +
      '<div class="carte-lieux__carte covoit__carte"></div><div class="covoit__liste"></div>';
    var liste = $(".covoit__liste", el), zone = $(".covoit__carte", el), lignes = [], carte = null, L = null;
    function visibles() { return trajets.map(function (t, i) { return { t: t, i: i }; }).filter(function (x) { return !caches[x.t.type]; }); }
    function arc(a, b) {
      var pts = [], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[1] - a[1], dy = b[0] - a[0], k = 0.18;
      var cx = mx - dx * k * 0.66, cy = my + dy * k * 1.5;
      for (var s = 0; s <= 24; s++) { var u = s / 24; pts.push([(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * cx + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * cy + u * u * b[1]]); }
      return pts;
    }
    function bulle(t) {
      var y = TYPES[t.type];
      return '<div class="bulle"><span class="bulle__cat" style="color:' + y.c + '">' + echap(y.court) + " · " + echap(t.ref) + "</span><strong>" + echap(T(t.de.nom)) + " → " + echap(T(t.a.nom)) + "</strong>" +
        '<p class="bulle__petit">' + icone("horloge") + echap(quand(t)) + ", " + heureFr(t.depart) + " → " + heureFr(t.arrivee) + "</p>" +
        '<div class="bulle__boutons"><a class="bouton bouton--vert" href="tel:' + tel.replace(/\s/g, "") + '">' + T("Appeler la mairie", "Galv an ti-kêr") + "</a></div></div>";
    }
    function dessiner() {
      var vis = visibles();
      liste.innerHTML = vis.map(function (x) { return fiche(x.t, x.i); }).join("") || '<p class="petit">' + T("Aucun trajet pour le moment.", "Hentad ebet evit c'hoazh.") + "</p>";
      observer();
      if (!carte) return;
      lignes.forEach(function (g) { carte.removeLayer(g); }); lignes = [];
      vis.forEach(function (x) {
        var t = x.t, c = TYPES[t.type].c, A = [t.de.lat, t.de.lng], B = [t.a.lat, t.a.lng];
        var g = L.featureGroup([
          L.polyline(arc(A, B), { color: c, weight: 4, opacity: .85, dashArray: t.type === "cherche" ? "8 8" : null }),
          L.circleMarker(A, { radius: 7, color: "#fff", weight: 2, fillColor: c, fillOpacity: 1 }),
          L.circleMarker(B, { radius: 9, color: c, weight: 3, fillColor: "#fff", fillOpacity: 1 })
        ]).bindPopup(bulle(t), { maxWidth: 270 });
        g._i = x.i; g.addTo(carte); lignes.push(g);
      });
      cadrer();
    }
    function cadrer(g) {
      if (!carte) return;
      carte.invalidateSize(false);
      var proches = lignes.filter(function (x) { var t = trajets[x._i]; return Math.abs(t.a.lat - 48.164) + Math.abs(t.a.lng + 3.129) < 0.6; }); /* les trajets lointains (Rennes...) restent visibles en dézoomant */
      var cible = g || (proches.length ? L.featureGroup(proches) : lignes.length ? L.featureGroup(lignes) : null);
      if (cible && zone.clientHeight > 50) carte.fitBounds(cible.getBounds().pad(0.12), { animate: !!g, maxZoom: 12 });
    }
    $$(".carte-lieux__filtres button", el).forEach(function (b) {
      b.addEventListener("click", function () { var k = b.dataset.type; caches[k] = !caches[k]; b.setAttribute("aria-pressed", !caches[k]); dessiner(); });
    });
    liste.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) return;
      var f = ev.target.closest(".covoit"); if (!f || !carte) return;
      var g = lignes.filter(function (x) { return x._i === +f.dataset.i; })[0]; if (!g) return;
      zone.scrollIntoView({ behavior: "smooth", block: "center" });
      cadrer(g); var tr = trajets[+f.dataset.i]; g.openPopup([tr.a.lat, tr.a.lng]);
    });
    dessiner();
    chargerLeaflet().then(function () {
      L = window.L;
      carte = L.map(zone, { scrollWheelZoom: false }).setView([48.16, -3.0], 9);
      el._carte = carte;
      carte.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(carte);
      L.marker([48.1643, -3.1291], { title: "Sainte-Brigitte", icon: L.divIcon({ className: "repere", html: '<span style="--c:#1f3a2e">' + icone("maison") + "</span>", iconSize: [34, 34], iconAnchor: [17, 34] }) }).addTo(carte);
      dessiner();
      if ("IntersectionObserver" in window) {
        var vue = false;
        new IntersectionObserver(function (e) { if (e[0].isIntersecting && !vue) { vue = true; setTimeout(function () { cadrer(); }, 120); } }, { threshold: 0.1 }).observe(zone);
      }
      if ("ResizeObserver" in window) {
        var att;
        new ResizeObserver(function () { clearTimeout(att); att = setTimeout(function () { carte.invalidateSize(false); }, 150); }).observe(zone);
      }
    }).catch(function () { zone.innerHTML = '<p class="petit" style="padding:20px">' + T("La carte n'a pas pu se charger (connexion internet ?).", "") + "</p>"; });
    if (!document.body._covoitAjout) {
      document.body._covoitAjout = true;
      document.addEventListener("click", function (ev) {
        if (!ev.target.closest("[data-covoit-ajout]") || !window.SB.ouvrirTicket) return;
        window.SB.ouvrirTicket({ type: "Autre", page: T("Covoiturage", "Kenweturiñ"),
          message: T("Je propose / je cherche (rayer la mention inutile) : ", "") + "\n" + T("Départ (lieu public) : ", "") + "\n" + T("Destination : ", "") + "\n" + T("Jours : ", "") + "\n" + T("Heure de départ et d'arrivée : ", "") + "\n" + T("Retour : ", "") + "\n" + T("Places libres : ", "") + "\n" + T("Mon téléphone (gardé par la mairie, jamais publié) : ", "") });
      });
    }
  };

  /* Teaser Discord : <div data-rendu="discord"></div> */
  RENDUS.discord = function (el) {
    var d = S.discord || {};
    el.innerHTML = '<div class="discord revele">' +
      '<div class="discord__icone">' + icone("groupe") + "</div>" +
      '<div><span class="discord__badge">' + (d.actif ? T("Nouveau", "Nevez") : T("Bientôt", "A-benn nebeut")) + "</span>" +
      "<h3>" + T("Le Discord des Brigittois", "Discord Berc'hediz") + "</h3>" +
      "<p>" + T("Un salon en ligne pour s'entraider, partager les bons plans, organiser un covoiturage, retrouver un objet perdu ou papoter en breton. Ouverture prochainement !", "Ur sal enlinenn evit en em skoazellañ, rannañ titouroù, kenwerzhañ ur c'harr, kavout un dra kollet pe flapañ e brezhoneg. Digoret e vo a-benn nebeut !") + "</p></div>" +
      (d.actif && d.lien ? '<a class="bouton bouton--clair" href="' + echap(d.lien) + '" target="_blank" rel="noopener">' + T("Rejoindre", "Mont e-barzh") + "</a>"
        : '<button class="bouton bouton--verre" type="button" disabled>' + T("Ouverture prochaine", "Digoret a-benn nebeut") + "</button>") +
      "</div>";
  };

  function relecture() {
    $$(".bandeau-relecture").forEach(function (e) { e.remove(); });
    if (!S.modeRelecture) return;
    corps.classList.add("relecture");
    corps.insertAdjacentHTML("beforeend", '<div class="bandeau-relecture" role="note"><i></i>' +
      T("Version de travail : les zones pointillées sont à confirmer avec la mairie.", "Stumm labour : an titouroù pikoù a vo da wiriañ gant an ti-kêr. Troidigezh da adlenn gant Ofis publik ar brezhoneg.") +
      '<button type="button" aria-label="Masquer">×</button></div>');
    $(".bandeau-relecture button").addEventListener("click", function () { this.parentNode.remove(); });
  }

  /* ------------------------------------------------------------------
     Changement de langue (sans recharger la page)
     ------------------------------------------------------------------ */
  function changerLangue(l) {
    if (l === LANGUE) return;
    LANGUE = l;
    try { localStorage.setItem("sb-langue", l); } catch (e) {}
    textesFixes();
    rendreContenus();
    pageArticle();
    installerCadre();
    installerTicket();
    relecture();
    surDefilement();
    observer();
    $$("main, .entete, .pied").forEach(function (e) { e.classList.remove("fondu-langue"); void e.offsetWidth; e.classList.add("fondu-langue"); });
    if (window.surChangementLangue) window.surChangementLangue();
  }

  /* ------------------------------------------------------------------
     Démarrage
     ------------------------------------------------------------------ */
  window.SB = { T: T, icone: icone, langue: function () { return LANGUE; } };
  textesFixes();
  rendreContenus();
  pageArticle();
  installerCadre();
  installerTicket();
  relecture();
  observer();
  compteurs();
  sommaire();
  window.addEventListener("scroll", surDefilement, { passive: true });
  surDefilement();
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && document.documentElement.classList.contains("menu-ouvert")) $(".burger").click(); });
})();
