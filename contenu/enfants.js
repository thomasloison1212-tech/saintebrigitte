/* =====================================================================
   MODE ENFANT DE LA PAGE NATURE
   Les textes sont ici (fr = français, en = anglais). Les animaux sont
   dessinés en SVG dans ce fichier : dessins originaux créés pour le site.
   ===================================================================== */
(function () {
  function yeux(x1, x2, y, r) {
    r = r || 4;
    return [x1, x2].map(function (x) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#222"/><circle cx="' + (x + r * .35) + '" cy="' + (y - r * .35) + '" r="' + r * .32 + '" fill="#fff"/>'; }).join("");
  }
  function joues(x1, x2, y) { return [x1, x2].map(function (x) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="6" ry="4" fill="#f4a3a0" opacity=".8"/>'; }).join(""); }
  function sourire(x, y, l) { return '<path d="M' + (x - l) + " " + y + "q" + l + " " + l * .9 + " " + l * 2 + ' 0" fill="none" stroke="#222" stroke-width="2.6" stroke-linecap="round"/>'; }
  function piquants(cx, cy, r, n) {
    var p = "";
    for (var i = 0; i < n * 2; i++) { var a = Math.PI * i / n, R = i % 2 ? r * .82 : r * 1.08; p += (i ? "L" : "M") + (cx + R * Math.cos(a)).toFixed(1) + " " + (cy + R * Math.sin(a)).toFixed(1); }
    return p + "Z";
  }

  var D = {
    herisson: '<path d="' + piquants(60, 60, 50, 22) + '" fill="#6b4a2f"/><path d="' + piquants(60, 60, 40, 18) + '" fill="#8b6340"/><ellipse cx="60" cy="72" rx="31" ry="27" fill="#f3d9b1"/>' + yeux(49, 71, 66, 5) + joues(40, 80, 77) + '<ellipse cx="60" cy="75" rx="6" ry="4.6" fill="#222"/>' + sourire(60, 84, 8) + '<circle cx="27" cy="94" r="7" fill="#f3d9b1"/><circle cx="93" cy="94" r="7" fill="#f3d9b1"/>',
    ecureuil: '<path d="M78 104c30 0 38-30 26-52-8-15-26-16-28-2-1 11 12 10 12 22 0 13-14 18-24 20z" fill="#d9692b"/><path d="M84 58c5-4 13-3 16 4" fill="none" stroke="#f0a468" stroke-width="4" stroke-linecap="round"/><ellipse cx="52" cy="84" rx="23" ry="26" fill="#e07a35"/><ellipse cx="52" cy="90" rx="13" ry="17" fill="#fff0dc"/><path d="M34 30l-3-18 14 11zM68 30l6-18-15 11z" fill="#c85c22"/><circle cx="52" cy="45" r="25" fill="#e07a35"/><ellipse cx="52" cy="56" rx="14" ry="10" fill="#fff0dc"/>' + yeux(42, 62, 42, 5) + joues(33, 71, 54) + '<ellipse cx="52" cy="52" rx="3.6" ry="2.8" fill="#222"/><rect x="48" y="58" width="4" height="6" fill="#fff" stroke="#ccc" stroke-width=".6"/><rect x="52" y="58" width="4" height="6" fill="#fff" stroke="#ccc" stroke-width=".6"/><ellipse cx="52" cy="84" rx="9" ry="8" fill="#9a5a26"/><path d="M44 79q8-8 16 0z" fill="#6b3d17"/>',
    cerf: '<g fill="none" stroke="#a8743c" stroke-width="5.5" stroke-linecap="round"><path d="M42 42C36 26 24 22 16 10M31 28l-14 4M36 24l-4-16"/><path d="M78 42c6-16 18-20 26-32M89 28l14 4M84 24l4-16"/></g><path d="M34 54C22 44 10 48 8 56c10 8 20 8 30 4zM86 54c12-10 24-6 26 2-10 8-20 8-30 4z" fill="#a8693a"/><path d="M36 44c12-8 36-8 48 0 6 22-4 60-24 64-20-4-30-42-24-64z" fill="#b97c45"/><ellipse cx="60" cy="90" rx="17" ry="15" fill="#f0dcc0"/>' + yeux(47, 73, 62, 5.5) + joues(39, 81, 75) + '<ellipse cx="60" cy="84" rx="8" ry="5.6" fill="#222"/>' + sourire(60, 94, 7) + '<circle cx="60" cy="48" r="3" fill="#f0dcc0"/><circle cx="50" cy="52" r="2" fill="#f0dcc0"/><circle cx="70" cy="52" r="2" fill="#f0dcc0"/>',
    loutre: '<path d="M4 100q14-12 28 0t28 0 28 0 28 0v16H4z" fill="#5fb6cf"/><path d="M28 104c-6-30 6-62 32-62s38 32 32 62z" fill="#7a5233"/><ellipse cx="60" cy="88" rx="20" ry="17" fill="#e8cfa9"/><circle cx="34" cy="34" r="9" fill="#6a4629"/><circle cx="86" cy="34" r="9" fill="#6a4629"/><circle cx="60" cy="46" r="31" fill="#7a5233"/><ellipse cx="60" cy="58" rx="22" ry="16" fill="#e8cfa9"/>' + yeux(46, 74, 43, 5) + joues(36, 84, 56) + '<ellipse cx="60" cy="52" rx="7" ry="5" fill="#222"/>' + sourire(60, 62, 7) + '<g stroke="#5a3b21" stroke-width="1.6" stroke-linecap="round"><path d="M42 56l-20-4M42 61l-20 3M78 56l20-4M78 61l20 3"/></g><path d="M50 92l10-10 10 10a12 12 0 0 1-20 0z" fill="#f2a65a"/><path d="M60 82v18M55 87l1 11M65 87l-1 11" stroke="#c97a30" stroke-width="1.4"/>',
    hirondelle: '<path d="M26 70L2 96l30-12zM34 78L16 112l28-22z" fill="#23346b"/><ellipse cx="60" cy="68" rx="36" ry="27" fill="#2c4186"/><path d="M52 84c10 12 34 8 42-14-10 8-30 10-42 14z" fill="#fff"/><path d="M50 58c12-30 40-46 62-46-6 24-22 48-52 56z" fill="#23346b"/><circle cx="84" cy="46" r="24" fill="#2c4186"/><path d="M68 56c6 16 26 18 37 4-12 2-26 0-37-4z" fill="#c8412b"/>' + yeux(84, 98, 42, 4.5) + '<path d="M105 48l13 4-13 5z" fill="#f2a65a"/>',
    vache: '<path d="M30 40L16 16M90 40l14-24" stroke="#d8c7a4" stroke-width="7" stroke-linecap="round"/><ellipse cx="17" cy="54" rx="14" ry="8" fill="#222"/><ellipse cx="103" cy="54" rx="14" ry="8" fill="#222"/><path d="M28 36h64c8 26 6 48-6 62H34C22 84 20 62 28 36z" fill="#fff" stroke="#ddd"/><path d="M28 36h30c6 12-2 26-16 28-8 1-14 2-18 2 0-10 1-20 4-30zM92 36H74c-6 14 2 24 22 28 0-10-1-20-4-28z" fill="#222"/><rect x="28" y="76" width="64" height="36" rx="18" fill="#f4b6b0"/>' + yeux(44, 76, 56, 5.5) + '<ellipse cx="48" cy="90" rx="4" ry="5" fill="#b86a64"/><ellipse cx="72" cy="90" rx="4" ry="5" fill="#b86a64"/>' + sourire(60, 101, 10) + '<path d="M48 24c6-10 18-10 24 0" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>',
    chien: '<path d="M26 36C6 40 4 74 14 90c10 4 18-6 20-20z" fill="#d07a2d"/><path d="M94 36c20 4 22 38 12 54-10 4-18-6-20-20z" fill="#d07a2d"/><circle cx="60" cy="58" r="38" fill="#fff" stroke="#eee"/><path d="M38 26c-8 14-6 34 10 42 10-8 8-30 2-46zM84 28c6 14 2 34-12 40-8-10-8-28-2-44z" fill="#d07a2d" opacity=".95"/>' + yeux(45, 75, 54, 6) + joues(34, 86, 70) + '<ellipse cx="60" cy="70" rx="9" ry="7" fill="#3a2418"/>' + '<path d="M50 82q10 8 20 0" fill="none" stroke="#222" stroke-width="2.6" stroke-linecap="round"/><path d="M54 84h12v12a6 6 0 0 1-12 0z" fill="#ef7f8f"/><path d="M60 84v12" stroke="#d65c6f" stroke-width="1.6"/>',
    escargot: '<path d="M8 104c0-10 8-14 18-14h62c12 0 22-6 22-20 0-6 8-6 8 2 0 26-14 40-36 40H18c-6 0-10-3-10-8z" fill="#e8c88a"/><g stroke="#c9a763" stroke-width="3" stroke-linecap="round"><path d="M100 54L94 26M112 56l6-28"/></g><circle cx="93" cy="24" r="8" fill="#fff"/><circle cx="119" cy="26" r="8" fill="#fff"/><circle cx="95" cy="25" r="4" fill="#222"/><circle cx="117" cy="27" r="4" fill="#222"/><path d="M98 80q7 7 14 0" fill="none" stroke="#222" stroke-width="2.6" stroke-linecap="round"/><circle cx="52" cy="62" r="39" fill="#c9805a"/><path d="M52 62a8 8 0 0 1 12 8 17 17 0 0 1-28-10 27 27 0 0 1 44-16" fill="none" stroke="#8e4f33" stroke-width="5.5" stroke-linecap="round"/>',
    papillon: '<path d="M58 54C38 10 4 14 6 42c1 22 28 30 52 18z" fill="#ffd84d"/><path d="M62 54C82 10 116 14 114 42c-1 22-28 30-52 18z" fill="#ffd84d"/><path d="M58 64C34 66 16 80 26 98c10 16 28 2 34-26z" fill="#f7bf2d"/><path d="M62 64c24 2 42 16 32 34-10 16-28 2-34-26z" fill="#f7bf2d"/><circle cx="30" cy="40" r="7" fill="#f08a3c"/><circle cx="90" cy="40" r="7" fill="#f08a3c"/><rect x="53" y="42" width="14" height="60" rx="7" fill="#4a3a2a"/><circle cx="60" cy="38" r="15" fill="#4a3a2a"/><g fill="none" stroke="#4a3a2a" stroke-width="2.6" stroke-linecap="round"><path d="M54 25C50 14 42 10 36 12M66 25c4-11 12-15 18-13"/></g><circle cx="36" cy="12" r="3" fill="#4a3a2a"/><circle cx="84" cy="12" r="3" fill="#4a3a2a"/><circle cx="54" cy="36" r="4" fill="#fff"/><circle cx="66" cy="36" r="4" fill="#fff"/><circle cx="55" cy="36" r="2" fill="#222"/><circle cx="65" cy="36" r="2" fill="#222"/><path d="M55 44q5 4 10 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    taupe: '<path d="M0 120c8-34 34-46 60-46s52 12 60 46z" fill="#8a5f3a"/><circle cx="26" cy="104" r="3" fill="#6a4629"/><circle cx="96" cy="108" r="3.5" fill="#6a4629"/><circle cx="74" cy="112" r="2.5" fill="#6a4629"/><ellipse cx="60" cy="68" rx="35" ry="38" fill="#4b4453"/><path d="M26 44c2-24 66-24 68 0z" fill="#f2c230"/><rect x="20" y="42" width="80" height="8" rx="4" fill="#d9a81e"/><circle cx="60" cy="30" r="9" fill="#fff5c0" stroke="#d9a81e" stroke-width="3"/><g fill="#fff" stroke="#222" stroke-width="3"><circle cx="46" cy="65" r="11"/><circle cx="74" cy="65" r="11"/></g><path d="M57 65h6" stroke="#222" stroke-width="3"/><circle cx="46" cy="65" r="4" fill="#222"/><circle cx="74" cy="65" r="4" fill="#222"/><ellipse cx="60" cy="84" rx="10" ry="8" fill="#f28ea0"/>' + sourire(60, 95, 8) + '<path d="M24 100c-10 2-14-8-8-12l10-2zM96 100c10 2 14-8 8-12l-10-2z" fill="#f2c9b3"/>'
  };
  window.SITE.dessinsEnfants = D;

  window.SITE.enfants = {
    intro: {
      qui: "herisson",
      titre: { fr: "Salut, moi c'est Piko !", en: "Hi, I'm Piko!" },
      texte: { fr: "Je suis un hérisson de Sainte-Brigitte. Avec mes copains, on t'explique les secrets de la forêt, du lac et même des cailloux. Clique sur « Encore ! » pour en savoir plus.", en: "I'm a hedgehog from Sainte-Brigitte. My friends and I will tell you the secrets of the forest, the lake and even the stones. Tap “More!” to find out more." }
    },
    groupes: [
      { couleur: "#fde3c4", titre: { fr: "Les copains à poils et à plumes", en: "Furry and feathered friends" }, cartes: [
        { qui: "herisson", nom: "Piko", q: { fr: "Pourquoi je dors tout l'hiver ?", en: "Why do I sleep all winter?" },
          r: { fr: "L'hiver, il n'y a presque plus d'insectes à manger. Alors je fais une énorme sieste dans un tas de feuilles : ça s'appelle hiberner.", en: "In winter there are hardly any insects to eat. So I take a huge nap in a pile of leaves: that's called hibernating." },
          plus: { fr: "J'ai environ 6 000 piquants sur le dos. Quand j'ai peur, je me roule en boule !", en: "I have about 6,000 spines on my back. When I'm scared, I roll into a ball!" } },
        { qui: "ecureuil", nom: "Noisette", q: { fr: "Je plante des arbres sans le faire exprès !", en: "I plant trees by accident!" },
          r: { fr: "Je cache des noisettes partout pour l'hiver. Mais j'en oublie plein ! Celles que j'oublie germent et deviennent des arbres.", en: "I hide hazelnuts everywhere for the winter. But I forget lots of them! The forgotten ones sprout and become trees." },
          plus: { fr: "Ma grande queue me sert de balancier pour sauter de branche en branche.", en: "My big tail helps me balance as I leap from branch to branch." } },
        { qui: "cerf", nom: "Roi Quénécan", q: { fr: "Mes bois tombent chaque année !", en: "My antlers fall off every year!" },
          r: { fr: "Seuls les cerfs mâles ont des bois. Ils tombent à la fin de l'hiver, puis repoussent encore plus grands.", en: "Only male deer have antlers. They fall off at the end of winter, then grow back even bigger." },
          plus: { fr: "En automne, je crie très fort dans la forêt. Ça s'appelle le brame : c'est pour impressionner les autres cerfs.", en: "In autumn I bellow very loudly in the forest. That's called the rut: it's to impress the other deer." } },
        { qui: "loutre", nom: "Plouf", q: { fr: "Comment je nage sans avoir froid ?", en: "How do I swim without getting cold?" },
          r: { fr: "Mes poils sont si serrés que l'eau n'arrive presque pas jusqu'à ma peau. C'est comme une combinaison de plongée !", en: "My fur is so thick that water hardly reaches my skin. It's like a wetsuit!" },
          plus: { fr: "Sous l'eau, je ferme mon nez et mes oreilles. Pratique pour attraper les poissons.", en: "Underwater I close my nose and ears. Handy for catching fish." } },
        { qui: "hirondelle", nom: "Zoum", q: { fr: "Où je pars en vacances ?", en: "Where do I go on holiday?" },
          r: { fr: "Chaque automne, je vole jusqu'en Afrique, de l'autre côté du désert du Sahara ! Au printemps, je reviens faire mon nid ici.", en: "Every autumn I fly all the way to Africa, across the Sahara desert! In spring I come back here to nest." },
          plus: { fr: "Je mange et je bois en volant. Je suis une vraie pilote !", en: "I eat and drink while flying. I'm a real pilot!" } },
        { qui: "vache", nom: "Marguerite", q: { fr: "Mon ventre a quatre poches !", en: "My tummy has four pockets!" },
          r: { fr: "J'avale l'herbe, puis elle remonte dans ma bouche pour que je la mâche encore. C'est pour ça que je mâche tout le temps : je rumine.", en: "I swallow the grass, then it comes back up so I can chew it again. That's why I'm always chewing: I chew the cud." },
          plus: { fr: "Je suis une Bretonne Pie Noir, une petite vache d'ici, toute noire et blanche.", en: "I'm a Breton Pie Noir, a small local cow, all black and white." } },
        { qui: "chien", nom: "Truffe", q: { fr: "Mon nez, c'est ma carte d'identité !", en: "My nose is my ID card!" },
          r: { fr: "Les dessins sur ma truffe sont uniques, comme tes empreintes de doigts. Et je sens des odeurs que tu ne peux même pas imaginer.", en: "The patterns on my nose are unique, like your fingerprints. And I can smell things you can't even imagine." },
          plus: { fr: "En forêt, je reste près de mon humain pour ne pas faire peur aux animaux sauvages.", en: "In the forest I stay close to my human so I don't scare the wild animals." } }
      ] },
      { couleur: "#dcefcf", titre: { fr: "Dans la forêt et les jardins", en: "In the forest and gardens" }, cartes: [
        { qui: "papillon", nom: "Citronnelle", q: { fr: "Je goûte avec mes pieds !", en: "I taste with my feet!" },
          r: { fr: "Quand je me pose sur une feuille, mes pattes me disent si elle est bonne pour y pondre mes œufs.", en: "When I land on a leaf, my feet tell me if it's a good place to lay my eggs." },
          plus: { fr: "Je suis souvent le premier papillon qu'on voit à la fin de l'hiver.", en: "I'm often the first butterfly you see at the end of winter." } },
        { qui: "escargot", nom: "Turbo", alerte: true, q: { fr: "Un champignon, c'est quoi ?", en: "What is a mushroom?" },
          r: { fr: "Ce n'est ni une plante, ni un animal ! C'est un être vivant à part. La plus grande partie se cache sous la terre, comme des fils tout fins.", en: "It's neither a plant nor an animal! It's a living thing of its own. Most of it hides underground, like very fine threads." },
          plus: { fr: "Attention : certains champignons sont très dangereux. On regarde avec les yeux, on ne touche pas, et on n'en mange jamais sans un adulte qui les a fait vérifier.", en: "Watch out: some mushrooms are very dangerous. Look with your eyes, don't touch, and never eat any unless an adult has had them checked." } }
      ] },
      { couleur: "#e4dcf3", titre: { fr: "Les secrets des cailloux, avec Madame Taupe", en: "Stone secrets, with Mrs Mole" }, cartes: [
        { qui: "taupe", nom: "Madame Taupe", q: { fr: "Ici, c'était la mer !", en: "This used to be the sea!" },
          r: { fr: "Il y a plus de 400 millions d'années, Sainte-Brigitte était sous l'eau. La preuve : on trouve dans les pierres des trilobites, des animaux marins disparus.", en: "More than 400 million years ago, Sainte-Brigitte was underwater. The proof: trilobites, marine animals now extinct, are found in the stones." },
          plus: { fr: "Les trilobites ressemblaient un peu à de gros cloportes. Ils ont disparu bien avant les dinosaures.", en: "Trilobites looked a bit like big woodlice. They died out long before the dinosaurs." } },
        { qui: "taupe", nom: "Madame Taupe", q: { fr: "Le schiste, c'est un mille-feuille", en: "Schist is like a layer cake" },
          r: { fr: "C'était de la boue au fond de la mer. Écrasée pendant des millions d'années, elle est devenue une roche qui se sépare en feuilles.", en: "It used to be mud on the sea floor. Squashed for millions of years, it became a rock that splits into sheets." },
          plus: { fr: "Avec certains schistes, on fabrique des ardoises pour les toits ou les sols.", en: "Some schists are made into slates for roofs and floors." } },
        { qui: "taupe", nom: "Madame Taupe", q: { fr: "Le granite, c'est un gâteau aux pépites", en: "Granite is like a choc-chip cake" },
          r: { fr: "C'était de la roche fondue, très loin sous la terre. En refroidissant tout doucement, elle a formé des petits grains qui brillent.", en: "It was molten rock, far underground. As it cooled very slowly, it formed little shiny grains." },
          plus: { fr: "Regarde bien un granite : les points noirs et les paillettes brillantes sont des micas.", en: "Look closely at granite: the black dots and shiny flakes are micas." } },
        { qui: "taupe", nom: "Madame Taupe", q: { fr: "Le cristal à la croix magique", en: "The crystal with a magic cross" },
          r: { fr: "Près de Sainte-Brigitte, la chaleur du granite a fait pousser des cristaux dans la roche. Quand on les coupe, certains montrent une croix noire !", en: "Near Sainte-Brigitte, the heat of the granite made crystals grow in the rock. When cut, some show a black cross!" },
          plus: { fr: "Ce cristal s'appelle l'andalousite. Il peut mesurer 15 centimètres, presque la taille de ta main.", en: "This crystal is called andalusite. It can be 15 centimetres long, almost the size of your hand." } },
        { qui: "taupe", nom: "Madame Taupe", q: { fr: "Une pierre qui fait du fer", en: "A stone that makes iron" },
          r: { fr: "Certaines pierres d'ici contiennent du fer. Pendant plus de 300 ans, aux Forges des Salles, on les a fait fondre dans de très grands fours.", en: "Some stones here contain iron. For more than 300 years, at Les Forges des Salles, they were melted in huge furnaces." },
          plus: { fr: "Les anciens trous de mine sont dangereux : on n'y va jamais, même pour jouer.", en: "Old mine holes are dangerous: never go near them, even to play." } }
      ] }
    ],
    code: {
      titre: { fr: "Le code du petit explorateur", en: "The little explorer's code" },
      regles: [
        { fr: "Je me promène avec un adulte.", en: "I go walking with an adult." },
        { fr: "Je regarde et je prends des photos, je ne ramasse rien.", en: "I look and take photos, and I don't pick anything up." },
        { fr: "Je parle doucement pour ne pas effrayer les animaux.", en: "I speak quietly so I don't frighten the animals." },
        { fr: "Je ne touche jamais les champignons.", en: "I never touch mushrooms." },
        { fr: "Je reste loin des trous et des vieux puits.", en: "I stay away from holes and old wells." }
      ]
    }
  };
})();
