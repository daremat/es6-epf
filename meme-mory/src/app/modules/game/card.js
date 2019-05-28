import './card.scss'

function getTemplate() {
    if (!Card.__template) {
        Card.__template = document.getElementById('card-template').content;
    }
    if (!Card.__template) {
      throw new Error('cannot load card template. Maybe you tried to create a card in te wrong view ?')
    }

    return Card.__template.cloneNode(true).firstElementChild;
}

export class Card {
  get elt() {
    return this._elt;
  }

  get flipped() {
    return this._flipped;
  }

  get id() {
    return this._id;
  }

  constructor(id, board) {

      this._flipped = false;
    this.matched = false;
    this._id = id;
    this._board = board;

    this._elt = getTemplate();
    this._imageElt = this._elt.querySelector('.image');
      this._imageElt.querySelector('img.front-face').src = `src/assets/cards/card-${id}.png`;
//      this._imageElt.querySelector('img.front-face').id = `mo-card-${id}`;
    this._imageElt.querySelector('img.back-face').src = 'src/assets/cards/back.png';
    this._imageElt.addEventListener('click', () => this.flip());
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