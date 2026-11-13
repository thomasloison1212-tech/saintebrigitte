# Site de Sainte-Brigitte — mode d'emploi

## Voir le site
- **Le plus simple :** double-cliquer sur `index.html`. Tout s'affiche, sauf la météo et la carte, qui ont besoin d'internet.
- **Comme en ligne :** clic droit sur `outils/serveur.ps1` > « Exécuter avec PowerShell », puis ouvrir http://localhost:8080.

## Où se trouvent les informations
| À modifier | Fichier |
|---|---|
| Horaires, téléphone, e-mail, maire | `contenu/donnees.js` → `mairie` |
| Actualités | `contenu/actualites.js` |
| Commerces, gîtes, artisans, lieux à voir **et la carte** | `contenu/lieux.js` (avec lat/lng) |
| Agenda, associations, bulletins, conseil, tarifs, terrains | `contenu/donnees.js` |
| Textes des pages (présentation, démarches…) | les fichiers `.html` |
| Couleurs, polices, mise en page | `assets/css/style.css` |
| Menu, pied de page, illustrations, animations | `assets/js/site.js` |

Les PDF (bulletins, comptes rendus) vont dans un dossier `documents/`. Il suffit ensuite d'indiquer leur chemin dans `donnees.js`.
Les vraies photos vont dans `assets/img/`. Pour une actualité, ajouter `image: "assets/img/ma-photo.jpg"`.

## Versions
- **Site principal (v2) :** épuré, photos plein écran, bilingue français / breton.
- **Ancienne version illustrée (v1) :** `essais/v1-illustree/index.html`.
- **Toutes les photos libres trouvées :** `essais/planche-photos.html`.

## Breton
- Le bouton **FR | BR** en haut à droite bascule tout le site (le choix est mémorisé).
- Pour traduire un texte fixe : `data-br="texte en breton"` sur l'élément HTML.
- Dans `donnees.js`, ajouter `titre_br`, `resume_br`, `texte_br`…
- La traduction est un premier jet. **Elle doit être relue par l'Office public de la langue bretonne** (gratuit pour les communes).

## Photos
- Elles proviennent de Wikimedia Commons, sous licence libre. Les auteurs sont cités automatiquement en bas de page.
- La liste se trouve dans `contenu/photos.js`. Dans une page, une photo s'insère avec `data-rendu="photo" data-photo="lac1"`.
- Pour l'instant, elles sont chargées depuis Wikimedia. **Avant la mise en ligne, il faudra les copier dans le site**, et les remplacer peu à peu par des photos de la mairie.

## Catalogue faune & flore (page « Nature »)
- Les fiches se trouvent dans `contenu/especes.js` (51 espèces), avec photo, noms français, breton et latin, mois d'observation et badges « Vu à Sainte-Brigitte » et « Protégée ».
- Sources : les relevés de l'observatoire communal (bilan 2023, comptage des oiseaux de jardin, fiches Citron, Petite tortue et hirondelles) et les données GBIF autour de la commune.
- Un nom breton marqué `brSource: "a-verifier"` est à faire valider par l'Office public de la langue bretonne.
- Le bouton « J'ai vu cette espèce » ouvre un ticket « Observation nature » déjà rempli.

