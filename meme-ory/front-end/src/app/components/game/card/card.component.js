(function() {
    /* class CardComponent constructor */
    // TODO create a class
    class CardComponent {
        constructor(id) {
            // is this card flipped ?
            this._flipped = false;

            // has the matching card has been discovered already ?
            this.matched = false;

            this._id = id;

            this._elt = document.getElementById('card-template').content.cloneNode(true).firstElementChild;
            this._imageElt = this._elt.querySelector('.card-wrapper');
            // TODO Step 1: Change images location to ./card/assets/***.png
            this._imageElt.querySelector('img.front-face').src = `./card/assets/card-${this._id}.png`;
            this._imageElt.querySelector('img.back-face').src = './card/assets/back.png';
        }

        getElement() {
            return this._elt;
        }

        flip() {
            this._imageElt.classList.toggle('flip');
            this._flipped = !this._flipped;
        }

        equals(card) {
            return card._id === this._id;
        }

        /* CardComponent.get flipped() */
        get flipped() {
            return this._flipped;
        }
    }
    
    // put component in global scope, tu be runnable right from the HTML. TODO remove in step XXX
    window.CardComponent = CardComponent;
})();
