import './score.component.css';
import template from './score.component.html';
import { Component } from '../../utils/component';
import { parseUrl} from '../../utils/utils';

export class ScoreComponent extends Component {

    constructor() {
        super('score');
        // ...
    }

    getTemplate() { return template; }
}
