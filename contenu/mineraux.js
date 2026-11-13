/* =====================================================================
   ROCHES, MINÉRAUX ET MINES AUTOUR DE SAINTE-BRIGITTE
   Source principale : notice de la carte géologique de la France à
   1/50 000, feuille n° 313 Pontivy (BRGM), et inventaire BRGM des gîtes.
   Les photos sont des illustrations : elles ne montrent pas des
   échantillons trouvés sur la commune.

   cat : roches | mineraux | mines
   Chaque texte existe en français (fr) et en anglais (en).
   ===================================================================== */
(function () {
  var U = "https://upload.wikimedia.org/wikipedia/commons/", T = "https://upload.wikimedia.org/wikipedia/commons/thumb/", P = "https://commons.wikimedia.org/wiki/File:";
  function ph(chemin, fichier, auteur, licence, brut) { return [brut ? U + chemin + "/" + fichier : T + chemin + "/" + fichier + "/960px-" + fichier, auteur, licence, P + fichier]; }

  window.SITE.categoriesMineraux = {
    roches: { fr: "Roches", br: "Reier" },
    mineraux: { fr: "Minéraux", br: "Mein" },
    mines: { fr: "Minerais & mines", br: "Mengleuzioù" }
  };

  window.SITE.mineraux = [
    { cat: "roches", nom: { fr: "Schistes ordoviciens", en: "Ordovician schists" }, tech: "Métapélites : quartz, muscovite, chlorite, chloritoïde",
      resume: { fr: "La roche sombre qui se débite en feuillets, au cœur du « synclinal de Sainte-Brigitte ». Autrefois de la boue au fond de la mer.", en: "The dark rock that splits into sheets, at the heart of the “Sainte-Brigitte syncline”. Once mud on the sea floor." },
      details: [
        { t: { fr: "Comment elle s'est formée", en: "How it formed" }, x: { fr: "De fines boues marines se sont déposées à l'Ordovicien, puis ont été plissées et transformées sous la pression : c'est ce qui crée le débit en feuillets, la « schistosité ».", en: "Fine marine muds settled in the Ordovician, then were folded and transformed under pressure: this creates the sheet-like splitting known as schistosity." } },
        { t: { fr: "Sa composition", en: "What it is made of" }, x: { fr: "De fines paillettes orientées de muscovite, paragonite, chlorite et chloritoïde, avec du quartz. Certains niveaux sont graphiteux, donc plus noirs.", en: "Fine aligned flakes of muscovite, paragonite, chlorite and chloritoid, with quartz. Some layers contain graphite, making them blacker." } },
        { t: { fr: "Fossiles", en: "Fossils" }, x: { fr: "Ces schistes renferment des trilobites, parfois dans le même échantillon que les cristaux d'andalousite.", en: "These schists contain trilobites, sometimes in the same sample as andalusite crystals." } },
        { t: { fr: "Pierre de construction", en: "As a building stone" }, x: { fr: "Sur les crêtes de la vallée du Blavet, de petites carrières ont fourni des ardoises rustiques dites « mordorées », utilisées surtout en dalles de sol.", en: "On the ridges of the Blavet valley, small quarries produced rustic “mordoré” slates, used mainly as floor slabs." } }
      ], photo: ph("6/6f", "Schist_detail.jpg", "Michael C. Rygel", "CC BY-SA 3.0") },
    { cat: "roches", nom: { fr: "Grès armoricain", en: "Armorican sandstone" }, tech: "Arénigien (Ordovicien inférieur)",
      resume: { fr: "Une roche claire et très dure, faite d'anciens sables de plage cimentés. C'est elle qui résiste à l'érosion et dessine les reliefs.", en: "A pale, very hard rock made of cemented ancient beach sand. It resists erosion and shapes the high ground." },
      details: [
        { t: { fr: "Comment elle s'est formée", en: "How it formed" }, x: { fr: "Des sables riches en quartz se sont accumulés sur un rivage à l'Ordovicien inférieur, puis se sont cimentés.", en: "Quartz-rich sands built up on a shoreline in the Early Ordovician, then became cemented." } },
        { t: { fr: "Sa particularité ici", en: "What is special here" }, x: { fr: "Certaines couches sont riches en zircon et en rutile, des minéraux lourds concentrés par les vagues, comme à Le Fouillé.", en: "Some layers are rich in zircon and rutile, heavy minerals concentrated by waves, as at Le Fouillé." } }
      ], photo: ph("2/22", "Quartzite_Solli%C3%A8res.jpg", "Gabriel Haute Maurienne", "CC BY-SA 4.0") },
    { cat: "roches", nom: { fr: "Granite de Rostrenen", en: "Rostrenen granite" }, tech: "Granite porphyroïde à biotite et muscovite",
      resume: { fr: "Le granite breton par excellence, tout proche à l'ouest. Sa chaleur a transformé les schistes voisins, et c'est grâce à lui qu'on trouve ici de beaux cristaux.", en: "Classic Breton granite, just to the west. Its heat transformed the neighbouring schists, which is why fine crystals are found here." },
      details: [
        { t: { fr: "Sa composition", en: "What it is made of" }, x: { fr: "Quartz, feldspaths et micas (biotite noire, muscovite claire). « Porphyroïde » signifie qu'il contient de très grands cristaux de feldspath, visibles à l'œil nu.", en: "Quartz, feldspars and micas (black biotite, pale muscovite). “Porphyritic” means it holds very large feldspar crystals, visible to the naked eye." } },
        { t: { fr: "Le métamorphisme de contact", en: "Contact metamorphism" }, x: { fr: "Le magma brûlant a « cuit » les roches qu'il traversait. Autour du massif, cette auréole a fait naître l'andalousite et le grenat.", en: "The hot magma “baked” the rocks it passed through. Around the massif, this aureole produced andalusite and garnet." } },
        { t: { fr: "Son usage", en: "How it is used" }, x: { fr: "À An Nivit, un granite altéré riche en feldspath forme un amas de 110 hectares, qui a fait l'objet d'essais de valorisation.", en: "At An Nivit, a weathered feldspar-rich granite forms a 110-hectare body, which was tested for commercial use." } }
      ], photo: ph("7/71", "Bianco_Sardo_Granit_mit_polierter_Oberfl%C3%A4che.jpg", "The stone gate", "CC BY-SA 4.0") },
    { cat: "roches", nom: { fr: "Schistes du Briovérien", en: "Brioverian schists" }, tech: "Socle antérieur au Paléozoïque",
      resume: { fr: "Les plus anciennes roches du secteur, sur lesquelles repose tout le reste. Par endroits, elles contiennent des galets : ce sont des conglomérats.", en: "The oldest rocks in the area, on which everything else rests. In places they contain pebbles, forming conglomerates." },
      details: [
        { t: { fr: "Une discordance", en: "An unconformity" }, x: { fr: "À l'ouest, le synclinal de Sainte-Brigitte repose en discordance sur le Briovérien : deux époques très éloignées sont en contact direct.", en: "To the west, the Sainte-Brigitte syncline rests unconformably on the Brioverian: two widely separated periods are in direct contact." } },
        { t: { fr: "Où en voir", en: "Where to find it" }, x: { fr: "Les niveaux à galets se concentrent entre le Blavet et la forêt de Quénécan.", en: "The pebbly layers are concentrated between the Blavet and Quénécan Forest." } }
      ], photo: ph("f/fc", "Phyllite_Cenulation.jpg", "EdwardEMeyer", "CC BY-SA 4.0") },
    { cat: "roches", nom: { fr: "Diabase", en: "Diabase" }, tech: "Dolérite à hornblende, série tholéiitique",
      resume: { fr: "Une roche sombre d'origine volcanique, injectée en couches ou en filons, notamment au nord et à l'est de Perret et près de l'étang des Salles.", en: "A dark rock of volcanic origin, injected as sheets or veins, notably north and east of Perret and near the Étang des Salles." },
      details: [
        { t: { fr: "Sa composition", en: "What it is made of" }, x: { fr: "Des aiguilles de hornblende entremêlées, du quartz, du plagioclase, avec un peu d'épidote, d'ilménite et d'apatite.", en: "Interlocking needles of hornblende, quartz and plagioclase, with some epidote, ilmenite and apatite." } },
        { t: { fr: "Sa forme", en: "Its form" }, x: { fr: "Des « sills » de quelques mètres à quelques dizaines de mètres, et entre Perret et Cléguérec des filons pouvant atteindre une vingtaine de mètres d'épaisseur.", en: "“Sills” from a few metres to several tens of metres thick, and between Perret and Cléguérec veins up to around twenty metres thick." } }
      ], photo: ph("4/49", "Polished_Diabase.jpg", "CrankyScorpion", "CC BY-SA 3.0") },

    { cat: "mineraux", nom: { fr: "Andalousite (chiastolite)", en: "Andalusite (chiastolite)" }, tech: "Al₂SiO₅, nésosilicate", star: true,
      resume: { fr: "La vedette locale ! De grands cristaux en prismes, qui montrent parfois une croix noire en coupe. On les appelle aussi « macles », comme la mâcle du blason de la commune.", en: "The local star! Large prismatic crystals that sometimes show a black cross in section. They are also called “macles”, like the mascle on the village coat of arms." },
      details: [
        { t: { fr: "Où, ici", en: "Where, here" }, x: { fr: "Dans les schistes du secteur de l'étang des Salles et de Sainte-Brigitte. Les prismes atteignent 15 cm de long, et jusqu'à 20 cm selon l'inventaire des gîtes.", en: "In the schists around the Étang des Salles and Sainte-Brigitte. The prisms reach 15 cm long, and up to 20 cm according to the mineral inventory." } },
        { t: { fr: "Comment elle se forme", en: "How it forms" }, x: { fr: "Par métamorphisme de contact : la chaleur du granite de Rostrenen a recristallisé l'aluminium contenu dans les schistes.", en: "Through contact metamorphism: heat from the Rostrenen granite recrystallised the aluminium held in the schists." } },
        { t: { fr: "Pourquoi une croix", en: "Why a cross" }, x: { fr: "En grandissant, le cristal repousse le graphite de la roche vers ses diagonales. C'est ce qu'on appelle le faciès chiastolite.", en: "As the crystal grows, it pushes the rock's graphite along its diagonals. This is known as the chiastolite habit." } },
        { t: { fr: "Une transformation", en: "A transformation" }, x: { fr: "Les cristaux sont souvent remplacés en partie par de fines paillettes de margarite et de paragonite : on parle d'épigénie.", en: "The crystals are often partly replaced by fine flakes of margarite and paragonite, a process called pseudomorphism." } }
      ], photo: ph("d/d9", "Andalusite_-_Malacheta%2C_Minas_Gerais%2C_Brazil.jpg", "Ivar Leidus", "CC BY-SA 4.0") },
    { cat: "mineraux", nom: { fr: "Grenat almandin", en: "Almandine garnet" }, tech: "Fe₃Al₂(SiO₄)₃, nésosilicate",
      resume: { fr: "Un petit cristal rouge sombre, né lui aussi de la chaleur du granite, dans les couches riches en fer.", en: "A small dark red crystal, also born from the heat of the granite, in iron-rich layers." },
      details: [
        { t: { fr: "Où, ici", en: "Where, here" }, x: { fr: "Dans les minerais de fer oolithiques du Bretin et du Ruello, ainsi que dans les schistes et les grès riches en fer du secteur de Gouarec.", en: "In the oolitic iron ores of Le Bretin and Le Ruello, and in the iron-rich schists and sandstones around Gouarec." } },
        { t: { fr: "Comment il se forme", en: "How it forms" }, x: { fr: "Il se développe aux dépens de la chlorite, dans l'auréole de contact du granite de Rostrenen.", en: "It grows at the expense of chlorite, within the contact aureole of the Rostrenen granite." } }
      ], photo: ph("c/c9", "Almandin.jpg", "Didier Descouens", "CC BY-SA 4.0") },
    { cat: "mineraux", nom: { fr: "Zircon & rutile", en: "Zircon & rutile" }, tech: "ZrSiO₄ et TiO₂, minéraux lourds",
      resume: { fr: "De minuscules grains très résistants, cachés dans le grès armoricain. Ils ont survécu à l'érosion puis ont été triés par la mer.", en: "Tiny, very resistant grains hidden in the Armorican sandstone. They survived erosion, then were sorted by the sea." },
      details: [
        { t: { fr: "Où, ici", en: "Where, here" }, x: { fr: "Le Fouillé, dans une ancienne carrière de grès armoricain, et La Villeneuve à Mûr-de-Bretagne.", en: "Le Fouillé, in a former Armorican sandstone quarry, and La Villeneuve at Mûr-de-Bretagne." } },
        { t: { fr: "Une légère radioactivité", en: "Slight radioactivity" }, x: { fr: "Le zircon contient naturellement des traces d'éléments radioactifs : l'inventaire signale un niveau radioactif dans la carrière du Fouillé.", en: "Zircon naturally contains traces of radioactive elements: the inventory notes a radioactive layer in the Le Fouillé quarry." } }
      ], photo: ph("f/fa", "Zircon-dtn1a.jpg", "Robert M. Lavinsky", "CC BY-SA 3.0", true) },

    { cat: "mines", nom: { fr: "Minerai de fer", en: "Iron ore" }, tech: "Goethite FeO(OH), magnétite Fe₃O₄, sidérite", star: true,
      resume: { fr: "La richesse qui a fait naître les Forges des Salles. Il a été exploité dès l'Antiquité, et la région garde la trace d'innombrables anciens travaux.", en: "The resource behind Les Forges des Salles. It has been worked since Antiquity, and the area bears traces of countless old workings." },
      details: [
        { t: { fr: "Les hauts fourneaux", en: "The blast furnaces" }, x: { fr: "Créés en 1556, les hauts fourneaux des Salles-de-Rohan se sont éteints en 1874.", en: "Built in 1556, the blast furnaces of Salles-de-Rohan went out in 1874." } },
        { t: { fr: "Deux types de minerai", en: "Two types of ore" }, x: { fr: "Des couches sédimentaires à petites billes (oolithes) de chlorite et d'hématite, et des minerais d'altération formés en surface.", en: "Sedimentary layers of tiny beads (ooliths) of chlorite and hematite, and weathering ores formed at the surface." } },
        { t: { fr: "Sur la commune", en: "In the village" }, x: { fr: "Le gîte de Sainte-Brigitte a été exploité autrefois et a fait l'objet de recherches en 1912-1914 et en 1962-1965. Au Ruello : anciens travaux et puits effondré.", en: "The Sainte-Brigitte deposit was worked in the past and investigated in 1912-1914 and 1962-1965. At Le Ruello: old workings and a collapsed shaft." } },
        { t: { fr: "Et aujourd'hui ?", en: "And today?" }, x: { fr: "Les recherches du XXe siècle n'ont pas mis en évidence de gisement exploitable. Attention : d'anciens puits peuvent s'effondrer, n'en approchez pas.", en: "20th-century surveys found no workable deposit. Warning: old shafts can collapse, so keep well away." } }
      ], photo: ph("3/36", "Goethite-169735.jpg", "Robert M. Lavinsky", "CC BY-SA 3.0", true) },
    { cat: "mines", nom: { fr: "Plomb & zinc de Plélauff", en: "Lead & zinc of Plélauff" }, tech: "Galène PbS, blende ZnS, en filon",
      resume: { fr: "À moins de dix kilomètres, un filon de galène, le minerai de plomb brillant comme du métal, a été étudié jusqu'au début des années 1980.", en: "Less than ten kilometres away, a vein of galena, the shiny metallic lead ore, was studied until the early 1980s." },
      details: [
        { t: { fr: "L'histoire", en: "The history" }, x: { fr: "Le filon a été découvert en 1923. Les travaux de 1961-1963 ont mis au jour des galeries datant du Moyen Âge.", en: "The vein was discovered in 1923. Work in 1961-1963 uncovered galleries dating from the Middle Ages." } },
        { t: { fr: "Quelques chiffres", en: "Some figures" }, x: { fr: "Un puits jusqu'à 136 m de profondeur, des galeries à 80 et 130 m. Réserves à 6 % de plomb et 7 % de zinc ; la galène contient 250 g d'argent par tonne.", en: "A shaft down to 136 m, galleries at 80 and 130 m. Reserves at 6% lead and 7% zinc; the galena contains 250 g of silver per tonne." } },
        { t: { fr: "Une prudence", en: "A word of caution" }, x: { fr: "Le plomb est toxique : on ne ramasse pas ce minerai et on ne le manipule pas sans se laver les mains.", en: "Lead is toxic: do not collect this ore, and wash your hands after touching it." } }
      ], photo: ph("8/81", "Galena_-_Huallanca%2C_Bologesi%2C_Ancash%2C_Peru.jpg", "Ivar Leidus", "CC BY-SA 4.0") }
  ];
})();
