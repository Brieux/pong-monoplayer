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

    jouer(raquetteGauche, raquetteDroite){
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) { return}
            if(event.key === "a"){
                raquetteGauche.monter();
                raquetteDroite.descendre();
            }
            else if (event.key === "q"){
                raquetteGauche.descendre();
                raquetteDroite.monter();
            }
            event.preventDefault();
        }, true);

        window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) { return}
            if(event.key === "a" || event.key === "q"){
                raquetteGauche.arreterDeBouger();
                raquetteDroite.arreterDeBouger();
            }
            event.preventDefault();
        }, true);
    }
}