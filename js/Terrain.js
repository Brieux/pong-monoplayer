class Terrain {
    /**
     * constructeur de la classe Terrain
     * @param $element
     */
    constructor($element) {
        this.$element = $element;
        this.largeur = $element.width();
        this.hauteur = $element.height();
    }

    /**
     * ecoute les entrées touche du joueurs
     * @param raquetteGauche
     * @param raquetteDroite
     */
    jouer(raquetteGauche, raquetteDroite){
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) { return}
            if(event.key === "h"){
                raquetteGauche.monter();
                raquetteDroite.descendre();
            }
            else if (event.key === "b"){
                raquetteGauche.descendre();
                raquetteDroite.monter();
            }
            event.preventDefault();
        }, true);

        window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) { return}
            if(event.key === "h" || event.key === "b"){
                raquetteGauche.arreterDeBouger();
                raquetteDroite.arreterDeBouger();
            }
            event.preventDefault();
        }, true);
    }

    /**
     * permet de stoper la partie
     */
    defaite(){
        $("#terrain").addClass('opaque');
        $("#rejouer").removeClass('invisible');
        $(".resultat").text(raquetteGauche.point);
        balle.arreteDeBouger();
    }

}