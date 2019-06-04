import './card.component.scss';
import template from './card.component.html';
import { Component } from '../../../utils/component';

export class CardComponent extends Component {
    constructor(id, board) {
        super('card');
        this._flipped = false;
        this._id = id;
        this._board = board;
    }

    getTemplate() {
        return template;
    }

    get flipped() {
        return this._flipped;
    }

    get id() {
        return this._id;
    }

    getElement() {
        const elt = super.getElement();
        this._imageElt = this._elt.querySelector('.image');
        this._imageElt.querySelector('img.front-face').src = `src/app/components/game/card/assets/card-${this._id}.png`;
        this._imageElt.querySelector('img.back-face').src = 'src/app/components/game/card/assets/back.png';
        this._imageElt.addEventListener('click', () => this.flip());
        
        return elt;
    }
    flip({boardCalling = false} = {}) {
        if (!this._board.freezed || boardCalling) {
            this._imageElt.classList.toggle('flip');
            this._flipped = !this._flipped;
            this._board.flippedCard(this);
        }
    }

    equals(card) {
        return card.id === this._id;
    }
}