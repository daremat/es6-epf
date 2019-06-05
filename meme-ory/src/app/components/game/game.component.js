import './game.component.scss';
import template from './game.component.html';
import { capitalize } from 'lodash';
import { UrlParser } from '../../utils/utils';
import { Component } from '../../utils/component';
import { CardComponent } from './card/card.component';
import { environment } from '../../../environment/environment';

export class GameComponent extends Component {

    constructor() {
        // this component has tag "<game>"
        super('game');

        // gather parameters from URL
        const params = new UrlParser().search;

        // save player name & game ize
        this._name = params.name || 'empty';
        this._size = parseInt(params.size) || 9;
        this._flippedCard = null;
        this._matchedPairs = 0;
    }

    render(outlet) {
        super.render(outlet);

        this._boardElement = document.querySelector('.cards');
        this._cards.forEach(card => {
            this._boardElement.appendChild(card.getElement());
            card.getElement().addEventListener('click', () => this._flipCard(card));

        });
    }

    async init() {
        // fetch the cards configuration from the server
        this._config = await this.fetchConfig();
        this._cards = this._config.ids.map(id => new CardComponent(id, this));

        this.start();
    }

    start() {
        this._startTime = Date.now();
        let seconds = 0;
        document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;

        setInterval(() => {
            document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;
        }, 1000);

        // build a card for each config.ids
    }

    getTemplate() {
        return template;
    }

    gameOver() {
        const now = Date.now();
        const timeElapsedInSeconds = Math.floor((now - this._startTime )/1000);

        setTimeout(() => {
            window.location.hash = `end?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
        }, 750);
    }

    async fetchConfig() {
        return fetch(`${environment.api.host}/board?size=${this._size}`).then(res => res.json());
    }

    _flipCard(card) {
        if (this._busy) {
            return;
        }

        if (card.flipped) {
            return;
        }

        // flip the card
        card.flip();

        // if flipped first card of the pair
        if (!this._flippedCard) {
            // keep this card flipped, and wait for the second card of the pair
            this._flippedCard = card;
        } else {
            // second card of the pair flipped...

            // if cards are the same
            if (card.equals(this._flippedCard)) {
                this._flippedCard.matched = true;
                card.matched = true;
                this._matchedPairs += 1;

                // reset flipped card for the next turn.
                this._flippedCard = null;

                if (this._matchedPairs === this._size) {
                    this.gameOver();
                }
            } else {
                this._busy = true;

                // cards did not match
                // wait a short amount of time before hiding both cards
                setTimeout(() => {

                    // hide the cards
                    this._flippedCard.flip();
                    card.flip();
                    this._busy = false;

                    // reset flipped card for the next turn.
                    this._flippedCard = null;
                }, 500);
            }

        }

    }
}


