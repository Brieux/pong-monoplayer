class Raquette {
    /**
     * constructeur de la classe Raquette
     * @param $element
     */
    constructor($element) {
        this.$element = $element;
        this.hauteur = $element.height();
        this.largeur = $element.width();
        this.positionX = parseInt(this.$element.css("left"));
        this.positionY = parseInt(this.$element.css("top"));
        this.vitesseY = 0;
        this.gauche = (this.positionX < terrain.largeur / 2);
        this.point = 0;
        this.vie = 5;
    }

    /**
     * getter
     * @returns {*}
     */
    get bas(){
        return this.positionY + this.hauteur;
    }
    get droite(){
        return this.positionX + this.largeur;
    }

    /**
     * setter
     * @param value
     */
    set bas(value) {
        this.positionY = value - this.hauteur;
    }

    set droite(value) /*inutile mais important :o */{
        this.positionX = value - this.largeur;
    }

    /**
     * raquette evoluant dans le terrain
     */
    bouger(){
        this.positionY = this.positionY + this.vitesseY;
        this.majHTML();
    }

    /**
     * permet de stopper la raquette
     */
    arreterDeBouger(){
        this.vitesseY = 0;
    }

    /**
     * permet de faire monter la raquette
     */
    monter(){
        if (this.positionY > 0){
            this.vitesseY = -3;
        }
        else{
            this.positionY = 0;
            this.arreterDeBouger();
        }
    }

    /**
     * fonction permettant de faire descendre la raquette jusqu'au bord du haut
     */
    descendre(){
        if (this.bas < terrain.hauteur){
            this.vitesseY = 3;
        }
        else{
            this.bas = terrain.hauteur;
            this.arreterDeBouger();
        }
    }

    /**
     * rajoute des point pour chaque touches
     */
    ajoutScore(){
        this.point = this.point + 10;
        console.log(this.point);
        $(".score").text(this.point);
    }

    /**
     * retire un point de vie
     */
    perdre(){
        this.vie -= 1;
        $(".compteur").text(this.vie);
        if (this.vie < 0){
            terrain.defaite();
        }
    }

    /**
     *
     * @param positionYBalle
     * @returns {number}
     */
    calculRebond(positionYBalle){
        return (((positionYBalle - this.positionY)*6/100)-3);


    }

    /**
     * mise a jour graphique
     */
    majHTML(){
        this.$element.css("left",this.positionX);
        this.$element.css("top",this.positionY);
    }
}