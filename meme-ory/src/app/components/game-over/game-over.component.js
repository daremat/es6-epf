import template from './game-over.component.html'
import './game-over.component.scss';
import { capitalize } from 'lodash';
import { UrlParser } from '../../utils/utils';
import { Component } from '../../utils/component';


export class GameOverComponent extends Component {
    constructor() {
        super('gameover');

        const params = new UrlParser().search;
        this.name = capitalize(params.name);
        this.size = parseInt(params.size);
        this.time = parseInt(params.time);
    }

    getTemplate() {
        return template;
    }

    render(outlet) {
        super.render(outlet);
        document.getElementById('name').innerText = this.name;
        document.getElementById('size').innerText = this.size;
        document.getElementById('time').innerText = this.time;
    }
}
