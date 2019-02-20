import {Card} from "./card";

import Haha from 'Assets/haha.png';
import Lol from 'Assets/lol.png';
import No from 'Assets/no.png';
import Pika from 'Assets/pika.png';
import Sable from 'Assets/sable.png';
import Say from 'Assets/say.png';
import Smart from 'Assets/smart.png';
import TrollFace from 'Assets/troll-face.png';
import What from 'Assets/what.png';
import Wouhou from 'Assets/wouhou.png';

export class Board {

  get freezed() {
    return this._freezed;
  }

  constructor(size) {
    this._size = size;
    this._elt = document.getElementById('cards');
    this._imgs = [Haha, Lol, No, Pika, Sable, Say, Smart, TrollFace, What, Wouhou];
    this._freezed = false;
  }

  init(gameOverCallback) {
    this._gameOverCallback = gameOverCallback;
    this.prepare().then(() => {
      this.build();
      this.append();
    });
  }

  async prepare() {
    const fetchJsonPromise = fetch(`http://localhost:8081/?nb=${this._imgs.length}&size=${this._size}`).then(res => res.json());
    this._boardImg = (await fetchJsonPromise).ids.map(id => this._imgs[id]);
  }

  build() {
    this._cards = this._boardImg.map(img => new Card(img, this));
  }

  append() {
    this._cards.forEach(card => this._elt.appendChild(card.elt))
  }

  flippedCard() {
    const flippedNotMatched = this._cards.filter(card => card.flipped && !card.matched);
    if (flippedNotMatched.length === 2) {
      this._freezed = true;
      if (flippedNotMatched[0].equals(flippedNotMatched[1])) {
        this.matchFound(flippedNotMatched).then(({finished}) => {
          if (!finished) {
            this._freezed = false;
          } else {
            this._gameOverCallback();
          }
        });
      } else {
        this.matchNotFound(flippedNotMatched).then(() => {
          this._freezed = false;
        });
      }
    }
  }

  /**
   * It's a match !
   * @param flippedNotMatched Array of All flipped cards not matched
   * @returns {Promise<{finished: boolean}>}
   */
  async matchFound(flippedNotMatched) {
    flippedNotMatched.forEach(card => { card.matched = true });
    const matched = this._cards.filter(card => card.matched);
    return {finished: matched.length === this._cards.length};
  }

  /**
   * It's not a match, wait and unflip the cards
   * @param flippedNotMatched Array of All flipped cards not matched
   * @returns {Promise<void>}
   */
  async matchNotFound(flippedNotMatched) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    flippedNotMatched.forEach(card => card.flip({boardCalling: true}));
  }

}