## Tickets (« Signaler / suggérer »)
- Un bouton vert en bas à droite de chaque page (et un lien « Signaler une erreur » dans le pied de page).
- Chaque ticket reçoit une référence, par exemple `SB-261107-4F2A`. Le visiteur la garde ; toi, tu la retrouves dans l'e-mail reçu.
- **À activer :** créer une clé gratuite sur web3forms.com (avec l'adresse qui doit recevoir les tickets), puis la coller dans `donnees.js` → `tickets.cleWeb3Forms`.
- Sans clé, le bouton ouvre la messagerie du visiteur vers `tickets.emailSecours` (ou la mairie).

## Discord
- Le teaser « Bientôt » est sur l'accueil et sur la page Vie locale.
- Le jour J, dans `donnees.js` : `discord.actif: true` et `discord.lien: "https://discord.gg/..."`. Le bouton devient alors « Rejoindre ».

## Mode relecture
Tant que `modeRelecture: true` dans `donnees.js`, les informations à confirmer apparaissent en pointillés dorés, avec une bulle explicative au survol.
Passer la valeur à `false` avant la mise en ligne.

## Animations
- Le paysage d'accueil suit l'heure réelle : aube, jour, soir ou nuit (fenêtres allumées, étoiles, lucioles). Les 4 boutons ronds permettent de changer l'heure.
- Effet de profondeur au défilement et au mouvement de la souris, apparitions en fondu, compteurs, défilé des savoir-faire.
- Les animations se coupent automatiquement si le visiteur a activé « réduire les animations » sur son appareil.

## Domaine retenu : **saintebrigitte.bzh**
Disponible le 7 novembre 2026, mais pas encore acheté. À déposer **au nom de la mairie** chez un registraire (OVH, Gandi…), pour 15 à 30 € par an environ.
Ensuite, faire rediriger sainte-brigitte.bzh et sainte-brigitte.fr (déjà détenus par la commune) vers saintebrigitte.bzh, ou l'inverse.
Les adresses e-mail actuelles (mairie@sainte-brigitte.bzh) peuvent rester telles quelles.

## Noms de domaine (vérifiés le 7 novembre 2026 auprès des registres AFNIC et .bzh)
La commune possède déjà **sainte-brigitte.fr** et **sainte-brigitte.bzh**. Le site officiel doit rester sur l'un des deux, et l'adresse clin d'œil peut simplement rediriger vers lui.

Libres en .fr et en .bzh :
- **santez-berched.bzh** : le nom breton de la commune
- **bonjour-brigitte.fr** : chaleureux et facile à retenir
- **brigittois.bzh** : le site des habitants
- **entre-lac-et-foret.fr** : le slogan
- coucou-brigitte, salut-brigitte, berchediz, vivre-a-sainte-brigitte, quenecan…
- (chez-brigitte.fr est déjà pris ; chez-brigitte.bzh est libre)

## Avant la mise en ligne
1. Confirmer toutes les zones en pointillés avec la mairie.
2. Ajouter de vraies photos : bourg, église, lac, salle des fêtes.
3. Choisir un hébergeur (statique, donc gratuit ou presque) et compléter les mentions légales.
4. Faire un audit d'accessibilité RGAA, qui est obligatoire pour une commune.

## Version anglaise

Toutes les traductions sont dans `contenu/anglais.js` : le texte français exact à gauche, l'anglais à droite. Si une phrase française change ailleurs, il faut la changer aussi dans ce fichier, sinon elle s'affichera en français en mode EN. Le corps des articles d'actualité reste en français (titre et résumé sont traduits).

## Cartes de la page Nature

`contenu/zones-especes.js` indique les milieux de chaque espèce et la liste des points de la carte des minéraux. `contenu/carte-milieux.js` contient les contours OpenStreetMap : il est généré, ne pas le modifier à la main.

Les roches, minéraux et mines de l'onglet Minéraux sont dans `contenu/mineraux.js`, avec leurs textes en français et en anglais.

## Espace gestionnaire (/admin)

Les contenus courants (actualités, horaires, agenda, associations, bulletins, conseil, tarifs, terrains, commerces, covoiturage, réglages) sont dans `contenu/json/` et se modifient depuis `/admin/` (Sveltia CMS, réglages dans `admin/config.yml`).

- **Sur ce PC :** lancer le serveur, ouvrir http://localhost:8080/admin/ dans Chrome ou Edge, cliquer sur « Travailler avec un dépôt local » et choisir le dossier `site-sainte-brigitte`.
- **En ligne :** il faudra un dépôt GitHub au nom de la mairie (à indiquer dans `admin/config.yml`, ligne `repo`) et un hébergeur relié à ce dépôt. Les comptes des gestionnaires sont des comptes GitHub, avec mot de passe et double authentification.
- Les espèces, les minéraux et le mode enfant restent dans les fichiers `.js` de `contenu/`, à modifier à la main pour l'instant.
- `assets/js/demarrage.js` charge les JSON puis lance `assets/js/site.js`.
