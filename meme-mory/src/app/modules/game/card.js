export class Card {

  static set template(template) {
    Card._template = template;
  }

  static set backImg(backImg) {
    Card._backImg = backImg;
  }

  get elt() {
    return this._elt;
  }

  get flipped() {
    return this._flipped;
  }

  get img() {
    return this._img;
  }

  constructor(img, board) {
    this._flipped = false;
    this.matched = false;
    this._img = img;
    this._board = board;

    this._elt = Card._template.cloneNode(true).firstElementChild;
    this._imageElt = this._elt.querySelector('.image');
    this._imageElt.querySelector('img.front-face').src = img;
    this._imageElt.querySelector('img.back-face').src = Card._backImg;
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
    return card.img === this._img;
  }
}