import { Card } from './card';
import { environment } from '../../../environment/environment';

export class Board {

    get freezed() {
        return this._freezed;
    }

    constructor(size) {
        this._size = size;
        this._elt = document.getElementById('cards');
        this._freezed = false;
    }

    async init(gameOverCallback) {
        // register the callbacl to call when the game is over. This will show up score view
        this._gameOverCallback = gameOverCallback;
        
        // fetch the cards configuration from the server
        const config = await this.fetchConfig();
        
        // build a card for each config.ids
        this._cards = config.ids.map(id => new Card(id, this));
        
        this.append();
    }

    async fetchConfig() {
        return fetch(`${environment.api.host}/board?size=${this._size}`).then(res => res.json());
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
        flippedNotMatched.forEach(card => {
            card.matched = true
        });
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