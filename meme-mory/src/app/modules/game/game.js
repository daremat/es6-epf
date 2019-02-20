import 'semantic-ui-css/semantic.min.css';
import 'Styles/style.scss';
import './game.scss';
import Back from '../../../assets/back.png';
import { capitalize } from 'lodash';
import { findGetParameter, Storage } from '../../utils/utils';
import {Card} from "./card";
import {Board} from "./board";

const queryString = location.search;
const name = capitalize(findGetParameter(queryString, 'name')) || 'empty';
const size = parseInt(findGetParameter(queryString, 'size')) || 9;
document.getElementById('player-name').innerHTML = name;

Card.template = document.getElementById('card-template').content;
Card.backImg = Back;

const board = new Board(size);
const storage = new Storage();

async function gameOver() {
  const now = Date.now();
  const timeElapsedInSeconds = Math.floor((now - startTime)/1000);

  const sessionGames = JSON.parse(sessionStorage.getItem('games') || '[]');
  sessionGames.push({date: now, name, size, time: timeElapsedInSeconds});
  sessionStorage.setItem('games', JSON.stringify(sessionGames));

  const localGames = JSON.parse(localStorage.getItem('games') || '[]');
  localGames.push({date: now, name, size, time: timeElapsedInSeconds});
  localStorage.setItem('games', JSON.stringify(localGames));

  await storage.write({date: now, name, size, time: timeElapsedInSeconds});

  setTimeout(function() {
    window.location = `/end.html?name=${name}&size=${size}&time=${timeElapsedInSeconds}`;
  }, 750);
}

const startTime = Date.now();
board.init(gameOver);
