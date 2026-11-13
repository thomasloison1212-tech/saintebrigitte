/* =====================================================================
   DÉMARRAGE DU SITE
   Charge les contenus modifiables depuis l'espace gestionnaire
   (dossier contenu/json/), les remet dans le format attendu, puis lance
   assets/js/site.js.
   ===================================================================== */
(function () {
  var FICHIERS = ["reglages", "mairie", "vie-locale", "tarifs", "actualites", "lieux", "covoiturage"];
  var S = window.SITE = window.SITE || {};

  function charger(nom) {
    return fetch("contenu/json/" + nom + ".json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; });
  }

  /* Les formulaires de l'espace gestionnaire stockent des objets lisibles ;
     le site, lui, attend parfois des tableaux. */
  function horaires(liste) {
    return (liste || []).map(function (j) {
      return { jour: +j.jour, plages: (j.plages || []).map(function (p) { return Array.isArray(p) ? p : [p.debut, p.fin]; }) };
    });
  }
  function markdown(t) {
    if (!t || /<[a-z][\s\S]*>/i.test(t)) return t || "";
    function ligne(x) {
      return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|[\w\-./#?=&]+)\)/g, '<a href="$2">$1</a>');
    }
    return t.split(/\n\s*\n/).map(function (bloc) {
      var l = bloc.split("\n");
      if (l.every(function (x) { return /^\s*[-*] /.test(x); })) return "<ul>" + l.map(function (x) { return "<li>" + ligne(x.replace(/^\s*[-*] /, "")) + "</li>"; }).join("") + "</ul>";
      if (/^#{2,3} /.test(bloc)) return "<h3>" + ligne(bloc.replace(/^#+ /, "")) + "</h3>";
      return "<p>" + l.map(ligne).join("<br>") + "</p>";
    }).join("");
  }
  function normaliser() {
    if (S.mairie) {
      S.mairie.horaires = horaires(S.mairie.horaires);
      S.mairie.fermetures = (S.mairie.fermetures || []).map(function (d) { return d && d.date ? d.date : d; }).filter(Boolean);
    }
    if (S.bibliotheque) S.bibliotheque.horaires = horaires(S.bibliotheque.horaires);
    if (S.tarifs) {
      S.tarifs.salle = (S.tarifs.salle || []).map(function (l) { return Array.isArray(l) ? l : [l.objet, l.locaux, l.exterieurs]; });
      S.tarifs.services = (S.tarifs.services || []).map(function (l) { return Array.isArray(l) ? l : [l.service, l.tarif]; });
    }
    (S.actualites || []).forEach(function (a) { a.texte = markdown(a.texte); if (a.texte_br) a.texte_br = markdown(a.texte_br); });
    (S.actualites || []).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    ((S.covoiturage || {}).trajets || []).forEach(function (t) {
      if (t.jours) t.jours = t.jours.map(Number).sort();
      ["de", "a"].forEach(function (k) { if (t[k]) { t[k].lat = +t[k].lat; t[k].lng = +t[k].lng; } });
    });
    (S.lieux || []).forEach(function (l) { if (l.lat !== undefined && l.lat !== "" && l.lat !== null) { l.lat = +l.lat; l.lng = +l.lng; } else { delete l.lat; delete l.lng; } });
    (S.terrains && S.terrains.lots || []).forEach(function (l) { l.numero = +l.numero; l.surface = +l.surface; });
  }

  Promise.all(FICHIERS.map(charger)).then(function (contenus) {
    contenus.forEach(function (o) { Object.keys(o).forEach(function (k) { S[k] = o[k]; }); });
    normaliser();
    /* Hors du domaine officiel et du PC, on affiche clairement qu'il s'agit d'une démonstration */
    var h = location.hostname;
    if (!/^(www\.)?saintebrigitte\.bzh$|^localhost$|^127\.|^192\.168\.|^10\.|^100\./.test(h)) {
      var d = document.createElement("div");
      d.className = "bandeau-demo";
      d.textContent = "Version de démonstration — ce n'est pas le site officiel de la mairie de Sainte-Brigitte.";
      document.body.insertBefore(d, document.body.firstChild);
      document.documentElement.classList.add("demo");
    }
    var s = document.createElement("script");
    s.src = "assets/js/site.js";
    document.body.appendChild(s);
  });
})();
