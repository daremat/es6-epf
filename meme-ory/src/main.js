import './app/styles/style.scss'

import { Router } from './app/utils/router';
import { WelcomeComponent } from './app/components/welcome/welcome.component';
import { GameComponent } from './app/components/game/game.component';
import { GameOverComponent } from './app/components/game-over/game-over.component';

const outlet = document.querySelector('#content-outlet');

const router = new Router(outlet)
    .register('', WelcomeComponent)
    .register('game', GameComponent)
    .register('game-over', GameOverComponent);
