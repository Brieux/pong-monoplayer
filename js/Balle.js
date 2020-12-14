//implementation classe  balle
class Balle {
    /**
     * constructeur de la classe Balle
     * @param $element
     */
    constructor($element) {
        this.$element = $element;
        this.positionX = parseInt(this.$element.css("left"));
        this.positionY = parseInt(this.$element.css("top"));
        this.rayon = parseInt(this.$element.css("width"));
        this.vitesseXFacteur = 1;
        this.limiteFacteur = 3//faire en fonction de la largeur du terrain
        this.vitesseXSens = this.calculAleatoire();
        this.vitesseYSens = (Math.random() * 6) - 3; //entre -3 et 3 : 0 fais du tout droit
        //this.vitesseYSens = 0;
        this.vitesseYFacteur = 1;
        this.centreX = this.positionX;
        this.centreY = this.positionY

    }
    get bas() {
        return this.positionY + this.rayon;
    }
    get droite() {
        return this.positionX + this.rayon;
    }

    /**
     * setter
     * @param value
     */
    set bas(value) {
        this.positionY = value - this.rayon;
    }
    set droite(value) {
        this.positionX = value - this.rayon;
    }
    calculAleatoire(){
        return Math.random() < 0.5 ? 1 : -1; //c'est un genre de if : else
    }

    retourCentre(){
        this.positionX =  this.centreX;
        this.positionY =  this.centreY;
        this.vitesseXSens = this.calculAleatoire();
        this.vitesseXFacteur = 1;
        this.vitesseYSens = (Math.random()*6) - 3;
        this.vitesseYFacteur =1;
    }
    calculVitesseX(){
        //rajout de 1 facteur
        if (this.vitesseXFacteur < this.limiteFacteur){
            this.vitesseXFacteur +=1; // faire en fonction de la largeur du terrain
        }
        else {/*rien car la vitesse ne peux pas depasser la limite*/}
    }
    bouger(terrain){
        this.positionX = this.positionX + (this.vitesseXFacteur * this.vitesseXSens);
        this.positionY += (this.vitesseYFacteur * this.vitesseYSens);
        this.rebond(terrain);
        this.rebondSurRaquette(raquetteDroite);
        this.rebondSurRaquette(raquetteGauche);
        this.majHTML();
    }
    majHTML(){
        this.$element.css("left",this.positionX);
        this.$element.css("top",this.positionY);
    }

    rebond(terrain){
        //impact avec un bords de terrain coté joueur
        if(this.positionX <= 0 ||this.droite >= terrain.largeur){
            if(this.positionX <= 0)

            if(this.droite >= terrain.largeur){
            }
            //retour de la balle au centre et affichage des bords rouges;
            terrain.$element.addClass("point");
            setTimeout(
                function(){
                    terrain.$element.removeClass("point");
                },350
            );
            this.retourCentre();
        }
        //rebond sur les plafond et sol
        if(this.positionY <= 0 || this.bas >= terrain.hauteur){
            this.vitesseYSens = this.vitesseYSens * (-1);
        }

    }
    rebondSurRaquette(raquette){
        //zone pour la raquette de gauche
        if(raquette.gauche){
            if ((this.positionY >= raquette.positionY)&&(this.positionY <= raquette.bas)){
                //console.log("passage dans la raquette de gauche");
                if (this.positionX<= raquette.droite){
                    this.positionX = raquette.droite + 1
                    this.vitesseXSens = this.vitesseXSens * (-1);
                    /*console.log("rebond sur raquette de gauche");
                    changement de couleur lié a l'impact*/
                    raquette.$element.addClass("raquetteFluo");
                    setTimeout(
                        function(){
                            raquette.$element.removeClass("raquetteFluo");
                        },200
                    );
                    this.calculVitesseX();
                    this.vitesseYSens = raquette.calculRebond(this.positionY);
                }
            }
        }
        //zone pour la raquette de droite
        else{
            if ((this.positionY >= raquette.positionY)&&(this.positionY <= raquette.bas)){
                //console.log("passage dans la raquette de droite");
                if (this.droite > raquette.positionX){
                    this.droite = raquette.positionX- 1
                    this.vitesseXSens = this.vitesseXSens * (-1);
                    /*console.log("rebond sur raquette de droite");
                    changement de couleur lié a l'impact*/
                    raquette.$element.addClass("raquetteFluo");
                    setTimeout(
                        function(){
                            raquette.$element.removeClass("raquetteFluo");
                        },200
                    );
                    this.calculVitesseX();
                    this.vitesseYSens = raquette.calculRebond(this.positionY);
                }
            }
        }

    }
}