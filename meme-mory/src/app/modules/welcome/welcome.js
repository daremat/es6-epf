import 'semantic-ui-css/semantic.min.css';
import 'Styles/style.scss';
import './welcome.scss';

import { get } from 'lodash';
import { Validator } from "../../utils/utils";

class Welcome {
  constructor() {
    this._form = document.querySelector('#start-form');
    this._nameValidator = new Validator(value => /^[A-Za-z0-9]{3,20}$/.test(value));
    this._sizeValidator = new Validator(value => value > 0 && value <= 10);
  }

  static updateFormField({isValid, domField, domMessage}) {
    if (isValid) {
      domField.classList.remove('error');
      domMessage.classList.remove('error');
    } else {
      domField.classList.add('error');
      domMessage.classList.add('error');
    }
  }

  startGame(e) {
    e.preventDefault();

    this._form.classList.add('loading');
    const name = get(e, 'srcElement[0].value');
    const size = parseInt(get(e, 'srcElement[1].value') || 0);

    const nameIsValid = this._nameValidator.validate(name,
      isValid => Welcome.updateFormField({
        isValid,
        domField: document.getElementsByClassName('field')[0],
        domMessage: document.getElementsByClassName('message')[0]
      }));

    const sizeIsValid = this._sizeValidator.validate(size,
      isValid => Welcome.updateFormField({
        isValid,
        domField: document.getElementsByClassName('field')[1],
        domMessage: document.getElementsByClassName('message')[1]
      }));

    this._form.classList.remove('loading');
    if (nameIsValid && sizeIsValid) {
      console.log(`starting game: ${name}, with ${size} size`);
      window.location.href = `/game.html?name=${name}&size=${size}`;
    } else {
      this._form.classList.add('error');
    }
  }
}

let welcome = new Welcome();
welcome._form.addEventListener('submit', e => welcome.startGame(e));
