/* Photos libres (Wikimedia Commons) — licence et auteur à créditer sur le site.
   url(largeur) renvoie la miniature à la largeur voulue (960, 1280, 1920...). */
(function () {
  var P = [
    ["eglise", "a/a0", "Eglise_Sainte_Brigitte.JPG", "Église de Sainte-Brigitte", "Cadouf", "CC BY-SA 3.0", "9/9b"],
    ["eglise2", "", "Sainte-Brigitte_%C3%A9glise_1.jpg", "Église de Sainte-Brigitte", "Cadouf", "CC BY-SA 4.0", "2/2e"],
    ["gouvello", "", "Sainte-Brigitte_Le_Gouvello.jpg", "Le Gouvello, Sainte-Brigitte", "Cadouf", "CC BY-SA 4.0", "f/f9"],
    ["cloche", "", "Sainte-Brigitte_cloche_%C3%A9glise.jpg", "La cloche de l'église", "Cadouf", "CC BY-SA 4.0", "8/8a"],
    ["lac1", "", "452_Lac_de_Guerl%C3%A9dan.jpg", "Lac de Guerlédan", "Moreau.henri", "CC BY-SA 4.0", "a/a0"],
    ["lac2", "", "455_Lac_de_Guerl%C3%A9dan.jpg", "Lac de Guerlédan", "Moreau.henri", "CC BY-SA 4.0", "4/47"],
    ["lac3", "", "456_Lac_de_Guerl%C3%A9dan.jpg", "Lac de Guerlédan", "Moreau.henri", "CC BY-SA 4.0", "8/8c"],
    ["lacpano", "", "457_Lac_de_Guerl%C3%A9dan.jpg", "Lac de Guerlédan, panorama", "Moreau.henri", "CC BY-SA 4.0", "2/2f"],
    ["lac2015", "", "Lac_de_Guerl%C3%A9dan_2015.jpg", "Lac de Guerlédan", "Lannivon", "CC BY-SA 4.0", "a/a8"],
    ["keryhuel", "", "Lac_de_Guerl%C3%A9dan%2C_Keryhuel%2C_M%C3%BBr-de-Bretagne%2C_France-1642.jpg", "Lac de Guerlédan depuis Keryhuel", "Raimond Spekking", "CC BY-SA 4.0", "4/48"],
    ["barrage", "", "Lac_de_Guerl%C3%A9dan%2C_Barrage_de_Guerl%C3%A9dan%2C_Blavet%2C_France-1647.jpg", "Barrage de Guerlédan", "Raimond Spekking", "CC BY-SA 4.0", "6/67"],
    ["sordan", "", "Lac_de_Guerl%C3%A9dan_-_Ecluse_de_l%27_Anse_de_Sordan_%2817924992881%29.jpg", "Anse de Sordan", "Pierre Guezingar", "CC BY-SA 2.0", "7/75"],
    ["foret1", "", "Chemin_dans_la_foret_de_Qu%C3%A9n%C3%A9can.jpg", "Chemin en forêt de Quénécan", "Allot René", "CC BY-SA 3.0", "5/53"],
    ["foret2", "", "Sentier_dans_la_foret_de_K%C3%A9n%C3%A9quan_au_bord_du_lac.jpg", "Sentier au bord du lac, Quénécan", "Allot René", "CC BY-SA 3.0", "8/86"],
    ["forges1", "", "Bretagne%2C_Les_Forges_des_Salles-1696.jpg", "Les Forges des Salles", "Raimond Spekking", "CC BY-SA 4.0", "9/98"],
    ["forges2", "", "Bretagne%2C_Les_Forges_des_Salles-1697.jpg", "Les Forges des Salles", "Raimond Spekking", "CC BY-SA 4.0", "5/56"],
    ["forges3", "", "Bretagne%2C_Les_Forges_des_Salles-2294.jpg", "Les Forges des Salles", "Elke Wetzig", "CC BY-SA 4.0", "f/f8"],
    ["forges4", "", "Les_Forges_des_Salles_-_01.jpg", "Les Forges des Salles", "JackyM59", "CC BY-SA 4.0", "2/29"],
    ["forges5", "", "Les_Forges_des_Salles_-_04.jpg", "Les Forges des Salles", "JackyM59", "CC BY-SA 4.0", "5/50"],
    ["forges6", "", "Bretagne%2C_Les_Forges_des_Salles-2295.jpg", "Les Forges des Salles", "Elke Wetzig", "CC BY-SA 4.0", "3/36"],
    ["bonrepos", "", "Abbaye_Notre-Dame-de-Bon-Repos%2C_Saint-Gelven%2C_France.jpg", "Abbaye de Bon-Repos", "Édouard Hue", "CC BY-SA 4.0", "c/c2"],
    ["bonrepos2", "", "Abbaye_Notre-Dame-de-Bon-Repos%2C_Saint-Gelven%2C_France-3.jpg", "Abbaye de Bon-Repos", "Édouard Hue", "CC BY-SA 4.0", "6/69"]  ];
  var PHOTOS = {};
  P.forEach(function (p) {
    PHOTOS[p[0]] = {
      titre: p[3], auteur: p[4], licence: p[5],
      page: "https://commons.wikimedia.org/wiki/File:" + p[2],
      url: function (l) { return "https://upload.wikimedia.org/wikipedia/commons/thumb/" + p[6] + "/" + p[2] + "/" + (l || 1920) + "px-" + p[2]; }
    };
  });
  window.PHOTOS = PHOTOS;
})();
