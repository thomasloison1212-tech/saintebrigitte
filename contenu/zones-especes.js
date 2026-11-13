/* =====================================================================
   OÙ CHERCHER CHAQUE ESPÈCE (grandes cartes de la page Nature)
   Zones favorables selon l'habitat de l'espèce, volontairement larges :
   on n'indique jamais un nid, un terrier ou un point d'observation.

   Codes : bourg = bourg et jardins, campagne = champs et haies,
           foret = forêt et landes, lac = lac de Guerlédan,
           etangs = étangs et ruisseaux
   Pour modifier : changer la liste en face du nom latin de l'espèce.
   ===================================================================== */
window.SITE.zonesEspeces = {
  /* Oiseaux */
  "Erithacus rubecula": ["bourg", "campagne", "foret"],
  "Cyanistes caeruleus": ["bourg", "foret"],
  "Parus major": ["bourg", "foret"],
  "Fringilla coelebs": ["bourg", "campagne", "foret"],
  "Turdus merula": ["bourg", "campagne", "foret"],
  "Sitta europaea": ["foret"],
  "Troglodytes troglodytes": ["bourg", "foret"],
  "Garrulus glandarius": ["foret"],
  "Prunella modularis": ["bourg", "campagne"],
  "Hirundo rustica": ["bourg", "campagne"],
  "Delichon urbicum": ["bourg"],
  "Streptopelia turtur": ["campagne"],
  "Pyrrhula pyrrhula": ["foret", "bourg"],
  "Corvus corax": ["foret", "campagne"],
  "Caprimulgus europaeus": ["foret"],
  "Alcedo atthis": ["lac", "etangs"],
  "Dryocopus martius": ["foret"],
  "Ardea cinerea": ["lac", "etangs"],
  "Buteo buteo": ["campagne", "foret"],
  /* Papillons et libellules */
  "Gonepteryx rhamni": ["foret", "campagne"],
  "Aglais urticae": ["bourg", "campagne"],
  "Aglais io": ["bourg", "campagne"],
  "Vanessa atalanta": ["bourg", "campagne"],
  "Argynnis paphia": ["foret"],
  "Euplagia quadripunctaria": ["foret", "bourg"],
  "Anax imperator": ["etangs", "lac"],
  "Calopteryx virgo": ["etangs"],
  /* Mammifères */
  "Capreolus capreolus": ["foret", "campagne"],
  "Sus scrofa": ["foret"],
  "Cervus elaphus": ["foret"],
  "Lutra lutra": ["lac", "etangs"],
  "Martes martes": ["foret"],
  "Sciurus vulgaris": ["foret", "bourg"],
  "Erinaceus europaeus": ["bourg", "campagne"],
  "Vulpes vulpes": ["foret", "campagne"],
  "Meles meles": ["foret", "campagne"],
  "Lepus europaeus": ["campagne"],
  /* Ferme, chiens et chats */
  "Bos taurus": ["campagne"],
  "Sus scrofa domesticus": ["campagne"],
  "Anas platyrhynchos domesticus": ["campagne"],
  "Gallus gallus domesticus": ["campagne", "bourg"],
  "Capra hircus": ["campagne"],
  "Ovis aries": ["campagne"],
  "Equus caballus": ["campagne"],
  "Canis lupus familiaris": ["bourg", "campagne"],
  "Felis catus": ["bourg", "campagne"],
  /* Reptiles, poissons, escargots */
  "Elona quimperiana": ["foret"],
  "Anguis fragilis": ["bourg", "campagne", "foret"],
  "Zootoca vivipara": ["foret"],
  "Vipera berus": ["foret"],
  "Salmo trutta": ["etangs"],
  /* Arbres et plantes */
  "Fagus sylvatica": ["foret"],
  "Quercus robur": ["foret", "campagne"],
  "Castanea sativa": ["foret"],
  "Ilex aquifolium": ["foret"],
  "Betula pendula": ["foret"],
  "Sorbus aucuparia": ["foret"],
  "Ulex europaeus": ["foret", "campagne"],
  "Erica cinerea": ["foret"],
  "Pteridium aquilinum": ["foret"],
  "Osmunda regalis": ["etangs", "foret"],
  "Digitalis purpurea": ["foret"],
  "Hyacinthoides non-scripta": ["foret"],
  "Vaccinium myrtillus": ["foret"],
  "Lonicera periclymenum": ["foret", "campagne"],
  /* Champignons */
  "Amanita muscaria": ["foret"],
  "Amanita virosa": ["foret"],
  "Amanita citrina": ["foret"],
  "Clathrus archeri": ["foret"],
  "Fomitopsis betulina": ["foret"],
  "Trametes versicolor": ["foret"],
  "Boletus reticulatus": ["foret"],
  "Imleria badia": ["foret"],
  "Macrolepiota procera": ["foret", "campagne"],
  "Fistulina hepatica": ["foret"],
  "Aleuria aurantia": ["foret"],
  "Phallus impudicus": ["foret"]
};

