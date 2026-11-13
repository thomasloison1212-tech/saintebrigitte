/* =====================================================================
   ANNUAIRE ET CARTE — commerces, hébergements, artisans, lieux à voir
   Sources : fiches « Acteurs économiques de Sainte-Brigitte » de l'ancien
   site communal, OpenStreetMap, et géolocalisation par la Base Adresse
   Nationale (api-adresse.data.gouv.fr), novembre 2026.

   Champs :
     nom, cat (voir ci-dessous), adresse, lat, lng  (sans lat/lng : liste seule)
     desc, tel, site, horaires, ville (si hors commune)
   Catégories : voir | manger | dormir | produits | habitat | services
   ===================================================================== */
window.SITE.categoriesLieux = {
  voir:     { fr: "À voir & services publics", br: "Da welet ha servijoù publik", couleur: "#1f3a2e", icone: "epingle" },
  manger:   { fr: "Manger & boire",            br: "Debriñ hag evañ",             couleur: "#c8642d", icone: "salle" },
  dormir:   { fr: "Dormir",                    br: "Kousket",                     couleur: "#2b5f6a", icone: "maison" },
  produits: { fr: "Artisans & producteurs",    br: "Artizaned ha produerien",     couleur: "#6f8f5f", icone: "feuille" },
  habitat:  { fr: "Habitat & travaux",         br: "Ti ha labourioù",             couleur: "#8a6b3c", icone: "maison" },
  services: { fr: "Services & création",       br: "Servijoù ha krouiñ",          couleur: "#6b5b95", icone: "clic" }
};

/* La liste des lieux est dans contenu/json/lieux.json (espace gestionnaire). */
