//creation des objets
let terrain = new Terrain($("#terrain"));
let balle = new Balle($("#balle"));
let raquetteDroite = new Raquette($("#droite"));
let raquetteGauche = new Raquette($("#gauche"));

raquetteGauche.positionY = terrain.hauteur / 2 - (raquetteGauche.hauteur / 2);
raquetteDroite.positionY = terrain.hauteur / 2 - (raquetteDroite.hauteur / 2);

//ecoute des touches pour le controles des raquettes
terrain.jouer(raquetteGauche, raquetteDroite);

$(".btn").click(function () {
    $("#titre").addClass('invisible');
    $("#terrain").removeClass('opaque');
    setInterval(function () {
        balle.bouger(terrain);
        raquetteGauche.bouger(terrain);
        raquetteDroite.bouger(terrain);
    }, 10);
});