/* Centres du bourg et des hameaux, pour la zone « Bourg & jardins » */
window.SITE.reperesCarte = [
  { nom: "Bourg", lat: 48.16427, lng: -3.12911 },
  { nom: "Forges", lat: 48.19954, lng: -3.1266 },
  { nom: "Gouvello", lat: 48.16996, lng: -3.09786 }
];

/* Pour séparer « Arbres » et « Fleurs & plantes » sur la carte */
window.SITE.arbres = ["Fagus sylvatica", "Quercus robur", "Castanea sativa", "Ilex aquifolium", "Betula pendula", "Sorbus aucuparia"];

/* Carte des minéraux. Source : BRGM, inventaire « Gisements, gîtes, indices »
   (Forges des Salles : patrimoine, ajouté à la main). */
window.SITE.gisements = [
  { nom: "Sainte-Brigitte", cat: "mines", substance: "Fe", lat: 48.162293, lng: -3.128731, info: "Indice de fer recensé par le BRGM." },
  { nom: "Les Forges des Salles", cat: "mines", substance: "Fe", lat: 48.19954, lng: -3.1266, info: "Ancien village sidérurgique : un minerai de fer local assez pauvre, environ 30 % de fer, y était transformé." },
  { nom: "Étang des Salles et Sainte-Brigitte", cat: "mineraux", substance: "And", lat: 48.1825, lng: -3.1245, info: "Grands cristaux d'andalousite dans les schistes, selon la notice géologique Pontivy." },
  { nom: "Saint-Gelven", cat: "mines", substance: "Fe", lat: 48.225894, lng: -3.081621, info: "Indice de fer recensé par le BRGM." },
  { nom: "Gouarec, Rosquelfen", cat: "mines", substance: "Fe", lat: 48.222497, lng: -3.170333, info: "Indice de fer recensé par le BRGM." },
  { nom: "Château des Salles", cat: "mineraux", substance: "Zr", lat: 48.180595, lng: -3.122631, info: "Indice de zirconium recensé par le BRGM." },
  { nom: "Guénault", cat: "mineraux", substance: "Zr", lat: 48.203199, lng: -3.141231, info: "Indice de zirconium recensé par le BRGM." },
  { nom: "Le Fouillé", cat: "mineraux", substance: "Zr", lat: 48.144799, lng: -3.13623, info: "Indice de zirconium recensé par le BRGM." },
  { nom: "Keriven", cat: "mineraux", substance: "Zr", lat: 48.208398, lng: -3.070321, info: "Indice de zirconium recensé par le BRGM." },
  { nom: "Plélauff", cat: "mines", substance: "Pb", lat: 48.214497, lng: -3.203196, info: "Ancienne exploitation de plomb recensée par le BRGM, environ 3 000 tonnes produites." },
  { nom: "Bulaouen", cat: "mines", substance: "Pb", lat: 48.153798, lng: -3.191133, info: "Indice de plomb recensé par le BRGM." },
  { nom: "An Nivit", cat: "mineraux", substance: "Feld", lat: 48.181499, lng: -3.215738, info: "Indice de feldspath recensé par le BRGM." }
];
