import 'semantic-ui-css/semantic.min.css';
import './game.component.scss';
import template from './game.component.html';
import { capitalize } from 'lodash';
import { UrlParser } from '../../utils/utils';
import { Component } from '../../utils/component';
import { CardComponent } from './card/card.component';
import { environment } from '../../../environment/environment';

export class GameComponent extends Component {

    constructor() {
        super('game');
        const params = new UrlParser().search;
        // gather player's name from URL
        this._name = params.name || 'empty';

        // gather grid size from URL
        this._size = parseInt(params.size) || 9;
        this._freezed = false;
    }

    render(outlet) {
        super.render(outlet);

        this._boardElement = document.getElementById('cards');
        document.querySelector('header h2').innerHTML = `let's play: ${this._name}`;
    }

    async init() {
        // fetch the cards configuration from the server
        this._config = await this.fetchConfig();
        this._cards = this._config.ids.map(id => new CardComponent(id, this));
        this._cards.forEach(card => this._boardElement.appendChild(card.getElement()));

        await this.start();
    }

    async start() {
        this._startTime = Date.now();

        // build a card for each config.ids

        await this.saveState();
    }

    getTemplate() {
        return template;
    }

    saveState() {

    }

    loadState() {

    }

    async gameOver() {
        const now = Date.now();
        const timeElapsedInSeconds = Math.floor((now - this._startTime )/1000);

        setTimeout(() => {
            window.location.hash = `end?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
        }, 750);
    }


    get freezed() {
        return this._freezed;
    }

    async fetchConfig() {
        return fetch(`${environment.api.host}/board?size=${this._size}`).then(res => res.json());
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
                        this.gameOver();
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
