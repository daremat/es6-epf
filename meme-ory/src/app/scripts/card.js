(function() {   // TODO remove closure

    /* class CardComponent constructor */
    // TODO create a class
    function CardComponent(id) {
        // is this card flipped ?
        this._flipped = false;

        // has the matching card has been discovered already ?
        this.matched = false;

        this._id = id;

        this._elt = document.getElementById('card-template').content.cloneNode(true).firstElementChild;
        this._imageElt = this._elt.querySelector('.card-wrapper');
        this._imageElt.querySelector('img.front-face').src = `../../assets/cards/card-${this._id}.png`;
        this._imageElt.querySelector('img.back-face').src = '../../assets/cards/back.png';
    }

    /* method CardComponent.getElement */
    CardComponent.prototype.getElement = getElement;

    /* method CardComponent.flip */
    CardComponent.prototype.flip = flip;

    /* method CardComponent.equals */
    CardComponent.prototype.equals = equals;

    function getElement() {
        return this._elt;
    }

    function flip() {
        this._imageElt.classList.toggle('flip');
        this._flipped = !this._flipped;
    }

    function equals(card) {
        return card._id === this._id;
    }

    /* CardComponent.get flipped() */
    Object.defineProperties(CardComponent.prototype, {
        flipped: {
            get: function() {
                return this._flipped;
            }
        }
    });

    // put component in global scope, tu be runnable right from the HTML. TODO remove in step XXX
    window.CardComponent = CardComponent;
})();
